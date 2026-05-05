# Add Listing Page — Visual Design Reference

## 🎨 Color Palette

```
PRIMARY COLORS:
├─ Gold         #D4AF37 (gold-500)     [Accent, CTA, highlights]
├─ Black        #000000               [Background]
└─ White        #FFFFFF (varied %)    [Text, borders]

SECONDARY:
├─ Purple       #9333EA (purple)      [Platinum tier]
├─ Gray-400     (text secondary)
└─ Gray-300     (text tertiary)

OPACITY VARIATIONS:
├─ white/10     (subtle borders)
├─ white/5      (containers)
├─ white/2      (faint backgrounds)
├─ white/20     (input fields)
└─ white/40     (hover states)
```

---

## 📐 Typography Scale

```
HERO
├─ Size: text-5xl (40px) mobile, text-6xl (48px) desktop
├─ Weight: font-light (300)
├─ Letter-spacing: -0.015em
├─ Line-height: leading-none
└─ Family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif

SECTION HEADINGS
├─ Size: text-4xl (32px) mobile, text-5xl (40px) desktop
├─ Weight: font-light (300)
├─ Letter-spacing: -0.015em
└─ Family: Same as above

SUBHEADINGS
├─ Size: text-lg (18px)
├─ Weight: font-light (300)
└─ Family: Same as above

BODY TEXT
├─ Size: text-base (16px) to text-sm (14px)
├─ Weight: font-light (300)
└─ Family: Same as above

BUTTONS
├─ Size: text-base (16px)
├─ Weight: font-semibold (600)
└─ Family: Same as above

LABELS
├─ Size: text-xs (12px), uppercase
├─ Weight: font-semibold (600)
├─ Letter-spacing: tracking-widest
└─ Family: Same as above
```

---

## 🎯 Spacing System

```
PADDING (px):
├─ p-3   = 12px (minimal)
├─ p-4   = 16px (small)
├─ p-6   = 24px (medium)
├─ p-8   = 32px (large)
├─ p-12  = 48px (extra-large)
└─ p-20  = 80px (section height)

GAPS (grid/flex):
├─ gap-2  = 8px (tight)
├─ gap-3  = 12px (small)
├─ gap-4  = 16px (medium)
├─ gap-6  = 24px (large)
└─ gap-8  = 32px (extra-large)

MARGINS:
├─ mb-2   = 8px (tight)
├─ mb-3   = 12px (small)
├─ mb-4   = 16px (medium)
├─ mb-6   = 24px (large)
├─ mb-8   = 32px (extra-large)
└─ mb-12  = 48px (section)
```

---

## 🖲️ Button Styles

### Primary Button (Gold)
```
Style:        bg-gold-500 text-black
Padding:      px-8 py-3
Border:       rounded-lg
Font:         font-semibold, text-base
Hover:        hover:bg-gold-400
Focus:        outline-none, transition-all
Example:      "Apply via Email", "Apply Now"
```

### Secondary Button (Outline)
```
Style:        border border-gray-500 text-gray-300
Padding:      px-8 py-3
Border:       rounded-lg
Font:         font-medium, text-base
Hover:        hover:border-white hover:text-white
Example:      "View Packages"
```

### Tertiary Button (Purple)
```
Style:        border border-purple-500/40 text-white
Padding:      px-8 py-3
Border:       rounded-lg
Font:         font-medium, text-base
Hover:        hover:bg-purple-500/10
Example:      "Request Review" (Platinum)
```

---

## 🏗️ Component Dimensions

### Hero Section
```
Max-width:      Full container
Padding:        py-20 (vertical)
Height:         ~400-500px (desktop)
Content:        Centered, max-w-2xl for text
```

### Package Cards
```
Grid:           grid-cols-1 md:grid-cols-3
Gap:            gap-6
Card width:     ~340px (each column)
Card padding:   p-8
Border:         border border-white/10
Border radius:  rounded-xl
Height:         Auto (content-based)
```

### Process Steps (How It Works)
```
Grid:           grid-cols-1 md:grid-cols-4
Gap:            gap-8
Step width:     ~200px (each column)
Padding:        Default (no extra padding)
Border:         None
Content:        Centered text
```

### Application Box
```
Max-width:      max-w-2xl (centered)
Padding:        p-12
Border:         border border-white/10
Border radius:  rounded-xl
Background:     bg-white/2
Content:        2-column layout on desktop
Separator:      border-t border-white/10 (mid-box)
```

---

## 📏 Layout Grid

```
DESKTOP (lg: 1024px+):
├─ Container:       max-w-7xl, mx-auto, px-4
├─ Hero:            Full width, centered
├─ Package cards:   3-column grid, gap-6
├─ Process:         4-column grid, gap-8
└─ Sections:        Full width with padding

TABLET (md: 768px):
├─ Container:       max-w-4xl, mx-auto, px-4
├─ Hero:            Full width, centered
├─ Package cards:   2-column grid, gap-6
├─ Process:         2-column grid, gap-6
└─ Lists:           2-column layout

MOBILE (< 768px):
├─ Container:       Full width, px-4
├─ Hero:            Single column, centered
├─ Package cards:   Single column, stacked
├─ Process:         Single column, stacked
└─ Lists:           Single column, stacked
```

---

## 🎨 Visual Hierarchy

```
LEVEL 1 (Highest Emphasis)
├─ Hero heading (text-5xl/6xl, gold accents)
├─ Call-to-action buttons (gold, prominent)
└─ Package cards (golden border option)

LEVEL 2 (Secondary)
├─ Section headings (text-4xl/5xl, white)
├─ Package prices (text-4xl, white)
├─ Step numbers (text-4xl, gold)
└─ Tier labels (text-2xl-3xl)

LEVEL 3 (Tertiary)
├─ Subheadings (text-lg, white)
├─ Description text (text-base, gray-300)
├─ Benefit items (text-sm, gray-300)
└─ Labels (text-xs, gray-400)

LEVEL 4 (Lowest)
├─ Helper text (text-xs, gray-500)
├─ Timestamps (24–72 hours)
└─ Fine print details
```

---

## ✨ Interactive States

### Button States
```
DEFAULT:        Full opacity, smooth edges
HOVER:          Slight color change, scale effect
ACTIVE/PRESSED: Color shift (darker), no scale
DISABLED:       Reduced opacity (50%), no cursor change
FOCUS:          Outline on keyboard navigation
TRANSITION:     All 200ms ease

Example:
bg-gold-500 
hover:bg-gold-400 
transition-all 
duration-200
```

### Input Fields
```
DEFAULT:        bg-white/5 border-white/10
FOCUS:          border-gold-500 bg-white/10
PLACEHOLDER:    text-gray-600
FILLED:         text-white

transition-all enabled
outline-none for custom style
```

### Card Hover
```
DEFAULT:        border-white/10, bg-white/2
HOVER:          border-gold-500/30, slight scale
NO SCALE:       Keep text readable
TRANSITION:     200ms ease

Example:
hover:border-gold-500/30
transition-colors
duration-300
```

---

## 📱 Responsive Breakpoints

```
MOBILE:         0px - 640px
├─ Hero:        text-5xl
├─ Headings:    text-4xl
├─ Cards:       1 column
└─ Process:     1 column, vertical stack

TABLET:         641px - 1024px
├─ Hero:        text-5xl md:text-6xl
├─ Headings:    text-4xl md:text-5xl
├─ Cards:       2 columns
└─ Process:     2-4 columns

DESKTOP:        1025px+
├─ Hero:        text-6xl
├─ Headings:    text-5xl
├─ Cards:       3 columns (optimal)
└─ Process:     4 columns (optimal)
```

---

## 🎯 Content Areas

### Hero Area
```
Height:         ~400-500px (with padding)
Background:     Pure black (#000000)
Border:         None
Content width:  max-w-2xl (text), full (background)
Text align:     Center
```

### Feature Pillars
```
Grid:           grid-cols-1 md:grid-cols-3
Gap:            gap-12
Padding:        py-20
Border:         border-t border-white/10
Icon:           text-gold-400, size-[icon]
```

### Package Section
```
Grid:           grid-cols-1 md:grid-cols-3
Gap:            gap-6
Card width:     Full width (responsive)
Border:         border border-white/10, rounded-xl
Special:        Gold card has enhanced border
```

### Process Section
```
Grid:           grid-cols-1 md:grid-cols-4
Gap:            gap-8
Padding:        py-20
Number size:    text-4xl
Title size:     text-lg
Description:    text-sm, gray-400
```

### Application Box
```
Max-width:      max-w-2xl
Padding:        p-12
Border:         border border-white/10, rounded-xl
Background:     bg-white/2
Internal:       Divided by border-t border-white/10
Email style:    text-lg, font-light, prominent
```

---

## 🔗 Navigation Elements

### Email Links
```
Color:          Current button color
Decoration:     None (href="mailto:")
Hover:          Inherit button hover state
Cursor:         pointer
```

### Internal Links (Scroll to)
```
Anchor:         href="#packages-preview"
Scroll:         Smooth scroll behavior
Cursor:         pointer
Active:         No visual change (no href tracking)
```

---

## 🎉 Summary

**This design system ensures:**
✅ Consistent typography (Apple/Airbnb standard)  
✅ Elegant sizing (no oversizing)  
✅ Professional appearance (premium aesthetic)  
✅ Mobile-responsive (all breakpoints)  
✅ Accessible (WCAG AA color contrast)  
✅ Maintainable (clear spacing system)  

**The Add Listing page is now a reference for premium B2B design in LowveldHub.**
