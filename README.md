# BuildMaster ERP — Construction Management Demo

Interactive UI prototype for a modern Construction ERP platform. This demo uses mock data and fake authentication — no production backend.

## Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **shadcn/ui**
- **GSAP** & **Framer Motion** (animations)
- **TanStack Table**
- **Recharts**
- **Lucide Icons**
- **next-themes** (dark mode)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Demo Login

| Field    | Value                   |
|----------|-------------------------|
| Email    | `admin@buildmaster.com` |
| Password | `demo123`               |

## Project Structure

```
app/
  (auth)/login/          # Login page
  (dashboard)/           # Protected app routes
    dashboard/
    projects/
    inventory/
    purchase/
    dpr/
    labour/
    machinery/
    analytics/
    client/
    settings/
components/
  dashboard/             # Dashboard-specific components
  layout/                # Shell, sidebar, header
  providers/             # Theme & auth providers
  ui/                    # shadcn/ui primitives
data/                    # Mock data (projects, materials, etc.)
hooks/                   # Custom React hooks
lib/                     # Utilities, auth, formatters
types/                   # Shared TypeScript types
public/                  # Static assets
```

## Demo Flow

Login → Dashboard → Projects → Project Details → Inventory → Purchase Orders → DPR → Labour → Analytics → Client Portal

## Scripts

| Command       | Description              |
|---------------|--------------------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build       |
| `npm run start` | Start production server |
| `npm run lint`  | Run ESLint             |

## Team Modules

| Developer | Modules                              |
|-----------|--------------------------------------|
| Dev 1     | Dashboard, Analytics, Authentication |
| Dev 2     | Projects, Inventory, Purchase        |
| Dev 3     | DPR, Labour, Machinery, UI Polish    |

## Brand Colors

| Token     | Hex       |
|-----------|-----------|
| Primary   | `#0F172A` |
| Secondary | `#2563EB` |
| Success   | `#10B981` |
| Warning   | `#F59E0B` |
| Danger    | `#EF4444` |
| Background| `#F8FAFC` |

## Notes

- All API calls are simulated via `lib/mock-api.ts`
- Auth is cookie-based mock auth for demo routing only
- See `description.md` for the full project plan and presentation script
