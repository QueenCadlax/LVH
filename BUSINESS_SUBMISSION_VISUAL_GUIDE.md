# Business Submission System — Visual & Architecture Guide

## 🎨 User Interface Mockups

### 1. Submission Form - Step 1 (Business Info)

```
┌─────────────────────────────────────────────────────┐
│ 📋 Submit Your Business                         [X] │
│ Step 1 of 5                                         │
├─────────────────────────────────────────────────────┤
│                                                     │
│ Business Name *                                     │
│ [_________________________ Kuka Café ____________] │
│                                                     │
│ Category * ┌─────────┐   Sub-Category              │
│ [Select ▼] │RestaurantFine Dining                 │
│            └─────────┘   [Select ▼]               │
│                                                     │
│ Location / City *          Full Address            │
│ [____________ Mbombela __] [________________ ___] │
│                                                     │
│ Contact Phone *            Email                   │
│ [+27123456789]             [info@kuka.co.za]      │
│                                                     │
│ Business Description                               │
│ ┌────────────────────────────────────────────────┐│
│ │ Award-winning café in heart of Mbombela...    ││
│ └────────────────────────────────────────────────┘│
│                                                     │
├─────────────────────────────────────────────────────┤
│ [← Previous]                      [Cancel] [Next →] │
└─────────────────────────────────────────────────────┘
```

### 2. Submission Form - Step 2 (Media & Files)

```
┌─────────────────────────────────────────────────────┐
│ 📸 Submit Your Business                         [X] │
│ Step 2 of 5                                         │
├─────────────────────────────────────────────────────┤
│                                                     │
│ Business Images * (2)                              │
│ ┌─────────────────────────────────────────────────┐│
│ │ 📎 Click to upload images (min 1)            ││
│ │ (+ drag & drop)                                ││
│ └─────────────────────────────────────────────────┘│
│ [Image 1] [✕] [Image 2] [✕]                       │
│                                                     │
│ Videos (Optional)                                   │
│ ┌─────────────────────────────────────────────────┐│
│ │ 🎬 Click to upload videos (optional)           ││
│ └─────────────────────────────────────────────────┘│
│                                                     │
│ Menu (PDF) - Restaurants Only                      │
│ ┌─────────────────────────────────────────────────┐│
│ │ 📄 Click to upload menu                        ││
│ └─────────────────────────────────────────────────┘│
│ ✓ Menu uploaded                                    │
│                                                     │
│ Proof of Business * (ID / Registration)            │
│ ┌─────────────────────────────────────────────────┐│
│ │ 📋 Click to upload (PDF, JPG, PNG)            ││
│ └─────────────────────────────────────────────────┘│
│ ✓ Proof uploaded                                   │
│                                                     │
├─────────────────────────────────────────────────────┤
│ [← Previous]                      [Cancel] [Next →] │
└─────────────────────────────────────────────────────┘
```

### 3. Submission Form - Step 4 (Packages)

```
┌─────────────────────────────────────────────────────┐
│ 💰 Select Your Package                          [X] │
│ Step 4 of 5                                         │
├─────────────────────────────────────────────────────┤
│                                                     │
│ ┌──────────────┐  ┌──────────────┐  ┌────────────┐│
│ │ Essential    │  │ Professional │  │ Platinum   ││
│ │              │  │              │  │            ││
│ │ R799        │  │ R1,299       │  │ R1,999    ││
│ │              │  │              │  │            ││
│ │ ✓ Listing   │  │ ✓ Everything │  │ ✓ Premium ││
│ │ ✓ 10 Photos │  │   in Essen.. │  │ ✓ Featured││
│ │ ✓ Contact   │  │ ✓ Videos     │  │ ✓ Analytic││
│ │ ✓ Hours     │  │ ✓ Services   │  │ ✓ Support ││
│ │              │  │ ✓ Featured   │  │ ✓ VIP     ││
│ │              │  │              │  │ [Selected]││
│ │   [Select]   │  │   [Select]   │  │ [Selected]││
│ └──────────────┘  └──────────────┘  └────────────┘│
│                                                     │
├─────────────────────────────────────────────────────┤
│ [← Previous]                      [Cancel] [Next →] │
└─────────────────────────────────────────────────────┘
```

### 4. Admin Review Panel - Dashboard

```
┌──────────────────────────────────────────────────────────┐
│ 📊 Business Submissions Review                           │
├──────────────────────────────────────────────────────────┤
│                                                          │
│ ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │
│ │ Total       │  │ Pending     │  │ Approved    │      │
│ │ 45          │  │ 15          │  │ 25          │      │
│ └─────────────┘  └─────────────┘  └─────────────┘      │
│                                                          │
│ ┌──────────────────────┐                                │
│ │ Expected Revenue     │                                │
│ │ R 45,000             │                                │
│ └──────────────────────┘                                │
│                                                          │
├──────────────────────────────────────────────────────────┤
│ Submissions [Pending ▼]                                  │
│                                                          │
│ ┌────────────────────────────────┐  ┌──────────────────┐│
│ │ Kuka Café                       │  │ Kuka Café       ││
│ │ Restaurant • Mbombela          │  │ Fine Dining     ││
│ │ Package: Professional - R1,299 │  │ Location:       ││
│ │ Submitted: 29 Jan 2026         │  │ Mbombela        ││
│ │ Status: [Pending]              │  │ Contact:        ││
│ │                                │  │ +27123456789    ││
│ │ ┌────────────────────────────┐ │  │                 ││
│ │ │ Lotus Spa                   │ │  │ Package:        ││
│ │ │ Spa & Wellness • Nelspruit  │ │  │ Professional    ││
│ │ │ Package: Essential - R799   │ │  │ R1,299          ││
│ │ │ Submitted: 28 Jan 2026      │ │  │                 ││
│ │ │ Status: [Pending]           │ │  │ Actions:        ││
│ │ │                             │ │  │                 ││
│ │ │ [More...] ▼                 │ │  │ [✓ Approve]     ││
│ │ └────────────────────────────┘ │  │ [✗ Reject]      ││
│ └────────────────────────────────┘  │                 ││
│                                      │ Rejection      ││
│                                      │ Reason:        ││
│                                      │ ┌─────────────┐││
│                                      │ │[Type reason]│││
│                                      │ └─────────────┘││
│                                      │ [Reject]      ││
│                                      └──────────────────┘│
└──────────────────────────────────────────────────────────┘
```

---

## 🏗️ System Architecture

### Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    USER (Business Owner)                    │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ↓
         ┌───────────────────────────────────┐
         │   BusinessSubmissionForm.tsx      │
         │  (5-step wizard modal)            │
         │  - Step 1: Business Info          │
         │  - Step 2: Media & Files          │
         │  - Step 3: Services & Hours       │
         │  - Step 4: Package Selection      │
         │  - Step 5: Review & Submit        │
         └────────────┬──────────────────────┘
                      │
                      ↓ (POST /api/submissions)
                      │ No authentication required
         ┌────────────────────────────────────┐
         │  BACKEND (Express Server)          │
         ├────────────────────────────────────┤
         │  submissionRoutes.ts               │
         │  submissionController.ts           │
         │  submissionService.ts              │
         └────────────┬──────────────────────┘
                      │
                      ↓
         ┌────────────────────────────────────┐
         │  PostgreSQL                        │
         │  pending_submissions table         │
         │  - id, business_name, category     │
         │  - contact, description, images    │
         │  - operating_hours, amenities      │
         │  - proof_of_business (required)    │
         │  - selected_package, amount        │
         │  - status = 'pending'              │
         │  - submitted_at timestamp          │
         └────────────┬──────────────────────┘
                      │
                      ↓
         ┌──────────────────────────────────────────┐
         │  ADMIN (LowveldHub Team)                 │
         │  AdminSubmissionsReview.tsx              │
         │  - View pending submissions              │
         │  - See stats & metrics                   │
         │  - Click to see details                  │
         │  - Approve or Reject                     │
         └────────┬─────────────────────────────────┘
                  │
        ┌─────────┴──────────┐
        │                    │
        ↓ (APPROVE)          ↓ (REJECT)
   PATCH /approve       PATCH /reject
        │                    │
        ↓                    ↓
  Move to businesses   Mark rejected
  Auto-categorize     Store reason
  Display in search   Archive
        │                    │
        ↓                    ↓
   ✓ LIVE DIRECTORY    ✗ ARCHIVED
   Appears in:        (Can resubmit)
   - Search results
   - Category pages
   - Marketplace
   - Area guides
```

---

## 🔄 Approval Workflow

```
┌──────────────────────────────────────────────────────────┐
│ SUBMISSION LIFECYCLE                                     │
└──────────────────────────────────────────────────────────┘

1. PENDING (Initial State)
   ├─ Created: submitted_at = NOW()
   ├─ Status: 'pending'
   ├─ Stored in: pending_submissions table
   └─ Admin notified (optional email)

2. UNDER REVIEW (Admin Action)
   ├─ Admin logs in
   ├─ Views stats & submissions
   ├─ Clicks to see details
   ├─ Reviews images, proof, services
   └─ Makes decision

3A. APPROVED Path ✓
   ├─ Admin clicks "Approve"
   ├─ Status → 'approved'
   ├─ approved_by = admin_id
   ├─ approved_at = NOW()
   ├─ moveApprovedToBusiness() called
   ├─ Insert INTO businesses (...)
   ├─ Business appears in search
   ├─ Business appears in category
   ├─ Business appears in marketplace
   ├─ Optional email sent to business
   └─ Stat: Approved count +1

3B. REJECTED Path ✗
   ├─ Admin types rejection reason
   ├─ Clicks "Reject" button
   ├─ Status → 'rejected'
   ├─ rejection_reason = "Missing proof..."
   ├─ Stays in pending_submissions table
   ├─ Optional email sent to business
   ├─ Business can resubmit
   └─ Stat: Rejected count +1

RESULT:
├─ Approved submissions → Live on site
├─ Rejected submissions → Archived (can resubmit)
└─ Pending submissions → Under review

Time to go live: Typically 24-48 hours after submission
```

---

## 📊 Database Schema Diagram

```
┌─────────────────────────────────────────────────────────┐
│              pending_submissions                        │
├─────────────────────────────────────────────────────────┤
│ PK: id                                                  │
├─────────────────────────────────────────────────────────┤
│ BASIC INFO                  │ MEDIA                    │
│ ├─ business_name (255)     │ ├─ images (JSONB array) │
│ ├─ category (100)          │ ├─ videos (JSONB array) │
│ ├─ sub_category (100)      │ ├─ menu_url (500)       │
│ ├─ location (255)          │ └─ proof_of_business_url│
│ ├─ address (500)           │                         │
│ ├─ contact_phone (50) ✓    │ OPERATIONS              │
│ ├─ contact_email (255)     │ ├─ operating_hours (JSON)
│ └─ description (TEXT)      │ ├─ services (TEXT)      │
│                             │ └─ amenities (JSONB)    │
│ PACKAGE INFO                │                         │
│ ├─ selected_package (enum) │ STATUS & TRACKING       │
│ └─ package_amount (numeric)│ ├─ status (enum: P/A/R) │
│                             │ ├─ submitted_at         │
│                             │ ├─ approved_by (FK)     │
│                             │ ├─ approved_at          │
│                             │ ├─ rejection_reason     │
│                             │ ├─ created_at           │
│                             │ └─ updated_at           │
├─────────────────────────────────────────────────────────┤
│ INDEXES:                                               │
│ ├─ idx_pending_submissions_status                      │
│ ├─ idx_pending_submissions_category                    │
│ └─ idx_pending_submissions_submitted_at DESC           │
├─────────────────────────────────────────────────────────┤
│ CONSTRAINTS:                                           │
│ ├─ business_name NOT NULL                             │
│ ├─ category NOT NULL                                   │
│ ├─ contact_phone NOT NULL                             │
│ ├─ proof_of_business_url NOT NULL                     │
│ ├─ selected_package IN ('essential', 'professional',  │
│ │                       'platinum')                    │
│ ├─ status IN ('pending', 'approved', 'rejected')      │
│ └─ approved_by REFERENCES users(id)                   │
└─────────────────────────────────────────────────────────┘

After APPROVE:
├─ Data copied to: businesses table
├─ Columns mapped:
│  ├─ business_name → name
│  ├─ category → category
│  ├─ images → images[]
│  ├─ operating_hours → hours
│  ├─ amenities → amenities[]
│  ├─ services → services
│  └─ selected_package → tier (professional→elite)
└─ Business immediately appears in search & directory
```

---

## 🔐 Security Flow

```
┌───────────────────────────────────────────────────────┐
│ SUBMISSION ENDPOINT (POST /api/submissions)            │
├───────────────────────────────────────────────────────┤
│ No Authentication Required                             │
│ ├─ Input Validation:                                  │
│ │  ├─ business_name: non-empty string                │
│ │  ├─ category: must exist in enum                   │
│ │  ├─ contact_phone: required format                 │
│ │  └─ proof_of_business_url: must be provided        │
│ └─ Database Constraints:                              │
│    ├─ NOT NULL constraints                            │
│    ├─ Enum validation (status, package)              │
│    └─ Foreign key checks                             │
└───────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────┐
│ ADMIN ENDPOINTS (GET, PATCH /api/submissions/...)    │
├───────────────────────────────────────────────────────┤
│ Middleware Chain:                                      │
│ 1. authMiddleware (JWT validation)                    │
│    └─ Verifies token signature                       │
│    └─ Extracts user ID & role                        │
│    └─ Populates req.user                             │
│                                                       │
│ 2. isAdmin (role check)                               │
│    └─ Checks: req.user.role === 'admin'             │
│    └─ Returns 403 if not admin                       │
│                                                       │
│ 3. Controller handler                                │
│    └─ Processes request                              │
│    └─ Returns 200 OK or error                        │
└───────────────────────────────────────────────────────┘

Error Responses:
├─ 400 Bad Request: Missing/invalid fields
├─ 401 Unauthorized: No JWT or expired JWT
├─ 403 Forbidden: JWT valid but user not admin
├─ 404 Not Found: Submission ID doesn't exist
└─ 500 Internal Server Error: Database error
```

---

## 📈 Stats Dashboard Algorithm

```
GET /api/submissions/stats/overview

SELECT
  COUNT(*) as total,
  COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending,
  COUNT(CASE WHEN status = 'approved' THEN 1 END) as approved,
  COUNT(CASE WHEN status = 'rejected' THEN 1 END) as rejected,
  COALESCE(SUM(CASE WHEN status = 'pending' THEN package_amount ELSE 0 END), 0) as revenue_expected
FROM pending_submissions;

RESULT:
{
  "total": 45,           // All submissions ever
  "pending": 15,         // Awaiting review
  "approved": 25,        // Live on directory
  "rejected": 5,         // Did not pass review
  "revenueExpected": 45000  // Revenue from pending (if all approved)
}

USEFUL FOR:
├─ See volume of submissions
├─ Identify backlog (pending count)
├─ Track approval rate (approved ÷ total)
├─ Forecast revenue (pending × avg package)
└─ Spot rejection patterns (rejected ÷ total)
```

---

## 🎯 Use Case Examples

### Use Case 1: Restaurant Submission

```
Business: Kuka Café (Restaurant)

Step 1 - Business Info:
├─ Name: Kuka Café
├─ Category: Restaurant → Sub: Fine Dining
├─ Location: Mbombela
├─ Address: 123 Main Street, Mbombela
├─ Phone: +27123456789
└─ Bio: Award-winning café, specialty coffee...

Step 2 - Media:
├─ Images: [café exterior, interior, latte art]
├─ Videos: [welcome video]
├─ Menu: [menu.pdf uploaded]  ← Restaurants get this field
└─ Proof: [business registration ID]

Step 3 - Services:
├─ Services: "Specialty coffee, Pastries, Lunch, Catering"
├─ Amenities: [WiFi, Parking, Indoor Seating, Outdoor]
└─ Hours: Mon-Fri 8am-6pm, Sat 9am-4pm, Sun Closed

Step 4 - Package:
└─ Professional (R1,299) → Videos + Menu + Featured

Step 5 - Review & Submit
↓
ADMIN REVIEW:
├─ Sees images: Beautiful café, well-maintained
├─ Checks menu: Complete with prices
├─ Verifies: Business registration valid
├─ Approves: ✓
↓
LIVE:
├─ Appears in: Food & Hospitality category
├─ Appears in: Mbombela area guide
├─ Appears in: Restaurant search results
├─ Shows: Menu, videos, hours, amenities
```

### Use Case 2: Real Estate Agent Submission

```
Business: Mpumalanga Properties

Step 1 - Business Info:
├─ Name: Mpumalanga Properties
├─ Category: Real Estate → Sub: Residential
├─ Location: Nelspruit
├─ Phone: +27876543210
└─ Bio: 20+ years in luxury property sales...

Step 2 - Media:
├─ Images: [20+ property photos]
├─ Videos: [property tour videos]
├─ Menu: [N/A - not a restaurant]
└─ Proof: [business license + ID]

Step 3 - Services:
├─ Services: "Residential sales, Investment property, Rentals"
├─ Amenities: [Virtual tours, 3D models, Video walkthroughs]
└─ Hours: Mon-Sat 8am-5pm, Sun Closed

Step 4 - Package:
└─ Platinum (R1,999) → Premium placement + analytics

Step 5 - Review & Submit
↓
ADMIN REVIEW:
├─ Sees 20+ property photos
├─ Reviews property tour videos
├─ Checks proof of business
├─ Approves: ✓
↓
LIVE:
├─ Appears in: Real Estate category
├─ Premium placement on homepage
├─ Full property photo gallery
├─ Video tours embedded
├─ Access to analytics (Platinum tier)
```

---

## 🔧 Tech Stack Visualization

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND                             │
├─────────────────────────────────────────────────────────┤
│ React 19 + TypeScript + Vite                           │
│ ├─ BusinessSubmissionForm.tsx (600+ lines)            │
│ ├─ AdminSubmissionsReview.tsx (400+ lines)            │
│ └─ UI Components (Lucide icons)                       │
│ Dependencies:                                          │
│ ├─ @google/genai (for AI features)                   │
│ ├─ lucide-react (icons)                              │
│ └─ Tailwind CSS (styling)                            │
└─────────────────────────────────────────────────────────┘
                        ↓ (JSON over HTTP)
┌─────────────────────────────────────────────────────────┐
│                     BACKEND                             │
├─────────────────────────────────────────────────────────┤
│ Express.js + TypeScript + Node.js                      │
│ ├─ Routes: submissionRoutes.ts (6 endpoints)          │
│ ├─ Controllers: submissionController.ts               │
│ ├─ Services: submissionService.ts                     │
│ ├─ Models: PendingSubmission.ts (interfaces)          │
│ ├─ Middleware: authMiddleware, isAdmin                │
│ └─ Migrations: 001_create_pending_submissions.ts      │
│ Dependencies:                                          │
│ ├─ express (web framework)                           │
│ ├─ pg (PostgreSQL driver)                            │
│ ├─ jsonwebtoken (JWT auth)                           │
│ ├─ bcryptjs (password hashing)                       │
│ ├─ helmet (security headers)                         │
│ └─ cors (cross-origin requests)                      │
└─────────────────────────────────────────────────────────┘
                        ↓ (SQL queries)
┌─────────────────────────────────────────────────────────┐
│                    DATABASE                             │
├─────────────────────────────────────────────────────────┤
│ PostgreSQL 12+                                         │
│ ├─ pending_submissions (21 columns)                   │
│ ├─ businesses (pre-existing, data copied to)         │
│ └─ users (references for approved_by FK)             │
│ Features:                                              │
│ ├─ JSONB columns (operating_hours, amenities, etc.)  │
│ ├─ Enum constraints (status, package)                │
│ ├─ 3 performance indexes                             │
│ └─ Foreign key relationships                         │
└─────────────────────────────────────────────────────────┘
```

---

## 📱 Responsive Design

```
MOBILE (320px+)           TABLET (768px+)            DESKTOP (1024px+)
└─ Single column          └─ Two columns             └─ Three columns
  - Full width form        - Form + details           - List + detail + stats
  - Stack fields          - Side-by-side            - Optimized spacing
  - Large buttons         - Readable text           - Rich interactions
```

---

**This system is production-ready and fully scalable. All components are modular, type-safe, and well-tested.**
