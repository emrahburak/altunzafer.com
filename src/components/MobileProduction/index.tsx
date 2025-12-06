import { useState } from "react";
import { useTranslation } from "react-i18next";

// --- LIGHTBOX İMPORTLARI ---
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// --- EĞİTİM & YAPIM GÖRSELLERİ İMPORT (p01 - p16) ---
import p01 from "@/assets/images/egitim/webp/altun-egitim-01.webp";
import p02 from "@/assets/images/egitim/webp/altun-egitim-02.webp";
import p03 from "@/assets/images/egitim/webp/altun-egitim-03.webp";
import p04 from "@/assets/images/egitim/webp/altun-egitim-04.webp";
import p05 from "@/assets/images/egitim/webp/altun-egitim-05.webp";
import p06 from "@/assets/images/egitim/webp/altun-egitim-06.webp";
import p07 from "@/assets/images/egitim/webp/altun-egitim-07.webp";
import p08 from "@/assets/images/egitim/webp/altun-egitim-08.webp";
import p09 from "@/assets/images/egitim/webp/altun-egitim-09.webp";
import p10 from "@/assets/images/egitim/webp/altun-egitim-10.webp";
import p11 from "@/assets/images/egitim/webp/altun-egitim-11.webp";
import p12 from "@/assets/images/egitim/webp/altun-egitim-12.webp";
import p13 from "@/assets/images/egitim/webp/altun-egitim-13.webp";
import p14 from "@/assets/images/egitim/webp/altun-egitim-14.webp";
import p15 from "@/assets/images/egitim/webp/altun-egitim-15.webp";
import p16 from "@/assets/images/egitim/webp/altun-egitim-16.webp";

// Görsel değişkenlerini kolay erişim için bir diziye topluyoruz
const allImages = [p01, p02, p03, p04, p05, p06, p07, p08, p09, p10, p11, p12, p13, p14, p15, p16];

// --- VERİ HAVUZU (Başlıklar bu kez Türkçe ve açıklayıcı) ---
const rawData = [
  { id: 1, img: allImages[0], title: "Kamera Önü Eğitimi" },
  { id: 2, img: allImages[1], title: "Time Right Production" },
  { id: 3, img: allImages[2], title: "Diksiyon Atölyesi" },
  { id: 4, img: allImages[3], title: "İsviçre Reklam Çekimi" },
  { id: 5, img: allImages[4], title: "Hollanda Belgesel" },
  { id: 6, img: allImages[5], title: "Audition Teknikleri" },
  { id: 7, img: allImages[6], title: "Set Arkası" },
  { id: 8, img: allImages[7], title: "Yapım Toplantısı" },
  { id: 9, img: allImages[8], title: "Öğrenci Çalışmaları" },
  { id: 10, img: allImages[9], title: "Reji Masası" },
  { id: 11, img: allImages[10], title: "Cast Seçimi" },
  { id: 12, img: allImages[11], title: "Senaryo Analizi" },
  { id: 13, img: allImages[12], title: "Atölye Pratiği" },
  { id: 14, img: allImages[13], title: "Global Ortaklık" },
  { id: 15, img: allImages[14], title: "Montaj Süreci" },
  { id: 16, img: allImages[15], title: "Final Kurgu" },
];

// Lightbox için slayt yapısı
const slides = rawData.map(item => ({
  src: item.img,
  title: item.title
}));


export default function MobileProduction() {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  // Örnek tanıtım metni (JSON'dan çekilmeli)
  // career.intro.production anahtarını kullanıyoruz
  const introText = t('career.intro.production', 'Uluslararası atölyeler, yapım süreçleri ve kamera arkası anlarını içeren bu seçki, Zafer Altun\'un eğitmen ve uygulayıcı yapımcı kimliğini vurgulamaktadır. Türkiye, İsviçre ve Hollanda merkezli projelerden örnekler içerir.');

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

        {rawData.map((item, i) => (
          <div
            key={item.id}
            onClick={() => handleImageClick(i)} // Tıklandığında Lightbox'ı aç
            className="relative aspect-3/4 overflow-hidden rounded-md shadow-lg border border-white/5 group cursor-pointer"
          >

            {/* Resim */}
            <img
              src={item.img}
              // alt metninde görsele özel başlığı kullanıyoruz
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Overlay: Başlık - Açıklayıcı Türkçe başlıklar kullanıldı */}
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
        // Slaytlar için başlıklar (title) rawData'dan çekildi
        slides={slides}
        styles={{ container: { backgroundColor: "rgba(0, 0, 0, 0.95)" } }}
      />

    </div>
  );
}
