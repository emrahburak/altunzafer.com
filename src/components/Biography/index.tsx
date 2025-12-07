import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "react-i18next";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// GÖRSELLER
import baseImage from "@/assets/images/biyografy/webp/altun-bio-01.webp";
import middleImage from "@/assets/images/biyografy/webp/altun-bio-02.webp";
import topImage from "@/assets/images/biyografy/webp/altun-bio-03.webp";

gsap.registerPlugin(ScrollTrigger);

const instructorKeys = ["theaterActing", "diction", "cameraActing", "effectiveSpeaking", "audition"];
const skillKeys = ["percussion", "horse", "sword", "driving"];

export default function Biography() {
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

    // 2. FOTOĞRAF TIMELINE (Sadece Desktop - Mobilde kod çalışmaz)
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {

      // KRİTİK KONTROL: Hedef elementler yoksa (null ise) timeline'ı kurma
      if (!middlePhotoRef.current || !topPhotoRef.current) {
        return;
      }

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

      tl.fromTo(middlePhotoRef.current,
        { yPercent: 150, rotation: 15, opacity: 0 },
        { yPercent: 5, rotation: -4, opacity: 1, ease: "power1.out", duration: 1 }
      );

      tl.to({}, { duration: 0.2 });

      tl.fromTo(topPhotoRef.current,
        { yPercent: 150, rotation: -10, opacity: 0 },
        { yPercent: 10, rotation: 3, opacity: 1, ease: "power1.out", duration: 1 }
      );
    });

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="biography"
      className="min-h-screen flex flex-col justify-center bg-[#0f0f0f] px-6 md:px-24 relative overflow-hidden py-24"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* SOL KOLON (Yazı) */}
        <div className="z-40 relative w-full">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-10 border-l-4 border-gold-500 pl-6 font-royal-7">
            {t("biography.title")}
          </h2>

          <div className="space-y-6 text-lg font-light text-gray-300 leading-relaxed font-fluid-2 mb-12">
            <p className="bio-text">{t("biography.p1")}</p>
            <p className="bio-text">{t("biography.p2")}</p>
            <p className="bio-text">{t("biography.p3")}</p>
          </div>

          {/* --- GRID YAPISI BAŞLIYOR --- */}
          {/* Mobilde 1 kolon, md (Tablet/Desktop) ve üzeri 2 kolon */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* 1. KOLON: EĞİTMENLİK ALANLARI (GOLD) */}
            <div className="bio-text">
              <h3 className="text-xl text-white mb-4 font-semibold font-royal-7 border-b border-gray-800 pb-2 inline-block">
                {t("biography.instructorTitle")}
              </h3>
              <div className="flex flex-wrap gap-3 font-fluid-2">
                {instructorKeys.map((key, i) => (
                  <span key={i} className="px-4 py-2 border border-gold-500/50 rounded-full text-sm text-gold-500 hover:bg-gold-500 hover:text-black transition-all cursor-default font-medium">
                    {t(`biography.instructor.${key}`)}
                  </span>
                ))}
              </div>
            </div>

            {/* 2. KOLON: KİŞİSEL BECERİLER (GRİ) */}
            <div className="bio-text">
              <h3 className="text-xl text-white mb-4 font-semibold font-royal-7 border-b border-gray-800 pb-2 inline-block">
                {t("biography.skillsTitle")}
              </h3>
              <div className="flex flex-wrap gap-3 font-fluid-2">
                {skillKeys.map((key, i) => (
                  <span key={i} className="px-4 py-2 border border-gray-700 rounded-full text-sm text-gray-400 hover:border-gray-500 hover:text-white transition-colors cursor-default">
                    {t(`biography.skills.${key}`)}
                  </span>
                ))}
              </div>
            </div>

          </div>
          {/* --- GRID SONU --- */}

        </div>

        {/* SAĞ KOLON (Fotoğraflar) */}
        {/* 'hidden lg:flex': Mobilde (lg altı) tamamen GİZLİ, yer kaplamaz. */}
        <div className="hidden lg:flex min-h-[80vh] items-center justify-center relative perspective-1000">
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
