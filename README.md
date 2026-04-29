# Yvette Tanila Nchombua — Portfolio

A modern, cinematic portfolio built with **Next.js 14**, **TypeScript**, and **Tailwind CSS** — featuring a blog, an EmailJS-powered contact form, and a fully responsive design with mobile hamburger menu.

## Features

- 🌑 Cinematic dark theme with electric mint accents
- 🍔 **Hamburger menu** on mobile with full-screen overlay
- 🖱️ Custom cursor (desktop only — auto-disabled on touch)
- ✍️ Typed role animation in the hero
- 📜 Scroll-reveal animations
- 📊 Animated skill proficiency bars
- 🎴 Project cards with **real screenshots** support
- ✉️ **Working EmailJS contact form** — success/error banners at top
- 📝 Blog with listing + individual post pages
- 📱 Fully responsive (mobile, tablet, desktop)
- 🎨 Improved text contrast for readability
- 🎯 SEO-ready metadata

## Setup

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
3. **Email Templates** → "Create New Template", use these variables in the template body:
   ```
   From: {{name}} <{{email}}>
   Subject: {{subject}}

   {{message}}
   ```
   Set "To Email" to your address (`nchombuayvta@gmail.com`).
4. **Account → API Keys** → copy your **Public Key**
5. **Account → Security** → add allowed origins (your domain in production, `localhost` for dev)
6. Paste the three values into `.env.local`:
   ```
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxx
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxx
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxx
   ```
7. Restart `npm run dev`

## 📷 Adding project screenshots

The portfolio currently uses a placeholder SVG for project images. To add real screenshots:

1. Take screenshots of your live projects (use [shots.so](https://shots.so/) for nice browser frames)
2. Save them in `public/projects/` as `.webp` (smaller) or `.png`:
   ```
   public/projects/
     ai-studio.webp
     awareness.webp
     airbnb.webp
     activity-finder.webp
     beach-resort.webp
   ```
3. Update the `image` field in `components/Projects.tsx`:
   ```typescript
   image: "/projects/airbnb.webp"
   ```

**Recommended size**: 1200×750px or 1600×1000px

## 📝 Adding blog posts

Edit `lib/posts.ts` and append a new post to the `posts` array. The renderer supports headings (`##`), bold (`**text**`), inline code (`` `code` ``), code blocks (` ``` `), and bullet/numbered lists.

## Build for production

```bash
npm run build
npm run start
```

## Deploy to Vercel (recommended)

```bash
npm install -g vercel
vercel
```

Then add your `NEXT_PUBLIC_EMAILJS_*` keys in **Vercel Dashboard → Project → Settings → Environment Variables**.

## Deploy to Netlify

1. Push to GitHub
2. Go to [Netlify](https://app.netlify.com) → "New site from Git"
3. Build command: `npm run build`
4. Publish directory: `.next`
5. Add env vars under **Site Settings → Environment Variables**

## Project Structure

```
yvette-portfolio/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── blog/
│       ├── page.tsx
│       └── [slug]/page.tsx
├── components/
│   ├── CustomCursor.tsx
│   ├── Reveal.tsx
│   ├── Nav.tsx               ← Hamburger menu on mobile
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Projects.tsx          ← Image-based cards
│   ├── Skills.tsx
│   ├── Experience.tsx
│   ├── Education.tsx
│   ├── BlogPreview.tsx
│   ├── Contact.tsx
│   ├── ContactForm.tsx       ← EmailJS form
│   └── Footer.tsx
├── lib/
│   └── posts.ts              ← Blog content
├── public/
│   └── projects/
│       └── placeholder.svg
├── .env.local.example
└── ...config files
```

## License

Personal portfolio — © 2025 Yvette Tanila Nchombua
