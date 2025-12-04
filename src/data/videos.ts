import v1_mp4 from "@/assets/video/altun-video-01_720p.mp4";
import v1_webm from "@/assets/video/altun-video-01_720p.webm";
import v2_mp4 from "@/assets/video/altun-video-01_720p.mp4";
import v2_webm from "@/assets/video/altun-video-01_720p.webm";
import v3_mp4 from "@/assets/video/altun-video-03_720p.mp4";
import v3_webm from "@/assets/video/altun-video-03_720p.webm";
import v4_mp4 from "@/assets/video/altun-video-04_720p.mp4";
import v4_webm from "@/assets/video/altun-video-04_720p.webm";
import v5_mp4 from "@/assets/video/altun-video-05_540p.mp4";
import v5_webm from "@/assets/video/altun-video-05_540p.webm";

// ... diğer videoları da buraya import etmelisiniz (v2, v3, v4, v5)

// Video objesinin yapısını tanımlayalım (TypeScript'in gücü!)
export type VideoItem = {
  id: string;
  titleKey: string; // Çeviri anahtarı veya direkt başlık
  descriptionKey: string;
  mp4: string; // Import edilen dosya yolu
  webm: string;
  poster: string; // Kapak resmi yolu (örneğin WebP)
  format: "720p" | "540p"; // Sadece bilgi amaçlı
};

// Bu yapıya göre tüm videoları listeleyelim.
export const VIDEO_SHOWCASE: VideoItem[] = [
  {
    id: "v1",
    titleKey: "Kısa Film: Gölgeler",
    descriptionKey: "Başarılı bir festival filmi kısa tanıtımı.",
    mp4: v1_mp4,
    webm: v1_webm,
    poster: "/assets/images/videos/v1-poster.webp", // Bu yolu kontrol edin
    format: "720p",
  },
  {
    id: "v2",
    titleKey: "Sinema Kesiti: Sahne 4A",
    descriptionKey: "Duygusal bir dram filminden çarpıcı bir sahne.",
    mp4: v2_mp4, // Bu importları da yukarı eklemelisiniz
    webm: v2_webm,
    poster: "/assets/images/videos/v2-poster.webp",
    format: "720p",
  },
  {
    id: "v3",
    titleKey: "Sinema Kesiti: Sahne 4A",
    descriptionKey: "Duygusal bir dram filminden çarpıcı bir sahne.",
    mp4: v3_mp4, // Bu importları da yukarı eklemelisiniz
    webm: v3_webm,
    poster: "/assets/images/videos/v3-poster.webp",
    format: "720p",
  },
  {
    id: "v4",
    titleKey: "Sinema Kesiti: Sahne 4A",
    descriptionKey: "Duygusal bir dram filminden çarpıcı bir sahne.",
    mp4: v4_mp4, // Bu importları da yukarı eklemelisiniz
    webm: v4_webm,
    poster: "/assets/images/videos/v4-poster.webp",
    format: "720p",
  },
  {
    id: "v5",
    titleKey: "Profesyonel Showreel",
    descriptionKey: "En iyi anlardan oluşan hızlı ve dinamik derleme.",
    mp4: v5_mp4,
    webm: v5_webm,
    poster: "/assets/images/videos/v5-poster.webp",
    format: "540p",
  },
];

// ÖNEMLİ: Bu dosyadaki tüm importları ve video objelerini tamamlamanız gerekmektedir.
