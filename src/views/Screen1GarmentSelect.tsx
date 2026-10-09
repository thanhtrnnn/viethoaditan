import React from 'react';
import { OutfitState, GarmentGender } from '../types/vietPhuc.ts';
import { LayerCanvas } from '../components/LayerCanvas.tsx';
import { BookOpen, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface Screen1Props {
  outfit: OutfitState;
  onUpdateOutfit: (updates: Partial<OutfitState>) => void;
  onNext: () => void;
}

export const Screen1GarmentSelect: React.FC<Screen1Props> = ({
  outfit,
  onUpdateOutfit,
  onNext,
}) => {
  return (
    <div className="max-w-6xl mx-auto py-6 sm:py-10 px-4 sm:px-6">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
        <div className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-800 mb-2">
          <span>Màn 1 / 5</span>
          <span>·</span>
          <span>Chọn trang phục khởi điểm</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
          Áo Ngũ Thân Tay Chẽn
        </h1>
        <p className="text-sm sm:text-base text-stone-600 font-sans mt-3 max-w-2xl mx-auto">
          Di sản y phục định hình diện mạo người Việt thời Nguyễn (thế kỷ 18–19). Vừa đoan trang, tôn nghiêm trong nghi lễ, vừa gọn gàng, thuận tiện trong sinh hoạt thường nhật.
        </p>
      </div>

      {/* Main Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white/70 border border-stone-200/90 rounded-3xl p-6 sm:p-10 shadow-xs">
        {/* Cột trái: Xem trước trang phục mẫu */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <LayerCanvas
            outfit={outfit}
            hideGenderIndicator={true}
            className="w-full max-w-[360px] shadow-sm"
          />

          {/* Cụm chọn giới tính Nam / Nữ duy nhất ngay dưới khung xem trước */}
          <div className="mt-4 flex items-center p-1 bg-stone-100 rounded-lg border border-stone-200">
            <button
              type="button"
              onClick={() => onUpdateOutfit({ gender: 'nam' as GarmentGender })}
              className={`px-4 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                outfit.gender === 'nam'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Nam phục (Đĩnh đạc)
            </button>
            <button
              type="button"
              onClick={() => onUpdateOutfit({ gender: 'nu' as GarmentGender })}
              className={`px-4 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                outfit.gender === 'nu'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Nữ phục (Duyên dáng)
            </button>
          </div>
        </div>

        {/* Cột phải: Hồ sơ văn hóa & Ý nghĩa di sản */}
        <div className="lg:col-span-7 space-y-6 text-stone-800">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-stone-500 mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Tư liệu tham khảo</span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-stone-900">
              Cấu Trúc Tứ Thân Phụ Mẫu & Ngũ Khuy
            </h2>
          </div>

          <div className="space-y-4 text-sm font-sans text-stone-600 leading-relaxed">
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80">
              <h3 className="font-serif font-semibold text-stone-900 text-base mb-1">
                Triết lý Ngũ Thân
              </h3>
              <p>
                Gồm 5 thân vải: 2 thân trước, 2 thân sau ghép lại thẳng tắp ở sống lưng (sự quang minh chính trực), và 1 thân con (nội thân) lót bên trong ngực che kín cơ thể. Bốn thân ngoài tượng trưng cho <strong>tứ thân phụ mẫu</strong>, thân con tượng trưng cho bản thân được cha mẹ che chở, bao bọc.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80">
              <h3 className="font-serif font-semibold text-stone-900 text-base mb-1">
                Ngũ Khuy & Đạo Đức Ngũ Thường
              </h3>
              <p>
                Năm chiếc khuy cài bằng đồng hoặc ngọc bên sườn phải đại diện cho 5 phẩm hạnh cao quý: <strong>Nhân · Lễ · Nghĩa · Trí · Tín</strong>. Cổ đứng vuông vắn kết hợp tay chẽn thon dài tạo nên phong thái khiêm nhu, mực thước.
              </p>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end border-t border-stone-200">
            <button
              onClick={onNext}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-stone-900 rounded-xl hover:bg-stone-800 transition-all shadow-sm hover:gap-3 cursor-pointer"
            >
              <span>Tiếp tục: Chọn bối cảnh</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
