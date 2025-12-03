import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Modüler Bileşeni Çağırıyoruz
import Sinema from "../Sinema";
import Tiyatro from "../Tiyatro";

gsap.registerPlugin(ScrollTrigger);

export default function Career() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Paneller
  const theaterRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);

  // Yazılar (Sadece renk değiştireceklerimiz kaldı)
  const theaterTextRef = useRef<HTMLSpanElement>(null);
  const educationTextRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    // ------------------------------------------------
    // SCROLL & ACCORDION (Layout Mantığı)
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
          1. KATMAN: SİNEMA / TV (Sinema Bileşeni)
      ------------------------------------------------------- */}
      <div className="absolute inset-0 z-10 w-full h-full flex">
        {/* İçerik Artık Sinema.tsx içinde */}
        <Sinema />
      </div>

      {/* ------------------------------------------------------
          2. KATMAN: TİYATRO
      ------------------------------------------------------- */}
      <div
        ref={theaterRef}
        className="absolute top-0 bottom-0 z-20 w-[90vw] h-full bg-[#111] shadow-[-50px_0_100px_rgba(0,0,0,0.8)] border-l border-white/10"
        style={{ left: "0", transform: "translateX(80vw)" }}
      >
        <Tiyatro />

      </div>

      {/* ------------------------------------------------------
          3. KATMAN: EĞİTİM & YAPIM
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
