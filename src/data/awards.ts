/// --- GÖRSEL IMPORTLARI (01 - 21) ---
// Not: Klasör ismin 'ödül' olduğu için path'i ona göre düzenledim.
// Build hatası alırsan klasör adını 'odul' yapmanı öneririm.
import img2 from "@/assets/images/ödül/webp/altun-odul-02.webp";
import img3 from "@/assets/images/ödül/webp/altun-odul-03.webp";
import img4 from "@/assets/images/ödül/webp/altun-odul-04.webp";
import img5 from "@/assets/images/ödül/webp/altun-odul-05.webp";
import img6 from "@/assets/images/ödül/webp/altun-odul-06.webp";
import img7 from "@/assets/images/ödül/webp/altun-odul-07.webp";
import img8 from "@/assets/images/ödül/webp/altun-odul-08.webp";
import img9 from "@/assets/images/ödül/webp/altun-odul-09.webp";
import img10 from "@/assets/images/ödül/webp/altun-odul-10.webp";
import img11 from "@/assets/images/ödül/webp/altun-odul-11.webp";
import img12 from "@/assets/images/ödül/webp/altun-odul-12.webp";
import img14 from "@/assets/images/ödül/webp/altun-odul-14.webp";
import img15 from "@/assets/images/ödül/webp/altun-odul-15.webp";
import img17 from "@/assets/images/ödül/webp/altun-odul-17.webp";
import img18 from "@/assets/images/ödül/webp/altun-odul-18.webp";
import img19 from "@/assets/images/ödül/webp/altun-odul-19.webp";
import img20 from "@/assets/images/ödül/webp/altun-odul-20.webp";
import img22 from "@/assets/images/ödül/webp/altun-odul-22.webp";
import img23 from "@/assets/images/ödül/webp/altun-odul-23.webp";
import img24 from "@/assets/images/ödül/webp/altun-odul-24.webp";
import img25 from "@/assets/images/ödül/webp/altun-odul-25.webp";

export type AwardItem = {
  id: string;
  year: string;
  // Artık string değil, çeviri anahtarı (key) tutuyoruz
  projectKey: string;
  categoryKey: string;
  awardsKeys: string;
  images: string[];
};

export const AWARDS_DATA: AwardItem[] = [
  {
    id: "a1",
    year: "2024",
    // JSON'daki yol: awards.projects.kayitsiz.title
    projectKey: "awards.projects.kayitsiz.title",
    // JSON'daki yol: awards.categories.cinema
    categoryKey: "awards.categories.cinema",
    // JSON'daki ödül listesinin tamamını çekeceğiz
    awardsKeys: "awards.projects.kayitsiz.list", // String olarak path veriyoruz
    images: [img22, img23, img24, img25, img14],
  },
  {
    id: "a2",
    year: "2022",
    projectKey: "awards.projects.isin_asli.title",
    categoryKey: "awards.categories.cinema",
    awardsKeys: "awards.projects.isin_asli.list",
    images: [img2, img19, img8, img5],
  },
  {
    id: "a3",
    year: "2017",
    projectKey: "awards.projects.ruya.title",
    categoryKey: "awards.categories.cinema",
    awardsKeys: "awards.projects.ruya.list",
    // Karma: 5 adet görsel, yoğun içerik
    images: [img3, img11, img20, img15, img6],
  },
  {
    id: "a4",
    year: "2015",
    projectKey: "awards.projects.balik.title",
    categoryKey: "awards.categories.cinema",
    awardsKeys: "awards.projects.balik.list",

    // Karma: 4 adet görsel
    images: [img4, img18, img9, img12],
  },

  {
    id: "a5",
    year: "2009",
    projectKey: "awards.projects.cok_orijinal.title",
    categoryKey: "awards.categories.theater",
    awardsKeys: "awards.projects.cok_orijinal.list",
    images: [img7, img10, img17],
  },
];
