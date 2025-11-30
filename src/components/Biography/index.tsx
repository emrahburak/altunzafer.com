import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// GÖRSELLER (Sıralama: 12 -> 13 -> 15)
import baseImage from "@/assets/images/biyografy/webp/altun-12.webp"; // Taban (Düz)
import middleImage from "@/assets/images/biyografy/webp/altun-15.webp";    // En Üst
import topImage from "@/assets/images/biyografy/webp/altun-13.webp"; // Orta

gsap.registerPlugin(ScrollTrigger);

export default function Biography() {
  const containerRef = useRef<HTMLDivElement>(null);
  const middlePhotoRef = useRef<HTMLDivElement>(null);
  const topPhotoRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. METİN GİRİŞİ (Değişmedi)
    const paragraphs = gsap.utils.toArray<HTMLElement>(".bio-text");
    gsap.from(paragraphs, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        end: "top 20%",
        toggleActions: "play none none reverse",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out"
    });

    // 2. FOTOĞRAF TIMELINE (Masaüstü)
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          // Scroll mesafesini artırdım (%250). 
          // Çünkü artık hareketler aynı anda değil, sırayla olacak. Daha fazla yola ihtiyacımız var.
          end: "+=250%",
          pin: true,
          scrub: 1, // 1 saniyelik yumuşatma, hareketleri yağ gibi yapar
          anticipatePin: 1
        }
      });

      // --- 1. HAREKET: Orta Resim (Altun-13) ---
      tl.fromTo(middlePhotoRef.current,
        { yPercent: 150, rotation: 15, opacity: 0 },
        {
          yPercent: 5,
          rotation: -4,
          opacity: 1,
          ease: "power1.out",
          duration: 1 // Bu 1 saniye değil, scroll pastasının 1 dilimi demektir.
        }
      );

      // --- ARA BOŞLUK (Opsiyonel) ---
      // Kullanıcı azıcık daha scroll yapsın ama hiçbir şey kımıldamasın (Nefes payı)
      tl.to({}, { duration: 0.2 });

      // --- 2. HAREKET: Üst Resim (Altun-15) ---
      // Buraya hiçbir konum parametresi (position parameter) koymuyoruz.
      // Böylece bu animasyon, bir önceki (ve ara boşluk) BİTMEDEN ASLA BAŞLAMAZ.
      tl.fromTo(topPhotoRef.current,
        { yPercent: 150, rotation: -10, opacity: 0 },
        {
          yPercent: 10,
          rotation: 3,
          opacity: 1,
          ease: "power1.out",
          duration: 1
        }
      );

    });

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="h-screen flex flex-col justify-center bg-[#0f0f0f] px-6 md:px-24 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">

        {/* SOL KOLON (Yazı) */}
        <div className="z-40 relative">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-10 border-l-4 border-red-800 pl-6 font-royal-7">
            Biyografi
          </h2>

          <div className="space-y-6 text-lg font-light text-gray-300 leading-relaxed font-fluid-2">
            <p className="bio-text">
              1980 yılında Bursa'da doğdu. 2001 yılında girdiği Selçuk Üniversitesi Devlet Konservatuvarı Tiyatro Oyunculuk Bölümü'nden 2005 yılında mezun oldu.
            </p>
            <p className="bio-text">
              Kariyerine Bursa Devlet Tiyatrosu'nda başladı ve "Çok Orijinal Bir Oyun" adlı performansı ile Direklerarası Lions Kerem Yılmazer Genç Yetenek Ödülü'ne layık görüldü.
            </p>
            <p className="bio-text">
              Uluslararası alanda İsviçre ve Hollanda merkezli projelerde yönetmen, oyuncu ve yapımcı olarak çalışmalarını sürdürmektedir.
            </p>
          </div>

          <div className="mt-10 skills-container">
            <h3 className="text-xl text-white mb-4 font-semibold font-royal-7">Özel Beceriler</h3>
            <div className="flex flex-wrap gap-3 font-fluid-2">
              {["Perküsyon", "At Biniciliği", "Kılıç & Pala Kullanımı", "İleri Sürüş Teknikleri"].map((skill, i) => (
                <span key={i} className="skill-item px-4 py-2 border border-gray-700 rounded-full text-sm text-gray-400 hover:border-gold-500 hover:text-gold-500 transition-colors cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* SAĞ KOLON (Fotoğraflar) */}
        <div className="hidden lg:flex h-full items-center justify-center relative perspective-1000">

          {/* 1. KATMAN: TABAN (Altun-12) */}
          <div className="relative z-10 w-[340px] aspect-[3/4] shadow-2xl rounded-md border-4 border-white/10 bg-black ">
            <img src={baseImage} alt="Zafer Altun Base" className="w-full h-full object-cover block" />
          </div>

          {/* 2. KATMAN: ORTA (Altun-13) */}
          <div ref={middlePhotoRef} className="absolute z-20 w-[340px] aspect-[3/4] shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-md border-4 border-white/10 bg-black">
            <img src={middleImage} alt="Zafer Altun Middle" className="w-full h-full object-cover block" />
          </div>

          {/* 3. KATMAN: ÜST (Altun-15) */}
          <div ref={topPhotoRef} className="absolute z-30 w-[340px] aspect-[3/4] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.8)] rounded-md border-4 border-white/10 bg-black">
            <img src={topImage} alt="Zafer Altun Top" className="w-full h-full object-cover block" />
          </div>

        </div>

      </div>
    </section>
  );
}
