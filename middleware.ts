/**
 *
 * Vercel Edge Middleware for altunzafer.com
 *
 * Provides HTTP semantics for agents and content negotiation:
 * - Known SPA routes rewrite to index.html.
 * - Unknown paths return a real HTTP 404.
 * - Requests with Accept: text/markdown receive a Markdown body.
 * - Content negotiation on / is marked with Vary: Accept.
 *
 * This file intentionally avoids external middleware helpers so it can be
 * deployed without adding runtime dependencies. Rewrites are performed by
 * fetching the built index.html and forwarding its contents.
 */

// Routes rendered by the React SPA. Everything else is a real 404.
const SPA_ROUTES = new Set(['/', '/privacy', '/about', '/contact']);

const HOME_MARKDOWN = `# Zafer Altun

Uluslararası oyuncu, yönetmen ve oyunculuk eğitmeni Zafer Altun'un resmi portfolyo sitesi.

Zafer Altun; tiyatro, sinema ve dijital platformlarda uluslararası bir kariyere sahip bir sanatçıdır. Time Right Production bünyesinde yönetmenlik ve yapımcılık çalışmaları yürütmekte, aynı zamanda profesyonel oyuncular ve adaylar için kamera önü oyunculuğu, diksiyon, etkili konuşma, çocuk oyunu ve audition teknikleri gibi alanlarda eğitimler vermektedir.

Web sitesi: https://altunzafer.com
`;

const NOT_FOUND_MARKDOWN = `# 404 — Sayfa Bulunamadı

Aradığınız sayfa mevcut değil. Ana sayfaya dönmek için https://altunzafer.com adresini ziyaret edebilirsiniz.
`;

const NOT_FOUND_HTML = `<!doctype html>
<html lang="tr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sayfa Bulunamadı — Zafer Altun</title>
  </head>
  <body>
    <h1>404 — Sayfa Bulunamadı</h1>
    <p>Aradığınız sayfa mevcut değil.</p>
    <p><a href="https://altunzafer.com">Ana sayfaya dön</a></p>
  </body>
</html>
`;

function acceptsMarkdown(request: Request): boolean {
  const accept = request.headers.get('accept') ?? '';
  return accept.includes('text/markdown');
}

function markdownResponse(body: string, status = 200): Response {
  return new Response(body, {
    status,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      Vary: 'Accept',
    },
  });
}

function notFoundHtmlResponse(): Response {
  return new Response(NOT_FOUND_HTML, {
    status: 404,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      Vary: 'Accept',
    },
  });
}

const ERROR_HTML = `<!doctype html>
<html lang="tr">
  <head>
    <meta charset="UTF-8" />
    <title>Hata — Zafer Altun</title>
  </head>
  <body>
    <h1>500 — Sunucu Hatası</h1>
    <p>İsteğiniz işlenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.</p>
  </body>
</html>
`;

function internalErrorResponse(): Response {
  return new Response(ERROR_HTML, {
    status: 500,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      Vary: 'Accept',
    },
  });
}

async function serveSpa(request: Request): Promise<Response> {
  try {
    const indexUrl = new URL('/index.html', request.url);
    const indexResponse = await fetch(indexUrl, {
      headers: request.headers,
    });

    if (!indexResponse.ok) {
      return internalErrorResponse();
    }

    const body = await indexResponse.text();
    const headers = new Headers(indexResponse.headers);
    headers.set('Vary', 'Accept');
    // Body was decompressed/rebuilt by text(), so remove encoding-related headers.
    headers.delete('content-encoding');
    headers.delete('content-length');

    return new Response(body, {
      status: indexResponse.status,
      statusText: indexResponse.statusText,
      headers,
    });
  } catch {
    return internalErrorResponse();
  }
}

export default async function middleware(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const { pathname } = url;

  // Known SPA routes: serve the bundled index.html so React Router can render.
  if (SPA_ROUTES.has(pathname)) {
    if (acceptsMarkdown(request)) {
      return markdownResponse(HOME_MARKDOWN);
    }
    return serveSpa(request);
  }

  // Unknown path: real 404. Markdown agents get a plain Markdown body.
  if (acceptsMarkdown(request)) {
    return markdownResponse(NOT_FOUND_MARKDOWN, 404);
  }

  return notFoundHtmlResponse();
}

// Run middleware only on paths without a file extension, excluding API and Next internals.
// Static assets (paths containing a dot) are therefore served directly by Vercel.
export const config = {
  matcher: ['/((?!api|_next|.*\\.).*)'],
};
