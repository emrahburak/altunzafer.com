import React from "react";
interface Project {
  year: string;
  title: string;
  role: string;
  note: string;
}

export default function Career(): React.JSX.Element {
  // Veri setini interface ile güvenli hale getiriyoruz
  const projects: Project[] = [
    { year: "2024", title: "Kayıtsız", role: "Sinema Filmi", note: "Los Angeles Best Film Award [cite: 62]" },
    { year: "2024", title: "Karadeniz Müzikali", role: "Tiyatro (Rotterdam)", note: "Başrol [cite: 43]" },
    { year: "2022", title: "Üç Kuruş", role: "TV Dizisi", note: "Show TV [cite: 104]" },
    { year: "2017", title: "İsimsizler", role: "TV Dizisi", note: "Kanal D [cite: 107]" },
    { year: "2014", title: "Keşanlı Ali Destanı", role: "Tiyatro", note: "Sadri Alışık Tiyatrosu [cite: 44]" },
    { year: "2010", title: "Pir Sultan Abdal", role: "Tiyatro", note: "Avrupa Turnesi [cite: 75]" },
  ];

  return (
    <section className="min-h-screen py-20 px-6 md:px-24 bg-[#0a0a0a] flex flex-col justify-center">
      <h2 className="text-4xl md:text-6xl font-bold text-white mb-16 text-right border-r-4 border-gray-700 pr-6">
        Seçilmiş Projeler
      </h2>

      <div className="grid gap-8 max-w-5xl ml-auto">
        {projects.map((item, index) => (
          <div key={index} className="group flex flex-col md:flex-row md:items-end justify-between border-b border-gray-800 pb-4 hover:border-white transition-colors duration-500">
            <div>
              <span className="text-xs text-gray-500 block mb-1">{item.year}</span>
              <h3 className="text-2xl md:text-4xl font-light text-white group-hover:pl-4 transition-all">{item.title}</h3>
            </div>
            <div className="text-right mt-2 md:mt-0">
              <span className="block text-gray-400 text-sm uppercase tracking-wider">{item.role}</span>
              <span className="text-xs text-gray-600">{item.note}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-right">
        <p className="text-gray-500 text-sm">ve daha fazlası...</p>
      </div>
    </section>
  );
}
