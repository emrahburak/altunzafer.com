import { Helmet } from "react-helmet-async";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import Career from "../components/Career";
import Awards from "../components/Awards";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <>
      {/* SEO AYARLARI BURADA YAPILIR */}
      <Helmet>
        <title>Zafer Altun | Actor & Director</title>
        <meta name="description" content="Zafer Altun'un resmi portfolyo sitesi. Tiyatro, Sinema, Yönetmenlik ve Time Right Production projeleri." />
        <link rel="canonical" href="https://altunzafer.com/" />
      </Helmet>

      {/* SAYFA İÇERİĞİ */}
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
    </>
  );
}
