# Quick Reference: Common Tasks in LowveldHub

## Task: Navigate Between Views

**Pattern:** Use `handleNavigate()` ONLY for all navigation (no React Router)

```typescript
// Navigate to home
handleNavigate('home');

// Navigate to directory with category filter
handleNavigate('directory', 'FOOD & HOSPITALITY');

// Navigate to detail view
handleNavigate('business-detail', undefined, 'b_123');

// Navigate with subcategory
handleNavigate('real-estate', 'REAL ESTATE & PROPERTY', undefined, 'Residential');

// Navigate to protected route (requires isAuthenticated check inside handler)
handleNavigate('dashboard');
```

**Common View Names:** `home`, `directory`, `eats`, `marketplace`, `business-detail`, `real-estate`, `admin`, `login`, `dashboard`, `tourism`, `shopping`, `properties`

---

## Task: Call Gemini AI for Text Generation

**Pattern:** Always route through `aiService.ts`

```typescript
import { generateListingDescription, chatWithConcierge, performSmartSearch } from '@/services/aiService';

// Generate SEO description
const description = await generateListingDescription('Kuka Café', 'restaurant');

// Chat with concierge
const response = await chatWithConcierge('Show me luxury dining in Mbombela', []);

// AI-powered search with ranking
const results = await performSmartSearch('medical specialists', localBusinesses);
```

**Never do this:**
```typescript
// ❌ WRONG - Direct Gemini import
import { GoogleGenAI } from '@google/genai';
const genai = new GoogleGenAI({...});
```

---

## Task: Create a New Detail View Component

**Pattern:** Lazy-load with Suspense, scroll to top, search local array

```typescript
// 1. Create file: components/MyDetailView.tsx
import { useEffect } from 'react';

interface MyDetailViewProps {
  id?: string;
  navigate: (view: string, category?: string, id?: string, sub?: string) => void;
}

export default function MyDetailView({ id, navigate }: MyDetailViewProps) {
  useEffect(() => {
    window.scrollTo(0, 0);  // ← MUST DO THIS
  }, []);

  // Search localBusinesses for matching ID
  // (passed via parent App.tsx props or context)
  
  return (
    <div>
      {/* Detail content here */}
    </div>
  );
}

// 2. In App.tsx, import lazily
const MyDetailView = lazy(() => import('./components/MyDetailView'));

// 3. Add routing case
case 'my-view':
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <MyDetailView id={selectedBusinessId} navigate={handleNavigate} />
    </Suspense>
  );

// 4. Navigate to it
handleNavigate('my-view', undefined, 'business_id_here');
```

---

## Task: Add a New Business Category

**Pattern:** Update types.ts FIRST, then add seed data

```typescript
// 1. In types.ts, add to Category enum
export enum Category {
  // ... existing categories ...
  MyNewCategory = 'MY NEW CATEGORY NAME',
}

// 2. Add to CategorySubcategories if needed
export const CategorySubcategories: Record<Category, string[]> = {
  // ... existing subcategories ...
  [Category.MyNewCategory]: ['Sub 1', 'Sub 2', 'Sub 3'],
};

// 3. Create seed file: data/myNewSeeds.ts
export const myNewListings: Business[] = [
  {
    id: 'new_001',
    name: 'Business Name',
    image: 'https://...',
    rating: 4.5,
    reviewCount: 42,
    tier: ListingTier.Premium,
    category: Category.MyNewCategory,
    location: 'Mbombela',
    // ... other fields
  },
];

// 4. Import in App.tsx (line 11-34)
import { myNewListings } from './data/myNewSeeds';

// 5. Add to localBusinesses initialization
localBusinesses: useMemo(() => {
  let filtered = [
    ...businesses, ...myNewListings, // ← add here
    // ... other seed imports
  ];
  // ... rest of filtering logic
}, [activeCategory, activeArea, searchTerm]);

// 6. Create detail view component
// (follow "Create a New Detail View Component" pattern above)

// 7. Add switch case in App.tsx render
case 'my-new-detail':
  return <MyNewDetailView id={selectedBusinessId} navigate={handleNavigate} />;
```

---

## Task: Create Backend API Endpoint

**Pattern:** Route → Service → Database, with auth middleware

```typescript
// 1. Create route handler in backend/src/routes/myRoutes.ts
import { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware';
import isAdmin from '../middleware/isAdmin';

const router = Router();

// Public endpoint
router.get('/public', (req, res) => {
  try {
    res.json({ success: true, data: {...} });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Protected endpoint (requires login)
router.get('/private', authMiddleware, (req, res) => {
  const user = (req as AuthRequest).user;
  if (!user) return res.status(401).json({ error: 'Unauthorized' });
  res.json({ success: true, data: {...} });
});

// Admin-only endpoint
router.patch('/admin-action', authMiddleware, isAdmin, (req, res) => {
  // Only admins reach here
  res.json({ success: true, message: 'Action completed' });
});

export default router;

// 2. Register in backend/src/server.ts
import myRoutes from './routes/myRoutes';
app.use('/api/my-path', myRoutes);

// 3. Call from frontend
const response = await fetch('http://localhost:5000/api/my-path/endpoint', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${jwtToken}`, // if protected
    'Content-Type': 'application/json'
  }
});

if (response.status === 401) {
  handleNavigate('login'); // Re-authenticate
} else if (response.ok) {
  const data = await response.json();
  console.log(data.success, data.data);
}
```

---

## Task: Handle Favorites (Client-Side State)

**Pattern:** Toggle in App.tsx, stored in Set, uses localStorage

```typescript
// In App.tsx state
const [favorites, setFavorites] = useState<Set<string>>(new Set());

// Toggle favorite
const toggleFavorite = (id: string) => {
  setFavorites(prev => {
    const updated = new Set(prev);
    if (updated.has(id)) {
      updated.delete(id);
    } else {
      updated.add(id);
    }
    // Optional: persist to localStorage
    localStorage.setItem('favorites', JSON.stringify([...updated]));
    return updated;
  });
};

// In component, check if favorited
const isFavorite = favorites.has(businessId);

// In LuxuryCard, handle toggle
<LuxuryCard
  isFavorite={isFavorite}
  onToggleFavorite={() => toggleFavorite(businessId)}
  {...otherProps}
/>
```

**Note:** Favorites are NOT persisted to backend by default. Add API integration if persistent storage across sessions is needed.

---

## Task: Check User Authentication

**Pattern:** Check isAuthenticated state before rendering protected content

```typescript
// In App.tsx
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [currentUser, setCurrentUser] = useState<User | null>(null);

// In render or component
if (currentView === 'dashboard') {
  if (!isAuthenticated) {
    handleNavigate('login');
    return null;
  }
  return <Dashboard user={currentUser} />;
}

// In components that need auth
{isAuthenticated && (
  <button onClick={() => handleNavigate('dashboard')}>My Dashboard</button>
)}
```

---

## Task: Format Tier-Specific UI

**Pattern:** Check tier enum before rendering premium UI

```typescript
import { ListingTier } from '@/types';

// In component
const glowColor = 
  listing.tier === ListingTier.Platinum ? 'purple' :
  listing.tier === ListingTier.Elite ? 'gold' :
  'transparent';

// Tailwind classes
const bgClass = 
  listing.tier === ListingTier.Platinum ? 'bg-purple-500/20' :
  listing.tier === ListingTier.Elite ? 'bg-yellow-500/20' :
  'bg-gray-50';

// Render
<div className={`relative p-4 rounded-lg ${bgClass} ${glowColor && 'shadow-lg'}`}>
  {listing.tier === ListingTier.Platinum && (
    <span className="absolute top-2 right-2 text-purple-600 font-bold">★ Platinum</span>
  )}
  {listing.tier === ListingTier.Elite && (
    <span className="absolute top-2 right-2 text-yellow-600 font-bold">★ Elite</span>
  )}
  {/* listing content */}
</div>
```

---

## Task: Filter by Mpumalanga Area

**Pattern:** Use `activeArea` state to filter localBusinesses

```typescript
// In App.tsx state
const [activeArea, setActiveArea] = useState('All Areas');

// In localBusinesses memoized filter
const filtered = useMemo(() => {
  let results = allListings;
  
  if (activeArea && activeArea !== 'All Areas') {
    results = results.filter(b => 
      b.location?.includes(activeArea) || b.area === activeArea
    );
  }
  
  return results;
}, [activeArea, activeCategory, searchTerm]);

// In component, render area selector
import { MPUMALANGA_AREAS } from '@/types';

<select 
  value={activeArea} 
  onChange={(e) => setActiveArea(e.target.value)}
>
  {['All Areas', ...MPUMALANGA_AREAS].map(area => (
    <option key={area}>{area}</option>
  ))}
</select>
```

---

## Task: Generate Images with Gemini

**Pattern:** Use aiService for image generation (Gemini 2.5)

```typescript
import { generateLuxuryPlaceholder } from '@/services/aiService';

// In component
const imageUrl = await generateLuxuryPlaceholder('5-star resort in Kruger');

// Returns URL to image or Unsplash fallback if error
<img src={imageUrl} alt="Luxury resort" className="w-full h-48 object-cover" />
```

---

## Task: Add Product to Marketplace

**Pattern:** Use ProductSubmissionFormV2, validate category

```typescript
import { MARKETPLACE_CATEGORY_GROUPS } from '@/types';

// Component receives form data
const handleSubmitProduct = (formData) => {
  // Validate category against MARKETPLACE_CATEGORY_GROUPS
  const validGroups = Object.values(MARKETPLACE_CATEGORY_GROUPS).flat();
  
  if (!validGroups.includes(formData.category)) {
    alert('Invalid category');
    return;
  }
  
  // Submit to backend
  await fetch('http://localhost:5000/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
};
```

---

## Debugging Checklist

When something breaks, check these in order:

1. **Detail views not rendering?** → Verify `window.scrollTo(0, 0)` in useEffect
2. **Seed data not showing?** → Check ID uniqueness across all 32 seed files
3. **Images broken?** → Verify all listings have `image` field with valid URL
4. **Tier glows missing?** → Confirm `tier` field is set to ListingTier enum value
5. **Navigation broken?** → Check you're using `handleNavigate()` not React Router
6. **AI calls failing?** → Verify all calls go through `services/aiService.ts`
7. **Backend not responding?** → Run `cd backend && npm run build && node dist/server.js`
8. **Auth redirecting unexpectedly?** → Check `isAuthenticated` state and JWT in localStorage
9. **Styles not applying?** → Check Tailwind class names are correct, verify z-index conflicts
10. **Performance slow?** → Check localStorage size, consider removing seed files temporarily

---

**Last Updated:** February 3, 2026  
**For detailed information:** See `.github/copilot-instructions.md`
