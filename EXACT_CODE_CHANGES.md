# 📝 EXACT CODE CHANGES - LINE BY LINE

## File 1: App.tsx

### Change 1: Add Import (Line 43)
```typescript
// ADDED:
import BusinessSubmissionForm from './components/BusinessSubmissionForm';
```

Location: After `import PremiumAddBusinessView from './components/PremiumAddBusinessView';`

---

### Change 2: Update Case Statement (Line 3635)

**BEFORE:**
```typescript
case 'list-your-business': return <PremiumAddBusinessView navigate={handleNavigate} onAddBusiness={handleAddBusiness} handleOpenAuth={handleOpenAuth} />;
```

**AFTER:**
```typescript
case 'list-your-business': return <BusinessSubmissionForm onClose={() => handleNavigate('home')} onNavigate={handleNavigate} />;
```

---

## File 2: components/BusinessSubmissionForm.tsx

### Change 1: Add Restaurant State Variables (Lines 46-47)

**ADDED AFTER:**
```typescript
const [amenities, setAmenities] = useState<string[]>([]);
```

**ADD THESE LINES:**
```typescript
const [restaurantReservations, setRestaurantReservations] = useState(false);
const [restaurantDietaryOptions, setRestaurantDietaryOptions] = useState<string[]>([]);
```

---

### Change 2: Update Form Payload in handleSubmit (Lines 152-153)

**BEFORE (line 150):**
```typescript
selected_package: selectedPackage,
package_amount: packageAmount
```

**AFTER (lines 150-153):**
```typescript
selected_package: selectedPackage,
package_amount: packageAmount,
restaurant_reservations: category === 'Restaurant' ? restaurantReservations : null,
dietary_options: category === 'Restaurant' ? restaurantDietaryOptions : []
```

---

### Change 3: Replace Step 3 Render (Lines 555-641)

**FIND THIS SECTION:**
```javascript
{/* Step 3: Services & Hours */}
{currentStep === 'services' && (
  <div className="space-y-4">
    <h3 className="font-bold text-lg">Services & Operating Hours</h3>
    // ... rest of old Step 3
  </div>
)}
```

**REPLACE WITH THIS ENTIRE SECTION:**

```jsx
{/* Step 3: Services & Hours */}
{currentStep === 'services' && (
  <div className="space-y-6">
    <h3 className="font-bold text-lg">Services & Operating Hours</h3>

    <div>
      <label className="block text-sm font-medium mb-2">Services / Specialties</label>
      <textarea
        value={services}
        onChange={(e) => setServices(e.target.value)}
        rows={3}
        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
        placeholder="List your services, e.g., Hair cutting, Styling, Color treatment..."
      />
    </div>

    <div>
      <label className="block text-sm font-medium mb-3">Amenities / Facilities</label>
      <div className="grid grid-cols-2 gap-3">
        {AMENITIES_OPTIONS.map(amenity => (
          <label key={amenity} className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={amenities.includes(amenity)}
              onChange={() => toggleAmenity(amenity)}
              className="w-4 h-4 rounded border-gray-300"
            />
            <span className="ml-2 text-sm">{amenity}</span>
          </label>
        ))}
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium mb-3">Operating Hours</label>
      <div className="space-y-2">
        {Object.entries(operatingHours).map(([day, hours]) => (
          <div key={day} className="flex items-center gap-3">
            <span className="w-20 text-sm font-medium capitalize">{day}</span>
            {typeof hours === 'object' ? (
              <>
                <input
                  type="time"
                  value={hours.open}
                  onChange={(e) => setOperatingHours({
                    ...operatingHours,
                    [day]: { ...hours, open: e.target.value }
                  })}
                  className="border border-gray-300 rounded p-2 text-sm"
                />
                <span>-</span>
                <input
                  type="time"
                  value={hours.close}
                  onChange={(e) => setOperatingHours({
                    ...operatingHours,
                    [day]: { ...hours, close: e.target.value }
                  })}
                  className="border border-gray-300 rounded p-2 text-sm"
                />
              </>
            ) : (
              <span className="text-gray-500">{hours}</span>
            )}
          </div>
        ))}
      </div>
    </div>

    {/* Restaurant-Specific Fields (VISIBLE WHEN CATEGORY = RESTAURANT) */}
    {category === 'Restaurant' && (
      <div className="border-t-2 border-blue-200 pt-6 mt-6 bg-blue-50 p-4 rounded-lg">
        <h4 className="font-bold text-blue-700 mb-4 flex items-center gap-2">
          🍽️ Restaurant Information
        </h4>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-3">Dietary Options Available</label>
            <div className="grid grid-cols-2 gap-3">
              {['Vegetarian', 'Vegan', 'Gluten-Free', 'Halal', 'Kosher', 'Dairy-Free'].map(option => (
                <label key={option} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={restaurantDietaryOptions.includes(option)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setRestaurantDietaryOptions([...restaurantDietaryOptions, option]);
                      } else {
                        setRestaurantDietaryOptions(restaurantDietaryOptions.filter(o => o !== option));
                      }
                    }}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="ml-2 text-sm">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={restaurantReservations}
                onChange={(e) => setRestaurantReservations(e.target.checked)}
                className="w-5 h-5 rounded border-gray-300"
              />
              <span className="text-sm font-medium">We Accept Table Reservations</span>
            </label>
          </div>
        </div>
      </div>
    )}

    {/* Non-Restaurant Message */}
    {category && category !== 'Restaurant' && (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
        ℹ️ Restaurant-specific fields are hidden because you selected: <strong>{category}</strong>
      </div>
    )}
  </div>
)}
```

---

## Summary of Changes

| File | Location | Type | Change |
|------|----------|------|--------|
| App.tsx | Line 43 | Add | Import BusinessSubmissionForm |
| App.tsx | Line 3635 | Replace | Case statement (old component → new) |
| BusinessSubmissionForm.tsx | Lines 46-47 | Add | Restaurant state variables |
| BusinessSubmissionForm.tsx | Lines 152-153 | Add | Restaurant fields to payload |
| BusinessSubmissionForm.tsx | Lines 555-641 | Replace | Entire Step 3 section (add restaurant logic) |

---

## Files That Changed

✅ **2 files total:**
1. App.tsx
2. components/BusinessSubmissionForm.tsx

**No other files require changes.**

---

## Verification

After making these changes:

1. Vite automatically recompiles (already running on port 3001)
2. Go to http://localhost:3001
3. Click "+ List Business"
4. Verify:
   - ✅ New form displays (not old form)
   - ✅ Step 1 shows social media fields
   - ✅ Step 2 shows logo upload
   - ✅ Step 3 shows restaurant section when category = "Restaurant"
   - ✅ Step 3 hides restaurant section for other categories
   - ✅ Step 4 shows correct pricing

---

**All changes complete and applied! ✅**
