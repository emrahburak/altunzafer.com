import React from "react";
import heroImage from "@/assets/images/webp/altun-01.webp"; // Path alias (@) yoksa "../" kullanın

export default function Hero(): React.JSX.Element {
  return (
    <section className="relative flex h-screen w-full items-center bg-[#0a0a0a] overflow-hidden">

      {/* SOL: Metin */}
      <div className="z-10 flex h-full w-full flex-col justify-center px-6 md:w-1/2 md:pl-24">
        <h2 className="mb-4 text-sm font-light tracking-[0.5em] text-gray-400">
          OYUNCU & YÖNETMEN
        </h2>
        <h1 className="text-8xl font-bold leading-none text-white md:text-8xl font-royal-1">
          Zafer <br />
          <span className="text-gray-600">Altun</span>
        </h1>
        <p className="mt-8 max-w-md text-gray-400 font-light leading-relaxed">
          Sahne, ekran ve eğitimde uluslararası bir kariyer[cite: 24].
        </p>
      </div>

      {/* SAĞ: Görsel */}
      <div className="absolute top-0 right-0 h-full w-full md:relative md:w-1/2">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-transparent z-10" />
        <img
          src={heroImage}
          alt="Zafer Altun"
          className="h-full w-full object-cover object-top opacity-60 md:opacity-100"
        />
      </div>
    </section>
  );
}
