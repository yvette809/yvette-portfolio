# Yvette Tanila Nchombua — Portfolio

A modern, cinematic portfolio built with **Next.js 14**, **TypeScript**, and **Tailwind CSS** — featuring a blog and a working contact form.

## Features

- 🌑 Cinematic dark theme with electric mint accents
- 🖱️ Custom cursor that follows the mouse
- ✍️ Typed role animation in the hero
- 📜 Scroll-reveal animations on every section
- 📊 Animated skill proficiency bars
- 🎴 Project cards with hover effects
- ✉️ **Working contact form** with validation, loading/success/error states
- 📝 **Blog** with listing page and individual post pages (3 starter posts included)
- 📱 Fully responsive
- ⚡ Optimised fonts via `next/font`
- 🎯 SEO-ready metadata

## Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + custom CSS variables
- **Fonts**: Syne, Figtree, DM Mono (via `next/font`)

## Setup

```bash
npm install
npm run dev
```

Open **http://localhost:3000**.

## ✉️ Contact form setup

The contact form works out of the box for testing — submissions are validated and **logged to the server console**. To actually deliver emails, choose ONE of three options.

### Option 1: Resend (recommended)

Resend is the cleanest option — clean API, generous free tier (3000 emails/month).

```bash
npm install resend
```

1. Sign up at [resend.com](https://resend.com), get an API key
2. Create `.env.local` in the project root:
   ```
   RESEND_API_KEY=re_your_key_here
   ```
3. Open `app/api/contact/route.ts` and uncomment the Resend block

### Option 2: Web3Forms (no signup-fuss)

1. Visit [web3forms.com](https://web3forms.com), enter your email, get an access key by email
2. Create `.env.local`:
   ```
   WEB3FORMS_KEY=your_key_here
   ```
3. Open `app/api/contact/route.ts` and uncomment the Web3Forms block

### Option 3: Formspree

Replace the `<form>` action with a Formspree endpoint and remove the API route entirely. See [formspree.io](https://formspree.io).

## 📝 Blog setup

Three sample posts are included in `lib/posts.ts`. To add a new post, just append to the `posts` array:

```typescript
{
  slug: "my-new-post",
  title: "My New Post",
  excerpt: "Short summary shown on cards...",
  date: "2025-04-15",
  readTime: "5 min",
  tags: ["Tag1", "Tag2"],
  content: `
Your content goes here. The renderer supports:

## Headings

**Bold text** and \`inline code\`.

\`\`\`
code blocks
\`\`\`

- Bullet lists
- Like this

1. Numbered lists
2. Like this
  `,
}
```

The blog is at `/blog`. Individual posts at `/blog/[slug]`. Posts are statically generated at build time.

**For a more powerful editing experience**, consider migrating to **MDX** (`@next/mdx`) or a headless CMS like **Sanity** or **Contentlayer**.

## Build for production

```bash
npm run build
npm run start
```

## Deploy to Vercel (easiest)

```bash
npm install -g vercel
vercel
```

Add your `.env.local` values to Vercel's dashboard under "Environment Variables".

## Deploy to Netlify

1. Push to GitHub
2. Go to [Netlify](https://app.netlify.com) → "New site from Git"
3. Build command: `npm run build`
4. Publish directory: `.next`
5. Netlify auto-installs the Next.js plugin
6. Add environment variables in Site Settings → Environment

## Project Structure

```
yvette-portfolio/
├── app/
│   ├── layout.tsx              # Root layout, fonts, metadata
│   ├── page.tsx                # Main page
│   ├── globals.css             # Global styles
│   ├── blog/
│   │   ├── page.tsx            # Blog listing
│   │   └── [slug]/page.tsx     # Individual blog post
│   └── api/
│       └── contact/route.ts    # Contact form API
├── components/
│   ├── CustomCursor.tsx
│   ├── Reveal.tsx
│   ├── Nav.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Projects.tsx
│   ├── Skills.tsx
│   ├── Experience.tsx
│   ├── Education.tsx
│   ├── BlogPreview.tsx         # Blog cards on homepage
│   ├── Contact.tsx             # Contact section
│   ├── ContactForm.tsx         # Form component
│   └── Footer.tsx
├── lib/
│   └── posts.ts                # Blog post data
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

## License

Personal portfolio — © 2025 Yvette Tanila Nchombua
