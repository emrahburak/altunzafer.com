import { useState, useRef, useEffect } from 'react';
import type { MouseEvent } from 'react'
import { useTranslation } from 'react-i18next';
import { VIDEO_SHOWCASE } from '@/data/videos';
import type { VideoItem } from '@/data/videos';

const INITIAL_VIDEO = VIDEO_SHOWCASE[0];

export default function Videos() {
  const { t } = useTranslation();

  const videoRef = useRef<HTMLVideoElement | null>(null);

  // 1. LİSTE İÇİN REF
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const [currentVideo, setCurrentVideo] = useState<VideoItem>(INITIAL_VIDEO);
  const [isPlaying, setIsPlaying] = useState(false);

  // --- DRAG TO SCROLL DEĞİŞKENLERİ ---
  const isDown = useRef(false); // Mouse basılı mı?
  const startX = useRef(0);     // İlk basılan nokta
  const scrollLeft = useRef(0); // İlk scroll pozisyonu
  const isDragging = useRef(false); // Sürükleme işlemi mi yapılıyor? (Tıklamayı engellemek için)

  // --- VİDEO YÖNETİMİ ---
  const handleVideoChange = (video: VideoItem) => {
    // Eğer kullanıcı sürükleme yapıyorsa videoyu değiştirme (Tıklamayı iptal et)
    if (isDragging.current) {
      // Sürükleme bittiği için flag'i sıfırla ve çık
      isDragging.current = false;
      return;
    }

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
    setCurrentVideo(video);
  };

  const handlePlayClick = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play().catch(console.warn);
    }
  };

  useEffect(() => {
    setIsPlaying(false);
  }, [currentVideo.id]);


  // --- MOUSE EVENT HANDLERS (SÜRÜKLEME İÇİN) ---

  const onMouseDown = (e: MouseEvent) => {
    if (!scrollContainerRef.current) return;
    isDown.current = true;
    isDragging.current = false; // Henüz sürüklemiyor, sadece bastı
    scrollContainerRef.current.classList.add('cursor-grabbing');
    scrollContainerRef.current.classList.remove('cursor-grab');

    // Başlangıç noktasını kaydet
    startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeft.current = scrollContainerRef.current.scrollLeft;
  };

  const onMouseLeave = () => {
    isDown.current = false;
    isDragging.current = false;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.classList.remove('cursor-grabbing');
      scrollContainerRef.current.classList.add('cursor-grab');
    }
  };

  const onMouseUp = () => {
    isDown.current = false;
    // Not: isDragging burada sıfırlanmaz, handleVideoChange içinde kontrol edilir.
    // Sürükleme bittikten hemen sonra tıklama tetiklenirse engellemek için.
    setTimeout(() => { isDragging.current = false; }, 50);

    if (scrollContainerRef.current) {
      scrollContainerRef.current.classList.remove('cursor-grabbing');
      scrollContainerRef.current.classList.add('cursor-grab');
    }
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isDown.current || !scrollContainerRef.current) return;
    e.preventDefault();

    // Hareket miktarını hesapla
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX.current) * 2; // *2 hızı artırır (daha seri kayar)

    // Eğer hareket 5 pikselden fazlaysa, bunu "Sürükleme" olarak kabul et
    if (Math.abs(walk) > 5) {
      isDragging.current = true;
    }

    scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
  };


  return (
    <section id="videos" className="w-full min-h-screen bg-black py-20 flex flex-col items-center justify-center">
      {/* DÜZELTME: 
         1. 'container' ve 'mx-auto' kaldırıldı. (Ortalamayı iptal ettik)
         2. 'px-6 md:px-24' eklendi. (Diğer sayfalarla aynı sol boşluk verildi)
      */}
      <div className="w-full space-y-5 px-6 md:px-24">

        <div className="text-left mb-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-10 border-l-4 border-gold-500 pl-6 font-royal-7">
            {t('videos.sectionTitle')}
          </h2>

          <div className="space-y-6 text-lg font-light text-gray-300 leading-relaxed font-fluid-2 pl-6">
            {t('videos.description')}
          </div>

        </div>
        <div className="w-full max-w-6xl mx-auto mb-10">
          {/* ... Video Player Kodları ... */}
          {/* ... Play Butonu Kodları ... */}
          <div className="relative w-full aspect-video bg-gray-900 shadow-2xl border border-white/10 rounded-sm overflow-hidden">
            <video
              ref={videoRef}
              key={currentVideo.id}
              controls={isPlaying}
              poster={currentVideo.poster}
              preload="none"
              className="w-full h-full object-cover"
            >
              <source src={currentVideo.webm} type="video/webm" />
              <source src={currentVideo.mp4} type="video/mp4" />
            </video>
            {!isPlaying && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] z-10">
                <button onClick={handlePlayClick} className="group transition-transform active:scale-95">
                  {/* Play icon */}
                  <div className="w-20 h-20 bg-gold-500 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-black ml-1">
                      <path d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" />
                    </svg>
                  </div>
                </button>
                <h3 className="mt-6 text-2xl font-bold text-white tracking-wide">{currentVideo.titleKey}</h3>
              </div>
            )}
          </div>
        </div>


        {/* --- VİDEO LİSTESİ (GÜNCELLENDİ) --- */}
        <div className="w-full max-w-6xl mx-auto">
          {/* Events Eklendi: onMouseDown, onMouseLeave, onMouseUp, onMouseMove 
              ref Eklendi: scrollContainerRef
              Class Eklendi: cursor-grab active:cursor-grabbing select-none
          */}
          <div
            ref={scrollContainerRef}
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseLeave}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            className="flex space-x-4 overflow-x-auto pb-4 no-scrollbar cursor-grab active:cursor-grabbing select-none"
          >
            {VIDEO_SHOWCASE.map((video) => (
              <div
                key={video.id}
                onClick={() => handleVideoChange(video)}
                // snap-center KALDIRILDI: Mouse ile sürüklerken snap özelliği takılma yapar. 
                // Eğer mobilde snap istiyorsan, CSS media query ile sadece touch cihazlara snap eklemek gerekir.
                className={`flex-shrink-0 w-40 lg:w-60 group transition-all duration-300
                            ${currentVideo.id === video.id ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
              >
                <div className={`relative aspect-video mb-3 overflow-hidden border-2 pointer-events-none 
                                ${currentVideo.id === video.id ? 'border-gold-500' : 'border-transparent'}`}>
                  {/* pointer-events-none: Resimlerin sürüklenmesini engeller, container'ın sürüklenmesini sağlar */}
                  <img
                    src={video.poster}
                    alt={video.titleKey}
                    className="w-full h-full object-cover"
                    draggable="false" // Resmin ghost image olarak gelmesini engeller
                  />
                  {currentVideo.id !== video.id && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                      {/* Icon */}
                    </div>
                  )}
                </div>

                <div className="pointer-events-none">
                  <h4 className={`text-sm lg:text-base font-bold truncate ${currentVideo.id === video.id ? 'text-gold-500' : 'text-white'}`}>
                    {video.titleKey}
                  </h4>
                  <p className="text-xs text-gray-500 truncate">
                    {t(video.descriptionKey)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
