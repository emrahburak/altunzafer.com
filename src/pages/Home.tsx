import { lazy, Suspense } from 'react';

import { Helmet } from "react-helmet-async";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import Career from "../components/Career";
import Awards from "../components/Awards";
import Contact from "../components/Contact";

// --- GSAP MERKEZİ KAYIT ---
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// 1. Eklentiyi burada, bileşen dışına kaydediyoruz.
// Böylece Home yüklendiği anda ScrollTrigger tüm uygulama için hazır olur.
gsap.registerPlugin(ScrollTrigger);

const LazyVideos = lazy(() => import('../components/Videos'));

export default function Home() {
  return (
    <>
      {/* SEO AYARLARI BURADA YAPILIR */}
      <Helmet>
        <title>Zafer Altun | Actor & Director</title>
        <meta name="description" content="Zafer Altun'un resmi portfolyo sitesi. Tiyatro, Sinema, Yönetmenlik ve Time Right Production projeleri." />
        <link rel="canonical" href="https://altunzafer.com/" />
      </Helmet>

      {/* SAYFA İÇERİĞİ */}
      <div id="hero">
        <Hero />
      </div>
      <div id="biography">
        <Biography />
      </div>
      <div id="career">
        <Career />
      </div>
      <div id="awards">
        <Awards />
      </div>
      {/* --- VIDEO BÖLÜMÜ (LAZY LOADED) --- */}
      <div id="videos">
        <Suspense fallback={
          // Kullanıcı scroll ettiğinde, Videos yüklenirken basit bir yükleme animasyonu göster
          <div className="w-full h-screen flex items-center justify-center bg-black/90 text-white">
            Seçme Projeler Yükleniyor...
          </div>
        }>
          <LazyVideos />
        </Suspense>
      </div>
      <div id="contact">
        <Contact />
      </div>
    </>
  );
}
