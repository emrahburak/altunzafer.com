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
import MobileCareer from '@/components/MobileCareer';
import MobileAwards from '@/components/MobileAwards';

// 1. Eklentiyi burada, bileşen dışına kaydediyoruz.
// Böylece Home yüklendiği anda ScrollTrigger tüm uygulama için hazır olur.
gsap.registerPlugin(ScrollTrigger);

const LazyVideos = lazy(() => import('../components/Videos'));

export default function Home() {
  return (
    <>
      {/* SEO AYARLARI */}
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

      {/* --- KARİYER BÖLÜMÜ --- */}
      {/* Tabletler (iPad Air/Pro) dahil MOBİL versiyonu görsün diye breakpoint 'xl' (1280px) yapıldı */}
      <div id="career">

        {/* DESKTOP (Sadece XL ve üzeri - Laptop/PC) */}
        <div className="hidden xl:block">
          <Career />
        </div>

        {/* MOBİL & TABLET (XL altı - Telefonlar ve Tabletler) */}
        <div className="xl:hidden">
          <MobileCareer />
        </div>

      </div>

      {/* --- ÖDÜLLER BÖLÜMÜ --- */}
      {/* Tabletler (iPad Air/Pro) dahil MOBİL versiyonu görsün diye breakpoint 'xl' (1280px) yapıldı */}
      <div id="awards">

        <div className="hidden xl:block">
          <Awards />
        </div>

        <div className="xl:hidden">
          <MobileAwards />
        </div>

      </div>

      {/* --- VIDEO BÖLÜMÜ (LAZY LOADED) --- */}
      <div id="showreel">
        <Suspense fallback={
          <div className="w-full h-screen flex items-center justify-center bg-black/90 text-white font-royal-7 tracking-widest">
            Yükleniyor...
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
