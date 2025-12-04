import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';

// Veri yapısını ve listeyi import ediyoruz
// Videos.tsx dosyanızın başında:
import { VIDEO_SHOWCASE } from '@/data/videos';
import type { VideoItem } from '@/data/videos'; // Yalnızca tür import'u

gsap.registerPlugin(ScrollTrigger);

// --- BAŞLANGIÇ VİDEOSU ---
// Varsayılan olarak ilk videoyu seçiyoruz
const INITIAL_VIDEO = VIDEO_SHOWCASE[0];

export default function Videos() {
  const { t } = useTranslation();

  // Video oynatıcı ve Section referansları
  const sectionRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const thumbnailRef = useRef(null);
  const controlLayerRef = useRef(null);

  const [currentVideo, setCurrentVideo] = useState<VideoItem>(INITIAL_VIDEO);
  const [isPlaying, setIsPlaying] = useState(false); // Opak katmanı kaldırma durumu

  // --- VİDEO YÖNETİM FONKSİYONLARI ---

  // Yeni bir video seçildiğinde
  const handleVideoChange = (video: VideoItem) => {
    // Eğer oynatılıyorsa önce durdur ve opak katmanı geri getir
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
    setCurrentVideo(video);
    // Yeni video yüklenecek, kullanıcı tekrar "İzle" butonuna basmalı.
  };

  // "Seçili projeleri izle" butonuna tıklandığında
  const handlePlayClick = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      // Opak katman kalktıktan sonra, video oynatma denemesi yapılır.
      // Tarayıcı kısıtlamaları nedeniyle hemen oynamayabilir.
      videoRef.current.play().catch(error => {
        console.warn("Video otomatik oynatımı engellendi:", error);
      });
    }
  };

  // --- GSAP ANİMASYONLARI (SCROLLTRIGGER) ---
  useGSAP(() => {
    if (!sectionRef.current) return;

    // 1. SCROLL PINNING VE ANİMASYON ZAMAN ÇİZELGESİ (TIMELINE)
    // 200vh (2000px) kaydırma boyunca animasyon gerçekleşecek.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true, // Section'ı sabitler
        start: "top top", // Section, viewport'un tepesine ulaştığında başla
        end: "+=2000", // 2000 piksel scroll boyunca çalış
        scrub: 1, // Scroll hareketine yumuşakça bağla
      }
    });

    // 2. THUMBNAIL (Başlangıç Görseli) Büyüme ve Kapsama Animasyonu
    // Not: Bu animasyon, videonun kapak resmi üzerinde gerçekleşecek.
    tl.to(thumbnailRef.current, {
      // Section'ı kaplayacak şekilde büyüme (Tahmini değerler)
      scale: 1.2,
      opacity: 1,
      // Thumbnail'in viewport'u tam doldurması için genişletme (isteğe bağlı)
      width: '100vw',
      height: '100vh',
      duration: 1.5,
      ease: "power2.out"
    }, 0) // Zaman çizelgesinin başlangıcına yerleştir

    // 3. KONTROL KATMANI OPAKLIĞI
    tl.to(controlLayerRef.current, {
      opacity: 0.8, // Opak katman belirginleşir
      duration: 1,
    }, 0.5) // 0.5 saniye gecikmeyle başla

  }, { scope: sectionRef });


  // --- KONTROL KATMANI VE VİDEO YÜKLEMESİ ---
  useEffect(() => {
    // Her yeni video seçildiğinde (currentVideo değiştiğinde),
    // kontrol katmanını tekrar getir ve oynatma durumunu sıfırla.
    setIsPlaying(false);
  }, [currentVideo.id]);


  return (
    <section ref={sectionRef} id="videos" className="w-full h-screen relative bg-black overflow-hidden">

      {/* --- 1. ANA VİDEO OYNATICI VE ARKA PLAN --- */}
      <div
        ref={thumbnailRef}
        className="absolute inset-0 bg-gray-900 transition-all duration-300 ease-out flex items-center justify-center"
      >
        <div className="relative w-full h-full">
          <video
            ref={videoRef}
            key={currentVideo.id} // ID değişince video DOM'da yeniden oluşturulur
            controls={isPlaying} // Opak katman kalkınca kontrolleri göster
            poster={currentVideo.poster}
            preload="none"
            // Lazy loading için opacity: 0 ile başlar, GSAP ile belirginleşir (ya da poster görünür)
            className="w-full h-full object-cover"
          >
            {/* Çapraz Tarayıcı Desteği */}
            <source src={currentVideo.webm} type="video/webm" />
            <source src={currentVideo.mp4} type="video/mp4" />
            Tarayıcınız video etiketini desteklemiyor.
          </video>

          {/* --- OPAK LAYER (KONTROL KATMANI) --- */}
          {/* Opak katman sadece video izlenmiyorsa (isPlaying=false) görünür */}
          {!isPlaying && (
            <div
              ref={controlLayerRef}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-white opacity-0 transition-opacity duration-500"
            >
              <h2 className="text-4xl lg:text-7xl font-royal-7 tracking-widest uppercase mb-4 text-gold-500 text-center">
                {t('Seçme Projeler')}
              </h2>
              <h3 className="text-xl lg:text-3xl font-bold mb-6 text-white text-center">
                {currentVideo.titleKey}
              </h3>

              <button
                onClick={handlePlayClick}
                className="px-8 py-3 bg-gold-500 text-black font-bold uppercase tracking-wider rounded-full shadow-lg hover:bg-gold-600 transition duration-300"
              >
                {t('Seçili Projeyi İzle')}
              </button>
              <p className="mt-4 text-sm text-gray-400">
                {currentVideo.descriptionKey}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* --- 2. VİDEO LİSTESİ (ALTTA LİSTELEME) --- */}
      {/* Sabitlenmiş Section içinde, alt kısımda listeyi göster */}
      <div className="absolute bottom-0 left-0 right-0 p-8 bg-black/80 z-10 hidden lg:block">
        <h3 className="text-xl text-white mb-4 border-b border-gold-500/50 pb-2">
          {t('Diğer Klipler')}
        </h3>
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {VIDEO_SHOWCASE.map((video) => (
            <div
              key={video.id}
              onClick={() => handleVideoChange(video)}
              className={`w-40 flex-shrink-0 cursor-pointer p-2 transition-all duration-200 
                                        ${currentVideo.id === video.id ? 'bg-gold-500/30 border-t-2 border-gold-500' : 'bg-gray-800 hover:bg-gray-700'}`}
            >
              <img
                src={video.poster}
                alt={video.titleKey}
                className="w-full h-20 object-cover mb-1"
              />
              <p className="text-white text-xs truncate">{video.titleKey}</p>
            </div>
          ))}
        </div>
      </div>

      {/* RESPONSIVE NOTU: Mobil cihazlarda liste alta kayar, pinned scroll kaldırılabilir. */}
    </section>
  );
}
