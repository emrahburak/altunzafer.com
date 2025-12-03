import { useRef, useState, useMemo } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "react-i18next"; // i18n eklendi

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// --- EĞİTİM & YAPIM GÖRSELLERİ İMPORT (p01 - p16) ---
import p01 from "@/assets/images/egitim/webp/altun-egitim-01.webp";
import p02 from "@/assets/images/egitim/webp/altun-egitim-02.webp";
import p03 from "@/assets/images/egitim/webp/altun-egitim-03.webp";
import p04 from "@/assets/images/egitim/webp/altun-egitim-04.webp";
import p05 from "@/assets/images/egitim/webp/altun-egitim-05.webp";
import p06 from "@/assets/images/egitim/webp/altun-egitim-06.webp";
import p07 from "@/assets/images/egitim/webp/altun-egitim-07.webp";
import p08 from "@/assets/images/egitim/webp/altun-egitim-08.webp";
import p09 from "@/assets/images/egitim/webp/altun-egitim-09.webp";
import p10 from "@/assets/images/egitim/webp/altun-egitim-10.webp";
import p11 from "@/assets/images/egitim/webp/altun-egitim-11.webp";
import p12 from "@/assets/images/egitim/webp/altun-egitim-12.webp";
import p13 from "@/assets/images/egitim/webp/altun-egitim-13.webp";
import p14 from "@/assets/images/egitim/webp/altun-egitim-14.webp";
import p15 from "@/assets/images/egitim/webp/altun-egitim-15.webp";
import p16 from "@/assets/images/egitim/webp/altun-egitim-16.webp";

// Görsel değişkenlerini kolay erişim için bir diziye topluyoruz
const allImages = [p01, p02, p03, p04, p05, p06, p07, p08, p09, p10, p11, p12, p13, p14, p15, p16];

// --- VERİ HAVUZU (Sadece başlıklar için) ---
const rawData = [
  { id: 1, img: allImages[0], title: "Kamera Önü Eğitimi" },
  { id: 2, img: allImages[1], title: "Time Right Production" },
  { id: 3, img: allImages[2], title: "Diksiyon Atölyesi" },
  { id: 4, img: allImages[3], title: "İsviçre Reklam Çekimi" },
  { id: 5, img: allImages[4], title: "Hollanda Belgesel" },
  { id: 6, img: allImages[5], title: "Audition Teknikleri" },
  { id: 7, img: allImages[6], title: "Set Arkası" },
  { id: 8, img: allImages[7], title: "Yapım Toplantısı" },
  { id: 9, img: allImages[8], title: "Öğrenci Çalışmaları" },
  { id: 10, img: allImages[9], title: "Reji Masası" },
  { id: 11, img: allImages[10], title: "Cast Seçimi" },
  { id: 12, img: allImages[11], title: "Senaryo Analizi" },
  { id: 13, img: allImages[12], title: "Atölye Pratiği" },
  { id: 14, img: allImages[13], title: "Global Ortaklık" },
  { id: 15, img: allImages[14], title: "Montaj Süreci" },
  { id: 16, img: allImages[15], title: "Final Kurgu" },
];

export default function Production() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  // --- SÜTUNLARA DAĞITMA (2 Sütun) ---
  const columns = useMemo(() => {
    const cols = [[], []] as typeof rawData[];
    rawData.forEach((item, i) => {
      cols[i % 2].push(item);
    });
    return cols;
  }, []);

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
        className="w-full h-full bg-[#0a0a0a] relative flex items-center justify-center"
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
           w-full h-full lg:w-[90vw] lg:h-[100vh] 
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
                  {[...colItems, ...colItems].map((item, i) => (
                    <div
                      key={`${colIndex}-${i}`}
                      onClick={() => handleImageClick(item.img)}
                      className="group relative w-full aspect-[3/4] rounded-sm overflow-hidden border border-white/5 bg-white/5 cursor-pointer flex-shrink-0"
                    >
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover opacity-60 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105"
                      />

                      <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black via-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <span className="text-gold-500 text-[10px] uppercase tracking-widest block mb-1">
                          {t('career.production.itemRole')}
                        </span>
                        <h3 className="text-white font-royal-1 text-sm">{item.title}</h3>
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
