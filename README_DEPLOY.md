# Won Nothing — Deploy Guide

Static site ready for Vercel. No build step. No dependencies. Deploy in under 5 minutes.

---

## File Structure

```
site/
├── index.html           ← Landing page
├── thank-you.html       ← Post-payment confirmation page
├── styles.css           ← All styles (shared by both pages)
├── script.js            ← FAQ accordion (7 lines)
└── README_DEPLOY.md     ← This file
```

---

## Step 1 — Push to GitHub

If you haven't already initialized git in this folder:

```bash
cd "Product Forge Builds/Won Nothing MVP/site"
git init
git add .
git commit -m "Initial deploy — Won Nothing landing page"
```

If you're pushing to an existing repo (e.g. the Discovery Lab repo), the `site/` folder is already tracked. Just commit and push:

```bash
git add "Product Forge Builds/Won Nothing MVP/site/"
git commit -m "Add Won Nothing site"
git push origin main
```

Or push to a dedicated repo for the site:

```bash
git remote add origin https://github.com/YOUR_USERNAME/won-nothing.git
git push -u origin main
```

---

## Step 2 — Connect Vercel

1. Go to [vercel.com](https://vercel.com) and log in (or create a free account).
2. Click **Add New → Project**.
3. Import your GitHub repo (authorize Vercel to access it if needed).
4. **Important settings:**
   - **Framework Preset:** Other (no framework)
   - **Root Directory:** `Product Forge Builds/Won Nothing MVP/site` (or `/` if the repo contains only the site)
   - **Build Command:** leave empty
   - **Output Directory:** leave empty (or `.`)
5. Click **Deploy**.

Vercel will detect the static HTML files and deploy instantly. You'll get a URL like `won-nothing.vercel.app`.

---

## Step 3 — Connect wonnothing.com

1. In Vercel, go to your project → **Settings → Domains**.
2. Click **Add Domain** and enter `wonnothing.com`.
3. Vercel will show you DNS records to add. Choose one:

   **Option A — Nameservers (simplest):**
   Point your domain's nameservers to Vercel's nameservers (shown in the Vercel dashboard). Vercel manages DNS for you.

   **Option B — A record + CNAME:**
   - Add an `A` record pointing `@` to Vercel's IP (shown in dashboard, typically `76.76.21.21`)
   - Add a `CNAME` record pointing `www` to `cname.vercel-dns.com`

4. DNS propagation takes 5–30 minutes. Vercel provisions SSL automatically.

---

## Step 4 — Replace Stripe Link

When your Stripe payment link is ready, search for the placeholder in **two places**:

| File | Location | What to replace |
|------|----------|-----------------|
| `index.html` | Line ~38 (Hero CTA button) | `https://stripe-link-placeholder.com` |
| `index.html` | Line ~103 (Final CTA button) | `https://stripe-link-placeholder.com` |

Search command (run from the `site/` folder):

```bash
grep -n "stripe-link-placeholder" index.html
```

Replace both occurrences with your real Stripe Payment Link (format: `https://buy.stripe.com/XXXXXX`).

After replacing, also update `thank-you.html` as your Stripe success URL — in the Stripe dashboard, set the redirect after payment to `https://wonnothing.com/thank-you.html`.

---

## Step 5 — Replace Certificate PDF Placeholder

In `thank-you.html`, the Download Certificate button links to `certificate-placeholder.pdf`.

When your certificate PDF is ready:
- Upload it to the `site/` folder as `certificate.pdf` (or any name)
- Update the `href` in `thank-you.html`: `<a href="certificate.pdf" ...>`

Or link to an external URL (e.g. Google Drive, Dropbox) if the PDF is hosted elsewhere.

---

## Step 6 — Replace Hall of Losers Review Link

In `thank-you.html`, the Leave a Review button links to `#review` (placeholder).

When your Google Form or Tally form is ready, replace `#review` with the form URL.

---

## Notes

- The ticket number on `thank-you.html` is hardcoded as `#0001`. To make it dynamic, you'll need a backend or Stripe webhook. For the MVP, update it manually or use Tally/Typeform with a counter field.
- No cookies, no tracking, no external requests. The site loads in under 100ms.
- To test locally: open `index.html` directly in a browser. No server needed.
