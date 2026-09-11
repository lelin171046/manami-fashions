# Manami Fashions Ltd.

A professional corporate website for **Manami Fashions Ltd.** — a 100% export oriented knit & woven garment manufacturer based in Dhaka, Bangladesh.

## Live Overview

The site serves as a digital portfolio and corporate identity for global fashion brands and buyers, showcasing factory capabilities, certifications, product range, and operational workflows.

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19 | UI framework |
| Vite | 7 | Build tool & dev server |
| Tailwind CSS | 4 | Utility-first styling |
| Framer Motion | 12 | Animations & transitions |
| React Router | 7 | Client-side routing |
| Lucide React | Latest | Icon library |
| React Hot Toast | Latest | Toast notifications |

---

## Pages & Features

| Route | Page | Description |
|-------|------|-------------|
| `/` | **Home** | Full landing page with hero, stats, product portfolio, certifications 3D sphere, infrastructure grid, buyer slider, vision/mission, team gallery, and careers form |
| `/products` | **Products** | Filterable product catalog with search, category filters, grid/list view toggle, and modal detail view |
| `/operations` | **Operations** | 6-step production workflow with expandable detail cards and production capacity stats |
| `/certifications` | **Certifications** | Filterable certification cards (BSCI, OEKO-TEX, WRAP, ISO 9001, SEDEX, GOTS) |
| `/gallery` | **Highlights** | News & media image gallery |
| `/buyers` | **Buyers** | Buyer portfolio with brand logos, stats, and "Why Brands Choose Us" section |
| `/contact` | **Contact** | Contact form with validation, Google Maps embed, and contact info cards |
| `/profile` | **Factory Profile** | Corporate identification data (company info, legal, leadership, banking, production stats) |

---

## Project Structure

```
src/
├── main.jsx                    # App entry point
├── index.css                   # Tailwind import + custom animations
├── Components/
│   ├── Route.jsx               # Browser router configuration (lazy loaded)
│   ├── SuspenseWrapper.jsx     # Loading fallback for code splitting
│   ├── Header.jsx              # Fixed navbar with mobile hamburger menu
│   ├── Footer.jsx              # Site footer with nav, contact, social
│   ├── Hero.jsx                # Product portfolio filterable grid
│   ├── Hero1.jsx               # Infrastructure 4-step production grid
│   ├── Hero2.jsx               # Team visionaries image gallery
│   ├── Hero3.jsx               # Main editorial hero + capabilities
│   ├── BrandSlider.jsx         # Certifications narrative + 3D sphere
│   ├── Buyer.jsx               # Infinite scrolling buyer logo slider
│   ├── Cer.jsx                 # 3D rotating sphere of certification logos
│   ├── Vision.jsx              # Vision/Mission/Values cards
│   ├── WhyUs.jsx               # Partner advantages + stat counters
│   ├── Gallery.jsx             # Image grid
│   ├── Loader.jsx              # Loading spinner component
│   ├── Error.jsx               # 404 error page
│   └── ProductDetails.jsx      # E-commerce product detail view
├── Layout/
│   └── Layout.jsx              # App shell (Header + Outlet + Footer)
└── Pages/
    ├── Home.jsx                # Homepage (composes all section components)
    ├── Products.jsx            # Product catalog page
    ├── Operations.jsx          # Operations workflow page
    ├── Certifications.jsx      # Certifications listing page
    ├── Buyers.jsx              # Buyer portfolio page
    ├── Contact.jsx             # Contact form + map page
    ├── FactoryProfile.jsx      # Corporate identification page
    └── WorkWithUs.jsx          # Careers/resume submission section
```

---

## Key Highlights

- **3D Certification Sphere** — Interactive rotating globe of 14 international certification logos using `useAnimationFrame` from Framer Motion
- **Infinite Buyer Slider** — Auto-scrolling logo carousel with gradient edge fades
- **Code Splitting** — Every route is lazy-loaded via `React.lazy()` + `Suspense` for optimal bundle size
- **Responsive Design** — Mobile-first layout with hamburger navigation, fluid grids, and responsive typography
- **Form Validation** — Client-side validation with real-time error feedback on Contact and WorkWithUs forms

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

---

## Certifications Showcased

BSCI (Grade A) | OEKO-TEX Standard 100 | WRAP | ISO 9001 | SEDEX | GOTS | GRS | ISO 14001 | Better Work | OCS | FSC | SA8000 | Fair Trade | Higg Index

---

## Factory Stats

| Metric | Value |
|--------|-------|
| Daily Production | 35,000 pcs |
| Employees | 1,600+ |
| Sewing Lines | 25+ |
| Machinery | 700+ |
| Facility | 110,000 sq. ft. |
| Annual Turnover | USD $25M |
| Established | 2010 |
| BGMEA # | 4713 |

---

## License

Proprietary — Manami Fashions Ltd.
