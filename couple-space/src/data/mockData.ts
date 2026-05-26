// =============================================
// MOCK DATA — All static content for the app
// =============================================

export interface Emotion {
  emoji: string;
  label: string;
  value: string;
}

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
    coverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBmGZOIJuXayxaoC_cqksAufZucXAxKfjrb9dHF7o8_7uyqWp8IciWXR9_0xXW4agqWo7lYMfkTrvgQJJPLx9tlO6Hy1jN2sYIUDO-OMEobSCZelWyh3dovCIAtxiVjGWwGys3xobFJOuAET-jgLEQXz_wXZqM8jSA-5Vc1fq32oBGanOwDfolHsraiPEkULsaAvTC-Fl1UQfWoYINxx_cWqiz-Eh4-8NHqdCE0lnjj0TN4wqDIbWF8ylzGC334tfCwjt3rrZ5wryY",
    coverImageAlt:
      "Cảnh quan Hà Giang với núi đá vôi và sông xanh trong buổi sáng sớm",
    quote: "Giữa mây ngàn Hà Giang, ta thấy cả thế giới trong mắt nhau.",
    tags: ["Du lịch", "Thiên nhiên", "Lãng mạn"],
    rating: 5,
  },
  {
    id: "2",
    title: "Hội An lúc hoàng hôn",
    date: "2025-12-25",
    location: "Hội An, Quảng Nam",
    coverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC1_demo_hoian",
    coverImageAlt: "Phố cổ Hội An lung linh dưới ánh đèn lồng",
    quote: "Mỗi ngọn đèn lồng là một điều ước cho chúng mình.",
    tags: ["Phố cổ", "Lãng mạn", "Tối"],
    rating: 5,
  },
  {
    id: "3",
    title: "Cà phê thứ Bảy",
    date: "2026-03-08",
    location: "Sài Gòn",
    coverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC1_demo_coffee",
    coverImageAlt: "Hai ly cà phê sữa đá trên bàn gỗ",
    quote: "Buổi sáng nào cũng đẹp khi có em.",
    tags: ["Thường ngày", "Bình yên"],
    rating: 4,
  },
];



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
