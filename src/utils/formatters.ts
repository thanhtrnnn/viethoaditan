/**
 * Bộ chuyển đổi các thuật ngữ kỹ thuật, mã quy tắc, mã phụ kiện và trạng thái sang tiếng Việt
 * Phục vụ trải nghiệm người dùng thuần Việt cho dự án Việt Hoa Di Tân
 */

export const STATUS_LABELS: Record<string, string> = {
  ok: 'Phù hợp quy thức',
  needs_attention: 'Cần lưu ý văn hóa',
  insufficient_evidence: 'Chưa đủ căn cứ xác minh',
  error: 'Lỗi phản hồi hệ thống',
};

export const RULE_LABELS: Record<string, string> = {
  RULE_01: 'Quy thức Áo ngũ thân và Quần lụa',
  RULE_02: 'Nghi thức Khăn đội & Đầu tóc',
  RULE_03: 'Giới hạn Phụ kiện Cách tân',
  RULE_04: 'Tiết chế Sắc màu Cổ truyền',
  RULE_UNVERIFIED: 'Quy tắc chưa có trong tư liệu xác minh',
};

export const EVIDENCE_LABELS: Record<string, string> = {
  EVI_MINH_MANG_1827: 'Chiếu dụ Minh Mạng (1827)',
  EVI_KHAM_DINH_HOI_DIEN: 'Khâm Định Đại Nam Hội Điển Sự Lệ',
  EVI_NGHI_LE_TRIEU_NGUYEN: 'Nghi Lễ Triều Nguyễn',
  EVI_TAP_TUC_CO_TRUYEN: 'Tập Tục Cổ Truyền Việt Nam',
  EVI_HOANG_TRIEU_LUAT_LE: 'Hoàng Triều Luật Lệ',
};

export const TARGET_LABELS: Record<string, string> = {
  color: 'Màu sắc',
  accessory: 'Phụ kiện',
};

export const ACTION_LABELS: Record<string, string> = {
  replace: 'Thay sang',
  remove: 'Tháo bỏ',
  keep: 'Gìn giữ',
};

export const ITEM_LABELS: Record<string, string> = {
  // Phụ kiện
  hai_gam: 'Hài gấm mũi cong',
  tui_deo_cheo: 'Túi vải đeo chéo',
  khan_van: 'Khăn vấn / Khăn đóng',
  quat_xep: 'Quạt xếp nan trúc',
  kieng_bac: 'Kiềng bạc cổ phong',
  tui_gam: 'Túi gấm thắt lưng',
  sneaker_hien_dai: 'Giày thể thao sneaker',
  guoc_go: 'Guốc gỗ truyền thống',

  // Màu sắc
  lam_thuy: 'Sắc Lam Thủy (Xanh Chàm)',
  do_dieu: 'Sắc Đỏ Điều',
  luc_bich: 'Sắc Lục Bích (Ngọc Bích)',
  vang_mo_ga: 'Sắc Vàng Mỡ Gà',
  vang_hoang_kim: 'Sắc Vàng Hoàng Kim',
  den_tuyen: 'Sắc Đen Tuyền',
  bach_ngoc: 'Sắc Bạch Ngọc (Trắng Ngà)',
  tim_hoa_ca: 'Sắc Tím Hoa Cà',
  nau_dong: 'Sắc Nâu Củ Nâu',
  white: 'Quần trắng lụa',
  black: 'Quần hắc sa đen',

  // Trang phục
  'ao-ngu-than-tay-chen': 'Áo ngũ thân tay chẽn',
  ao_ngu_than: 'Áo ngũ thân',
  ao_tac: 'Áo tấc',
  nhat_binh: 'Áo Nhật bình',

  // Dịp / Ngữ cảnh
  dao_pho: 'Dạo phố & Cà phê',
  le_hoi: 'Lễ hội truyền thống',
  su_kien_cuoi_hoi: 'Sự kiện trang trọng',
  cong_so: 'Công sở hiện đại',

  // Phong cách
  truyen_thong: 'Phối cổ điển',
  toi_gian: 'Thanh lịch tối giản',
  cach_tan: 'Trẻ trung cách tân',
};

export function formatStatus(status: string | undefined): string {
  if (!status) return 'Chưa xác định';
  return STATUS_LABELS[status] || status;
}

export function formatRuleId(ruleId: string | undefined): string {
  if (!ruleId) return 'Quy tắc văn hóa';
  if (RULE_LABELS[ruleId]) {
    return RULE_LABELS[ruleId];
  }
  if (ruleId.startsWith('RULE_')) {
    const suffix = ruleId.replace('RULE_', '').replace(/_/g, ' ');
    return `Quy tắc: ${suffix}`;
  }
  return ruleId;
}

export function formatEvidenceId(eviId: string | undefined): string {
  if (!eviId) return '';
  if (EVIDENCE_LABELS[eviId]) {
    return EVIDENCE_LABELS[eviId];
  }
  return eviId.replace('EVI_', '').replace(/_/g, ' ');
}

export function formatTarget(target: string | undefined): string {
  if (!target) return '';
  return TARGET_LABELS[target] || target;
}

export function formatAction(action: string | undefined): string {
  if (!action) return '';
  return ACTION_LABELS[action] || action;
}

export function formatItemValue(value: string | undefined): string {
  if (!value) return '';
  if (ITEM_LABELS[value]) {
    return ITEM_LABELS[value];
  }
  return value.replace(/_/g, ' ');
}
