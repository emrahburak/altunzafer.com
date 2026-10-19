import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

export default function Privacy() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t("privacy.metaTitle")}</title>
        <meta name="description" content={t("privacy.metaDescription")} />
        <meta name="robots" content="noindex" />
      </Helmet>

      <section className="pt-32 pb-20 px-6 md:px-24 min-h-screen bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-royal-7 text-gold-500 mb-8">
            {t("privacy.title")}
          </h1>

          <div className="space-y-6 text-gray-400 font-fluid-2 font-light leading-relaxed">
            <p>
              {t("privacy.lastUpdated")}: {new Date().toLocaleDateString()}
            </p>

            <h2 className="text-2xl text-white font-royal-1 mt-8 mb-4">
              {t("privacy.overview.title")}
            </h2>
            <p>{t("privacy.overview.content")}</p>

            <h2 className="text-2xl text-white font-royal-1 mt-8 mb-4">
              {t("privacy.collectedData.title")}
            </h2>
            <p>{t("privacy.collectedData.content")}</p>

            <h2 className="text-2xl text-white font-royal-1 mt-8 mb-4">
              {t("privacy.usage.title")}
            </h2>
            <p>{t("privacy.usage.content")}</p>

            <h2 className="text-2xl text-white font-royal-1 mt-8 mb-4">
              {t("privacy.cookies.title")}
            </h2>
            <p>{t("privacy.cookies.content")}</p>

            <h2 className="text-2xl text-white font-royal-1 mt-8 mb-4">
              {t("privacy.retention.title")}
            </h2>
            <p>{t("privacy.retention.content")}</p>

            <h2 className="text-2xl text-white font-royal-1 mt-8 mb-4">
              {t("privacy.thirdParties.title")}
            </h2>
            <p>{t("privacy.thirdParties.content")}</p>

            <h2 className="text-2xl text-white font-royal-1 mt-8 mb-4">
              {t("privacy.rights.title")}
            </h2>
            <p>{t("privacy.rights.content")}</p>

            <h2 className="text-2xl text-white font-royal-1 mt-8 mb-4">
              {t("privacy.contact.title")}
            </h2>
            <p>{t("privacy.contact.content")}</p>
          </div>
        </div>
      </section>
    </>
  );
}
