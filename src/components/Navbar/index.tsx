
import React from "react";

export default function Navbar(): React.JSX.Element {

  // TypeScript: Parametre tipini belirtiyoruz
  const scrollToSection = (id: string): void => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 z-50 w-full px-6 py-6 md:px-12 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-[2px]">
      <div className="flex items-center justify-between">
        <div
          onClick={() => scrollToSection('hero')}
          className="text-xl font-bold tracking-widest text-gold-500 uppercase cursor-pointer select-none font-royal-6"
        >
          ZAFER ALTUN
        </div>

        <ul className="hidden space-x-8 text-sm font-semibold tracking-wide text-white/80 md:flex font-geometric">
          <li onClick={() => scrollToSection('biography')} className="cursor-pointer hover:text-white transition-colors">Biyografi</li>
          <li onClick={() => scrollToSection('career')} className="cursor-pointer hover:text-white transition-colors">Kariyer</li>
          <li onClick={() => scrollToSection('awards')} className="cursor-pointer hover:text-white transition-colors">Ödüller</li>
          <li onClick={() => scrollToSection('contact')} className="cursor-pointer hover:text-white transition-colors">İletişim</li>
        </ul>

        {/* Mobil ikon */}
        <div className="md:hidden text-white cursor-pointer">MENU</div>
      </div>
    </nav>
  );
}
