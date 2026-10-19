import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar"; // Yolunu projene göre ayarla

/**
 * Organization JSON-LD structured data for Time Right Production.
 * Values are taken only from verified information already present on the site:
 * - Organization name: Time Right Production (Contact section / locales)
 * - Phone: +90 505 374 38 10 (Contact section tel link)
 * - Email: info@altunzafer.com (Contact section mailto link)
 * - Locations: Istanbul / Switzerland / Netherlands (Contact section locales)
 * - Website / logo / social links: index.html and Contact section
 */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Time Right Production",
  url: "https://www.altunzafer.com/",
  logo: "https://www.altunzafer.com/og-image.png",
  sameAs: [
    "https://timerightproduction.org/",
    "https://www.instagram.com/altunzafer/",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+90-505-374-3810",
    email: "info@altunzafer.com",
    contactType: "management",
    availableLanguage: ["Turkish", "English"],
  },
  address: [
    {
      "@type": "PostalAddress",
      addressLocality: "Istanbul",
      addressCountry: "TR",
    },
    {
      "@type": "PostalAddress",
      addressCountry: "CH",
    },
    {
      "@type": "PostalAddress",
      addressCountry: "NL",
    },
  ],
} as const;

const organizationJsonLd = JSON.stringify(organizationSchema);

export default function MainLayout() {
  return (
    <>
      <Helmet>
        <script type="application/ld+json">{organizationJsonLd}</script>
      </Helmet>

      <main className="w-full bg-dark-bg  min-h-screen flex flex-col">
        {/* Navbar her sayfada sabit */}
        <Navbar />

        {/* Değişen İçerik Buraya Gelecek (Home, Privacy vb.) */}
        <div className="grow">
          <Outlet />
        </div>
      </main>
    </>
  );
}
