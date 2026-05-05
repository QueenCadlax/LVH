// COMPONENT INTEGRATION DEMO FILE
// This file demonstrates how all 13 components work together in App.tsx
// Copy-paste code snippets from this file into your actual implementation

import React, { useState, useEffect } from 'react';

// ============================================================================
// IMPORTS - Add these to App.tsx
// ============================================================================

import BusinessSubmissionFormV2 from '@/components/BusinessSubmissionFormV2';
import AutoCategorization from '@/components/BusinessSubmission/AutoCategorization';
import DuplicateDetection from '@/components/BusinessSubmission/DuplicateDetection';
import ProductComparisonTool from '@/components/Marketplace/ProductComparisonTool';
import WishListPanel from '@/components/Marketplace/WishListPanel';
import BulkDiscountIndicator from '@/components/Marketplace/BulkDiscountIndicator';
import SavedSearchFilters from '@/components/Directory/SavedSearchFilters';
import BusinessMetricsCard from '@/components/Admin/BusinessMetricsCard';
import AdminBulkActionsPanel from '@/components/Admin/AdminBulkActionsPanel';
import VirtualTourPlayer from '@/components/RealEstate/VirtualTourPlayer';
import PriceHistoryChart from '@/components/RealEstate/PriceHistoryChart';
import MortgageCalculator from '@/components/RealEstate/MortgageCalculator';
import NeighborhoodComparison from '@/components/RealEstate/NeighborhoodComparison';

// ============================================================================
// STATE MANAGEMENT - Add these to App.tsx state initialization
// ============================================================================

const [selectedProducts, setSelectedProducts] = useState<MarketplaceItem[]>([]);
const [wishlist, setWishlist] = useState<MarketplaceItem[]>([]);
const [savedFilters, setSavedFilters] = useState<SavedSearchFilter[]>([]);
const [selectedBusinessIds, setSelectedBusinessIds] = useState<Set<string>>(
  new Set()
);

// Load saved filters from localStorage on mount
useEffect(() => {
  const saved = localStorage.getItem('savedSearchFilters');
  if (saved) {
    setSavedFilters(JSON.parse(saved));
  }
}, []);

// ============================================================================
// INTEGRATION EXAMPLE 1: FORM INTEGRATION
// ============================================================================

// In your business submission view:
const handleBusinessSubmissionView = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <BusinessSubmissionFormV2
        onClose={() => handleNavigate('home')}
        onNavigate={handleNavigate}
      />
    </Suspense>
  );
};

// ============================================================================
// INTEGRATION EXAMPLE 2: MARKETPLACE INTEGRATION
// ============================================================================

const handleMarketplaceView = () => {
  return (
    <div className="space-y-6">
      {/* FILTERS */}
      <SavedSearchFilters
        currentFilters={{
          category: activeCategory,
          area: activeArea
        }}
        savedFilters={savedFilters}
        onSaveFilter={(name, filters) => {
          const newFilter = {
            name,
            filters,
            createdAt: new Date(),
            lastUsed: new Date(),
            useCount: 1
          };
          const updated = [...savedFilters, newFilter];
          setSavedFilters(updated);
          localStorage.setItem('savedSearchFilters', JSON.stringify(updated));
        }}
        onLoadFilter={(filters) => {
          // Apply filter to search
          setActiveCategory(filters.category || '');
          setActiveArea(filters.area || '');
        }}
        onDeleteFilter={(index) => {
          const updated = savedFilters.filter((_, i) => i !== index);
          setSavedFilters(updated);
          localStorage.setItem('savedSearchFilters', JSON.stringify(updated));
        }}
      />

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {localMarketplaceProducts.map((product) => (
          <div key={product.id} className="relative">
            {/* PRODUCT CARD */}
            <ProductCard
              product={product}
              onAddToComparison={() => {
                setSelectedProducts([...selectedProducts, product]);
              }}
              onAddToWishlist={() => {
                if (wishlist.find((w) => w.id === product.id)) {
                  setWishlist(wishlist.filter((w) => w.id !== product.id));
                } else {
                  setWishlist([...wishlist, product]);
                }
              }}
              isFavorited={wishlist.some((w) => w.id === product.id)}
            />

            {/* BULK DISCOUNTS */}
            <BulkDiscountIndicator
              productPrice={product.price}
              productId={product.id}
              onQuantityChange={(quantity, discount, total) => {
                console.log(
                  `Product ${product.id}: Qty ${quantity}, ${discount}% OFF, Total R${total}`
                );
              }}
            />
          </div>
        ))}
      </div>

      {/* WISH LIST PANEL */}
      <div className="fixed bottom-4 right-4">
        <button
          onClick={() => setShowWishList(!showWishList)}
          className="px-4 py-2 bg-yellow-600 text-black rounded-lg font-bold"
        >
          ❤️ Wishlist ({wishlist.length})
        </button>
        {showWishList && (
          <WishListPanel
            items={wishlist}
            onRemoveItem={(id) => {
              setWishlist(wishlist.filter((item) => item.id !== id));
            }}
            onTogglePriceAlert={(id) => {
              console.log(`Price alert toggled for ${id}`);
            }}
          />
        )}
      </div>

      {/* COMPARISON TOOL */}
      {selectedProducts.length > 0 && (
        <ProductComparisonTool
          selectedProducts={selectedProducts}
          onRemoveProduct={(id) => {
            setSelectedProducts(
              selectedProducts.filter((p) => p.id !== id)
            );
          }}
        />
      )}
    </div>
  );
};

// ============================================================================
// INTEGRATION EXAMPLE 3: BUSINESS SUBMISSION WITH AI
// ============================================================================

const handleBusinessFormWithAI = () => {
  const [businessName, setBusinessName] = useState('');
  const [businessDescription, setBusinessDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [duplicateWarning, setDuplicateWarning] = useState(null);

  return (
    <div className="space-y-6">
      {/* STEP 1: BUSINESS BASICS */}
      <div>
        <h2 className="text-white font-bold text-lg mb-4">Step 1: Business Basics</h2>

        {/* BUSINESS NAME INPUT */}
        <input
          type="text"
          placeholder="Business Name"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          className="w-full px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg mb-4"
        />

        {/* DUPLICATE DETECTION - REAL TIME */}
        <DuplicateDetection
          businessName={businessName}
          category={selectedCategory || undefined}
          onDuplicateDetected={(matches) => {
            setDuplicateWarning(matches);
          }}
        />

        {/* BUSINESS DESCRIPTION */}
        <textarea
          placeholder="Business Description"
          value={businessDescription}
          onChange={(e) => setBusinessDescription(e.target.value)}
          className="w-full px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg mb-4"
          rows={4}
        />

        {/* AUTO CATEGORIZATION - AI SUGGESTION */}
        <AutoCategorization
          businessName={businessName}
          businessDescription={businessDescription}
          onSelectCategory={(category, confidence) => {
            setSelectedCategory(category);
            console.log(`Selected: ${category} (${confidence}% confidence)`);
          }}
        />
      </div>
    </div>
  );
};

// ============================================================================
// INTEGRATION EXAMPLE 4: ADMIN DASHBOARD
// ============================================================================

const handleAdminDashboard = () => {
  const [businessMetrics, setBusinessMetrics] = useState([
    {
      businessId: 'b_1',
      businessName: 'Kuka Café',
      views: 1250,
      favorites: 89,
      enquiries: 34,
      weeklyTrend: 12.5,
      conversionRate: 2.7
    },
    {
      businessId: 'b_2',
      businessName: 'White River Golf',
      views: 890,
      favorites: 45,
      enquiries: 22,
      weeklyTrend: -5.2,
      conversionRate: 2.5
    }
  ]);

  const [pendingSubmissions, setPendingSubmissions] = useState([
    { id: 's_1', businessName: 'New Restaurant', status: 'pending' },
    { id: 's_2', businessName: 'New Shop', status: 'pending' }
  ]);

  return (
    <div className="space-y-8">
      {/* METRICS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {businessMetrics.map((metric) => (
          <BusinessMetricsCard
            key={metric.businessId}
            businessId={metric.businessId}
            businessName={metric.businessName}
            metrics={{
              views: metric.views,
              favorites: metric.favorites,
              enquiries: metric.enquiries,
              weeklyTrend: metric.weeklyTrend,
              conversionRate: metric.conversionRate
            }}
            onViewDetails={() =>
              handleNavigate('business-detail', undefined, metric.businessId)
            }
          />
        ))}
      </div>

      {/* BULK ACTIONS */}
      <AdminBulkActionsPanel
        businesses={pendingSubmissions}
        selectedIds={selectedBusinessIds}
        onToggleSelect={(id) => {
          const newSet = new Set(selectedBusinessIds);
          if (newSet.has(id)) {
            newSet.delete(id);
          } else {
            newSet.add(id);
          }
          setSelectedBusinessIds(newSet);
        }}
        onApprove={async () => {
          console.log(`Approving: ${Array.from(selectedBusinessIds)}`);
          // Call backend API
          setSelectedBusinessIds(new Set());
        }}
        onReject={async () => {
          console.log(`Rejecting: ${Array.from(selectedBusinessIds)}`);
          // Call backend API
          setSelectedBusinessIds(new Set());
        }}
        onDelete={async () => {
          console.log(`Deleting: ${Array.from(selectedBusinessIds)}`);
          // Call backend API
          setSelectedBusinessIds(new Set());
        }}
      />
    </div>
  );
};

// ============================================================================
// INTEGRATION EXAMPLE 5: REAL ESTATE PROPERTY DETAIL
// ============================================================================

const handlePropertyDetailView = () => {
  const property = {
    id: 'prop_1',
    name: 'Modern Home in White River',
    price: 1800000,
    tourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    area: 'White River'
  };

  return (
    <div className="space-y-8">
      {/* VIRTUAL TOUR SECTION */}
      <div className="border border-yellow-600/40 rounded-lg p-6">
        <h3 className="text-white font-bold text-lg mb-4">Virtual Tour</h3>
        <VirtualTourPlayer
          tourUrl={property.tourUrl}
          duration={600}
          features={['360° views', 'Full walkthrough', 'Drone footage']}
        />
      </div>

      {/* PRICE HISTORY SECTION */}
      <div className="border border-yellow-600/40 rounded-lg p-6">
        <h3 className="text-white font-bold text-lg mb-4">Price History</h3>
        <PriceHistoryChart propertyId={property.id} currency="R" />
      </div>

      {/* MORTGAGE CALCULATOR SECTION */}
      <div className="border border-yellow-600/40 rounded-lg p-6">
        <h3 className="text-white font-bold text-lg mb-4">Mortgage Calculator</h3>
        <MortgageCalculator
          propertyPrice={property.price}
          onCalculate={(calculation) => {
            console.log(`Monthly Payment: R${calculation.monthlyPayment}`);
          }}
        />
      </div>

      {/* NEIGHBORHOOD COMPARISON SECTION */}
      <div className="border border-yellow-600/40 rounded-lg p-6">
        <h3 className="text-white font-bold text-lg mb-4">Area Analysis</h3>
        <NeighborhoodComparison
          selectedNeighborhoods={['White River', 'Mbombela Central']}
        />
      </div>
    </div>
  );
};

// ============================================================================
// COMPONENT INTEGRATION VERIFICATION CHECKLIST
// ============================================================================

/**
 * VERIFICATION CHECKLIST - Test these before deployment:
 *
 * ✅ FORM COMPONENTS
 * - [ ] BusinessSubmissionFormV2 renders and auto-saves to localStorage
 * - [ ] Draft recovery works on refresh
 * - [ ] File upload error handling preserves form state
 * - [ ] Verification timeline displays on success
 *
 * ✅ BUSINESS SUBMISSION
 * - [ ] AutoCategorization shows top 5 suggestions with confidence
 * - [ ] DuplicateDetection alerts on high-risk matches
 * - [ ] Both components update when business name/description change
 *
 * ✅ MARKETPLACE
 * - [ ] ProductComparisonTool renders comparison table
 * - [ ] WishListPanel shows statistics and share button
 * - [ ] BulkDiscountIndicator calculates discounts correctly
 * - [ ] SavedSearchFilters persists to localStorage
 *
 * ✅ ADMIN
 * - [ ] BusinessMetricsCard displays KPIs correctly
 * - [ ] AdminBulkActionsPanel enables actions when items selected
 * - [ ] Multi-select tracking works with Set<string>
 *
 * ✅ REAL ESTATE
 * - [ ] VirtualTourPlayer plays YouTube videos
 * - [ ] PriceHistoryChart displays interactive chart
 * - [ ] MortgageCalculator calculates payments correctly
 * - [ ] NeighborhoodComparison allows multi-select and comparison
 *
 * ✅ RESPONSIVE DESIGN
 * - [ ] All components responsive on mobile (375px)
 * - [ ] All components responsive on tablet (768px)
 * - [ ] All components responsive on desktop (1024px+)
 *
 * ✅ ACCESSIBILITY
 * - [ ] Keyboard navigation works (Tab, Enter, Space)
 * - [ ] ARIA labels present
 * - [ ] Color contrast meets WCAG standards
 * - [ ] Form labels associated with inputs
 */

// ============================================================================
// STATE FLOW DIAGRAM
// ============================================================================

/**
 * APP.TSX STATE ARCHITECTURE
 *
 * App.tsx (Single Source of Truth)
 * │
 * ├─► selectedProducts (ProductComparisonTool)
 * │   └─ onRemoveProduct() callback
 * │
 * ├─► wishlist (WishListPanel)
 * │   └─ onRemoveItem() callback
 * │
 * ├─► savedFilters (SavedSearchFilters)
 * │   ├─ onSaveFilter() callback
 * │   ├─ onLoadFilter() callback
 * │   └─ onDeleteFilter() callback
 * │
 * ├─► selectedBusinessIds (AdminBulkActionsPanel)
 * │   ├─ onToggleSelect() callback
 * │   ├─ onApprove() callback
 * │   ├─ onReject() callback
 * │   └─ onDelete() callback
 * │
 * └─► Component State (internal to component)
 *     ├─ BusinessSubmissionFormV2 (formData, auto-save)
 *     ├─ AutoCategorization (isAnalyzing, suggestions)
 *     ├─ DuplicateDetection (isScanning, matches)
 *     ├─ BulkDiscountIndicator (quantity state)
 *     ├─ VirtualTourPlayer (isPlaying, resolution)
 *     ├─ PriceHistoryChart (timeframe, tooltip)
 *     ├─ MortgageCalculator (all inputs, calculations)
 *     └─ NeighborhoodComparison (selected neighborhoods)
 */

// ============================================================================
// CALLBACK PATTERNS - Copy these patterns for your implementation
// ============================================================================

/**
 * PATTERN 1: Toggle State (Wish List)
 */
const toggleWishListItem = (product: MarketplaceItem) => {
  if (wishlist.find((w) => w.id === product.id)) {
    setWishlist(wishlist.filter((w) => w.id !== product.id));
  } else {
    setWishlist([...wishlist, product]);
  }
};

/**
 * PATTERN 2: localStorage Persistence (Saved Filters)
 */
const saveFilterToLocalStorage = (filters: SavedSearchFilter[]) => {
  localStorage.setItem('savedSearchFilters', JSON.stringify(filters));
};

const loadFiltersFromLocalStorage = () => {
  const saved = localStorage.getItem('savedSearchFilters');
  return saved ? JSON.parse(saved) : [];
};

/**
 * PATTERN 3: Multi-Select (Admin Bulk Actions)
 */
const toggleMultiSelect = (id: string, selectedIds: Set<string>) => {
  const newSet = new Set(selectedIds);
  if (newSet.has(id)) {
    newSet.delete(id);
  } else {
    newSet.add(id);
  }
  return newSet;
};

/**
 * PATTERN 4: Async Operations (AutoCategorization, DuplicateDetection)
 */
const performAsyncAnalysis = async (callback: () => Promise<void>) => {
  try {
    await callback();
  } catch (error) {
    console.error('Analysis error:', error);
  }
};

/**
 * PATTERN 5: Real-time Calculations (MortgageCalculator, BulkDiscounts)
 */
const calculateWithDependencies = (inputs: Record<string, any>) => {
  // Recalculate whenever inputs change
  return applyFormula(inputs);
};

// ============================================================================
// END OF DEMO FILE
// ============================================================================

export default function IntegrationDemoNotebook() {
  return (
    <div className="text-white p-4">
      <h1>Component Integration Demo</h1>
      <p>This file contains copy-paste examples for all 13 components.</p>
      <p>See code comments above for specific integration patterns.</p>
    </div>
  );
}
