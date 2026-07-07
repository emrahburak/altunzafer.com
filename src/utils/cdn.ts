// Central CDN base URL for all static media assets.
// Override via VITE_CDN_URL in Vercel dashboard or local .env
const CDN_BASE_URL = import.meta.env.VITE_CDN_URL || "https://cdn.altunzafer.com";

// Generate a full CDN URL for an image stored under /images
export const cdnImage = (filename: string): string => `${CDN_BASE_URL}/images/${filename}`;
