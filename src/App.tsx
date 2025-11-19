import altunLogo from "./assets/images/webp/altun-02.webp";

export default function App() {
  return (
    <div
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(to right, #aa4b6b, #6b6b83, #3b8d99)`,
      }}
    >
      {/* POLYGON OVERLAY */}
      <div
        className="absolute inset-0 pointer-events-none z-50 opacity-30"
        style={{
          clipPath: "polygon(0 0, 37% 0, 55% 100%, 0% 100%)",
          backgroundColor: "rgba(50, 50, 50, 0.85)",
          mixBlendMode: "overlay",
        }}
      ></div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-5">
        <h1 className="mt-8 text-3xl font-semibold text-white text-center">
          Zafer Altun
        </h1>

        <img
          src={altunLogo}
          alt="altunzafer logo"
          className="select-none"
          style={{
            width: "300px",
            maxWidth: "80%",
            mixBlendMode: "screen",
            filter: "drop-shadow(0 0 15px rgba(255,255,255,0.2)) blur(0.5px)", // blur azaltıldı
            WebkitMaskImage: "radial-gradient(circle, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)",
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            WebkitMaskSize: "cover",
            maskImage: "radial-gradient(circle, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)",
            maskRepeat: "no-repeat",
            maskPosition: "center",
            maskSize: "cover",
          }}
        />
        <h1 className="mt-8 text-3xl font-semibold text-white text-center">
          Sitemiz Yakında Hizmete Geçecektir
        </h1>
      </div>
    </div>
  );
}

