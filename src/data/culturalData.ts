import {
  AccessoryOption,
  ColorOption,
  CulturalRule,
  GeminiContractV1,
  TestCase,
} from '../types/vietPhuc.ts';

export const TRADITIONAL_COLORS: ColorOption[] = [
  {
    id: 'lam_thuy',
    name: 'Lam Thủy',
    vietnameseName: 'Xanh Lam Chàm Hoàng Gia',
    hex: '#1D3557',
    pantPairing: 'white',
    description: 'Sắc chàm thâm trầm, tượng trưng cho biển trời bao dung và phong thái hòa nhã của bậc quân tử.',
  },
  {
    id: 'do_dieu',
    name: 'Đỏ Điều',
    vietnameseName: 'Đỏ Điều Phúc Lộc',
    hex: '#8B1E28',
    pantPairing: 'white',
    description: 'Sắc đỏ thắm cổ truyền thường chuộng trong dịp hỷ sự, lễ tết nghênh xuân mang ý nghĩa cát tường.',
  },
  {
    id: 'luc_bich',
    name: 'Lục Bích',
    vietnameseName: 'Xanh Ngọc Bích Non',
    hex: '#2A9D8F',
    pantPairing: 'white',
    description: 'Sắc xanh ngọc dịu mát, biểu trưng cho sức sống đâm chồi, đức tính nhu hòa và phong thái thanh tân.',
  },
  {
    id: 'vang_mo_ga',
    name: 'Vàng Mỡ Gà',
    vietnameseName: 'Vàng Tơ Mỡ Gà Dân Gian',
    hex: '#C59B27',
    pantPairing: 'white',
    description: 'Sắc vàng óng ả từ tơ tằm dân gian, phân biệt rõ với sắc vàng chính hoàng của hoàng gia xưa.',
  },
  {
    id: 'den_tuyen',
    name: 'Đen Tuyền',
    vietnameseName: 'Hắc Sa Mực Tàu',
    hex: '#252422',
    pantPairing: 'white',
    description: 'Sắc đen nghiêm cẩn, đỉnh đạc của sĩ phu xưa trong các dịp khánh tiết, đại điển long trọng.',
  },
  {
    id: 'bach_ngoc',
    name: 'Bạch Ngọc',
    vietnameseName: 'Trắng Ngà Tơ Tằm',
    hex: '#EFECE6',
    pantPairing: 'black',
    description: 'Sắc trắng mộc mạc của lụa tơ sống, toát lên nét thanh khiết, mộc mạc và tĩnh tại.',
  },
  {
    id: 'tim_hoa_ca',
    name: 'Hoa Cà',
    vietnameseName: 'Tím Hoa Cà Xứ Huế',
    hex: '#6A4C6A',
    pantPairing: 'white',
    description: 'Sắc tím hoài cổ đặc trưng miền cố đô, gắn liền với vẻ đẹp kín đáo và đoan trang.',
  },
  {
    id: 'nau_dong',
    name: 'Nâu Đồng',
    vietnameseName: 'Nâu Củ Nâu Đất Mẹ',
    hex: '#6F4E37',
    pantPairing: 'white',
    description: 'Sắc nâu tự nhiên nhuộm từ củ nâu, biểu đạt sự gần gũi, chất phác và mộc mạc của người Việt.',
  },
];

export const ACCESSORIES_LIST: AccessoryOption[] = [
  {
    id: 'khan_van',
    name: 'Khăn Vấn / Khăn Đóng',
    category: 'headwear',
    description: 'Khăn vải the hoặc gấm quấn nhiều vòng gọn gàng quanh đầu, chuẩn mực diện mạo của trang phục Nguyễn triều.',
  },
  {
    id: 'hai_gam',
    name: 'Hài Gấm Mũi Cong',
    category: 'footwear',
    description: 'Đôi hài thêu hoa văn chỉ vàng hoặc chỉ tơ, đế nhẹ êm, tạo dáng đi thong dong, đĩnh đạc.',
  },
  {
    id: 'quat_xep',
    name: 'Quạt Giấy Xếp / Quạt Trầm',
    category: 'handheld',
    description: 'Phụ kiện tao nhã cầm tay của người xưa, nan tre chuốt mịn hoặc gỗ trầm thơm dịu.',
  },
  {
    id: 'kieng_bac',
    name: 'Kiềng Bạc / Vòng Bội Ngọc',
    category: 'jewelry',
    description: 'Vòng cổ bạc trơn hoặc chạm hoa văn cúc dây, tạo điểm nhấn quý phái cho cổ áo đứng kín đáo.',
  },
  {
    id: 'tui_gam',
    name: 'Túi Gấm Thắt Lưng',
    category: 'handheld',
    description: 'Túi thêu gấm đựng hương trầm hoặc vật dụng nhỏ xinh xắn đeo bên hông áo.',
  },
  {
    id: 'sneaker_hien_dai',
    name: 'Giày Thể Thao Sneaker',
    category: 'modern',
    isModern: true,
    description: 'Giày thể thao hiện đại, hợp với cách phối đời thường',
  },
  {
    id: 'tui_deo_cheo',
    name: 'Túi Đeo Chéo Streetwear',
    category: 'modern',
    isModern: true,
    description: 'Túi đeo chéo hiện đại, hợp phong cách dạo phố',
  },
];

export const CULTURAL_RULES_V1: CulturalRule[] = [
  {
    id: 'RULE_01',
    title: 'Quy thức Áo ngũ thân và Quần lụa',
    rule: 'Áo ngũ thân tay chẽn chuẩn mực luôn mặc kèm quần lụa trắng hoặc lụa đen rộng rãi, che kín gót chân.',
    evidence: 'Được quy chuẩn từ chiếu dụ cải cách y phục năm 1744 của Võ Vương Nguyễn Phúc Khoát và quy chế triều Minh Mạng năm 1827.',
    evidence_ids: ['EVI_MINH_MANG_1827', 'EVI_KHAM_DINH_HOI_DIEN'],
    historical_context: 'Cấu trúc 5 thân tượng trưng cho "tứ thân phụ mẫu" (cha mẹ mình và cha mẹ người phối ngẫu) bao bọc lấy "thân con" (bản thân người mặc). Ngũ khuy cài tượng trưng cho Ngũ thường: Nhân, Lễ, Nghĩa, Trí, Tín.',
  },
  {
    id: 'RULE_02',
    title: 'Nghi thức Đầu tóc & Khăn đội',
    rule: 'Trong các dịp nghi lễ, khánh tiết trang trọng, đầu đội khăn vấn (nữ) hoặc khăn đóng (nam) là quy chuẩn không thể tách rời.',
    evidence: 'Ghi chép trong Khâm Định Đại Nam Hội Điển Sự Lệ: người mặc áo ngũ thân khi ra ngoài hoặc bái yết tế tự bắt buộc phải chỉnh tề khăn áo.',
    evidence_ids: ['EVI_KHAM_DINH_HOI_DIEN', 'EVI_NGHI_LE_TRIEU_NGUYEN'],
    historical_context: 'Đầu không trần là biểu hiện của sự tôn kính trời đất, tổ tiên và người đối diện, tạo nên tác phong đỉnh đạc nghiêm cẩn.',
  },
  {
    id: 'RULE_03',
    title: 'Giới hạn Phụ kiện Cách tân trong Nghi lễ Tế tự',
    rule: 'Không kết hợp phụ kiện thể thao hầm hố hoặc streetwear (giày sneaker, túi vải dù chéo) trong các không gian đại lễ, đình đền, gia tiên.',
    evidence: 'Quy ước trang trọng trong văn hóa bái yết truyền thống Việt Nam.',
    evidence_ids: ['EVI_TAP_TUC_CO_TRUYEN'],
    historical_context: 'Trang phục tế lễ mang tính thiêng; phụ kiện đương đại quá năng động gây xung đột thị giác và suy giảm vẻ trang nghiêm.',
  },
  {
    id: 'RULE_04',
    title: 'Tiết chế Sắc màu Cấm kỵ xưa',
    rule: 'Tránh dùng sắc vàng chói (Chính hoàng) trơn toàn bộ trong các dịp lễ nghi xưa vì đây là sắc màu độc quyền của Hoàng đế.',
    evidence: 'Quy định cấm sắc trong Hoàng Triều Luật Lệ thời Nguyễn.',
    evidence_ids: ['EVI_HOANG_TRIEU_LUAT_LE'],
    historical_context: 'Thứ dân xưa chuộng dùng vàng hoa mướp, vàng mỡ gà hoặc phối tà trong để giữ sự kín đáo, nhã nhặn, không vi phạm điển lễ.',
  },
];

export const TEST_CASES: TestCase[] = [
  {
    id: 'TC01',
    code: 'TC01',
    title: 'Phối đồ chuẩn mực & Hài hòa',
    description: 'Áo ngũ thân lam thủy + Quần trắng lụa + Khăn vấn + Hài gấm. Đi dạo phố cổ hoặc lễ hội truyền thống.',
    expectedStatus: 'ok',
    notes: 'Kiểm tra luồng chuẩn mực: Hội đồng đánh giá cao phong thái thanh lịch, kết luận văn hóa phù hợp quy thức.',
    outfitPreset: {
      primaryColor: TRADITIONAL_COLORS[0], // Lam thủy
      pantsColor: 'white',
      accessories: ['khan_van', 'hai_gam', 'quat_xep'],
      context: 'le_hoi',
      style: 'truyen_thong',
      hasInnerLayer: true,
      innerCollarColor: '#FFFFFF',
    },
    mockContract: {
      schema_version: '1.0',
      style_feedback: {
        summary: 'Bộ phối mang sắc lam thủy thâm trầm kết hợp quần lụa trắng và khăn vấn chuẩn mực, toát lên phong thái đĩnh đạc, hòa nhã và tôn nghiêm.',
      },
      culture_check: {
        status: 'ok',
        findings: [
          {
            rule_id: 'RULE_01',
            message: 'Áo ngũ thân tay chẽn phối cùng quần lụa trắng và có lớp áo lót bậu cổ đúng quy thức cung đình và dân gian thời Nguyễn.',
            evidence_ids: ['EVI_MINH_MANG_1827', 'EVI_KHAM_DINH_HOI_DIEN'],
          },
          {
            rule_id: 'RULE_02',
            message: 'Phụ kiện khăn vấn và hài gấm mũi cong hoàn thiện chuẩn chỉnh nghi lễ đầu đội chân đạp.',
            evidence_ids: ['EVI_NGHI_LE_TRIEU_NGUYEN'],
          },
        ],
      },
      suggestions: [
        {
          target: 'accessory',
          action: 'keep',
          value: 'quat_xep',
          reason: 'Quạt xếp nan trúc tăng thêm nét phong lưu, tao nhã khi du xuân hoặc dự hội.',
        },
      ],
      explanation: 'Bộ trang phục tuân thủ trọn vẹn cả cấu trúc hình thể (ngũ thân ngũ khuy) lẫn nguyên tắc phục sức cổ truyền, thể hiện sự am hiểu và tôn trọng di sản y quan.',
    },
  },
  {
    id: 'TC02',
    code: 'TC02',
    title: 'Xung đột sắc màu lễ nghi',
    description: 'Áo ngũ thân vàng rực rỡ mang đi dự đại lễ tế gia tiên trang nghiêm cổ truyền.',
    expectedStatus: 'needs_attention',
    notes: 'Kiểm tra phát hiện sắc vàng hoàng gia trong bối cảnh tế lễ dân gian, gợi ý chuyển sang vàng nhạt hoặc lam.',
    outfitPreset: {
      primaryColor: {
        id: 'vang_hoang_kim',
        name: 'Vàng Hoàng Kim',
        vietnameseName: 'Chính Hoàng Đế Vương',
        hex: '#FFD700',
        pantPairing: 'white',
        description: 'Sắc vàng tươi chói lọi.',
      },
      pantsColor: 'white',
      accessories: ['khan_van', 'hai_gam'],
      context: 'su_kien_cuoi_hoi',
      style: 'truyen_thong',
      hasInnerLayer: true,
      innerCollarColor: '#FFFFFF',
    },
    mockContract: {
      schema_version: '1.0',
      style_feedback: {
        summary: 'Tông màu vàng hoàng kim tạo hiệu ứng thị giác rực rỡ nhưng có thể quá chói lọi và phạm sắc cấm trong không gian tế lễ cổ truyền.',
      },
      culture_check: {
        status: 'needs_attention',
        findings: [
          {
            rule_id: 'RULE_04',
            message: 'Sắc vàng chính hoàng rực rỡ thời xưa là độc quyền của hoàng thất; trong các nghi lễ trang nghiêm gia đình, nên chuộng sắc lam chàm hoặc vàng mỡ gà nhã nhặn.',
            evidence_ids: ['EVI_HOANG_TRIEU_LUAT_LE'],
          },
        ],
      },
      suggestions: [
        {
          target: 'color',
          action: 'replace',
          value: 'lam_thuy',
          reason: 'Chuyển sang màu Lam Thủy hoặc Vàng Mỡ Gà để đạt độ trang nhã và giữ đúng phong vị dân gian.',
        },
      ],
      explanation: 'Màu vàng hoàng kim quá gắt có thể làm mất đi tính khiêm nhường, tĩnh tại cần có của áo ngũ thân trong không gian phụng tự.',
    },
  },
  {
    id: 'TC03',
    code: 'TC03',
    title: 'Cách tân quá mức trong tế lễ',
    description: 'Áo ngũ thân kết hợp giày thể thao sneaker và túi vải dù đeo chéo trong sự kiện trang trọng / đám cưới.',
    expectedStatus: 'needs_attention',
    notes: 'Kiểm tra phát hiện phụ kiện thể thao phá vỡ không gian trang trọng, gợi ý thay bằng hài gấm hoặc quạt xếp.',
    outfitPreset: {
      primaryColor: TRADITIONAL_COLORS[1], // Đỏ điều
      pantsColor: 'black',
      accessories: ['sneaker_hien_dai', 'tui_deo_cheo'],
      context: 'su_kien_cuoi_hoi',
      style: 'cach_tan',
      hasInnerLayer: false,
      innerCollarColor: '#FFFFFF',
    },
    mockContract: {
      schema_version: '1.0',
      style_feedback: {
        summary: 'Bộ phối thể hiện cá tính mạnh bạo nhưng sự kết hợp giữa giày sneaker và túi dù gây xung đột gay gắt với vẻ trang trọng của áo ngũ thân.',
      },
      culture_check: {
        status: 'needs_attention',
        findings: [
          {
            rule_id: 'RULE_03',
            message: 'Giày sneaker và túi dù đeo chéo phá vỡ tỷ lệ trang nghiêm của áo dài truyền thống trong dịp sự kiện trọng đại.',
            evidence_ids: ['EVI_TAP_TUC_CO_TRUYEN'],
          },
        ],
      },
      suggestions: [
        {
          target: 'accessory',
          action: 'replace',
          value: 'hai_gam',
          reason: 'Thay giày sneaker bằng hài gấm hoặc giày da âu phục tối giản.',
        },
        {
          target: 'accessory',
          action: 'remove',
          value: 'tui_deo_cheo',
          reason: 'Tháo bỏ túi dù đeo chéo để tà áo ngũ thân rủ thẳng tự nhiên.',
        },
      ],
      explanation: 'Cách tân là điều đáng khích lệ, tuy nhiên khi bước vào không gian cưới hỏi, sự hài hòa giữa tinh thần hiện đại và lễ nghi cổ truyền cần được cân bằng tinh tế.',
    },
  },
  {
    id: 'TC04',
    code: 'TC04',
    title: 'Ứng dụng đời sống nhưng giữ bản sắc',
    description: 'Áo ngũ thân lục bích kết hợp quần âu đen tối giản, quạt xếp nan mỏng đi làm / dạo phố.',
    expectedStatus: 'ok',
    notes: 'Kiểm tra trường hợp cách tân trang nhã: phom áo ngũ thân tay chẽn giữ nguyên, kết hợp phụ kiện đương đại hợp lý.',
    outfitPreset: {
      primaryColor: TRADITIONAL_COLORS[2], // Lục bích
      pantsColor: 'black',
      accessories: ['quat_xep'],
      context: 'cong_so',
      style: 'toi_gian',
      hasInnerLayer: true,
      innerCollarColor: '#FFFFFF',
    },
    mockContract: {
      schema_version: '1.0',
      style_feedback: {
        summary: 'Thiết kế tinh gọn, mang lại vẻ thanh lịch thời thượng cho môi trường làm việc sáng tạo mà vẫn gìn giữ trọn vẹn nét đẹp cổ phong.',
      },
      culture_check: {
        status: 'ok',
        findings: [
          {
            rule_id: 'RULE_01',
            message: 'Phom dáng tay chẽn ôm cổ tay gọn gàng đáp ứng hoàn hảo tính linh hoạt công sở hiện đại.',
            evidence_ids: ['EVI_MINH_MANG_1827'],
          },
        ],
      },
      suggestions: [
        {
          target: 'accessory',
          action: 'keep',
          value: 'quat_xep',
          reason: 'Chiếc quạt nan tinh tế vừa là vật làm mát vừa là điểm nhấn văn hóa độc đáo.',
        },
      ],
      explanation: 'Đây là hình mẫu tiêu biểu cho việc đưa Việt phục trở lại đời sống thường nhật một cách tự tin, thanh tao và văn minh.',
    },
  },
  {
    id: 'TC05',
    code: 'TC05',
    title: 'Chưa đủ căn cứ xác minh văn hóa',
    description: 'Thử nghiệm hoa văn hoặc phối thức lai tạp không có trong tư liệu triều Nguyễn.',
    expectedStatus: 'insufficient_evidence',
    notes: 'Kiểm tra tính trung thực của cơ chế thẩm định khép kín: không tự bịa đặt quy tắc khi thiếu dữ liệu.',
    outfitPreset: {
      primaryColor: TRADITIONAL_COLORS[6], // Tím hoa cà
      pantsColor: 'white',
      accessories: ['kieng_bac'],
      context: 'dao_pho',
      style: 'cach_tan',
      hasInnerLayer: true,
      innerCollarColor: '#FFFFFF',
    },
    mockContract: {
      schema_version: '1.0',
      style_feedback: {
        summary: 'Sắc tím hoa cà phối kiềng bạc tạo cảm giác thanh nhã, nhưng một số chi tiết lai tạp cần đối chiếu thêm với tài liệu lịch sử.',
      },
      culture_check: {
        status: 'insufficient_evidence',
        findings: [
          {
            rule_id: 'RULE_UNVERIFIED',
            message: 'Hiện chưa đủ tài liệu hội đồng xác minh về quy thức kết hợp họa tiết này trong kho dữ liệu văn hóa v1.',
            evidence_ids: [],
          },
        ],
      },
      suggestions: [],
      explanation: 'Hệ thống tuân thủ nguyên tắc trung thực học thuật: chỉ đưa ra kết luận chắc chắn khi có trích dẫn nguồn sử liệu cụ thể.',
    },
  },
  {
    id: 'TC06',
    code: 'TC06',
    title: 'Dự phòng gián đoạn kết nối',
    description: 'Giả lập tình huống dịch vụ thẩm định tạm thời gián đoạn kết nối.',
    expectedStatus: 'error',
    notes: 'Kiểm tra cơ chế phòng vệ: bảo lưu nguyên vẹn bộ phối, hiển thị thông báo trang trọng, cho phép thử lại hoặc tiếp tục không dùng AI.',
    outfitPreset: {
      primaryColor: TRADITIONAL_COLORS[0],
      pantsColor: 'white',
      accessories: ['khan_van'],
      context: 'dao_pho',
      style: 'truyen_thong',
      hasInnerLayer: true,
      innerCollarColor: '#FFFFFF',
    },
    mockContract: null, // Sẽ kích hoạt fallback
  },
  {
    id: 'TC07',
    code: 'TC07',
    title: 'Nét viền phác thảo khi lỗi hình ảnh',
    description: 'Giả lập khi tài nguyên đồ họa bị gián đoạn; bộ renderer vector chuyển sang chế độ nét viền thanh lịch.',
    expectedStatus: 'ok',
    notes: 'Đảm bảo giao diện luôn trọn vẹn, không bao giờ xuất hiện khung ảnh vỡ.',
    outfitPreset: {
      primaryColor: TRADITIONAL_COLORS[4], // Đen tuyền
      pantsColor: 'white',
      accessories: ['khan_van', 'hai_gam'],
      context: 'le_hoi',
      style: 'truyen_thong',
      hasInnerLayer: true,
      innerCollarColor: '#FFFFFF',
    },
    mockContract: {
      schema_version: '1.0',
      style_feedback: {
        summary: 'Bộ phối hắc sa mẫu mực, kích hoạt chế độ hiển thị phác thảo nét viền vector an toàn.',
      },
      culture_check: {
        status: 'ok',
        findings: [
          {
            rule_id: 'RULE_01',
            message: 'Cấu trúc 5 thân và khuy cài hiển thị trọn vẹn qua đồ họa vector dự phòng.',
            evidence_ids: ['EVI_MINH_MANG_1827'],
          },
        ],
      },
      suggestions: [],
      explanation: 'Giao diện vẫn duy trì tính toàn vẹn mỹ thuật cao cấp ngay cả trong tình huống gián đoạn tài nguyên mạng.',
    },
  },
];

