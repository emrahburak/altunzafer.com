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

  // Yazılar (Eğer renk değişimi yapacaksan referanslar kalabilir)
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
          end: "+=300%", // Scroll mesafesi
          pin: true,
          scrub: 1,
          anticipatePin: 1
        }
      });

      const colorGold = "#c5a028";

      // --- MATEMATİKSEL HESAP (150px ≈ 8vw kabul edersek) ---

      // ADIM 1: TİYATRO SAHNEYE GİRER
      // HEDEF: x: "8vw". 
      // NEDEN? Sol tarafta Sinema'nın başlığı için 8vw (yaklaşık 150px) boşluk bırakır.
      tl.to(theaterRef.current, { x: "6vw", ease: "none", duration: 1 })
        .to(theaterTextRef.current, { color: colorGold, duration: 1, ease: "none" }, "<");

      // ADIM 2: EĞİTİM (PRODUCTION) SAHNEYE GİRER
      // HEDEF: x: "16vw". 
      // NEDEN? 8vw (Sinema payı) + 8vw (Tiyatro payı) = 16vw.
      // Böylece Tiyatro'nun başlığı da kapanmaz.
      tl.to(educationRef.current, { x: "13vw", ease: "none", duration: 1 })
        .to(educationTextRef.current, { color: colorGold, duration: 1, ease: "none" }, "<");

    });

  }, { scope: containerRef });

  return (
    <>
      <div ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black">

        {/* ------------------------------------------------------
          1. KATMAN: SİNEMA / TV (En Altta)
        ------------------------------------------------------- */}
        <div className="absolute inset-0 z-10 w-full h-full flex">
          <Sinema />
        </div>

        {/* ------------------------------------------------------
          2. KATMAN: TİYATRO (Ortaya Gelir)
        ------------------------------------------------------- */}
        <div
          ref={theaterRef}
          // w-[100vw] yapıldı ki sağ tarafta boşluk kalmasın
          className="absolute top-0 bottom-0 z-20 w-[100vw] h-full bg-[#111] shadow-[-50px_0_100px_rgba(0,0,0,0.8)] border-l border-white/10"
          // Başlangıçta ekranın sağında (100vw) bekliyor
          style={{ left: "0", transform: "translateX(100vw)" }}
        >
          {/* İçerik */}
          <Tiyatro />
        </div>

        {/* ------------------------------------------------------
          3. KATMAN: EĞİTİM & YAPIM (En Üste Gelir)
        ------------------------------------------------------- */}
        <div
          ref={educationRef}
          className="absolute top-0 bottom-0 z-30 w-[100vw] h-full bg-dark-bg shadow-[-50px_0_100px_rgba(0,0,0,0.9)] border-l border-gold-500/20"
          // Başlangıçta ekranın sağında (100vw) bekliyor
          style={{ left: "0", transform: "translateX(100vw)" }}
        >
          {/* İçerik */}
          <Production />
        </div>

      </div>
    </>
  );
}
