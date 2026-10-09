import React from 'react';
import { OutfitState, GarmentGender } from '../types/vietPhuc.ts';

interface LayerCanvasProps {
  outfit: OutfitState;
  isOutlineFallback?: boolean;
  className?: string;
  zoom?: boolean;
  onToggleGender?: (gender: GarmentGender) => void;
  compact?: boolean;
  hideGenderIndicator?: boolean;
}

export const LayerCanvas: React.FC<LayerCanvasProps> = ({
  outfit,
  isOutlineFallback = false,
  className = '',
  zoom = false,
  onToggleGender,
  compact = false,
  hideGenderIndicator = false,
}) => {
  const isFemale = outfit.gender === 'nu';
  const primaryHex = outfit.primaryColor?.hex || '#1D3557';
  const pantsHex = outfit.pantsColor === 'black' ? '#1C1917' : '#FAF9F6';
  const innerCollarHex = outfit.innerCollarColor || '#FFFFFF';

  const hasKhanVan = outfit.accessories.includes('khan_van');
  const hasHaiGam = outfit.accessories.includes('hai_gam');
  const hasQuatXep = outfit.accessories.includes('quat_xep');
  const hasKiengBac = outfit.accessories.includes('kieng_bac');
  const hasTuiGam = outfit.accessories.includes('tui_gam');
  const hasSneaker = outfit.accessories.includes('sneaker_hien_dai');
  const hasTuiDeoCheo = outfit.accessories.includes('tui_deo_cheo');

  // Viền nét và màu đổ
  const strokeColor = isOutlineFallback ? '#C59B27' : 'rgba(0, 0, 0, 0.22)';
  const fillColor = isOutlineFallback ? 'transparent' : primaryHex;

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-[#F7F4EE] border border-stone-200/80 ${
        compact ? 'p-1' : 'p-4'
      } transition-all duration-300 ${
        zoom ? 'scale-105' : ''
      } ${className}`}
      style={{
        backgroundImage: `radial-gradient(#E8E2D5 1px, transparent 1px)`,
        backgroundSize: '20px 20px',
      }}
    >
      {/* Huy hiệu Di sản & Chế độ hiển thị (chỉ hiện khi không ở chế độ compact) */}
      {!compact && (
        <div className="absolute top-3 left-3 flex items-center gap-1.5 text-[11px] text-stone-500 font-sans z-20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
          <span className="font-medium text-stone-700">Mô hình xem trước</span>
          {isOutlineFallback && (
            <span className="ml-1 text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded text-[10px] font-medium border border-amber-200">
              Nét phác thảo
            </span>
          )}
        </div>
      )}

      {/* Bộ chọn và Nhãn mô hình Nam / Nữ (chỉ hiện khi không ở chế độ compact và không bị ẩn) */}
      {!compact && !hideGenderIndicator && (
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-20">
          {onToggleGender ? (
            <div className="flex items-center p-0.5 bg-stone-200/90 rounded-lg text-[10px] font-sans border border-stone-300/80 shadow-2xs">
              <button
                type="button"
                onClick={() => onToggleGender('nam')}
                className={`px-2.5 py-0.5 rounded-md transition-all cursor-pointer font-medium ${
                  !isFemale
                    ? 'bg-stone-900 text-white shadow-2xs'
                    : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100/50'
                }`}
              >
                Mô hình Nam
              </button>
              <button
                type="button"
                onClick={() => onToggleGender('nu')}
                className={`px-2.5 py-0.5 rounded-md transition-all cursor-pointer font-medium ${
                  isFemale
                    ? 'bg-rose-900 text-white shadow-2xs'
                    : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100/50'
                }`}
              >
                Mô hình Nữ
              </button>
            </div>
          ) : (
            <span
              className={`text-[10px] font-sans font-semibold px-2.5 py-0.5 rounded-md border shadow-2xs ${
                isFemale
                  ? 'bg-rose-50 text-rose-900 border-rose-300'
                  : 'bg-blue-50 text-blue-900 border-blue-300'
              }`}
            >
              {isFemale ? 'Mô hình Nữ (Duyên dáng)' : 'Mô hình Nam (Đĩnh đạc)'}
            </span>
          )}
        </div>
      )}

      {/* SVG Layer-First Vector Graphic: Phân biệt rõ rệt hình thể & phom dáng Nam / Nữ */}
      <svg
        viewBox="0 0 400 620"
        preserveAspectRatio="xMidYMid meet"
        className={compact ? "w-full h-full max-h-full object-contain select-none" : "w-full max-w-[340px] md:max-w-[400px] h-auto drop-shadow-sm select-none"}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Đổ bóng cho các lớp vải */}
          <filter id="layerShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.12" />
          </filter>
          <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.08" />
          </filter>

          {/* Ánh sáng vải lụa tơ tằm nam: đường dệt suông đứng */}
          <linearGradient id="silkSheenMale" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.20" />
            <stop offset="50%" stopColor="#000000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.25" />
          </linearGradient>

          {/* Ánh vải nữ mềm mại: bắt sáng theo đường cong eo & tà xòe */}
          <linearGradient id="silkSheenFemale" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.32" />
            <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.08" />
            <stop offset="70%" stopColor="#000000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.22" />
          </linearGradient>

          {/* Hoa văn chìm dệt gấm truyền thống */}
          <pattern id="brocadePattern" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="12" cy="12" r="1.8" fill="rgba(255,255,255,0.09)" />
            <path
              d="M 12 4 L 16 12 L 12 20 L 8 12 Z"
              fill="none"
              stroke="rgba(255,255,255,0.07)"
              strokeWidth="0.8"
            />
          </pattern>
        </defs>

        {/* LỚP 1: BÓNG DƯỚI CHÂN & THẾ ĐỨNG */}
        <ellipse
          cx="200"
          cy="582"
          rx={isFemale ? '78' : '96'}
          ry={isFemale ? '12' : '15'}
          fill="#000000"
          opacity="0.09"
        />

        {/* LỚP 2: ĐẦU, MẶT, TÓC & CỔ NGƯỜI MẪU (PHÂN BIỆT RÕ GƯƠNG MẶT & TÓC NAM / NỮ) */}
        <g id="layer-head">
          {isFemale ? (
            // ==================== MÔ HÌNH NỮ: MẶT TRÁI XOAN, CỔ THON, TÓC TRẦN BÚI GÁY CÀI TRÂM ====================
            <g id="female-model-head">
              {/* Búi tóc tròn thấp sau gáy */}
              <ellipse cx="200" cy="74" rx="24" ry="18" fill="#181514" />

              {/* Cổ ba ngấn thon thả duyên dáng */}
              <path
                d="M 192 110 L 192 148 L 208 148 L 208 110 Z"
                fill="#FFF1E8"
                stroke="#E8C3B0"
                strokeWidth="0.8"
              />
              <line x1="195" y1="126" x2="205" y2="126" stroke="#E8C3B0" strokeWidth="0.6" opacity="0.6" />

              {/* Khuôn mặt trái xoan thanh tú */}
              <path
                d="M 185 76 Q 200 64 215 76 Q 219 96 200 114 Q 181 96 185 76 Z"
                fill="#FFF5EE"
                stroke="#E2B7A0"
                strokeWidth="0.9"
              />

              {/* Mái tóc đen óng rẽ ngôi giữa chuẩn mực truyền thống */}
              <path
                d="M 185 76 C 188 66 195 64 200 68 C 205 64 212 66 215 76 C 208 70 203 72 200 73 C 197 72 192 70 185 76 Z"
                fill="#181514"
              />
              <line x1="200" y1="66" x2="200" y2="73" stroke="#3D342F" strokeWidth="0.8" />

              {/* Lông mày lá liễu cong nhẹ */}
              <path d="M 189 82 Q 194 79 198 82" stroke="#4A3B32" strokeWidth="0.9" fill="none" strokeLinecap="round" />
              <path d="M 202 82 Q 206 79 211 82" stroke="#4A3B32" strokeWidth="0.9" fill="none" strokeLinecap="round" />

              {/* Đôi mắt phượng Á Đông dịu dàng */}
              <path d="M 190 86 Q 194 84 198 86.5" stroke="#2B211E" strokeWidth="1.2" fill="none" />
              <path d="M 202 86.5 Q 206 84 210 86" stroke="#2B211E" strokeWidth="1.2" fill="none" />
              <circle cx="194" cy="86" r="1.1" fill="#2B211E" />
              <circle cx="206" cy="86" r="1.1" fill="#2B211E" />

              {/* Má ửng hồng phấn đào */}
              <circle cx="189" cy="94" r="3.5" fill="#F8B4B8" opacity="0.45" />
              <circle cx="211" cy="94" r="3.5" fill="#F8B4B8" opacity="0.45" />

              {/* Môi son đào chúm chím */}
              <path d="M 197 103 Q 200 101.5 203 103 Q 200 106 197 103 Z" fill="#D96369" />

              {/* Cành trâm cài tóc ngọc hoa mai ánh vàng bên mang tai */}
              <g id="tram-cai-toc-nu">
                <circle cx="218" cy="74" r="3" fill="#D4AF37" stroke="#996515" strokeWidth="0.6" />
                <circle cx="218" cy="74" r="1.3" fill="#DE4D60" />
                <path d="M 218 77 L 222 85" stroke="#D4AF37" strokeWidth="1" strokeLinecap="round" />
                <circle cx="222" cy="86" r="1.2" fill="#FAF9F6" />
              </g>
            </g>
          ) : (
            // ==================== MÔ HÌNH NAM: MẶT CHỮ ĐIỀN CƯƠNG NGHỊ, CỔ TO VẠM VỠ, BÚI TÓ NAM TÍNH ====================
            <g id="male-model-head">
              {/* Búi củ tỏi (búi tó) gọn gàng trên đỉnh đầu kiểu nam nhân thời xưa */}
              <ellipse cx="200" cy="54" rx="13" ry="10" fill="#1C1817" />
              {/* Dây buộc búi tóc vàng đồng */}
              <rect x="195" y="56" width="10" height="4" fill="#C59B27" rx="1" />

              {/* Cổ vạm vỡ đĩnh đạc, vững chãi */}
              <path
                d="M 185 110 L 185 148 L 215 148 L 215 110 Z"
                fill="#F0CAA6"
                stroke="#D6A57E"
                strokeWidth="1"
              />

              {/* Khuôn mặt nam tính chữ điền, xương quai hàm vuông vức */}
              <path
                d="M 178 74 Q 200 62 222 74 L 225 96 Q 222 116 200 120 Q 178 116 175 96 Z"
                fill="#F7DFC7"
                stroke="#D6A57E"
                strokeWidth="1.1"
              />

              {/* Mái tóc chải gọn gàng ngược ra sau để lộ trán cao cương nghị */}
              <path
                d="M 178 74 Q 200 62 222 74 Q 216 66 200 64 Q 184 66 178 74 Z"
                fill="#1C1817"
              />

              {/* Lông mày kiếm rậm, sắc sảo khí phách */}
              <path d="M 182 78 L 197 80.5" stroke="#231F20" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M 218 78 L 203 80.5" stroke="#231F20" strokeWidth="2.2" strokeLinecap="round" />

              {/* Đôi mắt cương trực nam nhân */}
              <path d="M 185 85 Q 191 84 196 86" stroke="#231F20" strokeWidth="1.5" fill="none" />
              <path d="M 204 86 Q 209 84 215 85" stroke="#231F20" strokeWidth="1.5" fill="none" />
              <circle cx="191" cy="85.5" r="1.4" fill="#231F20" />
              <circle cx="209" cy="85.5" r="1.4" fill="#231F20" />

              {/* Sống mũi thẳng cao */}
              <line x1="200" y1="84" x2="200" y2="99" stroke="#C99B73" strokeWidth="1.2" />

              {/* Môi cương trực, đĩnh đạc */}
              <line x1="193" y1="106" x2="207" y2="106" stroke="#A85848" strokeWidth="1.8" strokeLinecap="round" />
            </g>
          )}
        </g>

        {/* LỚP 3: KHĂN VẤN NHUNG (NỮ) / KHĂN ĐÓNG XẾP CHỮ NHẤT (NAM) */}
        {hasKhanVan && (
          <g id="layer-khan-van" filter="url(#softShadow)">
            {isFemale ? (
              // ===== KHĂN VẤN NỮ: VÀNH TRÒN PHỒNG DÀY, NHUNG ĐEN ÓNG Ả DUYÊN DÁNG =====
              <g id="khan-van-nu">
                {/* Vành đệm tóc tròn phồng */}
                <ellipse
                  cx="200"
                  cy="68"
                  rx="28"
                  ry="18"
                  fill={isOutlineFallback ? 'none' : '#1C1817'}
                  stroke="#D4A359"
                  strokeWidth={isOutlineFallback ? '2' : '1.3'}
                />
                {/* Vành nhung đen cuốn nếp phồng mềm mại bao quanh đầu */}
                <path
                  d="M 172 72 Q 200 48 228 72 Q 222 86 200 84 Q 178 86 172 72 Z"
                  fill={isOutlineFallback ? 'none' : '#141211'}
                  stroke="#C59B27"
                  strokeWidth="1.1"
                />
                {/* Ánh sáng nhung óng ả trên vành khăn nữ */}
                <path
                  d="M 174 64 Q 200 44 226 64"
                  fill="none"
                  stroke="rgba(255,255,255,0.45)"
                  strokeWidth="1.2"
                />
                <path
                  d="M 176 58 Q 200 40 224 58"
                  fill="none"
                  stroke="#C59B27"
                  strokeWidth="0.8"
                />
              </g>
            ) : (
              // ===== KHĂN ĐÓNG / KHĂN XẾP NAM: NẾP GẤP CHỮ NHẤT THẲNG PHẲNG, GÓC CẠNH VUÔNG VỨC =====
              <g id="khan-dong-nam">
                {/* Khung khăn đóng vuông vức chữ điền */}
                <path
                  d="M 171 74 Q 200 50 229 74 Q 225 89 200 87 Q 175 89 171 74 Z"
                  fill={isOutlineFallback ? 'none' : '#161413'}
                  stroke="#D4A359"
                  strokeWidth={isOutlineFallback ? '2' : '1.3'}
                />
                {/* Các nếp vải the xếp song song chữ Nhất thẳng tắp của đấng trượng phu */}
                <line x1="173" y1="69" x2="227" y2="69" stroke="#C59B27" strokeWidth="1.8" />
                <line x1="175" y1="63" x2="225" y2="63" stroke="#D4A359" strokeWidth="1.6" />
                <line x1="177" y1="57" x2="223" y2="57" stroke="#E0A96D" strokeWidth="1.4" />
                <line x1="179" y1="51" x2="221" y2="51" stroke="#C59B27" strokeWidth="1.2" />
              </g>
            )}
          </g>
        )}

        {/* LỚP 4: QUẦN LỤA / QUẦN TÂY (PHÂN BIỆT RÕ RỆT THẾ ĐỨNG & ĐỘ RỦ) */}
        <g id="layer-pants" filter="url(#layerShadow)">
          {isFemale ? (
            // ===== QUẦN NỮ: LỤA TƠ TẰM THƯỚT THA, ỐNG KHÉP DUYÊN DÁNG, ĐOAN TRANG =====
            <g id="pants-female">
              {/* Ống quần trái buông rủ */}
              <path
                d="M 176 375 L 166 540 Q 178 544 194 542 L 198 375 Z"
                fill={isOutlineFallback ? 'none' : pantsHex}
                stroke={isOutlineFallback ? '#C59B27' : 'rgba(0,0,0,0.18)'}
                strokeWidth="1.2"
              />
              {/* Ống quần phải buông rủ */}
              <path
                d="M 202 375 L 206 542 Q 222 544 234 540 L 224 375 Z"
                fill={isOutlineFallback ? 'none' : pantsHex}
                stroke={isOutlineFallback ? '#C59B27' : 'rgba(0,0,0,0.18)'}
                strokeWidth="1.2"
              />
              {/* Nếp lụa buông rủ mềm mại */}
              <path d="M 180 410 Q 176 475 178 535" stroke="rgba(0,0,0,0.06)" strokeWidth="1.2" fill="none" />
              <path d="M 220 410 Q 224 475 222 535" stroke="rgba(0,0,0,0.06)" strokeWidth="1.2" fill="none" />
            </g>
          ) : (
            // ===== QUẦN NAM: THẾ ĐỨNG RỘNG VỮNG CHÃI, ỐNG ĐỨNG ĐĨNH ĐẠC, KHÍ CHẤT =====
            <g id="pants-male">
              {/* Ống quần trái đứng vững, khoảng cách chân choàng ra uy nghi */}
              <path
                d="M 166 380 L 156 540 Q 170 545 190 542 L 195 380 Z"
                fill={isOutlineFallback ? 'none' : pantsHex}
                stroke={isOutlineFallback ? '#C59B27' : 'rgba(0,0,0,0.2)'}
                strokeWidth="1.3"
              />
              {/* Ống quần phải đứng */}
              <path
                d="M 205 380 L 210 542 Q 230 545 244 540 L 234 380 Z"
                fill={isOutlineFallback ? 'none' : pantsHex}
                stroke={isOutlineFallback ? '#C59B27' : 'rgba(0,0,0,0.2)'}
                strokeWidth="1.3"
              />
              {/* Nếp gấp ống đứng cứng cáp */}
              <line x1="173" y1="420" x2="171" y2="536" stroke="rgba(0,0,0,0.08)" strokeWidth="1.3" />
              <line x1="227" y1="420" x2="229" y2="536" stroke="rgba(0,0,0,0.08)" strokeWidth="1.3" />
            </g>
          )}
        </g>

        {/* LỚP 5: GIÀY / HÀI / GUỐC (HÀI NỮ MŨI CONG DUYÊN DÁNG VS HÀI NAM ĐĨNH ĐẠC) */}
        <g id="layer-footwear">
          {hasHaiGam && (
            <g id="hai-gam">
              {isFemale ? (
                // Hài nữ mũi cong vút, thanh mảnh đính hạt ngọc
                <g id="hai-nu">
                  {/* Hài trái nữ */}
                  <path
                    d="M 168 542 Q 160 542 163 551 Q 174 555 191 550 Q 193 542 187 542 Z"
                    fill={isOutlineFallback ? 'none' : '#3A1E22'}
                    stroke="#D4A359"
                    strokeWidth="1.2"
                  />
                  {/* Mũi hài thêu hoa cong vút */}
                  <path d="M 163 551 Q 157 544 161 540" fill="none" stroke="#D4A359" strokeWidth="2" />
                  <circle cx="160" cy="541" r="1.3" fill="#FAF9F6" />

                  {/* Hài phải nữ */}
                  <path
                    d="M 209 542 Q 203 542 205 550 Q 222 555 233 551 Q 236 542 228 542 Z"
                    fill={isOutlineFallback ? 'none' : '#3A1E22'}
                    stroke="#D4A359"
                    strokeWidth="1.2"
                  />
                  <path d="M 233 551 Q 239 544 235 540" fill="none" stroke="#D4A359" strokeWidth="2" />
                  <circle cx="236" cy="541" r="1.3" fill="#FAF9F6" />
                </g>
              ) : (
                // Hài nam mũi vuông, đế dày vững chãi
                <g id="hai-nam">
                  {/* Hài trái nam */}
                  <path
                    d="M 158 542 L 155 552 Q 170 556 190 552 L 192 542 Z"
                    fill={isOutlineFallback ? 'none' : '#221D1E'}
                    stroke="#C59B27"
                    strokeWidth="1.3"
                  />
                  <line x1="156" y1="550" x2="190" y2="550" stroke="#D4A359" strokeWidth="1.4" />

                  {/* Hài phải nam */}
                  <path
                    d="M 208 542 L 210 552 Q 230 556 245 552 L 242 542 Z"
                    fill={isOutlineFallback ? 'none' : '#221D1E'}
                    stroke="#C59B27"
                    strokeWidth="1.3"
                  />
                  <line x1="210" y1="550" x2="244" y2="550" stroke="#D4A359" strokeWidth="1.4" />
                </g>
              )}
            </g>
          )}

          {hasSneaker && (
            <g id="sneaker-modern">
              <path d="M 156 542 L 152 554 L 190 554 L 188 542 Z" fill="#FFFFFF" stroke="#E63946" strokeWidth="1.5" />
              <rect x="150" y="552" width="40" height="4" rx="2" fill="#E63946" />
              <path d="M 210 542 L 208 554 L 246 554 L 242 542 Z" fill="#FFFFFF" stroke="#E63946" strokeWidth="1.5" />
              <rect x="208" y="552" width="40" height="4" rx="2" fill="#E63946" />
            </g>
          )}

          {!hasHaiGam && !hasSneaker && (
            <g id="guoc-go-co-truyen">
              {isFemale ? (
                // Guốc mộc nữ thanh mảnh, quai nhung đỏ
                <>
                  <rect x="168" y="542" width="22" height="6" rx="2.5" fill="#A46B52" />
                  <path d="M 172 542 Q 179 538 186 542" fill="none" stroke="#C13038" strokeWidth="2" />
                  <rect x="210" y="542" width="22" height="6" rx="2.5" fill="#A46B52" />
                  <path d="M 214 542 Q 221 538 228 542" fill="none" stroke="#C13038" strokeWidth="2" />
                </>
              ) : (
                // Guốc gỗ mộc nam bản to vững chãi
                <>
                  <rect x="158" y="542" width="28" height="7" rx="2" fill="#7A4B3A" />
                  <path d="M 162 542 Q 172 538 182 542" fill="none" stroke="#221D1E" strokeWidth="2.5" />
                  <rect x="214" y="542" width="28" height="7" rx="2" fill="#7A4B3A" />
                  <path d="M 218 542 Q 228 538 238 542" fill="none" stroke="#221D1E" strokeWidth="2.5" />
                </>
              )}
            </g>
          )}
        </g>

        {/* LỚP 6: ÁO NGŨ THÂN TAY CHẼN (PHÂN BIỆT TRIỆT ĐỂ: PHOM DÁNG, VAI, EO, TÀ ÁO, CỔ & NGŨ KHUY) */}
        <g id="layer-ao-ngu-than" filter="url(#layerShadow)">
          {/* Lớp bậu cổ lót trong (Inner Collar) */}
          {outfit.hasInnerLayer && (
            <path
              d={
                isFemale
                  ? "M 191 144 Q 200 139 209 144 L 211 150 Q 200 145 189 150 Z"
                  : "M 185 142 Q 200 136 215 142 L 217 150 Q 200 144 183 150 Z"
              }
              fill={innerCollarHex}
              stroke="rgba(0,0,0,0.15)"
              strokeWidth="0.8"
            />
          )}

          {isFemale ? (
            // ==================== NỮ PHỤC: VAI XUÔI THON THẢ, EO THẮT NHẸ, TÀ XÒE THƯỚT THA DÁNG CHỮ A ====================
            <g id="ao-nu-phuc">
              {/* Thân áo nữ:
                  - Bờ vai xuôi dốc mềm mại: từ cổ (189, 148) dốc xuống (132, 178)
                  - Ngực ôm gọn (X: 158 đến 242)
                  - Vòng eo thon thắt vào nhẹ nhàng tại Y=270 (X: 165 đến 235)
                  - Tà áo xòe lượn mềm mại dáng chữ A buông rủ xuống (140, 422) và (260, 422)
                  - Tay áo chẽn thon thả làm nổi bật cổ tay búp măng */}
              <path
                d="M 189 148
                   L 132 178
                   L 104 316
                   L 122 320
                   L 142 228
                   Q 160 252 165 272
                   L 142 422
                   Q 200 438 258 422
                   L 235 272
                   Q 240 252 258 228
                   L 278 320
                   L 296 316
                   L 268 178
                   L 211 148
                   Z"
                fill={fillColor}
                stroke={strokeColor}
                strokeWidth={isOutlineFallback ? '2.5' : '1.2'}
              />

              {/* Lớp phủ tơ tằm mềm mại ánh sáng nữ: độ óng ả theo nếp eo và tà */}
              {!isOutlineFallback && (
                <path
                  d="M 189 148 L 132 178 L 104 316 L 122 320 L 142 228 Q 160 252 165 272 L 142 422 Q 200 438 258 422 L 235 272 Q 240 252 258 228 L 278 320 L 296 316 L 268 178 L 211 148 Z"
                  fill="url(#silkSheenFemale)"
                />
              )}

              {/* Hoa văn chìm trên tà áo lụa nữ */}
              {!isOutlineFallback && (
                <path
                  d="M 165 270 L 142 422 Q 200 438 258 422 L 235 270 Z"
                  fill="url(#brocadePattern)"
                />
              )}

              {/* Cổ đứng nữ: thanh mảnh thấp ôm sát cổ cao ba ngấn */}
              <path
                d="M 189 145 Q 200 140 211 145 L 213 162 Q 200 157 187 162 Z"
                fill={fillColor}
                stroke="#C59B27"
                strokeWidth="1.1"
              />

              {/* Vạt hữu thân cài chéo sang nách phải (Đường lượn tà áo thướt tha) */}
              <path
                d="M 211 145 Q 222 156 234 186 L 238 228 Q 235 275 228 424 Q 200 434 158 422"
                fill="none"
                stroke={isOutlineFallback ? '#C59B27' : 'rgba(0,0,0,0.22)'}
                strokeWidth={isOutlineFallback ? '2' : '1.2'}
              />

              {/* Sống lưng thẳng chính trực */}
              <path
                d="M 200 162 L 200 428"
                fill="none"
                stroke="rgba(0,0,0,0.1)"
                strokeWidth="0.8"
                strokeDasharray="3,3"
              />

              {/* NGŨ KHUY NỮ: 5 HẠT NGỌC/KHUY VẢI NHỎ NHẮN TINH TẾ */}
              <g id="ngu-khuy-nu">
                <circle cx="211" cy="148" r="2.4" fill="#FFF8DC" stroke="#8C6239" strokeWidth="0.8" />
                <circle cx="223" cy="170" r="2.4" fill="#FFF8DC" stroke="#8C6239" strokeWidth="0.8" />
                <circle cx="231" cy="195" r="2.4" fill="#FFF8DC" stroke="#8C6239" strokeWidth="0.8" />
                <circle cx="233" cy="222" r="2.4" fill="#FFF8DC" stroke="#8C6239" strokeWidth="0.8" />
                <circle cx="231" cy="250" r="2.4" fill="#FFF8DC" stroke="#8C6239" strokeWidth="0.8" />
              </g>

              {/* Cổ tay áo chẽn thon thả & bàn tay búp măng e ấp */}
              <g id="tay-chen-nu">
                <ellipse cx="113" cy="318" rx="9" ry="5" fill="#FAF9F6" stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
                <path d="M 107 320 Q 110 334 114 334 Q 118 334 119 320 Z" fill="#FFF1E8" />
                {/* Vòng cẩm thạch ngọc bích trên cổ tay nữ */}
                <ellipse cx="113" cy="318" rx="7" ry="2.5" fill="none" stroke="#52796F" strokeWidth="1.2" />

                <ellipse cx="287" cy="318" rx="9" ry="5" fill="#FAF9F6" stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
                <path d="M 281 320 Q 282 334 286 334 Q 290 334 293 320 Z" fill="#FFF1E8" />
                <ellipse cx="287" cy="318" rx="7" ry="2.5" fill="none" stroke="#52796F" strokeWidth="1.2" />
              </g>
            </g>
          ) : (
            // ==================== NAM PHỤC: VAI NGANG RỘNG BỆ VỆ, THÂN SUÔNG ĐỨNG THẲNG TẮP, ĐĨNH ĐẠC ====================
            <g id="ao-nam-phuc">
              {/* Thân áo nam:
                  - Bờ vai ngang rộng, bệ vệ uy nghi (rộng 164px từ 118 đến 282)
                  - Thân suông thẳng thớm từ nách xuống gấu áo (không thắt eo, dáng đứng tôn nghiêm)
                  - Tà áo buông dài phủ qua gối thẳng tắp
                  - Tay áo chẽn nam tính, bắp tay rộng khỏe khoắn */}
              <path
                d="M 185 146
                   L 118 172
                   L 86 312
                   L 112 320
                   L 138 226
                   L 140 430
                   Q 200 448 260 430
                   L 262 226
                   L 288 320
                   L 314 312
                   L 282 172
                   L 215 146
                   Z"
                fill={fillColor}
                stroke={strokeColor}
                strokeWidth={isOutlineFallback ? '2.5' : '1.4'}
              />

              {/* Lớp phủ tơ tằm/gấm đứng dáng của nam phục */}
              {!isOutlineFallback && (
                <path
                  d="M 185 146 L 118 172 L 86 312 L 112 320 L 138 226 L 140 430 Q 200 448 260 430 L 262 226 L 288 320 L 314 312 L 282 172 L 215 146 Z"
                  fill="url(#silkSheenMale)"
                />
              )}

              {/* Hoa văn chìm gấm vóc nam */}
              {!isOutlineFallback && (
                <path
                  d="M 140 220 L 140 430 Q 200 448 260 430 L 262 220 Z"
                  fill="url(#brocadePattern)"
                />
              )}

              {/* Cổ đứng nam: cao vuông vức, nẹp to bản đĩnh đạc mực thước */}
              <path
                d="M 184 144 Q 200 137 216 144 L 220 166 Q 200 159 180 166 Z"
                fill={fillColor}
                stroke="#C59B27"
                strokeWidth="1.5"
              />

              {/* Tà hữu thân cài chéo sang nách phải (Đường may cứng cáp, vững chãi) */}
              <path
                d="M 216 144 Q 228 156 242 186 L 246 230 L 232 432 Q 200 440 154 428"
                fill="none"
                stroke={isOutlineFallback ? '#C59B27' : 'rgba(0,0,0,0.22)'}
                strokeWidth={isOutlineFallback ? '2' : '1.6'}
              />

              {/* Sống áo thẳng tắp ở giữa lưng: thể hiện sự quang minh chính trực */}
              <path
                d="M 200 164 L 200 434"
                fill="none"
                stroke="rgba(0,0,0,0.14)"
                strokeWidth="1.1"
                strokeDasharray="4,3"
              />

              {/* NGŨ KHUY NAM: 5 CÚC ĐỒNG VÀNG TO BẢN, VỮNG CHÃI UY NGHIÊM */}
              <g id="ngu-khuy-nam">
                <circle cx="216" cy="148" r="3.3" fill="#D4A359" stroke="#7A4839" strokeWidth="1" />
                <circle cx="230" cy="172" r="3.3" fill="#D4A359" stroke="#7A4839" strokeWidth="1" />
                <circle cx="240" cy="198" r="3.3" fill="#D4A359" stroke="#7A4839" strokeWidth="1" />
                <circle cx="243" cy="226" r="3.3" fill="#D4A359" stroke="#7A4839" strokeWidth="1" />
                <circle cx="240" cy="256" r="3.3" fill="#D4A359" stroke="#7A4839" strokeWidth="1" />
              </g>

              {/* Cổ tay chẽn nam to khỏe & bàn tay đĩnh đạc buông xuôi */}
              <g id="tay-chen-nam">
                <ellipse cx="99" cy="316" rx="13" ry="6" fill="#FAF9F6" stroke="rgba(0,0,0,0.18)" strokeWidth="1" />
                <path d="M 92 318 Q 94 334 100 334 Q 106 334 108 318 Z" fill="#F0CAA6" />

                <ellipse cx="301" cy="316" rx="13" ry="6" fill="#FAF9F6" stroke="rgba(0,0,0,0.18)" strokeWidth="1" />
                <path d="M 294 318 Q 296 334 302 334 Q 308 334 310 318 Z" fill="#F0CAA6" />
              </g>
            </g>
          )}
        </g>

        {/* LỚP 7: PHỤ KIỆN THÍCH ỨNG THEO PHONG CÁCH & GIỚI TÍNH */}
        <g id="layer-accessories">
          {/* Kiềng Bạc / Vòng ngọc (Nổi bật kiêu sa trên nữ phục, hoặc chuỗi bội ngọc nam) */}
          {hasKiengBac && (
            <g id="phu-kien-kieng">
              {isFemale ? (
                // Kiềng bạc tròn thanh mảnh ôm chân cổ áo nữ
                <path
                  d="M 184 165 Q 200 184 216 165"
                  fill="none"
                  stroke="#E0E1DD"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  filter="url(#softShadow)"
                />
              ) : (
                // Bội bài / Chuỗi ngọc quý phái nam giới
                <g filter="url(#softShadow)">
                  <path
                    d="M 182 165 Q 200 186 218 165"
                    fill="none"
                    stroke="#D4A359"
                    strokeWidth="3.8"
                    strokeLinecap="round"
                  />
                  {/* Mặt bội bài hình khánh chữ Phúc */}
                  <rect x="195" y="184" width="10" height="12" rx="2" fill="#52796F" stroke="#D4A359" strokeWidth="1" />
                </g>
              )}
            </g>
          )}

          {/* Quạt Giấy Xếp trên tay */}
          {hasQuatXep && (
            <g
              id="quat-xep"
              transform={
                isFemale
                  ? "translate(276, 304) rotate(-22)"
                  : "translate(282, 302) rotate(-26)"
              }
            >
              <path
                d={isFemale ? "M 0 0 L -22 -50 Q 0 -62 22 -50 Z" : "M 0 0 L -28 -60 Q 0 -74 28 -60 Z"}
                fill="#E8D8C8"
                stroke="#8D5B4C"
                strokeWidth="1"
              />
              <path
                d={isFemale ? "M 0 0 L -12 -52 M 0 0 L 0 -58 M 0 0 L 12 -52" : "M 0 0 L -16 -62 M 0 0 L 0 -70 M 0 0 L 16 -62"}
                stroke="#8D5B4C"
                strokeWidth="0.8"
              />
              <circle cx="0" cy="0" r="2.5" fill="#C59B27" />
              {/* Dải tua rua đỏ rủ mềm cho nữ */}
              {isFemale && <path d="M 0 0 L 6 22 M 2 22 L 8 22" stroke="#9E2A2B" strokeWidth="1.2" />}
            </g>
          )}

          {/* Túi Gấm Cổ Điển bên hông */}
          {hasTuiGam && (
            <g id="tui-gam" transform={isFemale ? "translate(154, 275)" : "translate(146, 268)"}>
              <path
                d="M 0 0 L 4 12 Q 10 24 16 12 L 20 0 Z"
                fill="#9E2A2B"
                stroke="#C59B27"
                strokeWidth="1"
              />
              <path d="M 10 16 L 10 32" stroke="#C59B27" strokeWidth="1.5" />
              <circle cx="10" cy="6" r="2" fill="#FAF9F6" />
            </g>
          )}

          {/* Túi Đeo Chéo Streetwear (Hiện đại) */}
          {hasTuiDeoCheo && (
            <g id="tui-deo-cheo-modern">
              <path
                d={isFemale ? "M 166 172 L 250 292" : "M 154 168 L 260 298"}
                stroke="#1C1917"
                strokeWidth={isFemale ? '5' : '6.5'}
                strokeLinecap="square"
              />
              <rect
                x={isFemale ? '232' : '240'}
                y={isFemale ? '278' : '284'}
                width="34"
                height="26"
                rx="4"
                fill="#2B2D42"
                stroke="#8D99AE"
                strokeWidth="1.5"
              />
              <line
                x1={isFemale ? '236' : '244'}
                y1={isFemale ? '287' : '294'}
                x2={isFemale ? '260' : '270'}
                y2={isFemale ? '287' : '294'}
                stroke="#E63946"
                strokeWidth="2"
              />
            </g>
          )}
        </g>
      </svg>
    </div>
  );
};
