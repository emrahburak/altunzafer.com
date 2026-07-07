// src/data/production.ts
import { cdnImage } from "@/utils/cdn";

export type ProductionItem = {
  id: number;
  img: string;
  title: string;
};

const allImages = [
  cdnImage("altun-egitim-01.webp"),
  cdnImage("altun-egitim-02.webp"),
  cdnImage("altun-egitim-03.webp"),
  cdnImage("altun-egitim-04.webp"),
  cdnImage("altun-egitim-05.webp"),
  cdnImage("altun-egitim-06.webp"),
  cdnImage("altun-egitim-07.webp"),
  cdnImage("altun-egitim-08.webp"),
  cdnImage("altun-egitim-09.webp"),
  cdnImage("altun-egitim-10.webp"),
  cdnImage("altun-egitim-11.webp"),
  cdnImage("altun-egitim-12.webp"),
  cdnImage("altun-egitim-13.webp"),
  cdnImage("altun-egitim-14.webp"),
  cdnImage("altun-egitim-15.webp"),
  cdnImage("altun-egitim-16.webp"),
  cdnImage("altun-egitim-17.webp"),
  cdnImage("altun-egitim-18.webp"),
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
  { id: 17, img: allImages[16], title: "Rotterdam/Kuzeyin Hikayesi" },
  { id: 18, img: allImages[17], title: "Rotterdam/Kuzeyin Hikayesi" },
];
