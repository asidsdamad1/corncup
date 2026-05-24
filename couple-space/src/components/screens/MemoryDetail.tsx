"use client";

import { memories } from "@/data/mockData";
import NavBar from "@/components/ui/NavBar";

interface MemoryDetailProps {
  readonly memoryId?: string;
}

export const MemoryDetail: React.FC<MemoryDetailProps> = ({ memoryId = "1" }) => {
  const memory = memories.find((m) => m.id === memoryId) ?? memories[0];

  return (
    <div className="bg-background-main text-ink-primary font-body-md overflow-x-hidden min-h-screen">
      {/* Desktop SideNavBar */}
      <aside className="hidden md:flex flex-col h-full py-8 px-4 fixed left-0 top-0 z-50 w-64 bg-background-main border-r border-ink-primary border-opacity-10">
        <div className="mb-10 px-4">
          <h1 className="text-headline-md font-headline-md font-bold text-ink-primary">Duyên</h1>
          <p className="text-label-sm font-label-sm opacity-70">Digital Sanctuary</p>
        </div>
        <nav className="flex flex-col gap-2">
          <a className="flex items-center gap-3 px-4 py-3 text-ink-primary opacity-70 hover:opacity-100 hover:bg-surface-container transition-all" href="/emotions">
            <span className="material-symbols-outlined">favorite</span>
            <span className="text-label-md font-label-md">Cảm xúc</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 bg-surface-accent text-ink-primary rounded-xl font-bold scale-[0.98]" href="/memories">
            <span className="material-symbols-outlined">timeline</span>
            <span className="text-label-md font-label-md">Hành trình</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-ink-primary opacity-70 hover:opacity-100 hover:bg-surface-container transition-all" href="/plans">
            <span className="material-symbols-outlined">savings</span>
            <span className="text-label-md font-label-md">Tương lai</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-ink-primary opacity-70 hover:opacity-100 hover:bg-surface-container transition-all" href="/dates">
            <span className="material-symbols-outlined">calendar_today</span>
            <span className="text-label-md font-label-md">Hẹn hò</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-ink-primary opacity-70 hover:opacity-100 hover:bg-surface-container transition-all" href="/secrets">
            <span className="material-symbols-outlined">lock</span>
            <span className="text-label-md font-label-md">Bí mật</span>
          </a>
        </nav>
      </aside>

      {/* Top AppBar (Mobile) */}
      <header className="md:hidden flex justify-between items-center px-margin-mobile py-4 w-full bg-background-main z-40 fixed top-0 left-0">
        <h1 className="text-headline-md font-headline-md font-bold text-ink-primary">Duyên</h1>
        <div className="flex gap-4">
          <span className="material-symbols-outlined text-ink-primary">notifications</span>
          <span className="material-symbols-outlined text-ink-primary">account_circle</span>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="md:ml-64 px-margin-mobile md:px-margin-desktop pt-24 md:pt-12 pb-32 max-w-[1400px] mx-auto min-h-screen">
        {/* Back Navigation */}
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 text-label-md font-bold text-ink-primary hover:opacity-70 transition-opacity mb-8 group"
        >
          <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">arrow_back</span>
          Quay lại hành trình
        </button>

        {/* Header Section */}
        <header className="mb-stack-lg flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg text-ink-primary mb-2">{memory.title}</h2>
            <div className="flex items-center gap-4 text-body-md font-medium text-ink-primary opacity-80">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">location_on</span> {memory.location}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-ink-primary opacity-20" />
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">calendar_today</span>{" "}
                {new Date(memory.date).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" })}
              </span>
            </div>
          </div>
          <blockquote className="italic text-body-md font-body-md text-ink-primary opacity-80 max-w-sm border-l-4 border-surface-accent pl-4">
            &quot;{memory.quote}&quot;
          </blockquote>
        </header>

        {/* Trip Content Container */}
        <div className="space-y-12">
          {/* Masonry Grid Style Photo Gallery */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
            <div className="col-span-2 row-span-2 rounded-3xl overflow-hidden bg-surface-container group relative">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt="Sunrise Peak"
                src={memory.coverImage}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <p className="text-white text-label-md">Đỉnh Mã Pì Lèng lúc bình minh</p>
              </div>
            </div>
            <div className="col-span-1 row-span-1 rounded-3xl overflow-hidden bg-surface-container group">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt="Trail Handhold"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJNcOaeliKdddYfqSV91QB-vLYNEsjZTAPEp_J0jyVdyaQFjoxzht3z_syn2Mh42ZzsJdTy5JwKQrl7OcsoyLOfzBer2yfiRlks4pz9F2vs8YSvvKUJMMQHhZM8BQ3MLyifgM47uC1KyAcS8JOW6Vt1pZg3dsovzzoAdZvogtY5Ua1bvnTix_a8SPjL1h9HdE5YCiK_dw7DR9fSr1lrQPpWtK4WL535Ee9MwCa59iAD4OXj-h507zkVCSyFR3IaWxmFb6XR2lcZnM"
              />
            </div>
            <div className="col-span-1 row-span-2 rounded-3xl overflow-hidden bg-surface-container group">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt="Homestay window view"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGgMDnsbl1OY9wDM_CT5ioALzbuWAY2jvbtyOg12ksoGPNfwnuvhaQaVFbC8lF0QSEp8uFn0h1JV5Kf-1CHazDli1oCU1R3dQ-zZ17k_GBPJ3pjWB2sOA3aEXaR8IkOv5wQ6dY4c5umvBP6T3wjxeov9dD1YCdtAhLYIuSdrwYzxbS4vbBS0UGcCln1o83eFOZlM1a0Gc9oU1kywmgdz1-BckxrCDo3wSmmdPaPWVPMVha5-DBVx6mkWKzUZlvgacJUIsF3RKZPlA"
              />
            </div>
            <div className="col-span-1 row-span-1 rounded-3xl overflow-hidden bg-surface-container group">
              <img
                alt="Sunset cocktail"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAL6PCxi6tjhK3tAdbYWmbnadHBXHPZ8aDM6p0Zn4e0x3Ui9S0KZFsej5WdiXnXBugZRdJ1kBmcF2FFeOZGl2ZYSCSVCOrcUG0qQ5E_Bim87gVkVICMKhl_w0m7mM2eCPkwjqXQpsCykGJamcNUzcyQGEH-pLfL1NVfOh4jLRgyhNLKt3UtMLVxpBArbr5zmJL_ifSlUOCu7BV4sRnST3-LyTI3O4fGz23jL1wAPLORDXYOimdFZ9rq5kjp5ZIPI-qUTS-nW2lGOAo"
              />
            </div>
            <div className="col-span-2 row-span-1 rounded-3xl overflow-hidden bg-surface-container group">
              <img
                alt="Beach palm trees"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDNQg16pjwGZmzRMg0mx7EyzXqx5T9bZ9OY44-vVoQlGpHfyMeQaWiwPLkS0iz4OcmQ7_hBL-8VFh-H8QmI_y0zhHsPGdmd6lp-s6xJWaPw5tFitMxX2SVv4KxjjANUySyhjZFLheuSmjgDlCqWvHExHxgHK-gk6rW7o4H5Qd9AQWaiAfnxidkVTJ3bxkNhiXGBLTSvieaM5wWVKt3Cn1xG3jSQyNZdqTlpUJ7cg6PYnO9FWaWxccmFRrLc_oQ_v4ikyoyIjZRy1I"
              />
            </div>
          </section>

          {/* Information Layout */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Note đặc sắc */}
            <div className="bg-surface-accent rounded-3xl p-8 soft-shadow relative overflow-hidden">
              <div className="absolute -top-4 -right-4 p-8 opacity-5">
                <span className="material-symbols-outlined text-[120px]">edit_note</span>
              </div>
              <h4 className="text-headline-sm font-bold text-ink-primary mb-4 flex items-center gap-3">
                <span className="material-symbols-outlined text-[28px]">auto_awesome</span>
                Note đặc sắc
              </h4>
              <p className="text-body-lg font-body-lg text-ink-primary opacity-90 leading-relaxed">
                Đêm ấy trên Mã Pì Lèng, gió lạnh buốt nhưng bàn tay anh vẫn ấm. Chúng ta đã cùng hứa sẽ quay lại đây vào kỷ niệm 10 năm. Lời hứa giữa đại ngàn thật thiêng liêng và đáng nhớ hơn bao giờ hết. Từng hơi thở của núi rừng như minh chứng cho tình yêu này.
              </p>
            </div>

            {/* Ấn tượng */}
            <div className="bg-white rounded-3xl p-8 soft-shadow border border-ink-primary border-opacity-5">
              <h4 className="text-headline-sm font-bold text-ink-primary mb-6 flex items-center gap-3">
                <span className="material-symbols-outlined text-[28px]">stars</span>
                Ấn tượng
              </h4>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-background-main flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-ink-primary">coffee</span>
                  </div>
                  <div>
                    <h5 className="text-label-md font-bold text-ink-primary mb-1">Vị cafe trứng Lũng Cú</h5>
                    <p className="text-body-sm opacity-70">Ngọt bùi hòa quyện giữa tiết trời se lạnh của cực Bắc.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-background-main flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-ink-primary">music_note</span>
                  </div>
                  <div>
                    <h5 className="text-label-md font-bold text-ink-primary mb-1">Tiếng sáo mèo trong sương</h5>
                    <p className="text-body-sm opacity-70">Âm hưởng dân tộc vang vọng khắp các sườn đồi.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-background-main flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-ink-primary">motorcycle</span>
                  </div>
                  <div>
                    <h5 className="text-label-md font-bold text-ink-primary mb-1">Những cung đường tay áo</h5>
                    <p className="text-body-sm opacity-70">Cảm giác chinh phục đầy phấn khích trên từng cây số.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="flex justify-center pt-8">
            <button className="flex items-center gap-2 px-8 py-4 bg-ink-primary text-white rounded-full font-bold hover:scale-105 active:scale-95 transition-transform shadow-lg">
              <span className="material-symbols-outlined">add_a_photo</span>
              Thêm kỷ niệm cho hành trình này
            </button>
          </div>
        </div>
      </main>

      <NavBar activeHref="/memories" />
    </div>
  );
};

export default MemoryDetail;
