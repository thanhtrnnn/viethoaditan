import React from 'react';
import { OutfitState } from '../types/vietPhuc.ts';
import { LayerCanvas } from '../components/LayerCanvas.tsx';
import { ACCESSORIES_LIST } from '../data/culturalData.ts';
import { formatStatus, formatItemValue } from '../utils/formatters.ts';
import {
  RotateCcw,
  Share2,
  Check,
  ShieldCheck,
  Award,
  Sparkles,
  ArrowLeft,
} from 'lucide-react';

interface Screen5Props {
  outfit: OutfitState;
  onUpdateOutfit?: (updates: Partial<OutfitState>) => void;
  onBackToStudio: () => void;
  onReset: () => void;
}

export const Screen5Result: React.FC<Screen5Props> = ({
  outfit,
  onUpdateOutfit,
  onBackToStudio,
  onReset,
}) => {
  const [copied, setCopied] = React.useState(false);

  const genderLabel = outfit.gender === 'nu' ? 'Nữ phục' : 'Nam phục';

  const accessoryNames = outfit.accessories
    .map((id) => ACCESSORIES_LIST.find((a) => a.id === id)?.name || formatItemValue(id))
    .filter(Boolean);

  const styleLabel =
    outfit.style === 'truyen_thong'
      ? 'Phối cổ điển'
      : outfit.style === 'toi_gian'
      ? 'Thanh lịch tối giản'
      : 'Trẻ trung cách tân';

  const contextLabel =
    outfit.context === 'dao_pho'
      ? 'Dạo phố'
      : outfit.context === 'le_hoi'
      ? 'Lễ hội truyền thống'
      : outfit.context === 'su_kien_cuoi_hoi'
      ? 'Sự kiện trang trọng'
      : 'Công sở';

  const summaryLine = `${genderLabel} · ${styleLabel} · Sắc ${outfit.primaryColor.name.toLowerCase()} · ${
    outfit.pantsColor === 'white' ? 'Quần trắng lụa' : 'Quần đen sa'
  }${accessoryNames.length > 0 ? ` · ${accessoryNames.join(', ')}` : ''}`;

  const handleShare = () => {
    const text = `Bộ phối Việt Phục của tôi tại Việt Hoa Di Tân:\n- Mô hình: ${genderLabel}\n- Trang phục: Áo ngũ thân tay chẽn\n- Sắc màu: ${outfit.primaryColor.name} (${outfit.primaryColor.vietnameseName})\n- Phong cách: ${styleLabel}\n- Dịp diện: ${contextLabel}\n- Phụ kiện: ${accessoryNames.join(', ') || 'Giản lược'}`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
      {/* Khung thẻ triển lãm chính */}
      <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-10 shadow-lg text-center space-y-6">
        {/* Title: Diện mạo hoàn thiện */}
        <div className="space-y-1">
          <div className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-800">
            <span>Việt Hoa Di Tân</span>
            <span>·</span>
            <span>Màn 5 / 5 Hoàn Tất</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            Diện mạo hoàn thiện
          </h1>
        </div>

        {/* Khung trưng bày trung tâm */}
        <div className="flex justify-center py-2">
          <LayerCanvas
            outfit={outfit}
            zoom={true}
            onToggleGender={onUpdateOutfit ? (gender) => onUpdateOutfit({ gender }) : undefined}
            className="w-full max-w-[360px] sm:max-w-[400px] shadow-md border-stone-300"
          />
        </div>

        {/* Nhận xét từ Gemini (nếu đã thẩm định thành công) hoặc ghi nhận bộ phối tự do (kèm dòng tóm tắt liền mạch) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F2] border border-stone-200/80 max-w-xl mx-auto text-left space-y-2.5">
          <div className="flex items-center justify-between text-xs font-mono text-stone-500">
            <span className="flex items-center gap-1.5 font-semibold text-stone-800">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>
                {!outfit.feedback || outfit.geminiStatus === 'skipped'
                  ? 'Bản phối tự do · chưa có góp ý từ AI'
                  : 'Đánh giá thẩm mỹ & văn hóa'}
              </span>
            </span>
            {(!outfit.feedback || outfit.geminiStatus === 'skipped') ? null : (
              <span
                className={`font-sans font-semibold text-xs px-2.5 py-0.5 rounded-full border ${
                  outfit.feedback?.culture_check?.status === 'ok'
                    ? 'text-emerald-800 bg-emerald-50 border-emerald-300'
                    : outfit.feedback?.culture_check?.status === 'needs_attention'
                    ? 'text-amber-800 bg-amber-50 border-amber-300'
                    : 'text-sky-800 bg-sky-50 border-sky-300'
                }`}
              >
                {formatStatus(outfit.feedback?.culture_check?.status || 'ok')}
              </span>
            )}
          </div>

          {/* Dòng tóm tắt cấu hình được gộp vào đầu thẻ nhận xét giúp kết quả liền mạch */}
          <p className="text-xs font-serif italic text-stone-600 pb-2 border-b border-stone-200/60">
            {summaryLine}
          </p>

          <p className="text-xs sm:text-sm text-stone-700 font-sans leading-relaxed">
            {!outfit.feedback || outfit.geminiStatus === 'skipped'
              ? 'Bản phối của bạn đã được ghi nhận, bạn có thể chỉnh sửa, sao chép công thức hoặc phối bộ mới'
              : outfit.feedback?.style_feedback?.summary ||
                'Bản phối của bạn đã được ghi nhận, bạn có thể chỉnh sửa, sao chép công thức hoặc phối bộ mới'}
          </p>

          {outfit.geminiStatus !== 'skipped' && outfit.feedback?.explanation && (
            <p className="text-[11px] text-stone-500 font-sans italic border-t border-stone-200/60 pt-1.5">
              "{outfit.feedback.explanation}"
            </p>
          )}
        </div>

        {/* Nút hành động chính */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-stone-200">
          <button
            onClick={onBackToStudio}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-stone-900 rounded-xl hover:bg-stone-800 transition-all shadow-md cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← Quay Lại Chỉnh Sửa</span>
          </button>

          <button
            onClick={handleShare}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-stone-800 bg-stone-100 hover:bg-stone-200/80 rounded-xl transition-colors border border-stone-300 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Đã sao chép công thức!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-stone-600" />
                <span>Sao chép công thức phối</span>
              </>
            )}
          </button>

          <button
            onClick={onReset}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Phối bộ mới</span>
          </button>
        </div>

        {/* Ghi chú tính năng ướm thử trong tương lai */}
        <p className="text-xs text-stone-500 font-sans italic">
          * Tính năng ướm thử trang phục lên ảnh chân dung cá nhân sẽ có trong phiên bản sau.
        </p>
      </div>
    </div>
  );
};
