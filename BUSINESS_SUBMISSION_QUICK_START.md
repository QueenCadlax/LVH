# Business Submission System — Quick Start (5 minutes)

## ⚡ Installation

### 1. Run Database Migration
```bash
cd backend
ts-node src/migrations/001_create_pending_submissions.ts
```
Expected output: `✅ pending_submissions table created successfully`

### 2. Start Backend
```bash
npm run build
node dist/server.js
```
Verify: `🚀 LowveldHub Backend Server Running`

### 3. Update App.tsx (Add Submission Form Button)

Find the navbar/hero section and add:
```typescript
import BusinessSubmissionForm from './components/BusinessSubmissionForm';

// In App component state:
const [showSubmissionForm, setShowSubmissionForm] = useState(false);

// In render JSX (add to navbar):
{showSubmissionForm && (
  <BusinessSubmissionForm
    onClose={() => setShowSubmissionForm(false)}
    onNavigate={handleNavigate}
  />
)}

// Add button somewhere visible:
<button
  onClick={() => setShowSubmissionForm(true)}
  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
>
  ✨ Submit Your Business
</button>
```

### 4. Update AdminApp.tsx (Add Admin Panel)

```typescript
import AdminSubmissionsReview from './components/AdminSubmissionsReview';

// In admin dashboard section:
<AdminSubmissionsReview
  isAdmin={isAdmin}
  token={jwtToken}
/>
```

### 5. Test It!

1. **Open frontend:** `http://localhost:3000`
2. **Click "Submit Your Business"** button
3. **Fill form:** Name, Category, Location, Contact, Images, etc.
4. **Select package:** Essential (R799), Professional (R1299), or Platinum (R1999)
5. **Submit** → See success message
6. **Login as admin** → View `Admin Submissions Review` panel
7. **Approve submission** → Business automatically appears in directory

---

## 📝 Key Files

| File | Purpose |
|------|---------|
| `backend/src/migrations/001_create_pending_submissions.ts` | Database setup |
| `backend/src/models/PendingSubmission.ts` | TypeScript interfaces |
| `backend/src/services/submissionService.ts` | Business logic (7 functions) |
| `backend/src/routes/submissionRoutes.ts` | API endpoints (6 routes) |
| `components/BusinessSubmissionForm.tsx` | Submission form (5-step wizard) |
| `components/AdminSubmissionsReview.tsx` | Admin review panel |
| `types.ts` | Updated with submission types |

---

## 🔗 API Endpoints

**Public:**
- `POST /api/submissions` — Submit new business

**Admin Only:**
- `GET /api/submissions?status=pending` — List submissions
- `GET /api/submissions/:id` — View details
- `PATCH /api/submissions/:id/approve` — Approve
- `PATCH /api/submissions/:id/reject` — Reject
- `GET /api/submissions/stats/overview` — Dashboard stats

---

## 📦 Package Pricing (Auto-calculated)

| Package | Price | Features |
|---------|-------|----------|
| Essential | R799 | Basic listing, 10 photos, hours |
| Professional | R1299 | Videos, menu, services, featured |
| Platinum | R1999 | Premium placement, analytics, VIP |

---

## ✅ Common Issues & Fixes

### "Migration failed: pool is not defined"
→ Ensure `backend/.env` has database credentials (`DB_HOST`, `DB_NAME`, etc.)

### "POST /api/submissions returns 404"
→ Check `backend/src/server.ts` has `app.use('/api/submissions', submissionRoutes);`

### "Admin panel shows 'Access required'"
→ User must be logged in with `role: 'admin'` (check JWT token)

### "Images not uploading"
→ Current implementation uses mock URLs. For production, integrate AWS S3 or similar.

---

## 🎯 Next: Advanced Features

Once basic system works, add:

1. **Email notifications** — Send confirmation/approval emails
2. **Payment integration** — Stripe/PayFast for package payment
3. **Business verification** — CIPC/Companies House lookup
4. **Auto-approval** — Criteria-based auto-approval (e.g., verified businesses)
5. **AI enhancements** — Auto-generate descriptions via Gemini

---

## 💡 Architecture Summary

```
Frontend (React)
    ↓
BusinessSubmissionForm.tsx (5-step form)
    ↓ (POST /api/submissions)
    ↓
Backend (Express)
    ↓
submissionRoutes.ts
    ↓
submissionController.ts (validation)
    ↓
submissionService.ts (business logic)
    ↓
PostgreSQL (pending_submissions table)
    ↓ (on approve)
    ↓
businesses table (live directory)
    ↓
Displayed in Directory, Marketplace, Search
    ↓
AdminSubmissionsReview.tsx (admin panel)
```

---

**Questions?** See `BUSINESS_SUBMISSION_SYSTEM_GUIDE.md` for complete reference.
