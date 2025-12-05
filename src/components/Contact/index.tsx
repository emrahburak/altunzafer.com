import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Footer from "../Footer";

export default function Contact() {
  const { t } = useTranslation();
  const containerRef = useRef(null);

  useGSAP(() => {
    // Biography'deki mantığın aynısı
    // ".contact-anim" sınıfına sahip tüm elementleri seçer
    const elements = gsap.utils.toArray<HTMLElement>(".contact-anim");

    gsap.from(elements, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%", // Biraz daha erken başlasın
        toggleActions: "play none none reverse",
      },
      y: 40, // Aşağıdan yukarı mesafe
      opacity: 0,
      duration: 0.8,
      stagger: 0.1, // Her satır arası 0.1sn gecikme (Akışkanlık)
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
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-10 border-l-4 border-gold-500 pl-6 font-royal-7">

          {t('contact.title')}
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* --- MENAJERLİK --- */}
          <div>
            <h4 className="contact-anim text-gray-500 text-sm uppercase tracking-widest mb-4">
              {t('contact.management')}
            </h4>
            {/* Kişi 1 */}
            <div className="mb-6">
              <p className="contact-anim text-white text-lg">Aslı Bankoğlu</p>
              <div className="contact-anim">
                <a href="tel:+905323614347" className="text-gray-400 hover:text-white transition-colors">
                  +90 532 361 43 47
                </a>
              </div>
            </div>

            {/* Kişi 2 */}
            <div>
              <p className="contact-anim text-white text-lg">Fatoş Yılmaz</p>
              <div className="contact-anim">
                <a href="tel:+905327726506" className="text-gray-400 hover:text-white transition-colors">
                  +90 532 772 65 06
                </a>
              </div>
            </div>
          </div>
          {/* --- E-POSTA --- */}
          <div>
            <h4 className="contact-anim text-gray-500 text-sm uppercase tracking-widest mb-4">
              {t('contact.email')}
            </h4>
            <a
              href="mailto:altunzafer@gmail.com"
              className="contact-anim text-2xl text-white hover:text-red-800 transition-colors block mb-8"
            >
              altunzafer@gmail.com
            </a>
            <p className="contact-anim text-gray-600 text-sm leading-relaxed">
              {t('contact.founder')}<br />
              {t('contact.locations')}
            </p>
          </div>
        </div>
      </div>
      {/* Footer Bileşeni */}
      {/* Footer'ın kendisi de animasyona dahil olsun dersen 'contact-anim' ekleyebilirsin */}
      <div className="contact-anim mt-20">
        <Footer />
      </div>
    </section>
  );
}
