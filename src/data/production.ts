// src/data/production.ts

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

export type ProductionItem = {
  id: number;
  img: string;
  title: string;
};

// Görsel değişkenlerini kolay erişim için bir diziye topluyoruz
const allImages = [
  p01,
  p02,
  p03,
  p04,
  p05,
  p06,
  p07,
  p08,
  p09,
  p10,
  p11,
  p12,
  p13,
  p14,
  p15,
  p16,
];

// --- VERİ HAVUZU ---
export const PRODUCTION_DATA: ProductionItem[] = [
  { id: 1, img: allImages[0], title: "Kamera Önü Oyunculuk" },
  { id: 2, img: allImages[1], title: "Kamera Önü Oyunculuk" },
  { id: 3, img: allImages[2], title: "Kamera Önü Oyunculuk" },
  { id: 4, img: allImages[3], title: "Kamera Önü Oyunculuk" },
  { id: 5, img: allImages[4], title: "Kamera Önü Oyunculuk" },
  { id: 6, img: allImages[5], title: "Kamera Önü Oyunculuk" },
  { id: 7, img: allImages[6], title: "Zurich/Switzerland" },
  { id: 8, img: allImages[7], title: "Zurich/Switzerland" },
  { id: 9, img: allImages[8], title: "Zurich/Switzerland" },
  { id: 10, img: allImages[9], title: "Zurich/Switzerland" },
  { id: 11, img: allImages[10], title: "Berlin/Germany" },
  { id: 12, img: allImages[11], title: "Berlin/Germany" },
  { id: 13, img: allImages[12], title: "Berlin/Germany" },
  { id: 14, img: allImages[13], title: "Zurich/Switzerland" },
  { id: 15, img: allImages[14], title: "TC. Cumhurbaşkanlığı Kariyer Fuarı" },
  { id: 16, img: allImages[15], title: "Final Kurgu" },
];
