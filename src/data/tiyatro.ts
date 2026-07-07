// src/data/tiyatro.ts
import { cdnImage } from "@/utils/cdn";

export type TiyatroItem = {
  id: number;
  img: string;
  title: string;
};

const t01 = cdnImage("altun-tiyatro-01.webp");
const t02 = cdnImage("altun-tiyatro-02.webp");
const t03 = cdnImage("altun-tiyatro-03.webp");
const t04 = cdnImage("altun-tiyatro-04.webp");
const t05 = cdnImage("altun-tiyatro-05.webp");
const t06 = cdnImage("altun-tiyatro-06.webp");
const t07 = cdnImage("altun-tiyatro-07.webp");
const t08 = cdnImage("altun-tiyatro-08.webp");
const t09 = cdnImage("altun-tiyatro-09.webp");
const t10 = cdnImage("altun-tiyatro-10.webp");

export const TIYATRO_DATA: TiyatroItem[] = [
  {
    id: 1,
    img: t01,
    title: "2006-2007 “Nafile Dünya” / Bursa Devlet Tiyatrosu",
  },
  {
    id: 2,
    img: t02,
    title: "2005-2009 “Sııntılar” / Ekim Sanat Oyuncuları",
  },
  { id: 3, img: t03, title: "2017-2019 “Netçoka Nezvanova” / Yabancı Sahne" },
  { id: 4, img: t04, title: "2017-2019 “Netçoka Nezvanova” / Yabancı Sahne" },
  {
    id: 5,
    img: t05,
    title: "2016-2018 “Veronalı ki Centilmen” / Duru Tiyatro",
  },
  {
    id: 6,
    img: t06,
    title: "2016-2018 “Veronalı ki Centilmen” / Duru Tiyatro",
  },
  {
    id: 7,
    img: t07,
    title: "2017-2019 “Netçoka Nezvanova” / Yabancı Sahne",
  },
  { id: 8, img: t08, title: "8. Antalya Uluslar Arası Tiyatro Festivali" },
  {
    id: 9,
    img: t09,
    title: "2008-2009 “Çok Orijinal Bir Oyun” / Bursa Devlet Tiyatrosu",
  },
  {
    id: 10,
    img: t10,
    title: "2007-2008 “Fareler ve İnsanlar” / Ekim Sanat Oyuncular",
  },
];
