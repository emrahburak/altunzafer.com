import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar"; // Yolunu projene göre ayarla
// import Footer from "../components/Footer"; // Henüz yoksa yorum satırı kalsın

export default function MainLayout() {
  return (
    <main className="w-full bg-[#0a0a0a] text-gray-200 selection:bg-red-900 selection:text-white min-h-screen flex flex-col">
      {/* Navbar her sayfada sabit */}
      <Navbar />

      {/* Değişen İçerik Buraya Gelecek (Home, Privacy vb.) */}
      <div className="flex-grow">
        <Outlet />
      </div>
      {/* Footer her sayfada sabit */}
      {/* <Footer /> */}
    </main>
  );
}
