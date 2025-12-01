import { Helmet } from "react-helmet-async";

export default function Privacy() {
  return (
    <>
      <Helmet>
        <title>Gizlilik Politikası | Zafer Altun</title>
        <meta name="robots" content="noindex" /> {/* Google'ın bu sayfayı indexlemesine gerek yok */}
      </Helmet>

      <section className="pt-32 pb-20 px-6 md:px-24 min-h-screen bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-royal-7 text-gold-500 mb-8">Gizlilik Politikası</h1>

          <div className="space-y-6 text-gray-400 font-fluid-2 font-light leading-relaxed">
            <p>Son Güncelleme: {new Date().toLocaleDateString()}</p>

            <h2 className="text-2xl text-white font-royal-1 mt-8 mb-4">1. Genel Bakış</h2>
            <p>
              Zafer Altun ("Biz") olarak, gizliliğinize önem veriyoruz. Bu Gizlilik Politikası,
              web sitemizi (altunzafer.com) ziyaret ettiğinizde bilgilerinizin nasıl toplandığını açıklar.
            </p>

            <h2 className="text-2xl text-white font-royal-1 mt-8 mb-4">2. Toplanan Veriler</h2>
            <p>
              Sitemiz üzerinden herhangi bir üyelik sistemi bulunmamakta olup, sadece iletişim formu
              aracılığıyla gönderdiğiniz (Ad, E-posta, Mesaj) bilgiler, size geri dönüş sağlamak
              amacıyla saklanmaktadır.
            </p>

            {/* Buraya detaylı hukuki metinler gelecek */}
          </div>
        </div>
      </section>
    </>
  );
}
