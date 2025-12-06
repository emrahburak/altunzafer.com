import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full">
      <div className="border-t border-white/10 mt-12 pt-8 pb-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 gap-4">

        {/* Sol: Telif Hakkı */}
        <span className="tracking-wide">
          &copy; {currentYear} Zafer Altun. {t('footer.rights')}
        </span>

        {/* Sağ: Geliştirici İmzası */}
        {/* Burayı kendine göre düzenle: Boncuk, Adın Soyadın veya Markan */}
        <div className="flex items-center gap-1">
          <span>Developed by</span>
          <a
            href="https://github.com/emrahburak" // Kendi linkini buraya koy
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gold-500 transition-colors font-medium border-b border-transparent hover:border-gold-500"
          >
            emrahburak
          </a>
        </div>
      </div>
    </footer>
  );
}
