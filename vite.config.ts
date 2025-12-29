import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer"; // Opsiyonel: Build boyutunu görmek için
import compression from "vite-plugin-compression"; // Dosyaları sıkıştırmak için

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Build bittiğinde dosyaların boyutunu sıkıştırır (.gz ve .br oluşturur)
    compression({
      algorithm: "gzip",
      ext: ".gz",
    }),
    compression({
      algorithm: "brotliCompress",
      ext: ".br",
    }),
    // Hangi paketin ne kadar yer kapladığını görmek için (build sonrası stats.html oluşturur)
    visualizer({ open: false }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  build: {
    // Esbuild minification zaten hızlıdır ama ince ayar yapabiliriz
    minify: "esbuild",
    sourcemap: false, // Prod ortamında kodun haritasına gerek yok (boyutu düşürür)

    rollupOptions: {
      output: {
        // --- MANUAL CHUNKING (Kritik Nokta) ---
        // Büyük kütüphaneleri ana dosyadan ayırıp ayrı paketler yapar
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("gsap")) return "vendor-gsap";
            if (id.includes("yet-another-react-lightbox"))
              return "vendor-lightbox";
            if (id.includes("react-router-dom") || id.includes("react-i18next"))
              return "vendor-core";
            return "vendor"; // Diğer tüm kütüphaneler
          }
        },
        // Dosya isimlerine versiyon ekleyerek cache (önbellek) sorunlarını önler
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
      },
    },
    // Uyarı limitini biraz esnetebiliriz (Manual chunking sonrası genellikle gerekmez)
    chunkSizeWarningLimit: 800,
  },
});
