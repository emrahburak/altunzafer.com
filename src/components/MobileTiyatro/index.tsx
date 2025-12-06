import { useState } from "react";
import { useTranslation } from "react-i18next";

// --- LIGHTBOX İMPORTLARI ---
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// GÖRSELLER
import t01 from "@/assets/images/tiyatro/webp/altun-tiyatro-01.webp";
import t02 from "@/assets/images/tiyatro/webp/altun-tiyatro-02.webp";
import t03 from "@/assets/images/tiyatro/webp/altun-tiyatro-03.webp";
import t04 from "@/assets/images/tiyatro/webp/altun-tiyatro-04.webp";
import t05 from "@/assets/images/tiyatro/webp/altun-tiyatro-05.webp";
import t06 from "@/assets/images/tiyatro/webp/altun-tiyatro-06.webp";
import t07 from "@/assets/images/tiyatro/webp/altun-tiyatro-07.webp";
import t08 from "@/assets/images/tiyatro/webp/altun-tiyatro-08.webp";

// --- ANA VERİ KAYNAĞI ---
const initialData = [
  { id: 1, img: t01, title: "Zafer Altun" },
  { id: 2, img: t02, title: "Zafer Altun" },
  { id: 3, img: t03, title: "Zafer Altun" },
  { id: 4, img: t04, title: "Zafer Altun" },
  { id: 5, img: t05, title: "Zafer Altun" },
  { id: 6, img: t06, title: "Zafer Altun" },
  { id: 7, img: t07, title: "Zafer Altun" },
  { id: 8, img: t08, title: "Zafer Altun" },
];

// Lightbox için slayt yapısı (src ve title'ı map ediyoruz)
const slides = initialData.map(item => ({
  src: item.img,
  title: item.title
}));

// Generic Başlık Sabiti (Lightbox ve Alt Metinler için)
const GENERIC_TITLE = "Zafer Altun";


export default function MobileTiyatro() {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  // Örnek tanıtım metni (JSON'dan çekilmeli)
  // career.intro.theater anahtarını kullanıyoruz
  const introText = t('career.intro.theater', 'Tiyatro sahnelerinden seçilen bu kareler, sanatçının sahne hakimiyetini ve karakter derinliğini yansıtmaktadır. Çağdaş ve klasik eserlerden özel kesitler sunulmaktadır.');

  const handleImageClick = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  return (
    <div className="w-full">

      {/* 1. TANITIM YAZISI */}
      <p className="text-sm text-gray-400 leading-relaxed mb-6">
        {introText}
      </p>

      {/* 2. 2 KOLONLU FOTOĞRAF GRİDİ */}
      <div className="grid grid-cols-2 gap-4">

        {initialData.map((item, i) => (
          <div
            key={item.id}
            onClick={() => handleImageClick(i)} // Tıklandığında Lightbox'ı aç
            className="relative aspect-[3/4] overflow-hidden rounded-md shadow-lg border border-white/5 group cursor-pointer"
          >

            {/* Resim */}
            <img
              src={item.img}
              alt={GENERIC_TITLE}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Overlay: Başlık */}
            <div className="absolute inset-0 bg-black/40 flex items-end p-2 transition-opacity duration-300 group-hover:bg-black/20">
            </div>
          </div>
        ))}
      </div>

      {/* LIGHTBOX BİLEŞENİ */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        // Slaytlar için title üretildi: Hepsi 'Zafer Altun' olacak.
        slides={slides}
        styles={{ container: { backgroundColor: "rgba(0, 0, 0, 0.95)" } }}
      />

    </div>
  );
}
