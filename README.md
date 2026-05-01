# Yvette Tanila Nchombua — Portfolio

A modern, cinematic portfolio built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**.

## 🌐 Live

**[yvette-portfolio-six.vercel.app](https://yvette-portfolio-six.vercel.app)**

## ✨ Features

- 🌑 Cinematic dark theme with electric mint accents
- 🍔 Hamburger menu on mobile with full-screen overlay
- 🖱️ Custom cursor (desktop only — auto-disabled on touch)
- ✍️ Typed role animation in the hero
- 📜 Scroll-reveal animations
- 📊 Animated skill proficiency bars
- 🎴 Project cards with screenshot support
- ✉️ Working **EmailJS contact form** with success/error banners at top
- 📝 Blog with listing + individual post pages
- 📱 Fully responsive (mobile, tablet, desktop)
- 🎯 SEO-ready (OpenGraph, Twitter cards, structured metadata)
- 🌟 Custom favicon + OpenGraph image
- 📄 Downloadable CV button (in nav, hero, and mobile menu)
- 📈 **Vercel Analytics** + **Speed Insights** built-in

## 🚀 Setup

```bash
npm install
cp .env.local.example .env.local
# Edit .env.local with your EmailJS keys
npm run dev
```

Open **http://localhost:3000**.

## ✉️ EmailJS setup

1. Sign up at [emailjs.com](https://www.emailjs.com) (free tier: 200 emails/month)
2. **Email Services** → "Add New Service" → connect Gmail/Outlook
3. **Email Templates** → "Create New Template", use these variables:
   ```
   From: {{name}} <{{email}}>
   Subject: {{subject}}

   {{message}}
   ```
4. **Account → API Keys** → copy your **Public Key**
5. **Account → Security** → add allowed origins (your domain + `localhost`)
6. Paste values into `.env.local`:
   ```
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxx
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxx
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxx
   ```

## 📷 Adding project screenshots

Replace placeholder images with real ones:

1. Take screenshots (use [shots.so](https://shots.so/) for browser frames)
2. Save in `public/projects/` as `.webp`:
   ```
   public/projects/
     ai-studio.webp
     awareness.webp
     airbnb.webp
     activity-finder.webp
     beach-resort.webp
   ```
3. Update the `image` field in `components/Projects.tsx`

**Recommended size**: 1200×750px

## 📄 CV

The downloadable CV is at `public/cv.pdf`. To update it:
- Replace `public/cv.pdf` with your latest version
- Buttons in the nav, hero, and mobile menu link to it automatically

## 📝 Adding blog posts

Edit `lib/posts.ts` and append a post to the `posts` array. The renderer supports headings (`##`), bold (`**text**`), inline code (`` `code` ``), code blocks (` ``` `), and bullet/numbered lists.

## 🚀 Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Add env vars in **Vercel Dashboard → Project → Settings → Environment Variables**:
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
- `NEXT_PUBLIC_SITE_URL` (e.g. `https://yvette-portfolio-six.vercel.app`)

### Enable Analytics

After deploy, in your Vercel dashboard:
- **Analytics tab** → click "Enable" (free tier)
- **Speed Insights tab** → click "Enable" (free tier)

Both packages are already installed and integrated.

## 🌐 Custom domain (recommended)

`yvette-portfolio-six.vercel.app` works, but a custom domain looks far more professional:

1. Buy from [Namecheap](https://www.namecheap.com) or [Porkbun](https://porkbun.com) — `.dev`, `.codes`, `.com`, etc. (~$12/year)
2. **Vercel → Project → Settings → Domains** → add domain
3. Follow Vercel's DNS instructions (usually adding A or CNAME records)
4. Update `NEXT_PUBLIC_SITE_URL` in Vercel env vars to your new domain

Suggested options:
- `yvettetanila.dev`
- `yvette.codes`
- `yvettenchombua.com`

## Project Structure

```
yvette-portfolio/
├── app/
│   ├── layout.tsx              ← Metadata, fonts, analytics
│   ├── page.tsx
│   ├── globals.css
│   ├── icon.png                ← Favicon (auto-detected by Next.js)
│   ├── apple-icon.png          ← iOS home-screen icon
│   ├── opengraph-image.png     ← Social share image
│   ├── twitter-image.png       ← Twitter card image
│   └── blog/
│       ├── page.tsx
│       └── [slug]/page.tsx
├── components/
│   ├── CustomCursor.tsx
│   ├── Reveal.tsx
│   ├── Nav.tsx                 ← Hamburger + CV download
│   ├── Hero.tsx                ← Typed text + CV button
│   ├── About.tsx
│   ├── Projects.tsx
│   ├── Skills.tsx
│   ├── Experience.tsx
│   ├── Education.tsx
│   ├── BlogPreview.tsx
│   ├── Contact.tsx
│   ├── ContactForm.tsx
│   └── Footer.tsx
├── lib/
│   └── posts.ts
├── public/
│   ├── cv.pdf                  ← Your downloadable CV
│   └── projects/
│       └── placeholder.svg
├── .env.local.example
└── ...config files
```

## License

Personal portfolio — © 2025 Yvette Tanila Nchombua
