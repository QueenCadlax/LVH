# Copilot Instructions — LowveldHub

Essential knowledge for AI agents working on this luxury B2B directory for Mpumalanga (South Africa).

**Last Updated:** February 5, 2026 | **Frontend:** React 19 + TypeScript + Vite (~4762 lines) | **Backend:** Express + TypeScript + PostgreSQL (15 route modules) | **AI:** Google Gemini 3-Flash | **Status:** Phase 3 Production-ready

---

## ⚡ Five Critical Patterns (READ THESE FIRST)

1. **Monolithic Frontend State.** All app state in [App.tsx](App.tsx). No Redux/Context. Route via `handleNavigate(view, category?, id?, sub?)` only—never use React Router.
2. **Backend Build Pipeline.** ALWAYS: `cd backend && npm run build` THEN `node dist/server.js`. This two-step is critical; `npm run dev` hides TypeScript errors.
3. **Seed Data = Demo Only.** 32 files, ~4000 listings, re-initialized every render. Real persistence via backend PostgreSQL API. Never mutate seed imports.
4. **AI Calls Centralized.** ALL `@google/genai` calls go through [services/aiService.ts](services/aiService.ts) only. Functions wrap in try/catch, return sensible defaults.
5. **Detail Views Scroll.** Every detail component must call `window.scrollTo(0, 0)` in useEffect on mount, or users get stuck mid-page.

**Before coding, verify you understand these.** They're non-negotiable.

---

## 30-Second Architecture Overview

**Frontend:** Monolithic React SPA (~4762 lines). All state in [App.tsx](App.tsx). 50+ views rendered via switch on `currentView` state. No routing library—explicit `handleNavigate()` function.

**Backend:** Express REST API with 15 routes (auth, admin, dashboard, user, agents, loyalty, activity, products, submissions, enquiry, business, review, subscription, favorite, newsletter). All routes in [backend/src/routes/](backend/src/routes/), services in [backend/src/services/](backend/src/services/).

**Data:** Seed data (32 files in [data/](data/)) is demo-only mockup. Real persistence = PostgreSQL backend. Frontend fetches from backend for user-created content.

**Key Files:**
- [App.tsx](App.tsx) — All routing, state, views
- [types.ts](types.ts) — Master type definitions (30 Category enum values, 4 ListingTier levels, 65+ Mpumalanga areas)
- [services/aiService.ts](services/aiService.ts) — Gemini 3-Flash integration (16 functions)
- [backend/src/server.ts](backend/src/server.ts) — Express app setup + 15 route mounts
- [backend/src/middleware/](backend/src/middleware/) — Auth, admin validation, rate-limiting

---

## Must-Know Patterns

### Navigation (Never use React Router)
```typescript
// Pattern: handleNavigate(view, category?, id?, sub?)
handleNavigate('business-detail', undefined, 'b_123');  // View listing by ID
handleNavigate('directory', 'FOOD & HOSPITALITY');      // Filter by category
handleNavigate('login');                                 // Protected routes redirect here
```
Function atomically updates state + scrolls to top. All navigation must use this.

### AI Calls (Never import @google/genai in components)
```typescript
// ✅ Correct: route through aiService
import { chatWithConcierge } from '@/services/aiService';
const response = await chatWithConcierge(message, history);

// ❌ Wrong: importing SDK directly
import { GoogleGenAI } from '@google/genai';
const ai = new GoogleGenAI(...);  // NO—violates centralization
```

### Detail Views (Must scroll to top)
```typescript
// Pattern: All detail components follow this structure
export default function PropertyDetailView({ id, navigate }: Props) {
  useEffect(() => {
    window.scrollTo(0, 0);  // REQUIRED—missing this breaks UX
  }, [id]);
  
  const property = localBusinesses.find(b => b.id === id);
  return <div>{/* render property */}</div>;
}
```

### Backend Routes (Middleware chain pattern)
```typescript
// Pattern: authMiddleware → isAdmin (if needed) → handler
router.get('/:id', authMiddleware, async (req: AuthRequest, res) => {
  const user = req.user;  // Populated by authMiddleware
  if (!user) return res.status(401).json({ error: 'Unauthorized' });
});

// Admin-only route
router.patch('/verify', authMiddleware, isAdmin, async (req: AuthRequest, res) => {
  // isAdmin middleware checks req.user.role === 'admin'
});
```

### API Response Contract (Always follow format)
```typescript
// Success
{ success: true, data: {...}, message?: "..." }

// Error
{ error: "descriptive message", status: 400 }

// Pagination
{ success: true, data: [...], pagination: { page, limit, total, pages } }
```

---

## Quick Reference Table

| Task | Code Pattern | Key File |
|------|-------------|----------|
| Navigate to view | `handleNavigate('home')` | App.tsx (~line 3200+) |
| Filter by category | `handleNavigate('directory', 'FOOD & HOSPITALITY')` | App.tsx |
| View business details | `handleNavigate('business-detail', undefined, 'b_123')` | App.tsx |
| Call Gemini | `import { chatWithConcierge } from '@/services/aiService'` | services/aiService.ts |
| Check tier | `if (listing.tier === ListingTier.Platinum)` | types.ts |
| Add detail view | Create component, lazy-import, wrap Suspense, call scroll | components/*Detail.tsx |
| Create backend route | Add to routes/*.ts, chain middleware, return std JSON | backend/src/routes/ |
| Protected route | Check `isAuthenticated`, redirect to 'login' if false | App.tsx auth logic |
| Filter by area | `handleNavigate('directory', cat, id, 'All Areas')` | types.ts (65+ areas) |
| Marketplace product | Use ProductCard + MARKETPLACE_CATEGORY_GROUPS | components/Marketplace/ |

---

## Essential Architecture Facts

**Frontend State Management:**
- `currentView`: Active view ('home', 'directory', 'business-detail', etc.)
- `selectedBusinessId`: ID of currently displayed listing
- `activeCategory`, `activeSub`: Filter state
- `activeArea`: Selected Mpumalanga area (default 'All Areas')
- `localBusinesses`: Memoized, re-filtered array (never mutate directly)
- `favorites`: Set<string> of favorited IDs
- `isAuthenticated`, `currentUser`: JWT auth state

**Backend Stack:**
- Express.js on port 5000
- PostgreSQL (6 tables: users, businesses, admins, admin_logs, subscriptions, payments)
- JWT auth (30-day expiration)
- bcryptjs password hashing (10 rounds)
- 15 route modules with middleware-based auth/admin validation

**Seed Data Structure:**
- 32 modular files in [data/](data/) aggregated by [data/seeds.ts](data/seeds.ts)
- ~4000 listings across 30+ categories
- IDs must be globally unique (use prefixes: `b_`, `r_`, `p_`)
- Every listing must have `image` field (URL) or hero sections break
- Re-initialized every render; never persists across page reloads

---

## Common Developer Tasks

### Adding a New Listing Category
1. Update `Category` enum in [types.ts](types.ts)
2. Create seed file in [data/](data/) with ~100 listings
3. Import seed in [App.tsx](App.tsx) lines 11-40
4. Test navigation: `handleNavigate('directory', 'YOUR_CATEGORY')`

### Creating a New Detail View
1. Create component file (e.g., `components/MyDetailView.tsx`)
2. Wrap in Suspense + LoadingSpinner
3. Add routing case in App.tsx switch statement
4. Component receives `id` and `navigate` props
5. Must call `window.scrollTo(0, 0)` in useEffect on mount
6. Example: Search `localBusinesses` array for matching ID

### Adding a Backend API Endpoint
1. Create route file in [backend/src/routes/](backend/src/routes/) or add to existing
2. Export router, mount in [backend/src/server.ts](backend/src/server.ts)
3. Use middleware chain: `authMiddleware` (if protected), then `isAdmin` (if admin-only)
4. Return standardized JSON: `{ success: true, data: {...} }` or `{ error: "...", status: code }`
5. Frontend calls via: `fetch('http://localhost:5000/api/path', { headers: { Authorization: `Bearer ${token}` } })`

### Calling Gemini AI from Components
1. Import from centralized service: `import { functionName } from '@/services/aiService'`
2. Call function: `const result = await functionName(params)`
3. Function wraps in try/catch, returns sensible defaults
4. All errors logged to console—UI never breaks due to AI failures
5. Never import `@google/genai` directly in components

---

## Critical "Do NOT" Rules

1. **Don't use React Router.** Navigation through `handleNavigate()` only.
2. **Don't import `@google/genai` in components.** Route through [services/aiService.ts](services/aiService.ts).
3. **Don't mutate `localBusinesses` directly.** Trigger updates via state setters.
4. **Don't create duplicate seed IDs.** IDs must be globally unique across all 32 files.
5. **Don't skip `window.scrollTo(0, 0)` in detail views.** Users will get stuck mid-page.
6. **Don't forget image fields on listings.** Missing images break hero sections.
7. **Don't run backend with `npm run dev` or `ts-node`.** Always: `npm run build` then `node dist/server.js`.
8. **Don't forget to check `isAuthenticated` on protected routes.** Dashboard access must validate auth first.
9. **Don't deviate from API response format.** All endpoints: `{ success: true, data: {...} }` or `{ error: "...", status: code }`.
10. **Don't start backend without verifying PostgreSQL is running.** Check: `netstat -an | findstr :5432` (Windows).

---

## Build & Deployment

**Frontend (root directory):**
```bash
npm install                      # Install dependencies
npm run dev                      # Vite dev server on http://localhost:3000
npm run build                    # Production build → dist/
```

**Backend (backend/ directory):**
```bash
npm install                      # Install dependencies
npm run build                    # REQUIRED: Compile TypeScript → dist/
node dist/server.js              # Run compiled server (not npm run dev)
npm run migrate                  # ts-node migrations (initialize DB)
npm run seed                     # Create default admin account
```

**Both must run simultaneously** in separate terminals for full-stack testing. Frontend API calls route to `http://localhost:5000/api/*`.

**Backend health check:** `curl http://localhost:5000/health` should return `{ status: "ok", timestamp }"`.

---

## Phase 3 Completion Status

✅ **Frontend:** 50+ views, error boundaries, lazy loading, Suspense fallbacks
✅ **Backend:** 15 routes, auth middleware, admin validation, rate-limiting
✅ **Database:** 6 tables with indices, constraints, foreign keys
✅ **Admin System:** Dashboard, business verification, tier management, audit logs
✅ **AI Integration:** 16 Gemini functions (search, recommendations, descriptions, itinerary)
✅ **Marketplace:** C2C product listing with ProductSubmissionFormV2
✅ **Business Submission:** 5-step form, package selection (R799/R1,299/R1,999)
✅ **Loyalty System:** Points, tier progression, reward redemption
✅ **Security:** JWT (30-day), bcryptjs (10 rounds), helmet.js, rate-limiting

All systems production-ready. No critical issues known.

## For New Agents: Start Here

This is a **full-stack luxury business directory** with these critical constraints:
1. **Frontend is monolithic** — All routing, state, and views live in one ~4639-line App.tsx component. Use `handleNavigate(view, category?, id?, sub?)` for all navigation.
2. **All AI calls go through `aiService.ts`** — Never import `@google/genai` directly. All functions wrap in try/catch and return safe defaults.
3. **Seed data re-initializes every render** — It's read-only demo data. Real persistence comes from backend PostgreSQL API calls.
4. **Detail views must scroll to top** — Always call `window.scrollTo(0, 0)` in a useEffect on mount, or users get lost mid-page.
5. **Backend build MUST precede runtime** — Always run `cd backend && npm run build` before `node dist/server.js` or backend fails silently.
6. **Phase 3 is production-ready** — 6 database tables, 14 API routes, complete error handling, audit logging, and middleware security in place.

**Key directories:**
- `App.tsx` — Monolithic frontend (all state, routing, 50+ views)
- `types.ts` — Master type definitions (28 `Category` values, 4 `ListingTier` levels, 65+ areas)
- `services/aiService.ts` — ONLY place for Gemini API calls
- `data/` — 32 seed files with 4000+ listings (demo data)
- `backend/src/routes/`, `services/`, `controllers/` — REST API (14 route modules, PostgreSQL backend)
- `components/` — UI components (LuxuryCard is the main card component)

**Quick wins for common tasks:** See reference table below.

| Task | Pattern | Key Files |
|------|---------|-----------|
| Navigate between views | `handleNavigate(view, category?, id?, sub?)` | App.tsx (~line 3200+) |
| Call Gemini API | `import { chatWithConcierge } from '@/services/aiService'` | services/aiService.ts |
| Add new listing view | Wrap in Suspense + LoadingSpinner, call `window.scrollTo(0, 0)` in useEffect | components/*Detail.tsx |
| Create backend route | Add to backend/src/routes/*.ts, chain: authMiddleware → isAdmin → handler | backend/src/routes/ |
| Handle favorites | Use `toggleFavorite(id)` state setter (not persisted to backend by default) | App.tsx state section |
| Filter by area | Assign `activeArea` from MPUMALANGA_AREAS, localBusinesses re-filters automatically | types.ts (65+ areas) |
| Fix backend startup | Run `cd backend && npm run build` FIRST, then `node dist/server.js` | backend/package.json |
| Access protected routes | Check `isAuthenticated`, redirect to login via `handleNavigate('login')` | App.tsx auth logic |
| Add Marketplace product | Use ProductCard component with MARKETPLACE_CATEGORY_GROUPS filtering | components/Marketplace/ProductCard.tsx |
| Create Business Submission form | Multi-step form with validation; see BusinessSubmissionFormV2.tsx as reference | components/BusinessSubmissionFormV2.tsx |

## Phase 3 Status & Production Readiness

**✅ Completed:**
- **Frontend:** All 50+ views implemented, error boundaries, lazy loading with Suspense
- **Backend:** 14 route modules with full middleware stack (auth, admin, rate-limiting)
- **Database:** 6 tables (users, businesses, admins, admin_logs, subscriptions, payments) with indices & constraints
- **Admin System:** Dashboard, business verification workflow, tier management, audit logging
- **AI Integration:** 16 Gemini functions (search, recommendations, descriptions, itinerary generation)
- **Marketplace:** C2C product listing with ProductSubmissionFormV2
- **Business Submission:** 5-step form with package selection (R799/R1,299/R1,999)
- **Loyalty System:** Points calculation, tier progression, reward redemption
- **Security:** JWT auth (30-day expiration), bcryptjs hashing (10 salt rounds), helmet.js, rate-limiting

**🔧 Integration Points (Ready for Testing):**
- Frontend ↔ Backend API on localhost:5000/5001
- Database migrations automated via `npm run migrate`
- Admin seed user created via `npm run seed`
- All endpoints return standardized JSON format

## Quick Facts
- **Frontend:** Monolithic React SPA (App.tsx ~4639 lines) with explicit routing via `handleNavigate(view, category, id, sub)`; no React Router; 40+ lazy-loaded detail views
- **Data Model:** 30 `Category` enum values, 65+ `MPUMALANGA_AREAS`, 4 `ListingTier` levels (Trial→Premium→Elite→Platinum), 32 seed files (~4000+ listings), Google Gemini 3-Flash AI integration
- **Backend:** Express.js REST API with PostgreSQL; **14 routes** (auth, admin, dashboard, user, agents, loyalty, activity, products, submissions, enquiry, business, review, subscription, favorite); middleware-based auth + rate-limiting + error handling
- **Core Architecture:** Seed data (read-only, re-initialized per render) + backend API for persistence. No Redux/Context—all state in App.tsx for single-source-of-truth
- **Key Services:** `aiService.ts` (all Gemini calls), `realEstateService.ts` (property-specific logic), `services/` layer for domain logic
- **Security:** JWT auth, bcryptjs hashing, helmet.js, CORS to localhost:3000, rate-limiting on routes
- **Database:** 6 tables (users, businesses, admins, admin_logs, subscriptions, payments); full schema with indices + foreign keys

## Critical Files & Architecture

**Frontend Core:**
- **[App.tsx](App.tsx) (~4639 lines):** Monolithic React component housing ALL state, routing, and views. Primary state: `currentView`, `selectedBusinessId`, `activeCategory`, `activeSub`, `activeArea`, `localBusinesses` (memoized, re-initialized from seed imports), `favorites`, `isAuthenticated`. Router: `handleNavigate(view, category?, id?, sub?)` atomically updates state + scrolls to top. Contains 50+ view cases in render switch statement. Error Boundary + 404 handler included.
- **[types.ts](types.ts) (~1514 lines):** Master type definitions—update FIRST when adding features. Defines: `Category` enum (30 values), `ListingTier` (Trial/Premium/Elite/Platinum), `Business` interface, `Property`, `MarketplaceItem`, `Story`, `PRICING_STRUCTURE`, `MARKETPLACE_CATEGORY_GROUPS`, `MPUMALANGA_AREAS` (65+ areas), `CategorySubcategories` (subcategory mapping).

**Services (Frontend):**
- **[services/aiService.ts](services/aiService.ts) (~642 lines):** **ONLY place to call Gemini API**—never import `@google/genai` elsewhere. All functions wrap in try/catch, return sensible defaults. Uses `gemini-3-flash-preview` (text, fast, cost-effective). Exported: `getSmartRecommendations`, `chatWithConcierge`, `chatWithConciergeEnhanced`, `performSmartSearch`, `performSmartMedicalSearch`, `generateListingDescription`, `generateAIListingDetails`, `generateLuxuryPlaceholder` (images via Gemini 2.5), `generateReviewSummary`, `findBusinessMatches`, `generateAreaGuide`, `getPropertyRecommendations`.
- **[services/realEstateService.ts](services/realEstateService.ts):** Wraps aiService for property domain. Exports: `getNeighborhoodScore(area)` (safety/amenities/schools/transport/growth scores, currently mocked), `generateVirtualStaging(title)` (calls aiService.generateLuxuryPlaceholder, returns image URL or Unsplash fallback).

**UI Components:**
- **[components/Shared.tsx](components/Shared.tsx):** `LuxuryCard` (tier badges Platinum→purple, Elite→gold, favorites heart), `SectionTitle`, `AdvancedFilterPanel`, `AuthModal`, `PrimaryButton`, `HeroFilterHeader`, `CategoryCard`, `AreaSelector`.
- **[components/Marketplace/](components/Marketplace/):** ProductCard, ProductGrid, FiltersPanel, SellerProfile (C2C marketplace with toggle-based category filtering via `MARKETPLACE_CATEGORY_GROUPS`).
- **30+ lazy-loaded detail views:** `EateryDetail`, `BusinessDetailView`, `RetailDetailView`, `TourismDestinationDetail`, `PropertyDetailView`, etc. Each wraps in `Suspense` + `LoadingSpinner`. All call `window.scrollTo(0, 0)` in useEffect on mount.

**Component Architecture & Lazy Loading:**
- All detail views are **dynamically imported** via `lazy()` in App.tsx and wrapped with `Suspense` + `LoadingSpinner`
- Pattern: `const ViewName = lazy(() => import('./components/ViewDetail.tsx'))`; then `<Suspense fallback={<LoadingSpinner />}><ViewName .../></Suspense>`
- This splits bundle: main app loads fast, detail views load on-demand
- **MUST DO:** Every detail view calls `window.scrollTo(0, 0)` in `useEffect` on mount—missing this leaves users mid-page
- Props pattern: detail views receive `id` prop (from `selectedBusinessId` state) + `navigate` (handleNavigate function)
- Example: To add new detail view → create file in components/ → import in App.tsx → add switch case in render → wrap with Suspense + LoadingSpinner

**Data Model:**
- **[data/](data/) directory (32 files):** Modular seed files aggregated in [data/seeds.ts](data/seeds.ts). Contains 4000+ listings across categories: businesses, eats, retail, nightlife, transport, real estate, medical, professional services, automotive, luxury lifestyle, etc. Each listing follows schema: `{id (globally unique!), name, image, rating, tier, location, category, ...type-specific fields}`. Imported in App.tsx lines 11-39.

## State Management & Routing

**All state in App.tsx.** No Redux/Context—intentional monolithic design:
- `currentView`: string ('home', 'directory', 'eats', 'marketplace', 'business-detail', 'real-estate', 'admin', etc.)
- `selectedBusinessId`: ID of currently viewed listing
- `activeCategory`, `activeSub`: current filter (use `Category` enum + `CategorySubcategories`)
- `activeArea`: selected Mpumalanga area (default 'All Areas'); filters `localBusinesses`
- `localBusinesses`: **memoized, re-initialized from seed imports on every render** to avoid stale state. Re-filters based on category/area/search. Never mutate directly.
- `favorites`: Set<string> of business IDs; persisted to localStorage
- `isAuthenticated`, `currentUser`: JWT auth state; checked for protected routes (dashboard)
- `conciergePrefs`: VIP preferences (favorites, budget, areas); persisted to localStorage
- `chatMessages`: Concierge conversation history

**Navigation Pattern:** 
- **Use `handleNavigate(view, category?, id?, sub?)` for ALL routing.** Never use React Router or browser history.
- Function atomically: updates state (currentView, activeCategory, etc.) + calls `window.scrollTo(0, 0)` + closes menu
- Protected routes (dashboard) check `isAuthenticated`; redirect to login if not
- Detail views receive `id` via `selectedBusinessId` state; search `localBusinesses` array to render
- Example: `handleNavigate('business-detail', undefined, 'b_123')` → renders BusinessDetailView with ID b_123

**Detail View Pattern:**
- All detail views are lazy-loaded via `Suspense` + `LoadingSpinner`
- Each **MUST** call `window.scrollTo(0, 0)` in useEffect on mount
- Receive `id` prop (from `selectedBusinessId` state)
- Search `localBusinesses` to find matching business, render its details
- Example: `EateryDetail`, `BusinessDetailView`, `RetailDetailView`, `PropertyDetailView`

## Listing Tier System

`ListingTier` enum in [types.ts](types.ts): `Trial` → `Premium` → `Elite` (gold glow) → `Platinum` (purple glow).

- **Before rendering premium UI, always check:** `if (listing.tier === ListingTier.Platinum) { /* purple glow */ }`
- `PRICING_STRUCTURE` in [types.ts](types.ts) maps tiers to cost; **update both together**.
- Examples: Kuka Café = `ListingTier.Elite`, University of Mpumalanga = `ListingTier.Platinum`.
- Tier glows enforced in `LuxuryCard` (line ~73): Platinum → purple shimmer, Elite → gold shimmer.

## AI Integration Pattern

**All Gemini calls must be in [services/aiService.ts](services/aiService.ts) only.** Never import `@google/genai` elsewhere in components.

**Exported functions (16 total):**
- `getSmartRecommendations(query)`: Maps search → `Category` enum values using responseSchema with JSON output
- `chatWithConcierge(message, history)`: Basic multi-turn chat with SA context awareness
- `chatWithConciergeEnhanced(message, preferences, history)`: Advanced chat with user preferences & itinerary context; may return updated preferences
- `generateListingDescription(name, type)`: Generates 2-sentence SEO descriptions
- `generateAIListingDetails(name, type, context)`: Returns structured `{description, tags[], category}`
- `generateCarImage(name)`, `generateLuxuryPlaceholder(title)`: Image generation via Gemini 2.5 Flash
- `performSmartSearch(query, allBusinesses)`: Search ranking with tier prioritization (Platinum > Elite > Premium > Trial)
- `performSmartMedicalSearch(query, allBusinesses)`: Medical-specific search with filtering and specialization
- `generateReviewSummary(name, description)`: AI-generated review examples for listings
- `findBusinessMatches(name, category, area, allBusinesses)`: Competitor/alternative matching
- `generateAreaGuide(areaName, businesses, destinations)`: Rich area content generation
- `generateVIPItinerary(preferences)`: Full itinerary generation for VIP experiences
- `enhanceCampaignBrief(brief)`: Campaign content enhancement
- `enhanceStoryContent(story)`: Story/content enhancement

**Error Handling (Mandatory):** All AI functions wrap in try/catch and return sensible defaults; never throw:
```typescript
try {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({...});
  return JSON.parse(response.text || "{}");
} catch (error) {
  console.error("AI [FunctionName] Error", error);
  return { fallback: "sensible", data: [] }; // Match return type shape
}
```

**Response Schema Pattern:** Use `responseSchema` with `responseMimeType: "application/json"` for structured output:
```typescript
config: {
  responseMimeType: "application/json",
  responseSchema: {
    type: Type.ARRAY,
    items: { type: Type.STRING }
  }
}
```

**Models & API Key:** 
- Text: `gemini-3-flash-preview` (fast, cost-effective)
- Images: `gemini-2.5-flash-image` (use only for image generation tasks)
- API key: Injected via [vite.config.ts](vite.config.ts) from `.env.local` `GEMINI_API_KEY` as `process.env.API_KEY`
- **No hot reload for `.env.local`:** Restart dev server after updating API key

## Backend Architecture (Express + PostgreSQL)

**Server entry:** [backend/src/server.ts](backend/src/server.ts) - mounts **12 route modules**, security middleware (helmet, CORS, rate-limiter), error handler.

**Route modules** (in [backend/src/routes/](backend/src/routes/)):
- `authRoutes.ts`: POST `/login`, `/register`, `/refresh-token`, `/verify-email`, `/password-reset`
- `businessRoutes.ts`: GET/POST/PUT `/businesses`, `/businesses/:id`, filtering by category/area/tier
- `reviewRoutes.ts`: POST reviews, GET reviews for business
- `enquiryRoutes.ts`: Create/retrieve business enquiries
- `favoriteRoutes.ts`: Add/remove favorites, user favorites list
- `adminRoutes.ts`: Admin-only: verify businesses, manage listings, user management
- `subscriptionRoutes.ts`: Manage tier upgrades, billing
- `submissionRoutes.ts`: Business submission workflow (multi-step forms from frontend)
- **`dashboardRoutes.ts`:** User dashboard stats, reward points, saved items, recent activity, analytics
- **`userRoutes.ts`:** User profile management, preferences, settings
- **`agentRoutes.ts`:** Agent tracking, progress monitoring, achievements (admin + user endpoints)
- **`loyaltyRoutes.ts`:** Loyalty points, rewards, tier progression
- **`activityRoutes.ts`:** Activity logging, user action history, engagement tracking
- **`productRoutes.ts`:** Marketplace product management (New in Phase 3)

**Models** (in [backend/src/models/](backend/src/models/)):
- `Business.ts`: Core listing interface with `id`, `uuid`, `ownerId`, `name`, `slug`, `tier`, `category`, `area`, `trustScore`, `rating`, `reviewCount`, `status`
- `Admin.ts`: Admin user model with role-based permissions
- `loyalty_points` table: user_id, points, created_at, transaction_type
- `agents` table: user_id, target_value, current_progress, achievements JSON
- `activities` table: user_id, action_type, description, timestamp
- `messages` table: sender_id, recipient_id, content, read status, timestamp

**Services** (in [backend/src/services/](backend/src/services/)):
- `businessService.ts`: Business CRUD, filtering, search, tier validation, slug generation
- `authService.ts`: JWT token generation/verification, password hashing, email verification
- `reviewService.ts`: Review aggregation, rating calculation, spam detection
- `favoriteService.ts`: User favorite management, persistence
- `subscriptionService.ts`: Tier upgrade logic, billing integration hooks
- `enquiryService.ts`: Business enquiry handling, notification scheduling
- `adminService.ts`: Admin operations (verify businesses, suspend accounts)
- `dashboardService.ts`: Dashboard aggregation (stats, rewards, activity summaries)
- `userService.ts`: User profile, preferences, account management
- `agentService.ts`: Agent tracking, progress monitoring, performance metrics
- `loyaltyService.ts`: Points calculation, tier progression, reward redemption
- `activityService.ts`: Activity logging, event tracking, engagement metrics
- `messagingService.ts`: User-to-user messaging, notifications, message history
- `imageService.ts`, `imageDbService.ts`: Image upload/storage (Cloudinary-ready)

**Controllers** (in [backend/src/controllers/](backend/src/controllers/)): 
- Route handlers map to service methods; validate input via `express-validator`, return JSON responses with HTTP status codes

**Middleware** (in [backend/src/middleware/](backend/src/middleware/)):
- `authMiddleware.ts`: JWT verification, `req.user` population; exports `AuthRequest` type with user property
- `isAdmin.ts`: Admin role verification; used with authMiddleware to gate admin-only endpoints
- `rateLimiter.ts`: Express-rate-limit with per-IP buckets
- `errorHandler.ts`: Global error catching, standard error response format with status codes
- **Pattern:** Chain middlewares in order → `authMiddleware` first (populates `req.user`), then `isAdmin` if needed → handler

**Database config** (in [backend/src/config/env.ts](backend/src/config/env.ts)):
- PostgreSQL connection params via `.env`: `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`
- Environment validation: required vars checked at startup (production throws on missing DB vars)

**Frontend-Backend Integration:**
- Frontend seed data (32 files) is **read-only reference**; real data sources are backend API endpoints
- Frontend `handleNavigate()` may call backend API to fetch detail data if business exists in DB
- Favorites/preferences sync: frontend state → backend via authenticated endpoints
- User auth: LoginPage calls `POST /api/auth/login`, receives JWT, stores in memory, validates on protected routes

**Critical Workflow:**
1. Frontend user action → `handleNavigate()` or component method
2. If data fetch needed → call backend API (not seed data)
3. Backend validates request (auth middleware, express-validator)
4. Service layer handles business logic (filtering, tier checks, aggregations)
5. Response → frontend state update
6. UI re-renders with fresh data

**Error Patterns:**
- Backend returns `{ error: string, status: number }` on failures
- Frontend catches errors and displays user-friendly messages
- All service methods wrap in try/catch; critical errors logged to console

## Real Estate Service Pattern

**[services/realEstateService.ts](services/realEstateService.ts) wraps domain-specific logic for property features.** Do NOT call aiService directly from RealEstate components; route through realEstateService instead.

**Exported functions:**
- `getNeighborhoodScore(area)`: Returns `NeighborhoodScore` object with algorithmic scores (safety, amenities, schools, transport, growthIndex, composite, comparableMedianPrice). Currently mocked; replace with backend analytics call in production.
- `generateVirtualStaging(title)`: Generates property image via `aiService.generateLuxuryPlaceholder()`; returns image URL or fallback Unsplash link on error.

**Pattern:** All RealEstate sub-components ([NeighborhoodIntelligence.tsx](components/RealEstate/NeighborhoodIntelligence.tsx), [VirtualStaging.tsx](components/RealEstate/VirtualStaging.tsx), [VirtualTour.tsx](components/RealEstate/VirtualTour.tsx), [InvestmentCalculator.tsx](components/RealEstate/InvestmentCalculator.tsx)) import and call `realEstateService` methods, never `aiService` directly. This maintains separation of concerns and simplifies API management.

## Seed Data Organization

**Source:** 32 modular seed files in [data/](data/) aggregated by [data/seeds.ts](data/seeds.ts). All follow schema: `{id, name, image, rating (0-5), tier (ListingTier), location, category (Category)}` + type-specific fields.

**Import Pattern in App.tsx (lines 11-34):** 
Destructure imports at top of file:
```typescript
import { businesses, nightlifeVenues, retailers, professionals, ... } from './data/seeds';
import { freightHaulageCompanies, logisticsWarehousingCompanies, ... } from './data/transportSeeds';
// Then combine all in localBusinesses state initialization
```

**Critical Notes:**
- **ID uniqueness:** All listing IDs must be globally unique across ALL seed files. Collisions cause routing failures. Use prefixes (`b_`, `r_`, `p_`) or numeric suffixes.
- **Image fields:** Every listing MUST have an `image` field (URL or path); missing images break hero sections (`h-[48vh]`).
- **Tier significance:** Affects UI rendering (gold/purple glow), search ranking, and feature access.
- **Location field:** Must match or contain a value from `MPUMALANGA_AREAS` array in [types.ts](types.ts) for area filtering to work.

**Major Seed File Categories:**
- **Core directories:** businessSeeds, eatsSeeds, retailSeeds, nightlifeSeeds, tourismTravelSeeds, transportSeeds
- **Specialized services:** healthMedicalSeeds, expandedMedicalSeeds, specialistMedicalSeeds, familyKidsSeeds, homeConstructionTradesSeeds, businessProfessionalSeeds
- **Real estate & mobility:** realEstatePropertySeeds, automotiveSeeds, agriMiningIndustrialSeeds
- **Luxury & lifestyle:** luxuryLifestyleSeeds, wineAndSpiritsSeeds, shoppingRetailSeeds, financeMoneyServicesSeeds
- **Services & support:** recruitmentAndStaffingSeeds, domesticAndPersonalServicesSeeds, convenienceAndDailyNeedsSeeds, governmentPublicServicesSeeds
- **Additional:** itMediaCreativeSeeds, jobsAndCareersSeeds, womenHealthAndMaternalSeeds, nightlifeEntertainmentSeeds, rfqSeeds, additionalPremiumSeeds, missingSeeds

## UI Components & Patterns

**`LuxuryCard`** (in [components/Shared.tsx](components/Shared.tsx)):
- Automatically handles tier badges (gold for Elite, purple for Platinum)
- Manages favorites, ratings, contact modals
- Props: `id`, `title`, `image`, `logo`, `rating`, `reviewCount`, `price`, `location`, `isElite`, `isPlatinum`, `isFavorite`, `onToggleFavorite`, `onPress`, etc.
- Use `onPress` to navigate to detail view: `onPress={() => navigate('detail-view', undefined, id)}`
- Tier glow logic (lines ~73): `if (tier === ListingTier.Platinum) { /* purple shimmer */ } else if (tier === ListingTier.Elite) { /* gold shimmer */ }`

**Responsive Design:** Mobile-first Tailwind. Grid patterns: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`. Hero heights: `h-[48vh]` (full), `h-64` (card).

**Interactive Effects:** Use `group hover:` patterns for hover states. Example: `group hover:scale-105 transition-transform`.

**Lazy Loading:** Components in `Marketplace/`, detail views (EateryDetail, BusinessDetailView, etc.) are wrapped with `Suspense` and `LoadingSpinner` to optimize initial load.

**Favorites System:** 
- `toggleFavorite(id)` mutates local state
- **Not persisted to backend** — only localStorage if explicitly added
- State shape: `favorites` is a Set<string> of business IDs

## South African Localization

- **Areas:** `MPUMALANGA_AREAS` constant in [types.ts](types.ts) (65+ areas).
- **Slang mapping in AI prompts:** "shisanyama" → braai/restaurant, "bakkie" → light truck, "koppie" → hill, "boma" → outdoor venue.
- **Currency:** Rand (R), format as "R X,XXX".
- **Concierge ranking:** verified/Premium/Elite/Platinum first, then proximity + rating.

## Critical Backend Startup Issues & Fixes

⚠️ **KNOWN ISSUE:** Backend startup frequently fails with TypeScript compilation errors during `npm run dev`. This is a **build issue**, not a runtime issue.

**Symptoms:**
- `npm run dev` exits with code 1
- `npx ts-node src/server.ts` fails with TypeScript errors
- Backend never reaches "listening on port 5000" message

**Fix (REQUIRED EVERY SESSION):**
1. **Clean build first:** `cd backend && npm run build` (compiles TypeScript to `dist/`)
2. **Verify build succeeded:** Check that `backend/dist/` directory exists with `.js` files
3. **Run compiled code:** `node dist/server.js` (do NOT use ts-node or npm run dev)
4. **Verify health endpoint:** From another terminal: `curl http://localhost:5000/health` should return `{"status":"ok","timestamp":"..."}`

**Why this works:**
- `npm run dev` in backend/package.json runs `npm run build && node dist/server.js` but build failures hide errors
- Separated build+run allows debugging TypeScript issues independently
- Backend requires compiled JavaScript; `ts-node` attempts runtime compilation and fails on certain import patterns

**Ongoing debugging:**
- If build fails: Run `npx tsc --noEmit` to see full TypeScript errors
- If build succeeds but runtime fails: Check `dist/server.js` exists and run `node dist/server.js` with `--trace-uncaught` flag
- Kill any orphan Node processes: `Get-Process | Where-Object {$_.ProcessName -match "node|ts-node"} | Stop-Process -Force -ErrorAction SilentlyContinue`

**Frontend-Backend separation (CRITICAL FOR DEV):**
- Frontend (`npm run dev` from root) = Vite on http://localhost:3000
- Backend (`node dist/server.js` from backend/) = Express on http://localhost:5000
- Frontend API calls route to `http://localhost:5000/api/*`
- **Both must run simultaneously** in separate terminals for full-stack testing

## Backend Startup Diagnostic Checklist

When backend fails to start, follow this checklist:

1. **Check environment variables (FIRST):**
   - `cd backend && cat .env` — Verify `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` are set
   - Missing: Copy from `.env.example` or set manually (DB must be PostgreSQL on localhost:5432 by default)

2. **Check if PostgreSQL is running:**
   - Windows: `netstat -an | findstr :5432` should show LISTENING
   - If not running: Start PostgreSQL service (Services → PostgreSQL)

3. **Clean build (remove old dist/):**
   ```bash
   cd backend
   rm -r dist  # or Remove-Item -Recurse dist on Windows
   npm run build
   ```

4. **Check TypeScript compilation errors:**
   ```bash
   npx tsc --noEmit  # Shows all type errors without emitting
   ```

5. **Check dist/ directory created:**
   ```bash
   ls dist/server.js  # Should exist with > 0 bytes
   ```

6. **Run with verbose output:**
   ```bash
   node dist/server.js  # No flags — should see console.log statements
   ```

**If it still fails:**
- Check [backend/src/server.ts](backend/src/server.ts) line 1-10 for global error handlers (they should log all crashes)
- Check [backend/tsconfig.json](backend/tsconfig.json) — `target`, `module`, `esModuleInterop` must be compatible
- Kill orphaned processes: `Get-Process | Where-Object {$_.ProcessName -eq "node"} | Stop-Process -Force`

## Protected Routes & Error Codes

**Middleware chaining pattern (backend routes):**
```typescript
// Public route (no auth required)
router.get('/health', (req, res) => res.json({ status: 'ok' }));

// Protected route (JWT required)
router.get('/:id', authMiddleware, (req, res) => {
  const user = (req as AuthRequest).user;
  if (!user) return res.status(401).json({ error: 'Unauthorized' });
  // ... handler
});

// Admin-only route (JWT + admin role required)
router.patch('/verify', authMiddleware, isAdmin, (req, res) => {
  // isAdmin checks user.role === 'admin'
  // ... handler
});
```

**Error codes returned by protected routes:**
- `401 Unauthorized` — No JWT or JWT expired/invalid. User must re-authenticate via `/api/auth/login`
- `403 Forbidden` — User is authenticated but lacks required role (e.g., not admin). Check `(req as AuthRequest).user.role`
- `404 Not Found` — Resource doesn't exist (business ID, user ID, etc.)
- `500 Internal Server Error` — Server crash. Check `dist/server.js` console logs

**Frontend error handling pattern:**
```typescript
try {
  const response = await fetch('http://localhost:5000/api/admin/businesses', {
    headers: { Authorization: `Bearer ${jwtToken}` }
  });
  if (response.status === 401) {
    // JWT expired/invalid — redirect to login
    handleNavigate('login');
  } else if (response.status === 403) {
    // User not admin — show "Access Denied"
    alert('You do not have permission');
  } else if (!response.ok) {
    throw new Error(await response.text());
  }
  return response.json();
} catch (error) {
  console.error('API Error:', error);
}
```

## Seed Data Persistence Lifecycle

**Current state (as of Jan 2026):**
- Seed data (32 files in [data/](data/)) is **client-side only**, re-imported on every App.tsx render
- Does NOT persist across page reloads (state is lost)
- Backend PostgreSQL has separate `businesses` table for real, persistent data
- Both can exist simultaneously; **seed data takes priority if IDs match**

**How data flows:**
1. **User views listing:**
   - Frontend searches `localBusinesses` (from seed imports) first
   - If found → render seed data
   - If not found AND user is admin → try `GET /api/businesses/:id` from database

2. **User creates/updates listing:**
   - Frontend calls `POST /api/businesses` (or `PUT`) to backend
   - Data is persisted in PostgreSQL (`businesses` table)
   - Seed data is never modified by user actions

3. **Listing moves from seed → persistent:**
   - Manually: Create backend record via API, assign unique ID that doesn't collide with seed IDs
   - Pattern: Seed IDs use prefixes (`b_`, `r_`, `p_`); new records use UUIDs
   - Example: Kuka Café (seed ID: `b_kuka_cafe`) → replicated in DB with UUID `550e8400-e29b-41d4-a716-446655440000`

**ID collision risks:**
- If seed ID = DB ID, frontend renders seed (not DB record)
- Fix: Ensure unique prefixes or use UUIDs for new records
- Warning: Never reuse seed IDs for backend records

**Best practices:**
- Don't modify seed files directly (except during development/demo)
- For permanent data, always create backend records via API
- For features targeting production: Disable seed imports, use 100% PostgreSQL

## Build & Dev Workflow

**Frontend** (from root directory):
```bash
npm install                      # Install dependencies (React 19 + TypeScript + Vite)
npm run dev                      # Vite dev server (http://localhost:3000)
npm run build                    # Production build → dist/
npm run preview                  # Preview build locally (http://localhost:4173)
```

**Backend** (from `backend/` directory):
```bash
npm install                      # Install dependencies (Express, pg, bcryptjs, jwt, etc.)
npm run build                    # REQUIRED FIRST: Compile TypeScript → dist/
node dist/server.js              # Run compiled backend (replaces npm run dev; more reliable)
npm run migrate                  # ts-node migrations/runMigrations.ts (initialize DB schema)
npm run seed                     # ts-node migrations/seedAdminUser.ts (seed admin account)
```

⚠️ **CRITICAL:** Use `node dist/server.js` instead of `npm run dev` or `ts-node` for reliable startup. Always run `npm run build` first in the session.

**Full Stack Setup:**
1. Create `.env` file in `backend/` with `DB_*`, `JWT_SECRET`, `PORT=5000`, `API_URL`, `FRONTEND_URL` (see `.env.local` template in root)
2. Ensure PostgreSQL running on localhost:5432 (or update `DB_HOST`)
3. Run `npm run migrate` in `backend/` to initialize schema
4. Run `npm run seed` in `backend/` to create default admin account
5. **Start backend:** `npm run build && node dist/server.js` in `backend/` (listens on port 5000)
6. **Start frontend:** `npm run dev` in root (Vite on port 3000, separate terminal)
7. Frontend API calls go to `http://localhost:5000/api/*`
8. Verify backend health: `curl http://localhost:5000/health` returns `{ status: 'ok', timestamp }`

**API Health Check:**
- Backend health endpoint: `GET http://localhost:5000/health` → `{ status: 'ok', timestamp }`

**Frontend API Key Setup:** Create `.env.local` with `GEMINI_API_KEY=<your-key>`. [vite.config.ts](vite.config.ts) injects it via Vite's `defineConfig`.
- **No hot reload for `.env.local` changes** — restart dev server after updating.
- Both `process.env.API_KEY` and `process.env.GEMINI_API_KEY` are injected for compatibility.

**TypeScript Paths:** `@/*` alias resolves to workspace root; use `@/data/seeds` instead of `../data/seeds` (configured in [tsconfig.json](tsconfig.json)).

**Build Optimizations (vite.config.ts):**
- Seed data files are chunked separately (`seeds-*.js`) for faster main bundle loading
- Vendor splitting: `vendor-react`, `vendor-ai`, `vendor-other` for caching
- Chunk size warning limit: 800KB

**Testing & Validation:** 
- Manual: `npm run dev` → interact → check browser Console for "AI [FunctionName] Error" logs
- Playwright tests: `scripts/test-playwright.mjs`, `scripts/smoke-playwright.mjs`
- DevTools: Network tab for Gemini API calls, Console for error logs

**Key Quirks:** 
- No hot reload for `.env.local` changes; restart dev server after updating
- Backend build must complete before runtime; always run `npm run build` first
- Use `node dist/server.js` (not `npm run dev` or `ts-node`) for stable backend startup
- Line numbers in comments drift frequently; use grep/search to locate `handleNavigate`, `currentView`, switch statement, etc.
- Check DevTools computed styles for z-index conflicts with sticky navbar (z-50)

## When to Use Seed Data vs. Backend Database

**Decision Tree:**

| Scenario | Use | Reason |
|----------|-----|--------|
| Displaying demo/mockup data on launch | **Seed data** | No DB setup required; instant load; read-only |
| User creates/modifies data (forms, uploads) | **Backend (PostgreSQL)** | Persists across reloads; queryable; versioned |
| Testing new business logic | **Seed data first** | Fast feedback loop; then migrate to backend |
| Feature persists to next session | **Backend (PostgreSQL)** | Seed state resets on reload; add localStorage if needed |
| Admin-managed listings | **Backend (PostgreSQL)** | Audit trail, approval workflows, tier changes |
| Real user data (reviews, messages) | **Backend (PostgreSQL)** | Immutable; indexed; queryable by date/rating |
| Temporary UI state (filters, favorites) | **Frontend memory** | No persistence needed; `localBusinesses` array |
| Feature is production-ready | **Backend only** | Disable seed imports; use 100% persistent data |

**Graduation Path (Seed → Backend):**
1. Start with seed data for rapid development (demo data in [data/](data/))
2. Build UI against seeds; test navigation and filtering
3. Once feature is solid, create backend route + service
4. Migrate seed data to PostgreSQL via admin bulk-import or manual seeding
5. Update frontend to call backend API instead of seed imports
6. Remove seed imports for production (optional; seed fallback is safe)

## Git Branches & Collaboration Workflow

**Branch Naming Conventions:**
```
main                    # Production-ready (stable)
develop                 # Integration branch (working code)
feature/<name>          # New feature: feature/user-dashboard, feature/loyalty-system
bugfix/<name>           # Bug fix: bugfix/jwt-middleware-error, bugfix/seed-id-collision
hotfix/<name>           # Urgent production fix: hotfix/database-connection
refactor/<name>         # Code cleanup: refactor/extract-aiService, refactor/consolidate-routes
docs/<name>             # Documentation: docs/backend-setup-guide
```

**Commit Message Convention:**
```
[CATEGORY] Brief description (50 chars)

Longer explanation (if needed). Reference issue: Fixes #123.
- Bullet point 1
- Bullet point 2
```
Example: `[FEATURE] Add loyalty points dashboard endpoint`

**PR Review Checklist:**
- [ ] Code compiles without TypeScript errors
- [ ] All new routes tested via `curl` or Postman
- [ ] Database migrations run without errors
- [ ] Seed data IDs don't collide (if adding seed files)
- [ ] API responses match documented schema
- [ ] Protected routes check `authMiddleware` + `isAdmin` if needed
- [ ] Error handling wraps in try/catch; returns sensible defaults
- [ ] Frontend calls new API endpoint (if applicable)

**Deployment Workflow (Dev → Prod):**
1. Create feature branch from `develop`
2. Make changes; test locally on both frontend + backend
3. Push to origin; create PR to `develop`
4. Peer review + merge to `develop`
5. Test on staging environment
6. Create PR from `develop` → `main`
7. Merge to `main` (production ready)
8. Tag release: `git tag v3.0.1 && git push origin v3.0.1`

## Admin Dashboard Implementation Status

**✅ Implemented Features:**
- `AdminApp.tsx` — Admin dashboard shell with sidebar navigation
- `adminRoutes.ts` — Backend routes for admin operations (verify businesses, manage users)
- `/api/admin/businesses` — GET unverified queue, PATCH to verify/reject
- Admin authentication via `isAdmin` middleware (checks `user.role === 'admin'`)
- User management endpoints (suspend, promote, view activity)
- Listing verification workflow (Trial → Pending → Active)
- Tier management (upgrade/downgrade listings)

**🔄 In Progress:**
- Admin dashboard UI refinement (AdminApp-test.tsx shows experimental layouts)
- Agent KPI tracking (agentRoutes.ts exists but dashboard integration ongoing)
- Analytics views (activity trends, engagement metrics)
- Bulk operations (import businesses, CSV upload)

**⏳ Planned (Future):**
- Advanced reporting (revenue by tier, agent performance, churn analysis)
- AI-powered insights (business recommendations, fraud detection)
- Automated workflows (email notifications, tier expiry alerts)
- White-label admin panel (multi-tenant support)
- Webhook integrations (third-party service notifications)

**How to Extend Admin Dashboard:**
1. Add new route in [backend/src/routes/adminRoutes.ts](backend/src/routes/adminRoutes.ts)
2. Create controller in [backend/src/controllers/](backend/src/controllers/) with business logic
3. Add service layer in [backend/src/services/](backend/src/services/) for data aggregation
4. Create React component in [AdminApp.tsx](AdminApp.tsx) with nav entry
5. Call backend endpoint from component; display results

**Example:** Adding agent performance dashboard:
```typescript
// 1. Backend route: GET /api/admin/agents/performance
router.get('/agents/performance', authMiddleware, isAdmin, async (req, res) => {
  // Query agents table; calculate KPIs
});

// 2. Frontend component: <AgentPerformanceView/>
function AgentPerformanceView() {
  const [agents, setAgents] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/api/admin/agents/performance', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => setAgents(data));
  }, []);
  return <div>{/* render agents KPIs */}</div>;
}
```

## Frontend Lazy Loading & Performance Strategy

**Why Monolithic App.tsx?**
- Single source of truth for state simplifies debugging and state flow
- No Redux/Context indirection means all state changes flow through `handleNavigate()` and useState
- Easier for agents to trace: search "currentView" and find all view logic in one file
- Trade-off: Large file, but performance mitigated by lazy component loading

**Bundle Optimization (vite.config.ts):**
- Seed data files chunked separately: `seeds-business.js`, `seeds-eats.js`, etc. prevents monolithic seed imports from bloating main bundle
- Vendor splitting: `vendor-react`, `vendor-ai`, `vendor-other` for browser caching across versions
- Detail view components lazy-imported; only loaded when user navigates to that view
- Chunk size warning: 800KB limit catches oversized assets early

**What This Means for Agents:**
- ✅ **DO:** Import from `./data/seeds` at top of App.tsx; framework handles chunking
- ✅ **DO:** Use `lazy(() => import('./components/Detail.tsx'))` for new detail views
- ❌ **DON'T:** Dynamically `import()` from middle of render (breaks tree-shaking)
- ❌ **DON'T:** Merge seed files; keep modular (each file ~150-300 lines)

## Architecture Decision Log

**Why no React Router?** 
- Monolithic app predates router adoption; routing logic stays in App.tsx switch statement
- Pros: Single state machine, simpler debugging, explicit navigation (`handleNavigate()`)
- Cons: URL state not preserved (page refresh → home); no deep-linking for detail views
- Future: Consider query param support (`?view=detail&id=xyz`) without full router

**Why seed data re-initializes every render?**
- Seed data is demo/mockup—not meant for persistence
- Real data comes from PostgreSQL API; frontend state would conflict with DB
- Simplifies state management: no "sync backend to frontend" logic needed
- Downside: Favorites, filters reset on page refresh; use localStorage for critical data

**Why all AI calls through aiService.ts?**
- Centralizes API key management (injected via Vite, not exposed to components)
- Standardizes error handling: try/catch wraps all calls, returns sensible defaults
- Simplifies testing: mock aiService instead of Gemini SDK throughout codebase
- Allows future swaps: change Gemini to Claude or custom LLM in one file

**Why monolithic seed data files instead of database?**
- Phase 1 decision for rapid UI iteration; no DB setup required
- 32 files with ~4000 listings provide realistic demo without latency
- Seed IDs use prefixes (`b_`, `r_`, `p_`) to avoid collisions with future DB records
- Graduation path: Copy seed→DB, disable imports for production

**Why Tailwind + no component library?**
- Custom `LuxuryCard` component reused across 90% of UI (EateryCard, PropertyCard, RetailCard all variants)
- Tailwind utility classes allow responsive, tier-aware styling (purple for Platinum, gold for Elite)
- No heavy dependencies (Bootstrap, Material-UI) keeps bundle lean
- Trade-off: Inconsistent spacing in some views (refactor ongoing via COMPACT_LUXURY_CHANGELOG)

## Common Development Patterns

**Adding a new listing view:**
1. Create component file in `components/` or appropriate subdirectory
2. Wrap in `Suspense` + `LoadingSpinner` (see [EateryDetail.tsx](components/EateryDetail.tsx) pattern)
3. Accept `id` and `navigate` props
4. Call `window.scrollTo(0, 0)` in `useEffect` on mount
5. Search `localBusinesses` array to find and render business data
6. Add routing case in App.tsx switch statement: `case 'view-name': return <ViewName id={selectedBusinessId} navigate={handleNavigate} />`

**Updating types when adding features:**
1. Edit `types.ts` FIRST (master definitions)
2. Update `Category` enum if adding new business type
3. Update `ListingTier` or `PRICING_STRUCTURE` if tier changes
4. Update `MPUMALANGA_AREAS` if adding locations
5. Seed data files must match updated type signatures

**Calling Gemini AI from components:**
- ✅ **Correct:** `import { chatWithConcierge } from '@/services/aiService'` → call function
- ❌ **Wrong:** `import { GoogleGenAI } from '@google/genai'` directly in component
- **Pattern:** All AI functions in [services/aiService.ts](services/aiService.ts) wrap in try/catch, return sensible defaults

**Creating backend API endpoint:**
1. Add route handler in `backend/src/routes/*.ts`
2. Create service method in `backend/src/services/*.ts` for business logic
3. Use middleware chain: `authMiddleware` first (if protected), then `isAdmin` (if admin-only)
4. Return `{ success: true, data: {...} }` on success; `{ error: "...", status: code }` on failure
5. Frontend calls via `fetch('http://localhost:5000/api/path', { headers: { Authorization: `Bearer ${token}` } })`

**Frontend-Backend data sync:**
- Seed data is read-only demo; backend PostgreSQL is source of truth for persistence
- Detail views check seed data first (fast), then API if not found
- Favorites, user profile, dashboard stats → always fetch from backend API
- Never persist sensitive data in localStorage except JWT token (and only if adding persistence)

1. **Never call `@google/genai` directly in components.** All Gemini calls → [services/aiService.ts](services/aiService.ts) only. Ensures centralized error handling, API key security, and fallback defaults.
2. **Don't mutate `localBusinesses` array directly.** It's re-computed based on `activeCategory`, `activeArea`, search. Always trigger updates via state setters in `handleNavigate`.
3. **Seed data IDs must be globally unique.** Duplicate IDs across `businessSeeds`, `retailSeeds`, etc. break detail view routing. Use prefixes (`b_`, `r_`, `p_`) to prevent collisions.
4. **All detail views must call `window.scrollTo(0, 0)` on mount.** Forgetting this leaves users mid-page; use `useEffect` with empty dependency array.
5. **Marketplace ≠ Directory.** `MARKETPLACE_CATEGORY_GROUPS` (toggle-based) is separate from `Category` enum (dropdown). Never conflate them.
6. **Every listing MUST have an `image` field.** Missing images break hero sections (`h-[48vh]`). Image should be URL or valid path.
7. **Line numbers in comments drift.** Reference code by pattern name (e.g., `handleNavigate function`, `currentView state initialization`) not line numbers.
8. **Protected routes check `isAuthenticated`.** Dashboard, admin views redirect to login if unauthenticated via `handleNavigate('login')`.
9. **Navbar z-index is `z-50`.** Verify modals/popovers don't sit underneath—check computed styles in DevTools if overlapping issues occur.
10. **Concierge preferences returned from AI.** `chatWithConciergeEnhanced` may return updated `conciergePrefs`; always merge returned preferences into state.

## Advanced Patterns

- **Tier-gated features:** Before rendering Elite/Platinum UI, **always check `if (listing.tier === ListingTier.Platinum)`**. Tier glows in `LuxuryCard` are enforced in the component logic.
- **Search ranking with AI:** `performSmartSearch(query)` in [services/aiService.ts](services/aiService.ts) prioritizes verified/Premium/Elite/Platinum listings first, then proximity + rating.
- **Marketplace category filtering:** Uses toggle-based UI (see [components/Marketplace/FiltersPanel.tsx](components/Marketplace/FiltersPanel.tsx)). Categories stored in state; `ProductGrid` re-filters on state change.
- **Responsive grid patterns:** Mobile-first Tailwind: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`. Hero heights: `h-[48vh]` (full), `h-64` (card).
- **Favorites persistence:** `toggleFavorite(id)` mutates local state; **not persisted to backend.** Add localStorage/API integration if persistence is needed.
- **Detail view scrolling:** All detail view components must call `window.scrollTo(0, 0)` OR `window.scrollTo({ top: 0 })` in useEffect on mount.
- **Layout compression:** New compact-luxury design reduces excessive scrolling (~37% savings). See [COMPACT_LUXURY_CHANGELOG.md](COMPACT_LUXURY_CHANGELOG.md) for spacing/padding standards.
- **Authentication flow:** LoginPage → handleLogin sets `isAuthenticated + currentUser` → protected routes redirect via handleNavigate if unauth.
- **Concierge chat context:** `chatWithConciergeEnhanced` receives `preferences` and `history` (last 10 messages); AI can return updated preferences to mutate app state.

## Adding a New Listing Type

1. Define interface in [types.ts](types.ts) with fields: `id`, `name`, `image`, `rating`, `tier`.
2. Add seed examples to new or existing seed file in [data/](data/).
3. Import seeds in [App.tsx](App.tsx) lines 11-34.
4. Add routing case in switch statement (line 3286+): `case 'my-detail': return <MyDetailView id={selectedBusinessId} navigate={handleNavigate} />`.
5. Create detail component (wrap in `Suspense` + `LoadingSpinner`); must call `window.scrollTo(0, 0)` in useEffect.
6. Update `PRICING_STRUCTURE` in [types.ts](types.ts) if adding tier-gated features.
7. Test routing: `handleNavigate('my-detail', undefined, <id>)` should render detail component with correct data.

## Common Patterns

- **App.tsx is intentionally monolithic** by design; all routing state lives there for simplicity. Current size: 3536 lines.
- **Seed data is extensive** (32 datasets, ~4000+ lines in seeds.ts); categories well-organized by type.
- **Tier system is visual + functional** — affects UI glow, search ranking, and feature access. Not just a database flag.
- **No persistent backend** — all data is client-side seed imports. State does NOT persist across page reloads unless explicitly saved to localStorage.
- **Component re-use is key** — `LuxuryCard` handles 90% of listing UI; create new detail views only for special cases.
- **Navigation is explicit** — no implicit routing; always call `handleNavigate()` to move between views.
- **Marketplace is separate namespace** — uses different Category groups and filtering logic; ProductCard ≠ LuxuryCard.
- **AI Service is the only Gemini consumer** — ensures centralized API key management and error handling. All calls wrap in try/catch with sensible fallbacks.
- **Domain services wrap AI calls** — `realEstateService` provides property-specific methods; never call `aiService` directly from domain components.
- **Detail view pattern:** All detail views receive `id` via `selectedBusinessId`, search local array, render content, call scroll reset on mount.

## API Response Format Standard

**All backend endpoints must follow this contract:**

**Success (2xx):**
```json
{
  "success": true,
  "data": { /* entity or array */ },
  "message": "Operation completed"
}
```

**Error (4xx/5xx):**
```json
{
  "success": false,
  "error": "Descriptive message",
  "status": 400,
  "details": { /* optional validation errors */ }
}
```

**Pagination:**
```json
{
  "success": true,
  "data": [ /* items */ ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
```

**Pattern in handlers:**
```typescript
// Success response
res.json({ success: true, data: result, message: "Created" });

// Error response
res.status(400).json({ success: false, error: "Validation failed", details: {...} });

// Paginated response
res.json({ success: true, data: items, pagination: { page, limit, total, pages } });
```

**For complete endpoint specs:** See [API_SPEC.md](API_SPEC.md)

## Backend TypeScript Patterns

**Type definitions:**
```typescript
// Use interface for object shapes (allows declaration merging)
interface Business {
  id: number;
  name: string;
  tier: 'trial' | 'premium' | 'elite' | 'platinum';
}

// Use type for unions, primitives, tuples
type ListingTier = 'trial' | 'premium' | 'elite' | 'platinum';
type QueryResult = { data: Business[] } | { error: string };
```

**Service layer (business logic):**
```typescript
// Always wrap in try/catch, return sensible defaults
export async function getBusinesses(category?: string): Promise<Business[]> {
  try {
    const query = 'SELECT * FROM businesses WHERE status = $1...';
    const result = await pool.query(query, ['active']);
    return result.rows;
  } catch (error) {
    console.error('Error fetching businesses:', error);
    return [];  // Return empty array, not null
  }
}
```

**Route handlers:**
```typescript
// Type request/response for clarity
router.get('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const business = await businessService.getById(req.params.id);
    if (!business) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true, data: business });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});
```

**Avoid:**
- `any` type (use `unknown` or specific type instead)
- Throwing errors (catch at service level, return error or default)
- Direct database queries in routes (route → service → database)

## API Pagination & Query Optimization

**Pagination pattern (mandatory for all list endpoints):**
```typescript
router.get('/users', async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = Math.min(parseInt(req.query.limit as string) || 20, 100);  // Cap at 100
  const offset = (page - 1) * limit;

  const countRes = await pool.query('SELECT COUNT(*) FROM users');
  const total = parseInt(countRes.rows[0].count);

  const dataRes = await pool.query(
    'SELECT * FROM users ORDER BY created_at DESC LIMIT $1 OFFSET $2',
    [limit, offset]
  );

  res.json({
    success: true,
    data: dataRes.rows,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) }
  });
});
```

**Query optimization guidelines:**
- Always filter before aggregation: `COUNT(*) WHERE status = $1` not `COUNT(*) then filter`
- Use indexes on frequently-filtered columns (category, area, status, created_at)
- Avoid SELECT * — specify columns: `SELECT id, name, rating FROM businesses`
- Use database joins, not application-level loops: `INNER JOIN reviews ON businesses.id = reviews.business_id`
- Use EXPLAIN ANALYZE to find slow queries: `EXPLAIN ANALYZE SELECT...`
- Cache results for non-real-time data (e.g., dashboard stats refreshed hourly)

**N+1 Query Prevention:**
```typescript
// Bad: N+1 queries (1 for businesses + N for each business's reviews)
const businesses = await pool.query('SELECT * FROM businesses');
for (const biz of businesses.rows) {
  const reviews = await pool.query('SELECT * FROM reviews WHERE business_id = $1', [biz.id]);
  biz.reviews = reviews.rows;  // N+1 problem
}

// Good: Single JOIN query
const result = await pool.query(`
  SELECT b.*, json_agg(r.*) as reviews
  FROM businesses b
  LEFT JOIN reviews r ON b.id = r.business_id
  GROUP BY b.id
`);
```

## Monitoring & Health Checks

**Current health endpoint:**
```typescript
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
```

**Recommended expansions (not yet implemented):**
```typescript
// Database health
app.get('/health/db', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', service: 'database' });
  } catch (e) {
    res.status(503).json({ status: 'down', service: 'database', error: e.message });
  }
});

// API metrics (request count, latency)
let metrics = { requests: 0, avgLatency: 0 };
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    metrics.requests++;
    metrics.avgLatency = (metrics.avgLatency + (Date.now() - start)) / 2;
  });
  next();
});

app.get('/metrics', (req, res) => {
  res.json({ requests: metrics.requests, avgLatencyMs: metrics.avgLatency.toFixed(2) });
});
```

**Health check from frontend:**
```typescript
async function checkBackendHealth() {
  try {
    const res = await fetch('http://localhost:5000/health', { timeout: 5000 });
    return res.ok;
  } catch {
    return false;  // Backend unreachable
  }
}
```

## Common Error Messages & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| `Cannot find module '@google/genai'` | API key not injected via Vite | Verify `.env.local` has `GEMINI_API_KEY`, restart `npm run dev` |
| `JWT malformed` | JWT verification failing in authMiddleware | Check token format: `Authorization: Bearer <token>` (space between Bearer and token) |
| `ECONNREFUSED on :5432` | PostgreSQL not running | Start PostgreSQL service: Windows → Services → PostgreSQL |
| `Error: listen EADDRINUSE :::5000` | Port 5000 already in use | Kill process: `Get-Process -Name node \| Stop-Process -Force` |
| `Cannot GET /api/...` | Route not mounted in server.ts | Verify route file is imported and registered: `app.use('/api/path', routeModule);` |
| `Unauthorized (401)` | Missing or invalid JWT | User needs to login via `/api/auth/login` first |
| `Forbidden (403)` | User lacks admin role | Check `(req as AuthRequest).user.role === 'admin'` in route |
| `undefined is not a function` | isAdmin middleware not imported or chained wrongly | Ensure: `router.get(..., authMiddleware, isAdmin, handler)` |
| `ReferenceError: pool is not defined` | Database pool not imported in service | Add: `import pool from '../config/database';` |

## Dashboard Integration Details

**How the Dashboard aggregates data:**

1. **Single endpoint, multiple queries:**
   - `GET /api/user/dashboard` in [dashboardRoutes.ts](backend/src/routes/dashboardRoutes.ts) performs 6+ parallel queries
   - Each query wrapped in try/catch to handle missing tables gracefully
   - Returns aggregated object with all stats
   - **Returns:** Complete user stats including:
     - `rewardPoints`: Total loyalty points (from `loyalty_points` table)
     - `savedItemsCount`: Number of favorited listings
     - `recentActivityCount`: Recent user actions
     - `recentMessages`: Last few user-to-user messages
     - `messageCounts`: Unread message stats

2. **Data dependencies (in execution order):**
   - ✓ `loyalty_points` (must exist for `rewardPoints`)
   - ✓ `favorites` (must exist for `savedItemsCount`)
   - ✓ `activities` (must exist for `recentActivityCount`)
   - ✓ `messages` (must exist for `recentMessages`, `messageCounts`)
   - ✓ `agents` (optional; used if agent tracking enabled)

3. **Error handling pattern:**
   ```typescript
   let rewardPoints = 0;
   try {
     const pointsRes = await pool.query('SELECT COALESCE(SUM(points), 0) as total...');
     rewardPoints = parseInt(pointsRes.rows[0]?.total || '0', 10);
   } catch (e) {
     // Table may not exist; defaults to 0
   }
   ```

4. **Frontend integration:**
   - Dashboard view component calls `GET /api/user/dashboard` on mount (if `isAuthenticated`)
   - Receives aggregated stats, renders cards showing points, saved items, unread messages
   - No cascade of requests — all data in single call for performance

5. **Admin dashboard:**
   - `GET /api/admin/dashboard` (if implemented) aggregates platform-wide metrics
   - May include agent KPIs, total loyalty points issued, activity trends, etc.

## Extended Systems (Phase 3 & Beyond)

### Business Submission System (`BusinessSubmissionForm.tsx`)
- **Component:** [components/BusinessSubmissionForm.tsx](components/BusinessSubmissionForm.tsx) (879 lines, multi-step form)
- **Access:** Via PremiumAddBusinessView or 'business-submission' route in App.tsx
- **State management:** All form state in component (5 steps)
- **Key props:** `onClose`, `onNavigate` for callbacks
- **Features:**
  - Step 1: Business basics (name, category, location, description)
  - Step 2: Media & documentation (images, videos, business proof uploads)
  - Step 3: Services & operating hours (service details, hours, pricing)
  - Step 4: Package selection (tier choice with pricing display)
  - Step 5: Review & confirm (summary of all entered data)
- **Upload handling:** Uses native file input (no external library); file objects stored in state during submission flow
- **Form validation:** Inline validation; success shows confirmation screen
- **Constants:** Uses `AMENITIES_OPTIONS`, `OPERATING_HOURS_TEMPLATE`, `PACKAGE_PRICING` from types.ts
- **Backend integration:** Ready for `POST /api/submissions` endpoint (route exists in backend/src/routes/submissionRoutes.ts)

### Loyalty Points System (`loyaltyRoutes.ts` + `loyaltyService.ts`)
- **Table schema:** `loyalty_points(id, user_id, points, transaction_type, created_at)`
- **Transaction types:** 'purchase', 'review', 'referral', 'activity', etc.
- **Endpoints:**
  - `GET /api/loyalty/balance`: Current user's total points
  - `POST /api/loyalty/redeem`: Convert points to rewards (business-defined)
  - `GET /api/loyalty/history`: Transaction history (pagination support)
- **Pattern:** Points are immutable; new transactions append to table. Never update existing points records.
- **Integration:** Dashboard aggregates via SUM query; agents track points-toward-goals

### Agent Tracking System (`agentRoutes.ts` + `agentService.ts`)
- **Table schema:** `agents(id, user_id, target_value, current_progress, achievements JSON)`
- **Admin endpoints:**
  - `GET /api/agents/list`: All agents with progress (admin only)
  - `PATCH /api/agents/:id/target`: Set or update agent sales target (admin only)
  - `PATCH /api/agents/:id/progress`: Update progress (admin only)
- **User endpoints:**
  - `GET /api/agents/:id/progress`: Agent's own progress (user can see self)
- **Achievements:** JSON array of `{name, date_earned, description}` stored in JSONB column
- **Pattern:** Admin dashboard tracks agent KPIs; agents see personal progress

### Activity Logging System (`activityRoutes.ts` + `activityService.ts`)
- **Table schema:** `activities(id, user_id, action_type, description, timestamp)`
- **Action types:** 'login', 'search', 'favorite_add', 'review_submit', 'message_send', 'listing_view', etc.
- **Endpoints:**
  - `POST /api/activity/log`: Record user action (internal; called by frontend)
  - `GET /api/activity/user-history`: User's action history (paginated)
  - `GET /api/activity/analytics`: Admin view of platform engagement
- **Pattern:** Log asynchronously; never block user action on logging failure
- **Analytics use case:** Dashboard, heatmaps, churn detection via activity patterns

### Messaging Service (`messagingService.ts`)
- **Table schema:** `messages(id, sender_id, recipient_id, content, read, created_at)`
- **Supported by:** `dashboardRoutes.ts` queries for unread counts
- **Endpoints (planned):**
  - `POST /api/messages`: Send message (user-to-user)
  - `GET /api/messages/:conversation_id`: Message thread (pagination)
  - `PATCH /api/messages/:id/read`: Mark message as read
- **Pattern:** Messages are immutable; deletion is soft (soft_deleted_at field if implemented)

## Frontend-Backend Data Sync

**Seed data vs. Backend database:**
- Frontend imports 32 seed files for initial UI/demo; **not the source of truth for persistent data**
- Real data (user-created businesses, reviews, subscriptions) comes from PostgreSQL via backend API
- Frontend `localBusinesses` state is **re-initialized from seeds on every render** (no persistence); use backend API for persistence
- Detail view: If business ID matches seed data, render seed; if only in DB, fetch via `GET /api/businesses/:id`

**API Integration Points:**
1. **Auth:** LoginPage → `POST /api/auth/login` (returns JWT); stored in memory, used in `Authorization: Bearer <jwt>` header
2. **Listing CRUD:** Components call `GET /api/businesses` (filtered), `POST /api/businesses` (create), `PUT /api/businesses/:id` (update)
3. **Reviews:** `POST /api/reviews` (submit review), `GET /api/reviews?business_id=X` (fetch reviews for listing)
4. **Favorites:** `POST /api/favorites` (add), `DELETE /api/favorites/:id` (remove), `GET /api/favorites` (user's list)
5. **Enquiries:** `POST /api/enquiries` (contact business), `GET /api/enquiries` (admin view)
6. **Admin:** `GET /api/admin/businesses` (unverified queue), `PATCH /api/admin/businesses/:id/verify` (approve listing)
7. **Subscriptions:** `POST /api/subscriptions/upgrade` (tier change), `GET /api/subscriptions/user` (current subscription)

**Response Format (all endpoints):**
```json
{
  "success": true,
  "data": { /* entity or array */ },
  "message": "Operation completed"
}
```
Errors: `{ "error": "descriptive message", "status": 400|401|500 }`

**JWT Workflow:**
1. User logs in via `POST /api/auth/login` with email/password
2. Backend returns `{ token: "eyJ..." }` (JWT with user ID encoded)
3. Frontend stores JWT in memory (lost on page reload; add localStorage if persistence needed)
4. All protected requests include `Authorization: Bearer <jwt>` header
5. Backend `authMiddleware.ts` validates JWT, populates `req.user` (id, email, role)
6. Routes check `req.user` existence; if missing, return 401 Unauthorized

## Critical Integration Patterns (New Agent Checklist)

**Must-read before implementing features:**
1. **Monolithic frontend design is intentional.** All state in App.tsx (not Redux/Context). Navigation via `handleNavigate()` ONLY—no React Router.
2. **Backend build pipeline is critical.** Always run `cd backend && npm run build` before `node dist/server.js`. Separated build+run prevents hidden TypeScript errors.
3. **Seed data is read-only demo.** Re-initialized every render; never mutate directly. Real persistence → backend PostgreSQL API.
4. **AI service centralization is mandatory.** All `@google/genai` calls must go through [services/aiService.ts](services/aiService.ts). Wrapper functions handle errors, return safe defaults.
5. **Detail view scroll reset required.** Every detail component must call `window.scrollTo(0, 0)` in useEffect on mount. Forgetting this leaves users mid-page.
6. **Tier system affects rendering & ranking.** Before rendering premium UI, check `if (listing.tier === ListingTier.Platinum)`. Tier glows in `LuxuryCard` are visual + functional.
7. **ID uniqueness is critical.** Seed IDs must be globally unique across all 32 seed files (use prefixes like `b_`, `r_`, `p_`). Collisions break routing.
8. **Every listing needs an image field.** Missing images break hero sections. Verify all seed data and API responses include image URLs.
9. **Protected routes check `isAuthenticated` first.** Dashboard, admin views redirect via `handleNavigate('login')` if not authenticated.
10. **API response format standardization.** All endpoints return `{ success: true, data: {...} }` or `{ error: "...", status: code }`. Never break this contract.

---

## Top 10 Critical "Do NOT" Rules

1. **Never call `@google/genai` directly in components.** All Gemini calls → [services/aiService.ts](services/aiService.ts) only. Ensures centralized error handling, API key security, and fallback defaults.
2. **Don't mutate `localBusinesses` array directly.** It's re-computed based on `activeCategory`, `activeArea`, search. Always trigger updates via state setters in `handleNavigate`.
3. **Seed data IDs must be globally unique.** Duplicate IDs across `businessSeeds`, `retailSeeds`, etc. break detail view routing. Use prefixes (`b_`, `r_`, `p_`) to prevent collisions.
4. **All detail views must call `window.scrollTo(0, 0)` on mount.** Forgetting this leaves users mid-page; use `useEffect` with empty dependency array.
5. **Marketplace ≠ Directory.** `MARKETPLACE_CATEGORY_GROUPS` (toggle-based) is separate from `Category` enum (dropdown). Never conflate them.
6. **Every listing MUST have an `image` field.** Missing images break hero sections (`h-[48vh]`). Image should be URL or valid path.
7. **Line numbers in comments drift.** Reference code by pattern name (e.g., `handleNavigate function`, `currentView state initialization`) not line numbers.
8. **Protected routes check `isAuthenticated`.** Dashboard, admin views redirect to login if unauthenticated via `handleNavigate('login')`.
9. **Navbar z-index is `z-50`.** Verify modals/popovers don't sit underneath—check computed styles in DevTools if overlapping issues occur.
10. **Concierge preferences returned from AI.** `chatWithConciergeEnhanced` may return updated `conciergePrefs`; always merge returned preferences into state.

---

## Advanced Patterns

- **Tier-gated features:** Before rendering Elite/Platinum UI, **always check:** `if (listing.tier === ListingTier.Platinum)`. Tier glows in `LuxuryCard` are enforced in the component logic.
- **Search ranking with AI:** `performSmartSearch(query)` in [services/aiService.ts](services/aiService.ts) prioritizes verified/Premium/Elite/Platinum listings first, then proximity + rating.
- **Marketplace category filtering:** Uses toggle-based UI (see [components/Marketplace/FiltersPanel.tsx](components/Marketplace/FiltersPanel.tsx)). Categories stored in state; `ProductGrid` re-filters on state change.
- **Responsive grid patterns:** Mobile-first Tailwind: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`. Hero heights: `h-[48vh]` (full), `h-64` (card).
- **Favorites persistence:** `toggleFavorite(id)` mutates local state; **not persisted to backend.** Add localStorage/API integration if persistence is needed.
- **Detail view scrolling:** All detail view components must call `window.scrollTo(0, 0)` OR `window.scrollTo({ top: 0 })` in useEffect on mount.
- **Layout compression:** New compact-luxury design reduces excessive scrolling (~37% savings). See [COMPACT_LUXURY_CHANGELOG.md](COMPACT_LUXURY_CHANGELOG.md) for spacing/padding standards.
- **Authentication flow:** LoginPage → handleLogin sets `isAuthenticated + currentUser` → protected routes redirect via handleNavigate if unauth.
- **Concierge chat context:** `chatWithConciergeEnhanced` receives `preferences` and `history` (last 10 messages); AI can return updated preferences to mutate app state.

---

## Adding a New Listing Type

1. Define interface in [types.ts](types.ts) with fields: `id`, `name`, `image`, `rating`, `tier`.
2. Add seed examples to new or existing seed file in [data/](data/).
3. Import seeds in [App.tsx](App.tsx) lines 11-34.
4. Add routing case in switch statement (line 3286+): `case 'my-detail': return <MyDetailView id={selectedBusinessId} navigate={handleNavigate} />`.
5. Create detail component (wrap in `Suspense` + `LoadingSpinner`); must call `window.scrollTo(0, 0)` in useEffect.
6. Update `PRICING_STRUCTURE` in [types.ts](types.ts) if adding tier-gated features.
7. Test routing: `handleNavigate('my-detail', undefined, <id>)` should render detail component with correct data.

---

## Common Patterns

- **App.tsx is intentionally monolithic** by design; all routing state lives there for simplicity. Current size: 4639 lines.
- **Seed data is extensive** (32 datasets, ~4000+ lines in seeds.ts); categories well-organized by type.
- **Tier system is visual + functional** — affects UI glow, search ranking, and feature access. Not just a database flag.
- **No persistent backend** — all data is client-side seed imports. State does NOT persist across page reloads unless explicitly saved to localStorage.
- **Component re-use is key** — `LuxuryCard` handles 90% of listing UI; create new detail views only for special cases.
- **Navigation is explicit** — no implicit routing; always call `handleNavigate()` to move between views.
- **Marketplace is separate namespace** — uses different Category groups and filtering logic; ProductCard ≠ LuxuryCard.
- **AI Service is the only Gemini consumer** — ensures centralized API key management and error handling. All calls wrap in try/catch with sensible fallbacks.
- **Domain services wrap AI calls** — `realEstateService` provides property-specific methods; never call `aiService` directly from domain components.
- **Detail view pattern:** All detail views receive `id` via `selectedBusinessId`, search local array, render content, call scroll reset on mount.
