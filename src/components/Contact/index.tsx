import { useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "../Footer";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const { t } = useTranslation();
  const containerRef = useRef(null);

  useGSAP(() => {
    const elements = gsap.utils.toArray<HTMLElement>(".contact-anim");

    gsap.from(elements, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out"
    });

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="contact"
      className="min-h-[60vh] py-20 px-6 md:px-24 bg-black flex flex-col justify-between"
    >
      <div>
        {/* Başlık */}
        <h2 className="contact-anim text-4xl md:text-6xl font-bold text-white mb-10 border-l-4 border-gold-500 pl-6 font-royal-7">
          {t('contact.title')}
        </h2>

        <div className="grid md:grid-cols-2 gap-12">

          {/* --- SOL KOLON: ADRES - GSM - CV İNDİR --- */}
          <div>



            {/* 2. YENİ EKLENEN: GSM BÖLÜMÜ */}
            <div className="mb-10">
              <h4 className="contact-anim text-gold-500 text-sm uppercase tracking-widest mb-2">
                {t('contact.gsm')}
              </h4>
              <div className="contact-anim">
                <a
                  href="tel:+905053743810"
                  className="text-white text-lg hover:text-gold-500 transition-colors inline-block"
                >
                  +90 505 374 38 10
                </a>
              </div>
            </div>

            {/* 3. CV İNDİR BUTONU */}
            <div className="contact-anim">
              <a
                href="/zafer-altun-cv.pdf"
                download="Zafer_Altun_CV.pdf"
                className="group inline-flex items-center gap-3 px-6 py-3 border border-gold-500 text-gold-500 uppercase tracking-widest text-sm font-medium hover:bg-gold-500 hover:text-black transition-all duration-300"
              >
                {/* Download Icon (SVG) */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 group-hover:translate-y-1 transition-transform"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                {t('contact.downloadCV')}
              </a>
            </div>
          </div>

          {/* --- SAĞ KOLON: E-POSTA, SOSYAL & YASAL --- */}
          <div>
            <h4 className="contact-anim text-sm uppercase tracking-widest mb-4 text-gold-500">
              {t('contact.email')}
            </h4>

            <a
              href="mailto:altunzafer@gmail.com"
              className="contact-anim text-2xl text-white transition-colors block mb-8 hover:text-gold-500 break-all"
            >
              altunzafer@gmail.com
            </a>

            {/* --- INSTAGRAM LINKI --- */}
            <div className="contact-anim mb-8">
              <a
                href="https://www.instagram.com/altunzafer/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-500 hover:text-gold-500 transition-colors group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6 group-hover:scale-110 transition-transform"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span className="text-sm tracking-wider uppercase font-medium">Instagram</span>
              </a>
            </div>

            {/* Şirket Bilgisi */}
            <p className="contact-anim text-white text-sm leading-relaxed mb-6">
              {t('contact.founder')}<br />
              {t('contact.locations')}
            </p>

            {/* --- GİZLİLİK LİNKİ --- */}
            <div className="contact-anim">
              <Link
                to="/privacy"
                className="text-xs text-gray-600 hover:text-gold-500 transition-colors border-b border-gray-800 pb-1"
              >
                {t('footer.privacy', 'Gizlilik Politikası ve Kullanım Şartları')}
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* Footer Bileşeni */}
      <div className="contact-anim mt-20">
        <Footer />
      </div>
    </section>
  );
}
