import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

// Modüler Bileşeni Çağırıyoruz
import Sinema from "../Sinema";
import Tiyatro from "../Tiyatro";
import Production from "../Production";


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
        className="absolute top-0 bottom-0 z-30 w-[90vw] h-full bg-dark-bg shadow-[-50px_0_100px_rgba(0,0,0,0.9)] border-l border-gold-500/20"
        style={{ left: "0", transform: "translateX(90vw)" }}
      >
        <Production />
      </div>

    </section>
  );
}
