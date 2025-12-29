import { useState, useRef } from "react";
import { gsap } from "gsap";
import { CAREER_DATA } from "@/data/career";

// Modüler Bileşenleri Çağırıyoruz
import Sinema from "../Sinema";
import Tiyatro from "../Tiyatro";
import Production from "../Production";
import { useTranslation } from "react-i18next";

export default function MvpCareer() {

  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState<string | null>(null);

  // Referanslar
  const curtainTopRef = useRef<HTMLDivElement>(null);
  const curtainBottomRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const backBtnRef = useRef<HTMLButtonElement>(null);

  // --- TRANSITION: AÇILIŞ ---
  const handleOpen = (category: string) => {
    const tl = gsap.timeline();

    // 1. Perdeler ortada buluşur
    tl.to([curtainTopRef.current, curtainBottomRef.current], {
      y: 0,
      duration: 0.8,
      ease: "power4.inOut",
    })
      // 2. State değişimi (Siyah ekran arkasında gerçekleşir)
      .call(() => setActiveTab(category))
      // 3. Overlay'i görünür yap
      .to(overlayRef.current, { opacity: 1, visibility: "visible", duration: 0.1 })
      // 4. Perdeleri geri çek
      .to(curtainTopRef.current, { y: "-100%", duration: 0.8, ease: "power4.inOut" }, "+=0.2")
      .to(curtainBottomRef.current, { y: "100%", duration: 0.8, ease: "power4.inOut" }, "<")
      // 5. Back butonunu zarifçe getir
      .fromTo(backBtnRef.current, { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5 }, "-=0.3");
  };

  // --- TRANSITION: KAPANIŞ ---
  const handleClose = () => {
    const tl = gsap.timeline();

    tl.to([curtainTopRef.current, curtainBottomRef.current], {
      y: 0,
      duration: 0.7,
      ease: "power4.inOut",
    })
      .call(() => setActiveTab(null))
      .to(overlayRef.current, { opacity: 0, visibility: "hidden", duration: 0.1 })
      .to(curtainTopRef.current, { y: "-100%", duration: 0.7, ease: "power4.inOut" }, "+=0.2")
      .to(curtainBottomRef.current, { y: "100%", duration: 0.7, ease: "power4.inOut" }, "<");
  };

  // Dinamik Bileşen Seçici
  const renderComponent = () => {
    switch (activeTab) {
      case "sinema": return <Sinema />;
      case "tiyatro": return <Tiyatro />;
      case "produksiyon": return <Production />;
      default: return null;
    }
  };

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden">

      {/* --- 1. KATMAN: ANA GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 h-full w-full p-10">
        {CAREER_DATA.map((item) => (
          <div key={item.id} className="group flex flex-col w-full">
            <div className="relative w-full flex-grow overflow-hidden border border-white/5">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover grayscale-[30%] transition-transform duration-[1500ms] group-hover:scale-110"
              />
            </div>
            <button
              onClick={() => handleOpen(item.title.split('/')[0].toLowerCase())}
              className="w-full mt-6 py-5 border border-gold-600 text-gold-500 font-royal-7 uppercase tracking-[0.4em] rounded-xl transition-all duration-500 hover:bg-gold-500 hover:text-black hover:shadow-[0_0_20px_rgba(197,160,40,0.3)]"
            >
              {(() => {
                const title = item.title.toLowerCase();
                if (title.includes("sinema")) return t('career.sectionTitle.cinema');
                if (title.includes("tiyatro")) return t('career.sectionTitle.theater');
                if (title.includes("production") || title.includes("produksiyon")) return t("career.production.title");
                return item.title.split('/')[0]; // Fallback (Eşleşme olmazsa orijinali basar)
              })()}
            </button>
          </div>
        ))}
      </div>

      {/* --- 2. KATMAN: SİYAH PERDELER (TRANSITION) --- */}
      <div
        ref={curtainTopRef}
        className="fixed top-0 left-0 w-full h-1/2 bg-[#0a0a0a] z-[60] -translate-y-full border-b border-gold-500/10"
      />
      <div
        ref={curtainBottomRef}
        className="fixed bottom-0 left-0 w-full h-1/2 bg-[#0a0a0a] z-[60] translate-y-full border-t border-gold-500/10"
      />

      {/* --- 3. KATMAN: İÇERİK OVERLAY --- */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-50 bg-black invisible opacity-0 overflow-y-auto"
      >
        {/* Şık Geri Dönüş Butonu */}
        <button
          ref={backBtnRef}
          onClick={handleClose}
          className="fixed top-10 left-10 z-[70] flex items-center gap-4 text-gold-500 group transition-all"
        >
          <span className="text-4xl transition-transform group-hover:-translate-x-2">
            &larr;
          </span>
          <span className="uppercase tracking-[0.5em] text-sm border-b border-transparent group-hover:border-gold-500 pb-1">
            Geri Dön
          </span>
        </button>

        {/* Bileşen Render Alanı */}
        <div className="w-full min-h-screen px-10">
          {renderComponent()}
        </div>
      </div>

    </section>
  );
}
