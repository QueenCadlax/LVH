# 🎨 Section Layout Guide – Premium Add Listing Page

## Visual Layout Structure

This guide shows the DOM structure and visual appearance of each section.

---

## 1. HERO SECTION

### DOM Structure
```
<section className="space-y-8 py-20 text-center">
  <div className="space-y-6">
    <h1>Join Mpumalanga's</h1>
    <h2>Trusted Business Network</h2>
  </div>
  <p>List your business...</p>
  <div className="flex gap-4">
    <a>Apply via Email</a>
    <a>View Packages</a>
  </div>
</section>
```

### Visual Appearance
```
┌─────────────────────────────────────────────────────┐
│                                                       │
│              Join Mpumalanga's                        │
│          Trusted Business Network                    │ (gold text)
│                                                       │
│    List your business on LowveldHub and reach...     │
│                                                       │
│    ┌──────────────────┐  ┌──────────────────┐       │
│    │ Apply via Email  │  │ View Packages    │       │
│    └──────────────────┘  └──────────────────┘       │
│                                                       │
└─────────────────────────────────────────────────────┘
```

### CSS Properties
```
Max Width:     Full width
Padding:       py-20 (80px vertical)
Text Align:    center
Gap:           space-y-8 (32px between elements)
H1 Size:       7xl–8xl (56–64px)
H2 Size:       6xl–7xl (48–56px)
H2 Color:      gold-400
```

---

## 2. THREE PILLARS SECTION

### DOM Structure
```
<section className="grid grid-cols-1 md:grid-cols-3 gap-12 py-20 border-t">
  <div className="space-y-4">
    <div>✓</div>
    <h3>Verified Listings Only</h3>
    <p>Every business is reviewed...</p>
  </div>
  <div><!-- Second pillar --></div>
  <div><!-- Third pillar --></div>
</section>
```

### Visual Appearance
```
┌──────────────┬──────────────┬──────────────┐
│              │              │              │
│ ✓ Verified   │ ✓ AI Support │ ✓ Trusted    │
│   Listings   │              │   by Locals  │
│              │              │              │
│ Every bus... │ Customers... │ Access a...  │
│              │              │              │
└──────────────┴──────────────┴──────────────┘

Mobile:
┌──────────────┐
│ ✓ Verified   │
│   Listings   │
└──────────────┘
┌──────────────┐
│ ✓ AI Support │
└──────────────┘
┌──────────────┐
│ ✓ Trusted    │
│   by Locals  │
└──────────────┘
```

### CSS Properties
```
Grid:          grid-cols-1 md:grid-cols-3
Gap:           gap-12 (48px)
Padding:       py-20 (80px vertical)
Border Top:    border-white/10
Checkmark:     text-gold-400, font-bold, text-sm
H3 Size:       text-2xl, font-light
```

---

## 3. LISTING PACKAGES SECTION

### DOM Structure
```
<section id="packages-preview" className="py-20 border-t">
  <div className="text-center">
    <h2>Listing Packages</h2>
    <p>Choose the plan...</p>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    <div><!-- Essential --></div>
    <div><!-- Professional + POPULAR badge --></div>
    <div><!-- Platinum --></div>
  </div>
</section>
```

### Visual Appearance (Desktop)
```
                    Listing Packages
             Choose the plan that fits your needs

┌─────────────┬─────────────────┬─────────────┐
│ Essential   │  Professional   │  Platinum   │
│             │   🌟 POPULAR    │             │
├─────────────┼─────────────────┼─────────────┤
│    R799     │    R1,299       │    R1,999   │
│  6 Months   │   12 Months     │  12 Months  │
│             │                 │             │
│ ✓ Business  │ ✓ All Essential │ ✓ All Elite │
│   Name      │ ✓ Priority      │ ✓ Homepage  │
│ ✓ Address   │   Placement     │   Spotlight │
│ ✓ Contact   │ ✓ ELITE Badge   │ ✓ Newsletter│
│ ✓ Images    │ ✓ Top Listing   │ ✓ AI Spot   │
│             │                 │             │
│ ┌─────────┐ │ ┌─────────────┐ │ ┌─────────┐ │
│ │ Apply – │ │ │ Apply –     │ │ │ Request │ │
│ │Essential│ │ │Professional │ │ │ Review  │ │
│ └─────────┘ │ └─────────────┘ │ └─────────┘ │
└─────────────┴─────────────────┴─────────────┘

Essential:       white/10 border, white/2 bg
Professional:    gold-500/40 border, gold-500/5 bg (highlighted)
Platinum:        purple-500/30 border, purple-500/5 bg
```

### Mobile Appearance
```
┌─────────────┐
│  Essential  │
│ ────────── │
│    R799     │
│  6 Months   │
│  ────────── │
│  ✓ Business │
│  ✓ Address  │
│  ✓ Contact  │
│  ✓ Images   │
│  ────────── │
│  Apply –    │
│ Essential   │
└─────────────┘

┌─────────────┐
│Professional │
│  POPULAR    │
│ ────────── │
│   R1,299    │
│  12 Months  │
│ ────────── │
│ ✓ All...    │
│ ────────── │
│ Apply –     │
│ Professional│
└─────────────┘

┌─────────────┐
│  Platinum   │
│ ────────── │
│   R1,999    │
│  12 Months  │
│ ────────── │
│ ✓ All...    │
│ ────────── │
│ Request     │
│  Review     │
└─────────────┘
```

### CSS Properties
```
Grid:              grid-cols-1 md:grid-cols-3
Card Gap:          gap-8 (32px)
Card Padding:      p-8 (32px)
Card Border:       rounded-2xl (16px)
Pricing Size:      text-5xl (48px)
Check Icons:       size={16}, gold-400
```

---

## 4. HOW IT WORKS SECTION

### DOM Structure
```
<section className="py-20 border-t">
  <h2 className="text-center">How It Works</h2>
  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
    <div className="space-y-4">
      <div>1</div>
      <h3>Apply</h3>
      <p>Send us...</p>
    </div>
    <!-- Steps 2, 3, 4 -->
  </div>
</section>
```

### Visual Appearance (Desktop)
```
                        How It Works

┌────────┬─────────┬──────────┬──────────┐
│   1    │   2     │    3     │    4     │
│        │         │          │          │
│ Apply  │ Review  │Approval  │ Go Live  │
│        │         │          │          │
│Send us │We assess│Your bus..│You are   │
│your... │quality..│is approved│featured │
│        │         │          │          │
└────────┴─────────┴──────────┴──────────┘

Step Numbers:   text-5xl, font-light, text-gold-400
Step Title:     text-xl, font-light, text-white
Step Desc:      text-sm, font-light, text-gray-400
```

### Mobile Appearance
```
    1
 Apply
 Send us...

    2
 Review
 We assess...

    3
Approval
Your bus...

    4
 Go Live
You are...
```

### CSS Properties
```
Grid:          grid-cols-1 md:grid-cols-4
Gap:           gap-8 (32px)
Padding:       py-20 (80px vertical)
Number Size:   text-5xl (48px)
Number Color:  text-gold-400
```

---

## 5. THE INVITATION SECTION

### DOM Structure
```
<section className="py-20 border-t">
  <h2 className="text-center">The Invitation</h2>
  <p className="text-center max-w-3xl">We invite...</p>
  
  <div className="space-y-8">
    <h3>The Process</h3>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div>01 - You Apply - Email us...</div>
      <!-- ... -->
    </div>
  </div>
</section>
```

### Visual Appearance
```
                      The Invitation

        We invite exceptional businesses to become
        part of LowveldHub — a carefully curated
        ecosystem where quality meets opportunity.

                      The Process

┌──────────┬──────────┬──────────┬──────────┐
│    01    │    02    │    03    │    04    │
│          │          │          │          │
│You Apply │We Review │We Connect│You Thrive│
│          │          │          │          │
│Email us  │Our team  │If appro..│Your bus..│
│your bus..│assesses  │we guide  │joins an  │
│details   │quality..  │you thro..│elite net │
└──────────┴──────────┴──────────┴──────────┘

Numbers:        text-4xl, font-light, text-gold-400
Title:          font-semibold, text-sm
Description:    text-xs, leading-relaxed, text-gray-400
```

---

## 6. WHY PARTNER WITH US SECTION

### DOM Structure
```
<section className="py-20 border-t">
  <h2 className="text-center">Why Partner With Us</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
    <div className="flex gap-4">
      <div>✓</div>
      <p>Verified customer base...</p>
    </div>
    <!-- 3 more benefits -->
  </div>
</section>
```

### Visual Appearance
```
               Why Partner With Us

┌─────────────────────────┬─────────────────────────┐
│ ✓ Verified customer     │ ✓ AI-powered            │
│   base seeking premium  │   recommendations to    │
│   experiences           │   drive real business   │
│                         │                         │
├─────────────────────────┼─────────────────────────┤
│ ✓ No commission on      │ ✓ Exclusive community   │
│   direct sales          │   of 50+ curated        │
│                         │   businesses            │
└─────────────────────────┴─────────────────────────┘

Mobile:
┌─────────────────────────┐
│ ✓ Verified customer     │
│   base...               │
└─────────────────────────┘
┌─────────────────────────┐
│ ✓ AI-powered...         │
└─────────────────────────┘
┌─────────────────────────┐
│ ✓ No commission...      │
└─────────────────────────┘
┌─────────────────────────┐
│ ✓ Exclusive community...│
└─────────────────────────┘
```

### CSS Properties
```
Grid:            grid-cols-1 md:grid-cols-2
Gap:             gap-8 (32px)
Max Width:       max-w-2xl
Checkmark:       text-gold-400, font-bold, text-xl
Text:            text-gray-300, font-light, text-base
```

---

## 7. APPLICATION DETAILS SECTION

### DOM Structure
```
<section className="py-20 border-t">
  <div className="text-center">
    <h2>Ready?</h2>
    <div className="flex gap-4">
      <a>Apply Now →</a>
      <p>Or email directly</p>
    </div>
  </div>
  
  <div className="max-w-2xl mx-auto border rounded-2xl p-12">
    <h3>info@lowveldhub.co.za</h3>
    <h4>In Your Email, Please Include</h4>
    <ul>
      <li>• Business Name & Website</li>
      <li>• Location (Area in Mpumalanga)</li>
      <!-- ... -->
    </ul>
    <p>Our team reviews applications carefully.</p>
  </div>
</section>
```

### Visual Appearance
```
                           Ready?

          ┌──────────────────┐
          │ Apply Now →      │  Or email directly
          └──────────────────┘

┌───────────────────────────────────────────────┐
│                                               │
│        info@lowveldhub.co.za                  │
│                                               │
│  IN YOUR EMAIL, PLEASE INCLUDE                │
│                                               │
│  • Business Name & Website                    │
│  • Location (Area in Mpumalanga)              │
│  • Category / Industry                        │
│  • Contact Person & Details                   │
│  • 2–5 High-Quality Images                    │
│  • Brief Description (50–100 words)           │
│                                               │
│  ─────────────────────────────────            │
│                                               │
│  Our team reviews applications carefully.     │
│  You'll hear from us within 24–72 hours.      │
│                                               │
└───────────────────────────────────────────────┘
```

### CSS Properties
```
Card Width:      max-w-2xl
Card Padding:    p-12 (48px)
Card Border:     border white/10, rounded-2xl
Email Size:      text-lg, font-semibold
Checklist:       space-y-2, text-gray-300
```

---

## 8. CLOSING SECTION

### DOM Structure
```
<section className="py-20 border-t text-center">
  <p className="text-lg text-gray-300 max-w-2xl mx-auto">
    LowveldHub is a curated ecosystem, not a directory. 
    We maintain rigorous standards for quality, presentation, 
    and customer experience. Only exceptional businesses 
    are invited to join.
  </p>
</section>
```

### Visual Appearance
```
┌───────────────────────────────────────────────────┐
│                                                   │
│  LowveldHub is a curated ecosystem, not a         │
│  directory. We maintain rigorous standards for    │
│  quality, presentation, and customer experience. │
│  Only exceptional businesses are invited to join.│
│                                                   │
└───────────────────────────────────────────────────┘
```

### CSS Properties
```
Padding:        py-20 (80px)
Border Top:     border-white/10
Text Align:     text-center
Max Width:      max-w-2xl
Text Color:     text-gray-300
Text Size:      text-lg (18px)
Font Weight:    font-light (400)
```

---

## Full Page Flow (Desktop)

```
┌──────────────────────────────────┐
│ HERO (80px vertical padding)      │
│ Join Mpumalanga's...             │
│ Trusted Business Network          │
│ [Apply] [View Packages]           │
└──────────────────────────────────┘
         ▼ (border-top)
┌──────────────────────────────────┐
│ THREE PILLARS (3-column grid)    │
│ ✓ Verified  ✓ AI Support  ✓Trust│
└──────────────────────────────────┘
         ▼ (border-top)
┌──────────────────────────────────┐
│ PACKAGES (3-column grid)         │
│ Essential | Professional* | Plat │
└──────────────────────────────────┘
         ▼ (border-top)
┌──────────────────────────────────┐
│ HOW IT WORKS (4-column grid)     │
│ 1.Apply | 2.Review | 3.Appr | 4 │
└──────────────────────────────────┘
         ▼ (border-top)
┌──────────────────────────────────┐
│ THE INVITATION                   │
│ We invite exceptional businesses │
│ 01. You Apply | 02. Review | ... │
└──────────────────────────────────┘
         ▼ (border-top)
┌──────────────────────────────────┐
│ WHY PARTNER (2-column grid)      │
│ ✓ Verified | ✓ AI-powered        │
│ ✓ No commission | ✓ Exclusive    │
└──────────────────────────────────┘
         ▼ (border-top)
┌──────────────────────────────────┐
│ READY?                           │
│ [Apply Now] or email...          │
│ info@lowveldhub.co.za            │
│ INCLUDE: Business Name, Location │
│          Category, Contact, Photos│
│          Description (50-100 words)
│ Response: 24-72 hours            │
└──────────────────────────────────┘
         ▼ (border-top)
┌──────────────────────────────────┐
│ CLOSING                          │
│ LowveldHub is curated ecosystem. │
│ Only exceptional businesses...   │
└──────────────────────────────────┘
```

---

## Breakpoint Behavior

### Mobile Stacking (grid-cols-1)
All sections stack vertically. Grids become single column.

### Tablet Adaption (md: breakpoints)
- Packages: 1 → 3 columns
- Process: 1 → 4 columns
- Why Partner: 1 → 2 columns

### Desktop Optimal (lg: styles)
Full 3–4 column layouts. Maximum typography sizes (7xl–8xl hero).

---

## Color & Border Usage

### Section Dividers
```
border-t border-white/10  = Subtle top border between sections
```

### Card Styling
```
Essential:       border-white/10, bg-white/2
Professional:    border-gold-500/40, bg-gold-500/5 (highlighted)
Platinum:        border-purple-500/30, bg-purple-500/5
```

### Text Colors
```
Headings:        text-white, font-light
Body:            text-gray-300, font-light
Labels:          text-gray-400, font-semibold, uppercase
Accents:         text-gold-400, checkmarks
```

---

## Spacing Reference

```
py-20          = 80px vertical padding (sections)
gap-12         = 48px grid gap (main)
gap-8          = 32px grid gap (packages)
gap-6          = 24px grid gap (process)
gap-4          = 16px gap (buttons, inline)
space-y-8      = 32px vertical stack spacing
space-y-4      = 16px vertical stack spacing
space-y-2      = 8px vertical stack spacing
p-8            = 32px padding (cards)
p-12           = 48px padding (large cards)
```

---

**Visual Guide Complete** ✨

This layout guide shows the exact structure and appearance of each section in the redesigned Premium Add Listing page.

