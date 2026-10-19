# Middleware Verification Commands

This document lists the curl commands used to verify the Vercel Edge Middleware
behavior for `altunzafer.com`. Commands are provided for both local preview
(`npm run preview` after a production build) and the deployed environment.

## Local Preview

1. Start the production build locally:

   ```bash
   npm run build
   npm run preview
   ```

2. Run the verification commands below against `http://localhost:4173`.

## Deployed Environment

Replace `https://altunzafer.com` with the deployed domain. The commands are the
same; only the origin changes.

## Verification Commands

### 1. Known route `/` with `Accept: text/html`

```bash
curl -i -H "Accept: text/html" https://altunzafer.com/
```

**Expected result:**
- HTTP/2 200
- `Content-Type: text/html; charset=utf-8`
- `Vary: Accept`
- Body contains the rendered React SPA HTML.

### 2. Known route `/` with `Accept: text/markdown`

```bash
curl -i -H "Accept: text/markdown" https://altunzafer.com/
```

**Expected result:**
- HTTP/2 200
- `Content-Type: text/markdown; charset=utf-8`
- `Vary: Accept`
- Body contains `# Zafer Altun` and a description in Markdown.

### 3. Known route `/privacy` with `Accept: text/html`

```bash
curl -i -H "Accept: text/html" https://altunzafer.com/privacy
```

**Expected result:**
- HTTP/2 200
- `Vary: Accept`
- Body contains the Privacy page HTML.

### 4. Known route `/about` with `Accept: text/html`

```bash
curl -i -H "Accept: text/html" https://altunzafer.com/about
```

**Expected result:**
- HTTP/2 200
- `Vary: Accept`
- Body contains the About page HTML.

### 5. Known route `/contact` with `Accept: text/html`

```bash
curl -i -H "Accept: text/html" https://altunzafer.com/contact
```

**Expected result:**
- HTTP/2 200
- `Vary: Accept`
- Body contains the Contact page HTML.

### 6. Unknown path with `Accept: text/html`

```bash
curl -i -H "Accept: text/html" https://altunzafer.com/nonexistent-page
```

**Expected result:**
- HTTP/2 404
- `Content-Type: text/html; charset=utf-8`
- `Vary: Accept`
- Body contains `404 — Sayfa Bulunamadı`.

### 7. Unknown path with `Accept: text/markdown`

```bash
curl -i -H "Accept: text/markdown" https://altunzafer.com/nonexistent-page
```

**Expected result:**
- HTTP/2 404
- `Content-Type: text/markdown; charset=utf-8`
- `Vary: Accept`
- Body contains `# 404 — Sayfa Bulunamadı`.

### 8. Static asset bypass

```bash
curl -i https://altunzafer.com/assets/js/main.js
```

**Expected result:**
- The middleware matcher excludes paths containing a file extension, so Vercel
  serves the static asset directly. A 200 with the asset content (or 404 if the
  file does not exist) is returned without invoking the middleware.

## Automated Tests

Run the unit tests for `middleware.ts` with:

```bash
npm install
npm run test
```

The test suite covers:
- HTML responses for known SPA routes (`/`, `/privacy`, `/about`, `/contact`).
- Markdown responses for `/` when `Accept: text/markdown`.
- Real HTTP 404 responses for unknown paths in both HTML and Markdown.
- 500 error handling when `index.html` cannot be fetched.
- Presence of the `Vary: Accept` header on all middleware-generated responses.
