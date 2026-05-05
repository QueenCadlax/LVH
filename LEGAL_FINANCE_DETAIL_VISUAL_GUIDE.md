# Legal & Finance Professional Detail Page — Visual Guide 🎨

**Status:** Production-Ready  
**Date:** May 4, 2026

---

## 📐 Layout Overview

```
╔════════════════════════════════════════════════════════════════╗
║                     RESPONSIVE DESIGN MAP                     ║
╚════════════════════════════════════════════════════════════════╝

MOBILE (< 768px)          TABLET (768-1024px)      DESKTOP (> 1024px)
┌──────────────────┐     ┌──────────────────────┐  ┌─────────────────────────┐
│  [HERO] 60vh     │     │  [HERO] 60vh         │  │  [HERO] 60vh            │
│  (Full Width)    │     │  (Full Width)        │  │  (Full Width + Glow)    │
├──────────────────┤     ├──────────────────────┤  ├─────────────────────────┤
│ Name             │     │ Name | Share ♡       │  │ Name | Favorite ♡ Share │
│ Specialty        │     │ Specialty            │  │ Specialty               │
│ Badges ✓         │     │ Location ★ Hours     │  │ Badges ✓                │
├──────────────────┤     ├──────────────────────┤  │ Location ★ Hours        │
│ TABS (Stack)     │     │ TABS (Row)           │  ├─────────────────────────┤
│ ├ Overview       │     │ ├ Overview ←active   │  │ TABS (Horizontal)       │
│ ├ Services       │     │ ├ Services           │  │ ├ Overview ←active      │
│ ├ Reviews        │     │ ├ Reviews            │  │ ├ Services              │
│ └ Booking        │     │ └ Booking            │  │ ├ Reviews               │
├──────────────────┤     ├──────────────────────┤  │ └ Booking                │
│ Tab Content      │     │ Tab Content (2cols)  │  ├─────────────────────────┤
│ (Full Width)     │     │ (Responsive Grid)    │  │ Tab Content (Grid)      │
│                  │     │                      │  │                         │
│ [Stats Cards]    │     │ [Stats: 2 per row]   │  │ [Stats: 4 per row]      │
│ [Services List]  │     │ [Services: 2 cols]   │  │ [Services: 3 cols]      │
│ [Contact]        │     │                      │  │ [Contact: 3 cols]       │
├──────────────────┤     ├──────────────────────┤  ├─────────────────────────┤
│ FOOTER CTA       │     │ FOOTER CTA (2 cols)  │  │ FOOTER CTA (2 cols)     │
│ [Book Button]    │     │ Left | Right         │  │ Left | Right            │
└──────────────────┘     └──────────────────────┘  └─────────────────────────┘
```

---

## 🎯 Component Breakdown

### Hero Section (60vh)
```
╔════════════════════════════════════════════════════════╗
║                                                        ║
║         [PROFESSIONAL PHOTO BACKGROUND]               ║
║              (Gradient Overlay 180°)                   ║
║                                                        ║
║                   ┌───────────────┐                   ║
║            [◀] Gallery Nav [▶]                         ║
║                   └───────────────┘                   ║
║                                                        ║
║                  ✕ (Close Button)                     ║
║                                                        ║
├────────────────────────────────────────────────────────┤
║                                                        ║
║  Adv. Thabo Mokoena                    [♡] [⬤]        ║
║  ATTORNEY                                              ║
║  ✓ Verified | ⭐ Top Rated | 15 Years Experience     ║
║                                                        ║
║  📍 Mbombela | ⭐ 4.9 (98 reviews) | 🕐 Open now      ║
║                                                        ║
╚════════════════════════════════════════════════════════╝
```

### Tabbed Content Area

#### Tab 1: Overview
```
┌──────────────────────────────────────────────────────────┐
│ ABOUT                                                    │
├──────────────────────────────────────────────────────────┤
│ Advocate Thabo Mokoena is a highly respected attorney   │
│ with 15 years of experience in civil and commercial     │
│ law. He is dedicated to providing strategic legal       │
│ solutions and upholding the highest standards...        │
│                                                          │
├──────────────────────────────────────────────────────────┤
│ EXPERIENCE    │ CONSULTATION  │ RATING       │ LANGUAGES │
│   15+         │    R950       │   4.9⭐      │    3      │
│   Years       │   Per Session │ Highly Rated │  Fluent   │
├──────────────────────────────────────────────────────────┤
│ QUALIFICATIONS                                           │
│ [LLB] [LLM] [Admitted Advocate]                          │
├──────────────────────────────────────────────────────────┤
│ CONTACT                                                  │
│ 📞 +27 13 555 1234        📧 thabo@moklaw.co.za        │
│ 📍 101 Justice Ave, Mbombela, 1200                       │
├──────────────────────────────────────────────────────────┤
│ HOURS                                                    │
│ Mon-Fri: 08:00-17:00 | Sat-Sun: Closed                 │
└──────────────────────────────────────────────────────────┘
```

#### Tab 2: Services
```
┌──────────────────────────────────────────────────────────┐
│ SERVICES OFFERED                                         │
├──────────────────────────────────────────────────────────┤
│ ✓ Civil Litigation      ✓ Commercial Law               │
│ ✓ Contract Drafting     ✓ Labour Law                   │
│ ✓ Family Law            ✓ Legal Consultation          │
│ ✓ Dispute Resolution                                   │
├──────────────────────────────────────────────────────────┤
│ PAYMENT METHODS                                          │
│ [Card] [EFT] [Cash]                                     │
├──────────────────────────────────────────────────────────┤
│ PROFESSIONAL ASSOCIATIONS                                │
│ [Mpumalanga Law Society] [South African Bar Assoc.]   │
└──────────────────────────────────────────────────────────┘
```

#### Tab 3: Reviews
```
┌──────────────────────────────────────────────────────────┐
│ CLIENT REVIEWS                                           │
├──────────────────────────────────────────────────────────┤
│                    4.9                                   │
│                  out of 5.0                              │
│                                                          │
│  5⭐  [████████████████████] 95%                         │
│  4⭐  [██████              ] 80%                         │
│  3⭐  [████                ] 60%                         │
│  2⭐  [██                  ] 40%                         │
│  1⭐  [                    ] 0%                          │
│                                                          │
│  Based on 98 verified reviews                           │
├──────────────────────────────────────────────────────────┤
│ CLIENT 1                          ⭐⭐⭐⭐⭐ • 2 weeks ago │
│ "Attorney services were exceptional. Highly professional │
│  and knowledgeable. I felt confident throughout..."      │
│                                                          │
│ CLIENT 2                          ⭐⭐⭐⭐⭐ • 1 month ago  │
│ [More reviews...]                                        │
└──────────────────────────────────────────────────────────┘
```

#### Tab 4: Booking
```
┌──────────────────────────────────────────────────────────┐
│ BOOK A CONSULTATION                                      │
├──────────────────────────────────────────────────────────┤
│ DATE *                                                   │
│ [📅 2026-05-15                                    ]      │
│                                                          │
│ TIME *                                                   │
│ [Select a time ▼                                  ]      │
│  ├ 08:00                                                 │
│  ├ 09:00                                                 │
│  └ 10:00                                                 │
│                                                          │
│ REASON FOR CONSULTATION *                                │
│ ┌────────────────────────────────────────────────────┐  │
│ │ Briefly describe your legal or financial need...  │  │
│ │                                                    │  │
│ └────────────────────────────────────────────────────┘  │
│                                                          │
│ [✨ REQUEST CONSULTATION ✨] (Gold gradient)            │
│                                                          │
│ You will receive confirmation within 24 hours           │
└──────────────────────────────────────────────────────────┘
```

### Footer CTA Section
```
╔════════════════════════════════════════════════════════╗
║                  READY TO BOOK?                         ║
├────────────────────┬────────────────────────────────────┤
║ Secure your         │  NEED HELP?                       ║
║ consultation with   │  Contact us directly for any      ║
║ Adv. Thabo Mokoena  │  questions or special requests.   ║
║ today.              │                                   ║
║ Consultation fee:   │  [📞 CALL] [📧 EMAIL]             ║
║ R950                │                                   ║
║                     │                                   ║
║ [✨ BOOK CONS. ✨]  │                                   ║
╚════════════════════╩════════════════════════════════════╝
```

---

## 🎨 Color & Typography Details

### Hero Overlay Gradient
```
Linear Gradient: 180°
├─ Top: rgba(0, 0, 0, 0.2)   [Semi-transparent]
└─ Bottom: rgba(0, 0, 0, 0.8) [Near-opaque]

Effect: Readable text at bottom of hero
```

### Tab Navigation
```
Active State:
├─ Text: #C9A24D (Gold)
├─ Bottom Border: 2px solid #C9A24D
└─ Font Weight: 600

Inactive State:
├─ Text: #666 (Dark Gray)
├─ Bottom Border: none
└─ Font Weight: 600
```

### Card Styling
```
Overview Stats Cards:
├─ Background: rgba(201, 162, 77, 0.05) [Gold, 5% opacity]
├─ Border: 1px solid rgba(201, 162, 77, 0.1)
├─ Border Radius: 6px
├─ Padding: 20px
└─ Hover: Scale 1.05 + border highlight

Services Badges:
├─ Background: rgba(201, 162, 77, 0.1) [Gold, 10% opacity]
├─ Text: #C9A24D
├─ Border: 1px solid rgba(201, 162, 77, 0.2)
└─ Padding: 8px 16px
```

### Button Styling

#### Primary (Gold Gradient)
```
Normal:
├─ Background: linear-gradient(135deg, #C9A24D, #dbb85a)
├─ Color: #000
├─ Box Shadow: 0 8px 24px rgba(201, 162, 77, 0.3)
└─ Border Radius: 4px

Hover:
├─ Transform: scale(1.02)
└─ Box Shadow: 0 12px 32px rgba(201, 162, 77, 0.5)
```

#### Secondary (Border)
```
Normal:
├─ Background: transparent
├─ Color: #C9A24D
├─ Border: 1.5px solid #C9A24D
└─ Border Radius: 4px

Hover:
├─ Background: rgba(201, 162, 77, 0.2)
└─ Border Color: #C9A24D
```

---

## 📱 Responsive Breakpoints

### Mobile (< 768px)
- Single column layout
- Tabs stack vertically
- Hero height: 60vh (full mobile viewport height)
- Grid cols: 1 (cards), stacked (stats)
- Padding: 24px

### Tablet (768px - 1024px)
- 2-column layout (where appropriate)
- Tabs: Horizontal scroll
- Hero height: 60vh
- Grid cols: 2 (cards), 2 (stats)
- Padding: 32px

### Desktop (> 1024px)
- Full layout with sidebars
- Tabs: Full width
- Hero height: 60vh
- Grid cols: 3-4 (cards), 4 (stats)
- Padding: 40px

---

## ✨ Interactive States

### Button Hover Effects
```
❌ Before Click:
  [REQUEST CONSULTATION]  (Default gold gradient)

✅ On Hover:
  [REQUEST CONSULTATION]  (Slightly bigger, more glow)

🎯 On Click:
  [REQUEST CONSULTATION]  (All fields validated, submit)
```

### Tab Switching
```
Step 1: User clicks "Services" tab
├─ Tab underline slides to Services
└─ Content fades to Services content

Step 2: User clicks "Reviews" tab
├─ Tab underline slides to Reviews
└─ Content fades to Reviews content
```

### Favorite Toggle
```
❤️  Not Favorited:
  ├─ Heart outline
  ├─ Color: #fff (white)
  └─ Onclick: fill + turn gold

❤️  Favorited:
  ├─ Heart filled
  ├─ Color: #C9A24D (gold)
  └─ Onclick: unfill + turn white
```

### Gallery Navigation
```
Gallery Index: 0/3

[◀ Prev]  [Dot0] [Dot1] [Dot2]  [Next ▶]
         [✓ active]

On Click Next:
├─ Advance to Dot1
├─ Image transitions smoothly
└─ Chevron updates position
```

---

## 🎭 Animation & Transitions

### All Transitions: `all 0.3s ease`

```typescript
// Border focus
input:focus {
  borderColor: #C9A24D;
  boxShadow: 0 0 0 3px rgba(201, 162, 77, 0.15);
  transition: all 0.3s ease;
}

// Button hover
button:hover {
  transform: scale(1.02);
  box-shadow: upgraded;
  transition: all 0.3s ease;
}

// Tab underline
.tab-active::after {
  width: 100%;
  transition: width 0.3s ease;
}
```

---

## 🔍 Accessibility Features

- ✅ High contrast: Gold (#C9A24D) on Black (#000)
- ✅ Font sizes: Responsive clamp() prevents too-small text
- ✅ Form labels: Visible & associated with inputs
- ✅ Focus states: Border + shadow highlight
- ✅ Semantic HTML: `<button>`, `<label>`, `<select>`, `<textarea>`
- ✅ Keyboard nav: Tab through tabs, form fields, buttons

---

## 📊 Visual Hierarchy

### Weight (Importance)
```
1. Professional Name (Largest, Playfair serif)
2. Specialty + Badges (Large, gold)
3. Rating + Location (Medium, gold accent)
4. Tab Titles (Medium, underline on active)
5. Content Headings (Medium, serif)
6. Body Text (Small, light gray)
7. Helper Text (Smallest, dark gray)
```

### Space (Visual Breathing)
```
Tight:     8px (inputs, small gaps)
Cozy:      16px (component padding)
Normal:    24px (section padding)
Spacious:  40px (major section separation)
Grand:     60px+ (hero/footer)
```

---

## 🎬 Final Visual Summary

**Overall Aesthetic:**
- 🏛️ **Professional:** Trust, authority, expertise
- ✨ **Luxury:** Gold accents, premium typography, spacious layout
- 📱 **Responsive:** Perfect on all devices
- ⚡ **Modern:** Smooth transitions, micro-interactions
- 🎨 **Consistent:** Matches Health & Finance design language

**Vibe:**
> "When you step into this professional's profile, you feel like you're entering a premium law/finance office—thoughtful, authoritative, trustworthy, and ready to help."

---

**Version:** 1.0  
**Status:** ✅ Production-Ready Visual System  
**Last Updated:** May 4, 2026
