// Central CDN base URL for all static media assets
export const CDN_BASE_URL = "https://cdn.altunzafer.com";

// Generate a full CDN URL for an image stored under /images
export const cdnImage = (filename: string): string => `${CDN_BASE_URL}/images/${filename}`;
