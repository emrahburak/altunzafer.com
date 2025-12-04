import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
// 1. Çeviri kancasını ekle
import { useTranslation } from "react-i18next";

// GÖRSELLER (Sıralama: 12 -> 13 -> 15)
import baseImage from "@/assets/images/biyografy/webp/altun-bio-01.webp";
import middleImage from "@/assets/images/biyografy/webp/altun-bio-02.webp";
import topImage from "@/assets/images/biyografy/webp/altun-bio-03.webp";


// Beceri anahtarlarını tanımlıyoruz (Çeviri dosyasındaki key'lerle eşleşecek)
const skillKeys = ["percussion", "horse", "sword", "driving"];

export default function Biography() {
  // 2. Çeviri fonksiyonunu başlat
  const { t } = useTranslation();

  const containerRef = useRef<HTMLDivElement>(null);
  const middlePhotoRef = useRef<HTMLDivElement>(null);
  const topPhotoRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. METİN GİRİŞİ
    const paragraphs = gsap.utils.toArray<HTMLElement>(".bio-text");
    gsap.from(paragraphs, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        end: "top 20%",
        toggleActions: "play none none reverse",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out"
    });

    // 2. FOTOĞRAF TIMELINE (Masaüstü)
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=250%",
          pin: true,
          scrub: 1,
          anticipatePin: 1
        }
      });

      // --- 1. HAREKET: Orta Resim ---
      tl.fromTo(middlePhotoRef.current,
        { yPercent: 150, rotation: 15, opacity: 0 },
        { yPercent: 5, rotation: -4, opacity: 1, ease: "power1.out", duration: 1 }
      );

      // --- ARA BOŞLUK ---
      tl.to({}, { duration: 0.2 });

      // --- 2. HAREKET: Üst Resim ---
      tl.fromTo(topPhotoRef.current,
        { yPercent: 150, rotation: -10, opacity: 0 },
        { yPercent: 10, rotation: 3, opacity: 1, ease: "power1.out", duration: 1 }
      );
    });

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="h-screen flex flex-col justify-center bg-[#0f0f0f] px-6 md:px-24 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">

        {/* SOL KOLON (Yazı) */}
        <div className="z-40 relative">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-10 border-l-4 border-red-800 pl-6 font-royal-7">
            {t("biography.title")}
          </h2>

          <div className="space-y-6 text-lg font-light text-gray-300 leading-relaxed font-fluid-2">
            <p className="bio-text">
              {t("biography.p1")}
            </p>
            <p className="bio-text">
              {t("biography.p2")}
            </p>
            <p className="bio-text">
              {t("biography.p3")}
            </p>
          </div>

          <div className="mt-10 skills-container">
            <h3 className="text-xl text-white mb-4 font-semibold font-royal-7">
              {t("biography.skillsTitle")}
            </h3>
            <div className="flex flex-wrap gap-3 font-fluid-2">
              {/* Skill Keys dizisini dönüyoruz ve her biri için çeviriyi çağırıyoruz */}
              {skillKeys.map((key, i) => (
                <span key={i} className="skill-item px-4 py-2 border border-gray-700 rounded-full text-sm text-gray-400 hover:border-gold-500 hover:text-gold-500 transition-colors cursor-default">
                  {t(`biography.skills.${key}`)}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* SAĞ KOLON (Fotoğraflar - AYNI KALDI) */}
        <div className="hidden lg:flex h-full items-center justify-center relative perspective-1000">
          {/* 1. KATMAN: TABAN */}
          <div className="relative z-10 w-[340px] aspect-[3/4] shadow-2xl rounded-md border-4 border-white/10 bg-black ">
            <img src={baseImage} alt="Zafer Altun Base" className="w-full h-full object-cover block" />
          </div>

          {/* 2. KATMAN: ORTA */}
          <div ref={middlePhotoRef} className="absolute z-20 w-[340px] aspect-[3/4] shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-md border-4 border-white/10 bg-black">
            <img src={middleImage} alt="Zafer Altun Middle" className="w-full h-full object-cover block" />
          </div>

          {/* 3. KATMAN: ÜST */}
          <div ref={topPhotoRef} className="absolute z-30 w-[340px] aspect-[3/4] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.8)] rounded-md border-4 border-white/10 bg-black">
            <img src={topImage} alt="Zafer Altun Top" className="w-full h-full object-cover block" />
          </div>
        </div>

      </div>
    </section>
  );
}
