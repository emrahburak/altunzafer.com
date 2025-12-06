import React, { useState, useRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// KULLANICININ İSTEDİĞİ VERİ İMPORTLARI
import { AWARDS_DATA } from "@/data/awards";
import type { AwardItem } from "@/data/awards";

gsap.registerPlugin(ScrollTrigger);

// --- YARDIMCI TİP VE FONKSİYON ---

/** Ödülleri kategori bazında gruplamak için kullanılan yardımcı arayüz */
interface GroupedAwardCategory {
  categoryKey: string; // e.g., 'awards.categories.cinema'
  items: AwardItem[];
}

/** Düz AwardItem listesini kategori bazında gruplar */
const groupAwardsByCategory = (data: AwardItem[]): GroupedAwardCategory[] => {
  const groups: Record<string, GroupedAwardCategory> = {};

  data.forEach(item => {
    const key = item.categoryKey;
    if (!groups[key]) {
      groups[key] = { categoryKey: key, items: [] };
    }
    groups[key].items.push(item);
  });

  return Object.values(groups);
};


// --- ÖDÜL SATIRI BİLEŞENİ (GSAP ENTRANCE) ---

// --- ÖDÜL SATIRI BİLEŞENİ (GSAP ENTRANCE - Düzeltildi) ---

const AwardEntry: React.FC<{ item: AwardItem }> = ({ item }) => {
  const { t } = useTranslation();
  const itemRef = useRef(null);

  // AwardsKeys'ten gelen ödül listesini çevir
  const awardList = t(item.awardsKeys, { returnObjects: true }) as string[];

  useGSAP(() => {
    if (!itemRef.current) return;

    gsap.fromTo(
      itemRef.current,
      {
        autoAlpha: 0,
        y: 30,
      },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: itemRef.current,
          start: "top 85%",
        },
      }
    );
  }, [itemRef]);

  return (
    // DÜZELTME BURADA: className'den 'opacity-0' çıkarıldı. 
    // Artık GSAP'in kontrol ettiği bir görünmezlikle başlıyor.
    <div ref={itemRef}>
      <div className="flex flex-col border-t border-gray-700 pt-3 pb-2 mt-2">

        {/* SOL: Proje Adı ve Yılı */}
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-white tracking-wide">
            {/* Sadece title'ı almayı dene, eğer projectKey sadece 'kayitsiz' ise bu doğru path'tir. */}
            {t(`${item.projectKey}`)} ({item.year})
          </span>

          {/* Ödülleri listele */}
          <ul className="list-none mt-1 ml-0 space-y-0">
            {awardList && Array.isArray(awardList) && awardList.map((award: string, i: number) => (
              <li
                key={i}
                className="text-xs text-gray-400 before:content-['\2022\0020'] before:text-gold-500 before:mr-1"
              >
                {award}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// --- ANA BİLEŞEN: MOBILE AWARDS ---
export default function MobileAwards() {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(-1); // Default kapalı

  // Veriyi memoize ederek, gereksiz hesaplamayı önleriz.
  const groupedAwards = useMemo(() => groupAwardsByCategory(AWARDS_DATA as AwardItem[]), []);

  return (
    <section
      id="awards"
      className="relative w-full bg-black py-8 px-6" // min-h-screen kaldırıldı
    >
      <h2 className="text-4xl font-bold text-white mb-10 border-l-4 border-gold-500 pl-6 font-royal-7">
        {t('awards.title', 'BAŞARILAR & ÖDÜLLER')}
      </h2>

      <div className="w-full max-w-2xl mx-auto">
        {groupedAwards.map((category, index) => {
          const isOpen = activeIndex === index;
          const headerColor = isOpen ? "text-gold-500" : "text-gray-300";
          const headerBorder = isOpen ? "border-gold-500" : "border-gray-700";

          return (
            <div key={category.categoryKey} className={`w-full border-b ${headerBorder} transition-all duration-300`}>

              {/* ACCORDION BAŞLIK */}
              <button
                className={`flex justify-between items-center w-full py-4 focus:outline-none transition-colors ${headerColor} ${isOpen ? 'bg-[#18150d]' : 'hover:bg-[#080808]'}`}
                onClick={() => setActiveIndex(index === activeIndex ? -1 : index)}
              >
                {/* CategoryKey ile başlığı çevir */}
                <span className="font-royal-7 tracking-wider text-xl uppercase">{t(category.categoryKey)}</span>

                {/* İKON (+ / - MANTIK) */}
                <div className={`w-5 h-5 relative flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                  <span className={`absolute h-full w-0.5 transform transition-all duration-300 ${isOpen ? 'bg-gold-500' : 'bg-gray-400'}`}></span>
                  <span className={`absolute w-full h-0.5 transform transition-all duration-300 ${isOpen ? 'bg-gold-500' : 'bg-gray-400'}`}></span>
                </div>
              </button>

              {/* İÇERİK: ÖDÜL LİSTESİ */}
              <div
                className={`overflow-hidden transition-max-height duration-700 ease-in-out ${isOpen ? 'max-h-[1000px] pt-2 pb-6' : 'max-h-0'}`}
              >
                {/* Her bir ödülü AwardEntry bileşeni ile render et */}
                <div className="space-y-4">
                  {category.items.map((item) => (
                    <AwardEntry key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
