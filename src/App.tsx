/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { OutfitState, TestCase } from './types/vietPhuc.ts';
import { TRADITIONAL_COLORS, TEST_CASES } from './data/culturalData.ts';
import { TopBar } from './components/TopBar.tsx';
import { Screen1GarmentSelect } from './views/Screen1GarmentSelect.tsx';
import { Screen2ContextStyle } from './views/Screen2ContextStyle.tsx';
import { Screen3Studio } from './views/Screen3Studio.tsx';
import { Screen4Evaluation } from './views/Screen4Evaluation.tsx';
import { Screen5Result } from './views/Screen5Result.tsx';
import { evaluateOutfit } from './services/geminiService.ts';

export default function App() {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Khởi tạo trạng thái bộ phối ban đầu
  const [outfit, setOutfit] = useState<OutfitState>({
    garmentId: 'ao-ngu-than-tay-chen',
    garmentName: 'Áo ngũ thân tay chẽn',
    gender: 'nam',
    context: 'le_hoi',
    style: 'truyen_thong',
    primaryColor: TRADITIONAL_COLORS[0], // Lam thủy
    pantsColor: 'white',
    hasInnerLayer: true,
    innerCollarColor: '#FFFFFF',
    accessories: ['khan_van', 'hai_gam', 'quat_xep'],
    renderStatus: 'ready',
    geminiStatus: 'idle',
    feedback: null, // Xóa kết luận cũ ngay từ đầu; chỉ hiện sau khi Gemini thẩm định thành công
    activeTestCaseId: null,
  });

  const outfitRef = useRef<OutfitState>(outfit);
  const outfitVersionRef = useRef<number>(0);
  const isAnalyzingRef = useRef<boolean>(false);

  useEffect(() => {
    outfitRef.current = outfit;
  }, [outfit]);

  // Kiểm tra xem cập nhật có làm thay đổi trang phục hay không (màu, phụ kiện, dáng, phong cách)
  const isGarmentConfigChange = (updates: Partial<OutfitState>) => {
    return (
      'primaryColor' in updates ||
      'pantsColor' in updates ||
      'innerCollarColor' in updates ||
      'hasInnerLayer' in updates ||
      'accessories' in updates ||
      'gender' in updates ||
      'context' in updates ||
      'style' in updates ||
      'garmentId' in updates
    );
  };

  // Cập nhật trạng thái bộ phối: MỖI LẦN ĐỔI MÀU HOẶC PHỤ KIỆN => XÓA FEEDBACK CŨ NGAY
  const updateOutfit = (updates: Partial<OutfitState>) => {
    setOutfit((prev) => {
      const isConfigChange = isGarmentConfigChange(updates);

      // Nếu thay đổi cấu hình trang phục (màu sắc, phụ kiện, quần, bậu cổ, dáng...)
      // thì XÓA FEEDBACK CŨ NGAY LẬP TỨC và tăng phiên bản bộ phối để hủy kết quả phân tích cũ
      if (isConfigChange) {
        outfitVersionRef.current += 1;
        const nextFeedback = updates.feedback !== undefined ? updates.feedback : null;
        const nextGeminiStatus = updates.geminiStatus !== undefined
          ? updates.geminiStatus
          : (nextFeedback ? 'done' : 'idle');

        const nextState: OutfitState = {
          ...prev,
          ...updates,
          feedback: nextFeedback, // Xóa kết luận cũ ngay lập tức
          geminiStatus: nextGeminiStatus,
          errorMessage: updates.errorMessage !== undefined ? updates.errorMessage : undefined,
          isFallback: updates.isFallback !== undefined ? updates.isFallback : false,
        };
        outfitRef.current = nextState;
        return nextState;
      }

      const nextState: OutfitState = {
        ...prev,
        ...updates,
      };
      outfitRef.current = nextState;
      return nextState;
    });
  };

  // Nạp kịch bản kiểm thử (TC01 - TC07)
  const handleSelectTestCase = async (tc: TestCase | null) => {
    if (!tc) {
      updateOutfit({
        activeTestCaseId: null,
        errorMessage: undefined,
        geminiStatus: 'idle',
        feedback: null,
      });
      return;
    }

    outfitVersionRef.current += 1;
    const newOutfit: OutfitState = {
      ...outfit,
      ...tc.outfitPreset,
      activeTestCaseId: tc.id,
      geminiStatus: tc.id === 'TC06' ? 'error' : 'done',
      feedback: tc.id === 'TC06' ? null : tc.mockContract,
      errorMessage:
        tc.id === 'TC06'
          ? 'Dịch vụ thẩm định tạm thời gián đoạn do kết nối mạng hoặc hệ thống đang bận. Toàn bộ bộ phối của bạn đã được bảo lưu nguyên vẹn.'
          : undefined,
    };

    setOutfit(newOutfit);
    outfitRef.current = newOutfit;
    // Chuyển thẳng tới Màn 4 để xem kết quả ngay
    setCurrentStep(4);
  };

  // Kích hoạt thẩm định với Gemini cho bộ phối mới:
  // CHỈ HIỆN NHẬN XÉT MỚI SAU KHI GEMINI TRẢ LỜI THÀNH CÔNG VỚI BỘ PHỐI MỚI
  const handleRunGeminiCheck = async (targetOutfit?: OutfitState) => {
    const outfitToAnalyze = targetOutfit || outfitRef.current || outfit;
    const reqVersion = outfitVersionRef.current;

    // 1. Xóa feedback cũ ngay lập tức và đưa vào trạng thái analyzing
    updateOutfit({
      geminiStatus: 'analyzing',
      errorMessage: undefined,
      feedback: null,
      isFallback: false,
    });

    isAnalyzingRef.current = true;

    try {
      const result = await evaluateOutfit(outfitToAnalyze);

      // Nếu trong lúc chờ Gemini phản hồi mà người dùng đã đổi màu/phụ kiện khác
      // (tức reqVersion khác với phiên bản hiện tại), BỎ QUA kết quả cũ này ngay!
      if (reqVersion !== outfitVersionRef.current) {
        return;
      }

      // 2. CHỈ hiện nhận xét mới sau khi Gemini trả lời thành công cho bộ phối mới
      updateOutfit({
        feedback: result,
        geminiStatus: 'done',
        isFallback: Boolean(result.is_fallback),
        errorMessage: undefined,
      });
    } catch (err: any) {
      // Nếu bộ phối đã thay đổi trong khi chờ, bỏ qua lỗi của phiên bản cũ
      if (reqVersion !== outfitVersionRef.current) {
        return;
      }

      // Xử lý thông báo lỗi: ẩn triệt để lỗi JSON thô / HTML lỗi và chuẩn hóa thông báo dễ hiểu, trang trọng
      const rawMsg = typeof err?.message === 'string' ? err.message : String(err || '');
      let friendlyMessage =
        'Dịch vụ thẩm định tạm thời gián đoạn do kết nối mạng hoặc hệ thống đang xử lý lượng yêu cầu cao. Toàn bộ các lớp áo, màu sắc, quần và phụ kiện bạn đã phối đều được bảo lưu nguyên vẹn.';

      if (
        rawMsg.toLowerCase().includes('timeout') ||
        rawMsg.toLowerCase().includes('abort') ||
        rawMsg.toLowerCase().includes('quá thời gian')
      ) {
        friendlyMessage =
          'Yêu cầu thẩm định quá thời gian phản hồi do đường truyền mạng chậm. Toàn bộ các lớp áo, màu sắc, quần và phụ kiện bạn đã phối đều được bảo lưu nguyên vẹn.';
      } else if (
        rawMsg &&
        !rawMsg.includes('<') &&
        !rawMsg.startsWith('{') &&
        !rawMsg.includes('503') &&
        !rawMsg.includes('Service Unavailable')
      ) {
        friendlyMessage = rawMsg;
      }

      // Khi gặp lỗi hoặc timeout: GIỮ NGUYÊN BỘ PHỐI (không đổi state), feedback = null
      updateOutfit({
        geminiStatus: 'error',
        errorMessage: friendlyMessage,
        feedback: null,
        isFallback: false,
      });
    } finally {
      isAnalyzingRef.current = false;
    }
  };

  // Cho phép người dùng tiếp tục xuất kết quả mà không cần AI khi gặp lỗi hoặc không muốn chờ
  const handleContinueWithoutAI = () => {
    updateOutfit({
      geminiStatus: 'skipped',
      errorMessage: undefined,
      feedback: null, // Không tạo nhận xét thay thế bằng fallback; giữ feedback null
      isFallback: false,
    });
    setCurrentStep(5);
  };

  // Chuyển màn và tự động chạy thẩm định khi vào Màn 4 nếu chưa có kết quả
  const handleGoToStep = (step: number) => {
    setCurrentStep(step);
    if (step === 4) {
      if (!outfitRef.current.feedback || outfitRef.current.geminiStatus === 'idle') {
        handleRunGeminiCheck(outfitRef.current);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C241E] flex flex-col font-sans selection:bg-amber-200">
      {/* Thanh điều hướng TopBar */}
      <TopBar
        currentStep={currentStep}
        onSelectStep={handleGoToStep}
      />

      {/* Nội dung 5 Màn hình theo luồng dọc */}
      <main className="flex-1">
        {currentStep === 1 && (
          <Screen1GarmentSelect
            outfit={outfit}
            onUpdateOutfit={updateOutfit}
            onNext={() => handleGoToStep(2)}
          />
        )}

        {currentStep === 2 && (
          <Screen2ContextStyle
            outfit={outfit}
            onUpdateOutfit={updateOutfit}
            onNext={() => handleGoToStep(3)}
            onBack={() => handleGoToStep(1)}
          />
        )}

        {currentStep === 3 && (
          <Screen3Studio
            outfit={outfit}
            onUpdateOutfit={updateOutfit}
            onNext={() => handleGoToStep(4)}
            onBack={() => handleGoToStep(2)}
          />
        )}

        {currentStep === 4 && (
          <Screen4Evaluation
            outfit={outfit}
            onUpdateOutfit={updateOutfit}
            onRunGeminiCheck={handleRunGeminiCheck}
            onContinueWithoutAI={handleContinueWithoutAI}
            onNext={() => handleGoToStep(5)}
            onBack={() => handleGoToStep(3)}
          />
        )}

        {currentStep === 5 && (
          <Screen5Result
            outfit={outfit}
            onUpdateOutfit={updateOutfit}
            onBackToStudio={() => handleGoToStep(3)}
            onReset={() => {
              updateOutfit({
                primaryColor: TRADITIONAL_COLORS[0],
                pantsColor: 'white',
                accessories: ['khan_van', 'hai_gam', 'quat_xep'],
                context: 'le_hoi',
                style: 'truyen_thong',
                hasInnerLayer: true,
                activeTestCaseId: null,
                feedback: TEST_CASES[0].mockContract,
              });
              handleGoToStep(1);
            }}
          />
        )}
      </main>

      {/* Chân trang thanh lịch phong cách Viện bảo tàng */}
      <footer className="border-t border-stone-200/90 py-6 px-4 text-center text-xs text-stone-500 font-sans mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-stone-800">
              Việt Hoa Di Tân
            </span>
            <span>·</span>
            <span>Xưởng Phối Việt Phục — Di sản y phục truyền thống Việt Nam</span>
          </div>
          <div className="flex items-center gap-3 text-stone-400">
            <span>Áo ngũ thân tay chẽn</span>
            <span>·</span>
            <span>Triều Nguyễn (TK 18–19)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
