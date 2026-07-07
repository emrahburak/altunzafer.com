import { lazy, Suspense } from 'react';

import { Helmet } from "react-helmet-async";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import Awards from "../components/Awards";
import Contact from "../components/Contact";

// --- GSAP MERKEZİ KAYIT ---
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MobileAwards from '@/components/MobileAwards';
import { useTranslation } from 'react-i18next';
import Career from '@/components/MvpCareer';

// 1. Eklentiyi burada, bileşen dışına kaydediyoruz.
// Böylece Home yüklendiği anda ScrollTrigger tüm uygulama için hazır olur.
gsap.registerPlugin(ScrollTrigger);

const LazyVideos = lazy(() => import('../components/Videos'));

export default function Home() {
  const { t, i18n } = useTranslation();
  return (
    <>
      {/* SEO AYARLARI */}
      <Helmet key={i18n.language}>
        {/* Dil ayarı */}
        <html lang={i18n.language} />

        {/* --- TEMEL SEO --- */}
        <title>{t('metadata.title')}</title>
        <meta name="description" content={t('metadata.description')} />
        <meta name="keywords" content={t('metadata.keywords')} />

        {/* --- OPEN GRAPH --- */}
        <meta property="og:title" content={t('metadata.ogTitle')} />
        <meta property="og:description" content={t('metadata.ogDescription')} />

        {/* --- TWITTER --- */}
        <meta name="twitter:title" content={t('metadata.ogTitle')} />
        <meta name="twitter:description" content={t('metadata.ogDescription')} />

        <link rel="canonical" href="https://www.altunzafer.com/" />
      </Helmet>

      {/* SAYFA İÇERİĞİ */}
      <div id="hero">
        <Hero />
      </div>

      <section id="biography">
        <Biography />
      </section>

      {/* --- KARİYER BÖLÜMÜ --- */}
      {/* Tabletler (iPad Air/Pro) dahil MOBİL versiyonu görsün diye breakpoint 'xl' (1280px) yapıldı */}
      <section id="career">
        <Career />
      </section>

      {/* --- ÖDÜLLER BÖLÜMÜ --- */}
      {/* Tabletler (iPad Air/Pro) dahil MOBİL versiyonu görsün diye breakpoint 'xl' (1280px) yapıldı */}
      <section id="awards">

        <div className="hidden xl:block">
          <Awards />
        </div>

        <div className="xl:hidden">
          <MobileAwards />
        </div>

      </section>

      {/* --- VIDEO BÖLÜMÜ (LAZY LOADED) --- */}
      <section id="showreel">
        <Suspense fallback={
          <div className="w-full h-screen flex items-center justify-center bg-black/90 text-white font-royal-7 tracking-widest">
            Yükleniyor...
          </div>
        }>
          <LazyVideos />
        </Suspense>
      </section>

      <section id="contact">
        <Contact />
      </section>
    </>
  );
}
