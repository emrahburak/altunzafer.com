import { describe, it, expect, vi, beforeEach, afterEach, type MockInstance } from 'vitest';
import middleware, { config } from '../middleware';

const INDEX_HTML = `<!doctype html>
<html lang="tr">
  <head>
    <meta charset="UTF-8" />
    <title>Zafer Altun</title>
  </head>
  <body>
    <div id="root"><h1>Zafer Altun</h1></div>
  </body>
</html>
`;

describe('middleware', () => {
  let fetchSpy: MockInstance<typeof fetch>;

  beforeEach(() => {
    fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(INDEX_HTML, {
        status: 200,
        statusText: 'OK',
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      })
    );
  });

  afterEach(() => {
    fetchSpy.mockRestore();
  });

  // --- Known SPA routes (positive) ---

  it('serves index.html for / with Accept: text/html', async () => {
    // Arrange
    const request = new Request('https://altunzafer.com/', {
      headers: { Accept: 'text/html' },
    });

    // Act
    const response = await middleware(request);
    const body = await response.text();

    // Assert
    expect(response.status).toBe(200);
    expect(body).toBe(INDEX_HTML);
    expect(response.headers.get('Vary')).toBe('Accept');
    expect(fetchSpy).toHaveBeenCalledOnce();
  });

  it('returns Markdown for / with Accept: text/markdown', async () => {
    // Arrange
    const request = new Request('https://altunzafer.com/', {
      headers: { Accept: 'text/markdown' },
    });

    // Act
    const response = await middleware(request);
    const body = await response.text();

    // Assert
    expect(response.status).toBe(200);
    expect(response.headers.get('Content-Type')).toBe('text/markdown; charset=utf-8');
    expect(response.headers.get('Vary')).toBe('Accept');
    expect(body).toContain('# Zafer Altun');
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it.each(['/privacy', '/about', '/contact'])(
    'serves index.html for known SPA route %s',
    async (pathname) => {
      // Arrange
      const request = new Request(`https://altunzafer.com${pathname}`, {
        headers: { Accept: 'text/html' },
      });

      // Act
      const response = await middleware(request);
      const body = await response.text();

      // Assert
      expect(response.status).toBe(200);
      expect(body).toBe(INDEX_HTML);
      expect(response.headers.get('Vary')).toBe('Accept');
    }
  );

  it('defaults to HTML when no Accept header is provided for /', async () => {
    // Arrange
    const request = new Request('https://altunzafer.com/');

    // Act
    const response = await middleware(request);

    // Assert
    expect(response.status).toBe(200);
    expect(response.headers.get('Content-Type')).toContain('text/html');
  });

  // --- Unknown paths (negative / 404) ---

  it('returns real HTTP 404 HTML for unknown paths', async () => {
    // Arrange
    const request = new Request('https://altunzafer.com/unknown-path', {
      headers: { Accept: 'text/html' },
    });

    // Act
    const response = await middleware(request);
    const body = await response.text();

    // Assert
    expect(response.status).toBe(404);
    expect(response.headers.get('Content-Type')).toBe('text/html; charset=utf-8');
    expect(response.headers.get('Vary')).toBe('Accept');
    expect(body).toContain('404 — Sayfa Bulunamadı');
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('returns Markdown 404 for unknown paths when Accept: text/markdown', async () => {
    // Arrange
    const request = new Request('https://altunzafer.com/unknown-path', {
      headers: { Accept: 'text/markdown' },
    });

    // Act
    const response = await middleware(request);
    const body = await response.text();

    // Assert
    expect(response.status).toBe(404);
    expect(response.headers.get('Content-Type')).toBe('text/markdown; charset=utf-8');
    expect(response.headers.get('Vary')).toBe('Accept');
    expect(body).toContain('# 404 — Sayfa Bulunamadı');
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  // --- Error handling ---

  it('returns 500 when index.html fetch fails', async () => {
    // Arrange
    fetchSpy.mockRejectedValue(new Error('Network failure'));
    const request = new Request('https://altunzafer.com/', {
      headers: { Accept: 'text/html' },
    });

    // Act
    const response = await middleware(request);
    const body = await response.text();

    // Assert
    expect(response.status).toBe(500);
    expect(response.headers.get('Content-Type')).toBe('text/html; charset=utf-8');
    expect(body).toContain('500 — Sunucu Hatası');
  });

  it('returns 500 when index.html responds with non-OK status', async () => {
    // Arrange
    fetchSpy.mockResolvedValue(
      new Response('Not found', { status: 404, headers: { 'Content-Type': 'text/plain' } })
    );
    const request = new Request('https://altunzafer.com/', {
      headers: { Accept: 'text/html' },
    });

    // Act
    const response = await middleware(request);
    const body = await response.text();

    // Assert
    expect(response.status).toBe(500);
    expect(body).toContain('500 — Sunucu Hatası');
  });

  // --- Matcher config ---

  it('exports a matcher that skips static assets and Next/Vercel internals', () => {
    // Arrange & Act
    const matcher = config.matcher;

    // Assert
    expect(matcher).toEqual(['/((?!api|_next|.*\\.).*)']);
  });
});
