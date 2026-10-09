import React from 'react';
import { OutfitState, Suggestion } from '../types/vietPhuc.ts';
import { LayerCanvas } from '../components/LayerCanvas.tsx';
import { TRADITIONAL_COLORS } from '../data/culturalData.ts';
import {
  formatStatus,
  formatRuleId,
  formatEvidenceId,
  formatTarget,
  formatAction,
  formatItemValue,
} from '../utils/formatters.ts';
import {
  ShieldCheck,
  AlertTriangle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  Info,
  ChevronUp,
} from 'lucide-react';

interface Screen4Props {
  outfit: OutfitState;
  onUpdateOutfit: (updates: Partial<OutfitState>) => void;
  onRunGeminiCheck: (targetOutfit?: OutfitState) => void;
  onContinueWithoutAI?: () => void;
  onNext: () => void;
  onBack: () => void;
}

export const Screen4Evaluation: React.FC<Screen4Props> = ({
  outfit,
  onUpdateOutfit,
  onRunGeminiCheck,
  onContinueWithoutAI,
  onNext,
  onBack,
}) => {
  const feedback = outfit.feedback;
  const isAnalyzing = outfit.geminiStatus === 'analyzing';
  const isError = outfit.geminiStatus === 'error';

  const handleProceed = onContinueWithoutAI || onNext;

  // Khi vào Màn 4 mà chưa có feedback hoặc trạng thái idle (vừa đổi màu/phụ kiện), tự động thẩm định bộ phối mới
  React.useEffect(() => {
    if (!outfit.feedback && outfit.geminiStatus === 'idle') {
      onRunGeminiCheck(outfit);
    }
  }, [outfit.feedback, outfit.geminiStatus, onRunGeminiCheck, outfit]);

  // Xử lý áp dụng gợi ý: ĐỔI MÀU HOẶC PHỤ KIỆN => XÓA FEEDBACK CŨ NGAY & THẨM ĐỊNH LẠI VỚI GEMINI
  const handleApplySuggestion = (sug: Suggestion) => {
    if (sug.target === 'color') {
      const foundColor = TRADITIONAL_COLORS.find((c) => c.id === sug.value);
      if (foundColor) {
        const nextOutfit: OutfitState = {
          ...outfit,
          primaryColor: foundColor,
          feedback: null, // Xóa ngay feedback cũ
          geminiStatus: 'analyzing',
        };
        onUpdateOutfit(nextOutfit);
        onRunGeminiCheck(nextOutfit);
      }
    } else if (sug.target === 'accessory') {
      let nextAccessories = outfit.accessories;
      if (sug.action === 'remove') {
        nextAccessories = outfit.accessories.filter((id) => id !== sug.value);
      } else if (sug.action === 'replace') {
        nextAccessories = outfit.accessories.map((id) =>
          id === 'sneaker_hien_dai' ? sug.value : id
        );
        if (!nextAccessories.includes(sug.value)) nextAccessories.push(sug.value);
      }
      const nextOutfit: OutfitState = {
        ...outfit,
        accessories: nextAccessories,
        feedback: null, // Xóa ngay feedback cũ
        geminiStatus: 'analyzing',
      };
      onUpdateOutfit(nextOutfit);
      onRunGeminiCheck(nextOutfit);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:py-8 px-4 sm:px-6 pb-28 lg:pb-8">
      {/* Tiêu đề Màn 4 & Action Bar trên cùng */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 sm:mb-6 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-800 mb-1">
            <span>Màn 4 / 5</span>
            <span>·</span>
            <span>Đánh Giá Phong Cách & Kiểm Tra Văn Hóa</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
            Hội Đồng Thẩm Định Văn Hóa & Phong Cách
          </h1>
        </div>

        {/* Nút hành động nhanh ở Header trên Desktop / Tablet */}
        <div className="hidden sm:flex items-center gap-2.5 flex-wrap">
          <button
            onClick={handleProceed}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-stone-900 rounded-xl hover:bg-stone-800 transition-all shadow-md cursor-pointer hover:gap-3"
            title="Chuyển sang Màn 5: Kết quả & Tùy chọn xuất"
          >
            <span>{isError ? 'Tiếp tục không dùng AI' : 'Sang Màn 5 (Kết Quả)'}</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      </div>

      {/* Thanh xem trước áo ghim nổi trên Mobile khi cuộn (Sticky Mobile Garment Preview) */}
      <div className="lg:hidden sticky top-[53px] z-30 -mx-4 px-3 py-2 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-stone-200/90 shadow-2xs mb-4">
        <div className="flex items-center justify-between gap-2.5 max-w-lg mx-auto">
          {/* Cụm xem trước áo và thông tin */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 min-w-0 text-left cursor-pointer group flex-1"
            title="Chạm để cuộn lên xem toàn cảnh ma-nơ-canh"
          >
            {/* Ảnh áo chuẩn tỉ lệ 400:620, không méo, nhìn rõ sắc phục */}
            <div className="relative w-12 h-[72px] rounded-lg overflow-hidden border border-stone-300/90 bg-[#F7F4EE] shrink-0 shadow-2xs group-hover:border-stone-500 transition-colors flex items-center justify-center p-0.5">
              <LayerCanvas
                outfit={outfit}
                compact={true}
                isOutlineFallback={outfit.activeTestCaseId === 'TC07'}
                className="w-full h-full border-none p-0 bg-transparent rounded-none"
              />
            </div>

            {/* Chi tiết trang phục gọn gàng, không tràn mép */}
            <div className="min-w-0 flex-1 space-y-0.5">
              <div className="flex items-center gap-1.5 flex-nowrap">
                <span
                  className="w-3 h-3 rounded-full border border-stone-400 shrink-0 shadow-2xs"
                  style={{ backgroundColor: outfit.primaryColor.hex }}
                />
                <span className="text-xs font-serif font-bold text-stone-900 truncate">
                  {outfit.primaryColor.name}
                </span>
                <span className={`text-[10px] font-sans px-1.5 py-0.2 rounded-full border shrink-0 ${
                  outfit.gender === 'nu'
                    ? 'bg-rose-50 text-rose-800 border-rose-200'
                    : 'bg-stone-100 text-stone-700 border-stone-200'
                }`}>
                  {outfit.gender === 'nu' ? 'Nữ' : 'Nam'}
                </span>
              </div>

              <p className="text-[11px] text-stone-600 truncate font-sans">
                {outfit.pantsColor === 'white' ? 'Quần trắng' : 'Quần đen'}
                {outfit.hasInnerLayer ? ' · Có bậu cổ' : ''}
              </p>

              <div className="flex items-center gap-1.5 text-[10px] text-stone-500 font-sans truncate">
                <span>{outfit.accessories.length} phụ kiện</span>
                <span className="text-amber-800 font-medium">
                  {isError ? '· Đã giữ bộ phối' : '· Sửa gợi ý ↑'}
                </span>
              </div>
            </div>
          </button>

          {/* Nút hành động bên phải: Cuộn lên */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-1.5 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-200/60 cursor-pointer"
              title="Cuộn lên đầu trang"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
        {/* CỘT TRÁI: BỘ XEM TRƯỚC CỐ ĐỊNH (STICKY PREVIEW) */}
        <div className="lg:col-span-5 lg:sticky lg:top-20 self-start flex flex-col items-center z-10">
          <div className="w-full max-w-[380px] bg-white/80 p-2 rounded-2xl border border-stone-200/90 shadow-sm">
            <LayerCanvas
              outfit={outfit}
              onToggleGender={(gender) => onUpdateOutfit({ gender })}
              isOutlineFallback={outfit.activeTestCaseId === 'TC07'}
              className="w-full shadow-xs"
            />

            <div className="p-3 text-center border-t border-stone-100 mt-2">
              <span className="text-xs font-serif font-medium text-stone-800">
                {outfit.gender === 'nu' ? 'Nữ phục (Duyên dáng)' : 'Nam phục (Đĩnh đạc)'} · {outfit.primaryColor.name} ({outfit.primaryColor.vietnameseName})
              </span>
              <p className="text-[11px] text-stone-500 font-sans mt-0.5">
                {outfit.pantsColor === 'white' ? 'Quần trắng lụa' : 'Quần đen'} ·{' '}
                {outfit.hasInnerLayer ? 'Có bậu cổ' : 'Không bậu cổ'} ·{' '}
                {outfit.accessories.length} phụ kiện
              </p>
            </div>
          </div>
        </div>

        {/* CỘT PHẢI: BẢNG 3 KHU VỰC THẨM ĐỊNH */}
        <div className="lg:col-span-7 space-y-5">
          {/* TRƯỜNG HỢP 1: ĐANG PHÂN TÍCH CHO BỘ PHỐI MỚI */}
          {(isAnalyzing || (!feedback && !isError)) && (
            <div className="p-8 rounded-2xl bg-white border border-stone-200 text-center space-y-4 shadow-xs animate-pulse">
              <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6 animate-spin" />
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-stone-900">
                  Gemini Đang Đối Chiếu Dữ Liệu Văn Hóa Cho Bộ Phối Mới...
                </h3>
                <p className="text-xs text-stone-600 font-sans mt-1 max-w-md mx-auto">
                  Kiểm tra phom dáng áo ngũ thân, quy thức khăn hài và soát quy thức triều Nguyễn theo tư liệu lịch sử.
                </p>
              </div>

              {/* Nút bỏ qua chờ đợi nếu người dùng muốn xem kết quả ngay */}
              <div className="pt-2">
                <button
                  onClick={onNext}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
                >
                  <span>Bỏ qua chờ đợi & Xem trước kết quả ngay</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* TRƯỜNG HỢP 2: LỖI / TIMEOUT — BẢO LƯU BỘ PHỐI, ẨN LỖI JSON/HTML THÔ, HIỆN THÔNG BÁO DỄ HIỂU */}
          {isError && (
            <div className="p-6 sm:p-7 rounded-2xl bg-amber-50/90 border border-amber-300 text-amber-950 space-y-4 shadow-xs">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center shrink-0 text-amber-800 shadow-2xs">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-serif font-bold text-amber-950">
                    Chưa thể thẩm định lúc này
                  </h3>
                  <p className="text-xs sm:text-sm text-amber-900 font-sans leading-relaxed">
                    Bộ phối của bạn đã được giữ nguyên, bạn có thể thử lại hoặc tiếp tục mà không dùng ai.
                  </p>
                </div>
              </div>

              {/* 2 Lựa chọn duy nhất theo yêu cầu: Thử lại hoặc Tiếp tục không dùng AI */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3 border-t border-amber-200/90">
                <button
                  type="button"
                  onClick={() => onRunGeminiCheck()}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-stone-900 rounded-xl hover:bg-stone-800 transition-colors shadow-xs cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                  <span>Thử lại thẩm định</span>
                </button>
                <button
                  type="button"
                  onClick={handleProceed}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-stone-800 bg-white border border-stone-300 hover:bg-stone-100 rounded-xl transition-colors shadow-2xs cursor-pointer"
                >
                  <span>Tiếp tục không dùng AI</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-700" />
                </button>
              </div>
            </div>
          )}

          {/* TRƯỜNG HỢP 3: CÓ PHẢN HỒI THẨM ĐỊNH HỢP LỆ (3 KHU VỰC CHÍNH) */}
          {!isAnalyzing && !isError && feedback && (
            <>
              {/* KHU VỰC 1: NHẬN XÉT PHONG CÁCH (Ngắn gọn, không chiếm toàn màn) */}
              <div className="p-5 rounded-2xl bg-white/90 border border-stone-200/90 shadow-xs">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-amber-800" />
                  <h3 className="text-sm font-serif font-bold text-stone-900 uppercase tracking-wider">
                    1. Nhận Xét Phong Cách & Thẩm Mỹ
                  </h3>
                </div>
                <p className="text-sm text-stone-700 font-sans leading-relaxed">
                  {feedback.style_feedback.summary}
                </p>
              </div>

              {/* KHU VỰC 2: LƯU Ý VĂN HÓA (Thuần tiếng Việt) */}
              <div
                className={`p-5 rounded-2xl border shadow-xs transition-all ${
                  feedback.culture_check.status === 'ok'
                    ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                    : feedback.culture_check.status === 'needs_attention'
                    ? 'bg-amber-50/80 border-amber-300 text-amber-950'
                    : 'bg-sky-50/80 border-sky-300 text-sky-950'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {feedback.culture_check.status === 'ok' && (
                      <ShieldCheck className="w-5 h-5 text-emerald-700" />
                    )}
                    {feedback.culture_check.status === 'needs_attention' && (
                      <AlertTriangle className="w-5 h-5 text-amber-700" />
                    )}
                    {feedback.culture_check.status === 'insufficient_evidence' && (
                      <HelpCircle className="w-5 h-5 text-sky-700" />
                    )}
                    <h3 className="text-base font-serif font-bold">
                      2. Thẩm Định Chuẩn Mực Văn Hóa
                    </h3>
                  </div>

                  {/* Nhãn trạng thái tiếng Việt thuần */}
                  <span className="font-sans text-xs font-semibold px-3 py-1 rounded-full bg-white/90 border border-current shadow-2xs">
                    {formatStatus(feedback.culture_check.status)}
                  </span>
                </div>

                {/* Các phát hiện văn hóa hiển thị tên quy tắc và nguồn sử liệu tiếng Việt */}
                {feedback.culture_check.findings.length > 0 ? (
                  <div className="space-y-2.5 mt-2">
                    {feedback.culture_check.findings.map((f, i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-xl bg-white/85 border border-black/5 text-xs font-sans space-y-1.5 shadow-2xs"
                      >
                        <div className="flex items-center justify-between flex-wrap gap-2 text-[11px]">
                          <span className="font-semibold text-stone-900 font-serif text-xs">
                            {formatRuleId(f.rule_id)}
                          </span>
                          {f.evidence_ids && f.evidence_ids.length > 0 && (
                            <span className="text-amber-800 font-medium bg-amber-50 px-2 py-0.5 rounded border border-amber-200/70">
                              Căn cứ: {f.evidence_ids.map(formatEvidenceId).join(' · ')}
                            </span>
                          )}
                        </div>
                        <p className="text-stone-700 leading-relaxed">{f.message}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs font-sans">
                    Không phát hiện xung đột quy thức y quan nào. Bộ phối đạt sự tôn trọng di sản.
                  </p>
                )}

                {/* Lời giải thích tổng thể */}
                {feedback.explanation && (
                  <p className="text-xs mt-3 pt-3 border-t border-black/10 font-sans italic opacity-90">
                    "{feedback.explanation}"
                  </p>
                )}
              </div>

              {/* KHU VỰC 3: GỢI Ý ĐIỀU CHỈNH (Từng mục tiếng Việt rõ ràng) */}
              <div className="p-5 rounded-2xl bg-white/90 border border-stone-200/90 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-amber-800" />
                    <h3 className="text-sm font-serif font-bold text-stone-900 uppercase tracking-wider">
                      3. Đề Xuất Tinh Chỉnh (Tùy Chọn)
                    </h3>
                  </div>
                  <span className="text-xs text-stone-500 font-sans">
                    Không ép buộc thay đổi
                  </span>
                </div>

                {feedback.suggestions.length > 0 ? (
                  <div className="space-y-2.5">
                    {feedback.suggestions.map((sug, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs font-sans"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-stone-900 font-serif text-sm">
                              {formatAction(sug.action)}: {formatItemValue(sug.value)}
                            </span>
                            <span className="text-[10px] font-medium bg-stone-200 text-stone-700 px-2 py-0.5 rounded">
                              {formatTarget(sug.target)}
                            </span>
                          </div>
                          <p className="text-stone-600">{sug.reason}</p>
                        </div>

                        {sug.action !== 'keep' && (
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => handleApplySuggestion(sug)}
                              className="px-3 py-1.5 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
                            >
                              Áp dụng thay đổi
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-stone-500 font-sans italic">
                    Bộ phối đã rất hoàn chỉnh và cân đối. Bạn có thể tiến tới xem kết quả cuối cùng.
                  </p>
                )}
              </div>
            </>
          )}

          {/* Điều hướng Màn 4 ở dưới cùng trên Desktop */}
          <div className="hidden lg:flex items-center justify-between pt-6 border-t border-stone-200">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1.5 px-5 py-3 text-xs font-medium text-stone-700 bg-white border border-stone-300 rounded-xl hover:bg-stone-50 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>← Quay lại Xưởng phối (Màn 3)</span>
            </button>

            <button
              onClick={handleProceed}
              className="inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold text-white bg-stone-900 rounded-xl hover:bg-stone-800 transition-all shadow-md hover:gap-3 cursor-pointer"
            >
              <span>{isError ? 'Tiếp Tục Không Dùng AI (Màn 5)' : 'Xem Bộ Phối Của Bạn (Màn 5)'}</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Thanh điều hướng dính cố định ở đáy trên Mobile (Pinned Bottom Navigation Bar) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200/90 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="max-w-lg mx-auto flex items-center justify-between gap-3">
          <button
            onClick={onBack}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors shrink-0 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Màn 3</span>
          </button>

          <button
            onClick={handleProceed}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-all shadow-md cursor-pointer"
          >
            <span className="truncate">
              {isError ? 'Tiếp tục không dùng AI (Màn 5)' : 'Xem kết quả (Màn 5)'}
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );
};
