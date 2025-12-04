export type AwardItem = {
  id: string;
  year: string;
  project: string;
  category: "SİNEMA" | "TİYATRO";
  role?: string; // Opsiyonel: Hangi kurum/rol (Örn: Bursa Devlet Tiyatrosu)
  awards: string[]; // Bir projenin birden fazla ödülü olabilir
};

export const AWARDS_DATA: AwardItem[] = [
  {
    id: "a1",
    year: "2024",
    project: "Kayıtsız",
    category: "SİNEMA",
    awards: [
      "En İyi Film Ödülü - ABD Los Angeles Independent Women Film Awards",
    ],
  },
  {
    id: "a2",
    year: "2022",
    project: "İşin Aslı",
    category: "SİNEMA",
    awards: [
      "Zafer Altun Katılım Ödülü - Kazakistan Almatı Türk Filmleri Haftası",
    ],
  },
  {
    id: "a3",
    year: "2017",
    project: "Rüya",
    category: "SİNEMA",
    awards: [
      "Türk Kültürüne Katkı Ödülü - Yunus Emre Enstitüsü",
      "Onur Ödülü - 8. Uluslararası Suç ve Ceza Film Festivali",
    ],
  },
  {
    id: "a4",
    year: "2015",
    project: "Balık",
    category: "SİNEMA",
    awards: [
      "Onur Ödülü / Altın Ada Festivali",
      "Sinema Yazarları Derneği Ödülü / Malatya Film Festivali",
      "En İyi Senaryo Ödülü / Adana Film Festivali",
    ],
  },
  {
    id: "a5",
    year: "2009",
    project: "Çok Orijinal Bir Oyun",
    category: "TİYATRO",
    role: "Bursa Devlet Tiyatrosu",
    awards: [
      "Yılın Genç Yetenek Ödülü - Direklerarası 9. Lions Kerem Yılmazer",
    ],
  },
];
