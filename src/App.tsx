// Layout ve Sayfalar
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Privacy from "./pages/Privacy";
import ScrollToTop from "./utils/ScrollToTop";
import { Route, Routes } from "react-router-dom";

export default function App() {
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
