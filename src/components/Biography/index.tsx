export default function Biography() {
  return (
    <section className="min-h-screen flex flex-col justify-center py-20 px-6 md:px-24 bg-[#0f0f0f]">
      <div className="max-w-4xl">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-10 border-l-4 border-red-800 pl-6 font-royal-1">
          Biyografi
        </h2>

        <div className="space-y-6 text-lg font-light text-gray-300 leading-relaxed font-fluid-2">
          <p>
            1980 yılında Bursa'da doğdu. 2001 yılında girdiği Selçuk Üniversitesi Devlet Konservatuvarı Tiyatro Oyunculuk Bölümü'nden 2005 yılında mezun oldu[cite: 14, 16].
          </p>
          <p>
            Kariyerine Bursa Devlet Tiyatrosu'nda başladı ve "Çok Orijinal Bir Oyun" adlı performansı ile Direklerarası Lions Kerem Yılmazer Genç Yetenek Ödülü'ne layık görüldü. 2009'dan itibaren kariyerine İstanbul'da devam ederek Sadri Alışık Tiyatrosu ve Duru Tiyatro gibi köklü sahnelerde yer aldı[cite: 18].
          </p>
          <p>
            Uluslararası alanda İsviçre ve Hollanda merkezli projelerde yönetmen, oyuncu ve yapımcı olarak çalışmalarını sürdürmektedir. 2018 yılında "Kompass Group Media"nın kültür sanat temsilciliğini üstlenmiş, 2020 yılında ise kendi yapım şirketi "Time Right Production"ı kurmuştur[cite: 21, 22].
          </p>
        </div>

        {/* Yetenekler Kısmı - CV'den [cite: 35-40] */}
        <div className="mt-12">
          <h3 className="text-xl text-white mb-4 font-semibold">Özel Beceriler</h3>
          <div className="flex flex-wrap gap-3">
            {["Perküsyon", "At Biniciliği", "Kılıç & Pala Kullanımı", "İleri Sürüş Teknikleri"].map((skill, i) => (
              <span key={i} className="px-4 py-2 border border-gray-700 rounded-full text-sm text-gray-400 hover:border-white hover:text-white transition-colors cursor-default">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
