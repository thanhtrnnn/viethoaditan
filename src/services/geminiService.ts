import {
  OutfitState,
  GeminiContractV1,
  CulturalRule,
} from '../types/vietPhuc.ts';
import { CULTURAL_RULES_V1, TEST_CASES } from '../data/culturalData.ts';

export async function evaluateOutfit(
  outfit: OutfitState,
  rules: CulturalRule[] = CULTURAL_RULES_V1
): Promise<GeminiContractV1> {
  // 1. Nếu đang chọn kịch bản kiểm thử cố định:
  if (outfit.activeTestCaseId) {
    const tc = TEST_CASES.find((t) => t.id === outfit.activeTestCaseId);
    if (tc) {
      if (tc.id === 'TC06') {
        // Giả lập gián đoạn kết nối để kiểm chứng cơ chế phục hồi dự phòng
        throw new Error('Dịch vụ thẩm định tạm thời gián đoạn do kết nối mạng hoặc hệ thống đang bận.');
      }
      if (tc.mockContract) {
        // Mô phỏng độ trễ tự nhiên 400ms
        await new Promise((resolve) => setTimeout(resolve, 400));
        return tc.mockContract;
      }
    }
  }

  // 2. Thử gọi API Backend nếu có kết nối
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const res = await fetch('/api/gemini/evaluate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        outfit_state: {
          garmentId: outfit.garmentId,
          gender: outfit.gender,
          context: outfit.context,
          style: outfit.style,
          color: outfit.primaryColor.name,
          colorHex: outfit.primaryColor.hex,
          pantsColor: outfit.pantsColor,
          hasInnerLayer: outfit.hasInnerLayer,
          accessories: outfit.accessories,
        },
        cultural_rules: rules,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const contentType = res.headers.get('content-type') || '';
    const rawText = await res.text().catch(() => '');

    // Phát hiện trang lỗi HTML (từ proxy, Cloud Run hoặc web server trả về text/html, <!DOCTYPE, <html>...)
    const isHtml =
      contentType.toLowerCase().includes('text/html') ||
      rawText.trim().startsWith('<') ||
      rawText.includes('<!DOCTYPE') ||
      rawText.includes('<html') ||
      rawText.includes('<body') ||
      rawText.includes('<head') ||
      rawText.includes('503 Service Temporarily Unavailable') ||
      rawText.includes('Service Unavailable');

    // Nếu trả về trang lỗi HTML hoặc mã 503: Ẩn triệt để HTML/JSON thô, chuẩn hóa thông báo lịch sự
    if (isHtml || res.status === 503) {
      throw new Error(
        'Dịch vụ thẩm định tạm thời gián đoạn do kết nối mạng hoặc hệ thống đang xử lý lượng yêu cầu cao.'
      );
    }

    if (!res.ok) {
      let parsedMsg = '';
      try {
        const errJson = JSON.parse(rawText);
        if (
          typeof errJson?.message === 'string' &&
          !errJson.message.startsWith('{') &&
          !errJson.message.includes('<') &&
          !errJson.message.includes('SyntaxError')
        ) {
          parsedMsg = errJson.message;
        }
      } catch {
        // Không parse được JSON -> đây là nội dung lỗi thô
      }
      throw new Error(
        parsedMsg ||
          'Dịch vụ thẩm định tạm thời gián đoạn do kết nối mạng hoặc hệ thống đang bận.'
      );
    }

    // Khi res.ok (200), thử parse JSON
    let data: any = null;
    try {
      data = JSON.parse(rawText);
    } catch {
      // Nếu server trả status 200 nhưng nội dung là trang HTML hoặc không phải JSON hợp lệ
      throw new Error(
        'Dịch vụ thẩm định tạm thời gián đoạn do dữ liệu trả về chưa đúng định dạng.'
      );
    }

    if (data && data.culture_check && data.style_feedback) {
      return data as GeminiContractV1;
    }

    throw new Error(
      'Dịch vụ thẩm định tạm thời gián đoạn do dữ liệu phản hồi chưa đầy đủ.'
    );
  } catch (err: any) {
    if (
      err?.name === 'AbortError' ||
      err?.message?.includes('aborted') ||
      err?.message?.includes('timeout') ||
      err?.message?.includes('quá thời gian')
    ) {
      throw new Error(
        'Yêu cầu thẩm định quá thời gian phản hồi do đường truyền mạng chậm.'
      );
    }

    const msg = String(err?.message || '');
    // Ẩn mọi lỗi thô chứa mã HTML, cú pháp JSON thô hoặc stack trace
    if (
      msg.includes('<!DOCTYPE') ||
      msg.includes('<html') ||
      msg.includes('<body') ||
      msg.includes('Unexpected token') ||
      msg.includes('SyntaxError') ||
      msg.startsWith('{') ||
      msg.includes('503') ||
      msg.includes('Service Unavailable') ||
      msg.includes('overloaded') ||
      msg.includes('RESOURCE_EXHAUSTED') ||
      msg.includes('Failed to fetch') ||
      msg.includes('NetworkError')
    ) {
      throw new Error(
        'Dịch vụ thẩm định tạm thời gián đoạn do kết nối mạng hoặc hệ thống đang xử lý lượng yêu cầu cao.'
      );
    }

    throw new Error(
      msg && !msg.startsWith('{') && !msg.includes('<')
        ? msg
        : 'Dịch vụ thẩm định tạm thời gián đoạn do kết nối mạng hoặc hệ thống đang bận.'
    );
  }

  // 3. Fallback: Thẩm định quy tắc di sản trực tiếp tại Client
  // Dựa trên tập luật văn hóa CULTURAL_RULES_V1 đã xác minh:
  await new Promise((resolve) => setTimeout(resolve, 600));

  const findings: Array<{ rule_id: string; message: string; evidence_ids: string[] }> = [];
  const suggestions: Array<{
    target: 'color' | 'accessory';
    action: 'keep' | 'replace' | 'remove';
    value: string;
    reason: string;
  }> = [];

  let status: 'ok' | 'needs_attention' | 'insufficient_evidence' = 'ok';

  // Rule 04: Kiêng kỵ màu vàng hoàng đế trong dịp lễ tế
  const isYellow =
    outfit.primaryColor.id === 'vang_hoang_kim' ||
    outfit.primaryColor.hex.toLowerCase() === '#ffd700';

  if (isYellow && (outfit.context === 'su_kien_cuoi_hoi' || outfit.context === 'le_hoi')) {
    status = 'needs_attention';
    findings.push({
      rule_id: 'RULE_04',
      message: 'Sắc vàng chính hoàng xưa kia là độc quyền của hoàng gia; trong các dịp lễ nghi dân gian cổ truyền, nên tiết chế sang vàng mỡ gà hoặc lam thủy.',
      evidence_ids: ['EVI_HOANG_TRIEU_LUAT_LE'],
    });
    suggestions.push({
      target: 'color',
      action: 'replace',
      value: 'lam_thuy',
      reason: 'Đổi sang màu Lam Thủy để giữ nét trang nhã và chuẩn mực lễ nghi dân gian.',
    });
  }

  // Rule 03: Phụ kiện thể thao hiện đại trong sự kiện trang nghiêm
  const hasSneaker = outfit.accessories.includes('sneaker_hien_dai');
  const hasTuiDeo = outfit.accessories.includes('tui_deo_cheo');

  if ((hasSneaker || hasTuiDeo) && (outfit.context === 'su_kien_cuoi_hoi' || outfit.context === 'le_hoi')) {
    status = 'needs_attention';
    findings.push({
      rule_id: 'RULE_03',
      message: 'Phụ kiện thể thao (sneaker/tui dù) làm phân tán vẻ trang nghiêm của áo ngũ thân trong không gian tế lễ long trọng.',
      evidence_ids: ['EVI_TAP_TUC_CO_TRUYEN'],
    });
    if (hasSneaker) {
      suggestions.push({
        target: 'accessory',
        action: 'replace',
        value: 'hai_gam',
        reason: 'Thay sneaker bằng hài gấm mũi cong hoặc guốc gỗ truyền thống.',
      });
    }
    if (hasTuiDeo) {
      suggestions.push({
        target: 'accessory',
        action: 'remove',
        value: 'tui_deo_cheo',
        reason: 'Bỏ túi đeo chéo hiện đại để tà áo ngũ thân buông rủ thanh thoát.',
      });
    }
  }

  // Rule 01: Quần lụa và Áo ngũ thân
  findings.push({
    rule_id: 'RULE_01',
    message: `Áo ngũ thân tay chẽn phối cùng ${
      outfit.pantsColor === 'white' ? 'quần lụa trắng' : 'quần hắc sa'
    } đạt tỷ lệ hài hòa đúng chuẩn định hình từ triều Nguyễn.`,
    evidence_ids: ['EVI_MINH_MANG_1827'],
  });

  const styleSummary =
    status === 'ok'
      ? `Bộ phối mang phong thái ${
          outfit.style === 'truyen_thong'
            ? 'cổ điển, uy nghiêm'
            : outfit.style === 'toi_gian'
            ? 'thanh tao, mực thước'
            : 'trẻ trung, tươi mới'
        }, hài hòa xuất sắc với bối cảnh ${
          outfit.context === 'dao_pho'
            ? 'dạo phố'
            : outfit.context === 'cong_so'
            ? 'công sở'
            : 'lễ nghi'
        }.`
      : 'Bộ phối có ý tưởng thẩm mỹ độc đáo nhưng đang có một số chi tiết xung đột với quy chuẩn văn hóa cần điều chỉnh.';

  return {
    schema_version: '1.0',
    style_feedback: {
      summary: styleSummary,
    },
    culture_check: {
      status,
      findings,
    },
    suggestions,
    explanation:
      'Đánh giá được thực hiện dựa trên quy chuẩn từ kho dữ liệu văn hóa di sản đã được kiểm chứng.',
    is_fallback: true,
    fallback_reason: 'Dự phòng quy chuẩn văn hóa cục bộ',
  };
}
