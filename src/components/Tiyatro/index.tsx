import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "react-i18next";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// GÖRSELLER
import t01 from "@/assets/images/tiyatro/webp/altun-tiyatro-01.webp";
import t02 from "@/assets/images/tiyatro/webp/altun-tiyatro-02.webp";
import t03 from "@/assets/images/tiyatro/webp/altun-tiyatro-03.webp";
import t04 from "@/assets/images/tiyatro/webp/altun-tiyatro-04.webp";
import t05 from "@/assets/images/tiyatro/webp/altun-tiyatro-05.webp";
import t06 from "@/assets/images/tiyatro/webp/altun-tiyatro-06.webp";
import t07 from "@/assets/images/tiyatro/webp/altun-tiyatro-01.webp";
import t08 from "@/assets/images/tiyatro/webp/altun-tiyatro-02.webp";

// --- ANA VERİ KAYNAĞI ---
const initialData = [
  { id: 1, img: t01, title: "Zafer Altun" },
  { id: 2, img: t02, title: "Zafer Altun" },
  { id: 3, img: t03, title: "Zafer Altun" },
  { id: 4, img: t04, title: "Zafer Altun" },
  { id: 5, img: t05, title: "Zafer Altun" },
  { id: 6, img: t06, title: "Zafer Altun" },
  { id: 7, img: t07, title: "Zafer Altun" },
  { id: 8, img: t08, title: "Zafer Altun" },
];

// Kesintisiz Marquee (Kayar Bant) efekti için veriyi kopyalayalım
// 3 set, kesintisiz döngü için idealdir.
const sliderData = [...initialData, ...initialData, ...initialData];

export default function Tiyatro() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const sliderTrackRef = useRef<HTMLDivElement>(null); // Tüm resimleri tutan container

  const slides = initialData.map((item) => ({ src: item.img, alt: item.title }));

  // Lightbox index hesaplaması
  const handleImageClick = (item: typeof initialData[0]) => {
    // initialData'daki orijinal index'i bul
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
      // Kaydırılması gereken yüzde: Toplam track genişliğinin 1/3'ü (%-33.333)
      const xTargetPercent = -(100 / (sliderData.length / totalInitialSlides));

      // Marquee (Sürekli Kaydırma) Animasyonu
      gsap.to(sliderTrackRef.current, {
        xPercent: xTargetPercent, // İlk setin bitişine kadar kaydır
        duration: 25, // Kayma hızı (Sinema.tsx'teki gibi)
        ease: "none",
        repeat: -1, // Sonsuza kadar tekrar et
        // Kaydırma bittiğinde başlangıç pozisyonuna anında geri dön
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


  // Tekil resimlerin genişliği (Örn: %20 -> 5 resim sığar, daha büyük görünür)
  const itemWidthClass = "w-[20vw] max-w-[400px] lg:h-[450px]";

  return (
    <>
      <div ref={containerRef} className="w-full h-full bg-[#0a0a0a] relative flex items-center justify-start overflow-hidden">

        {/* Arka Plan Efektleri */}
        <div className="absolute inset-0 bg-radial-gradient from-[#2a0a0a] to-black opacity-60 pointer-events-none"></div>

        {/* --- DİKEY BAŞLIK (Sabit) --- */}
        {/* Z-index 50 ile görsellerin üzerinden geçmemesi sağlanır */}
        <div className="absolute left-0 top-0 w-[150px] h-full flex items-center justify-center bg-black/50 z-50">
          <span className="text-4xl text-gold-500 font-royal-7 tracking-widest uppercase transition-colors writing-mode-vertical-rl rotate-180">
            {t('career.sectionTitle.theater')}
          </span>
        </div>

        {/* --- YATAY KAYDIRICI CONTAINER --- */}
        {/* pl-[150px] ile dikey başlığın arkasına geçmesi engellenir */}
        <div className="relative h-full w-full pl-[150px] overflow-hidden">

          {/* --- SLIDER TRACK: Tüm resimleri tek bir satırda tutar --- */}
          <div
            ref={sliderTrackRef}
            className="flex items-center h-full whitespace-nowrap will-change-transform min-w-max"
          >
            {sliderData.map((item, i) => {

              // --- FOTOĞRAF KARTLARI ---
              return (
                <div
                  key={i}
                  onClick={() => handleImageClick(item)}
                  // hover:z-30 ve lg:hover:scale-105 etkileşimi için group sınıfı kullanılır
                  className={`${itemWidthClass} flex-shrink-0 relative h-full overflow-hidden border border-white/5 bg-black cursor-pointer group
                                 shadow-xl transition-all duration-300 ease-out 
                                 hover:z-30 lg:hover:scale-105`}
                >
                  {/* Resim: Hover efekti burada uygulanır */}
                  <img
                    src={item.img}
                    alt={item.title}
                    // Başlangıç: opacity-60 ve grayscale
                    // Hover: opacity-100 ve grayscale-0 (tamamen renkli)
                    className="w-full h-full object-cover transition-all duration-500 ease-in-out opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0"
                  />

                  {/* Overlay - Başlık burada gösterilebilir */}
                  <div className="absolute inset-0 bg-black/40 flex items-end justify-center p-4">
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
