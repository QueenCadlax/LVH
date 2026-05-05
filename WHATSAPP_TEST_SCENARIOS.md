# WhatsApp Marketplace Integration — Test Scenarios

## Quick Test (2 minutes)

### Scenario 1: Valid Product with WhatsApp
**Step 1:** Navigate to Marketplace
**Step 2:** Click on any product card (mp-001, mp-002, or mp-003 have WhatsApp numbers)
**Step 3:** Product detail view opens
**Step 4:** Click "Contact Seller on WhatsApp" button
**Expected Result:** WhatsApp web opens with:
- Prefilled message: `Hi, I found your "[product-name]" on LowveldHub. Is it still available?`
- Opens in new tab at `https://wa.me/[seller-number]?text=[message]`
- User can send message directly to seller

---

### Scenario 2: Product Without WhatsApp Number
**Step 1:** Browse marketplace products (any product without `sellerPhone` field)
**Step 2:** Click "Contact Seller on WhatsApp" button
**Expected Result:** Alert appears
- Text: "Seller WhatsApp number not available. Please visit their store instead."
- OK button closes alert
- User can click "Visit Seller Store" button as alternative

---

### Scenario 3: Save for Later (Still Works)
**Step 1:** Open any product detail
**Step 2:** Click "Save for Later" button
**Expected Result:** Button highlights in red, product added to favorites
- Heart icon fills with red color
- User can access favorites from navigation or dashboard

---

### Scenario 4: UI Verification
**Step 1:** Load marketplace homepage
**Expected Result (VERIFY ABSENCE):**
- ❌ No "Add to Cart" button visible
- ❌ No cart counter badge at top
- ❌ No "Checkout" or "Buy Now" buttons
- ❌ No "Purchase" language anywhere

**Expected Result (VERIFY PRESENCE):**
- ✅ "Discover premium products..." heading
- ✅ "Contact Seller on WhatsApp" button (primary action)
- ✅ "Visit Seller Store" button (secondary action)
- ✅ "Save for Later" button (tertiary action)

---

## Data Verification

### Products with WhatsApp Numbers (Ready to Test)
```
mp-001: Bespoke Leather Tote Bag
  Seller: Lowveld Artisans
  WhatsApp: +27 71 234 5678

mp-002: Mirrorless 4K Camera Body
  Seller: Pro Imaging Supplies
  WhatsApp: +27 82 567 8901

mp-003: Wireless Noise-Cancelling Headphones
  Seller: Sony SA Retail
  WhatsApp: +27 73 890 1234
```

### How to Add More WhatsApp Numbers
File: `data/seeds.ts` (line ~3896)
```typescript
// Find this pattern in each product object:
sellerPhone: '+27 71 234 5678',

// Add to any product object that's missing it
// Format: +27 [2-digit area code] [3-digit prefix] [4-digit number]
```

---

## Prefilled Message Examples

When user clicks WhatsApp button:

**Product:** Bespoke Leather Tote Bag
```
Hi, I found your "Bespoke Leather Tote Bag" on LowveldHub. Is it still available?
```

**Product:** Mirrorless 4K Camera Body
```
Hi, I found your "Mirrorless 4K Camera Body" on LowveldHub. Is it still available?
```

Message automatically:
1. Extracts product title from `product.title`
2. URL-encodes special characters
3. Opens WhatsApp with text pre-filled
4. User can edit before sending

---

## Error Handling Test

### Test Missing WhatsApp Number
1. Create product with `sellerPhone: undefined`
2. Click "Contact Seller on WhatsApp"
3. Verify alert: "Seller WhatsApp number not available..."
4. Verify "Visit Seller Store" button still works

---

## Mobile Testing

### iOS (Safari)
- [ ] WhatsApp button clickable on mobile
- [ ] `wa.me` link opens WhatsApp app (not web)
- [ ] Message pre-filled correctly
- [ ] Keyboard appears for typing

### Android (Chrome)
- [ ] WhatsApp button clickable on mobile
- [ ] `wa.me` link opens WhatsApp app
- [ ] Message pre-filled correctly
- [ ] User can send message

### Desktop (Chrome/Firefox)
- [ ] WhatsApp button clickable
- [ ] `wa.me` link opens WhatsApp web (not app)
- [ ] Message pre-filled correctly
- [ ] QR code scan required (first time)

---

## Performance

- [ ] No loading delay when clicking WhatsApp button
- [ ] Marketplace loads in < 2 seconds
- [ ] No console errors (DevTools → Console)
- [ ] No network errors (DevTools → Network tab)

---

## Cleanup Verification

**Files Deleted:**
- [x] `SellerInquiries.tsx` — DELETED
- [x] `ContactSellerModal.tsx` — DELETED

**Imports Removed:**
- [x] SellerInquiries import from App.tsx
- [x] CartDrawer import from MarketplaceUnified.tsx
- [x] ContactSellerModal import from MarketplaceUnified.tsx
- [x] ShoppingCart icon import from MarketplaceUnified.tsx

**Routes Removed:**
- [x] `seller-inquiries` case from App.tsx switch statement

**UI Removed:**
- [x] Cart counter button from MarketplaceUnified.tsx
- [x] CartDrawer component render from MarketplaceUnified.tsx
- [x] "My Inquiries" card from Dashboard.tsx

---

## Deployment Checklist

- [ ] All TypeScript errors resolved (0 errors)
- [ ] Test WhatsApp button on Chrome/Firefox/Safari
- [ ] Verify product list loads without errors
- [ ] Verify no "Add to Cart" UI appears
- [ ] Verify "Contact Seller on WhatsApp" button visible
- [ ] Test on mobile viewport (iPhone/Android sizes)
- [ ] Check localStorage/session storage (favorites still saved)
- [ ] No console warnings or errors
- [ ] Product data includes sellerPhone for new products
- [ ] Version control committed and tagged

---

## Success Criteria

✅ **Functional:**
- WhatsApp button opens correct wa.me URL with prefilled message
- Save for Later works (still adds to favorites)
- Visit Seller Store navigates to seller profile
- Error handling shows alert if WhatsApp missing

✅ **UI/UX:**
- No cart, checkout, or payment UI visible
- Button labels: "Contact Seller on WhatsApp", "Visit Seller Store", "Save for Later"
- Responsive on mobile, tablet, desktop
- Consistent styling with LowveldHub premium aesthetic

✅ **Code Quality:**
- TypeScript compiles without errors
- No unused imports or dead code
- Props properly typed
- Error boundaries intact

✅ **Honest Positioning:**
- No fake buttons or false functionality
- Clear WhatsApp-direct integration
- Manual seller-buyer negotiation
- Off-platform transactions transparent

---

**Ready for Production Testing** ✅

