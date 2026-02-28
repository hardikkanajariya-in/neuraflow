# NeuraFlow — AI Workflow Automation Platform

![NeuraFlow](https://img.shields.io/badge/NeuraFlow-AI%20Workflow%20Automation-6366f1?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15.1-000000?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-38bdf8?style=flat-square&logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-11-ff0055?style=flat-square)

> Build, deploy, and scale intelligent automation workflows with AI-powered decision making.

---

## ✨ Overview

NeuraFlow is a premium, production-ready SaaS template for AI workflow automation platforms. It features a complete marketing site and fully interactive app dashboard — all built with modern web technologies and thoughtful design.

**This is a UI mock** — no real authentication, payments, or backend. Everything is driven by static JSON data for maximum portability and easy customization.

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15.1+ (App Router) |
| Language | TypeScript 5.7+ |
| Styling | Tailwind CSS v4 (CSS-first config) |
| Animations | Framer Motion 11.15+ |
| Icons | lucide-react |
| Fonts | Space Grotesk (body) + Syne (display) |

## 🎨 Design System

- **Colors**: Brand indigo (50-950), Neon accents (cyan, purple, pink)
- **Glass-morphism**: Dark mode translucent surfaces
- **60-30-10 Rule**: Dominant, secondary, accent color distribution
- **Touch Targets**: Minimum 44×44px for accessibility
- **Dark Mode**: System preference detection + manual toggle

## 📁 Project Structure

```
src/
├── app/
│   ├── (marketing)/        # Public marketing pages
│   │   ├── page.tsx         # Home (hero, features, pricing, etc.)
│   │   ├── pricing/         # Pricing page
│   │   ├── docs/            # Documentation index + [slug] pages
│   │   ├── changelog/       # Release history timeline
│   │   ├── about/           # About page with team & values
│   │   ├── contact/         # Contact form
│   │   ├── privacy/         # Privacy policy
│   │   └── terms/           # Terms of service
│   ├── (app)/               # Dashboard app (mock)
│   │   └── app/
│   │       ├── page.tsx     # Dashboard overview (KPIs, runs, activity)
│   │       ├── projects/    # Projects list + [id] detail
│   │       ├── automations/ # Automation builder
│   │       ├── runs/        # Execution history
│   │       ├── alerts/      # Alert rules config
│   │       ├── team/        # Team management
│   │       ├── billing/     # Plans, invoices, usage
│   │       └── settings/    # Account settings
│   ├── layout.tsx           # Root layout with providers
│   ├── not-found.tsx        # Custom 404
│   ├── sitemap.ts           # Dynamic sitemap
│   ├── robots.ts            # Robots config
│   └── manifest.ts          # PWA manifest
├── components/
│   ├── ui/                  # Reusable UI primitives (18 components)
│   ├── layout/              # Layout shells (header, sidebar, etc.)
│   ├── sections/            # Marketing page sections
│   └── features/            # App-specific feature components
├── data/                    # Static JSON data (site, marketing, app, billing, docs, changelog, legal)
├── hooks/                   # Custom React hooks
├── lib/                     # Utilities, constants, types, formatters
└── providers/               # Context providers (theme, toast, command palette)
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/neuraflow.git
cd neuraflow

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the marketing site.  
Navigate to [http://localhost:3000/app](http://localhost:3000/app) for the dashboard.

### Build for Production

```bash
pnpm build
pnpm start
```

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Compatible with Vercel Hobby plan (no serverless functions required).

## ⚡ Features

### Marketing Site
- Animated hero with gradient text and floating dashboard preview
- Trust logos carousel
- Feature grid with icon cards
- Testimonials carousel with star ratings
- Annual/monthly pricing toggle
- FAQ accordion
- Contact form
- Documentation with block-based content rendering
- Changelog timeline
- Legal pages (Privacy, Terms)

### App Dashboard
- KPI cards with trend indicators
- Projects table with search, status badges, and actions
- Visual automation builder (trigger → conditions → actions)
- Runs table with status filtering
- Alert rules with enable/disable toggles
- Team management with invite modal
- Billing with plan comparison, usage meters, invoices
- Settings with profile form and notification preferences

### Platform
- 🌙 Dark mode with system preference detection
- ⌨️ Command palette (Cmd/Ctrl+K)
- 🔔 Toast notification system
- 💀 Skeleton loaders with shimmer
- 📱 Fully responsive (mobile-first)
- ♿ Accessibility: ARIA labels, focus management, keyboard navigation
- 🎬 Smooth page transitions with Framer Motion
- 🔍 SEO: Dynamic sitemap, OG images, structured metadata

## 🎯 Customization

### Colors
Edit the color palette in `tailwind.config.ts` under `theme.extend.colors`.

### Content
All content is in `src/data/*.json`. Edit these files to customize:
- `site.json` — Brand name, navigation, footer, social links
- `marketing.json` — Hero, features, testimonials, pricing, FAQ
- `app.json` — Dashboard data, projects, automations, runs
- `billing.json` — Plans, invoices, usage meters
- `docs.json` — Documentation pages and content blocks
- `changelog.json` — Version history entries
- `legal.json` — Privacy policy and terms of service sections

### Fonts
Change fonts in `src/app/layout.tsx` — replace the Google Fonts imports.

## 📝 Credits

Created by [hardikkanajariya.in](https://hardikkanajariya.in)

## 📄 License

This project is licensed under a commercial license. See [LICENSE.md](LICENSE.md) and [COMMERCIAL-LICENSE.md](COMMERCIAL-LICENSE.md) for details.
