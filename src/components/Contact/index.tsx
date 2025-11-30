export default function Contact() {
  return (
    <section className="min-h-[60vh] py-20 px-6 md:px-24 bg-black flex flex-col justify-between">
      <div>
        <h2 className="text-5xl md:text-7xl font-bold text-white mb-12 font-royal-7">
          İletişim
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h4 className="text-gray-500 text-sm uppercase tracking-widest mb-4">Menajerlik</h4>
            <p className="text-white text-lg">Aslı Bankoğlu</p>
            <p className="text-gray-400">+90 532 361 43 47 [cite: 28]</p>

            <p className="text-white text-lg mt-6">Fatoş Yılmaz</p>
            <p className="text-gray-400">+90 532 772 65 06 [cite: 30]</p>
          </div>

          <div>
            <h4 className="text-gray-500 text-sm uppercase tracking-widest mb-4">E-Posta</h4>
            <a href="mailto:altunzafer@gmail.com" className="text-2xl text-white hover:text-red-500 transition-colors">
              altunzafer@gmail.com
            </a>
            <p className="mt-8 text-gray-600 text-sm">
              Time Right Production Founder<br />
              İstanbul / İsviçre / Hollanda
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-900 mt-20 pt-8 flex justify-between text-xs text-gray-700">
        <span>© 2025 Zafer Altun. Tüm hakları saklıdır.</span>
        <span>Design by Mentor</span>
      </div>
    </section>
  );
}
