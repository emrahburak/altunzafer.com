import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "react-i18next";
import { capitalizeTR } from "@/utils/helpers";

// --- LIGHTBOX İMPORTLARI ---
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// YENİ DATA IMPORT (Merkezi Veri)
import { SINEMA_DATA } from "@/data/sinema";

// Veriyi satırlara bölüyoruz
const row1 = SINEMA_DATA.slice(0, 8);
const row2 = SINEMA_DATA.slice(8);

// Lightbox için slayt yapısı
const allSlides = SINEMA_DATA.map((item) => ({
  src: item.img,
  title: item.title
}));

export default function Sinema() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  // DOM Referansları
  const marqueeRef1 = useRef<HTMLDivElement>(null);
  const marqueeRef2 = useRef<HTMLDivElement>(null);

  // Animasyon Kontrol Referansları (YENİ EKLENDİ)
  const tween1Ref = useRef<gsap.core.Tween | null>(null);
  const tween2Ref = useRef<gsap.core.Tween | null>(null);

  // --- LIGHTBOX STATE ---
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  useGSAP(() => {
    // MARQUEE ANİMASYONU
    const duration = 60;

    if (!marqueeRef1.current || !marqueeRef2.current) {
      return;
    }

    // Üst satır: Animasyonu ref'e atıyoruz (YENİ)
    tween1Ref.current = gsap.to(marqueeRef1.current, {
      xPercent: -50,
      ease: "none",
      duration: duration,
      repeat: -1
    });

    // Alt satır: Animasyonu ref'e atıyoruz (YENİ)
    tween2Ref.current = gsap.fromTo(marqueeRef2.current,
      { xPercent: -50 },
      { xPercent: 0, ease: "none", duration: duration, repeat: -1 }
    );
  }, { scope: containerRef });

  return (
    <>
      <div ref={containerRef} className="w-full h-auto relative flex overflow-hidden">

        {/* --- A) SOL TARAF: TEXT İÇERİĞİ --- */}
        <div className="relative z-20 w-full lg:w-[40%] h-full flex flex-col justify-center px-12 md:px-16 bg-gradient-to-r from-black via-black to-transparent">
          <div className="absolute left-8 top-1/2 -translate-y-1/2 -translate-x-1/2 -rotate-90 origin-center whitespace-nowrap opacity-100 lg:opacity-100 transition-opacity">
            <span className="text-4xl text-gold-500 font-royal-7 tracking-widest uppercase transition-colors">
              {t('career.sectionTitle.cinema')}
            </span>
          </div>

          <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden xl:block opacity-20 pointer-events-none">
            <span className="writing-vertical text-9xl text-white font-royal-1 font-bold tracking-widest">
              {t('career.sectionTitle.cinemaBack')}
            </span>
          </div>

          <div className="pl-12 relative z-30">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 font-royal-7 leading-tight ">
              {t('career.sectionTitle.cinema').split(" ").map(capitalizeTR).join(" ")}
            </h2>
            <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed font-fluid-2 max-w-md">
              {t('career.intro.sinema')}
            </p>
          </div>
        </div>

        {/* --- B) SAĞ TARAF: GÖRSEL ŞERİDİ --- */}
        <div
          className="absolute top-0 right-0 h-full w-full lg:w-[80%] flex flex-col justify-center gap-6 opacity-60 hover:opacity-100 transition-opacity duration-700"
          style={{ maskImage: "linear-gradient(to right, transparent, black 15%)", WebkitMaskImage: "linear-gradient(to right, transparent, black 15%)" }}
        >

          {/* Şerit 1 */}
          <div
            className="w-full overflow-hidden whitespace-nowrap"
            // HOVER KONTROLÜ (YENİ): Sadece bu satırı durdur/başlat
            onMouseEnter={() => tween1Ref.current?.pause()}
            onMouseLeave={() => tween1Ref.current?.play()}
          >
            <div ref={marqueeRef1} className="inline-flex gap-4 w-max">
              {[...row1, ...row1].map((item, i) => (
                <div
                  key={`r1-${i}`}
                  className="relative group w-[220px] h-[300px] md:w-[280px] md:h-[380px] shrink-0 rounded-sm overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-500 hover:scale-105 cursor-pointer bg-[#111]"
                  onClick={() => {
                    setIndex(i % row1.length);
                    setOpen(true);
                  }}
                >
                  <img src={item.img} className="w-full h-full object-cover" alt={item.title} />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent flex items-end justify-center px-4 pb-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-xs font-semibold uppercase tracking-wider text-center opacity-90 w-full whitespace-normal break-words leading-tight">
                      {item.title.replace(/\//g, ' / ')}
                    </span>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Şerit 2 */}
          <div
            className="w-full overflow-hidden whitespace-nowrap"
            // HOVER KONTROLÜ (YENİ): Sadece bu satırı durdur/başlat
            onMouseEnter={() => tween2Ref.current?.pause()}
            onMouseLeave={() => tween2Ref.current?.play()}
          >
            <div ref={marqueeRef2} className="inline-flex gap-4 w-max">
              {[...row2, ...row2].map((item, i) => (
                <div
                  key={`r2-${i}`}
                  className="relative group w-[220px] h-[300px] md:w-[280px] md:h-[380px] shrink-0 rounded-sm overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-500 hover:scale-105 cursor-pointer bg-[#111]"
                  onClick={() => {
                    setIndex(row1.length + (i % row2.length));
                    setOpen(true);
                  }}
                >
                  <img src={item.img} className="w-full h-full object-cover" alt={item.title} />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent flex items-end justify-center px-4 pb-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-xs md:text-sm font-bold uppercase tracking-widest text-center w-full whitespace-normal break-words leading-tight translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      {item.title.replace(/\//g, ' / ')}
                    </span>
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={allSlides}
        styles={{ container: { backgroundColor: "rgba(0, 0, 0, .9)" } }}
      />
    </>
  );
}
