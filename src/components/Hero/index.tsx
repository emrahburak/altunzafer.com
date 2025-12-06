import React, { useRef } from "react";
import heroImage1 from "@/assets/images/hero/webp/altun-hero-01.webp"; // Alttaki (Base)
import heroImage2 from "@/assets/images/hero/webp/altun-hero-02.webp"; // Üste gelen
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero(): React.JSX.Element {
  const { t } = useTranslation();

  const wrapperRef = useRef<HTMLDivElement>(null);
  const image2Ref = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);

  // --- SPLIT TEXT ---
  const splitChars = (text: string) => {
    return text.split("").map((char, index) => (
      <span key={index} className="char inline-block relative">
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };
  const splitWords = (text: string) => {
    return text.split(" ").map((word, index) => (
      <span key={index} className="word inline-block mr-[0.3em] relative">
        {word}
      </span>
    ));
  };

  useGSAP(() => {
    if (!wrapperRef.current) return;

    const chars = gsap.utils.toArray(".char");
    const words = gsap.utils.toArray(".word");

    // --- 1. GİRİŞ (INTRO) ---
    const introTl = gsap.timeline();

    introTl.from(chars, {
      y: 100, opacity: 0, rotateX: -90, stagger: 0.05, duration: 1.2, ease: "power4.out",
    })
      .from(subtitleRef.current, {
        opacity: 0, x: -30, duration: 1, ease: "power2.out"
      }, "-=0.8")
      .from(words, {
        y: 40, opacity: 0, duration: 0.8, stagger: 0.03, ease: "power3.out"
      }, "-=0.6");

    // --- 2. SCROLL & PIN ---
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: "+=1500", // Mesafe
        pin: true,
        scrub: 1, // Smoothness
        pinSpacing: true,
        invalidateOnRefresh: true,
      }
    });

    // A) Metin Animasyonları
    scrollTl.to(chars, {
      color: "#eab308", stagger: 0.1, ease: "none",
    });

    // B) Subtitle Genişleme
    scrollTl.to(subtitleRef.current, {
      letterSpacing: "0.5em", color: "#ffffff", opacity: 1, ease: "none"
    }, "<");

    // C) IMAGE 2 - AWARDS TARZI GİRİŞ
    scrollTl.fromTo(image2Ref.current,
      { opacity: 0, scale: 0.8, rotation: -10, y: 50 },
      { opacity: 1, scale: 1, rotation: 6, y: 0, ease: "power2.out" },
      "<"
    );

  }, { scope: wrapperRef });

  const heroTitleName = "ZAFER";
  const heroTitleSurname = "ALTUN";
  const descText = t('hero.description', 'Sahne, ekran ve eğitimde uluslararası bir kariyer.');

  return (
    <div ref={wrapperRef} className="relative w-full h-screen bg-dark-bg overflow-hidden">

      {/* LAYOUT AYARLARI:
         - flex-col: Mobilde alt alta
         - md:flex-row: Masaüstünde yan yana
         - gap-12: Mobilde metin ve resim arası boşluk
         - md:gap-0: Masaüstünde boşluk sıfır (flex düzeni hallediyor)
      */}
      <div className="w-full h-full flex flex-col md:flex-row items-center relative z-10 container mx-auto px-6 gap-12 md:gap-0">

        {/* SOL: Metin Alanı */}
        {/* DÜZELTME NOTLARI:
            1. Parent'tan 'text-center' gibi sınıfları kaldırdım, kafa karıştırmasın.
            2. 'items-center': Flex elemanlarını (kutuları) ortalar.
            3. 'md:items-start': Masaüstünde kutuları sola yaslar.
        */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center  h-full pt-24 md:pt-0 z-20">

          <h2
            ref={subtitleRef}
            // DÜZELTME:
            // - w-full KALDIRILDI: Flexbox (items-center) kutuyu içeriği kadar daraltıp ortalasın.
            // - text-center md:text-left: Metin hizalaması mobilde orta, masaüstünde sol.
            // - indent-[0.3em]: Tracking yüzünden sağda kalan boşluğu dengelemek için soldan ittik (Optik Ortalama).
            className="text-center w-full mb-4 font-light tracking-[0.3em] indent-[0.3em] text-gray-400 font-geometric transition-all will-change-[letter-spacing]"
          >
            {t('hero.subtitle', 'OYUNCU, YÖNETMEN & EĞİTMEN')}
          </h2>

          {/* H1 BAŞLIK */}
          {/* text-center md:text-left ekledik */}
          <h1 className="text-center md:text-left text-6xl sm:text-7xl md:text-[7rem] lg:text-[8rem] font-bold leading-[0.9] text-white font-royal-7 whitespace-nowrap">
            <div className="overflow-hidden py-1 md:py-2">{splitChars(heroTitleName)}</div>
            <div className="overflow-hidden py-1 md:py-2 text-gray-600">{splitChars(heroTitleSurname)}</div>
          </h1>

          {/* AÇIKLAMA METNİ */}
          {/* justify-center (Mobil) -> justify-start (Desktop) */}
          <div className="hero-desc mt-6 md:mt-8 max-w-xs md:max-w-md text-gray-400 font-light leading-relaxed font-fluid-2 flex flex-wrap justify-center md:justify-start text-sm md:text-base text-center md:text-left">
            {splitWords(descText)}
          </div>
        </div>

        {/* SAĞ: Fotoğraf Alanı */}
        <div className="w-full md:w-1/2 h-full flex items-start md:items-center justify-center relative pointer-events-none">

          {/* FOTOĞRAF KAPSAYICI */}
          {/* Mobilde genişlik %70, yükseklik %45vh (biraz küçülttük ki sığsın) */}
          <div className="relative w-[70vw] h-[45vh] md:w-[28vw] md:h-[65vh]">

            {/* RESİM 1 (Base) */}
            <div className="absolute inset-0 z-10 transform -rotate-3 border-[8px] md:border-[10px] border-white/10 shadow-2xl bg-black">
              <img
                src={heroImage1}
                alt="Zafer Altun Portrait 1"
                className="w-full h-full object-cover opacity-80"
              />
            </div>

            {/* RESİM 2 (Overlay) */}
            <div
              ref={image2Ref}
              className="absolute inset-0 z-20 border-[8px] md:border-[10px] border-white shadow-2xl bg-black origin-bottom-right"
            >
              <img
                src={heroImage2}
                alt="Zafer Altun Portrait 2"
                className="w-full h-full object-cover"
              />
            </div>

          </div>

        </div>

      </div>

      {/* Arka Plan Efekti */}
      <div className="absolute top-0 right-0 w-full md:w-2/3 h-full bg-gradient-to-b md:bg-gradient-to-l from-gray-900/30 to-transparent pointer-events-none -z-0" />

    </div>
  );
}
