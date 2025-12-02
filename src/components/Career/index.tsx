import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// --- SİNEMA GÖRSELLERİ İMPORT (Senin dosya yapına göre) ---
import c01 from "@/assets/images/sinema/webp/altunx-01.webp";
import c04 from "@/assets/images/sinema/webp/altunx-04.webp";
import c05 from "@/assets/images/sinema/webp/altunx-05.webp";
import c10 from "@/assets/images/sinema/webp/altunx-10.webp";
import c11 from "@/assets/images/sinema/webp/altunx-11.webp";
import c16 from "@/assets/images/sinema/webp/altunx-16.webp";
import c18 from "@/assets/images/sinema/webp/altunx-18.webp";
import c19 from "@/assets/images/sinema/webp/altunx-19.webp";
import c20 from "@/assets/images/sinema/webp/altunx-20.webp";
import c21 from "@/assets/images/sinema/webp/altunx-21.webp";
import c23 from "@/assets/images/sinema/webp/altunx-23.webp";
import c24 from "@/assets/images/sinema/webp/altunx-24.webp";




gsap.registerPlugin(ScrollTrigger);

// Görselleri iki şerit için grupluyoruz
const row1 = [c01, c04, c05, c10, c11, c16];
const row2 = [c18, c19, c20, c21, c23, c24];

export default function Career() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Paneller
  const theaterRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);

  // Yazılar
  const cinemaTextRef = useRef<HTMLSpanElement>(null);
  const theaterTextRef = useRef<HTMLSpanElement>(null);
  const educationTextRef = useRef<HTMLSpanElement>(null);

  // Marquee (Kayan Şerit) Refleri
  const marqueeRef1 = useRef<HTMLDivElement>(null);
  const marqueeRef2 = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // ------------------------------------------------
    // 1. MARQUEE ANİMASYONU (Sinema Şeridi)
    // ------------------------------------------------
    // Bu animasyon scroll'dan bağımsız, sürekli akar.
    const duration = 50; // Hız ayarı (Saniye)

    // Üst satır: Sola akar
    gsap.to(marqueeRef1.current, {
      xPercent: -50, // İçerik duplicate edildiği için yarısı kadar gitmesi tam tur demektir
      ease: "none",
      duration: duration,
      repeat: -1
    });

    // Alt satır: Sağa akar (Tersi yöne)
    // Başlangıçta -50%'de durmalı ki sağa akarken boşluk oluşmasın
    gsap.fromTo(marqueeRef2.current,
      { xPercent: -50 },
      { xPercent: 0, ease: "none", duration: duration, repeat: -1 }
    );

    // ------------------------------------------------
    // 2. SCROLL & ACCORDION (Senin Temel Kodun)
    // ------------------------------------------------
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 1,
          anticipatePin: 1
        }
      });

      const colorGold = "#c5a028"; // text-gold-500

      // ADIM 1: TİYATRO SAHNEYE GİRER
      tl.to(theaterRef.current, { x: "5vw", ease: "none", duration: 1 })
        .to(theaterTextRef.current, { color: colorGold, duration: 1, ease: "none" }, "<");

      // ADIM 2: EĞİTİM SAHNEYE GİRER
      tl.to(educationRef.current, { x: "10vw", ease: "none", duration: 1 })
        .to(educationTextRef.current, { color: colorGold, duration: 1, ease: "none" }, "<");

    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black">

      {/* ------------------------------------------------------
          1. KATMAN: SİNEMA / TV (Taban Katman)
      ------------------------------------------------------- */}
      <div className="absolute inset-0 z-10 w-full h-full flex">
        <div className="w-full h-full relative flex overflow-hidden">

          {/* --- A) SOL TARAF: TEXT İÇERİĞİ (%40) --- */}
          <div className="relative z-20 w-full lg:w-[40%] h-full flex flex-col justify-center px-12 md:px-16 bg-gradient-to-r from-black via-black to-transparent">
            {/* Background Overlay (Görsellerin altına siyahlık atıyoruz ki yazı okunsun) */}

            {/* Sol Kenar Dikey Başlık (Mobil/Desktop) */}
            <div className="absolute left-8 top-1/2 -translate-y-1/2 -translate-x-1/2 -rotate-90 origin-center whitespace-nowrap opacity-100 lg:opacity-100 transition-opacity">
              <span ref={cinemaTextRef} className="text-4xl text-gold-500 font-royal-7 tracking-widest uppercase transition-colors">
                Sinema
              </span>
            </div>

            {/* İçerik Başlığı - Sağda Dekoratif */}
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
          {/* mask-image ile sol tarafı yumuşatıyoruz */}
          <div className="absolute top-0 right-0 h-full w-full lg:w-[70%] flex flex-col justify-center gap-6 opacity-60 hover:opacity-100 transition-opacity duration-700"
            style={{ maskImage: "linear-gradient(to right, transparent, black 15%)", WebkitMaskImage: "linear-gradient(to right, transparent, black 15%)" }}>

            {/* Şerit 1 (Sola Akar) */}
            <div className="w-full overflow-hidden whitespace-nowrap">
              <div ref={marqueeRef1} className="inline-flex gap-4 w-max">
                {/* Sonsuz döngü için diziyi 2 kere render ediyoruz */}
                {[...row1, ...row1].map((src, i) => (
                  <div key={i} className="w-[220px] h-[300px] md:w-[280px] md:h-[380px] flex-shrink-0 rounded-sm overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-500 hover:scale-105 cursor-pointer bg-[#111]">
                    <img src={src} className="w-full h-full object-cover" alt={`Cinema Project ${i}`} />
                  </div>
                ))}
              </div>
            </div>

            {/* Şerit 2 (Sağa Akar) */}
            <div className="w-full overflow-hidden whitespace-nowrap">
              <div ref={marqueeRef2} className="inline-flex gap-4 w-max">
                {[...row2, ...row2].map((src, i) => (
                  <div key={i} className="w-[220px] h-[300px] md:w-[280px] md:h-[380px] flex-shrink-0 rounded-sm overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-500 hover:scale-105 cursor-pointer bg-[#111]">
                    <img src={src} className="w-full h-full object-cover" alt={`Cinema Project ${i}`} />
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>


      {/* ------------------------------------------------------
          2. KATMAN: TİYATRO (İçerik Şimdilik Boş)
      ------------------------------------------------------- */}
      <div
        ref={theaterRef}
        className="absolute top-0 bottom-0 z-20 w-[90vw] h-full bg-[#111] shadow-[-50px_0_100px_rgba(0,0,0,0.8)] border-l border-white/10"
        style={{ left: "0", transform: "translateX(80vw)" }}
      >
        <div className="relative w-full h-full overflow-hidden">
          <div className="absolute inset-0 bg-red-900/20 z-10 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-black/70 z-10"></div>
          <div className="relative z-30 h-full flex flex-col justify-center px-16 md:px-32 max-w-5xl">

            <div className="absolute left-8 top-1/2 -translate-y-1/2 -translate-x-1/2 -rotate-90 origin-center whitespace-nowrap opacity-100 lg:opacity-100 transition-opacity">
              <span ref={theaterTextRef} className="text-4xl text-gray-700 font-royal-7 tracking-widest uppercase transition-colors">
                Sahne
              </span>
            </div>

            <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden xl:block opacity-20">
              <span className="writing-vertical text-9xl text-white font-royal-1 font-bold tracking-widest">TİYATRO</span>
            </div>

          </div>
        </div>
      </div>


      {/* ------------------------------------------------------
          3. KATMAN: EĞİTİM & YAPIM (İçerik Şimdilik Boş)
      ------------------------------------------------------- */}
      <div
        ref={educationRef}
        className="absolute top-0 bottom-0 z-30 w-[90vw] h-full bg-[#0a0a0a] shadow-[-50px_0_100px_rgba(0,0,0,0.9)] border-l border-gold-500/20"
        style={{ left: "0", transform: "translateX(90vw)" }}
      >
        <div className="relative w-full h-full overflow-hidden">
          <div className="absolute inset-0 bg-gold-600/10 z-10"></div>
          <div className="absolute inset-0 bg-black/80 z-10"></div>
          <div className="relative z-30 h-full flex flex-col justify-center px-16 md:px-32 max-w-5xl">

            <div className="absolute left-8 top-1/2 -translate-y-1/2 -translate-x-1/2 -rotate-90 origin-center whitespace-nowrap">
              <span ref={educationTextRef} className="text-4xl text-gray-700 font-royal-7 tracking-widest uppercase transition-colors">
                Eğitmenlik & Yapım
              </span>
            </div>

            <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden xl:block opacity-20">
              <span className="writing-vertical text-9xl text-white font-royal-1 font-bold tracking-widest">PRODUKSİYON</span>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}
