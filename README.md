# altunzafer.com

Zafer Altun'un resmi portfolyo web sitesi. Uluslararası oyuncu, yönetmen ve oyunculuk eğitmeni olarak sinema, tiyatro ve prodüksiyon çalışmalarını tanıtır.

## Stack

- [Vite](https://vitejs.dev/) + [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [React Router v7](https://reactrouter.com/)
- [i18next](https://www.i18next.com/) (`tr` / `en`)
- [GSAP](https://gsap.com/) + ScrollTrigger
- [Vercel](https://vercel.com/) üzerinde barındırılır

## Geliştirme

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusu
npm run dev

# Üretim derlemesi
npm run build

# Derlemeyi yerel önizle
npm run preview

# Lint
npm run lint
```

## Proje yapısı

```
src/
  App.tsx              # Rota tanımları
  main.tsx             # Uygulama başlangıcı
  i18n.ts              # i18next yapılandırması
  index.css            # Tailwind v4 girişi ve tema tanımları
  layouts/             # Sayfa çerçeveleri
  pages/               # Sayfa bileşenleri
  components/          # Sayfa bölümleri
  data/                # Statik veri modülleri
  locales/             # Çeviri dosyaları
  scripts/             # Görselleri optimize eden script
public/                # Statik varlıklar
```

## Notlar

- `npm run build` önce TypeScript'i (`tsc -b`) sonra Vite'ı çalıştırır.
- Test çalıştırıcısı yapılandırılmamıştır; doğrulama `lint` ve `build` ile yapılır.
- Görseller `src/assets/images/<kategori>/` altına orijinal formatında konur, ardından `npm run optimizer` ile `webp/` klasörüne dönüştürülür.
