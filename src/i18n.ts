import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Çeviri dosyalarımızı import ediyoruz
import tr from "./locales/tr.json";
import en from "./locales/en.json";

i18n
  // Tarayıcı dilini algıla (Örn: Kullanıcı Hollanda'dan giriyorsa EN açılabilir)
  .use(LanguageDetector)
  // React ile bağla
  .use(initReactI18next)
  .init({
    resources: {
      tr: { translation: tr },
      en: { translation: en },
    },
    fallbackLng: "tr", // Dil algılanamazsa varsayılan dil TR olsun
    interpolation: {
      escapeValue: false, // React zaten XSS koruması yapar
    },
  });

export default i18n;
