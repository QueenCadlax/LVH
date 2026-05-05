# 🌍 TOURISM REDESIGN — QUICK VISUAL GUIDE

## NEW HERO SECTION

```
┌─────────────────────────────────────────────────────────┐
│                    [BLACK BACKGROUND]                   │
│                                                          │
│         [Small Gold Text] EXPERIENCE MPUMALANGA         │
│                                                          │
│  Discover Curated Destinations                          │
│  (Gold "Curated" text)                                  │
│                                                          │
│  Curated destinations · Verified experiences ·          │
│  From R50 pp                                            │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Search destinations, activities, wildlife, food │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
│  [🐘] [🥾] [🍽️] [🚤] [🎢] [🏞️] [🏛️] [🛍️]           │
│  Elephants Hiking Food Boat Attractions Scenic Heritage  │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## FILTER SYSTEM (Left Sidebar)

```
┌─────────────────────────────────┐
│  REFINE SEARCH                  │
│                                 │
│  Activity Type                  │
│  ☑ Hiking                      │
│  ☐ Sightseeing                 │
│  ☐ Wildlife Encounters         │
│  ☐ Boat & Water                │
│  ☐ Food & Wine                 │
│  ☐ Adventure Activities        │
│                                 │
│  Experience                     │
│  ☐ Nature                       │
│  ☐ Wildlife                     │
│  ☐ Culture & Heritage          │
│  ☐ Adventure                    │
│  ☐ Scenic Views                 │
│                                 │
│  $ Price Per Person             │
│  [─────●────────] Slider       │
│  R0 - R2500                     │
│                                 │
│  [R50+] [R100+] [R250+] ...    │
│                                 │
│  Area                           │
│  ☐ Graskop                     │
│  ☐ Hazyview                    │
│  ☐ Mbombela                    │
│  ☐ Sabie                       │
│  ☐ Barberton                   │
│                                 │
└─────────────────────────────────┘
```

---

## DESTINATION CARD

```
┌──────────────────────────────────────────┐
│  [High-quality hero image 200px]         │
│  [Dark overlay at bottom]                │
│  ┌─────────────┐                         │
│  │ ICONIC      │ (gold if 4.8+)         │
│  └─────────────┘                         │
├──────────────────────────────────────────┤
│                                          │
│  Kruger National Park                    │
│                                          │
│  📍 Mpumalanga                          │
│  🐘 Wildlife Encounters · Safari        │
│                                          │
│  ┌────────────────────────────────────┐ │
│  │ From R602 pp    ⭐ 4.7 (21k)      │ │
│  └────────────────────────────────────┘ │
│                                          │
│  ┌────────────────────────────────────┐ │
│  │  View Details →  [Gold border]    │ │
│  └────────────────────────────────────┘ │
│                                          │
└──────────────────────────────────────────┘
```

---

## DETAIL PAGE LAYOUT

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  [FULL-SCREEN HERO IMAGE WITH DARK OVERLAY]                │
│                                                              │
│  [← Back button (top-left)]                                │
│                                                              │
│  [Content overlay at bottom:]                              │
│  🐘 WILDLIFE ENCOUNTERS                                     │
│  Kruger National Park                                       │
│  📍 Mpumalanga  ⭐ 4.7 (21k)                              │
│                                                              │
└──────────────────────────────────────────────────────────────┘

┌─────────────────────────────┬──────────────────────────────┐
│                             │  [STICKY PRICE CARD]        │
│  About This Experience      │                              │
│  [2-3 sentence description] │  Price Per Person           │
│                             │  R602                        │
│  What You'll Experience     │                              │
│  ✓ Wildlife                 │  [Book Experience] Button   │
│  ✓ Safari                   │  [Add to Itinerary] Button  │
│  ✓ Big 5                    │                              │
│  ✓ Expert Guides            │  [Save] [Share]            │
│  ✓ Nature                   │                              │
│  ✓ Photography              │  Highlights                 │
│                             │  ✓ Curated & Verified     │
│  Practical Information      │  ✓ Local Expertise        │
│  Location: Kruger Area      │  ✓ Best Value             │
│  Duration: Multi-day        │                              │
│  Category: Wildlife         │                              │
│  Rating: 4.7 / 5.0          │                              │
│                             │                              │
└─────────────────────────────┴──────────────────────────────┘
```

---

## GRID VIEW TOGGLE

```
┌────────────────────────────────────────────────┐
│ [🔲 Grid View] [🗺️ Map View]    23 found      │
└────────────────────────────────────────────────┘
```

---

## DESTINATION CARD GRID (RESPONSIVE)

```
Mobile (1 col)          Tablet (2 col)         Desktop (3 col)
┌──────────┐           ┌──────────┐ ┌──────────┐
│ Card 1   │           │ Card 1   │ │ Card 2   │
└──────────┘           └──────────┘ └──────────┘
┌──────────┐           ┌──────────┐ ┌──────────┐
│ Card 2   │           │ Card 3   │ │ Card 4   │
└──────────┘           └──────────┘ └──────────┘
┌──────────┐           ┌──────────┐ ┌──────────┐
│ Card 3   │           │ Card 5   │ │ Card 6   │
└──────────┘           └──────────┘ └──────────┘
```

---

## COLOR SCHEME

| Element | Color | Use |
|---------|-------|-----|
| Background | #000000 | Main page background |
| Text (Primary) | #FFFFFF | Headlines, primary text |
| Text (Secondary) | #CFCFCF | Descriptions, metadata |
| Accent (Gold) | #C9A24D | Buttons, highlights, filters |
| Border (Light) | rgba(255,255,255,0.04) | Card borders, dividers |
| Border (Gold) | rgba(201,162,77,0.3) | Gold dividers, highlights |
| Hover State | rgba(201,162,77,0.1) | Background on hover |

---

## INTERACTION STATES

### Button Hover
```
Before:  [View Details →]
         Border: 1px solid #C9A24D
         Background: transparent

After:   [View Details →]
         Border: 1px solid #C9A24D
         Background: rgba(201,162,77,0.1)
         Transform: translateY(-2px)
```

### Card Hover
```
Before:  Border: 1px solid rgba(255,255,255,0.04)
         Box-shadow: none

After:   Border: 1px solid rgba(201,162,77,0.5)
         Box-shadow: 0 8px 16px rgba(201,162,77,0.1)
         Image: scale(1.05) [smooth transition]
```

---

## FEATURED DESTINATIONS SECTION

```
┌─────────────────────────────────────────────────────┐
│  FEATURED DESTINATIONS                              │
│                                                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │   Card 1    │  │   Card 2    │  │   Card 3    │ │
│  │  Kruger NP  │  │ Elephants   │  │  Blyde Riv  │ │
│  │  R602 pp    │  │  R1,595 pp  │  │  R180 pp    │ │
│  │ ⭐ 4.7     │  │ ⭐ 4.7     │  │ ⭐ 4.7     │ │
│  └─────────────┘  └─────────────┘  └─────────────┘ │
│                                                      │
│  ALL DESTINATIONS (19)                              │
│                                                      │
│  [Grid of 3 columns, scrollable]                    │
│                                                      │
└─────────────────────────────────────────────────────┘
```

---

## MAP VIEW PLACEHOLDER

```
┌──────────────────────────────────────────┐
│                                          │
│              🗺️  MAP VIEW                │
│                                          │
│     (Click pins to view details)         │
│     (23 destinations shown)              │
│                                          │
│  Integration: Google Maps API ready     │
│  Latitude/longitude in all seeds        │
│                                          │
└──────────────────────────────────────────┘
```

---

## RESPONSIVE BREAKPOINTS

```
Mobile:    0px - 767px    [1 column, modals for filters]
Tablet:    768px - 1024px [2 columns, sidebar shrinks]
Desktop:   1024px+        [3 columns, full sidebar]
```

---

## PRICE RANGE INDICATOR

```
Destinations by Price:

Free (R0):           Craft Market, Belfast Scenic Byway
Budget (R50-100):    God's Window, Long Tom, Botanical Garden, Sabie Falls
Mid-Range (R120-380): Caves, Hiking, Wine Tasting, Boat Cruises
Luxury (R450-1,595): Canopy Tour, Elephant Whispers, Kruger NP
```

---

## CATEGORY EMOJIS & LABELS

```
🐘 Elephants                    🏞 Sightseeing
🥾 Hiking                       🍽 Food & Wine
🚤 Boat Cruises                 🏛 Heritage
🎢 Attractions                  🛍 Shopping
```

---

## QUICK-SELECT PRICE BUTTONS

```
[R50+] [R100+] [R250+] [R500+] [R1,000+]

When clicked:
- Slider updates to show range
- Cards filter instantly (no page reload)
- Count updates: "19 destinations found" → "6 destinations found"
```

---

## KEY METRICS DISPLAYED

- **On Card:** Rating (e.g., 4.7), Review count (e.g., 21k), Price (e.g., From R602)
- **On Detail:** Full rating (4.7 / 5.0), Review breakdown, all tags
- **In Search:** "19 destinations found" (updates dynamically)

---

## CALL-TO-ACTION BUTTONS

| Button | Location | Color | Action |
|--------|----------|-------|--------|
| Book Experience | Detail sidebar | Gold #C9A24D | Opens booking modal |
| Add to Itinerary | Detail sidebar | Gold outline | Saves to trip planner |
| View Details → | Card | Gold outline | Opens detail page |
| Save | Detail | Gray | Adds to favorites |
| Share | Detail | Gray | Opens share menu |

---

**This design instantly positions LowveldHub as a premium travel discovery engine, not a directory.**
