import { useState } from "react";
import { useTranslation } from "react-i18next";

// --- LIGHTBOX İMPORTLARI ---
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// --- SİNEMA GÖRSELLERİ (c01 - c17) ---
import c01 from "@/assets/images/sinema/webp/altun-sinema-01.webp";
import c02 from "@/assets/images/sinema/webp/altun-sinema-02.webp";
import c03 from "@/assets/images/sinema/webp/altun-sinema-03.webp";
import c04 from "@/assets/images/sinema/webp/altun-sinema-04.webp";
import c05 from "@/assets/images/sinema/webp/altun-sinema-05.webp";
import c06 from "@/assets/images/sinema/webp/altun-sinema-06.webp";
import c07 from "@/assets/images/sinema/webp/altun-sinema-07.webp";
import c08 from "@/assets/images/sinema/webp/altun-sinema-08.webp";
import c09 from "@/assets/images/sinema/webp/altun-sinema-09.webp";
import c10 from "@/assets/images/sinema/webp/altun-sinema-10.webp";
import c11 from "@/assets/images/sinema/webp/altun-sinema-11.webp";
import c12 from "@/assets/images/sinema/webp/altun-sinema-12.webp";
import c13 from "@/assets/images/sinema/webp/altun-sinema-13.webp";
import c14 from "@/assets/images/sinema/webp/altun-sinema-14.webp";
import c15 from "@/assets/images/sinema/webp/altun-sinema-15.webp";
import c16 from "@/assets/images/sinema/webp/altun-sinema-16.webp";
import c17 from "@/assets/images/sinema/webp/altun-sinema-17.webp";

// --- MERKEZİ GÖRSEL VERİSİ (LIGHTBOX İÇİN) ---
// Sadece 'src' kullanıyoruz, başlıklar generic 'Zafer Altun' olacak.
const slides = [
  { src: c01 }, { src: c02 }, { src: c03 }, { src: c04 }, { src: c05 },
  { src: c06 }, { src: c07 }, { src: c08 }, { src: c09 }, { src: c10 },
  { src: c11 }, { src: c12 }, { src: c13 }, { src: c14 }, { src: c15 },
  { src: c16 }, { src: c17 },
];

// Generic Başlık Sabiti
const GENERIC_TITLE = "Zafer Altun";


export default function MobileSinema() {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  // Örnek tanıtım metni (JSON'dan çekilmeli)
  // Bu metnin JSON anahtarını koruyoruz
  const introText = t('career.intro.sinema', 'Sinema ve televizyon projelerinden seçilen bu eserler, Zafer Altun\'un dramatik derinliğini ve kamera önü hakimiyetini sergilemektedir. Her bir eser, kariyerindeki dönüm noktalarını temsil eder.');

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

        {slides.map((item, i) => (
          <div
            key={i}
            onClick={() => handleImageClick(i)}
            className="relative aspect-3/4 overflow-hidden rounded-md shadow-lg border border-white/5 group cursor-pointer"
          >

            {/* Resim Altı Metni: GENERIC BAŞLIK KULLANILDI */}
            <img
              src={item.src}
              alt={GENERIC_TITLE}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Overlay: Başlık - GENERIC BAŞLIK KULLANILDI */}
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
        slides={slides.map(slide => ({ src: slide.src, title: GENERIC_TITLE }))}
        styles={{ container: { backgroundColor: "rgba(0, 0, 0, 0.95)" } }}
      />

    </div>
  );
}
