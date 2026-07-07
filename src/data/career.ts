// src/data/career.ts
import { cdnImage } from "@/utils/cdn";

export type CareerItem = {
  id: number;
  img: string;
  title: string;
};

// --- VERİ HAVUZU ---
export const CAREER_DATA: CareerItem[] = [
  { id: 1, img: cdnImage("altun-sinema-20.webp"), title: "Sinema/Zafer Altun" },
  { id: 2, img: cdnImage("altun-tiyatro-04.webp"), title: "Tiyatro/Zafer Altun" },
  { id: 3, img: cdnImage("altun-egitim-06.webp"), title: "Produksiyon/Zafer Altun" },
];
