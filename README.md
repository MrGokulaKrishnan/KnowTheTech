# KnowTheTech — Technology Product Ecosystem

> **One ecosystem. Multiple ideas. Built with technology.**

**KnowTheTech** is a premium technology product ecosystem website that unifies and showcases independent web applications engineered by **Gokulakrishnan K**. Designed with a futuristic **Liquid Glass + Glossy Blue Gradient** visual system, it serves as a central product hub, digital laboratory, and architectural overview of real software products.

---

## 🚀 Existing Ecosystem Products

All products are independently deployed and accessible web platforms:

| Product | Live URL | Primary Category | Description |
| :--- | :--- | :--- | :--- |
| **Knowhere Tech** | [knowheretech.netlify.app](https://knowheretech.netlify.app/) | Education / Developer Learning | Java Full Stack learning platform with backend roadmaps and REST API guides. |
| **KnowTheBinary** | [knowthebinary.web.app](https://knowthebinary.web.app/) | Education / DSA / Computer Science | Interactive Computer Science and Data Structures & Algorithms visualizer. |
| **KnowTheFile** | [knowthefile.web.app](https://knowthefile.web.app/) | Productivity / Documents / Career | Browser-based private document & resume utility platform with zero cloud uploads. |
| **KnowYourResume** | [knowyourresume.web.app](https://knowyourresume.web.app/) | Career / AI / Resume | Resume intelligence workspace with ATS scoring and impactful wording analysis. |
| **KnowYourJob** | [knowyourjob.web.app](https://knowyourjob.web.app/) | Career / AI / Jobs | AI-powered job discovery and career opportunity tracking platform. |
| **KnowTheMD** | [knowthemd.web.app](https://knowthemd.web.app/) | Developer Tools / Markdown | Modern distraction-free Markdown reader and viewer for technical documentation. |

---

## 👨‍💻 Creator & Author

- **Builder**: Gokulakrishnan K
- **Role**: Creator • Developer • Technology Builder
- **Portfolio**: [https://gokulakrishnank.web.app/](https://gokulakrishnank.web.app/)
- **GitHub**: [https://github.com/Gokulakrishnan-K](https://github.com/Gokulakrishnan-K)

---

## ✨ Features

- **Liquid Glass Design System**: Custom translucent glass surfaces, specular top-edge lighting, refractive borders, and responsive hover glows.
- **Central Product Registry**: Strongly typed data store (`src/data/products.ts`) driving product grids, dynamic detail pages, categories, search, related recommendations, and sitemaps.
- **Dynamic Product Detail Pages**: Rich, dedicated routes (`/products/:slug`) presenting problem/solution breakdowns, feature lists, tech stacks, and architecture blueprints.
- **Interactive Ecosystem Network**: Connected SVG node graph visualizing the core KnowTheTech hub and satellite products, with a touch-friendly mobile tree fallback.
- **Live Search & Multi-Category Filtering**: Instant client-side search across name, description, and technologies, accompanied by category pill counters and empty-state recovery.
- **Accessible Mobile Drawer**: Full-screen slide-in navigation with body scroll lock, Escape key detection, and focus management.
- **Client-First Contact Form**: Built with React Hook Form + Zod validation, offering instant `mailto:` link generation and clipboard formatting with zero third-party spam tracking.
- **Production-Grade Technical SEO**: Dynamic document titles, meta descriptions, canonical URLs, Open Graph, Twitter cards, and structured JSON-LD (`WebSite`, `Organization`, `Person`, `SoftwareApplication`, `CollectionPage`).
- **Target WCAG 2.2 AA Accessibility**: Semantic HTML5 landmarks, visible high-contrast focus rings, screen-reader text, and full `prefers-reduced-motion` compliance.

---

## 🛠️ Technology Stack

- **Core**: React 19, TypeScript, Vite 6
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM (v7/v6 with code splitting and lazy loading)
- **Forms & Validation**: React Hook Form, Zod, `@hookform/resolvers`
- **Testing**: Vitest, React Testing Library, Happy DOM, Playwright
- **Code Quality**: ESLint 9 (flat config), TypeScript Strict Mode
- **Deployment**: Netlify (`public/_redirects` SPA rewrite rules)

---

## 📂 Project Structure

```
KnowTheTech/
├── public/
│   ├── _redirects              # Netlify SPA redirect rule (/* /index.html 200)
│   ├── robots.txt              # Search crawler directives
│   ├── sitemap.xml             # Complete canonical URL sitemap
│   ├── site.webmanifest        # PWA metadata & branding
│   ├── favicon.svg             # Scalable brand vector favicon
│   └── brand/
│       └── logo.png            # Unaltered KnowTheTech Liquid Glass master logo
├── src/
│   ├── assets/                 # Static brand assets
│   ├── components/
│   │   ├── common/             # ErrorBoundary, PageTransition, LoadingState, EmptyState
│   │   ├── ecosystem/          # EcosystemGraph, EcosystemMobileTree
│   │   ├── layout/             # Navbar, MobileNav, Footer
│   │   ├── products/           # ProductCard, ProductGrid, ProductFilter, ProductSearch
│   │   ├── seo/                # SEOHead, JsonLd
│   │   └── ui/                 # GlassCard, GradientButton, Badge, Input, Textarea, SectionHeader
│   ├── data/
│   │   ├── products.ts         # Central Product Registry & helpers
│   │   ├── site.ts             # Site metadata & navigation config
│   │   └── technologies.ts     # Verified technology breakdown
│   ├── hooks/
│   │   ├── useDebounce.ts
│   │   ├── usePrefersReducedMotion.ts
│   │   └── useScrollPosition.ts
│   ├── lib/
│   │   └── utils.ts            # Class merge helper (cn)
│   ├── pages/
│   │   ├── Home.tsx            # Ecosystem landing & interactive preview
│   │   ├── Products.tsx        # Filterable & searchable product directory
│   │   ├── ProductDetail.tsx   # Dynamic single product specification page
│   │   ├── Ecosystem.tsx       # Dedicated network graph page
│   │   ├── About.tsx           # Ecosystem mission & engineering principles
│   │   ├── Author.tsx          # Gokulakrishnan K profile & portfolio
│   │   ├── Contact.tsx         # Validated message preparation form
│   │   └── NotFound.tsx        # Custom 404 error view
│   ├── types/                  # Product and SEO type definitions
│   ├── App.tsx                 # Router setup with lazy routes & Suspense
│   ├── index.css               # Design tokens, liquid glass classes, glows
│   └── main.tsx                # Application bootstrap entrypoint
├── tests/
│   ├── setup.ts                # Test environment mocks (Framer Motion, matchMedia, scrollTo)
│   ├── unit/                   # Vitest unit & integration tests
│   └── e2e/                    # Playwright end-to-end multi-viewport tests
├── eslint.config.js            # Strict ESLint configuration
├── tailwind.config.js          # Custom theme extensions & color palette
├── vite.config.ts              # Vite tooling & manual vendor chunk splitting
├── vitest.config.ts            # Vitest unit test configuration
└── playwright.config.ts        # Playwright E2E configuration
```

---

## 💻 Getting Started

### Prerequisites
- Node.js `v20+` or `v22+`
- npm `10+`

### Installation
```bash
git clone https://github.com/Gokulakrishnan-K/knowthetech.git
cd knowthetech
npm install
```

### Development
Start the local Vite development server:
```bash
npm run dev
```

### Production Build
Compile TypeScript and bundle optimized production assets:
```bash
npm run build
```

Preview the built application locally:
```bash
npm run preview
```

---

## 🧪 Testing Suite

### Unit & Integration Tests (Vitest)
Runs registry integrity, category filter calculations, and contact form validation tests:
```bash
npm run test
```

### End-to-End Tests (Playwright)
Executes cross-route navigation, search & filter interactions, mobile navigation drawer, and 404 error testing:
```bash
npm run test:e2e
```

### Linting
```bash
npm run lint
```

---

## ➕ Adding New Products to the Ecosystem

The system is built for friction-free scalability. To add Product #7, simply append a new object to the `PRODUCTS` array in `src/data/products.ts`:

```typescript
{
  id: "product-seven",
  slug: "productseven",
  name: "Product Seven",
  tagline: "High Performance Web Utility",
  category: "Developer Tools / Utilities",
  categories: ["Developer Tools", "Productivity"],
  description: "A focused web utility designed for...",
  url: "https://productseven.web.app/",
  status: "Live",
  technologies: ["React", "TypeScript", "Tailwind CSS"],
  features: ["Feature 1", "Feature 2", "Feature 3"],
  highlights: ["Highlight 1", "Highlight 2"],
  icon: "Terminal",
  featured: false,
  displayOrder: 7,
  problem: "The specific friction being solved...",
  solution: "How Product Seven resolves it...",
  architecture: ["Modular client pipeline", "Optimized Web Workers"],
  seo: {
    title: "Product Seven — High Performance Web Utility | KnowTheTech",
    description: "Detailed description for search engines...",
    keywords: ["developer tools", "productivity", "KnowTheTech"]
  }
}
```

The new product will automatically:
1. Appear in the Product Directory (`/products`).
2. Be indexed by the client-side search engine.
3. Be included in category filtering.
4. Have its own dynamic `/products/:slug` detail page generated.
5. Appear in related product suggestions.

---

## 🚀 Deployment (Netlify)

This project includes a pre-configured `public/_redirects` file for seamless Single Page Application (SPA) routing on Netlify:

```
/* /index.html 200
```

Deploying to Netlify:
1. Connect your repository to Netlify.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Netlify will automatically handle client-side routing across `/products/:slug`, `/ecosystem`, etc.

---

## 📄 License

Copyright © KnowTheTech • Gokulakrishnan K. All rights reserved.
