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
    <>
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
            {/* --- İLETİŞİM BİLGİLERİ (GSM & MANAGEMENT) --- */}
            <div>
              <h4 className="contact-anim text-gold-500 text-sm uppercase tracking-widest mb-4">
                {t('contact.gsm')}
              </h4>
              <div className="mb-4">
                <a href="tel:+905053743810" className="contact-anim text-white text-2xl hover:text-gold-500 transition-colors">
                  +90 505 374 38 10
                </a>
              </div>

              {/* MANAGEMENT INSTAGRAM */}
              <div className="contact-anim mb-8">
                <a
                  href="https://www.instagram.com/fatosyilmazmanagement/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gray-500 hover:text-gold-500 transition-colors group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:scale-110 transition-transform"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  <span className="text-xs tracking-wider uppercase font-medium">Fatoş Yılmaz Management</span>
                </a>
              </div>

              {/* CV İNDİRME BUTONU */}
              <div className="contact-anim">
                <a
                  href="/zafer-altun-cv.pdf"
                  download="zafer-altun-cv.pdf"
                  className="inline-block px-8 py-3 border border-gold-600 text-gold-500 text-sm uppercase tracking-widest hover:bg-gold-500 hover:text-black transition-all"
                >
                  {t('contact.downloadCV')}
                </a>
              </div>
            </div>

            {/* --- E-POSTA ve KURUMSAL --- */}
            <div>
              <h4 className="contact-anim text-sm uppercase tracking-widest mb-4 text-gold-500">
                {t('contact.email')}
              </h4>

              <a
                href="mailto:info@altunzafer.com"
                className="contact-anim text-2xl text-white transition-colors block mb-4 hover:text-gold-500"
              >
                info@altunzafer.com
              </a>

              {/* ACTOR INSTAGRAM */}
              <div className="contact-anim mb-8">
                <a
                  href="https://www.instagram.com/altunzafer/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gray-500 hover:text-gold-500 transition-colors group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:scale-110 transition-transform"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  <span className="text-xs tracking-wider uppercase font-medium">@altunzafer</span>
                </a>
              </div>

              {/* Şirket Bilgisi */}
              <p className="contact-anim text-white text-sm leading-relaxed mb-6">
                {t('contact.founder')}<br />
                {t('contact.locations')}
              </p>

              {/* Gizlilik Linki */}
              <div className="contact-anim">
                <Link
                  to="/privacy"
                  className="text-xs text-gray-500 hover:text-gold-500 transition-colors border-b border-gray-800 pb-1"
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
    </>
  );
}
