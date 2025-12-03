import { useRef, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// GÖRSELLER (Örnek veriyi çoğalttım ki etkiyi gör)
import t01 from "@/assets/images/tiyatro/webp/altun-tiyatro-01.webp";
import t02 from "@/assets/images/tiyatro/webp/altun-tiyatro-02.webp";
import t03 from "@/assets/images/tiyatro/webp/altun-tiyatro-03.webp";
import t04 from "@/assets/images/tiyatro/webp/altun-tiyatro-04.webp";
import t05 from "@/assets/images/tiyatro/webp/altun-tiyatro-05.webp";
import t06 from "@/assets/images/tiyatro/webp/altun-tiyatro-06.webp";

// --- VERİ HAVUZU ---
// Buraya istediğin kadar resim ekle/çıkar. Grid otomatik hesaplayacak.
const gridItems = [
  { id: 1, img: t01, title: "Devlet Tiyatrosu" },
  { id: 2, img: t02, title: "Ödüllü Oyun" },
  { id: 3, img: t03, title: "Sadri Alışık" },
  { id: 4, img: t04, title: "Keşanlı Ali" },
  { id: 5, img: t05, title: "Duru Tiyatro" },
  { id: 6, img: t06, title: "Global Projeler" },
  // 13, 14, 15... eklersen kutular otomatik küçülür.
];

export default function Tiyatro() {
  // --- LIGHTBOX STATE ---
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  // --- MATEMATİKSEL GRID HESAPLAMASI ---
  // Toplam sayı
  const totalItems = gridItems.length;
  // Sütun sayısı = Karekök(Toplam Sayı) (Yukarı yuvarla)
  // Örn: 10 resim varsa sqrt(10) = 3.16 -> 4 sütun olur.
  const cols = Math.ceil(Math.sqrt(totalItems));

  // Lightbox Slaytları
  const slides = gridItems.map((item) => ({ src: item.img, alt: item.title }));

  return (
    <>
      <div className="w-full h-full bg-[#0a0a0a] relative flex items-center justify-center overflow-hidden">

        {/* Arka Plan */}
        <div className="absolute inset-0 bg-radial-gradient from-[#2a0a0a] to-black opacity-60 pointer-events-none"></div>

        {/* --- DİNAMİK GRID --- */}
        <div
          className="w-full h-full lg:w-[85vw] lg:h-[85vh] p-4 lg:p-0 transition-all duration-500 ease-in-out"
          style={{
            display: "grid",
            // CSS Variable gibi dinamik sütun sayısı veriyoruz
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
            // Satır sayısını da otomatiğe bırakıyoruz, hepsi eşit dağılsın
            gridAutoRows: "1fr",
            gap: "0.5rem" // Gap de sabit (veya sayıya göre küçültülebilir)
          }}
        >
          {gridItems.map((item, i) => (
            <div
              key={i}
              onClick={() => { setIndex(i); setOpen(true); }}
              className="group relative w-full h-full overflow-hidden border border-white/5 bg-white/5 cursor-pointer"
            >
              {/* Resim */}
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100 group-hover:grayscale-0 grayscale"
              />

              {/* Hover Overlay (Çok küçükse göstermeyebiliriz, ama şimdilik kalsın) */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-[10px] md:text-xs font-royal-1 text-center px-1">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* --- YÜZEN MERKEZ LOGOSU (Overlay) --- */}
        {/* Grid'den tamamen bağımsız, en üstte durur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none flex flex-col items-center justify-center text-center p-4 rounded-full border border-gold-500/20 bg-black/70 backdrop-blur-sm shadow-[0_0_60px_rgba(197,160,40,0.2)] aspect-square w-[200px] h-[200px] md:w-[280px] md:h-[280px]">
          <span className="text-gold-500 font-geometric tracking-[0.3em] text-[8px] md:text-[10px] uppercase mb-2">
            Sanat Yönetmeni
          </span>
          <h2 className="text-4xl md:text-6xl font-royal-1 text-white leading-none mb-2 drop-shadow-2xl">
            ZAFER<br />ALTUN
          </h2>
          <div className="w-10 h-[1px] bg-gold-500/50"></div>
        </div>

      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        styles={{ container: { backgroundColor: "rgba(0, 0, 0, 0.95)" } }}
      />
    </>
  );
}
