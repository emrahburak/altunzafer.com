export default function Awards() {
  return (
    <section className="min-h-[50vh] py-20 px-6 md:px-24 bg-[#0f0f0f] flex flex-col items-center justify-center text-center">
      <h2 className="text-3xl font-light tracking-[0.3em] text-white mb-12 uppercase">
        Başarılar & Ödüller
      </h2>

      <div className="grid md:grid-cols-2 gap-12 max-w-4xl">
        {/* Ödül 1 */}
        <div className="p-8 border border-gray-800 hover:bg-white/5 transition-all">
          <div className="text-4xl mb-4">🏆</div>
          <h3 className="text-xl font-bold text-white mb-2">En İyi Film Ödülü</h3>
          <p className="text-gray-400 text-sm mb-2">"Kayıtsız"</p>
          <p className="text-xs text-gray-600 uppercase tracking-widest">Los Angeles Independent Women Film Awards [2024]</p>
        </div>

        {/* Ödül 2 */}
        <div className="p-8 border border-gray-800 hover:bg-white/5 transition-all">
          <div className="text-4xl mb-4">🎭</div>
          <h3 className="text-xl font-bold text-white mb-2">Genç Yetenek Ödülü</h3>
          <p className="text-gray-400 text-sm mb-2">"Çok Orijinal Bir Oyun"</p>
          <p className="text-xs text-gray-600 uppercase tracking-widest">Direklerarası 9. Lions Ödülleri [2009]</p>
        </div>
      </div>
    </section>
  );
}
