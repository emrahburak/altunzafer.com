import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

export default function ContactPage() {
  const { t, i18n } = useTranslation();

  return (
    <>
      <Helmet>
        <html lang={i18n.language} />
        <title>{t("contactPage.title")} | Zafer Altun</title>
        <meta name="description" content={t("contactPage.description")} />
      </Helmet>

      <section className="pt-32 pb-20 px-6 md:px-24 min-h-screen bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-royal-7 text-gold-500 mb-8">
            {t("contactPage.title")}
          </h1>

          <div className="space-y-8 text-gray-400 font-fluid-2 font-light leading-relaxed">
            <p className="text-lg text-white/90">
              {t("contactPage.intro")}
            </p>

            <div className="grid md:grid-cols-2 gap-8 pt-4">
              {/* Management */}
              <div className="space-y-3">
                <h2 className="text-xl font-royal-1 text-gold-500 uppercase tracking-wider">
                  {t("contactPage.managementTitle")}
                </h2>
                <p>{t("contactPage.managementDescription")}</p>
                <a
                  href="https://www.instagram.com/fatosyilmazmanagement/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white hover:text-gold-500 transition-colors"
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
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  <span className="text-sm tracking-wider uppercase font-medium">Fatoş Yılmaz Management</span>
                </a>
              </div>

              {/* Direct Contact */}
              <div className="space-y-3">
                <h2 className="text-xl font-royal-1 text-gold-500 uppercase tracking-wider">
                  {t("contactPage.directTitle")}
                </h2>
                <p>{t("contactPage.directDescription")}</p>
                <a
                  href="tel:+905053743810"
                  className="block text-2xl text-white hover:text-gold-500 transition-colors"
                >
                  +90 505 374 38 10
                </a>
                <a
                  href="mailto:info@altunzafer.com"
                  className="block text-lg text-white hover:text-gold-500 transition-colors"
                >
                  info@altunzafer.com
                </a>
              </div>
            </div>

            {/* Professional */}
            <div className="space-y-3 pt-4 border-t border-gray-800">
              <h2 className="text-xl font-royal-1 text-gold-500 uppercase tracking-wider">
                {t("contactPage.professionalTitle")}
              </h2>
              <p>{t("contactPage.professionalDescription")}</p>
              <a
                href="https://timerightproduction.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-white hover:text-gold-500 transition-colors uppercase tracking-widest text-sm font-medium"
              >
                TIME RIGHT PRODUCTION
              </a>
              <p className="text-sm text-gray-500">
                {t("contactPage.locations")}
              </p>
            </div>

            {/* Social */}
            <div className="space-y-3 pt-4 border-t border-gray-800">
              <h2 className="text-xl font-royal-1 text-gold-500 uppercase tracking-wider">
                {t("contactPage.socialTitle")}
              </h2>
              <p>{t("contactPage.socialDescription")}</p>
              <a
                href="https://www.instagram.com/altunzafer/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white hover:text-gold-500 transition-colors"
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
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span className="text-sm tracking-wider uppercase font-medium">@altunzafer</span>
              </a>
            </div>

            {/* CV */}
            <div className="pt-4 border-t border-gray-800">
              <a
                href="/zafer-altun-cv.pdf"
                download="zafer-altun-cv.pdf"
                className="inline-block px-8 py-3 border border-gold-600 text-gold-500 text-sm uppercase tracking-widest hover:bg-gold-500 hover:text-black transition-all"
              >
                {t("contactPage.downloadCV")}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
