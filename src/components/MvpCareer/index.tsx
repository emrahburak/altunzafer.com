import { useState, useRef, useEffect, lazy, Suspense } from "react";
import { gsap } from "gsap";
import { useTranslation } from "react-i18next";
import { CAREER_DATA } from "@/data/career";

// --- MASAÜSTÜ BİLEŞENLERİ (Lazy Load) ---
const Sinema = lazy(() => import("../Sinema"));
const Tiyatro = lazy(() => import("../Tiyatro"));
const Production = lazy(() => import("../Production"));

// --- MOBİL BİLEŞENLER (Lazy Load) ---
const MobileSinema = lazy(() => import("../MobileSinema"));
const MobileTiyatro = lazy(() => import("../MobileTiyatro"));
const MobileProduction = lazy(() => import("../MobileProduction"));

/**
 * MvpCareer: Kod bölme (Code Splitting) uygulanmış, 
 * yüksek performanslı sinematik kariyer ana bileşeni.
 */
export default function Career() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Referanslar
  const curtainTopRef = useRef<HTMLDivElement>(null);
  const curtainBottomRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const backBtnRef = useRef<HTMLButtonElement>(null);

  // Ekran Boyutu Takibi
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // --- GSAP TRANSITIONS ---
  const handleOpen = (category: string) => {
    const tl = gsap.timeline();

    tl.to([curtainTopRef.current, curtainBottomRef.current], {
      y: 0,
      duration: 0.8,
      ease: "power4.inOut",
    })
      .call(() => setActiveTab(category))
      .to(overlayRef.current, { opacity: 1, visibility: "visible", duration: 0.1 })
      .to(curtainTopRef.current, { y: "-100%", duration: 0.8, ease: "power4.inOut" }, "+=0.2")
      .to(curtainBottomRef.current, { y: "100%", duration: 0.8, ease: "power4.inOut" }, "<")
      .fromTo(backBtnRef.current, { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5 }, "-=0.3");
  };

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

  // --- AKILLI VE PERFORMANSLI RENDER ---
  const renderComponent = () => {
    if (!activeTab) return null;

    return (
      <Suspense
        fallback={
          <div className="w-full h-screen flex items-center justify-center bg-black">
            <div className="text-gold-500 font-royal-7 animate-pulse tracking-widest uppercase">
              {t('career.loading', 'Loading...')}
            </div>
          </div>
        }
      >
        {activeTab === "sinema" && (isMobile ? <MobileSinema /> : <Sinema />)}
        {activeTab === "tiyatro" && (isMobile ? <MobileTiyatro /> : <Tiyatro />)}
        {activeTab === "produksiyon" && (isMobile ? <MobileProduction /> : <Production />)}
      </Suspense>
    );
  };

  return (
    <section className="relative w-full min-h-screen bg-black overflow-hidden">

      {/* 1. KATMAN: ANA GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 h-full w-full p-6 lg:p-10">
        {CAREER_DATA.map((item) => (
          <div key={item.id} className="group flex flex-col w-full h-[60vh] lg:h-full">
            <div className="relative w-full flex-grow overflow-hidden border border-white/5 bg-[#050505] rounded-lg">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover grayscale-[30%] transition-all duration-700 group-hover:grayscale-0 group-hover:brightness-110"
              />

              {/* LIGHT BEAM EFECT */}
              <div
                className="absolute inset-0 z-20 opacity-0 pointer-events-none transition-all duration-1000 ease-in-out group-hover:opacity-100 group-hover:translate-x-[200%]"
                style={{
                  background: "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.15) 45%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.15) 55%, transparent 70%)",
                  transform: "translateX(-100%) skewX(-20deg) scale(2)",
                  filter: "blur(40px)"
                }}
              />
            </div>

            <button
              onClick={() => handleOpen(item.title.split('/')[0].toLowerCase())}
              className="w-full mt-4 lg:mt-6 py-4 lg:py-5 border border-gold-600 text-gold-500 font-royal-7 uppercase tracking-[0.4em] rounded-xl transition-all duration-500 hover:bg-gold-500 hover:text-black "
            >
              {(() => {
                const title = item.title.toLowerCase();
                if (title.includes("sinema")) return t('career.sectionTitle.cinema');
                if (title.includes("tiyatro")) return t('career.sectionTitle.theater');
                if (title.includes("production") || title.includes("produksiyon")) return t("career.production.title");
                return item.title.split('/')[0];
              })()}
            </button>
          </div>
        ))}
      </div>

      {/* 2. KATMAN: TRANSITION PERDELERİ */}
      <div ref={curtainTopRef} className="fixed top-0 left-0 w-full h-1/2 bg-[#0a0a0a] z-[60] -translate-y-full border-b border-gold-500/10" />
      <div ref={curtainBottomRef} className="fixed bottom-0 left-0 w-full h-1/2 bg-[#0a0a0a] z-[60] translate-y-full border-t border-gold-500/10" />

      {/* 3. KATMAN: İÇERİK OVERLAY */}
      <div ref={overlayRef} className="fixed inset-0 z-50 bg-black invisible opacity-0 overflow-y-auto">
        <button
          ref={backBtnRef}
          onClick={handleClose}
          className="fixed top-6 left-6 lg:top-10 lg:left-10 z-[70] flex items-center gap-3 lg:gap-4 text-gold-500 group transition-all bg-black/50 p-2 rounded-lg backdrop-blur-sm"
        >
          <span className="text-2xl lg:text-4xl transition-transform group-hover:-translate-x-2">&larr;</span>
          <span className="uppercase tracking-[0.5em] text-xs lg:text-sm cursor-pointer">{t('career.turnBack')}</span>
        </button>

        <div className="w-full min-h-screen pt-20 lg:pt-0">
          {renderComponent()}
        </div>
      </div>
    </section>
  );
}
