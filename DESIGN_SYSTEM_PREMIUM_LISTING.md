# 🎨 LowveldHub Premium Add Listing – Design System

## Visual Style Guide

**Component:** `PremiumAddBusinessView.tsx`  
**Design Inspiration:** Apple.com + Airbnb.com + Luxury Brands  
**Color Mode:** Dark (Black background, white & gold accents)  
**Target Audience:** Discerning business owners seeking premium placement

---

## Typography Scale

### Font Family (All Elements)
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
/* 
  macOS → San Francisco
  iOS → San Francisco  
  Windows → Segoe UI
  Fallback → system sans-serif
*/
```

### Typographic Hierarchy

#### Display Headings (Hero Sections)
```
SIZE:          7xl (56px) → 8xl (64px)
WEIGHT:        300 (light)
LETTER-SPACE:  -0.02em (optical correction)
LINE-HEIGHT:   1 (tight)
EXAMPLE:       "Join Mpumalanga's Trusted Business Network"
```

#### Section Headings
```
SIZE:          5xl (48px) → 6xl (60px)
WEIGHT:        300 (light)
LETTER-SPACE:  -0.02em
LINE-HEIGHT:   tight
EXAMPLE:       "Listing Packages"
```

#### Subsection Headings
```
SIZE:          3xl (30px)
WEIGHT:        300 (light)
LETTER-SPACE:  normal
LINE-HEIGHT:   normal
EXAMPLE:       "Essential" (package title)
```

#### Body Text (Large)
```
SIZE:          lg (18px) → xl (20px)
WEIGHT:        400 (normal)
LINE-HEIGHT:   relaxed (1.625)
EXAMPLE:       Hero subtitle
```

#### Body Text (Standard)
```
SIZE:          base (16px)
WEIGHT:        400 (normal)
LINE-HEIGHT:   relaxed (1.625)
EXAMPLE:       Value prop descriptions
```

#### Labels & UI Text
```
SIZE:          xs (12px) → sm (14px)
WEIGHT:        600 (semibold)
LETTER-SPACE:  widest (0.1em or 2px)
EXAMPLE:       "PROFESSIONAL" (uppercase labels)
```

#### Button Text
```
SIZE:          base (16px)
WEIGHT:        600 (semibold)
EXAMPLE:       "Apply via Email"
```

---

## Color Palette

### Primary Colors

| Color | Hex | Usage | Opacity |
|-------|-----|-------|---------|
| **Black** | #000000 | Background | 100% |
| **White** | #ffffff | Primary text, highlights | 100% |
| **Gray-300** | #d1d5db | Secondary text | 100% |
| **Gray-400** | #9ca3af | Tertiary text, disabled | 100% |
| **Gray-500** | #6b7280 | Borders (on hover) | 100% |

### Accent Colors

| Color | Hex | Usage | Opacity |
|-------|-----|-------|---------|
| **Gold-400** | #d4af37 | Highlights, checkmarks, numbers | 100% |
| **Gold-500** | #c7a961 | Primary CTAs, buttons | 100% |
| **Purple-300** | #c4b5fd | Premium tier (Platinum) text | 100% |
| **Purple-400** | #a78bfa | Premium tier labels | 100% |
| **Purple-500** | #a855f7 | Premium tier accents | 100% |

### Semantic Colors

| Intent | Color | Hex |
|--------|-------|-----|
| **Primary Action** | Gold-500 | #c7a961 |
| **Success** | Green-500 | #10b981 |
| **Error** | Red-500 | #ef4444 |
| **Warning** | Amber-500 | #f59e0b |
| **Info** | Blue-500 | #3b82f6 |

### Background Tints

```css
bg-white/2        /* 2% white opacity (very subtle) */
bg-white/3        /* 3% white opacity */
bg-white/5        /* 5% white opacity */
bg-gold-500/5     /* 5% gold opacity (warm tint) */
bg-purple-500/5   /* 5% purple opacity (premium tint) */
```

### Border Colors

```css
border-white/10   /* 10% white opacity (standard) */
border-white/20   /* 20% white opacity (hover) */
border-gold-500/40  /* 40% gold opacity (highlighted) */
border-purple-500/30 /* 30% purple opacity (premium) */
```

---

## Spacing System

### Vertical Rhythm (Padding/Margin)
```
0    = 0
px   = 1px (1px only)
0.5  = 2px
1    = 4px
2    = 8px
3    = 12px
4    = 16px
6    = 24px
8    = 32px
12   = 48px
16   = 64px
20   = 80px
24   = 96px
```

### Tailwind Shorthand
```
p-8       = padding: 32px (all sides)
px-8      = padding: 32px (left/right)
py-20     = padding: 80px (top/bottom)
gap-12    = grid gap: 48px
space-y-4 = margin-bottom: 16px on all children
```

### Section Spacing
```
py-20          = 80px vertical padding (major sections)
gap-12         = 48px between grid items
space-y-8      = 32px between vertical stack items
space-y-4      = 16px between tighter stacks
space-y-2      = 8px between list items
```

---

## Component Specifications

### Primary Button (CTA)
```
Background:    Gold-500
Text Color:    Black
Text Weight:   600 (semibold)
Padding:       px-8 py-3 (32px horizontal, 12px vertical)
Border Radius: rounded-full (9999px)
Hover State:   bg-gold-400 (transition: 200ms)
Font Family:   System font
Font Size:     base (16px)
```

**HTML Example:**
```tsx
<a 
  href="mailto:info@lowveldhub.co.za"
  className="px-8 py-3 bg-gold-500 text-black font-semibold rounded-full 
            hover:bg-gold-400 transition-all duration-200 text-base"
  style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}
>
  Apply via Email
</a>
```

### Secondary Button (Link)
```
Border:        Gray-500 (1px)
Text Color:    Gray-300
Hover Border:  White
Hover Text:    White
Padding:       px-8 py-3
Border Radius: rounded-full
Transition:    200ms all
```

**HTML Example:**
```tsx
<a 
  href="#packages-preview"
  className="px-8 py-3 border border-gray-500 text-gray-300 font-semibold 
            rounded-full hover:border-white hover:text-white transition-all duration-200"
>
  View Packages
</a>
```

### Package Card
```
Border:        White/10 (1px)
Background:    White/2 (subtle tint)
Border Radius: rounded-2xl (16px)
Padding:       p-8 (32px)
Hover Border:  Gold-500/30
Transition:    200ms
```

**Special Variants:**
- **Essential**: Neutral (white/10 border)
- **Professional**: Gold accent (gold-500/40 border, gold-500/5 bg, POPULAR badge)
- **Platinum**: Purple accent (purple-500/30 border, purple-500/5 bg)

---

## Box Shadow & Depth

### Subtle Elevation
```css
/* For cards that need slight depth */
box-shadow: none  /* Keep flat design */

/* Alternative (if depth needed) */
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1)
```

### Focus States (Accessibility)
```css
/* For interactive elements */
outline: 2px solid gold-500
outline-offset: 2px
```

---

## Border Radius Scale

| Value | Size | Usage |
|-------|------|-------|
| rounded-lg | 8px | Smaller elements |
| rounded-xl | 12px | Cards |
| rounded-2xl | 16px | Major cards, packages |
| rounded-full | 9999px | Pills (buttons) |

---

## Transitions & Animations

### Timing Functions
```
duration-200  = 200ms (default, snappy)
duration-300  = 300ms (slower, elegant)
ease-in-out   = cubic-bezier(0.4, 0, 0.2, 1)
```

### Common Transitions
```css
/* Button hover */
transition-all duration-200 hover:bg-gold-400

/* Border change */
transition-colors duration-200 hover:border-white

/* Opacity change */
transition-opacity duration-300 hover:opacity-100
```

---

## Grid & Layout System

### Max Width Container
```
max-w-7xl    = 80rem (1280px)
mx-auto      = center horizontally
px-4         = 16px horizontal padding (mobile)
sm:px-6      = 24px horizontal padding (tablet+)
lg:px-8      = 32px horizontal padding (desktop)
```

### Grid Columns
```
grid-cols-1        = 1 column (mobile)
md:grid-cols-2     = 2 columns (tablet)
md:grid-cols-3     = 3 columns (desktop)
md:grid-cols-4     = 4 columns (desktop wide)
gap-8              = 32px gap between items
```

### Section Wrapper
```
<section className="py-20 border-t border-white/10">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Content */}
  </div>
</section>
```

---

## Responsive Design Breakpoints

### Mobile First Approach
```
Default (no prefix)     = Mobile (< 640px)
sm:                     = 640px+
md:                     = 768px+
lg:                     = 1024px+
xl:                     = 1280px+
2xl:                    = 1536px+
```

### Common Responsive Patterns
```
grid-cols-1 md:grid-cols-2         = 1 col mobile, 2 cols tablet+
text-2xl md:text-3xl lg:text-4xl   = Growing text size
px-4 md:px-6 lg:px-8               = Increasing padding
w-full md:w-1/2                    = Full width mobile, half desktop
```

---

## Accessibility Considerations

### Color Contrast
✓ White (#fff) on Black (#000) = 21:1 (AAA)
✓ Gray-300 (#d1d5db) on Black = 11.7:1 (AAA)
✓ Gold-500 (#c7a961) on Black = 9.8:1 (AA)

### Interactive Elements
- Links underlined or color-differentiated
- Buttons have visible focus states
- Hover states provide clear feedback
- No information conveyed by color alone

### Semantic HTML
```
<h1>, <h2>, <h3> for headings
<p> for body text
<a> for links
<button> for buttons (or <a role="button">)
<nav> for navigation
<section> for content sections
```

---

## Component Library Reference

### Lucide React Icons Used
```tsx
import { Check, ChevronRight, Upload, X, ArrowRight, Zap, Heart } from 'lucide-react'

<Check size={16} />           // Checkmarks in lists
<ArrowRight size={16} />       // Next/forward indicator
<CheckCircle size={48} />      // Large success circle
<Crown size={18} />            // Elite tier badge
<Award size={18} />            // Platinum tier badge
```

### Icon Sizing
```
size={12}  = 12px (extra small)
size={14}  = 14px (small)
size={16}  = 16px (standard)
size={18}  = 18px (medium)
size={20}  = 20px (large)
size={48}  = 48px (hero)
```

---

## Hover & Interactive States

### Button Hover
```
Gold:      bg-gold-500 → bg-gold-400
Border:    border-gray-500 → border-white
Text:      text-gray-300 → text-white
Duration:  transition-all duration-200
```

### Card Hover
```
Border:    border-white/10 → border-gold-500/30
Background: no change (stays clean)
Duration:  transition-colors duration-300
```

### Link Hover
```
Color:     text-gray-400 → text-white
Duration:  transition-colors duration-200
```

---

## Dark Mode Considerations

The entire design is built for **dark mode only** (black background).

If light mode is needed in future:
1. Invert colors: Black ↔ White
2. Adjust gold saturation (lighter gold)
3. Use darker grays for light backgrounds
4. Maintain same hierarchy

---

## Example: Full Component Build

### Value Proposition Section
```tsx
<div className="space-y-4">
  <div className="text-gold-400 font-bold text-sm tracking-widest">✓</div>
  <h3 className="text-2xl font-light text-white leading-tight" 
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
    Verified Listings Only
  </h3>
  <p className="text-gray-400 font-light leading-relaxed text-base" 
     style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
    Every business is reviewed before going live to maintain quality standards.
  </p>
</div>
```

### Spacing Breakdown
```
space-y-4          = 16px between elements
text-2xl           = 24px font size
font-light         = 300 weight
leading-tight      = 1.25 line height
p-8                = 32px padding
gap-12             = 48px grid gap
py-20              = 80px vertical padding
```

---

## Performance Optimization

### CSS Classes (Tailwind)
- Minimal custom CSS
- All styles via utility classes
- No inline styles (except font-family for cross-platform)
- Clean build output

### Asset Optimization
- No images on landing page
- System fonts (no web font loading)
- No animations (CSS transitions only)
- Clean semantic HTML

---

## Browser Support

✓ Chrome/Edge 90+
✓ Firefox 88+
✓ Safari 14+
✓ Mobile browsers (iOS Safari, Chrome Mobile)

### Known Considerations
- Flexbox & Grid widely supported
- CSS variables supported (if used)
- System fonts work on all platforms
- Focus states render correctly

---

## Design Tokens Summary

```javascript
// Colors
const colors = {
  black: '#000000',
  white: '#ffffff',
  gray: { 300: '#d1d5db', 400: '#9ca3af', 500: '#6b7280' },
  gold: { 400: '#d4af37', 500: '#c7a961' },
  purple: { 300: '#c4b5fd', 400: '#a78bfa', 500: '#a855f7' }
}

// Typography
const typography = {
  fontFamily: 'system-ui, -apple-system, sans-serif',
  weights: { light: 300, normal: 400, semibold: 600 },
  sizes: { xs: '12px', base: '16px', lg: '18px', '5xl': '48px', '7xl': '56px' }
}

// Spacing
const spacing = { px: '1px', 2: '8px', 4: '16px', 8: '32px', 12: '48px', 20: '80px' }

// Transitions
const transitions = { fast: '200ms', standard: '300ms', easing: 'ease-in-out' }
```

---

**Last Updated:** April 17, 2026
**Status:** Production Ready ✅

