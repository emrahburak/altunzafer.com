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
import { useTranslation } from 'react-i18next';

// 1. Eklentiyi burada, bileşen dışına kaydediyoruz.
// Böylece Home yüklendiği anda ScrollTrigger tüm uygulama için hazır olur.
gsap.registerPlugin(ScrollTrigger);

const LazyVideos = lazy(() => import('../components/Videos'));

export default function Home() {
  const { t, i18n } = useTranslation();
  return (
    <>
      {/* SEO AYARLARI */}
      <Helmet>
        {/* Dil ayarı */}
        <html lang={i18n.language} />

        {/* --- TEMEL SEO --- */}
        <title>{t('seo.title')}</title>
        <meta name="description" content={t('seo.description')} />
        <meta name="keywords" content={t('seo.keywords')} />

        {/* --- OPEN GRAPH (Facebook / LinkedIn / WhatsApp) --- */}
        <meta property="og:title" content={t('seo.ogTitle')} />
        <meta property="og:description" content={t('seo.ogDescription')} />
        {/* og:image, og:url, og:type INDEX.HTML'de kalacak */}

        {/* --- TWITTER --- */}
        <meta name="twitter:title" content={t('seo.ogTitle')} /> {/* Genelde aynı başlık kullanılır */}
        <meta name="twitter:description" content={t('seo.ogDescription')} />
        {/* twitter:card, twitter:image INDEX.HTML'de kalacak */}

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

        {/* DESKTOP (Sadece XL ve üzeri - Laptop/PC) */}
        <div className="hidden xl:block">
          <Career />
        </div>

        {/* MOBİL & TABLET (XL altı - Telefonlar ve Tabletler) */}
        <div className="xl:hidden">
          <MobileCareer />
        </div>

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
