
export default function Navbar() {
  return (
    // 'absolute' ve 'z-50' ile Hero'nun üzerine yapışır.
    // 'w-full' ile genişliği kaplar.
    <nav className="absolute top-0 left-0 z-50 w-full px-6 py-6 md:px-12">
      <div className="flex items-center justify-between">
        {/* LOGO / İSİM (Sol Üst) */}
        <div className="text-xl font-bold tracking-widest text-white uppercase mix-blend-difference">
          ZAFER ALTUN
        </div>

        {/* MENU (Sağ Üst) - Masaüstü */}
        <ul className="hidden space-x-8 text-sm font-medium tracking-wide text-white/80 md:flex">
          <li className="cursor-pointer transition-colors hover:text-white">Biyografi</li>
          <li className="cursor-pointer transition-colors hover:text-white">Showreel</li>
          <li className="cursor-pointer transition-colors hover:text-white">Galeri</li>
          <li className="cursor-pointer transition-colors hover:text-white">İletişim</li>
        </ul>

        {/* MOBİL MENU İKONU (Hamburger - Basit Çizim) */}
        <div className="flex flex-col gap-1.5 cursor-pointer md:hidden">
          <span className="block h-0.5 w-6 bg-white"></span>
          <span className="block h-0.5 w-4 ml-auto bg-white"></span>
        </div>
      </div>
    </nav>
  );
}
