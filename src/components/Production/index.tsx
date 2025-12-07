import { useRef, useState, useMemo } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "react-i18next";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// YENİ DATA IMPORT
import { PRODUCTION_DATA } from "@/data/production";

export default function Production() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  // Veriyi değişkene ata (Kodun geri kalanıyla uyumlu olması için)
  const rawData = PRODUCTION_DATA;

  // --- SÜTUNLARA DAĞITMA (2 Sütun) ---
  const columns = useMemo(() => {
    const cols = [[], []] as typeof rawData[];
    rawData.forEach((item, i) => {
      cols[i % 2].push(item);
    });
    return cols;
  }, []); // rawData dışarıdan geldiği için dependency array boş kalabilir veya [rawData] eklenebilir

  const slides = rawData.map((item) => ({ src: item.img, alt: item.title }));

  const handleImageClick = (clickedItemImg: string) => {
    const slideIndex = rawData.findIndex(s => s.img === clickedItemImg);
    if (slideIndex >= 0) {
      setIndex(slideIndex);
      setOpen(true);
    }
  };

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const reels = gsap.utils.toArray<HTMLElement>(".column-reel");

      reels.forEach((reel, i) => {
        const direction = i % 2 === 0 ? -1 : 1;
        const distance = reel.scrollHeight / 2;

        if (direction === 1) {
          gsap.set(reel, { y: -distance });
        }

        const tween = gsap.to(reel, {
          y: direction === -1 ? -distance : 0,
          duration: 25 + i * 5,
          ease: "none",
          repeat: -1,
        });

        reel.addEventListener("mouseenter", () => tween.pause());
        reel.addEventListener("mouseleave", () => tween.play());
      });
    });

  }, { scope: containerRef });

  return (
    <>
      <div
        ref={containerRef}
        className="w-full h-auto bg-dark-bg relative flex items-center justify-center"
      >
        {/* Arka Plan Dekoru */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/5 blur-[150px] rounded-full pointer-events-none z-0"></div>

        {/* --- DİKEY BAŞLIK --- */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 -translate-x-1/2 -rotate-90 origin-center whitespace-nowrap opacity-100 transition-opacity z-50 hidden lg:block">
          <span className="text-4xl text-gold-500 font-royal-7 tracking-widest uppercase transition-colors">
            {t('career.sectionTitle.production')}
          </span>
        </div>

        {/* --- İKİ KOLONLU KAPSAYICI --- */}
        <div className="
            w-full h-full lg:w-[90vw] lg:h-screen 
            flex flex-col lg:flex-row lg:justify-between lg:items-center 
            overflow-y-auto lg:overflow-hidden 
            px-6 py-24 lg:p-0
        ">

          {/* --- 1. SOL ALAN: STATİK METİN (GENİŞLİK: 45%) --- */}
          <div className="w-full lg:w-[45%] h-auto lg:h-full flex flex-col justify-center px-4 lg:pl-32 lg:pr-16 z-20 shrink-0">

            {/* Ana Başlık Bloğu */}
            <div className="mb-12 lg:mb-16">
              <span className="text-gold-500 font-geometric tracking-[0.3em] text-xs uppercase block mb-2">
                {t('career.production.subtitle')}
              </span>
              <h2 className="text-4xl md:text-4xl font-royal-7 text-white leading-tight">
                {t('career.production.title').split(' ').map((word, index) => (
                  <span key={index}>{word} </span>
                ))}
              </h2>
            </div>

            {/* Uluslararası Tecrübe Paragrafı */}
            <div className="bg-black/70 backdrop-blur-sm p-6 md:p-8 border-l-4 border-gold-500/50 shadow-lg mt-8 lg:mt-0">
              <h3 className="text-xl font-royal-7 text-gold-500 mb-3">
                {t('career.production.globalExperienceTitle')}
              </h3>
              <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed font-fluid-2">
                {t('career.production.globalExperienceText')}
              </p>
            </div>
          </div>

          {/* --- 2. SAĞ ALAN: MAKARALAR (GENİŞLİK: 50%) --- */}
          <div className="w-full lg:w-[50%] h-full flex lg:flex-row gap-4 lg:gap-8 overflow-hidden pt-12 lg:pt-0">

            {columns.map((colItems, colIndex) => (
              <div
                key={colIndex}
                className="relative w-1/2 h-auto lg:h-[150%] -mt-[10%] flex flex-col gap-6"
              >
                <div className="column-reel flex flex-col gap-6 w-full">
                  {/* Sonsuz döngü için veriyi iki kez render ediyoruz */}
                  {[...colItems, ...colItems].map((item, i) => (
                    <div
                      key={`${colIndex}-${i}`}
                      onClick={() => handleImageClick(item.img)}
                      className="group relative w-full aspect-3/4 rounded-sm overflow-hidden border border-white/5 bg-white/5 cursor-pointer shrink-0"
                    >
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover opacity-60 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105"
                      />

                      <div className="absolute bottom-0 left-0 w-full p-4 bg-linear-to-t from-black via-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <span className="text-gold-500 text-[10px] uppercase tracking-widest block mb-1">
                          {t('career.production.itemRole')}
                        </span>
                        <span className="text-white text-xs font-royal-1 text-center opacity-70 group-hover:opacity-100 transition-opacity">
                          {item.title}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* --- DEKORATİF BİTİŞ --- */}
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#0a0a0a] to-transparent z-10 pointer-events-none hidden lg:block"></div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10 pointer-events-none hidden lg:block"></div>

      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        styles={{ container: { backgroundColor: "rgba(0, 0, 0, 0.95)" } }}
      />
    </>
  );
}
