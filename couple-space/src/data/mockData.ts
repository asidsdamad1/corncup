// =============================================
// MOCK DATA — All static content for the app
// =============================================

export interface Emotion {
  emoji: string;
  label: string;
  value: string;
}

export interface MemoryPhoto {
  id: string;
  url: string;
  alt: string;
  caption?: string;
}

export interface MemoryMoment {
  id: string;
  time: string;
  content: string;
  icon: string;
  photo?: string;
}

export type MemoryCategory = "travel" | "daily" | "romantic";

export interface Memory {
  id: string;
  title: string;
  date: string;
  location: string;
  coverImage: string;
  coverImageAlt: string;
  quote: string;
  tags: string[];
  rating: number;
  category: MemoryCategory;
  photos: MemoryPhoto[];
  moments: MemoryMoment[];
  participants: string[];
}

export interface SecretNote {
  id: string;
  title: string;
  previewText: string;
  unlockDate: string;
  isLocked: boolean;
  progressPercent: number;
  category: string;
  icon?: string;
  coverImage?: string;
  coverImageAlt?: string;
  tags?: string[];
  isTextOnly?: boolean;
}

export interface FeaturedCapsule {
  title: string;
  description: string;
  countdownDays: number;
  countdownHours: number;
  countdownMinutes: number;
}

export const featuredCapsule: FeaturedCapsule = {
  title: "Món quà kỷ niệm 5 năm",
  description:
    "Một bức thư tay và những tấm ảnh bí mật chúng mình chụp trong chuyến đi Phú Quốc, dành riêng cho Minh của năm 2026.",
  countdownDays: 14,
  countdownHours: 22,
  countdownMinutes: 56,
};

// SECRET NOTES
export const secretNotes: SecretNote[] = [
  // Pending / Locked
  {
    id: "sn-1",
    title: "Lời hứa cho tương lai",
    previewText: "Gửi gắm một lời hứa nhỏ...",
    unlockDate: "12.04.2024",
    isLocked: true,
    progressPercent: 80,
    category: "Tình cảm",
    icon: "favorite",
  },
  {
    id: "sn-2",
    title: "Chuyến đi trong mơ",
    previewText: "Ước mơ về Thụy Sĩ cùng anh...",
    unlockDate: "30.06.2024",
    isLocked: true,
    progressPercent: 40,
    category: "Du lịch",
    icon: "flight",
  },
  {
    id: "sn-3",
    title: "Ngôi nhà nhỏ",
    previewText: "Màu sơn chúng mình từng chọn...",
    unlockDate: "15.09.2024",
    isLocked: true,
    progressPercent: 60,
    category: "Tương lai",
    icon: "home",
  },
  // Unlocked memories
  {
    id: "sn-4",
    title: "Valentine Đầu Tiên",
    previewText:
      "Anh nhớ mãi buổi tối hôm đó, cơn mưa bất chợt khiến chúng mình phải trú tạm dưới mái hiên cũ. Đó là lúc anh nhận ra...",
    unlockDate: "14.02.2023",
    isLocked: false,
    progressPercent: 100,
    category: "Đã mở",
    coverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCgokIbzGBbwNPpFQYoLir7zjEuOPiI1knClUMCM6K3ZsJ864uWG5jgnuAyfvFCZjurBq5xJx5B-NNogE8a7P5bpgDHEiOvBQH-YDTnf_X5KSZKIaiKKlkAkKqj_na60suPI8nwZdrtNRrkKxoZe2pdARDewR0PXKzvyrofQEXeWJyyJWgwdDcCtxElgguZ0P9hcUkjfyPubngCrmwCKB10pcpWFxwzqv2aG0E51AejdL4S1XgBvW0w1DnrFhno1XomqmZBr9FusHI",
    coverImageAlt: "A warm overhead shot of a polaroid photo next to a cup of coffee",
  },
  {
    id: "sn-5",
    title: "Lời chúc New Year",
    previewText:
      '"Năm nay sẽ là năm tuyệt vời nhất vì có em bên cạnh. Anh muốn chúng mình sẽ cùng nhau đi hết bản đồ Việt Nam này..."',
    unlockDate: "01.01.2023",
    isLocked: false,
    progressPercent: 100,
    category: "Đã mở",
    isTextOnly: true,
    tags: ["#Travel", "#NewYear"],
  },
  {
    id: "sn-6",
    title: "Kỷ niệm 1 năm",
    previewText: "Bó hoa hồng 99 đóa và lời tỏ tình vụng về ở hồ Tây...",
    unlockDate: "20.10.2022",
    isLocked: false,
    progressPercent: 100,
    category: "Đã mở",
    coverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD7e5cuhG3OX1TfSHdu8RNDdnn4tVKgR5cb6QwcV9iUyTGUxqnI7XTp1v7jXr3CNPZa2aNE_ZJPy8bi_9KxMcjlQodsJG9Ba3UiWIk9GUtK6dYrtorR3RHaj5_KZC-e1UzBQw5JTjm29yQLDau2257auqO5N3Aw90Kqwttxxmj80Xh5BMlsPYi2Zzh79O3cfutK0h5v1iZu2eZvJP5-4PfPZghGOCNXP2VocWt3hD8KF4GbiDhV9PoJ31xh2YtLNEd1bkVidfLw3Gg",
    coverImageAlt: "A serene sunset beach with two silhouettes walking hand in hand",
  },
  {
    id: "sn-7",
    title: "Bài hát của đôi ta",
    previewText: '"Cứ thế này thôi, bình yên qua những ngày bão giông..."',
    unlockDate: "15.08.2022",
    isLocked: false,
    progressPercent: 100,
    category: "Đã mở",
    isTextOnly: true,
    icon: "music_note",
  },
  {
    id: "sn-8",
    title: "Nhật ký bí mật #1",
    previewText: "Lần đầu tiên em nấu ăn cho anh, dù mặn nhưng anh vẫn ăn hết sạch...",
    unlockDate: "01.06.2022",
    isLocked: false,
    progressPercent: 100,
    category: "Đã mở",
  },
];

export interface DatePlan {
  id: string;
  title: string;
  date: string;
  location: string;
  status: "upcoming" | "completed" | "pending";
  rating?: number;
  emotionAfter?: string;
}

export interface SavingGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  priority: "high" | "medium" | "low";
  emoji: string;
}

// EMOTIONS
export const emotions: Emotion[] = [
  { emoji: "😊", label: "Hạnh phúc", value: "happy" },
  { emoji: "🤩", label: "Hào hứng", value: "excited" },
  { emoji: "😌", label: "Bình yên", value: "calm" },
  { emoji: "😔", label: "Buồn", value: "sad" },
  { emoji: "😠", label: "Bực bội", value: "angry" },
  { emoji: "🥰", label: "Yêu thương", value: "love" },
  { emoji: "😴", label: "Mệt mỏi", value: "tired" },
  { emoji: "🤗", label: "Ấm áp", value: "warm" },
];

// MEMORIES
export const memories: Memory[] = [
  {
    id: "1",
    title: "Hà Giang 04/2026",
    date: "2026-04-12",
    location: "Hà Giang, Việt Nam",
    category: "travel",
    coverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBmGZOIJuXayxaoC_cqksAufZucXAxKfjrb9dHF7o8_7uyqWp8IciWXR9_0xXW4agqWo7lYMfkTrvgQJJPLx9tlO6Hy1jN2sYIUDO-OMEobSCZelWyh3dovCIAtxiVjGWwGys3xobFJOuAET-jgLEQXz_wXZqM8jSA-5Vc1fq32oBGanOwDfolHsraiPEkULsaAvTC-Fl1UQfWoYINxx_cWqiz-Eh4-8NHqdCE0lnjj0TN4wqDIbWF8ylzGC334tfCwjt3rrZ5wryY",
    coverImageAlt:
      "Cảnh quan Hà Giang với núi đá vôi và sông xanh trong buổi sáng sớm",
    quote: "Giữa mây ngàn Hà Giang, ta thấy cả thế giới trong mắt nhau.",
    tags: ["Du lịch", "Thiên nhiên", "Lãng mạn"],
    rating: 5,
    participants: ["Anh", "Em"],
    photos: [
      { id: "p1-1", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBmGZOIJuXayxaoC_cqksAufZucXAxKfjrb9dHF7o8_7uyqWp8IciWXR9_0xXW4agqWo7lYMfkTrvgQJJPLx9tlO6Hy1jN2sYIUDO-OMEobSCZelWyh3dovCIAtxiVjGWwGys3xobFJOuAET-jgLEQXz_wXZqM8jSA-5Vc1fq32oBGanOwDfolHsraiPEkULsaAvTC-Fl1UQfWoYINxx_cWqiz-Eh4-8NHqdCE0lnjj0TN4wqDIbWF8ylzGC334tfCwjt3rrZ5wryY", alt: "Đỉnh Mã Pì Lèng lúc bình minh", caption: "Bình minh trên đèo Mã Pì Lèng" },
      { id: "p1-2", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJNcOaeliKdddYfqSV91QB-vLYNEsjZTAPEp_J0jyVdyaQFjoxzht3z_syn2Mh42ZzsJdTy5JwKQrl7OcsoyLOfzBer2yfiRlks4pz9F2vs8YSvvKUJMMQHhZM8BQ3MLyifgM47uC1KyAcS8JOW6Vt1pZg3dsovzzoAdZvogtY5Ua1bvnTix_a8SPjL1h9HdE5YCiK_dw7DR9fSr1lrQPpWtK4WL535Ee9MwCa59iAD4OXj-h507zkVCSyFR3IaWxmFb6XR2lcZnM", alt: "Nắm tay nhau trên đường đèo", caption: "Cung đường tay áo" },
      { id: "p1-3", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGgMDnsbl1OY9wDM_CT5ioALzbuWAY2jvbtyOg12ksoGPNfwnuvhaQaVFbC8lF0QSEp8uFn0h1JV5Kf-1CHazDli1oCU1R3dQ-zZ17k_GBPJ3pjWB2sOA3aEXaR8IkOv5wQ6dY4c5umvBP6T3wjxeov9dD1YCdtAhLYIuSdrwYzxbS4vbBS0UGcCln1o83eFOZlM1a0Gc9oU1kywmgdz1-BckxrCDo3wSmmdPaPWVPMVha5-DBVx6mkWKzUZlvgacJUIsF3RKZPlA", alt: "Homestay view", caption: "View từ cửa sổ homestay" },
      { id: "p1-4", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAL6PCxi6tjhK3tAdbYWmbnadHBXHPZ8aDM6p0Zn4e0x3Ui9S0KZFsej5WdiXnXBugZRdJ1kBmcF2FFeOZGl2ZYSCSVCOrcUG0qQ5E_Bim87gVkVICMKhl_w0m7mM2eCPkwjqXQpsCykGJamcNUzcyQGEH-pLfL1NVfOh4jLRgyhNLKt3UtMLVxpBArbr5zmJL_ifSlUOCu7BV4sRnST3-LyTI3O4fGz23jL1wAPLORDXYOimdFZ9rq5kjp5ZIPI-qUTS-nW2lGOAo", alt: "Sunset cocktail", caption: "Hoàng hôn trên cao nguyên đá" },
      { id: "p1-5", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDNQg16pjwGZmzRMg0mx7EyzXqx5T9bZ9OY44-vVoQlGpHfyMeQaWiwPLkS0iz4OcmQ7_hBL-8VFh-H8QmI_y0zhHsPGdmd6lp-s6xJWaPw5tFitMxX2SVv4KxjjANUySyhjZFLheuSmjgDlCqWvHExHxgHK-gk6rW7o4H5Qd9AQWaiAfnxidkVTJ3bxkNhiXGBLTSvieaM5wWVKt3Cn1xG3jSQyNZdqTlpUJ7cg6PYnO9FWaWxccmFRrLc_oQ_v4ikyoyIjZRy1I", alt: "Beach palm trees", caption: "Biển chiều Cát Bà" },
    ],
    moments: [
      { id: "m1-1", time: "06:00", content: "Xuất phát từ Hà Nội, lòng đầy háo hức cho chuyến đi đầu tiên lên cực Bắc.", icon: "directions_car" },
      { id: "m1-2", time: "12:30", content: "Đến Đồng Văn, check-in homestay nhỏ xinh nằm giữa thung lũng. View cực đẹp!", icon: "location_on" },
      { id: "m1-3", time: "15:00", content: "Khám phá Cột cờ Lũng Cú — chụp ảnh cùng lá cờ đỏ sao vàng trên đỉnh núi.", icon: "flag" },
      { id: "m1-4", time: "19:00", content: "Ăn tối tại nhà hàng địa phương, thử món thắng cố và rượu ngô.", icon: "restaurant" },
      { id: "m1-5", time: "21:00", content: "Ngắm sao trời cao nguyên đá, giữa yên bình tuyệt đối. Đêm đáng nhớ nhất.", icon: "nights_stay" },
    ],
  },
  {
    id: "2",
    title: "Hội An lúc hoàng hôn",
    date: "2025-12-25",
    location: "Hội An, Quảng Nam",
    category: "travel",
    coverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCgokIbzGBbwNPpFQYoLir7zjEuOPiI1knClUMCM6K3ZsJ864uWG5jgnuAyfvFCZjurBq5xJx5B-NNogE8a7P5bpgDHEiOvBQH-YDTnf_X5KSZKIaiKKlkAkKqj_na60suPI8nwZdrtNRrkKxoZe2pdARDewR0PXKzvyrofQEXeWJyyJWgwdDcCtxElgguZ0P9hcUkjfyPubngCrmwCKB10pcpWFxwzqv2aG0E51AejdL4S1XgBvW0w1DnrFhno1XomqmZBr9FusHI",
    coverImageAlt: "Phố cổ Hội An lung linh dưới ánh đèn lồng",
    quote: "Mỗi ngọn đèn lồng là một điều ước cho chúng mình.",
    tags: ["Du lịch", "Phố cổ", "Lãng mạn"],
    rating: 5,
    participants: ["Anh", "Em"],
    photos: [
      { id: "p2-1", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgokIbzGBbwNPpFQYoLir7zjEuOPiI1knClUMCM6K3ZsJ864uWG5jgnuAyfvFCZjurBq5xJx5B-NNogE8a7P5bpgDHEiOvBQH-YDTnf_X5KSZKIaiKKlkAkKqj_na60suPI8nwZdrtNRrkKxoZe2pdARDewR0PXKzvyrofQEXeWJyyJWgwdDcCtxElgguZ0P9hcUkjfyPubngCrmwCKB10pcpWFxwzqv2aG0E51AejdL4S1XgBvW0w1DnrFhno1XomqmZBr9FusHI", alt: "Đèn lồng Hội An", caption: "Phố cổ về đêm" },
      { id: "p2-2", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuD7e5cuhG3OX1TfSHdu8RNDdnn4tVKgR5cb6QwcV9iUyTGUxqnI7XTp1v7jXr3CNPZa2aNE_ZJPy8bi_9KxMcjlQodsJG9Ba3UiWIk9GUtK6dYrtorR3RHaj5_KZC-e1UzBQw5JTjm29yQLDau2257auqO5N3Aw90Kqwttxxmj80Xh5BMlsPYi2Zzh79O3cfutK0h5v1iZu2eZvJP5-4PfPZghGOCNXP2VocWt3hD8KF4GbiDhV9PoJ31xh2YtLNEd1bkVidfLw3Gg", alt: "Hoàng hôn biển Cửa Đại", caption: "Cửa Đại hoàng hôn" },
      { id: "p2-3", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBmGZOIJuXayxaoC_cqksAufZucXAxKfjrb9dHF7o8_7uyqWp8IciWXR9_0xXW4agqWo7lYMfkTrvgQJJPLx9tlO6Hy1jN2sYIUDO-OMEobSCZelWyh3dovCIAtxiVjGWwGys3xobFJOuAET-jgLEQXz_wXZqM8jSA-5Vc1fq32oBGanOwDfolHsraiPEkULsaAvTC-Fl1UQfWoYINxx_cWqiz-Eh4-8NHqdCE0lnjj0TN4wqDIbWF8ylzGC334tfCwjt3rrZ5wryY", alt: "Chùa Cầu", caption: "Chùa Cầu biểu tượng" },
    ],
    moments: [
      { id: "m2-1", time: "09:00", content: "Bay đến Đà Nẵng, thuê xe máy chạy thẳng về Hội An. Gió biển mát lịm.", icon: "flight" },
      { id: "m2-2", time: "14:00", content: "Thả đèn hoa đăng trên sông Hoài, cùng nhau ước nguyện.", icon: "local_fire_department" },
      { id: "m2-3", time: "17:30", content: "Ngồi café bên sông ngắm hoàng hôn. Trời Hội An đẹp nao lòng.", icon: "coffee" },
      { id: "m2-4", time: "19:00", content: "Dạo phố cổ dưới ánh đèn lồng, ăn cao lầu và bánh mì Phượng.", icon: "restaurant" },
      { id: "m2-5", time: "21:00", content: "Chụp bộ ảnh couple dưới phố đèn lồng. Kỷ niệm đẹp nhất trong năm.", icon: "photo_camera" },
    ],
  },
  {
    id: "3",
    title: "Cà phê thứ Bảy",
    date: "2026-03-08",
    location: "Sài Gòn",
    category: "daily",
    coverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAL6PCxi6tjhK3tAdbYWmbnadHBXHPZ8aDM6p0Zn4e0x3Ui9S0KZFsej5WdiXnXBugZRdJ1kBmcF2FFeOZGl2ZYSCSVCOrcUG0qQ5E_Bim87gVkVICMKhl_w0m7mM2eCPkwjqXQpsCykGJamcNUzcyQGEH-pLfL1NVfOh4jLRgyhNLKt3UtMLVxpBArbr5zmJL_ifSlUOCu7BV4sRnST3-LyTI3O4fGz23jL1wAPLORDXYOimdFZ9rq5kjp5ZIPI-qUTS-nW2lGOAo",
    coverImageAlt: "Hai ly cà phê sữa đá trên bàn gỗ",
    quote: "Buổi sáng nào cũng đẹp khi có em.",
    tags: ["Hằng ngày", "Bình yên"],
    rating: 4,
    participants: ["Anh", "Em"],
    photos: [
      { id: "p3-1", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAL6PCxi6tjhK3tAdbYWmbnadHBXHPZ8aDM6p0Zn4e0x3Ui9S0KZFsej5WdiXnXBugZRdJ1kBmcF2FFeOZGl2ZYSCSVCOrcUG0qQ5E_Bim87gVkVICMKhl_w0m7mM2eCPkwjqXQpsCykGJamcNUzcyQGEH-pLfL1NVfOh4jLRgyhNLKt3UtMLVxpBArbr5zmJL_ifSlUOCu7BV4sRnST3-LyTI3O4fGz23jL1wAPLORDXYOimdFZ9rq5kjp5ZIPI-qUTS-nW2lGOAo", alt: "Cà phê sáng", caption: "Ly café quen thuộc" },
      { id: "p3-2", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJNcOaeliKdddYfqSV91QB-vLYNEsjZTAPEp_J0jyVdyaQFjoxzht3z_syn2Mh42ZzsJdTy5JwKQrl7OcsoyLOfzBer2yfiRlks4pz9F2vs8YSvvKUJMMQHhZM8BQ3MLyifgM47uC1KyAcS8JOW6Vt1pZg3dsovzzoAdZvogtY5Ua1bvnTix_a8SPjL1h9HdE5YCiK_dw7DR9fSr1lrQPpWtK4WL535Ee9MwCa59iAD4OXj-h507zkVCSyFR3IaWxmFb6XR2lcZnM", alt: "Góc quán nhỏ", caption: "Quán quen của hai đứa" },
    ],
    moments: [
      { id: "m3-1", time: "08:00", content: "Thức dậy, anh pha cà phê cho cả hai. Mùi cà phê quyện với nắng sớm.", icon: "coffee" },
      { id: "m3-2", time: "09:30", content: "Đi bộ ra quán quen, ngồi góc cửa sổ. Em vẽ doodle trên giấy napkin.", icon: "draw" },
      { id: "m3-3", time: "11:00", content: "Đọc sách cho nhau nghe, cùng cười vì một câu truyện ngắn vô nghĩa.", icon: "menu_book" },
    ],
  },
  {
    id: "4",
    title: "Đà Lạt: Những buổi sáng lạnh tê tái",
    date: "2024-08-15",
    location: "Đà Lạt, Lâm Đồng",
    category: "travel",
    coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBo1xa7EHgqwvYw5z03ddfiqBKSIthtnBZ2qzjbkEGQR_m3lFnnLeNibohRVFp04n_E5c-W8rQLLrGZrfc3phKNiO549iKrXCXFCTfeG-w3Z2bD1Hh7PpUX8oJLOJ2x6UPMKyVzcdYPg8UzHf0GGgYbQJP0rcU30ZCZDcz04LAuF09MjQhY-Ozqniz-hVgYFwLwn3x84LhoVWHiUO5QtmnGgB6IhD3DjLm8Psau_lS9GWj8WHisyETKdgquHKSGccCarSgvws4yrQc",
    coverImageAlt: "Rừng thông Đà Lạt mờ sương",
    quote: "Những buổi sáng lạnh tê tái...",
    tags: ["Du lịch", "Lãng mạn"],
    rating: 5,
    participants: ["Anh", "Em"],
    photos: [
      { id: "p4-1", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBo1xa7EHgqwvYw5z03ddfiqBKSIthtnBZ2qzjbkEGQR_m3lFnnLeNibohRVFp04n_E5c-W8rQLLrGZrfc3phKNiO549iKrXCXFCTfeG-w3Z2bD1Hh7PpUX8oJLOJ2x6UPMKyVzcdYPg8UzHf0GGgYbQJP0rcU30ZCZDcz04LAuF09MjQhY-Ozqniz-hVgYFwLwn3x84LhoVWHiUO5QtmnGgB6IhD3DjLm8Psau_lS9GWj8WHisyETKdgquHKSGccCarSgvws4yrQc", alt: "Rừng thông", caption: "Bình minh rừng thông" },
      { id: "p4-2", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBmGZOIJuXayxaoC_cqksAufZucXAxKfjrb9dHF7o8_7uyqWp8IciWXR9_0xXW4agqWo7lYMfkTrvgQJJPLx9tlO6Hy1jN2sYIUDO-OMEobSCZelWyh3dovCIAtxiVjGWwGys3xobFJOuAET-jgLEQXz_wXZqM8jSA-5Vc1fq32oBGanOwDfolHsraiPEkULsaAvTC-Fl1UQfWoYINxx_cWqiz-Eh4-8NHqdCE0lnjj0TN4wqDIbWF8ylzGC334tfCwjt3rrZ5wryY", alt: "Hồ Tuyền Lâm", caption: "Hồ Tuyền Lâm êm đềm" }
    ],
    moments: [
      { id: "m4-1", time: "05:30", content: "Dậy sớm săn mây ở đồi Đa Phú.", icon: "cloud" },
      { id: "m4-2", time: "08:00", content: "Ăn bánh mì xíu mại Hoàng Diệu, uống sữa đậu nành nóng hổi.", icon: "restaurant" }
    ]
  },
  {
    id: "5",
    title: "Mộc Châu",
    date: "2024-01-20",
    location: "Mộc Châu, Sơn La",
    category: "travel",
    coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAB28tTLNTsC-54Q88lQ1-p3iUTQS_px3WaE8veFLiJT_Fc6jKe8wyQInuujnYyi0LRdGL0HAQmQWaoLK2bzWUCLb99aFvrGppCY-WYT3MvemtXd5-Qa4w1MaHlZthvvOOSiqqToY3NZrWOOWrn2Y9PtQaIoKj-61uGeqQvFsYYMNK-ppvp6rCH2iRphBJn9cQ9MkLaSfs38lz1gziBg6MFm5a32Z9d8Ct-9uI14ZeBz3pqfLzn78VSa1Dx89MC3oDM7qLMj0N7V-w",
    coverImageAlt: "Đồi chè Mộc Châu",
    quote: "Đồng cải trắng và trái tim mình...",
    tags: ["Du lịch"],
    rating: 4,
    participants: ["Anh", "Em"],
    photos: [
      { id: "p5-1", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAB28tTLNTsC-54Q88lQ1-p3iUTQS_px3WaE8veFLiJT_Fc6jKe8wyQInuujnYyi0LRdGL0HAQmQWaoLK2bzWUCLb99aFvrGppCY-WYT3MvemtXd5-Qa4w1MaHlZthvvOOSiqqToY3NZrWOOWrn2Y9PtQaIoKj-61uGeqQvFsYYMNK-ppvp6rCH2iRphBJn9cQ9MkLaSfs38lz1gziBg6MFm5a32Z9d8Ct-9uI14ZeBz3pqfLzn78VSa1Dx89MC3oDM7qLMj0N7V-w", alt: "Đồi chè", caption: "Đồi chè trái tim" }
    ],
    moments: [
      { id: "m5-1", time: "10:00", content: "Lạc giữa rừng mận lấp ló trong sương.", icon: "filter_hdr" }
    ]
  },
  {
    id: "6",
    title: "Chuyện Phố",
    date: "2023-11-05",
    location: "Hà Nội",
    category: "daily",
    coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAL6PCxi6tjhK3tAdbYWmbnadHBXHPZ8aDM6p0Zn4e0x3Ui9S0KZFsej5WdiXnXBugZRdJ1kBmcF2FFeOZGl2ZYSCSVCOrcUG0qQ5E_Bim87gVkVICMKhl_w0m7mM2eCPkwjqXQpsCykGJamcNUzcyQGEH-pLfL1NVfOh4jLRgyhNLKt3UtMLVxpBArbr5zmJL_ifSlUOCu7BV4sRnST3-LyTI3O4fGz23jL1wAPLORDXYOimdFZ9rq5kjp5ZIPI-qUTS-nW2lGOAo",
    coverImageAlt: "Góc phố Hà Nội",
    quote: "Những ngày lang thang quanh Hồ Tây.",
    tags: ["Hằng ngày"],
    rating: 5,
    participants: ["Anh", "Em"],
    photos: [],
    moments: [
      { id: "m6-1", time: "16:00", content: "Hoàng hôn Hồ Tây gió lộng.", icon: "wb_twilight" }
    ]
  }
];

export const memoryCategoryLabels: Record<MemoryCategory, string> = {
  travel: "Du lịch",
  daily: "Hằng ngày",
  romantic: "Lãng mạn",
};

export const memoryCategoryIcons: Record<MemoryCategory, string> = {
  travel: "flight",
  daily: "coffee",
  romantic: "favorite",
};



// DATE PLANS
export const datePlans: DatePlan[] = [
  {
    id: "dp-1",
    title: "Xem phim và ăn tối",
    date: "2026-05-25",
    location: "Vincom Đồng Khởi",
    status: "upcoming",
  },
  {
    id: "dp-2",
    title: "Dạo phố đêm Bến Nghé",
    date: "2026-05-18",
    location: "Quận 1, TP.HCM",
    status: "completed",
    rating: 5,
    emotionAfter: "love",
  },
  {
    id: "dp-3",
    title: "Picnic công viên 23/9",
    date: "2026-06-01",
    location: "Công viên 23/9",
    status: "pending",
  },
];

// SAVING GOALS
export const savingGoals: SavingGoal[] = [
  {
    id: "sg-1",
    title: "Du lịch Nhật Bản",
    targetAmount: 50000000,
    currentAmount: 32000000,
    deadline: "2026-12-01",
    priority: "high",
    emoji: "🇯🇵",
  },
  {
    id: "sg-2",
    title: "Mua xe mới",
    targetAmount: 120000000,
    currentAmount: 45000000,
    deadline: "2027-06-01",
    priority: "medium",
    emoji: "🚗",
  },
  {
    id: "sg-3",
    title: "Sắm đồ cho nhà mới",
    targetAmount: 30000000,
    currentAmount: 28500000,
    deadline: "2026-08-01",
    priority: "low",
    emoji: "🏠",
  },
];

// NAV ITEMS
export const navItems = [
  { icon: "home", label: "Trang chủ", href: "/" },
  { icon: "favorite", label: "Cảm xúc", href: "/emotions" },
  { icon: "photo_album", label: "Kỷ niệm", href: "/memories" },
  { icon: "lock", label: "Hộp bí mật", href: "/secrets" },
  { icon: "calendar_month", label: "Hẹn hò", href: "/dates" },
  { icon: "savings", label: "Tiết kiệm", href: "/savings" },
] as const;
