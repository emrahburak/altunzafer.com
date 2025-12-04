import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { AWARDS_DATA } from "@/data/awards";
import type { AwardItem } from "@/data/awards"

export default function Awards() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);

  // Hangi ödülün aktif olduğunu tutuyoruz
  const [activeAward, setActiveAward] = useState<AwardItem | null>(null);

  // Mouse takibi için ref
  const cursorLabelRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Liste Giriş Animasyonu
    gsap.from(".award-item", {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      },
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power4.out"
    });

    // 2. Mouse Takip Eden Label (Cursor Follower)
    const xTo = gsap.quickTo(cursorLabelRef.current, "x", { duration: 0.3, ease: "power3" });
    const yTo = gsap.quickTo(cursorLabelRef.current, "y", { duration: 0.3, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      // Mouse konumunu alıp follower'a ilet
      // Sayfa scroll'unu hesaba katmadan viewport'a göre pozisyon almalı (fixed ise)
      // Ama burada container içinde absolute kullanacağız
      if (sectionRef.current) {
        // Container'a göre göreceli pozisyon hesaplama (daha güvenli)
        // Bu örnekte basitlik için clientX/Y kullanıyoruz ve fixed element yapıyoruz
        xTo(e.clientX);
        yTo(e.clientY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);

  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="awards"
      className="min-h-screen py-24 bg-black flex flex-col justify-center relative overflow-hidden"
    >
      {/* BAŞLIK */}
      <div className="container mx-auto px-6 md:px-24 mb-12 border-b border-white/10 pb-6 flex items-end justify-between">
        <div>
          <span className="text-gold-500 font-bold tracking-[0.2em] text-xs uppercase block mb-2">
            Curriculum Vitae
          </span>
          <h2 className="text-4xl md:text-6xl font-royal-7 text-white uppercase tracking-tighter">
            {t('ÖDÜLLER')}
          </h2>
        </div>
        <div className="text-right hidden md:block">
          <span className="text-gray-500 text-sm">Selected Recognitions</span>
        </div>
      </div>

      {/* --- LİSTE --- */}
      <div className="container mx-auto px-6 md:px-24 z-10">
        <div className="flex flex-col">
          {AWARDS_DATA.map((item) => (
            <div
              key={item.id}
              className="award-item group relative border-b border-white/10 py-8 cursor-none transition-colors duration-300 hover:bg-white/5"
              onMouseEnter={() => setActiveAward(item)}
              onMouseLeave={() => setActiveAward(null)}
            >
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between">

                {/* Sol: Yıl ve Proje Adı */}
                <div className="flex items-baseline gap-6">
                  <span className="text-gold-500/50 font-mono text-sm md:text-base">
                    {item.year}
                  </span>
                  <h3 className="text-3xl md:text-6xl font-bold text-gray-400 group-hover:text-white group-hover:translate-x-4 transition-all duration-500 ease-out">
                    {item.project}
                  </h3>
                </div>

                {/* Sağ: Kategori (Mobilde gizlenebilir veya alta alınabilir) */}
                <span className="text-xs font-bold px-2 py-1 border border-white/10 text-gray-500 rounded uppercase mt-2 md:mt-0 opacity-50 group-hover:opacity-100 group-hover:border-gold-500 group-hover:text-gold-500 transition-all">
                  {item.category}
                </span>
              </div>

              {/* Mobil İçin: Detaylar hemen altta çıksın (Mouse yoksa) */}
              <div className="md:hidden mt-4 text-gray-400 text-sm">
                {item.awards.map((award, i) => (
                  <p key={i}>• {award}</p>
                ))}
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* --- MOUSE FOLLOWER (Sadece Masaüstü) --- */}
      {/* Mouse üzerine gelince beliren detay kutusu */}
      <div
        ref={cursorLabelRef}
        className={`fixed top-0 left-0 pointer-events-none z-50 hidden md:block
                    ${activeAward ? 'opacity-100 scale-100' : 'opacity-0 scale-50'} 
                    transition-all duration-300 ease-out`}
        style={{
          transform: 'translate(-50%, -50%)', // Mouse'u ortala
          // Mouse'un biraz sağında dursun ki yazıyı kapatmasın
          marginLeft: '20px',
          marginTop: '20px'
        }}
      >
        {activeAward && (
          <div className="bg-gold-500 text-black p-6 min-w-[300px] max-w-[400px] shadow-2xl rounded-sm">
            <p className="font-bold text-xs tracking-widest uppercase mb-2 opacity-70 border-b border-black/20 pb-1">
              {activeAward.role || "ÖDÜLLER"}
            </p>
            <ul className="space-y-2">
              {activeAward.awards.map((award, i) => (
                <li key={i} className="text-lg font-bold leading-tight">
                  {award}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

    </section>
  );
}
