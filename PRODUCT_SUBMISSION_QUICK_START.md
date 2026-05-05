# 🚀 Product Submission System - QUICK START GUIDE

**Get the marketplace product system up and running in 15 minutes.**

---

## ⚡ Quick Setup (5 minutes)

### 1. Run Database Migration
```bash
cd backend
npx ts-node src/migrations/createProductsTables.ts
```

**Expected output:**
```
📦 Creating products tables...
✓ Products tables created successfully
✓ Migration complete
```

### 2. Build Backend
```bash
cd backend
npm run build
```

### 3. Verify Types Compile
```bash
# From root directory
npx tsc --noEmit
```

**Should see NO TypeScript errors.**

---

## 🧪 Testing the System (10 minutes)

### Test 1: Submit a Product (Manual)

**1a. Start backend:**
```bash
cd backend
node dist/server.js
```

**1b. Start frontend:**
```bash
npm run dev
```

**1c. Navigate to Add Product:**
- Log in (or use existing account)
- Find "List Your Product" button (or manually navigate to add-product route)
- Fill form:
  - Title: "Samsung 55-inch Smart TV"
  - Category: "Electronics & Technology"
  - Condition: "New"
  - Price: "5999"
  - Stock: "1"
  - Description: "Excellent condition, recently purchased"
  - Upload 1-3 product images
  - Phone: "072 123 4567"
  - Seller Type: "Individual"
  - Pricing Tier: "One-Off (R35)"
- Click [List Product]

**Expected:** Product created, user redirected to marketplace, product visible in listing

### Test 2: Report a Product

**2a. Find any product in marketplace**

**2b. Click the product to view details** (or add report button to product card)

**2c. Click "Report" button and fill:**
- Reason: "Spam"
- Description: "This is clearly spam"

**2d. Repeat 3 times** (or submit 3 different reports)

**Expected:** 
- Product `reported_count` increases to 3
- Product moved to flagged list
- (Optional) Admin receives email alert

### Test 3: Admin Review & Action

**3a. Log in as admin**

**3b. Navigate to Moderation page:**
```
Admin Dashboard → [🚨 Moderation] button
```

**3c. View flagged products list**

**3d. Click any product and choose action:**
- Click [✓ Clear & Approve] → reports cleared, product stays active
- Click [✗ Remove Product] → product hidden from marketplace
- Click [⊘ Suspend Seller] → all seller's products hidden

**Expected:** Product state updated, list refreshed, count badges updated

---

## 🔌 Integrating into App.tsx

### Step 1: Add Route Case
```typescript
// In App.tsx, find the main render switch statement (around line 3286)
// Add this case:

case 'add-product':
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ProductSubmissionFormV2 
        onClose={() => handleNavigate('marketplace')}
        onNavigate={handleNavigate}
        sellerId={currentUser?.id || ''}
        sellerName={currentUser?.name || ''}
        sellerEmail={currentUser?.email || ''}
        currentPricingTier={userSubscriptionTier || ProductPricingTier.FREE}
        productsListedThisMonth={calculateProductsThisMonth()}
      />
    </Suspense>
  );
```

### Step 2: Add Button to Marketplace
```typescript
// In MarketplaceLanding or wherever makes sense (hero section or nav)

<button
  onClick={() => handleNavigate('add-product')}
  className="px-6 py-3 bg-[#D4AF37] text-black font-semibold rounded hover:bg-[#E5C158] transition-colors"
>
  + List Your Product
</button>
```

### Step 3: Add Admin Moderation Route
```typescript
// In AdminApp.tsx or main admin routing, add:

case 'moderation':
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ProductModerationReviewPage navigate={handleNavigate} />
    </Suspense>
  );

// Also add nav button in admin sidebar:
<button
  onClick={() => handleNavigate('moderation')}
  className="flex items-center gap-2 px-4 py-2 text-white hover:text-[#D4AF37] transition-colors"
>
  🚨 Moderation ({flaggedProductCount})
</button>
```

### Step 4: Import Components
```typescript
// At top of App.tsx (or AdminApp.tsx):

import ProductSubmissionFormV2 from '@/components/Marketplace/ProductSubmissionFormV2';
import ProductModerationReviewPage from '@/components/Admin/ProductModerationReviewPage';
```

---

## 🧩 API Endpoints Reference

### For Testing in Postman/cURL

**List Products:**
```bash
curl http://localhost:5000/api/products?limit=10&offset=0
```

**Create Product:**
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "iPhone 13",
    "description": "Like new condition",
    "category": "Electronics & Technology",
    "condition": "Like New",
    "priceValue": 8999,
    "stock": 1,
    "images": ["data:image/jpeg;base64,..."],
    "sellerPhone": "072 123 4567",
    "sellerType": "individual",
    "pricingTier": "one_off"
  }'
```

**Report Product:**
```bash
curl -X POST http://localhost:5000/api/products/prod_abc123/report \
  -H "Content-Type: application/json" \
  -d '{
    "reason": "Scam",
    "description": "Fake listing",
    "reporterEmail": "user@example.com"
  }'
```

**Get Flagged Products (Admin):**
```bash
curl http://localhost:5000/api/admin/products/flagged \
  -H "Authorization: Bearer YOUR_ADMIN_JWT_TOKEN"
```

**Approve Product (Admin):**
```bash
curl -X POST http://localhost:5000/api/products/prod_abc123/approve \
  -H "Authorization: Bearer YOUR_ADMIN_JWT_TOKEN"
```

---

## 🎨 Customizing the Form

### Change Colors
Edit `ProductSubmissionFormV2.tsx`, replace color codes:
- `#D4AF37` → Gold accent (change to your color)
- `#000000` → Black background
- `#FFFFFF` → White text

**Search & replace all instances:**
```
#D4AF37 → Your accent color
#000000 → Your background
#FFFFFF → Your text color
```

### Add More Product Categories
Edit `types.ts`:
```typescript
export enum ProductCategory {
  // ... existing ...
  MY_CUSTOM_CATEGORY = 'My Custom Category'
}
```

### Change Pricing Tiers
Edit `types.ts`:
```typescript
const PRODUCT_PRICING_STRUCTURE = {
  [ProductPricingTier.STARTER]: {
    name: 'Starter',
    monthly_price: 250,        // Changed from 150
    products_per_month: 30,    // Changed from 20
    listing_duration_days: 90
  }
};
```

### Modify Moderation Threshold
Edit `types.ts`:
```typescript
export const PRODUCT_MODERATION_THRESHOLD = 5;  // Changed from 3
```

---

## 🐛 Troubleshooting

### Issue: "Product not found" after submission
**Cause:** Database migration didn't run
**Fix:** 
```bash
cd backend
npx ts-node src/migrations/createProductsTables.ts
```

### Issue: Form won't submit
**Cause:** JWT token invalid or missing
**Fix:** 
- Log in again to refresh token
- Check Authorization header in API call
- Verify `authMiddleware` is installed in backend

### Issue: Images not uploading
**Cause:** Base64 string too large or file type not supported
**Fix:**
- Compress images before upload
- Use JPG/PNG only
- Check file size < 10MB

### Issue: Moderation page shows no products
**Cause:** No products with >= 3 reports yet
**Fix:**
- Submit a product
- Report it 3+ times from different users
- Refresh moderation page

### Issue: TypeScript errors in components
**Cause:** Types not imported or outdated
**Fix:**
```bash
# Verify imports at top of file:
import { ProductCategory, ProductSubmissionData, ProductPricingTier } from '@/types';

# Then rebuild:
npm run build
```

---

## 🔐 Security Notes

**Never hardcode JWT tokens** in API calls. Always:
```typescript
// ✅ Correct
const token = localStorage.getItem('jwtToken');
fetch(url, { headers: { Authorization: `Bearer ${token}` } });

// ❌ Wrong
fetch(url, { headers: { Authorization: 'Bearer eyJ0eXAi...' } });
```

**Images in base64:** Current system stores as base64 in database (fine for demo). For production:
```typescript
// Replace with Cloudinary upload:
const uploadToCloudinary = async (base64Image) => {
  const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: 'POST',
    body: formData
  });
  return response.json().secure_url;
};
```

---

## 📊 Database Queries for Testing

**Count flagged products:**
```sql
SELECT COUNT(*) FROM products WHERE reported_count >= 3;
```

**View all reports for a product:**
```sql
SELECT * FROM product_reports WHERE product_id = 'prod_abc123';
```

**List all products by a seller:**
```sql
SELECT id, title, status FROM products WHERE seller_email = 'seller@example.com';
```

**Find recently reported products:**
```sql
SELECT id, title, reported_count FROM products 
WHERE reported_count >= 1 
ORDER BY reported_count DESC 
LIMIT 10;
```

**Suspend all products from a seller:**
```sql
UPDATE products 
SET is_suspended = true 
WHERE seller_email = 'banned-seller@example.com';
```

---

## 📈 Monitoring & Analytics

**Add to dashboard later:**

```typescript
// Count metrics
const totalProducts = `SELECT COUNT(*) FROM products WHERE status = 'active'`;
const totalReports = `SELECT COUNT(*) FROM product_reports`;
const flaggedProducts = `SELECT COUNT(*) FROM products WHERE reported_count >= 3`;
const averageReportsPerProduct = `SELECT AVG(reported_count) FROM products WHERE reported_count > 0`;

// Top report reasons
const topReasons = `
  SELECT reason, COUNT(*) as count 
  FROM product_reports 
  GROUP BY reason 
  ORDER BY count DESC
`;

// Top sellers
const topSellers = `
  SELECT seller_email, COUNT(*) as product_count 
  FROM products 
  WHERE status = 'active' 
  GROUP BY seller_email 
  ORDER BY product_count DESC 
  LIMIT 10
`;
```

---

## ✨ Next Steps

**Immediately:**
1. ✅ Run migration
2. ✅ Integrate form into App.tsx
3. ✅ Test product submission (end-to-end)
4. ✅ Test moderation flow

**This Week:**
- [ ] Add email notifications when product flagged
- [ ] Add product analytics dashboard for sellers
- [ ] Integrate with payment system for subscriptions

**Next Sprint:**
- [ ] Featured product listings (paid boost)
- [ ] Product messaging system
- [ ] AI-powered smart categorization
- [ ] Price comparison tool

---

**Questions?** Check PRODUCT_SUBMISSION_SYSTEM_COMPLETE.md for full architecture details.
