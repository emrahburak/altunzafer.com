// src/data/awards.ts
import { cdnImage } from "@/utils/cdn";

const img2 = cdnImage("altun-odul-02.webp");
const img3 = cdnImage("altun-odul-03.webp");
const img4 = cdnImage("altun-odul-04.webp");
const img5 = cdnImage("altun-odul-05.webp");
const img6 = cdnImage("altun-odul-06.webp");
const img7 = cdnImage("altun-odul-07.webp");
const img8 = cdnImage("altun-odul-08.webp");
const img9 = cdnImage("altun-odul-09.webp");
const img10 = cdnImage("altun-odul-10.webp");
const img11 = cdnImage("altun-odul-11.webp");
const img12 = cdnImage("altun-odul-12.webp");
const img14 = cdnImage("altun-odul-14.webp");
const img15 = cdnImage("altun-odul-15.webp");
const img17 = cdnImage("altun-odul-17.webp");
const img18 = cdnImage("altun-odul-18.webp");
const img19 = cdnImage("altun-odul-19.webp");
const img20 = cdnImage("altun-odul-20.webp");
const img22 = cdnImage("altun-odul-22.webp");
const img23 = cdnImage("altun-odul-23.webp");
const img24 = cdnImage("altun-odul-24.webp");
const img25 = cdnImage("altun-odul-25.webp");

export type AwardItem = {
  id: string;
  year: string;
  projectKey: string;
  categoryKey: string;
  awardsKeys: string;
  images: string[];
};

export const AWARDS_DATA: AwardItem[] = [
  {
    id: "a1",
    year: "2024",
    projectKey: "awards.projects.kayitsiz.title",
    categoryKey: "awards.categories.cinema",
    awardsKeys: "awards.projects.kayitsiz.list",
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
    images: [img3, img11, img20, img15, img6],
  },
  {
    id: "a4",
    year: "2015",
    projectKey: "awards.projects.balik.title",
    categoryKey: "awards.categories.cinema",
    awardsKeys: "awards.projects.balik.list",
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
