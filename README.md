# Candid.jobs

A job-seeking platform built around employer accountability. Every listing is verified as live, every employer is contractually obligated to respond to applicants within a defined window, and every outcome — accepted, rejected, or withdrawn — is communicated with structured, non-boilerplate feedback.

---

## The problem

Ghost job postings and application silence are a documented harm in the modern hiring market. Candidates invest significant time and emotional energy applying to roles that were never real, or never hear back from employers who were. Candid.jobs is designed to structurally eliminate both.

---

## Core pillars

**Verified listings** — Every role is cross-checked against company HR systems or direct contact before going live. No speculative pipeline building, no evergreen harvesting.

**Mandatory response windows** — Employers select a response window (7, 14, or 21 days) at the time of posting. This commitment is public and visible to every applicant. Missing the deadline triggers an automatic flag.

**Structured feedback** — Rejections must include a specific reason drawn from an approved taxonomy. Boilerplate responses are detected and bounced back. Vague form letters are not accepted.

**Seeker reviews** — Candidates are invited to rate the hiring process after an outcome. Participation is voluntary with no consequences for skipping, but high response rates earn employers a Transparency badge.

**Flag escalation** — Employers accumulate flags for missed windows, boilerplate feedback, ghost jobs, and misrepresented roles. Three flags result in permanent platform removal.

---

## Tech stack

| Layer      | Technology                                                                                             |
| ---------- | ------------------------------------------------------------------------------------------------------ |
| Framework  | React 19                                                                                               |
| Routing    | React Router DOM v7                                                                                    |
| Build tool | Vite 8                                                                                                 |
| Styling    | Custom CSS design system (`candid-jobs.css`)                                                           |
| Theming    | CSS custom properties with `data-theme` attribute — auto-detects OS preference, supports manual toggle |
| Linting    | ESLint 9 with React Hooks and React Refresh plugins                                                    |

---

## Project structure

```
src/
├── main.jsx                        # App entry point — BrowserRouter + ThemeProvider
├── App.jsx                         # Route definitions
├── Layout.jsx                      # Shared shell — Navbar + Outlet + Footer
├── index.css                       # Global resets
├── candid-jobs.css                 # Full design system — variables, components, screens
│
├── context/
│   └── ThemeContext.jsx            # Theme state, toggle, OS preference sync
│
├── components/
│   ├── Navbar.jsx                  # Site navigation with ThemeToggle
│   └── Footer.jsx                  # Site footer
│
├── hooks/
│   └── useSendPrompt.js            # Navigation hook replacing sendPrompt()
│
└── pages/
    ├── LandingPage.jsx             # Marketing landing page
    ├── AccountabilityPage.jsx      # Employer accountability framework (tabbed)
    ├── OnBoardingFlowPage.jsx      # Seeker onboarding — 6-step flow
    ├── ApplicationDashboardPage.jsx# Seeker dashboard — applications, feedback, watchlist
    ├── BulkResponsePage.jsx        # Employer bulk-respond flow — 4-step flow
    └── NotFoundPage.jsx            # 404
```

---

## Routes

| Path                        | Page           | Description                                                          |
| --------------------------- | -------------- | -------------------------------------------------------------------- |
| `/`                         | Landing        | Platform overview and value proposition                              |
| `/employers/accountability` | Accountability | Onboarding contract, flag system, employer dashboard, feedback rules |
| `/employers/response`       | Bulk respond   | 4-step flow for responding to multiple applicants at once            |
| `/seekers/onboarding`       | Onboarding     | 6-step seeker registration and preference setup                      |
| `/seekers/dashboard`        | Dashboard      | Active applications, feedback log, watchlist                         |
| `*`                         | Not found      | 404 fallback                                                         |

---

## Getting started

**Install dependencies**

```bash
npm install
```

**Start the development server**

```bash
npm run dev
```

**Build for production**

```bash
npm run build
```

**Preview the production build**

```bash
npm run preview
```

**Lint**

```bash
npm run lint
```

---

## Theming

The app defaults to the user's OS preference (`prefers-color-scheme`) on first visit. The user's manual choice is persisted to `localStorage` and restored on return visits. The theme toggle in the navbar flips between light and dark modes instantly.

All colours are driven by CSS custom properties defined in `candid-jobs.css`. The `ThemeContext` sets `data-theme="light"` or `data-theme="dark"` on `<html>`, which the CSS responds to via attribute selectors — no JavaScript is involved in the actual colour switching.

---

## Design system

`candid-jobs.css` is a single-file design system covering:

- CSS custom property tokens (backgrounds, text, borders, radii)
- Light and dark mode definitions
- Base document styles (`html`, `body`, `#root`)
- All component classes across every screen (landing, accountability, onboarding, seeker dashboard, bulk-respond flow, enhanced dashboard)
- Theme toggle, footer, and toast component styles
- Responsive breakpoints at 700px

The design uses the **DM type family** — DM Serif Display for headings, DM Sans for body, and DM Mono for labels, badges, and metadata. The brand accent is amber (`#BA7517`).
