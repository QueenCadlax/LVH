# 🚗 Premium Transport Page — QUICK REFERENCE

## 📍 Live Route
```typescript
navigate('transport') // Lazy-loaded component
```

## 🎨 Visual Layout

```
┌──────────────────────────────────────────────────────────────┐
│ HEADER: "Premium Transport" — From R0–R50,000               │
└──────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ┌──────────────┐  ┌──────────────────────────────────────┐   │
│  │   FILTERS    │  │        TRANSPORT CARDS (2-3 cols)    │   │
│  │   (360px)    │  │                                      │   │
│  │ ═════════════│  │  ┌─────────┐  ┌─────────┐  ┌──────┐│   │
│  │ Service Type │  │  │ IMAGE   │  │ IMAGE   │  │IMAGE ││   │
│  │ [Chips]      │  │  │ BADGE   │  │ BADGE   │  │BADGE ││   │
│  │              │  │  │ Name    │  │ Name    │  │Name  ││   │
│  │ Luxury Level │  │  │ ⭐4.9   │  │ ⭐4.8   │  │⭐4.7││   │
│  │ [Chips]      │  │  │ Type|✓  │  │ Type|✓  │  │Type ││   │
│  │              │  │  │ 📍 Area │  │ 📍 Area │  │📍 A ││   │
│  │ Area/Route   │  │  │ R350    │  │ R500    │  │R200 ││   │
│  │ [Dropdown]   │  │  │ [View]  │  │ [View]  │  │[V]  ││   │
│  │              │  │  │[Contact]│  │[Contact]│  │[C]  ││   │
│  │ Price Range  │  │  └─────────┘  └─────────┘  └──────┘│   │
│  │ [Presets]    │  │                                      │   │
│  │              │  │  ┌─────────┐  ┌─────────┐  ┌──────┐│   │
│  │ Advanced Fx  │  │  │ IMAGE   │  │ IMAGE   │  │IMAGE ││   │
│  │ [Expand ▼]   │  │  │ BADGE   │  │ BADGE   │  │BADGE ││   │
│  │              │  │  │ Name    │  │ Name    │  │Name  ││   │
│  │ [Clear All]  │  │  │ ⭐5.0   │  │ ⭐4.6   │  │⭐4.9││   │
│  │ 45 results   │  │  │ Type|✓  │  │ Type|✓  │  │Type ││   │
│  │              │  │  └─────────┘  └─────────┘  └──────┘│   │
│  └──────────────┘  │                                      │   │
│                    └──────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 🎯 Filter Panel (Left)

### Service Type Chips
```
[ Airport Transfers ] [ Chauffeur ] [ Shuttle ] [ Bus ]
[ Helicopter ]        [ Freight ]   [ Delivery ] [ Tour ]

Active: Gold bg + shadow glow
Inactive: Dark gray
```

### Luxury Level Chips
```
[ Elite ] [ Platinum ] [ Featured ] [ New Listing ]

Same styling as Service Type
```

### Area / Route Dropdown
```
Default: "All Areas"
Options: Mbombela, White River, Hazyview, Nelspruit, Sabie, etc.
Appearance: Collapsible, searchable
```

### Price Range Presets
```
[ Under R500 ]   [ R500–1000 ]   [ R1000–2000 ]   [ POA ]

Slider range: R0 — R50,000
Active preset: Gold highlight
```

### Advanced Features (Collapsible)
```
▼ Advanced Features
  ☑ Air Conditioning
  ☐ WiFi
  ☐ Child Seat
  ☐ Pet Friendly
  ☐ 24-Hour Service
  ☐ Luxury Amenities

Checkboxes (not chips)
```

### Filter Actions
```
[Clear All] ← muted text
────────────
45 transport services available
```

## 🎴 Card Grid (Right)

### Card Dimensions
- Desktop: 3 columns (gap: 48–64px)
- Tablet: 2 columns
- Mobile: 1 column
- Responsive, no hard breakpoints

### Card Content (Top to Bottom)
```
┌──────────────────────────────┐
│ IMAGE (h-48 = 192px)         │ ← hover: scale 1.05
│ [ELITE BADGE] top-left       │
├──────────────────────────────┤
│ Transport Name (semi-bold)   │
│ ⭐ 4.9 (128) | Type         │ ← gray subtext
│ 📍 Mbombela                  │
│ From R350                    │ ← gold/semibold
│                              │
│ [View Details] [Contact]    │ ← full width buttons
│  gold hover    white hover   │
└──────────────────────────────┘
```

### Badge Colors
```
PLATINUM  → Gold gradient (#C9A24D)
ELITE     → Amber/Gold (#D4A574)
FEATURED  → Light gold (#E8C547)
NEW       → Gray (subtle)
```

## 🎨 Color Palette

| Element | Color | Hex |
|---------|-------|-----|
| Page Background | Black | #000000 |
| Filter Panel | Charcoal | #0E0E11 |
| Card Background | White | #FFFFFF |
| Gold Accent | Mustard | #C9A24D |
| Gold Hover | Light Gold | #E0C36A |
| Text Primary | Dark Gray | #0B0B0D |
| Text Muted | Light Gray | #7A7A80 |
| Border Subtle | White/10 | rgba(255,255,255,0.1) |

## 🔄 Filter Behavior

### Service Type Filtering
- Multiple selection allowed
- Fuzzy matches against `subcategory` field
- Example: "Airport Transfers" → matches any subcat with "airport"

### Luxury Level Filtering
- Multiple selection allowed
- Filters by `tier` (Elite/Platinum) or `isFeatured` flag

### Area Filtering
- Single selection only
- Exact match against `location` field
- Default: "All Areas"

### Price Range Filtering
- Range-based (min/max)
- Extracts numeric value from price string
- Active preset highlights in gold

### Advanced Features Filtering
- Multiple selection (checkboxes)
- AND logic: all selected features must match
- Tag-based matching against `tags` array

### Clear All Button
- Resets all filters to default state
- Service Type: []
- Luxury Level: []
- Area: "All Areas"
- Price: R0–R50,000
- Features: []

## ⚡ Performance

| Optimization | Applied |
|--------------|---------|
| React.memo on cards | ✅ Yes |
| useCallback on handlers | ✅ Yes |
| useMemo on filtered data | ✅ Yes |
| Lazy-loading (Suspense) | ✅ Yes |
| Memoized transport data | ✅ Yes |

## 🚀 Data Sources

**100+ Transport Services from:**
- Freight & Haulage (15+)
- Logistics & Warehousing (12+)
- Courier & Delivery (10+)
- Private Drivers (8+)
- Airport Transfers (15+)
- Shuttle & Minibus (10+)
- Tour & Sightseeing (12+)
- EV Charging (5+)
- Helicopter Charters (8+)

## 📱 Responsive Breakpoints

| Breakpoint | Layout |
|-----------|--------|
| Mobile (< 768px) | Filters stack above cards; 1 column grid |
| Tablet (768–1024px) | Filters left; 2 column grid |
| Desktop (> 1024px) | Filters left; 2–3 column grid |

## 🎯 Success Criteria

✅ Filters always visible (sticky)
✅ Cards satisfying spacing (48–64px gap)
✅ Premium feel in 3 seconds
✅ Gold-black accents restrained
✅ No blank/flashing load
✅ Responsive on all devices
✅ Instant filtering (no lag)
✅ White cards on black bg (contrast)

---

**Component:** `TransportPagePremium.tsx` (320 lines)
**Import Path:** `./components/TransportPagePremium`
**Route:** `navigate('transport')`
**Status:** ✅ Ready for production
