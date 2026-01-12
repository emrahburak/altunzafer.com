// Layout ve Sayfalar
import { useEffect } from "react";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Privacy from "./pages/Privacy";
import ScrollToTop from "./utils/ScrollToTop";
import { Route, Routes } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function App() {

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const currentTitle = t('metadata.title');

    // Eğer t fonksiyonu henüz çeviriyi yükleyemediyse 'metadata.title' string'ini döner.
    // Bu durumda başlığı güncelleme, bekle.
    if (currentTitle && currentTitle !== 'metadata.title') {
      document.title = currentTitle;

      // Meta Description Güncelleme
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', t('metadata.description'));
      }

      // Open Graph Başlığı Güncelleme
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', t('metadata.title'));
      }
    }

    // HTML lang özniteliğini her zaman güncelle
    document.documentElement.lang = i18n.language;

  }, [i18n.language, t]); // i18n.language veya t değiştiğinde çalışır

  return (
    <>
      {/* Sayfa değişiminde scroll'u sıfırla */}
      <ScrollToTop />

      <Routes>
        {/* ÇERÇEVE (Layout) */}
        <Route path="/" element={<MainLayout />}>

          {/* ANA SAYFA (altunzafer.com/) */}
          <Route index element={<Home />} />

          {/* GİZLİLİK (altunzafer.com/privacy) */}
          <Route path="privacy" element={<Privacy />} />

          {/* 404 Sayfası (Opsiyonel - İleride ekleriz) */}
          <Route path="*" element={<div className="h-screen flex items-center justify-center text-gold-500">Sayfa Bulunamadı</div>} />

        </Route>
      </Routes>
    </>
  );
}
