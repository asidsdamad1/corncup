"use client";

import { motion } from "framer-motion";
import NavBar from "@/components/ui/NavBar";

interface SecretBoxUnlockedProps {}

export const SecretBoxUnlocked: React.FC<SecretBoxUnlockedProps> = () => {
  return (
    <div className="font-body-md text-ink-primary antialiased min-h-screen bg-background-main selection:bg-surface-accent selection:text-ink-primary">
      {/* SideNavBar (Desktop) */}
      <nav className="hidden md:flex flex-col h-full py-8 px-4 fixed left-0 top-0 z-50 bg-background-main border-r border-ink-primary border-opacity-10 w-64">
        <div className="mb-10 px-4">
          <h1 className="text-headline-md font-headline-md font-bold text-ink-primary">Duyên</h1>
          <p className="text-label-md font-label-md text-on-surface-variant mt-1 opacity-80">Digital Sanctuary</p>
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <a className="flex items-center gap-3 px-4 py-3 text-ink-primary opacity-70 hover:opacity-100 hover:bg-surface-container transition-all rounded-xl" href="/emotions">
            <span className="material-symbols-outlined">favorite</span>
            <span className="text-label-md font-label-md">Cảm xúc</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-ink-primary opacity-70 hover:opacity-100 hover:bg-surface-container transition-all rounded-xl" href="/memories">
            <span className="material-symbols-outlined">timeline</span>
            <span className="text-label-md font-label-md">Hành trình</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-ink-primary opacity-70 hover:opacity-100 hover:bg-surface-container transition-all rounded-xl" href="/plans">
            <span className="material-symbols-outlined">savings</span>
            <span className="text-label-md font-label-md">Tương lai</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-ink-primary opacity-70 hover:opacity-100 hover:bg-surface-container transition-all rounded-xl" href="/dates">
            <span className="material-symbols-outlined">calendar_today</span>
            <span className="text-label-md font-label-md">Hẹn hò</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 bg-surface-accent text-ink-primary rounded-xl font-bold transition-transform" href="/secrets">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>lock_open</span>
            <span className="text-label-md font-label-md">Bí mật</span>
          </a>
        </div>
        <div className="mt-auto px-4">
          <div className="flex items-center gap-3 bg-white/40 backdrop-blur-md p-3 rounded-xl border border-ink-primary/5">
            <div className="w-10 h-10 rounded-full bg-surface-accent flex items-center justify-center">
              <span className="material-symbols-outlined text-ink-primary">diversity_1</span>
            </div>
            <div className="text-label-sm font-label-sm text-ink-primary truncate">Không gian chung</div>
          </div>
        </div>
      </nav>

      {/* TopAppBar (Mobile Only) */}
      <header className="md:hidden flex justify-between items-center px-margin-mobile py-4 w-full z-40 fixed top-0 left-0 bg-background-main border-b border-ink-primary/5">
        <div className="text-headline-md font-headline-md font-bold text-ink-primary">Duyên</div>
        <div className="flex items-center gap-4">
          <button className="text-ink-primary hover:bg-surface-accent transition-colors p-2 rounded-full active:scale-95 duration-200">
            <span className="material-symbols-outlined">account_circle</span>
          </button>
          <button className="text-ink-primary hover:bg-surface-accent transition-colors p-2 rounded-full active:scale-95 duration-200">
            <span className="material-symbols-outlined">notifications</span>
          </button>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-1 w-full pt-24 pb-32 md:pt-8 md:pb-8 md:pl-64 px-margin-mobile md:px-margin-desktop min-h-screen flex flex-col relative">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto w-full mb-stack-lg flex flex-col items-center text-center mt-4">
          <div className="w-16 h-16 rounded-full bg-surface-text-container border border-surface-accent flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(245,199,199,0.4)]">
            <span className="material-symbols-outlined text-4xl text-ink-primary" style={{ fontVariationSettings: "'FILL' 1" }}>lock_open</span>
          </div>
          <h1 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg-mobile md:font-headline-lg text-ink-primary mb-2">Hộp thư bí mật</h1>
          <p className="text-body-md font-body-md text-on-surface-variant max-w-lg">Những cảm xúc chưa từng ngỏ, giờ đã được mở khóa. Một không gian riêng tư cho những điều chân thật nhất.</p>
        </div>

        {/* Bento Grid Layout for Notes */}
        <div className="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-gutter mb-stack-lg relative z-10">
          {/* Featured Special Memory */}
          <article className="col-span-1 md:col-span-8 bg-surface-accent/90 backdrop-blur-md border border-white/50 shadow-md rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 relative overflow-hidden group hover:scale-[1.01] transition-transform duration-300">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/20 rounded-full blur-2xl pointer-events-none" />
            <div className="w-full md:w-2/5 aspect-[4/5] rounded-xl overflow-hidden shadow-md flex-shrink-0 relative">
              <img
                className="w-full h-full object-cover"
                alt="Special memory hands"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCva4JSvdnOCQdABvj6rWE4LDV0qTOX3NxyhwVx4Tr8qaAESPt6fYlPI7Djl5JpcZbNPfwqi2uDTl05K1Yh3LlN9tQ1k0b-5YqccEQkcXDhD9agfBkHR7EopWKKdokkQYAsi61xA-A1dMSsgKCPIqE8mF2m08kgRd2r8oBu4ag84Y3Kd4TS-MdGusMgCT2zJwcAfZBnfXqXo_uARwRDtcqI_532GsGJY_9mNbkittK8QCs6yvxA6qortL9FTqHyPcu0dujhu61fTPQ"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-primary/60 to-transparent" />
              <span className="absolute bottom-3 left-3 text-white text-label-sm font-label-sm px-2 py-1 bg-ink-primary/40 backdrop-blur-md rounded-md">14 Tháng 2, 2023</span>
            </div>
            <div className="flex-grow flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-ink-primary opacity-70 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="text-label-sm font-label-sm text-ink-primary tracking-widest uppercase opacity-70">Kỷ niệm đáng nhớ</span>
              </div>
              <h2 className="text-headline-md font-headline-md text-ink-primary mb-4 leading-tight">Ngày mình quyết định nói ra tất cả</h2>
              <p className="text-body-md font-body-md text-ink-primary/80 line-clamp-4 md:line-clamp-6 italic">
                &quot;Lúc đó anh rất sợ em sẽ từ chối, nhưng ánh mắt em ngày hôm ấy lại dịu dàng đến lạ. Anh đã giấu lá thư này trong ngăn kéo suốt 3 tháng chỉ chờ một khoảnh khắc dũng cảm. Cảm ơn vì đã kiên nhẫn với sự ngốc nghếch của anh...&quot;
              </p>
              <button className="mt-auto self-start pt-4 text-label-md font-label-md text-ink-primary flex items-center gap-1 hover:gap-2 transition-all hover:text-tertiary">
                Đọc toàn bộ <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </article>

          {/* Small Note 1 */}
          <article className="col-span-1 md:col-span-4 bg-white/80 backdrop-blur-md border border-ink-primary/5 shadow-sm rounded-2xl p-6 flex flex-col hover:-translate-y-1 transition-transform">
            <div className="text-label-sm font-label-sm text-on-surface-variant mb-2">Gửi vào: 05/11/2023</div>
            <h3 className="text-headline-sm font-headline-sm text-ink-primary mb-3">Những điều anh chưa nói</h3>
            <p className="text-body-sm font-body-sm text-on-surface-variant flex-grow line-clamp-5 leading-relaxed">
              Thỉnh thoảng nhìn em ngủ say, anh lại thấy mình may mắn thế nào. Anh ít khi nói lời ngọt ngào, nhưng thật lòng anh luôn muốn dành mọi điều tốt đẹp nhất cho em.
            </p>
            <div className="mt-4 flex justify-between items-center border-t border-ink-primary/10 pt-3">
              <span className="material-symbols-outlined text-surface-accent" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
              <button className="text-label-sm font-label-sm text-ink-primary opacity-70 hover:opacity-100 transition-opacity">Mở thư</button>
            </div>
          </article>

          {/* Small Note 2 */}
          <article className="col-span-1 md:col-span-4 bg-white/80 backdrop-blur-md border border-ink-primary/5 shadow-sm rounded-2xl p-6 flex flex-col hover:-translate-y-1 transition-transform">
            <div className="text-label-sm font-label-sm text-on-surface-variant mb-2 flex justify-between">
              <span>Gửi vào: 22/08/2023</span>
              <span className="material-symbols-outlined text-sm text-ink-primary/50">image</span>
            </div>
            <h3 className="text-headline-sm font-headline-sm text-ink-primary mb-3">Kỷ niệm lần đầu gặp</h3>
            <p className="text-body-sm font-body-sm text-on-surface-variant flex-grow line-clamp-4 leading-relaxed">
              Cái quán cafe nhỏ xíu ấy, em mặc chiếc váy màu xanh nhạt. Mọi thứ hôm đó cứ như một thước phim quay chậm vậy.
            </p>
            <button className="w-full mt-4 py-2 bg-background-main/30 rounded-lg text-label-sm font-label-sm text-ink-primary hover:bg-surface-accent transition-colors">Xem chi tiết</button>
          </article>

          {/* Small Note 3 */}
          <article className="col-span-1 md:col-span-4 bg-white/80 backdrop-blur-md border-l-4 border-l-surface-accent shadow-sm rounded-2xl p-6 flex flex-col hover:-translate-y-1 transition-transform">
            <div className="text-label-sm font-label-sm text-on-surface-variant mb-2">Mở khóa hôm nay</div>
            <h3 className="text-headline-sm font-headline-sm text-ink-primary mb-3">Lời hứa cho 5 năm tới</h3>
            <div className="flex-grow flex items-center justify-center bg-surface-container-lowest/40 rounded-lg p-4 my-2 border border-ink-primary/5 border-dashed">
              <span className="material-symbols-outlined text-3xl text-surface-accent mb-2">celebration</span>
              <p className="text-center text-body-sm font-body-sm italic text-ink-primary/70 ml-2">
                &quot;Hy vọng lúc đọc được dòng này, chúng ta đang ở...&quot;
              </p>
            </div>
            <div className="mt-2 flex justify-end">
              <button className="text-label-sm font-label-sm text-ink-primary font-bold hover:underline">Đọc tiếp</button>
            </div>
          </article>

          {/* Add new note placeholder */}
          <article className="col-span-1 md:col-span-4 border-2 border-dashed border-ink-primary/20 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[200px] hover:bg-white/30 transition-colors cursor-pointer group">
            <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-ink-primary">add</span>
            </div>
            <span className="text-label-md font-label-md text-ink-primary">Tạo bí mật mới</span>
            <span className="text-label-sm font-label-sm text-on-surface-variant mt-1 text-center">Gửi một lời nhắn cho tương lai</span>
          </article>
        </div>

        {/* Action Bar at Bottom */}
        <div className="max-w-4xl mx-auto w-full mt-auto flex justify-center gap-4 py-8 z-20">
          <button className="px-6 py-3 bg-ink-primary text-white rounded-full text-label-md font-label-md flex items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
            <span className="material-symbols-outlined text-sm">edit</span> Gửi thêm bí mật
          </button>
          <button className="px-6 py-3 bg-white/80 backdrop-blur-md text-ink-primary rounded-full text-label-md font-label-md flex items-center gap-2 hover:bg-white transition-colors border border-ink-primary/5">
            <span className="material-symbols-outlined text-sm">lock</span> Đóng hộp
          </button>
        </div>
      </main>

      <NavBar activeHref="/secrets" />
    </div>
  );
};

export default SecretBoxUnlocked;
