import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "react-i18next";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// YENİ DATA IMPORT
import { TIYATRO_DATA } from "@/data/tiyatro";

// --- VERİ HAZIRLIĞI ---
const initialData = TIYATRO_DATA;

// Kesintisiz Marquee (Kayar Bant) efekti için veriyi 3 kez kopyalıyoruz
const sliderData = [...initialData, ...initialData, ...initialData];

export default function Tiyatro() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const sliderTrackRef = useRef<HTMLDivElement>(null);

  const slides = initialData.map((item) => ({ src: item.img, alt: item.title }));

  const handleImageClick = (item: typeof initialData[0]) => {
    const originalIndex = initialData.findIndex(d => d.id === item.id);
    if (originalIndex !== -1) {
      setIndex(originalIndex);
      setOpen(true);
    }
  };

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {

      const totalInitialSlides = initialData.length;
      const xTargetPercent = -(100 / (sliderData.length / totalInitialSlides));

      // Marquee Animasyonu
      gsap.to(sliderTrackRef.current, {
        xPercent: xTargetPercent,
        duration: 25,
        ease: "none",
        repeat: -1,
        modifiers: {
          xPercent: gsap.utils.wrap(xTargetPercent, 0)
        }
      });

      // Başlangıç Animasyonu
      gsap.from(sliderTrackRef.current, {
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: "power2.out",
        delay: 0.5
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });


  const itemWidthClass = "w-[20vw] max-w-[400px] lg:h-[450px]";

  return (
    <>
      <div ref={containerRef} className="w-full h-full bg-[#0a0a0a] relative flex items-center justify-start overflow-hidden">

        {/* Arka Plan Efektleri */}
        <div className="absolute inset-0 bg-radial-gradient from-[#2a0a0a] to-black opacity-60 pointer-events-none"></div>

        {/* --- DİKEY BAŞLIK (Sabit) --- */}
        <div className="absolute left-0 top-0 w-[150px] h-full flex items-center justify-center bg-black/50 z-50">
          <span className="text-4xl text-gold-500 font-royal-7 tracking-widest uppercase transition-colors writing-mode-vertical-rl rotate-180">
            {/* DÜZELTİLDİ: Orijinal key kullanıldı */}
            {t('career.sectionTitle.theater')}
          </span>
        </div>

        {/* --- YATAY KAYDIRICI CONTAINER --- */}
        <div className="relative h-full w-full pl-[150px] overflow-hidden">

          {/* --- SLIDER TRACK --- */}
          <div
            ref={sliderTrackRef}
            className="flex items-center h-full whitespace-nowrap will-change-transform min-w-max"
          >
            {sliderData.map((item, i) => {

              return (
                <div
                  key={i}
                  onClick={() => handleImageClick(item)}
                  className={`${itemWidthClass} flex-shrink-0 relative h-full overflow-hidden border border-white/5 bg-black cursor-pointer group shadow-xl transition-all duration-300 ease-out hover:z-30 lg:hover:scale-105`}
                >
                  {/* Resim */}
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transition-all duration-500 ease-in-out opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 flex items-end justify-center p-4">
                    <span className="text-white text-xs font-royal-1 text-center opacity-70 group-hover:opacity-100 transition-opacity">
                      {item.title}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
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
