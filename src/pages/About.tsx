import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t, i18n } = useTranslation();

  return (
    <>
      <Helmet key={i18n.language}>
        <html lang={i18n.language} />
        <title>{t("about.title")} | Zafer Altun</title>
        <meta name="description" content={t("about.description")} />
      </Helmet>

      <section className="pt-32 pb-20 px-6 md:px-24 min-h-screen bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-royal-7 text-gold-500 mb-8">
            {t("about.title")}
          </h1>

          <div className="space-y-8 text-gray-400 font-fluid-2 font-light leading-relaxed">
            <p>{t("about.intro")}</p>

            <h2 className="text-2xl text-white font-royal-1 mt-8 mb-4">
              {t("biography.title")}
            </h2>
            <p>{t("about.background")}</p>

            <h2 className="text-2xl text-white font-royal-1 mt-8 mb-4">
              {t("career.sectionTitle.cinema")}
            </h2>
            <p>{t("about.career")}</p>

            <h2 className="text-2xl text-white font-royal-1 mt-8 mb-4">
              {t("career.sectionTitle.production")}
            </h2>
            <p>{t("about.international")}</p>

            <h2 className="text-2xl text-white font-royal-1 mt-8 mb-4">
              {t("biography.instructorTitle")}
            </h2>
            <p>{t("about.education")}</p>

            <p>{t("about.approach")}</p>
          </div>
        </div>
      </section>
    </>
  );
}
