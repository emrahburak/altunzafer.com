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
    // 1. Sayfa Başlığını Güncelle
    document.title = t('metadata.title');

    // 2. Meta Description'ı Güncelle
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t('metadata.description'));
    }

    // 3. HTML 'lang' özniteliğini güncelle
    document.documentElement.lang = i18n.language;

    // 4. Open Graph Başlığını da güncelleyelim (Sosyal medya paylaşımları için bonus)
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', t('metadata.title'));
    }
  }, [i18n.language, t]);

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
