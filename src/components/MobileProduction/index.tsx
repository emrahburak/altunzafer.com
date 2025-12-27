import { useState } from "react";
import { useTranslation } from "react-i18next";

// --- LIGHTBOX İMPORTLARI ---
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// YENİ DATA IMPORT (Merkezi Veri Dosyası)
import { PRODUCTION_DATA } from "@/data/production";

export default function MobileProduction() {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  // Lightbox için slayt yapısı (Merkezi veriden map ediyoruz)
  const slides = PRODUCTION_DATA.map(item => ({
    src: item.img,
    title: item.title
  }));

  // Örnek tanıtım metni
  const introText = t('career.intro.production', 'Uluslararası atölyeler, yapım süreçleri ve kamera arkası anlarını içeren bu seçki, Zafer Altun\'un eğitmen ve uygulayıcı yapımcı kimliğini vurgulamaktadır. Türkiye, İsviçre ve Hollanda merkezli projelerden örnekler içerir.');

  const handleImageClick = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  return (
    // DÜZELTME: pb-8 ekleyerek en altta güvenlik boşluğu bıraktık
    <div className="w-full pb-8">

      {/* 1. TANITIM YAZISI */}
      <p className="text-sm text-gray-400 leading-relaxed mb-6">
        {introText}
      </p>

      {/* 2. 2 KOLONLU FOTOĞRAF GRİDİ */}
      <div className="grid grid-cols-2 gap-4">

        {PRODUCTION_DATA.map((item, i) => (
          <div
            key={item.id}
            onClick={() => handleImageClick(i)} // Tıklandığında Lightbox'ı aç
            className="relative aspect-3/4 overflow-hidden rounded-md shadow-lg border border-white/5 group cursor-pointer"
          >

            {/* Resim */}
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Overlay: Başlık */}
            <div className="absolute inset-0 bg-black/40 flex items-end justify-center p-2 transition-opacity duration-300">
              <span className="text-white text-xs font-semibold uppercase tracking-wider text-center opacity-90">
                {item.title}
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
