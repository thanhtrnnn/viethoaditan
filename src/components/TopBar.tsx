import React from 'react';

interface TopBarProps {
  currentStep: number;
  onSelectStep: (step: number) => void;
}

const STEPS = [
  { step: 1, label: 'Chọn áo' },
  { step: 2, label: 'Bối cảnh' },
  { step: 3, label: 'Xưởng phối' },
  { step: 4, label: 'Đánh giá văn hóa' },
  { step: 5, label: 'Kết quả' },
];

export const TopBar: React.FC<TopBarProps> = ({
  currentStep,
  onSelectStep,
}) => {
  const currentStepObj = STEPS.find((s) => s.step === currentStep) || STEPS[0];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-stone-200/90 px-4 sm:px-6 lg:px-8 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onSelectStep(1)}
            className="text-left group cursor-pointer focus:outline-none"
          >
            <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-stone-900 group-hover:text-amber-800 transition-colors">
              Việt Hoa Di Tân
            </span>
          </button>
        </div>

        {/* Zone 2: 5-step clean progress line for desktop */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2 text-xs font-sans">
          {STEPS.map((s, idx) => {
            const isActive = currentStep === s.step;
            const isCompleted = currentStep > s.step;

            return (
              <React.Fragment key={s.step}>
                <button
                  onClick={() => onSelectStep(s.step)}
                  className={`flex items-center gap-1.5 py-1 px-2.5 rounded-md transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-stone-900 text-stone-50 font-semibold shadow-xs'
                      : isCompleted
                      ? 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/60'
                      : 'text-stone-400 hover:text-stone-600'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-mono ${
                      isActive
                        ? 'bg-amber-500 text-stone-950 font-bold'
                        : isCompleted
                        ? 'bg-stone-300 text-stone-800 font-bold'
                        : 'bg-stone-200 text-stone-500'
                    }`}
                  >
                    {s.step}
                  </span>
                  <span>{s.label}</span>
                </button>
                {idx < STEPS.length - 1 && (
                  <span className="text-stone-300 select-none">/</span>
                )}
              </React.Fragment>
            );
          })}
        </nav>

        {/* Zone 3: Mobile step indicator & subtle status */}
        <div className="flex items-center gap-2">
          {/* Mobile step pill */}
          <div className="flex md:hidden items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-100 border border-stone-200 text-xs font-sans text-stone-700">
            <span className="w-4 h-4 rounded-full bg-stone-900 text-stone-100 flex items-center justify-center text-[10px] font-mono font-bold">
              {currentStep}
            </span>
            <span className="font-medium text-stone-900">{currentStepObj.label}</span>
            <span className="text-stone-400">/ 5</span>
          </div>

          {/* Desktop subtle museum label */}
          <span className="hidden lg:inline-flex items-center text-xs font-serif italic text-stone-500">
            Xưởng Phối Việt Phục
          </span>
        </div>
      </div>
    </header>
  );
};
