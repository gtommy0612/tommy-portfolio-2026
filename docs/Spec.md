# Portfolio Website Development Specification

## 🛠️ Technology Stack
- **Structure:** Semantic HTML5
- **Styling:** Tailwind CSS (Utility-first framework)
- **Responsiveness:** Mobile-first responsive design (RWD) with breakpoints (`sm:`, `md:`, `lg:`, `xl:`)
- **Icons:** Lucide Icons (or FontAwesome CDN)
- **Fonts:** Inter / Plus Jakarta Sans (Clean, professional Tech-SaaS style)

---

## 📐 Design & Layout Strategy (RWD Rules)
1. **Mobile-First Approach:** Default styles target mobile screens (375px+). Use prefix utilities for larger screens.
2. **Breakpoints Guide:**
   - Mobile: Base styles
   - Tablet/iPad: `md:grid-cols-2` / `md:px-8` (768px)
   - Desktop: `lg:grid-cols-3` / `lg:px-16` / Max-width `lg:max-w-7xl` (1024px+)
3. **Typography Scaling:** Use fluid text (e.g., `text-2xl md:text-4xl lg:text-5xl` for Hero headings).
4. **Navigation:** Collapsible hamburger menu on mobile (`block md:hidden`), full horizontal menu on desktop (`hidden md:flex`).

---

## 🎨 Theme & UI/UX Styling Guidelines
- **Color Palette:** Professional, Premium Dark/Light Mode Hybrid (Prefer Dark Slate)
  - Background: `bg-slate-900` / `bg-zinc-950`
  - Text Primary: `text-slate-50` / Secondary: `text-slate-400`
  - Accent/Brand Color: `text-emerald-400` or `text-indigo-400` (To highlight PMP® and business impact metrics)
- **Card Styling:** Glassmorphism style for grids (`bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-2xl`).
- **Interactive States:** Smooth transitions (`transition-all duration-300 ease-in-out`) on hover states for buttons and cards (`hover:-translate-y-1 hover:shadow-xl`).

---

## 🗂️ Information Architecture & Sections to Generate

### 1. Navigation Bar (Sticky & RWD)
- **Left:** Logo / Name (`Tommy Chi`) + Title (`Product Designer`)
- **Right (Desktop):** Links to [Works], [About & Contact], [Resume (CTA Button)]
- **Right (Mobile):** Menu Icon with a clean overlay list.

### 2. Hero Section (The 30-Second Hook)
- **Headline:** Bold, impact-driven value proposition (e.g., "Senior Product Designer bridging AI Innovation, Scalable Design Systems, and Business Growth.")
- **Sub-headline:** Mentions "PMP® Certified" and expertise in "WCAG 2.2 AA Compliance".
- **CTA Buttons:** Primary [View Case Studies], Secondary [Download Resume] (Fully responsive stacked on mobile, inline on desktop).

### 3. Selected Works Grid (The Core Portfolio)
- **Layout:** `grid grid-cols-1 md:grid-cols-2 gap-8`
- **Card Elements:**
  - Project Thumbnail Image (Aspect ratio `aspect-video`, `overflow-hidden rounded-xl`)
  - Project Tags (e.g., `AI Strategy`, `SaaS`, `Design System`)
  - Impact Metric Highlight: Large typography for key achievements (e.g., **$1.6M+ Contract Secured** or **WCAG 2.2 AA Compliant**).
  - Short narrative description & "Read Case Study" text link with hover arrow animation.

### 4. About & Contact Section (Integrated)
- **Layout:** 2-column on desktop (`grid-cols-1 lg:grid-cols-12`)
- **Bio Column:** Short story about bridging business objectives with rigorous UX engineering.
- **Contact & Action Column:** - Embed slot for Cal.com/Calendly.
  - Direct Email link (`hi@yourdomain.com`).
  - Social Links: LinkedIn, Behance, GitHub.

### 5. Footer
- Minimalist design with Copyright, back-to-top button, and quick resume download link.

---

## 🤖 Prompt Command for AI Code Generation

"Please generate a clean, well-commented, single-page semantic HTML5 file using Tailwind CSS via CDN based on the specifications above. Ensure the layout is 100% responsive, utilizing a mobile-first approach. All margins, paddings, and grid grids must adapt seamlessly from small smartphone screens to large ultrawide desktop monitors. Use modern UI design card styling, typography, and layout techniques suitable for a Senior Product Designer."