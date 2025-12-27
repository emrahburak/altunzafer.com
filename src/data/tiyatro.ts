// src/data/tiyatro.ts

// GÖRSELLER
import t01 from "@/assets/images/tiyatro/webp/altun-tiyatro-01.webp";
import t02 from "@/assets/images/tiyatro/webp/altun-tiyatro-02.webp";
import t03 from "@/assets/images/tiyatro/webp/altun-tiyatro-03.webp";
import t04 from "@/assets/images/tiyatro/webp/altun-tiyatro-04.webp";
import t05 from "@/assets/images/tiyatro/webp/altun-tiyatro-05.webp";
import t06 from "@/assets/images/tiyatro/webp/altun-tiyatro-06.webp";
import t07 from "@/assets/images/tiyatro/webp/altun-tiyatro-07.webp";
import t08 from "@/assets/images/tiyatro/webp/altun-tiyatro-08.webp";
import t09 from "@/assets/images/tiyatro/webp/altun-tiyatro-09.webp";
import t10 from "@/assets/images/tiyatro/webp/altun-tiyatro-10.webp";

export type TiyatroItem = {
  id: number;
  img: string;
  title: string;
};

export const TIYATRO_DATA: TiyatroItem[] = [
  {
    id: 1,
    img: t01,
    title: "2006-2007 “Nafile Dünya” / Bursa Devlet Tiyatrosu",
  }, // Burayı istediğin zaman doldurabilirsin
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
