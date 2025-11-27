import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import heroImage from "@/assets/images/webp/altun-01.webp"; 

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const container = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    // Kelimeleri seç
    const words = gsap.utils.toArray(".changing-text");
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "+=2500", // Scroll mesafesi (ne kadar uzun süreceği)
        pin: true,     // Ekranı kilitle
        scrub: 1,      // Scroll ile senkronize et
        // markers: true // Geliştirme bitince silersin
      }
    });

    // --- ANİMASYON SENARYOSU ---
    // Her bir kelime için döngü
    words.forEach((word, i) => {
      // İlk kelime zaten görünür, onu es geçme mantığı farklı işleyebilir
      // ama temiz bir döngü için hepsini gizli başlatıp timeline'a ekleyelim.
      
      // 1. Kelime Gelir
      tl.to(word, { 
        y: 0, 
        opacity: 1, 
        filter: "blur(0px)",
        duration: 1, 
        ease: "power2.out" 
      });

      // Son kelime değilse gitsin
      if (i < words.length - 1) {
        tl.to(word, { 
          y: -50, 
          opacity: 0, 
          filter: "blur(10px)", 
          duration: 1, 
          ease: "power2.in" 
        }, "+=0.5"); // Okunması için biraz bekle
      }
    });

    // Sağdaki resme hafif bir zoom efekti verelim scroll boyunca (Canlı hissettirir)
    tl.to(".hero-img-scale", {
        scale: 1.1,
        duration: tl.duration(), // Tüm timeline boyunca sürsün
        ease: "none"
    }, 0);

  }, { scope: container });

  return (
    <section ref={container} className="relative flex h-screen w-full overflow-hidden bg-[#0a0a0a] text-white">
      
      {/* --- SOL TARAF (TEXT) --- */}
      <div className="flex w-full flex-col justify-center px-8 md:w-1/2 md:pl-24 z-10">
        
        {/* Sabit İsim */}
        <h1 className="text-6xl font-bold leading-none tracking-tighter md:text-8xl lg:text-9xl mb-4">
          ZAFER <br />
          <span className="text-gray-600">ALTUN</span>
        </h1>

        {/* Değişen Kelimeler Alanı */}
        <div className="relative h-20 mt-2 overflow-hidden"> 
           {/* Not: Absolute ile üst üste bindiriyoruz */}
           
           <span className="changing-text absolute top-0 left-0 text-3xl font-light tracking-[0.5em] text-red-500 opacity-0 translate-y-10 blur-sm">
             OYUNCU
           </span>

           <span className="changing-text absolute top-0 left-0 text-3xl font-light tracking-[0.5em] text-blue-400 opacity-0 translate-y-10 blur-sm">
             YÖNETMEN
           </span>

           <span className="changing-text absolute top-0 left-0 text-3xl font-light tracking-[0.5em] text-white opacity-0 translate-y-10 blur-sm">
             EĞİTMEN
           </span>
        </div>

        <p className="mt-8 max-w-md text-sm text-gray-500 font-mono">
          SCROLL TO DISCOVER
        </p>
      </div>

      {/* --- SAĞ TARAF (IMAGE) --- */}
      <div className="absolute top-0 right-0 h-full w-1/2 hidden md:block">
        {/* Gradient Overlay (Soldan Sağa Kararma) - Keskin çizgi olmasın diye */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#0a0a0a] via-transparent to-transparent" />
        
        <img
          src={heroImage}
          alt="Zafer Altun"
          className="hero-img-scale h-full w-full object-cover object-top opacity-80"
        />
      </div>

      {/* MOBİL İÇİN ARKA PLAN AYARI */}
      {/* Mobilde split screen zor olduğu için resmi arkaya atıp karartıyoruz */}
      <div className="absolute inset-0 -z-10 md:hidden">
         <div className="absolute inset-0 bg-black/70 z-10" />
         <img src={heroImage} className="h-full w-full object-cover opacity-50" />
      </div>

    </section>
  );
}
