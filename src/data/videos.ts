// --- VİDEO IMPORTLARI ---
import v1_mp4 from "@/assets/video/altun-video-01_720p.mp4";
import v1_webm from "@/assets/video/altun-video-01_720p.webm";

import v2_mp4 from "@/assets/video/altun-video-02_720p.mp4";
import v2_webm from "@/assets/video/altun-video-02_720p.webm";

import v3_mp4 from "@/assets/video/altun-video-03_720p.mp4";
import v3_webm from "@/assets/video/altun-video-03_720p.webm";

import v4_mp4 from "@/assets/video/altun-video-04_720p.mp4";
import v4_webm from "@/assets/video/altun-video-04_720p.webm";

// DİKKAT: Video 5, 540p olarak optimize edilmişti
import v5_mp4 from "@/assets/video/altun-video-05_540p.mp4";
import v5_webm from "@/assets/video/altun-video-05_540p.webm";

// --- POSTER (KAPAK RESMİ) IMPORTLARI ---
// Senin optimizer çıktına göre güncellendi: src/assets/images/posters/webp/
import p1 from "@/assets/images/posters/webp/altun-video-01-poster.webp";
import p2 from "@/assets/images/posters/webp/altun-video-02-poster.webp";
import p3 from "@/assets/images/posters/webp/altun-video-03-poster.webp";
import p4 from "@/assets/images/posters/webp/altun-video-04-poster.webp";
import p5 from "@/assets/images/posters/webp/altun-video-05-poster.webp";

// --- TİP TANIMLAMASI ---
export type VideoItem = {
  id: string;
  titleKey: string;
  descriptionKey: string;
  mp4: string;
  webm: string;
  poster: string;
  format: "720p" | "540p";
};

// --- ANA VERİ LİSTESİ ---
export const VIDEO_SHOWCASE: VideoItem[] = [
  {
    id: "v1",
    titleKey: "Dizi: Mahsusa",
    descriptionKey: "videos.desc.v1", // Çeviri anahtarı (i18n için)
    mp4: v1_mp4,
    webm: v1_webm,
    poster: p1,
    format: "720p",
  },
  {
    id: "v2",
    titleKey: "Sinema: Köşk-ü Ammar",
    descriptionKey: "videos.desc.v2",
    mp4: v2_mp4,
    webm: v2_webm,
    poster: p2,
    format: "720p",
  },
  {
    id: "v3",
    titleKey: "Eğitim: Oyunculuk Atölyesi",
    descriptionKey: "videos.desc.v3",
    mp4: v3_mp4,
    webm: v3_webm,
    poster: p3,
    format: "720p",
  },
  {
    id: "v4",
    titleKey: "Belgesel: Vahyin İzinde",
    descriptionKey: "videos.desc.v4",
    mp4: v4_mp4,
    webm: v4_webm,
    poster: p4,
    format: "720p",
  },
  {
    id: "v5",
    titleKey: "Sinema: Sıfır Bir",
    descriptionKey: "videos.desc.v5",
    mp4: v5_mp4,
    webm: v5_webm,
    poster: p5,
    format: "540p",
  },
];
