# Kế hoạch: màn "Hộp bí mật"

Phạm vi: `/secrets`, `/secrets/new`, và mọi thành phần `SecretBox*` / `LockedNote*`.
Ngày rà soát: 2026-09-11. Đối chiếu với `DESIGN.MD` và code đang chạy.

---

## 1. Quy tắc code hiện hành — bắt buộc tuân thủ

Đây là quy ước đã có trong repo, **rút ra từ chính code**, không phải đề xuất mới.
Mọi thay đổi trong kế hoạch này phải nằm trong khuôn đó.

### 1.1 Nền tảng

| | |
|---|---|
| Next.js 16 App Router + Turbopack, React 19, TypeScript `strict: true` | |
| Tailwind **v4** khai báo token bằng `@theme` trong `src/app/globals.css` | **Không có `@config`** ⇒ `tailwind.config.ts` không bao giờ được nạp. Đừng thêm token vào đó. |
| ESLint: `eslint-config-next` core-web-vitals + typescript | Không thêm rule mới |
| **Không thêm dependency mới** | Mọi thứ cần thiết đã có: framer-motion, Prisma |

### 1.2 Tổ chức file

- `app/<route>/page.tsx` — vỏ mỏng, chỉ render một screen component.
- `components/screens/` — màn hình và các modal gắn chặt với một màn hình.
- `components/ui/` — thứ dùng lại được ở nhiều màn (`Portal`, `ConfirmDialog`, `PhotoGrid`, `NavBar`, `Meter`).
- `lib/` — logic thuần, không JSX (`memoryStore.ts`, `provinces.ts`, `image.ts`, `useModalKeys.ts`).
- `data/mockData.ts` — kiểu dữ liệu + dữ liệu mẫu. **Kiểu dùng chung phải khai báo ở đây**, không định nghĩa lại trong component.

### 1.3 Component

- `"use client"` ở dòng đầu mọi component có state hoặc handler.
- Props: `interface XProps { readonly … }`.
- Kiểu component: repo đang lẫn hai lối — 18 file dùng `React.FC<Readonly<Props>>`, 5 file mới dùng `export function X({…}: Props)`.
  **Code mới dùng lối hàm thường.** Không đi sửa lại file cũ chỉ vì lối viết.
- Mỗi file có cả *named export* và `export default` ở cuối.
- Không tự ý refactor code lân cận không liên quan đến việc đang làm.

### 1.4 CSS và màu

- Chỉ dùng primitive có sẵn trong `@layer components` của `globals.css`:
  `card` `card-ink` `card-flat` `card-dashed` `card-tilt-r`, `sheet`, `chip` (`-accent` `-soft` `-blue`),
  `btn` (`-accent` `-ink` `-sm` `-icon`), `field` (`-label` `-error`), `modal` (`-head` `-body` `-foot`),
  `toast` (`-ok` `-warn` `-error`), `mat` (`-inner`), `ruled`, `rule`, `overlay`, `masonry-grid`, `shake`.
- Chỉ thêm class mới khi thật sự thiếu, và **phải đặt trong `@layer components`**.
- ⚠️ **CSS không phân lớp thắng mọi `@layer`, bất kể specificity.** Đây là bẫy đã cắn dự án này một lần
  (viền focus của ghim bản đồ). Muốn một component ghi đè quy tắc toàn cục không phân lớp thì phải
  sửa ở selector của quy tắc đó, hoặc đặt quy tắc của component ra ngoài `@layer`.
- Màu chỉ qua token. **`#ba1a1a` (error) chỉ dùng cho lỗi nhập liệu** — `DESIGN.MD` §Colour.
  Nút xoá / hành động phá huỷ **không dùng đỏ**; sức nặng đến từ hộp xác nhận và `btn-ink`.
- Sau **mỗi lần sửa `globals.css` phải khởi động lại dev server** — Turbopack trong repo này hay phục vụ CSS cũ.

### 1.5 Modal

Khuôn chuẩn (xem `AddMomentModal.tsx`, `ConfirmDialog.tsx`):

```
<Portal>
  <div className="overlay z-[200] …" role="dialog" aria-modal="true" aria-labelledby="…">
    <motion.button className="absolute inset-0" onClick={onClose} aria-label="Đóng" tabIndex={-1} />
    <motion.div className="modal" ref={dialogRef} onKeyDown={onKeyDown}
      transition={{ type: "spring", damping: 28, stiffness: 350 }}>
```

- Luôn dùng `useModalKeys(onClose)` → Escape đóng + bẫy Tab + focus vào control đầu tiên.
  Hiện **chỉ 3/9 modal** dùng; mọi modal đụng tới trong kế hoạch này phải dùng.
- Luôn có backdrop bấm-ra-ngoài-để-đóng.
- Bọc trong `<AnimatePresence>` ở phía cha.
- Thang `z-index` đang dùng: overlay thường `200`, overlay lồng `210`, lightbox `300`, `ConfirmDialog` `400`.

### 1.6 Dữ liệu và trạng thái

- Trạng thái chia sẻ giữa nhiều màn: store nhỏ bằng `useSyncExternalStore` đặt trong `lib/`
  (mẫu: `lib/memoryStore.ts`). **Không dùng Context, không thêm thư viện state.**
- Mỗi hàm `add*` phải có `remove*` đối xứng. Không để dữ liệu chỉ thêm được mà không xoá được.
- Hành động phá huỷ luôn đi qua `ConfirmDialog`, và hộp thoại phải **nêu đích danh** thứ sắp mất.

### 1.7 Ảnh, icon, chữ

- Ảnh: `<img>` kèm `onImageError` (từ `lib/image.ts`), `loading="lazy"`, `decoding="async"`.
  `next/image` chưa dùng ở đâu cả; cảnh báo `no-img-element` đang được chấp nhận có chủ đích.
- Icon: `<span className="material-symbols-outlined">`. Khi đặt `fontVariationSettings` động
  phải kèm `suppressHydrationWarning`.
- Chữ hiển thị: tiếng Việt. Định danh trong code: tiếng Anh.
- Comment: viết tiếng Anh, giải thích **vì sao** chứ không mô tả lại code đang làm gì.

### 1.8 A11y

- Nút chỉ có icon bắt buộc `aria-label`. Toggle dùng `aria-pressed`.
- Vùng nội dung tự đổi dùng `role="status"` + `aria-live="polite"`.
- **Không nút chết.** Nút chưa có việc thì không render.

### 1.9 Tiêu chí "xong"

1. `npx tsc --noEmit` sạch.
2. `npx eslint <các file đã sửa>` không phát sinh lỗi mới (cảnh báo `no-img-element` chấp nhận được).
3. Kiểm chứng bằng script chạy thật trên dev server, không kết luận bằng suy đoán.
4. Nếu có sửa `globals.css`: khởi động lại dev server rồi mới kiểm tra.

---

## 2. Hiện trạng

### Nhóm A — Cái khoá không có thật (nghiêm trọng nhất)

| # | Vấn đề | Vị trí |
|---|---|---|
| A1 | **`isLocked` là cờ thủ công, không bao giờ so với ngày.** 3 ghi chú đang "Đang chờ mở khóa" có ngày mở là 12.04.2024 / 30.06.2024 / 15.09.2024 — đã qua hơn 2 năm. | `data/mockData.ts:94-125` |
| A2 | **Bấm vào một ghi chú đang khoá thì mở thẳng popup sửa, không hỏi mật mã**, và hiện toàn bộ nội dung để chỉnh sửa. Cái khoá hoàn toàn vô nghĩa. | `SecretBoxManagement.tsx:285` → `LockedNoteEditPopup.tsx` |
| A3 | **Nội dung ghi chú đang khoá được in thẳng ra thẻ** ở danh sách chờ (`previewText`). Bí mật lộ ngay trước khi mở. | `SecretBoxManagement.tsx:303` |
| A4 | Modal chi tiết nói thẳng: *"Bạn vẫn có thể xem trước nội dung bên dưới"* rồi hiện nội dung ghi chú đang khoá. | `SecretBoxDetailModal.tsx:93` |
| A5 | **Mật mã người dùng đặt lúc tạo bị vứt đi.** `CreateSecretBoxPopup` trả `passcode` qua `onSuccess`, nhưng `SecretBoxManagement` không hề đọc nó. Mở khoá luôn dùng hằng số `"1234"` dùng chung cho mọi hộp. | `CreateSecretBoxPopup.tsx:13` vs `SecretBoxManagement.tsx:463-477`; `SecretBoxPasswordPopup.tsx:18` |
| A6 | **Thông báo lỗi in luôn mật mã ra màn hình**: *"Mật mã không chính xác. Thử lại với "1234""*. | `SecretBoxPasswordPopup.tsx:97` |
| A7 | Không giới hạn số lần thử, không trễ, không khoá tạm. | `SecretBoxPasswordPopup.tsx:27-38` |
| A8 | Chân trang tuyên bố *"Private & Encrypted"* — **không có mã hoá nào cả**. Kèm sai thương hiệu ("Digital Sanctuary") và sai năm (2024). | `SecretBoxUnlockSuccess.tsx:143` |

> Ghi chú bảo mật: kể cả sau khi sửa, **kiểm tra mật mã ở client chỉ là trang trí**. Cổng thật phải là
> Server Action, và nội dung ghi chú **không được rời server** trước khi server cho phép. Điều này đã
> ghi trong comment ở `SecretBoxPasswordPopup.tsx:14-17` và vẫn còn nguyên giá trị.

### Nhóm B — Đồng hồ đếm ngược và trạng thái mở khoá

| # | Vấn đề | Vị trí |
|---|---|---|
| B1 | Đếm ngược khởi tạo từ ba con số cứng (`countdownDays/Hours/Minutes`) rồi tự trừ mỗi giây bằng `setInterval`. **Không gắn với mốc thời gian nào.** Trình duyệt chạy nền sẽ bị bóp xung nhịp ⇒ đồng hồ chạy chậm dần và sai. | `SecretBoxManagement.tsx:42-66`, `mockData.ts:84-91` |
| B2 | `featuredCapsule` **không có ngày mở khoá**, chỉ có "còn bao lâu" ⇒ không thể tính lại sau khi tải lại trang. | `mockData.ts:84-91` |
| B3 | Đếm ngược về 0 thì đổi ổ khoá sang "Đã mở khóa ✨", **nhưng vẫn bắt nhập mật mã** khi bấm. Hai khái niệm "đến hạn" và "đã mở" bị trộn làm một. | `SecretBoxManagement.tsx:34-38, 140` |
| B4 | Mở khoá xong sinh ra **một ghi chú giả cứng** ("Những điều anh chưa nói (Vừa mở)") với nội dung viết sẵn, bất kể hộp nào vừa được mở. | `SecretBoxManagement.tsx:76-89` |
| B5 | Màn "mở khoá thành công" là **lá thư cứng trong JSX** — ảnh, nội dung, thẻ, ngày đều dán cứng, không liên quan tới hộp vừa mở. | `SecretBoxUnlockSuccess.tsx:59-140` |
| B6 | Nút *"Khóa lại vào hộp"* thực ra gọi `handleUnlockSave` — tức là **tạo thêm một ghi chú đã mở**. Nghĩa ngược hoàn toàn với nhãn. | `SecretBoxUnlockSuccess.tsx:136` |
| B7 | Toàn bộ trang bị chặn sau cờ `mounted` ⇒ **không có nội dung nào được render phía server**, chỉ có tiêu đề. | `SecretBoxManagement.tsx:118-126` |

### Nhóm C — Nút chết và điều khiển rỗng (11 cái)

| Vị trí | Điều khiển |
|---|---|
| `SecretBoxManagement.tsx:108, 111` | "Thông báo", "Yêu thích" trên header |
| `SecretBoxManagement.tsx:329` | **Ô "Sắp xếp"** — có `<option>` nhưng không `value`, không `onChange`; sắp xếp không bao giờ xảy ra |
| `SecretBoxDetailModal.tsx:158` | "Lưu vào kỷ niệm" |
| `SecretBoxUnlockSuccess.tsx:38, 41` | "Thông báo", "Tài khoản" |
| `SecretBoxUnlockSuccess.tsx:125, 129` | "Lưu vào Hành trình", "Chia sẻ" |
| `CreateSecretBox.tsx:26, 33, 123` | "Menu", "Thông báo", **"Hủy bỏ"** |

Ngoài ra `SecretBoxPasswordPopup.tsx:114` dẫn người dùng tới *"phần Cài đặt"* — **màn Cài đặt không tồn tại**.

### Nhóm D — Trùng lặp và mã chết

| # | Vấn đề | Vị trí |
|---|---|---|
| D1 | **`/secrets/new` là route mồ côi.** Không có link nào trong toàn bộ `src/` trỏ tới. Nội dung là bản sao gần như y hệt `CreateSecretBoxPopup`, và **không lưu gì cả** — submit chỉ bật một modal chúc mừng. | `app/secrets/new/page.tsx`, `CreateSecretBox.tsx` (183 dòng) |
| D2 | **Server Action `saveSecretNote` chưa bao giờ được gọi.** | `app/actions/coupleData.ts:49` |
| D3 | Lược đồ Prisma `SecretNote` **lệch hẳn với model UI**: chỉ có `content`, `passcode`, `isUnlocked`, `unlockDate`. Thiếu `title`, `category`, `tags`, `coverImage`, `icon`. Và **`passcode` lưu dạng chữ thường (plaintext)**. | `prisma/schema.prisma:51-61` |
| D4 | `progressPercent` có trong kiểu và trong cả 8 bản ghi mẫu nhưng **không được hiển thị ở đâu**. | `mockData.ts:67` + 8 chỗ |
| D5 | `SecretBoxDetailModal` **định nghĩa lại interface `SecretNote`** thay vì import từ `mockData`, và để `previewText` là optional trong khi bản gốc là bắt buộc ⇒ hai nguồn sự thật. | `SecretBoxDetailModal.tsx:7-18` |
| D6 | `LockedNoteEditPopup` cũng tự định nghĩa `LockedNote` riêng. | `LockedNoteEditPopup.tsx:7-14` |
| D7 | `category` bị dùng lẫn lộn: dữ liệu mẫu để `"Đã mở"` (một trạng thái), còn popup sửa cho chọn `"Tình cảm" / "Du lịch" / …` (một phân loại). | `mockData.ts:136` vs `LockedNoteEditPopup.tsx:51` |

### Nhóm E — Lỗi hành vi

| # | Vấn đề | Vị trí |
|---|---|---|
| E1 | `handleSend` dùng `setTimeout` giả lập độ trễ nhưng **không dọn khi unmount**. Đóng modal giữa chừng thì 2 giây sau `onSend` vẫn chạy và vẫn ghi đè ghi chú — người dùng đã huỷ mà thay đổi vẫn được lưu. | `LockedNoteEditPopup.tsx:41-48` |
| E2 | Popup sửa cho đổi **ngày mở khoá**, nhưng hàm nhận ở màn cha **chỉ cập nhật `title`, `previewText`, `category`** — ngày bị lặng lẽ vứt đi sau khi đã báo "Đã gửi thành công!". | `SecretBoxManagement.tsx:520-528` |
| E3 | Ngày mở khoá trong popup sửa là `type="text"` tự do, trong khi popup tạo là `type="date"`. Không kiểm tra gì. | `LockedNoteEditPopup.tsx:203` |
| E4 | Popup tạo **không chặn ngày trong quá khứ** (thiếu `min`), và chỉ kiểm tra "khác rỗng" nên mật mã 1-2 số vẫn qua dù nhãn ghi "(4 số)". | `CreateSecretBoxPopup.tsx:30-36` |
| E5 | Ô tìm kiếm **chỉ lọc ghi chú đã mở**; ghi chú đang khoá không bị lọc. Tìm không ra thì hiện tiêu đề "Kỷ niệm đã mở" với một vùng trống, **không có trạng thái "không tìm thấy"**. | `SecretBoxManagement.tsx:69-71` |
| E6 | Bố cục masonry **bị gắn cứng theo id dữ liệu mẫu**: `note.id === "sn-6"` quyết định chiều cao ảnh và vị trí chip; `!note.id.includes("sn-6")` quyết định có hiện dòng "Xem chi tiết". Dữ liệu thật sẽ không bao giờ khớp. | `SecretBoxManagement.tsx:360, 365, 413` |
| E7 | Ảnh bìa `<img>` **không có `onImageError`, `loading`, `decoding`** — lệch quy ước ở mục 1.7, link hỏng sẽ hiện icon vỡ. | `SecretBoxManagement.tsx:356`, `SecretBoxDetailModal.tsx:103` |
| E8 | Ghi chú mới tạo bị gán cứng `progressPercent: 20`, `category: "Tình cảm"`, `tags: ["Mới", "Đang khóa"]` bất kể người dùng nhập gì. | `SecretBoxManagement.tsx:463-477` |
| E9 | **Không xoá được gì cả** — không xoá được hộp bí mật, dù đã có `ConfirmDialog` dùng chung. Đúng vấn đề "rác dữ liệu" vừa xử lý xong cho màn Kỷ niệm. | toàn màn |
| E10 | Không có store dùng chung: `useState(secretNotes)` cục bộ ⇒ tải lại trang là mất sạch, và màn Trang chủ không thấy gì. | `SecretBoxManagement.tsx:22` |
| E11 | 6/9 modal thiếu `useModalKeys` ⇒ **Escape không đóng, Tab đi ra ngoài modal**. `SecretBoxPasswordPopup` và `CreateSecretBoxPopup` còn thiếu cả backdrop bấm-ra-ngoài. | nhiều file |
| E12 | Thẻ tiến trình ở Trang chủ ghi cứng *"Cần 3 ngày nữa"* và *"Tiến trình: 80%"*, **không liên quan gì tới dữ liệu thật**, và không bấm sang `/secrets` được. | `HomePage.tsx:204-223` |

---

## 3. Kế hoạch thực hiện

Thứ tự đặt theo nguyên tắc: **sửa cho đúng nghĩa trước, rồi mới làm đẹp**.
Mỗi giai đoạn có tiêu chí kiểm chứng riêng và có thể dừng lại được.

### Giai đoạn 1 — Làm cho cái khoá có thật

*Giải quyết: A1, A2, A3, A4, B1, B2, B3, D3, D4, D5, D6, D7*

1. **Thống nhất mô hình dữ liệu** trong `data/mockData.ts`:
   - `unlockAt: string` (ISO 8601) thay cho `unlockDate` dạng chuỗi hiển thị.
   - Tách `preview: string` (được phép lộ) khỏi `content: string` (bí mật).
   - Bỏ `progressPercent` (D4) — tính từ `createdAt` → `unlockAt` khi cần.
   - `category` chỉ còn là phân loại; trạng thái suy ra từ `unlockAt`, không lưu.
   - Xoá `isLocked` khỏi dữ liệu: **trạng thái khoá là hàm của thời gian**, không phải một cờ.
   - Sửa lại ngày của 3 ghi chú mẫu sang tương lai để chúng thật sự đang khoá.
2. **`lib/secretBox.ts`** (thuần, không JSX): `isUnlockable(note, now)`, `timeUntil(note, now)`, `formatUnlockDate(note)`.
3. Ghi chú đang khoá: thẻ **chỉ hiện `preview`**, không bao giờ hiện `content`.
4. Bấm vào ghi chú đang khoá → hỏi mật mã, **không mở thẳng popup sửa**.
5. Đếm ngược tính từ `unlockAt - now` mỗi giây, **không tự trừ dần**; bỏ `countdownDays/Hours/Minutes`.

**Kiểm chứng:** script đặt `now` giả ở trước/đúng/sau `unlockAt` và khẳng định trạng thái đổi đúng;
đổi đồng hồ hệ thống ⇒ đếm ngược tự khớp; grep khẳng định `content` không xuất hiện trong nhánh render của thẻ đang khoá.

### Giai đoạn 2 — Mật mã theo từng hộp

*Giải quyết: A5, A6, A7*

1. Mỗi ghi chú có `passcode` riêng; `CreateSecretBoxPopup` ghi nó vào store (hiện đang vứt đi).
2. `SecretBoxPasswordPopup` nhận mật mã cần so **qua props**, bỏ hằng số `CORRECT`.
3. Bỏ câu lộ mật mã ở dòng 97. Bỏ câu dẫn tới "phần Cài đặt" không tồn tại.
4. Đếm số lần sai, sau 5 lần thì khoá nhập 30 giây.
5. Giữ nguyên và làm rõ cảnh báo: **đây vẫn chỉ là cổng trang trí phía client.**

**Kiểm chứng:** tạo hộp với mật mã `4821`, `1234` phải bị từ chối, `4821` phải mở được;
grep khẳng định chuỗi `"1234"` không còn trong `src/`.

### Giai đoạn 3 — Store dùng chung + xoá được

*Giải quyết: E9, E10, E1, E2*

1. **`lib/secretStore.ts`** theo đúng khuôn `memoryStore.ts` (`useSyncExternalStore`):
   `useSecretNotes`, `useSecretNote`, `addSecretNote`, `updateSecretNote`, **`removeSecretNote`**, `markUnlocked`.
2. Nút xoá trên thẻ ghi chú (cả đang khoá lẫn đã mở) → `ConfirmDialog` có sẵn, nêu đích danh tiêu đề.
   **Không dùng màu đỏ** (mục 1.4).
3. Bỏ `setTimeout` giả lập trong `LockedNoteEditPopup`; lưu ngay lập tức.
4. Cho `updateSecretNote` nhận **cả `unlockAt`**, hết cảnh sửa ngày rồi bị vứt.

**Kiểm chứng:** `tsc` sạch; script kiểm mỗi `add*` đều có `remove*` đối xứng; kiểm trên dev server rằng
mọi thẻ đều có nút xoá và không có `<button>` lồng trong `<a>`.

### Giai đoạn 4 — Dọn trùng lặp và nút chết

*Giải quyết: C (11 nút), D1, D2, E5, E6, E7*

1. **Xoá `/secrets/new` và `CreateSecretBox.tsx`** (183 dòng, mồ côi, không lưu gì) — hoặc chuyển thành
   route thật có link tới. Đề xuất: xoá, vì popup đã làm đúng việc đó. *Cần bạn xác nhận.*
2. Nút chết: **gỡ bỏ** ("Thông báo", "Yêu thích", "Tài khoản", "Menu") hoặc **nối vào việc thật**
   ("Lưu vào kỷ niệm" → tạo `Memory` từ ghi chú; "Chia sẻ" → `navigator.share`). Đề xuất: gỡ hết trong
   giai đoạn này, nối lại sau nếu cần.
3. **Ô "Sắp xếp"**: nối `value` + `onChange` và áp dụng thật, hoặc gỡ. Đề xuất: nối, vì đã vẽ rồi.
4. Tìm kiếm áp cho **cả hai danh sách**, và thêm trạng thái "không tìm thấy".
5. Bỏ mọi nhánh `note.id === "sn-6"`; chiều cao ảnh do tỉ lệ thật quyết định.
6. Ảnh bìa dùng `onImageError` + `loading` + `decoding` như quy ước 1.7.

**Kiểm chứng:** chạy lại `deadbtn` — số điều khiển rỗng phải về **0**; grep `"sn-`  không còn trong `src/components`.

### Giai đoạn 5 — Mở khoá cho ra mở khoá

*Giải quyết: B4, B5, B6, E8*

1. `SecretBoxUnlockSuccess` **nhận ghi chú qua props** và hiển thị nội dung thật; xoá lá thư cứng.
2. Mở khoá thành công → `markUnlocked(id)` trên ghi chú đang mở, **không sinh bản ghi giả**.
3. Đổi nhãn "Khóa lại vào hộp" cho đúng việc nó làm (đóng và quay lại), hoặc bỏ.
4. Sửa chân trang: bỏ "Digital Sanctuary", bỏ **"Private & Encrypted"** (A8) — không tuyên bố thứ không có.
5. Ghi chú mới tạo lấy `category`/`tags` từ người dùng, không gán cứng.

**Kiểm chứng:** mở hộp A rồi hộp B phải ra hai nội dung khác nhau; sau khi mở, số ghi chú **không tăng**.

### Giai đoạn 6 — A11y, form, trang chủ

*Giải quyết: A8 (còn lại), B7, E3, E4, E11, E12*

1. `useModalKeys` cho cả 6 modal còn thiếu; thêm backdrop cho `SecretBoxPasswordPopup` và `CreateSecretBoxPopup`.
2. Ngày mở khoá: `type="date"` ở cả hai nơi, có `min` là hôm nay. Mật mã bắt buộc đúng 4 chữ số.
3. Bỏ cổng `mounted` để nội dung render được phía server (B7).
4. Thẻ ở Trang chủ lấy số liệu thật từ store và bấm sang được `/secrets`.

**Kiểm chứng:** Tab đi hết một vòng trong mỗi modal rồi quay lại control đầu; Escape đóng được cả 9 modal;
`curl /secrets` trả về HTML có nội dung ghi chú, không chỉ mỗi tiêu đề.

### Giai đoạn 7 — Lưu trữ thật *(tuỳ chọn, lớn)*

*Giải quyết: D2, D3, và ghi chú bảo mật ở nhóm A*

1. Sửa `prisma/schema.prisma`: thêm `title`, `preview`, `category`, `tags`, `coverImage`, `icon`, `createdAt`.
2. **Không lưu mật mã dạng plaintext** — lưu hash.
3. Server Action `getSecretNotes` **chỉ trả `content` khi đã qua `unlockAt` và mật mã đã được xác thực ở server**.
   Đây là điểm mấu chốt: hiện nay nội dung bí mật được gửi xuống trình duyệt ngay từ đầu.
4. Nối `saveSecretNote` (đang chết) vào luồng tạo.

**Kiểm chứng:** xem payload HTML/JSON của `/secrets` — `content` của hộp đang khoá **không được có mặt**.

---

## 4. Cần bạn quyết

1. **Xoá hay giữ `/secrets/new`?** Hiện mồ côi và không lưu gì. Tôi đề xuất xoá.
2. **Nút chết: gỡ hay nối?** Tôi đề xuất gỡ trước, nối lại từng cái khi có nhu cầu thật.
3. **Có làm Giai đoạn 7 không?** Nếu chưa, cần chấp nhận rằng hộp bí mật vẫn chỉ là mô hình trình diễn:
   mọi nội dung nằm sẵn trong trình duyệt, ai mở DevTools cũng đọc được — kể cả sau Giai đoạn 1-6.
4. **`featuredCapsule`** nên trở thành một ghi chú bình thường được đánh dấu nổi bật, hay giữ là một thực thể riêng?

## 5. Ngoài phạm vi

- Đăng nhập / phân quyền thật (`MOCK_USER_ID` vẫn dán cứng trong `coupleData.ts`).
- Mã hoá đầu-cuối.
- Chuyển sang `next/image`.
- Nút chết ở các màn khác ngoài Hộp bí mật.
