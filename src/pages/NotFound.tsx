import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t("notFound.title")} | Zafer Altun</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <section className="pt-32 pb-20 px-6 md:px-24 min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center">
          {/* Arka planda büyük, transparan 404 efekti */}
          <h1 className="text-8xl md:text-[15rem] font-royal-7 text-gold-500 opacity-10 leading-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
            404
          </h1>

          <div className="relative z-10 space-y-8">
            <h2 className="text-3xl md:text-5xl text-white font-royal-1 tracking-tight">
              {t("notFound.heading")}
            </h2>

            <p className="max-w-lg mx-auto text-gray-400 font-fluid-2 font-light text-lg leading-relaxed">
              {t("notFound.description")}
            </p>

            <div className="pt-8">
              <Link
                to="/"
                className="inline-block px-10 py-4 border border-gold-500 text-gold-500 font-royal-1 text-sm tracking-[0.2em] hover:bg-gold-500 hover:text-black transition-all duration-500 ease-in-out"
              >
                {t("notFound.button")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
