import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar"; // Yolunu projene göre ayarla

export default function MainLayout() {
  return (
    <main className="w-full bg-dark-bg  min-h-screen flex flex-col">
      {/* Navbar her sayfada sabit */}
      <Navbar />

      {/* Değişen İçerik Buraya Gelecek (Home, Privacy vb.) */}
      <div className="grow">
        <Outlet />
      </div>
    </main>
  );
}
