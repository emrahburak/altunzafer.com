import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Biography() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // KÜTÜPHANESİZ YAKLAŞIM:
    // Metinleri satır satır bölemediğimiz için (çünkü o işi kütüphane yapıyor),
    // biz de paragrafları birer blok olarak ele alıp "Maske" efekti vereceğiz.

    // 1. Paragrafları (.bio-text) seçiyoruz.
    const paragraphs = gsap.utils.toArray<HTMLElement>(".bio-text");

    gsap.from(paragraphs, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%", // Ekranın %60'ına gelince başla
        end: "bottom bottom",
        toggleActions: "play none none reverse",
      },
      y: 50, // 50px aşağıdan yukarıya
      opacity: 0, // Görünmezlikten görünürlüğe
      duration: 1, // 1 saniye sürsün
      stagger: 0.2, // Her paragraf arasında 0.2sn bekle
      ease: "power3.out", // Yumuşak bitiş
      clearProps: "all" // Animasyon bitince CSS'i temizle (Responsive bozulmasın diye)
    });

    // 2. Yetenekler (Skills) için ufak bir şov
    gsap.from(".skill-item", {
      scrollTrigger: {
        trigger: ".skills-container",
        start: "top 80%",
      },
      scale: 0.5,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "back.out(1.7)" // Hafif yaylanma efekti
    });

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex flex-col justify-center py-20 px-6 md:px-24 bg-[#0f0f0f]"
    >
      <div className="max-w-4xl">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-10 border-l-4 border-red-800 pl-6 font-royal-1">
          Biyografi
        </h2>

        <div className="space-y-6 text-lg font-light text-gray-300 leading-relaxed font-fluid-2">
          {/* GSAP için 'bio-text' sınıfını ekledik */}
          <p className="bio-text">
            1980 yılında Bursa'da doğdu. 2001 yılında girdiği Selçuk Üniversitesi Devlet Konservatuvarı Tiyatro Oyunculuk Bölümü'nden 2005 yılında mezun oldu.
          </p>
          <p className="bio-text">
            Kariyerine Bursa Devlet Tiyatrosu'nda başladı ve "Çok Orijinal Bir Oyun" adlı performansı ile Direklerarası Lions Kerem Yılmazer Genç Yetenek Ödülü'ne layık görüldü. 2009'dan itibaren kariyerine İstanbul'da devam ederek Sadri Alışık Tiyatrosu ve Duru Tiyatro gibi köklü sahnelerde yer aldı.
          </p>
          <p className="bio-text">
            Uluslararası alanda İsviçre ve Hollanda merkezli projelerde yönetmen, oyuncu ve yapımcı olarak çalışmalarını sürdürmektedir. 2018 yılında "Kompass Group Media"nın kültür sanat temsilciliğini üstlenmiş, 2020 yılında ise kendi yapım şirketi "Time Right Production"ı kurmuştur.
          </p>
        </div>

        {/* Yetenekler Kısmı */}
        <div className="mt-12 skills-container">
          <h3 className="text-xl text-white mb-4 font-semibold">Özel Beceriler</h3>
          <div className="flex flex-wrap gap-3">
            {["Perküsyon", "At Biniciliği", "Kılıç & Pala Kullanımı", "İleri Sürüş Teknikleri"].map((skill, i) => (
              <span key={i} className="skill-item px-4 py-2 border border-gray-700 rounded-full text-sm text-gray-400 hover:border-white hover:text-white transition-colors cursor-default">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
