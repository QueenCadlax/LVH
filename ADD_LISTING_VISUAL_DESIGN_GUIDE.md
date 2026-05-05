# 📱 Add Listing Visual Design Reference

## Typography Scale Overview

```
HERO SECTION
├─ Main Heading (4xl-5xl)
│  └─ "Join Mpumalanga's Trusted Business Network"
│  └─ Font: Light (300) | Tracking: -0.02em
│  └─ Size: 36px (mobile) → 48px (desktop)
│
├─ Subheading (text-base-lg)
│  └─ "List your business on LowveldHub..."
│  └─ Font: Light (300) | Color: gray-400
│  └─ Size: 14px (mobile) → 18px (desktop)
│
└─ CTAs (text-base)
   └─ Gold and gray buttons with small text

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

THREE PILLARS
├─ Checkmark (✓)
│  └─ Color: gold-500 | Size: 18px
│
├─ Pillar Title (text-lg)
│  └─ "Verified Listings Only"
│  └─ Font: Light (400) | Color: white
│
└─ Pillar Description (text-xs)
   └─ Font: Light (300) | Color: gray-400
   └─ Max width: clean columns

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PACKAGE CARDS (3-column grid)
├─ Package Label (text-xs, uppercase)
│  └─ "Essential" | "Professional" | "Platinum"
│
├─ Package Title (text-xl)
│  └─ Font: Light (400)
│  └─ Essential: white
│  └─ Professional: white
│  └─ Platinum: purple-300
│
├─ Price (text-3xl)
│  └─ "R799" | "R1,299" | "R1,999"
│  └─ Font: Light (300)
│
├─ Duration (text-xs)
│  └─ "6 Months" | "12 Months" | "12 Months"
│
├─ Features List (text-xs with Check icons, size-14)
│  ├─ ✓ Business Name
│  ├─ ✓ Address
│  ├─ ✓ Contact
│  └─ ✓ Images
│
└─ CTA Button (text-xs, py-2.5)
   └─ Essential: border border-white/20
   └─ Professional: bg-gold-500 (POPULAR badge)
   └─ Platinum: border border-purple-500/40

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HOW IT WORKS (4 steps)
├─ Step Number (text-3xl, gold-400)
│  └─ "1" "2" "3" "4"
│
├─ Step Title (text-base)
│  └─ "Apply" | "Review" | "Approval" | "Go Live"
│  └─ Font: Light (400)
│
└─ Step Description (text-xs)
   └─ "Send us your business details via email"
   └─ Font: Light (300) | Color: gray-400

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

THE INVITATION SECTION
├─ Main Title (text-3xl-4xl)
│  └─ "The Invitation"
│
├─ Subtitle (text-base)
│  └─ "Apply to Join Our Curated Network"
│
├─ Body Text (text-sm)
│  └─ "We invite exceptional businesses..."
│
└─ Process Steps (4-column grid, text-2xl numbers)
   ├─ 01 You Apply
   ├─ 02 We Review
   ├─ 03 We Connect
   └─ 04 You Thrive

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WHY PARTNER (2x2 grid)
├─ Checkmark (✓) text-base, gold-500
│
└─ Benefit Text (text-xs)
   ├─ "Verified customer base seeking..."
   ├─ "AI-powered recommendations..."
   ├─ "No commission on direct sales"
   └─ "Exclusive community of 50+..."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

READY SECTION
├─ Main CTA
│  └─ "Apply Now →" (gold button, text-sm)
│
└─ Email Box
   ├─ Email Address (text-base)
   │  └─ "info@lowveldhub.co.za"
   │
   ├─ Label (text-xs, uppercase)
   │  └─ "In Your Email, Please Include"
   │
   ├─ Bulleted List (text-xs)
   │  ├─ • Business Name & Website
   │  ├─ • Location (Area in Mpumalanga)
   │  ├─ • Category / Industry
   │  ├─ • Contact Person & Details
   │  ├─ • 2–5 High-Quality Images
   │  └─ • Brief Description (50–100 words)
   │
   └─ Footer Note (text-xs)
      └─ "Our team reviews applications carefully..."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FINAL MESSAGE
└─ text-xs, gray-400
   └─ "LowveldHub is a curated ecosystem..."
```

---

## Color Palette

### Primary Accent
- **Gold:** `gold-500` (#FCD34D or similar)
- **Gold Hover:** `gold-400` (lighter)

### Tier Colors
- **Platinum:** `purple-300`, `purple-400`, `purple-500`
- **Elite:** (uses gold)
- **Trial/Premium:** (uses white/gray)

### Backgrounds
- **Main:** `#000000` (black)
- **Cards:** `white/2` or `white/3` (transparent white)
- **Accents:** `gold-500/5`, `purple-500/5` (subtle tints)

### Text Colors
- **Headings:** `white` (text-white)
- **Body:** `gray-300` (lighter gray)
- **Muted:** `gray-400` (medium gray)
- **Borders:** `white/10`, `white/20` (transparent white)

---

## Spacing Reference

| Element | Desktop | Mobile |
|---------|---------|--------|
| Section Padding | py-16 | py-16 |
| Gap Between Items | gap-8 to gap-12 | gap-6 |
| Card Padding | p-8 | p-6 |
| Button Padding | py-2.5 px-6 | py-2.5 px-4 |
| Hero Margin | space-6 | space-4 |
| List Spacing | space-3 | space-2 |

---

## Responsive Grid Layouts

### Package Cards
```
Desktop:  [Card 1] [Card 2] [Card 3]  (3 columns)
Tablet:   [Card 1] [Card 2]           (2 columns)
Mobile:   [Card 1]                    (1 column)
Gap:      gap-6
```

### Why Partner Grid
```
Desktop:  [Benefit 1] [Benefit 2]      (2 columns)
          [Benefit 3] [Benefit 4]
Tablet:   [Benefit 1] [Benefit 2]      (2 columns)
          [Benefit 3] [Benefit 4]
Mobile:   [Benefit 1]                  (1 column)
          [Benefit 2]
          [Benefit 3]
          [Benefit 4]
Gap:      gap-6
```

### Process Steps (How It Works)
```
Desktop:  [Step 1] [Step 2] [Step 3] [Step 4]  (4 columns)
Tablet:   [Step 1] [Step 2]                    (2 columns)
          [Step 3] [Step 4]
Mobile:   [Step 1]                            (1 column)
          [Step 2]
          [Step 3]
          [Step 4]
Gap:      gap-8
```

---

## Font Stack

All text uses:
```css
-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
```

This provides:
- **macOS/iOS:** San Francisco (Apple's system font)
- **Windows:** Segoe UI (Windows' system font)
- **Linux:** Fallback sans-serif

---

## Button Styles

### Gold CTA (Primary)
```
Background: gold-500
Hover: gold-400
Text: black, font-semibold
Padding: px-6 py-2.5
Border Radius: rounded-lg
Font Size: text-sm
```

### Border Button (Secondary)
```
Background: transparent
Border: border border-white/20
Hover: bg-white/5
Text: white, font-medium
Padding: px-6 py-2.5
Border Radius: rounded-lg
Font Size: text-sm
```

### Purple Button (Platinum)
```
Background: transparent
Border: border border-purple-500/40
Hover: bg-purple-500/10
Text: white, font-medium
Padding: px-6 py-2.5
Border Radius: rounded-lg
Font Size: text-sm
```

---

## Border & Divider Reference

- **Section Borders:** `border-t border-white/10`
- **Card Borders (Standard):** `border border-white/10`
- **Card Borders (Featured):** `border border-gold-500/40`
- **Card Borders (Premium):** `border border-purple-500/30`
- **Dividers Inside:** `border-t border-white/10` (within boxes)

---

## Animation & Transition

All interactive elements use:
```css
transition-colors duration-200
/* or */
transition-all duration-300
```

Hover states:
- Buttons: `hover:bg-gold-400`, `hover:border-white`, etc.
- Cards: `hover:border-gold-500/30`
- Text links: `hover:text-gold-400`

---

## Mobile Optimization

### Key Touch Targets
- Buttons: minimum `py-2.5` (10px vertical)
- Links: minimum 44x44px interactive area
- Text: minimum 12px (text-xs)

### Mobile Typography
- Hero: `text-4xl` instead of `text-5xl`
- Section titles: `text-3xl` instead of `text-4xl`
- Features: `text-xs` (readable on mobile)
- Button text: `text-sm` or `text-xs`

### Mobile Spacing
- Reduced horizontal padding on containers
- Single-column layouts for cards
- Tighter spacing in lists (`space-2`, `space-3`)
- Hero section: `space-4` instead of `space-6`

---

## Accessibility

✅ **Color Contrast:**
- White text on black: AAA compliant
- Gold on black: AA compliant
- Gray on black: A compliant (for supplementary text)

✅ **Font Sizes:**
- Minimum 12px (text-xs) for supplementary text
- 14px (text-sm) for body content
- 16px+ for headings

✅ **Interactive Elements:**
- All buttons have clear hover states
- Focus states (browser default for now)
- Semantic HTML structure

---

**Design System:** Premium Curated | **Brand:** LowveldHub | **Year:** 2026

