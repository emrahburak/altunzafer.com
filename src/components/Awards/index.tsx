import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { AWARDS_DATA } from "@/data/awards";
import type { AwardItem } from "@/data/awards";

export default function Awards() {
  const { t } = useTranslation();
  const containerRef = useRef(null);

  // Hangi ödülün üzerinde olduğumuzu tutuyoruz
  const [activeAward, setActiveAward] = useState<AwardItem | null>(null);

  // --- ANİMASYON MANTIĞI: LİSTE GİRİŞİ ---
  useGSAP(() => {
    gsap.from(".award-list-item", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out"
    });
  }, { scope: containerRef });

  // --- ANİMASYON MANTIĞI: RESİMLERİN BELİRMESİ ---
  useGSAP(() => {
    if (activeAward) {
      gsap.fromTo(".scatter-img",
        {
          scale: 0.8, // %80 boyuttan başla
          opacity: 0,
          y: 30, // Hafif aşağıdan yukarı
          rotation: () => gsap.utils.random(-15, 15) // Rastgele başlangıç açısı
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          rotation: () => gsap.utils.random(-10, 10), // Rastgele bitiş açısı
          duration: 0.8, // Smooth (Yumuşak) süre
          stagger: 0.08, // Pıt-pıt-pıt etkisi
          ease: "power3.out", // Kadife gibi duruş (Yaylanmasız)
          overwrite: true
        }
      );
    }
  }, [activeAward]);

  // --- ASİMETRİK KONUMLANDIRMA FONKSİYONU ---
  const getImageStyle = (index: number) => {
    // Sağ panel içindeki yüzdesel konumlar (Responsive ve Asimetrik)
    const positions = [
      { top: "10%", left: "10%", width: "18rem", zIndex: 10 }, // Sol Üst
      { top: "40%", left: "40%", width: "22rem", zIndex: 20 }, // Merkez
      { top: "15%", left: "55%", width: "16rem", zIndex: 15 }, // Sağ Üst
      { top: "55%", left: "5%", width: "20rem", zIndex: 25 },  // Sol Alt
      { top: "60%", left: "50%", width: "18rem", zIndex: 5 },  // Sağ Alt
    ];
    return positions[index % positions.length];
  };

  return (
    <>
      <div
        ref={containerRef}
        id="awards"
        className="h-screen bg-dark-bg py-24 flex items-center relative overflow-hidden"
      >
        <div className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row h-full relative z-10">

          {/* --- SOL KOLON: LİSTE --- */}
          <div className="w-full lg:w-5/12 z-20 flex flex-col justify-center">

            {/* Başlık */}
            <div className="mb-12 border-l-4 border-gold-500 pl-6">
              <h2 className="text-4xl md:text-5xl font-royal-7 text-white uppercase tracking-tight">
                {t('awards.title', 'ÖDÜLLER')}
              </h2>
            </div>

            {/* Liste */}
            <div className="space-y-6">
              {AWARDS_DATA.map((item) => {
                // i18n'den ödül listesini dizi olarak çekme
                const awardList = t(item.awardsKeys, { returnObjects: true }) as string[];

                return (
                  <div
                    key={item.id}
                    className="award-list-item group cursor-pointer"
                    onMouseEnter={() => setActiveAward(item)}
                  // Son seçilen ekranda kalsın diye onMouseLeave boş bırakıldı
                  >
                    {/* Proje Adı */}
                    <h3 className={`text-2xl md:text-4xl font-bold transition-all duration-300 
                                ${activeAward?.id === item.id ? 'text-gold-500 translate-x-4' : 'text-gray-400 group-hover:text-white'}`}>
                      {t(item.projectKey)}
                    </h3>

                    {/* Alt Bilgi (Accordion) */}
                    <div className={`mt-2 pl-1 border-l border-white/10 transition-all duration-500 overflow-hidden
                                    ${activeAward?.id === item.id ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="pl-4 py-2">
                        <p className="text-sm text-gold-500/80 font-mono mb-1">
                          {item.year} — {t(item.categoryKey)}
                        </p>
                        {/* Ödüller */}
                        {Array.isArray(awardList) && awardList.map((award, i) => (
                          <p key={i} className="text-sm text-gray-300 font-light leading-relaxed">
                            • {award}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>


          {/* --- SAĞ KOLON: ASİMETRİK GÖRSELLER (SAHNE) --- */}
          <div className="hidden lg:block lg:w-7/12 relative h-[80vh] pointer-events-none">

            {/* Aktif ödül varsa resimleri göster */}
            {activeAward && activeAward.images.map((imgSrc, index) => {
              const style = getImageStyle(index);

              return (
                <div
                  key={`${activeAward.id}-img-${index}`}
                  className="scatter-img absolute p-2 bg-white shadow-2xl origin-center"
                  style={{
                    top: style.top,
                    left: style.left,
                    width: style.width,
                    zIndex: style.zIndex,
                    // transform: rotate GSAP tarafından yönetiliyor
                  }}
                >
                  {/* Polaroid Çerçeve */}
                  <div className="w-full h-full overflow-hidden bg-gray-200">
                    <img
                      src={imgSrc}
                      alt="Award moment"
                      className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700 ease-in-out pointer-events-auto"
                    />
                  </div>
                </div>
              );
            })}

            {/* Boş Durum (Hiçbir şey seçili değilken) */}
            {!activeAward && (
              <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                <span className="text-6xl md:text-8xl font-royal-7 text-white tracking-[0.5em] rotate-0 select-none">
                  ZAFER ALTUN
                </span>
              </div>
            )}
          </div>

        </div>
      </div>
    </>

  );
}
