import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// 1. i18n Hook'unu çağırıyoruz
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollToPlugin);

export default function Navbar() {
  // 2. Çeviri fonksiyonunu (t) ve dil objesini (i18n) alıyoruz
  const { t, i18n } = useTranslation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- DİL DEĞİŞTİRME FONKSİYONU ---
  const toggleLanguage = () => {
    const currentLang = i18n.language;
    const nextLang = currentLang === "tr" ? "en" : "tr";
    i18n.changeLanguage(nextLang);
  };

  const handleNavigation = (sectionId: string) => {
    if (location.pathname === "/") {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: `#${sectionId}`, offsetY: 80 },
        ease: "power2.out"
      });
    } else {
      navigate("/");
    }
    setIsMobileMenuOpen(false);
  };

  // 3. Linkleri 't' fonksiyonu ile sarıyoruz
  // Not: Artık bu array component render olduğunda hesaplanacak
  const navLinks = [
    { id: "hero", label: t("navbar.home") },
    { id: "biography", label: t("navbar.biography") },
    { id: "career", label: t("navbar.career") },
    { id: "awards", label: t("navbar.awards") },
    { id: "contact", label: t("navbar.contact") },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-[#0a0a0a]/90 backdrop-blur-md py-4 shadow-lg" : "bg-transparent py-6"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">

        <Link to="/" className="text-2xl font-bold font-royal-1 tracking-wider text-white z-50">
          ZAFER <span className="text-gold-500">ALTUN</span>
        </Link>

        {/* --- DESKTOP MENU --- */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavigation(link.id)}
              className="text-sm uppercase tracking-[0.2em] text-gray-300 hover:text-gold-500 transition-colors font-light"
            >
              {link.label}
            </button>
          ))}

          {/* --- DİL DEĞİŞTİRME BUTONU (DESKTOP) --- */}
          <div className="flex items-center gap-2 ml-4 border-l border-gray-700 pl-6">
            <button
              onClick={() => i18n.changeLanguage('tr')}
              className={`text-xs font-bold transition-colors ${i18n.language === 'tr' ? 'text-gold-500' : 'text-gray-500 hover:text-white'}`}
            >
              TR
            </button>
            <span className="text-gray-600">|</span>
            <button
              onClick={() => i18n.changeLanguage('en')}
              className={`text-xs font-bold transition-colors ${i18n.language === 'en' ? 'text-gold-500' : 'text-gray-500 hover:text-white'}`}
            >
              EN
            </button>
          </div>
        </div>

        {/* --- MOBILE TOGGLE --- */}
        <div className="md:hidden flex items-center gap-4">
          {/* Mobilde de dil değişimi olsun */}
          <button
            onClick={toggleLanguage}
            className="text-gold-500 font-bold text-sm border border-gold-500/30 px-2 py-1 rounded"
          >
            {i18n.language.toUpperCase()}
          </button>

          <button
            className="text-white z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? t("navbar.close") : t("navbar.menu")}
          </button>
        </div>
      </div>

      {/* --- MOBILE MENU OVERLAY --- */}
      {isMobileMenuOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-[#0a0a0a] flex flex-col items-center justify-center gap-8 md:hidden z-40">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavigation(link.id)}
              className="text-2xl uppercase tracking-widest text-white hover:text-gold-500 font-royal-7"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
