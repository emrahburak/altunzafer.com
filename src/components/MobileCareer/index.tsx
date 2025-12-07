import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// YENİ MOBİL İÇERİK BİLEŞENLERİNİ ÇAĞIRIYORUZ
import MobileSinema from "../MobileSinema";
import MobileTiyatro from "../MobileTiyatro";
import MobileProduction from "../MobileProduction";

// --- ACCORDION ITEM YARDIMCI BİLEŞENİ ARAYÜZÜ ---
interface MobileCareerItemProps {
  labelKey: string;
  Component: React.ComponentType;
  isOpen: boolean;
  onClick: () => void;
}

// --- ACCORDION ITEM BİLEŞENİ ---
const MobileCareerItem = ({
  labelKey,
  Component,
  isOpen,
  onClick,
}: MobileCareerItemProps) => {
  const { t } = useTranslation();

  // Açık/Kapalı duruma göre dinamik stiller
  const headerColor = isOpen ? "text-gold-500" : "text-gray-300";
  const headerBorder = isOpen ? "border-gold-500" : "border-gray-700";
  const bgColor = isOpen ? "bg-[#18150d]" : "bg-black";

  return (
    <div className={`w-full border-b ${headerBorder} ${bgColor} transition-all duration-300`}>

      {/* BAŞLIK (Accordion Header) */}
      <button
        className={`flex justify-between items-center w-full py-4 px-6 focus:outline-none transition-colors ${headerColor} ${!isOpen && 'hover:bg-[#1a1a1a]'}`}
        onClick={onClick}
      >
        <span className="font-royal-7 tracking-widest text-base uppercase flex items-center gap-3">
          {t(labelKey)}
        </span>

        {/* İKON: + / - MANTIK */}
        <div className={`w-5 h-5 relative flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          {/* Dikey Çizgi */}
          <span className={`absolute h-full w-0.5 transform transition-all duration-300 ${isOpen ? 'bg-gold-500' : 'bg-gray-400'}`}></span>
          {/* Yatay Çizgi */}
          <span className={`absolute w-full h-0.5 transform transition-all duration-300 ${isOpen ? 'bg-gold-500' : 'bg-gray-400'}`}></span>
        </div>

      </button>

      {/* İÇERİK (Accordion Panel) */}
      <div
        className={`overflow-hidden transition-max-height duration-500 ease-in-out ${isOpen ? 'max-h-[3000px] py-4' : 'max-h-0'}`}
      >
        {/* DÜZELTME BURADA YAPILDI: 
            pb-6 yerine pb-12 kullanıldı. 
            Bu ekstra boşluk, son satırdaki resimlerin veya yazıların kesilmesini engeller.
        */}
        <div className="px-6 pb-12 pt-2">
          <Component />
        </div>
      </div>
    </div>
  );
};

// --- ANA BİLEŞEN: MOBILE CAREER ---
export default function MobileCareer() {

  // Accordion'lar default olarak kapalı
  const [activeIndex, setActiveIndex] = useState(-1);

  const sections = [
    { id: 'cinema', labelKey: 'career.sectionTitle.cinema', Component: MobileSinema },
    { id: 'theater', labelKey: 'career.sectionTitle.theater', Component: MobileTiyatro },
    { id: 'production', labelKey: 'career.sectionTitle.production', Component: MobileProduction },
  ];

  return (
    <section
      id="career"
      className="relative w-full bg-black pt-8 pb-8"
    >
      {sections.map((section, index) => (
        <MobileCareerItem
          key={section.id}
          labelKey={section.labelKey}
          Component={section.Component}
          isOpen={activeIndex === index}
          onClick={() => setActiveIndex(index === activeIndex ? -1 : index)}
        />
      ))}
    </section>
  );
}
