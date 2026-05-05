# Health Business Detail Page - Visual Reference & Navigation Guide

## 📱 Page Flow Diagram

```
START: HealthPage (Browse Doctors)
    ↓
    ┌─────────────────────────────────────┐
    │ PROVIDER CARDS GRID (5 per row)     │
    ├─────────────────────────────────────┤
    │ ┌────────────┐ ┌────────────┐ ...   │
    │ │  [IMAGE]   │ │  [IMAGE]   │       │
    │ │ Dr. Smith  │ │ Dr. Chen   │       │
    │ │ General GP │ │ Derma      │       │
    │ │ 4.9⭐      │ │ 4.7⭐      │       │
    │ │ [BOOK BTN] │ │ [BOOK BTN] │       │
    │ └────────────┘ └────────────┘       │
    │                                     │
    └─────────────────────────────────────┘
          ↓ CLICK BOOK BUTTON
    
    NAVIGATE TO: 'health-detail'
    ↓
    ┌──────────────────────────────────────────────────┐
    │   HEALTH BUSINESS DETAIL PAGE                    │
    ├──────────────────────────────────────────────────┤
    │                                                  │
    │        HERO IMAGE SECTION (60vh)                │
    │     [Large Provider Photo + Gallery Nav]        │
    │                                                  │
    │  ┌────────────────────────────────────────────┐ │
    │  │ NAME: Dr. Sarah Johnson                    │ │
    │  │ SPECIALTY: Cardiologist                    │ │
    │  │ BADGES: ✓ Verified • Top Rated            │ │
    │  │ LOCATION: Nelspruit • RATING: 4.8 (89)    │ │
    │  └────────────────────────────────────────────┘ │
    │                                                  │
    ├──────────────────────────────────────────────────┤
    │                                                  │
    │ TAB NAVIGATION:                                  │
    │ [OVERVIEW] [SERVICES] [REVIEWS] [BOOKING]       │
    │                                                  │
    ├──────────────────────────────────────────────────┤
    │                                                  │
    │ CONTENT SECTION (Changes based on tab):         │
    │                                                  │
    │ OVERVIEW TAB:                                    │
    │ ├─ About section (2-3 sentences)                │
    │ ├─ Stats grid (14+ Yrs, R550, 4.8⭐, 3 Langs)   │
    │ ├─ Qualifications badges                        │
    │ ├─ Contact info (phone, email, address)         │
    │ └─ Business hours (Mon-Sun)                     │
    │                                                  │
    │ SERVICES TAB:                                    │
    │ ├─ Services grid (7 items with checkmarks)      │
    │ └─ Insurance accepted (4 providers)             │
    │                                                  │
    │ REVIEWS TAB:                                     │
    │ ├─ Rating breakdown (4.8 out of 5)              │
    │ ├─ Star distribution bars                       │
    │ └─ 3 sample patient reviews                     │
    │                                                  │
    │ BOOKING TAB:                                     │
    │ ├─ Date picker                                  │
    │ ├─ Time selector dropdown                       │
    │ ├─ Reason for visit text area                   │
    │ ├─ [REQUEST APPOINTMENT] button                 │
    │ └─ "Confirmation within 24 hours" message       │
    │                                                  │
    ├──────────────────────────────────────────────────┤
    │                                                  │
    │ FOOTER CTA SECTION:                              │
    │ ┌─────────────┬──────────────────────────────┐   │
    │ │ READY TO    │ NEED HELP?                  │   │
    │ │ BOOK?       │ Contact us directly         │   │
    │ │             │                              │   │
    │ │[BOOK APPT]  │ [CALL] [EMAIL]              │   │
    │ │             │                              │   │
    │ └─────────────┴──────────────────────────────┘   │
    │                                                  │
    └──────────────────────────────────────────────────┘
```

---

## 🎨 Design Elements Reference

### HERO SECTION (Top)
```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                 [LARGE IMAGE - 60vh]                   │
│                                                         │
│              [◄ Nav] [● ○ ○ ○] [Nav ►]                 │
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │ 🔙 (close button)                                 │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│              [Dark overlay gradient]                   │
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │ NAME: Dr. Sarah Johnson                          │ │
│  │ SPECIALTY: Cardiologist (gold text)              │ │
│  │ [✓ Verified] [Top Rated] [Responsive]            │ │
│  │                                                   │ │
│  │ 📍 Nelspruit  •  ⭐ 4.8 (89 reviews)  •  🟢 Open   │ │
│  │                                                   │ │
│  │                      [❤️] [📤]                    │ │
│  │              (Favorite & Share buttons)            │ │
│  └───────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

---

### TAB NAVIGATION
```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│  OVERVIEW  │  SERVICES  │  REVIEWS  │  BOOKING  │        │
│     ↓      (gold underline = active)                     │
│ ─────────────────────────────────────────────────────    │
│                                                          │
│ (Content changes based on active tab)                   │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

### OVERVIEW TAB - LAYOUT
```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│ ABOUT                                                    │
│ ──────────────────────────────────────────────────────  │
│ Dr. Sarah Johnson is a specialist cardiologist with     │
│ 11 years of experience treating heart and              │
│ cardiovascular diseases...                              │
│                                                          │
│ ┌──────────┬──────────┬──────────┬─────────────┐        │
│ │ EXPER    │ CONSUL   │ RATING   │ LANGUAGES   │        │
│ │ 11+ Yrs  │ R550     │ 4.8⭐    │ 3 Fluent    │        │
│ └──────────┴──────────┴──────────┴─────────────┘        │
│                                                          │
│ QUALIFICATIONS                                           │
│ ──────────────────────────────────────────────────────  │
│ [MMed Cardiology] [FRCP (Cardiology)] [MBChB]           │
│                                                          │
│ CONTACT                                                  │
│ ──────────────────────────────────────────────────────  │
│ 📞 +27 13 000 2222                                       │
│ ✉️ dr.johnson@cardiac.co.za                             │
│ 📍 456 Cardiac Center, Nelspruit, 1200                  │
│                                                          │
│ HOURS                                                    │
│ ──────────────────────────────────────────────────────  │
│ ┌─────────┬────────────────────┐ ┌─────────┬──────────┐ │
│ │ Monday  │ 09:00 - 16:00      │ │ Friday  │ 09:00 -  │ │
│ │ Tuesday │ 09:00 - 16:00      │ │ Saturday│ 10:00 -  │ │
│ │ Wednesd │ 09:00 - 16:00      │ │ Sunday  │ Closed   │ │
│ │ Thursda │ 09:00 - 16:00      │ └─────────┴──────────┘ │
│ └─────────┴────────────────────┘                        │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

### SERVICES TAB - LAYOUT
```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│ SERVICES OFFERED                                         │
│ ──────────────────────────────────────────────────────  │
│ ┌──────────────────┐ ┌──────────────────┐              │
│ │ ✓ Cardiac        │ │ ✓ ECG & Holter   │              │
│ │   Consultation   │ │   Monitoring     │              │
│ └──────────────────┘ └──────────────────┘              │
│                                                          │
│ ┌──────────────────┐ ┌──────────────────┐              │
│ │ ✓ Echocardiogra  │ │ ✓ Stress Testing │              │
│ │   phy            │ │                  │              │
│ └──────────────────┘ └──────────────────┘              │
│                                                          │
│ ... (7 services total)                                  │
│                                                          │
│ INSURANCE ACCEPTED                                       │
│ ──────────────────────────────────────────────────────  │
│ ┌──────────────────┐ ┌──────────────────┐              │
│ │ Medshield        │ │ Discovery Health │              │
│ └──────────────────┘ └──────────────────┘              │
│                                                          │
│ ┌──────────────────┐ ┌──────────────────┐              │
│ │ Alexander Forbes │ │ Momentum Health  │              │
│ └──────────────────┘ └──────────────────┘              │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

### REVIEWS TAB - LAYOUT
```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│ PATIENT REVIEWS                                          │
│ ──────────────────────────────────────────────────────  │
│                                                          │
│  ┌────────────────────────────────────┐                │
│  │ 4.8  out of 5.0                    │                │
│  │      Based on 89 verified reviews  │                │
│  └────────────────────────────────────┘                │
│                                                          │
│  5⭐ ████████████████░░░░  (70%)                        │
│  4⭐ ██████████░░░░░░░░░░  (45%)                        │
│  3⭐ ███████░░░░░░░░░░░░░░  (25%)                       │
│  2⭐ ██░░░░░░░░░░░░░░░░░░░░ (10%)                       │
│  1⭐ ░░░░░░░░░░░░░░░░░░░░░░ (0%)                        │
│                                                          │
│ ┌──────────────────────────────────────┐               │
│ │ Patient 1             ⭐⭐⭐⭐⭐            │               │
│ │                       2 weeks ago    │               │
│ │                                      │               │
│ │ "Dr. Johnson is professional,        │               │
│ │ caring, and thorough. The           │               │
│ │ consultation was comprehensive      │               │
│ │ and she addressed all my concerns.  │               │
│ │ Highly recommended!"                │               │
│ └──────────────────────────────────────┘               │
│                                                          │
│ (2 more reviews below)                                  │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

### BOOKING TAB - LAYOUT
```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│ BOOK AN APPOINTMENT                                      │
│ ──────────────────────────────────────────────────────  │
│                                                          │
│ ┌────────────────────────────────────────────────────┐ │
│ │                                                    │ │
│ │ DATE                                               │ │
│ │ [📅 Select date picker]                            │ │
│ │                                                    │ │
│ │ TIME                                               │ │
│ │ [Select a time ▼]                                  │ │
│ │  ├─ 08:00                                          │ │
│ │  ├─ 09:00                                          │ │
│ │  ├─ 10:00                                          │ │
│ │  └─ ... more times                                 │ │
│ │                                                    │ │
│ │ REASON FOR VISIT                                   │ │
│ │ ┌──────────────────────────────────────────────┐  │ │
│ │ │ Briefly describe your concern...             │  │ │
│ │ │                                              │  │ │
│ │ │                                              │  │ │
│ │ │                                              │  │ │
│ │ └──────────────────────────────────────────────┘  │ │
│ │                                                    │ │
│ │    [REQUEST APPOINTMENT] (gold button)            │ │
│ │                                                    │ │
│ │ You will receive confirmation within 24 hours     │ │
│ │                                                    │ │
│ └────────────────────────────────────────────────────┘ │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

### FOOTER CTA SECTION
```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│ ┌──────────────────┬──────────────────────────────────┐ │
│ │                  │                                  │ │
│ │ READY TO BOOK?   │ NEED HELP?                      │ │
│ │                  │                                  │ │
│ │ Secure your      │ Contact us directly for any    │ │
│ │ appointment with │ questions or special requests. │ │
│ │ Dr. Sarah        │                                  │ │
│ │ Johnson today.   │ [CALL]  [EMAIL]                │ │
│ │ Consultation:    │                                  │ │
│ │ R550             │                                  │
│ │                  │                                  │
│ │ [BOOK APPT]      │                                  │
│ │                  │                                  │
│ └──────────────────┴──────────────────────────────────┘ │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

## 🎯 Color Coding

### By Section

| Section | Background | Text | Accents |
|---------|-----------|------|---------|
| Hero | Pure black #000 | White #fff | Gold #C9A24D |
| Tabs | Black #000 | Gray #666 | Gold #C9A24D (active) |
| Content | Black #000 | White #fff | Subtle gold glow |
| Cards | Dark #1a1a1a | White #fff | Gold borders |
| Buttons | Gold gradient | Black #000 | N/A |
| Status (Open) | N/A | Green #4ade80 | N/A |
| Status (Closed) | N/A | Red #ef4444 | N/A |

---

## 🖱️ Interactive Elements

### Buttons

**Primary Button (Gold Gradient)**
```
Normal:  gradient(#C9A24D → #dbb85a)
Hover:   scale(1.02) + shadow increase
Active:  scale(0.98)
```

**Secondary Button (Outline)**
```
Normal:  transparent bg, gold border
Hover:   gold bg (10% opacity), gold border
Active:  gold bg (15% opacity)
```

### Form Inputs

**Text Input / Textarea**
```
Normal:   gray border, transparent bg
Focus:    gold border + glow (0 0 0 3px rgba(201,162,77,0.15))
Blur:     back to normal
```

**Select Dropdown**
```
Same as text input
```

### Gallery Navigation

**Arrow Buttons**
```
Normal:   gold background (80% opacity)
Hover:   gold background (100% opacity)
Dots:    click to jump to image
```

---

## 📊 Data Structure

### Provider Object
```typescript
interface HealthProvider {
  id: string;                    // p1, p2, p3, etc.
  name: string;                  // Dr. Sarah Johnson
  specialty: string;             // Cardiologist
  qualifications: string[];      // MMed Cardiology, FRCP
  rating: number;                // 4.8
  reviews: number;               // 89
  location: string;              // Nelspruit
  address: string;               // 456 Cardiac Center, ...
  verified: boolean;             // true
  image: string;                 // image URL
  phone: string;                 // +27 13 000 2222
  email: string;                 // dr.johnson@cardiac.co.za
  website?: string;              // www.sarah-cardio.co.za
  hours: Record<string, { open: string; close: string }>;
  consultationFee: number;       // 550
  languages: string[];           // English, Afrikaans, French
  about: string;                 // Biography
  services: string[];            // 7 services
  insuranceAccepted: string[];   // 4 insurance providers
  experience: number;            // 11
  badges: string[];              // Verified, Top Rated, etc.
}
```

---

## ✅ Quality Checklist

- ✅ Hero section with image gallery
- ✅ Provider info prominently displayed
- ✅ 4 functional tabs
- ✅ About section with stats
- ✅ Qualifications display
- ✅ Contact information
- ✅ Business hours
- ✅ Services grid
- ✅ Insurance list
- ✅ Reviews section
- ✅ Booking form
- ✅ Footer CTA
- ✅ Responsive layout
- ✅ Luxury dark theme
- ✅ Zero errors
- ✅ Smooth animations
- ✅ Accessibility features

---

**Status**: ✅ **COMPLETE**
**Errors**: 0
**Ready for**: Production Deployment

