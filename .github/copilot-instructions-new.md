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

### AI Calls (Never import @google/genai in components)
```typescript
// ✅ Correct: route through aiService
import { chatWithConcierge } from '@/services/aiService';
const response = await chatWithConcierge(message, history);

// ❌ Wrong: importing SDK directly in components
import { GoogleGenAI } from '@google/genai';  // NO
```

### Detail Views (Must scroll to top)
```typescript
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
| Navigate to view | `handleNavigate('home')` | App.tsx |
| Filter by category | `handleNavigate('directory', 'FOOD & HOSPITALITY')` | App.tsx |
| View business details | `handleNavigate('business-detail', undefined, 'b_123')` | App.tsx |
| Call Gemini | `import { chatWithConcierge } from '@/services/aiService'` | services/aiService.ts |
| Check tier | `if (listing.tier === ListingTier.Platinum)` | types.ts |
| Add detail view | Create component, lazy-import, wrap Suspense, call scroll | components/*Detail.tsx |
| Create backend route | Add to routes/*.ts, chain middleware, return std JSON | backend/src/routes/ |
| Protected route | Check `isAuthenticated`, redirect to 'login' if false | App.tsx auth logic |
| Filter by area | `handleNavigate('directory', cat, id, 'All Areas')` | types.ts (65+ areas) |

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
10. **Don't start backend without PostgreSQL running.** Check: `netstat -an | findstr :5432` (Windows).

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
node dist/server.js              # Run compiled server (critical: not npm run dev)
npm run migrate                  # ts-node migrations (initialize DB)
npm run seed                     # Create default admin account
```

**⚠️ CRITICAL:** Both must run simultaneously in separate terminals. Frontend API calls route to `http://localhost:5000/api/*`.

---

## Essential State Management

All state lives in App.tsx:
- `currentView`: Active view string ('home', 'directory', 'business-detail', etc.)
- `selectedBusinessId`: ID of currently displayed listing
- `activeCategory`, `activeSub`: Current filter state
- `activeArea`: Selected Mpumalanga area (default 'All Areas')
- `localBusinesses`: Memoized, re-filtered array (never mutate directly)
- `favorites`: Set<string> of favorited business IDs
- `isAuthenticated`, `currentUser`: JWT auth state
- `conciergePrefs`: VIP preferences (favorites, budget, areas)

**Navigation atomically:** `handleNavigate(view, category?, id?, sub?)` updates state + scrolls to top + closes menu.

---

## Seed Data Structure

**Source:** 32 modular files in [data/](data/) aggregated by [data/seeds.ts](data/seeds.ts).
- ~4000 listings across 30+ categories
- IDs must be globally unique (use prefixes: `b_`, `r_`, `p_`)
- Every listing must have `image` field (URL) or hero sections break
- Re-initialized every render; never persists across page reloads

**Critical:** Never mutate seed imports. Real data comes from backend PostgreSQL API.

---

## Listing Tier System

`ListingTier` enum in [types.ts](types.ts): `Trial` → `Premium` → `Elite` (gold glow) → `Platinum` (purple glow).

**Before rendering premium UI, always check:** `if (listing.tier === ListingTier.Platinum) { /* purple glow */ }`

Tier affects:
- UI rendering (gold/purple glow in `LuxuryCard`)
- Search ranking (Platinum first)
- Feature access

---

## AI Integration Pattern

**All Gemini calls must be in [services/aiService.ts](services/aiService.ts) only.**

**Exported functions (16 total):**
- `getSmartRecommendations(query)`: Maps search → `Category` enum values
- `chatWithConcierge(message, history)`: Multi-turn chat with SA context
- `chatWithConciergeEnhanced(message, preferences, history)`: Advanced chat with preferences
- `performSmartSearch(query, allBusinesses)`: Search ranking with tier prioritization
- `generateListingDescription(name, type)`: SEO descriptions
- `generateAIListingDetails(name, type, context)`: Structured listing details
- `generateLuxuryPlaceholder(title)`: Image generation via Gemini 2.5
- `generateReviewSummary(name, description)`: AI-generated review examples
- Plus 8 more specialized functions

**Error Handling (Mandatory):** All functions wrap in try/catch and return sensible defaults:
```typescript
try {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({...});
  return JSON.parse(response.text || "{}");
} catch (error) {
  console.error("AI [FunctionName] Error", error);
  return { fallback: "sensible", data: [] };
}
```

**Models & API Key:** 
- Text: `gemini-3-flash-preview` (fast, cost-effective)
- Images: `gemini-2.5-flash-image` (image generation only)
- API key: Injected via [vite.config.ts](vite.config.ts) from `.env.local`
- **No hot reload for `.env.local`:** Restart dev server after updating

---

## Backend Architecture

**15 Route Modules** (in [backend/src/routes/](backend/src/routes/)):
- `authRoutes.ts`: Login, register, refresh token, verify email
- `businessRoutes.ts`: Business CRUD, filtering by category/area/tier
- `adminRoutes.ts`: Verify businesses, manage listings, user management
- `dashboardRoutes.ts`: User stats, rewards, saved items, activity
- `userRoutes.ts`: Profile, preferences, settings
- `agentRoutes.ts`: Agent tracking, progress, achievements
- `loyaltyRoutes.ts`: Points, rewards, tier progression
- `activityRoutes.ts`: Activity logging, engagement metrics
- `productRoutes.ts`: Marketplace products
- `reviewRoutes.ts`: Reviews, ratings
- `favouriteRoutes.ts`: Favorites management
- `enquiryRoutes.ts`: Business enquiries
- `subscriptionRoutes.ts`: Tier upgrades
- `newsletterRoutes.ts`: Newsletter management
- Plus `submissionRoutes.ts`: Business submissions

**Middleware Chain Pattern:**
```typescript
// Public route
router.get('/health', (req, res) => res.json({ status: 'ok' }));

// Protected route
router.get('/:id', authMiddleware, async (req: AuthRequest, res) => {...});

// Admin-only route
router.patch('/verify', authMiddleware, isAdmin, async (req: AuthRequest, res) => {...});
```

**Database:** PostgreSQL with 6 tables (users, businesses, admins, admin_logs, subscriptions, payments).

---

## Frontend-Backend Data Sync

**Seed data is read-only demo.** Real persistence = backend PostgreSQL.

**Data Flow:**
1. User views listing → Frontend searches `localBusinesses` first (fast)
2. If found → render seed data
3. If not found → try `GET /api/businesses/:id` from database
4. User creates/updates → `POST /api/businesses` to backend (persisted)

**API Integration Points:**
1. **Auth:** `POST /api/auth/login` (returns JWT)
2. **Listings:** `GET /api/businesses`, `POST /api/businesses`, `PUT /api/businesses/:id`
3. **Reviews:** `POST /api/reviews`, `GET /api/reviews?business_id=X`
4. **Favorites:** `POST /api/favorites`, `DELETE /api/favorites/:id`, `GET /api/favorites`
5. **Enquiries:** `POST /api/enquiries`
6. **Admin:** `GET /api/admin/businesses`, `PATCH /api/admin/businesses/:id/verify`

**JWT Workflow:**
1. Login via `POST /api/auth/login` → returns JWT
2. Frontend stores JWT in memory
3. All protected requests include `Authorization: Bearer <jwt>` header
4. `authMiddleware.ts` validates JWT, populates `req.user`

---

## Protected Routes & Error Codes

**Common HTTP Status Codes:**
- `401 Unauthorized` — No JWT or JWT expired. User must re-authenticate.
- `403 Forbidden` — User authenticated but lacks required role (e.g., not admin).
- `404 Not Found` — Resource doesn't exist.
- `500 Internal Server Error` — Server crash. Check console logs.

**Frontend error handling pattern:**
```typescript
try {
  const response = await fetch('http://localhost:5000/api/admin/businesses', {
    headers: { Authorization: `Bearer ${jwtToken}` }
  });
  if (response.status === 401) handleNavigate('login');
  else if (response.status === 403) alert('Access Denied');
  else if (!response.ok) throw new Error(await response.text());
  return response.json();
} catch (error) {
  console.error('API Error:', error);
}
```

---

## Common Developer Tasks

### Adding a New Listing Category
1. Update `Category` enum in [types.ts](types.ts)
2. Create seed file in [data/](data/)
3. Import seed in [App.tsx](App.tsx) lines 11-40
4. Test: `handleNavigate('directory', 'YOUR_CATEGORY')`

### Creating a New Detail View
1. Create component file (e.g., `components/MyDetailView.tsx`)
2. Wrap in Suspense + LoadingSpinner
3. Add routing case in App.tsx switch statement
4. Component receives `id` and `navigate` props
5. **MUST call `window.scrollTo(0, 0)` in useEffect on mount**
6. Search `localBusinesses` array for matching ID

### Adding a Backend API Endpoint
1. Create route in [backend/src/routes/](backend/src/routes/)
2. Export router, mount in [backend/src/server.ts](backend/src/server.ts)
3. Use middleware chain: `authMiddleware` → `isAdmin` (if needed) → handler
4. Return standardized JSON response
5. Frontend calls via: `fetch('http://localhost:5000/api/path', { headers: { Authorization: `Bearer ${token}` } })`

---

## Backend Startup Issues & Fixes

**⚠️ COMMON ISSUE:** Backend startup fails with TypeScript compilation errors during `npm run dev`.

**Fix (REQUIRED EVERY SESSION):**
1. **Clean build first:** `cd backend && npm run build` (compiles TypeScript → `dist/`)
2. **Verify build succeeded:** Check `backend/dist/server.js` exists
3. **Run compiled code:** `node dist/server.js` (NOT `npm run dev` or `ts-node`)
4. **Verify health:** `curl http://localhost:5000/health` → `{"status":"ok","timestamp":"..."}`

**Why this works:** `npm run dev` hides build failures. Separated steps allow debugging.

**Diagnostic Checklist:**
1. Check `.env` file exists in `backend/` with `DB_*` variables
2. Verify PostgreSQL is running: `netstat -an | findstr :5432`
3. Run `npx tsc --noEmit` to see TypeScript errors
4. Kill orphaned processes: `Get-Process -Name node | Stop-Process -Force`

---

## Phase 3 Production Status

✅ **Complete:**
- 50+ frontend views with error boundaries and lazy loading
- 15 backend routes with auth middleware, admin validation, rate-limiting
- 6 PostgreSQL tables with indices and constraints
- Admin dashboard with business verification, tier management, audit logs
- 16 Gemini AI functions (search, recommendations, descriptions, itinerary)
- C2C marketplace with product submission
- 5-step business submission form with package selection
- Loyalty points system with tier progression
- JWT auth (30-day), bcryptjs hashing (10 rounds), helmet.js, rate-limiting

All systems production-ready. No critical issues known.

---

## For New Agents: Quick Start

You're working on a **full-stack luxury B2B directory** for Mpumalanga, South Africa. Three key rules:

1. **Understand the state is monolithic** — All app state in [App.tsx](App.tsx). Use `handleNavigate(view, category?, id?, sub?)` ONLY for navigation.
2. **Know the backend build** — ALWAYS run `cd backend && npm run build` THEN `node dist/server.js`. Never use `npm run dev` or `ts-node`.
3. **Keep AI calls centralized** — Route ALL `@google/genai` calls through [services/aiService.ts](services/aiService.ts).

Read the "Five Critical Patterns" section above before making any changes.
