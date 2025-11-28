import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Biography from "./components/Biography";
import Career from "./components/Career";
import Awards from "./components/Awards";
import Contact from "./components/Contact";

export default function App() {
  return (
    <main className="w-full bg-[#0a0a0a] text-gray-200 selection:bg-red-900 selection:text-white">
      <Navbar />
      {/* ID'ler navigasyon (scroll) için gereklidir */}
      <div id="hero">
        <Hero />
      </div>
      <div id="biography">
        <Biography />
      </div>
      <div id="career">
        <Career />
      </div>
      <div id="awards">
        <Awards />
      </div>
      <div id="contact">
        <Contact />
      </div>
    </main>
  );
}
