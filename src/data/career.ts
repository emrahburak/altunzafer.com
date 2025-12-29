// src/data/career.ts

// --- Career Görselleri İMPORT  ---
import c01 from "@/assets/images/sinema/webp/altun-sinema-20.webp";
import c02 from "@/assets/images/tiyatro/webp/altun-tiyatro-04.webp";
import c03 from "@/assets/images/egitim/webp/altun-egitim-06.webp";

export type CareerItem = {
  id: number;
  img: string;
  title: string;
};

// Görsel değişkenlerini kolay erişim için bir diziye topluyoruz
const allImages = [c01, c02, c03];

// --- VERİ HAVUZU ---
export const CAREER_DATA: CareerItem[] = [
  { id: 1, img: allImages[0], title: "Sinema/Zafer Altun" },
  { id: 2, img: allImages[1], title: "Tiyatro/Zafer Altun" },
  { id: 3, img: allImages[2], title: "Produksiyon/Zafer Altun" },
];
