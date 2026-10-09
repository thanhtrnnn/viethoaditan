import React from 'react';
import { OutfitState, ColorOption } from '../types/vietPhuc.ts';
import { TRADITIONAL_COLORS, ACCESSORIES_LIST } from '../data/culturalData.ts';
import { formatItemValue } from '../utils/formatters.ts';
import { LayerCanvas } from '../components/LayerCanvas.tsx';
import { Palette, Sparkles, Layers, ArrowLeft, ArrowRight, ShieldCheck, Check, ChevronUp } from 'lucide-react';

interface Screen3Props {
  outfit: OutfitState;
  onUpdateOutfit: (updates: Partial<OutfitState>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Screen3Studio: React.FC<Screen3Props> = ({
  outfit,
  onUpdateOutfit,
  onNext,
  onBack,
}) => {
  const toggleAccessory = (accId: string) => {
    const exists = outfit.accessories.includes(accId);
    let next: string[];
    if (exists) {
      next = outfit.accessories.filter((id) => id !== accId);
    } else {
      next = [...outfit.accessories, accId];
    }
    onUpdateOutfit({ accessories: next });
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:py-8 px-4 sm:px-6 pb-28 lg:pb-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-800 mb-1">
            <span>Màn 3 / 5</span>
            <span>·</span>
            <span>Xưởng Phối Ghép Đa Tầng</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
            Hoàn thiện bộ phối
          </h1>
          <p className="text-sm text-stone-600 mt-1 font-sans">
            Chọn màu áo, quần và phụ kiện để xem thay đổi ngay trên mẫu
          </p>
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
                <span className="text-amber-800 font-medium">· Cuộn lên ↑</span>
              </div>
            </div>
          </button>

          {/* Nút hành động nhanh bên phải */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={() => onUpdateOutfit({ gender: outfit.gender === 'nam' ? 'nu' : 'nam' })}
              className={`px-2 py-1.5 text-[11px] font-sans font-medium rounded-lg border transition-colors cursor-pointer whitespace-nowrap ${
                outfit.gender === 'nu'
                  ? 'bg-rose-50 text-rose-900 border-rose-300 hover:bg-rose-100'
                  : 'bg-white text-stone-800 border-stone-300 hover:bg-stone-100'
              }`}
              title="Đổi dáng Nam / Nữ"
            >
              Đổi {outfit.gender === 'nam' ? 'Nữ' : 'Nam'}
            </button>
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* CỘT TRÁI: BỘ XEM TRƯỚC GHÉP LỚP (PREVIEW CANVAS) */}
        <div className="lg:col-span-5 lg:sticky lg:top-20 self-start flex flex-col items-center z-10">
          <LayerCanvas
            outfit={outfit}
            onToggleGender={(gender) => onUpdateOutfit({ gender })}
            className="w-full max-w-[380px] shadow-sm"
          />

          {/* Bảng tóm tắt bộ phối hiện tại */}
          <div className="w-full max-w-[380px] mt-4 p-3.5 rounded-xl bg-white border border-stone-200 text-xs font-sans space-y-1.5">
            <div className="text-stone-500 text-[11px] font-sans font-medium pb-1 border-b border-stone-100">
              Bộ phối hiện tại
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-600">Giới tính:</span>
              <span className={`font-semibold ${outfit.gender === 'nu' ? 'text-rose-900' : 'text-stone-900'}`}>
                {outfit.gender === 'nu' ? 'Nữ phục (Duyên dáng)' : 'Nam phục (Đĩnh đạc)'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-600">Áo:</span>
              <span className="font-medium text-stone-900 flex items-center gap-1.5">
                <span
                  className="w-3 h-3 rounded-full border border-stone-300"
                  style={{ backgroundColor: outfit.primaryColor.hex }}
                />
                {outfit.primaryColor.name}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-600">Quần:</span>
              <span className="font-medium text-stone-900">
                {outfit.pantsColor === 'white' ? 'Trắng sa lụa' : 'Hắc sa đen tuyền'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-600">Số phụ kiện:</span>
              <span className="font-medium text-stone-900">
                {outfit.accessories.length} món
              </span>
            </div>
          </div>
        </div>

        {/* CỘT PHẢI: BẢNG ĐIỀU KHIỂN TÙY BIẾN */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Chọn Bảng Màu Cổ Truyền */}
          <div className="bg-white/80 border border-stone-200/90 rounded-2xl p-5 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-amber-800" />
                <h2 className="text-base font-serif font-bold text-stone-900">
                  1. Sắc Màu Áo Ngũ Thân
                </h2>
              </div>
              <span className="text-xs font-mono text-stone-500">
                {outfit.primaryColor.vietnameseName}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {TRADITIONAL_COLORS.map((col) => {
                const isSelected = outfit.primaryColor.id === col.id;
                return (
                  <button
                    key={col.id}
                    onClick={() => onUpdateOutfit({ primaryColor: col })}
                    className={`flex items-center gap-2.5 p-2 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-stone-50 border-stone-900 ring-1 ring-stone-900'
                        : 'bg-white border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    <span
                      className="w-6 h-6 rounded-lg border border-black/10 shrink-0 shadow-2xs"
                      style={{ backgroundColor: col.hex }}
                    />
                    <div className="overflow-hidden">
                      <span className="block text-xs font-medium text-stone-900 truncate">
                        {col.name}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-xs text-stone-500 font-sans italic">
              {outfit.primaryColor.description}
            </p>
          </div>

          {/* 2. Cấu Trúc Quần & Lớp Lót Cổ */}
          <div className="bg-white/80 border border-stone-200/90 rounded-2xl p-5 sm:p-6 shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <Layers className="w-4 h-4 text-amber-800" />
              <h2 className="text-base font-serif font-bold text-stone-900">
                2. Quy Thức Quần & Bậu Cổ Lót
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Chọn màu quần */}
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1.5">
                  Màu sắc quần lụa:
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => onUpdateOutfit({ pantsColor: 'white' })}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                      outfit.pantsColor === 'white'
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full bg-white border border-stone-400" />
                    <span>Trắng lụa sa (Chuẩn)</span>
                  </button>
                  <button
                    onClick={() => onUpdateOutfit({ pantsColor: 'black' })}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                      outfit.pantsColor === 'black'
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full bg-[#1C1917] border border-stone-400" />
                    <span>Hắc sa đen</span>
                  </button>
                </div>
              </div>

              {/* Bậu cổ lót trong */}
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1.5">
                  Bậu cổ áo lót trong:
                </label>
                <button
                  onClick={() => onUpdateOutfit({ hasInnerLayer: !outfit.hasInnerLayer })}
                  className={`w-full flex items-center justify-between py-2 px-3 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                    outfit.hasInnerLayer
                      ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                      : 'bg-stone-100 text-stone-600 border-stone-300'
                  }`}
                >
                  <span>Có bậu cổ trắng (Đúng quy thức)</span>
                  <span
                    className={`w-4 h-4 rounded flex items-center justify-center text-[10px] ${
                      outfit.hasInnerLayer ? 'bg-emerald-600 text-white' : 'border border-stone-400'
                    }`}
                  >
                    {outfit.hasInnerLayer && <Check className="w-3 h-3" />}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* 3. Phụ Kiện Kèm Theo */}
          <div className="bg-white/80 border border-stone-200/90 rounded-2xl p-5 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-800" />
                <h2 className="text-base font-serif font-bold text-stone-900">
                  3. Phụ Kiện Phối Kèm
                </h2>
              </div>
              <span className="text-xs text-stone-500 font-sans">
                Đã chọn: {outfit.accessories.length} món
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {ACCESSORIES_LIST.map((acc) => {
                const isSelected = outfit.accessories.includes(acc.id);
                return (
                  <div
                    key={acc.id}
                    onClick={() => toggleAccessory(acc.id)}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex items-start gap-3 ${
                      isSelected
                        ? acc.isModern
                          ? 'bg-rose-50/70 border-rose-400 ring-1 ring-rose-400'
                          : 'bg-amber-50/70 border-amber-800 ring-1 ring-amber-800/40'
                        : 'bg-white border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded mt-0.5 shrink-0 flex items-center justify-center text-[10px] transition-colors ${
                        isSelected
                          ? acc.isModern
                            ? 'bg-rose-600 text-white'
                            : 'bg-amber-800 text-white'
                          : 'border border-stone-300 bg-stone-50'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-stone-900 font-serif">
                          {acc.name}
                        </span>
                        {acc.isModern && (
                          <span className="text-[10px] font-mono px-1 py-0.2 bg-rose-100 text-rose-800 rounded">
                            Hiện đại
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-stone-500 font-sans leading-tight">
                        {acc.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA & Điều hướng trên Desktop */}
          <div className="hidden lg:flex items-center justify-between pt-4 border-t border-stone-200">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium text-stone-700 bg-white border border-stone-300 rounded-xl hover:bg-stone-50 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Quay lại Màn 2</span>
            </button>

            <button
              onClick={onNext}
              className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-stone-900 rounded-xl hover:bg-stone-800 transition-all shadow-md hover:gap-3 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Thẩm định văn hóa</span>
              <ArrowRight className="w-4 h-4" />
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
            <span>Màn 2</span>
          </button>

          <button
            onClick={onNext}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-all shadow-md cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="truncate">Thẩm định văn hóa</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );
};
