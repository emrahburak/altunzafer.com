// src/data/sinema.ts

// --- SİNEMA GÖRSELLERİ İMPORT ---
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
import c18 from "@/assets/images/sinema/webp/altun-sinema-18.webp";
import c19 from "@/assets/images/sinema/webp/altun-sinema-19.webp";

export type SinemaItem = {
  id: number;
  img: string;
  title: string;
};

// --- ANA VERİ HAVUZU ---
export const SINEMA_DATA: SinemaItem[] = [
  // ROW 1 (1-8)
  { id: 1, img: c01, title: "2023/ Mahsusa/ Dizi" },
  { id: 2, img: c02, title: "2023/ Mahsusa/ Dizi" },
  { id: 3, img: c03, title: "2023/ Mahsusa/ Dizi" },
  { id: 4, img: c04, title: "2025/ Gülizar Yolayrımı/ Sinama" },
  { id: 5, img: c05, title: "2023/ Kirli Sepeti/ Dizi" },
  { id: 6, img: c06, title: "2014/ Balık/ Sinema" },
  { id: 7, img: c07, title: "2019/ Diriliş/ Dizi" },
  { id: 8, img: c08, title: "2016/ Vahyin İzinde/ Dizi" },

  // ROW 2 (9-17)
  { id: 9, img: c09, title: "2025/ Gülizar Yolayrımı/ Sinama" },
  { id: 10, img: c10, title: "2023/ Kirli Sepeti/ Dizi" },
  { id: 11, img: c11, title: "Beyaz Hüzün/ Sinema" },
  { id: 12, img: c12, title: "Beyaz Hüzün/ Sinema" },
  {
    id: 13,
    img: c13,
    title: "2006/ Karagöz ve Hacivat Neden Öldürüldü/ Sinema",
  },

  { id: 14, img: c14, title: "2025/ Gülizar Yolayrımı/ Sinama" },
  { id: 15, img: c15, title: "2022/ Köşkü Ammar/ Sinema (Baş Rol)" },
  { id: 16, img: c16, title: "2022/ Malazgirt 1071/ Sinama" },
  { id: 17, img: c17, title: "2016/ Seddülbahir/ Dizi" },
  {
    id: 18,
    img: c18,
    title: "2006/ Karagöz ve Hacivat Neden Öldürüldü/ Sinema",
  },
  {
    id: 19,
    img: c19,
    title: "2014/ O Hayat Benim/ Dizi",
  },
];
