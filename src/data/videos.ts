// src/data/videos.ts
import { cdnImage } from "@/utils/cdn";

const CDN_URL = "https://cdn.altunzafer.com/videos";

// --- TİP TANIMLAMASI ---
export type VideoItem = {
  id: string;
  titleKey: string;
  mp4: string;
  poster: string;
  format: "720p" | "540p";
};

// --- ANA VERİ LİSTESİ ---
export const VIDEO_SHOWCASE: VideoItem[] = [
  {
    id: "v0",
    titleKey: "ShowReel: Zafer Altun",
    mp4: `${CDN_URL}/altun-video-06.mp4`,
    poster: cdnImage("altun-video-06-poster.webp"),
    format: "720p",
  },
  {
    id: "v1",
    titleKey: "Dizi: Mahsusa",
    mp4: `${CDN_URL}/altun-video-01_720p.mp4`,
    poster: cdnImage("altun-video-01-poster.webp"),
    format: "720p",
  },
  {
    id: "v2",
    titleKey: "Sinema: Köşk-ü Ammar",
    mp4: `${CDN_URL}/altun-video-02_720p.mp4`,
    poster: cdnImage("altun-video-02-poster.webp"),
    format: "720p",
  },
  {
    id: "v3",
    titleKey: "Eğitim: Oyunculuk Atölyesi",
    mp4: `${CDN_URL}/altun-video-03_720p.mp4`,
    poster: cdnImage("altun-video-03-poster.webp"),
    format: "720p",
  },
  {
    id: "v4",
    titleKey: "Belgesel: Vahyin İzinde",
    mp4: `${CDN_URL}/altun-video-04_720p.mp4`,
    poster: cdnImage("altun-video-04-poster.webp"),
    format: "720p",
  },
  {
    id: "v5",
    titleKey: "Sinema: Sıfır Bir",
    mp4: `${CDN_URL}/altun-video-05_540p.mp4`,
    poster: cdnImage("altun-video-05-poster.webp"),
    format: "540p",
  },
];
