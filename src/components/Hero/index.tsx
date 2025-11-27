import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

// Dönüştürdüğün resimlerden birini seç (Örn: en karizmatik olanı)
import heroImage from "@/assets/images/webp/altun-05.webp";

export default function Hero() {
  const container = useRef(null);

  // Basit Giriş Animasyonu (Yazılar soldan, Resim sağdan gelir)
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(".hero-text", {
      x: -50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out"
    })
      .from(".hero-image", {
        x: 50,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out"
      }, "-=0.8"); // Yazılar bitmeden resim başlasın

  }, { scope: container });

  return (
    <section
      ref={container}
      className="relative flex h-screen w-full flex-col overflow-hidden bg-[#0a0a0a] md:flex-row"
    >

      {/* --- SOL TARAFTAKİ İÇERİK (TEXT) --- */}
      {/* Mobilde altta kalmasın diye order değişimi yapılabilir ama genelde resim üstte istenir */}
      <div className="flex h-full w-full flex-col justify-center px-6 pt-20 md:w-1/2 md:px-16 md:pt-0 z-10">
        <h2 className="hero-text mb-2 text-sm font-light tracking-[0.4em] text-gray-400">
          PROFESYONEL OYUNCU
        </h2>
        <h1 className="hero-text text-5xl font-bold leading-tight text-white md:text-7xl lg:text-8xl">
          ZAFER <br />
          <span className="text-gray-500">ALTUN</span>
        </h1>
        <p className="hero-text mt-6 max-w-md text-gray-400 font-light leading-relaxed">
          Sinema, televizyon ve tiyatro projelerinde güçlü karakter oyunculuğu.
        </p>
      </div>

      {/* --- SAĞ TARAFTAKİ GÖRSEL (IMAGE) --- */}
      <div className="absolute top-0 right-0 h-full w-full md:relative md:w-1/2">
        {/* Siyah Geçiş (Gradient Overlay) - Resmin solunu yumuşatır */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent md:bg-gradient-to-r md:from-[#0a0a0a] md:via-transparent" />

        <img
          src={heroImage}
          alt="Zafer Altun Portre"
          className="hero-image h-full w-full object-cover object-top opacity-60 md:opacity-100 grayscale hover:grayscale-0 transition-all duration-700"
        />
      </div>

    </section>
  );
}
