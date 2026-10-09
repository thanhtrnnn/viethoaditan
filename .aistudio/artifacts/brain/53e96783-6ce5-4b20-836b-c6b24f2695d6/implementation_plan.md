# Kế hoạch triển khai: Việt Hoa Di Tân — Xưởng Phối Việt Phục (Bản Bùi Minh)

Kế hoạch xây dựng trọn vẹn bản Vertical Slice MVP 5 màn hình cho dự án **Việt Hoa Di Tân (Hướng B — Xưởng phối Việt phục)** theo phân công trách nhiệm của **Bùi Minh** (Code Owner duy nhất của MVP), kết hợp tích hợp cấu trúc Gemini Contract v1 và bộ giả lập 7 Test Case phục vụ bàn giao kiểm thử độc lập cho Hùng Anh.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> Dựa trên phản hồi trong Phase 1 và thông tin chính thức từ cơ sở dữ liệu Notion của dự án:
> - **Phạm vi triển khai**: Xây dựng bộ khung ứng dụng hoàn chỉnh 5 màn hình chạy mượt mà ngay trên máy trạm (local/layer-first) mà không bắt buộc phụ thuộc vào API ngoài để trải nghiệm toàn bộ luồng người dùng.
> - **Trang phục trọng tâm v1**: Áo ngũ thân tay chẽn nam/nữ thời Nguyễn (với cấu trúc 5 thân, tay chẽn gọn gàng, khuy cài bên phải, lớp áo lót trong và phụ kiện khăn vấn/hài).
> - **Cơ chế Gemini & Kiểm thử văn hóa**: Hỗ trợ đồng thời 2 chế độ:
>   1. *Chế độ giả lập 7 Test Cases tiêu chuẩn (TC01 – TC07)*: Phục vụ kiểm thử nghiệm thu bàn giao cho tester Hùng Anh (xử lý phối chuẩn, xung đột màu, cách tân quá mức, thiếu căn cứ văn hóa, lỗi JSON và fallback).
>   2. *Chế độ Gemini Trực tiếp (Live AI Evaluation)*: Gọi Gemini API với closed-world cultural reasoning, kiểm tra trạng thái bộ phối dựa trên gói dữ liệu `cultural_rules` v1 có trích dẫn nguồn.
> - **Tiến độ & Quản lý nhiệm vụ Bùi Minh**: Bổ sung bảng công việc tích hợp ngay trên thanh điều hướng để Minh kiểm soát các đầu việc P0 trước mốc MVP-FREEZE (07/10) và nộp Audition (09/10).

---

### 1. Overview & Core Concept

- **Mục tiêu ứng dụng**: 
  - Mang di sản trang phục truyền thống Việt Nam đến gần hơn với giới trẻ thông qua trải nghiệm phối đồ hiện đại nhưng tôn trọng chuẩn mực lịch sử.
  - Người dùng tự do chọn ngữ cảnh (dạo phố, lễ hội truyền thống, công sở, cưới hỏi), lựa chọn phong cách (cổ điển trang trọng, tân thời tối giản, phá cách nhẹ nhàng), tùy biến màu sắc, hoa văn, áo khoác, phụ kiện, và nhận phản hồi tức thì về thẩm mỹ lẫn tính đúng đắn văn hóa.
- **Đối tượng sử dụng**: Người yêu thích Việt phục, các bạn trẻ muốn ứng dụng áo ngũ thân vào đời sống hàng ngày, nhà thiết kế thời trang cách tân, và ban giám khảo vòng Audition.
- **Giá trị cốt lõi**:
  - *Layer-First Preview*: Cơ chế xếp chồng các lớp trang phục (thân áo, viền cổ, nút khuy, quần, khăn vấn, hài) bằng đồ họa vector chi tiết, phản hồi tức thời dưới 100ms.
  - *Closed-World Cultural Reasoning*: Kiểm định văn hóa dựa trên dữ liệu đã xác minh (không để AI suy đoán bừa bãi hay bịa đặt quy tắc).

---

### 2. User Experience & Visual Design

#### A. Key User Flows (5 Màn hình Vertical Slice)
1. **Màn 1 — Chọn Việt Phục (Garment Selection)**:
   - Thẻ trưng bày trung tâm: Áo ngũ thân tay chẽn (Nguyễn Triều).
   - Thông tin văn hóa ngắn gọn: Nguồn gốc thế kỷ 18–19 (cải cách Võ Vương Nguyễn Phúc Khoát và vua Minh Mạng), cấu trúc 5 thân tượng trưng tứ thân phụ mẫu và bản thân, ý nghĩa ngũ thường (Nhân - Lễ - Nghĩa - Trí - Tín).
   - Nút hành động chính: "Bắt đầu phối đồ" (tiến vào Màn 2).
2. **Màn 2 — Bối cảnh & Định hướng (Context & Style Intent)**:
   - Chọn ngữ cảnh: Dạo phố / Cà phê, Lễ hội truyền thống / Tết, Sự kiện trang trọng / Cưới hỏi, Đi làm hiện đại.
   - Chọn phong cách mong muốn: Trang nhã truyền thống, Thanh lịch tối giản, Trẻ trung cách tân.
3. **Màn 3 — Xưởng Phối Ghép Lớp (The Layer Studio - Trung tâm tương tác)**:
   - *Cột trái*: Bộ xem trước ghép lớp (Interactive Layer-First Canvas) hiển thị áo ngũ thân, quần sa/lụa, khăn đóng/khăn vấn, hài/giày, phụ kiện (quạt, túi gấm, trâm cài).
   - *Cột phải*: Thanh điều khiển tùy biến:
     - Bảng màu truyền thống & tân thời (Lam thủy, Đỏ điều, Vàng hoa mướp, Xanh lục bích, Đen tuyền, Trắng ngà).
     - Lựa chọn phụ kiện (khăn vấn, hài gấm, quạt xếp, vòng cổ, túi đeo chéo hiện đại).
     - Công tắc chuyển đổi lớp (áo ngoài, áo lót trong bậu cổ).
   - Nút CTA: "Đánh giá phối đồ & Kiểm tra văn hóa" (tiến vào Màn 4).
4. **Màn 4 — Nhận xét Phong cách & Kiểm tra Văn hóa (Evaluation Panel)**:
   - Panel chia 3 khu vực rõ ràng theo đúng thiết kế Notion:
     - *Khu 1: Nhận xét phong cách* — Đánh giá độ hài hòa tổng thể, sự vừa vặn với bối cảnh đã chọn.
     - *Khu 2: Lưu ý văn hóa* — Trả về 1 trong 3 trạng thái chuẩn (`ok` / `needs_attention` / `insufficient_evidence`) kèm rule_id và bằng chứng lịch sử (evidence_id).
     - *Khu 3: Gợi ý chỉnh sửa* — Các chip gợi ý thông minh ("Đổi màu quần sang trắng ngà", "Bỏ túi chéo hiện đại khi dự lễ") kèm nút "Áp dụng" hoặc "Bỏ qua".
   - Bộ chọn Test Case (TC01 – TC07) để chuyển đổi nhanh các kịch bản kiểm thử phục vụ nghiệm thu.
5. **Màn 5 — Kết quả & Chỉnh lại (Final Look & Export)**:
   - Khung hình bộ phối hoàn chỉnh với nhãn phong cách tóm tắt.
   - Trích yếu văn hóa của trang phục.
   - Nút "Quay lại chỉnh sửa" để người dùng tiếp tục vòng lặp trải nghiệm mà không bị mất trạng thái.

#### B. Visual Identity & Theme (Cảm hứng Di Sản & Triều Nguyễn)
- **Thẩm mỹ**: Trang nhã, tinh tế, mang hơi thở viện bảo tàng và xưởng may thủ công cao cấp (Museum & Atelier Editorial).
- **Bảng màu**:
  - *Nền chủ đạo*: Giấy điệp / Giấy dó ấm (`#FAF7F2`), kem ngà (`#F3EFE6`).
  - *Màu cấu trúc & Viền*: Nâu sẫm mực tàu (`#2C241E`), viền chỉ tơ vàng đồng (`#D4A359` / `#C59B27`), đá phiến nhẹ (`#E7E1D6`).
  - *Màu điểm nhấn (Accents)*: Đỏ điều truyền thống (`#9E2A2B`), Lam chàm hoàng gia (`#1D3557`), Ngọc bích (`#2A9D8F`).
- **Typography**:
  - Tiêu đề & Tên trang phục: Font Serif cổ điển, thanh lịch (`Cormorant Garamond` hoặc `Playfair Display`).
  - Nội dung & Thao tác: Font Sans sắc nét, dễ đọc (`Plus Jakarta Sans` / `Be Vietnam Pro`).
  - Mã tham chiếu & Rule ID: Monospace thanh nhã (`font-mono tabular-nums`).

---

### 3. Key Product Decisions & Trade-Offs

- **Quyết định 1: Layer-First Rendering thay vì AI Image Generation trong bản MVP**:
  - *Lý do*: Theo tài liệu Notion, việc dùng Image AI (VTON) đã được hạ độ ưu tiên xuống P2 (chỉ làm sau khi đóng băng MVP) do độ trễ cao (5–15s), tính bất định văn hóa và nguy cơ làm hỏng demo. Ghép lớp vector/SVG đảm bảo phản hồi tức thì (<100ms), 100% nhất quán và tái hiện chính xác từng phụ kiện.
- **Quyết định 2: Hỗ trợ Chế độ Giả lập 7 Test Cases (TC01–TC07) trực tiếp trên UI**:
  - *Lý do*: Đáp ứng chính xác yêu cầu bàn giao cho Hùng Anh kiểm thử độc lập mà không bị gián đoạn khi chạy offline hoặc lúc chưa cấu hình khóa API.
- **Quyết định 3: Tuân thủ tuyệt đối Gemini Contract Schema v1**:
  - *Lý do*: Toàn bộ luồng dữ liệu giữa Gemini và Frontend được bảo vệ bởi schema nghiêm ngặt: `culture_check.status` chỉ nhận `ok`, `needs_attention`, `insufficient_evidence`. Nếu có lỗi định dạng, ứng dụng tự động kích hoạt fallback an toàn, không làm crash giao diện.

---

### 4. Technical Architecture & Data Strategy

#### Sơ đồ Kiến trúc Hệ thống

```
┌────────────────────────────────────────────────────────────────────────┐
│                        VIỆT HOA DI TÂN (APP SHELL)                     │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ Top Bar: Brand · 5-Step Progress · Chế độ Test Cases · Tiến độ   │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                   │                                    │
│   ┌───────────────┐               ▼               ┌─────────────────┐  │
│   │ Màn 1: CHỌN   │ ──► ┌───────────────────┐ ──► │ Màn 3: XƯỞNG    │  │
│   │ VIỆT PHỤC     │     │ Màn 2: BỐI CẢNH   │     │ PHỐI GHÉP LỚP   │  │
│   │ Áo ngũ thân   │     │ Dịp lễ / Style    │     │ Layer-First     │  │
│   └───────────────┘     └───────────────────┘     └────────┬────────┘  │
│                                                            │           │
│                                                            ▼           │
│   ┌───────────────┐                               ┌─────────────────┐  │
│   │ Màn 5: KẾT QUẢ│ ◄──────────────────────────── │ Màn 4: ĐÁNH GIÁ │  │
│   │ Tóm tắt &     │   Quay lại chỉnh sửa          │ & VĂN HÓA       │  │
│   │ Chia sẻ       │ ◄──────────────────────────── │ Contract v1     │  │
│   └───────────────┘                               └────────┬────────┘  │
│                                                            │           │
│                                                            ▼           │
│                          ┌──────────────────────────────────────────┐  │
│                          │ EVALUATION ENGINE                        │  │
│                          │  ├─ Mock 7 Test Cases Engine (Offline)   │  │
│                          │  └─ Gemini API Controller (Live Server)  │  │
│                          │       └─ Closed-World Cultural Rules v1  │  │
│                          └──────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

#### Dữ liệu Văn hóa v1 (Closed-World Ruleset)
- `RULE_01`: *Áo ngũ thân tay chẽn phối cùng quần trắng hoặc quần đen lụa* (Evidence: Khâm Định Đại Nam Hội Điển Sự Lệ).
- `RULE_02`: *Khăn vấn hoặc khăn đóng là quy thức đội đầu chuẩn mực khi mặc lễ phục* (Evidence: Nghi lễ triều Nguyễn).
- `RULE_03`: *Không phối áo ngũ thân truyền thống với phụ kiện thể thao/hiện đại phá vỡ tính trang nghiêm trong bối cảnh tế lễ* (Evidence: Tập tục nghi lễ cổ truyền).
- `RULE_04`: *Màu sắc áo ngũ thân dân gian chuộng các sắc nhã nhặn tự nhiên (lam, đen, chàm, lục, trắng ngà), kiêng kỵ sắc vàng chính hoàng của vua chúa trong dịp đại lễ xưa*.

#### Bộ 7 Tình huống Kiểm thử (TC01 — TC07)
- **TC01**: Phối hợp lý (Áo lam, quần trắng, khăn vấn, hài đen → status: `ok`).
- **TC02**: Xung đột màu / phụ kiện (Áo vàng hoàng bào đi lễ tế dân gian → cảnh báo `needs_attention`).
- **TC03**: Cách tân quá mức (Phối áo ngũ thân với giày thể thao và nón tai bèo → cảnh báo `needs_attention`).
- **TC04**: Hiện đại nhưng giữ bản sắc (Áo ngũ thân kết hợp phụ kiện tối giản dạo phố → status: `ok`).
- **TC05**: Gemini đưa thông tin không có trong kho (Thiếu bằng chứng đối chiếu → status: `insufficient_evidence`).
- **TC06**: Gemini trả JSON lỗi / sai schema → Tự động kích hoạt cơ chế phòng vệ Fallback tiếp tục luồng.
- **TC07**: Lỗi hiển thị tài nguyên hình ảnh → Kích hoạt bộ khung hiển thị thay thế (Graceful Vector Fallback).

---

### Kế hoạch Triển khai Chi tiết

1. **Khởi tạo dữ liệu & Contract types**:
   - Khai báo TypeScript types chuẩn cho `OutfitState`, `CulturalRule`, `GeminiContractV1`, `TestCase`.
   - Xây dựng kho dữ liệu văn hóa Áo ngũ thân v1 và bộ dữ liệu mẫu cho 7 Test Cases.
2. **Xây dựng Interactive Layer-First Canvas**:
   - Tạo bộ renderer vector ghép lớp SVG cho Áo ngũ thân tay chẽn (thân áo, nẹp cổ, nút ngũ khuy, tà áo, quần lụa, khăn vấn, hài gấm).
   - Tích hợp thay đổi màu sắc sống động và bật/tắt phụ kiện tức thì.
3. **Hiện thực 5 màn hình Vertical Slice**:
   - Điều hướng mượt mà, quản lý trạng thái tập trung trong React (`outfit_state`).
   - Xây dựng Màn 1 (Garment Selection), Màn 2 (Context & Style), Màn 3 (Studio), Màn 4 (Evaluation Panel), Màn 5 (Result View).
4. **Tích hợp Bộ máy Đánh giá Văn hóa & Gemini**:
   - Tích hợp bộ chuyển đổi 7 Test Cases độc lập phục vụ nghiệm thu cho Hùng Anh.
   - Tích hợp endpoint gọi Gemini API phía server với prompt canonical khép kín.
   - Xử lý các nút "Áp dụng" / "Bỏ qua" cho các gợi ý thay đổi màu hoặc phụ kiện.
5. **Bảng Theo dõi Tiến độ & Bàn giao**:
   - Thêm modal/drawer tiến độ công việc dành riêng cho Bùi Minh để theo dõi trạng thái các task P0 đến mốc đóng băng MVP.
6. **Kiểm tra & Biên dịch (compile_applet)**:
   - Đảm bảo toàn bộ ứng dụng chạy hoàn hảo, không lỗi TypeScript/ESLint, giao diện trang nhã và chuẩn xác.
