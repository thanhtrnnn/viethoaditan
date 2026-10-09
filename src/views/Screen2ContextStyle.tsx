import React from 'react';
import { OutfitState, ContextType, StyleType } from '../types/vietPhuc.ts';
import { Compass, Sparkles, ArrowRight, ArrowLeft, Check } from 'lucide-react';

interface Screen2Props {
  outfit: OutfitState;
  onUpdateOutfit: (updates: Partial<OutfitState>) => void;
  onNext: () => void;
  onBack: () => void;
}

const CONTEXTS: { id: ContextType; title: string; subtitle: string; desc: string }[] = [
  {
    id: 'dao_pho',
    title: 'Dạo Phố & Cà Phê',
    subtitle: 'Sinh hoạt thường nhật',
    desc: 'Không gian thoải mái, tự do kết hợp phụ kiện nhẹ nhàng, giày da hoặc hài mộc.',
  },
  {
    id: 'le_hoi',
    title: 'Lễ Hội Truyền Thống / Tết',
    subtitle: 'Nghênh xuân & Hội hè',
    desc: 'Ưu tiên các gam màu tươi tắn (đỏ điều, lam thủy, vàng hoa mướp), khăn vấn chỉn chu.',
  },
  {
    id: 'su_kien_cuoi_hoi',
    title: 'Sự Kiện Trang Trọng / Tế Lễ',
    subtitle: 'Không gian nghi lễ tôn nghiêm',
    desc: 'Có thể chọn hài gấm và khăn đóng để tạo vẻ chỉn chu. Đây là gợi ý phối, không phải quy định bắt buộc trong lịch sử.',
  },
  {
    id: 'cong_so',
    title: 'Công Sở & Gặp Gỡ Hiện Đại',
    subtitle: 'Việt phục ứng dụng đời sống',
    desc: 'Phối cùng quần âu đen tối giản, tay chẽn gọn gàng, toát lên phong thái chuyên nghiệp.',
  },
];

const STYLES: { id: StyleType; title: string; desc: string }[] = [
  {
    id: 'truyen_thong',
    title: 'Phối cổ điển',
    desc: 'Áo ngũ thân, quần lụa, khăn vấn và hài gấm cho tổng thể trang trọng',
  },
  {
    id: 'toi_gian',
    title: 'Thanh Lịch Tối Giản',
    desc: 'Giữ nguyên phom dáng cổ đứng ngũ thân, giản lược phụ kiện rườm rà, tạo nét thanh thoát nhẹ nhàng.',
  },
  {
    id: 'cach_tan',
    title: 'Trẻ Trung Cách Tân',
    desc: 'Mở rộng thử nghiệm phối cùng yếu tố đương đại (túi, kính, giày), cần lưu ý bối cảnh xuất hiện.',
  },
];

export const Screen2ContextStyle: React.FC<Screen2Props> = ({
  outfit,
  onUpdateOutfit,
  onNext,
  onBack,
}) => {
  return (
    <div className="max-w-5xl mx-auto py-6 sm:py-10 px-4 sm:px-6">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
        <div className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-800 mb-2">
          <span>Màn 2 / 5</span>
          <span>·</span>
          <span>Ngữ cảnh & Phong cách</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
          Chọn bối cảnh và phong cách
        </h1>
        <p className="text-sm text-stone-600 font-sans mt-2">
          Chọn dịp diện và phong cách bạn muốn thử. Phần góp ý sẽ dựa trên những lựa chọn này.
        </p>
      </div>

      <div className="space-y-8">
        {/* Phần 1: Chọn Ngữ Cảnh */}
        <div className="bg-white/80 border border-stone-200/90 rounded-2xl p-6 sm:p-7 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <Compass className="w-5 h-5 text-amber-800" />
            <h2 className="text-lg font-serif font-bold text-stone-900">
              Bối cảnh & dịp diện
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {CONTEXTS.map((ctx) => {
              const isSelected = outfit.context === ctx.id;
              return (
                <div
                  key={ctx.id}
                  onClick={() => onUpdateOutfit({ context: ctx.id })}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all duration-150 ${
                    isSelected
                      ? 'bg-amber-50/70 border-amber-800/80 shadow-xs ring-1 ring-amber-800/40'
                      : 'bg-white border-stone-200 hover:border-stone-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-serif font-semibold text-stone-900 text-base">
                      {ctx.title}
                    </span>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-amber-800 text-white flex items-center justify-center text-xs">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  <span className="block text-[11px] font-mono text-amber-900 font-medium mb-1.5">
                    {ctx.subtitle}
                  </span>
                  <p className="text-xs text-stone-600 font-sans leading-relaxed">
                    {ctx.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Phần 2: Chọn Phong Cách */}
        <div className="bg-white/80 border border-stone-200/90 rounded-2xl p-6 sm:p-7 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-amber-800" />
            <h2 className="text-lg font-serif font-bold text-stone-900">
              Định hướng phong cách
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {STYLES.map((st) => {
              const isSelected = outfit.style === st.id;
              return (
                <div
                  key={st.id}
                  onClick={() => onUpdateOutfit({ style: st.id })}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all duration-150 ${
                    isSelected
                      ? 'bg-amber-50/70 border-amber-800/80 shadow-xs ring-1 ring-amber-800/40'
                      : 'bg-white border-stone-200 hover:border-stone-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-serif font-semibold text-stone-900 text-base">
                      {st.title}
                    </span>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-amber-800 text-white flex items-center justify-center text-[10px]">
                        <Check className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-600 font-sans leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Điều hướng */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium text-stone-700 bg-white border border-stone-300 rounded-xl hover:bg-stone-50 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Quay lại Màn 1</span>
          </button>

          <button
            onClick={onNext}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-medium text-white bg-stone-900 rounded-xl hover:bg-stone-800 transition-colors shadow-xs"
          >
            <span>Vào xưởng phối</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
