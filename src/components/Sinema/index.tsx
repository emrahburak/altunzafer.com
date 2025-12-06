import { useRef, useState } from "react"; // useState eklendi
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

// --- LIGHTBOX İMPORTLARI ---
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// --- SİNEMA GÖRSELLERİ (c01 - c17) ---
import c01 from "@/assets/images/sinema/webp/altun-sinema-01.webp";
import c02 from "@/assets/images/sinema/webp/altun-sinema-02.webp";
import c03 from "@/assets/images/sinema/webp/altun-sinema-03.webp";
import c04 from "@/assets/images/sinema/webp/altun-sinema-04.webp";
import c05 from "@/assets/images/sinema/webp/altun-sinema-05.webp";
import c06 from "@/assets/images/sinema/webp/altun-sinema-06.webp";
import c07 from "@/assets/images/sinema/webp/altun-sinema-07.webp";
import c08 from "@/assets/images/sinema/webp/altun-sinema-08.webp";
import c09 from "@/assets/images/sinema/webp/altun-sinema-09.webp";
import c10 from "@/assets/images/sinema/webp/altun-sinema-10.webp";
import c11 from "@/assets/images/sinema/webp/altun-sinema-11.webp";
import c12 from "@/assets/images/sinema/webp/altun-sinema-12.webp";
import c13 from "@/assets/images/sinema/webp/altun-sinema-13.webp";
import c14 from "@/assets/images/sinema/webp/altun-sinema-14.webp";
import c15 from "@/assets/images/sinema/webp/altun-sinema-15.webp";
import c16 from "@/assets/images/sinema/webp/altun-sinema-16.webp";
import c17 from "@/assets/images/sinema/webp/altun-sinema-17.webp";

// Görselleri grupluyoruz
const row1 = [c01, c02, c03, c04, c05, c06, c07, c08];
const row2 = [c09, c10, c11, c12, c13, c14, c15, c16, c17];

// Lightbox için tüm slaytları tek bir dizide topluyoruz
const allSlides = [...row1, ...row2].map((src) => ({ src }));

export default function Sinema() {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef1 = useRef<HTMLDivElement>(null);
  const marqueeRef2 = useRef<HTMLDivElement>(null);

  // --- LIGHTBOX STATE ---
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  useGSAP(() => {
    // MARQUEE ANİMASYONU (Bağımsız, sürekli akar)
    const duration = 60;

    // Üst satır: Sola
    gsap.to(marqueeRef1.current, {
      xPercent: -50,
      ease: "none",
      duration: duration,
      repeat: -1
    });

    // Alt satır: Sağa
    gsap.fromTo(marqueeRef2.current,
      { xPercent: -50 },
      { xPercent: 0, ease: "none", duration: duration, repeat: -1 }
    );
  }, { scope: containerRef });

  return (
    <>
      <div ref={containerRef} className="w-full h-auto relative flex overflow-hidden">

        {/* --- A) SOL TARAF: TEXT İÇERİĞİ (%40) --- */}
        <div className="relative z-20 w-full lg:w-[40%] h-full flex flex-col justify-center px-12 md:px-16 bg-linear-to-r from-black via-black to-transparent">

          {/* Sol Kenar Dikey Başlık */}
          <div className="absolute left-8 top-1/2 -translate-y-1/2 -translate-x-1/2 -rotate-90 origin-center whitespace-nowrap opacity-100 lg:opacity-100 transition-opacity">
            <span className="text-4xl text-gold-500 font-royal-7 tracking-widest uppercase transition-colors">
              Sinema
            </span>
          </div>

          {/* Dekoratif Arkaplan Yazısı */}
          <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden xl:block opacity-20 pointer-events-none">
            <span className="writing-vertical text-9xl text-white font-royal-1 font-bold tracking-widest">SİNEMA</span>
          </div>

          {/* Ana Metin Alanı */}
          <div className="pl-12 relative z-30">
            <span className="text-gold-400 font-geometric tracking-[0.3em] text-xs md:text-sm mb-4 block">
              CAREER PATH 01
            </span>
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 font-royal-7 leading-tight">
              Sinema & TV
            </h2>
            <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed font-fluid-2 max-w-md">
              Kamera önündeki 20 yıllık serüven. Uluslararası festivallerden ödüllerle dönen uzun metraj filmler,
              Türkiye'nin en çok izlenen TV dizileri ve dijital platform projeleri.
            </p>
          </div>
        </div>

        {/* --- B) SAĞ TARAF: GÖRSEL ŞERİDİ (MARQUEE) --- */}
        <div
          className="absolute top-0 right-0 h-full w-full lg:w-[70%] flex flex-col justify-center gap-6 opacity-60 hover:opacity-100 transition-opacity duration-700"
          style={{ maskImage: "linear-gradient(to right, transparent, black 15%)", WebkitMaskImage: "linear-gradient(to right, transparent, black 15%)" }}
        >

          {/* Şerit 1 (Sola Akar) */}
          <div className="w-full overflow-hidden whitespace-nowrap">
            <div ref={marqueeRef1} className="inline-flex gap-4 w-max">
              {[...row1, ...row1].map((src, i) => (
                <div
                  key={i}
                  className="w-[220px] h-[300px] md:w-[280px] md:h-[380px] shrink-0 rounded-sm overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-500 hover:scale-105 cursor-pointer bg-[#111]"
                  onClick={() => {
                    // row1 içindeki gerçek indeksi buluyoruz (kopyalar için modülo alarak)
                    setIndex(i % row1.length);
                    setOpen(true);
                  }}
                >
                  <img src={src} className="w-full h-full object-cover" alt={`Cinema Project ${i}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Şerit 2 (Sağa Akar) */}
          <div className="w-full overflow-hidden whitespace-nowrap">
            <div ref={marqueeRef2} className="inline-flex gap-4 w-max">
              {[...row2, ...row2].map((src, i) => (
                <div
                  key={i}
                  className="w-[220px] h-[300px] md:w-[280px] md:h-[380px] shrink-0 rounded-sm overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-500 hover:scale-105 cursor-pointer bg-[#111]"
                  onClick={() => {
                    // row2, row1'den sonra başladığı için index'i kaydırıyoruz (offset)
                    setIndex(row1.length + (i % row2.length));
                    setOpen(true);
                  }}
                >

                  <img src={src} className="w-full h-full object-cover" alt={`Cinema Project ${i}`} />
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* --- LIGHTBOX COMPONENT --- */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={allSlides}
        // İsterseniz controlleri özelleştirebilirsiniz, varsayılan hali gayet şıktır.
        styles={{ container: { backgroundColor: "rgba(0, 0, 0, .9)" } }}
      />
    </>
  );
}
