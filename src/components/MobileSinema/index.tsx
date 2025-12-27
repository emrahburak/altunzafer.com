import { useState } from "react";
import { useTranslation } from "react-i18next";

// --- LIGHTBOX İMPORTLARI ---
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// YENİ DATA IMPORT (Merkezi Veri Dosyası)
import { SINEMA_DATA } from "@/data/sinema";

export default function MobileSinema() {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  // Lightbox için slayt yapısı
  const slides = SINEMA_DATA.map(item => ({
    src: item.img,
    title: item.title
  }));

  // Tanıtım metni
  const introText = t('career.intro.sinema', 'Sinema ve televizyon projelerinden seçilen bu eserler, Zafer Altun\'un dramatik derinliğini ve kamera önü hakimiyetini sergilemektedir. Her bir eser, kariyerindeki dönüm noktalarını temsil eder.');

  const handleImageClick = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  return (
    // pb-8: Accordion altındaki taşma sorununu önlemek için güvenlik boşluğu
    <div className="w-full pb-8">

      {/* 1. TANITIM YAZISI */}
      <p className="text-sm text-gray-400 leading-relaxed mb-6">
        {introText}
      </p>

      {/* 2. 2 KOLONLU FOTOĞRAF GRİDİ */}
      <div className="grid grid-cols-2 gap-4">

        {SINEMA_DATA.map((item, i) => (
          <div
            key={item.id}
            onClick={() => handleImageClick(i)}
            className="relative aspect-3/4 overflow-hidden rounded-md shadow-lg border border-white/5 group cursor-pointer"
          >

            {/* Resim */}
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Overlay: Başlık */}
            {/* Sinema başlıkları uzun olabileceği için replace fonksiyonu ve break-words eklendi */}
            <div className="absolute inset-0 bg-black/40 flex items-end justify-center p-2 transition-opacity duration-300">
              <span className="text-white text-xs font-semibold uppercase tracking-wider text-center opacity-90 w-full whitespace-normal break-words leading-tight">
                {item.title.replace(/\//g, ' / ')}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* LIGHTBOX BİLEŞENİ */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        styles={{ container: { backgroundColor: "rgba(0, 0, 0, 0.95)" } }}
      />

    </div>
  );
}
