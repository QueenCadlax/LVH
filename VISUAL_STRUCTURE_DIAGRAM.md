# 🎨 VISUAL DIAGRAM - FORM STRUCTURE

## 5-STEP WIZARD FLOW

```
┌─────────────────────────────────────────────────────────────────┐
│  ✨ BUSINESS SUBMISSION FORM (New)                              │
│  LowveldHub - Professional 5-Step Wizard                        │
└─────────────────────────────────────────────────────────────────┘

╔═════════════════════════════════════════════════════════════════╗
║ STEP 1: BUSINESS INFO                                   (1 of 5) ║
╚═════════════════════════════════════════════════════════════════╝

   ┌─ Business Name (Required)
   ├─ Category Dropdown ★ Controls rest of form ★
   ├─ Location
   ├─ Contact Email
   ├─ Contact Phone
   ├─ Description
   │
   └─ 🆕 SOCIAL MEDIA & WEB PRESENCE (Optional)
      ├─ Website
      ├─ Facebook
      ├─ Instagram
      ├─ Twitter
      ├─ TikTok ← REQUIRED FIELD ✓
      ├─ LinkedIn
      └─ YouTube

   [Previous]  [Next →]


╔═════════════════════════════════════════════════════════════════╗
║ STEP 2: MEDIA & FILES                                   (2 of 5) ║
╚═════════════════════════════════════════════════════════════════╝

   ┌─ 🆕 Logo Upload
   ├─ Cover Image Upload
   ├─ Gallery Images Upload
   ├─ Videos Upload
   ├─ Menu Upload
   └─ Proof of Business Upload

   [← Previous]  [Next →]


╔═════════════════════════════════════════════════════════════════╗
║ STEP 3: SERVICES & HOURS                                (3 of 5) ║
╚═════════════════════════════════════════════════════════════════╝

   ┌─ Services / Specialties
   ├─ Amenities / Facilities (Checkboxes)
   │
   └─ Operating Hours
      ├─ Monday:    [--:--] - [--:--]
      ├─ Tuesday:   [--:--] - [--:--]
      ├─ Wednesday: [--:--] - [--:--]
      ├─ Thursday:  [--:--] - [--:--]
      ├─ Friday:    [--:--] - [--:--]
      ├─ Saturday:  [--:--] - [--:--]
      └─ Sunday:    [--:--] - [--:--]


   ╔════════════════════════════════════════════════════════════╗
   ║ 🍽️ RESTAURANT INFORMATION                                   ║
   ║ (VISIBLE ONLY WHEN category = "Restaurant")                 ║
   ╠════════════════════════════════════════════════════════════╣
   ║                                                              ║
   ║  Dietary Options Available:                                 ║
   ║  ☐ Vegetarian      ☐ Vegan                                 ║
   ║  ☐ Gluten-Free     ☐ Halal                                 ║
   ║  ☐ Kosher          ☐ Dairy-Free                             ║
   ║                                                              ║
   ║  ☐ We Accept Table Reservations                             ║
   ║                                                              ║
   ╚════════════════════════════════════════════════════════════╝

   ℹ️ Restaurant-specific fields are hidden because you
      selected: Hair Salon
   
   (SHOWN ONLY WHEN category ≠ "Restaurant")

   [← Previous]  [Next →]


╔═════════════════════════════════════════════════════════════════╗
║ STEP 4: SELECT YOUR PACKAGE                             (4 of 5) ║
╚═════════════════════════════════════════════════════════════════╝

   Choose the package that best fits your business needs

   ┌─────────────────┬──────────────────┬─────────────────┐
   │  ESSENTIAL      │  PROFESSIONAL    │  PLATINUM       │
   │  R799           │  R1,299          │  R1,999         │
   │                 │                  │                 │
   │  ✓ Listing      │  ✓ Everything    │  ✓ Everything  │
   │  ✓ Photos       │  ✓ + Priority    │  ✓ + Featured  │
   │  ✓ Contact      │  ✓ + Analytics   │  ✓ + Concierge │
   │                 │                  │                 │
   │  [SELECT]       │  [SELECT]        │  [SELECT] ←    │
   │                 │                  │   (Recommended) │
   └─────────────────┴──────────────────┴─────────────────┘

   [← Previous]  [Next →]


╔═════════════════════════════════════════════════════════════════╗
║ STEP 5: REVIEW & SUBMIT                                (5 of 5) ║
╚═════════════════════════════════════════════════════════════════╝

   📋 REVIEW YOUR SUBMISSION

   ┌─ Business Details
   │  Name: [Business Name]
   │  Category: [Category]
   │  Location: [Area]
   │  Phone: [Phone]
   │
   ├─ Media & Branding
   │  Logo: ✓ Uploaded
   │  Images: 5 uploaded
   │  Videos: 2 uploaded
   │
   ├─ Services & Operations
   │  Services: [List]
   │  Amenities: [List]
   │  Hours: Mon-Fri 09:00-17:00
   │
   └─ Social Media & Web
      🌐 Website: https://...
      f Facebook: https://...
      📷 Instagram: https://...
      𝕏 Twitter: https://...
      ♪ TikTok: https://...
      in LinkedIn: https://...
      ▶ YouTube: https://...

   [← Previous]  [Submit Business]


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 🔄 CATEGORY LOGIC FLOW

```
User selects Category in Step 1
              │
              ↓
   ┌──────────────────┐
   │ Category = ?     │
   └──────────────────┘
          │
          ├─→ "Restaurant"
          │       │
          │       ↓
          │   [SHOW RESTAURANT SECTION]
          │   ├─ Dietary Options
          │   ├─ Reservations
          │   └─ Menu Upload
          │
          └─→ Any Other Category
                  │
                  ↓
            [HIDE RESTAURANT SECTION]
            └─ Show Info Message:
               "ℹ️ Restaurant-specific fields
                  are hidden because you
                  selected: [Category]"
```

---

## 📊 COMPONENT HIERARCHY

```
App.tsx
  └─ switch(currentView)
      └─ case 'list-your-business':
          └─ <BusinessSubmissionForm>
              ├─ Step 1: Info
              │   ├─ Business fields
              │   └─ Social Media Section (NEW)
              │
              ├─ Step 2: Media
              │   ├─ Logo Upload (NEW)
              │   └─ Other Media
              │
              ├─ Step 3: Services
              │   ├─ Services/Amenities
              │   ├─ Operating Hours
              │   └─ Restaurant Section (Conditional) (NEW)
              │
              ├─ Step 4: Package
              │   ├─ Essential R799
              │   ├─ Professional R1,299
              │   └─ Platinum R1,999
              │
              └─ Step 5: Review
                  └─ Full Summary
```

---

## 🎯 KEY CHANGES AT A GLANCE

```
OLD FORM                        NEW FORM
────────────────────────────────────────────────────────
PremiumAddBusinessView ────→ BusinessSubmissionForm

Generic form             ────→ 5-step wizard
654 lines               ────→ 843 lines
No social media         ────→ 7 social platforms
No TikTok               ────→ TikTok included ✓
No restaurant logic     ────→ Dynamic category logic ✓
Basic design            ────→ Professional design ✓
Partial typing          ────→ Full TypeScript ✓
```

---

## 🌐 VISIBLE FEATURES CHECKLIST

When user opens "+ List Business":

### Step 1 - VISIBLE:
- [x] Business Name input
- [x] Category dropdown
- [x] Location input
- [x] Contact fields
- [x] Description textarea
- [x] **🆕 Social Media Section with 7 fields:**
  - [x] Website
  - [x] Facebook
  - [x] Instagram
  - [x] Twitter
  - [x] **TikTok** ← REQUIRED
  - [x] LinkedIn
  - [x] YouTube

### Step 2 - VISIBLE:
- [x] **🆕 Logo Upload**
- [x] Cover image
- [x] Gallery images
- [x] Videos
- [x] Menu
- [x] Proof of business

### Step 3 - VISIBLE:
- [x] Services textarea
- [x] Amenities checkboxes
- [x] Operating hours
- [x] **🆕 Restaurant Section (Conditional):**
  - [x] Appears when: category = "Restaurant"
  - [x] Contains: Dietary options + Reservations
  - [x] Styling: Blue background
  - [x] Disappears when: category ≠ "Restaurant"
  - [x] Shows: Info message instead

### Step 4 - VISIBLE:
- [x] **R799** (Essential)
- [x] **R1,299** (Professional)
- [x] **R1,999** (Platinum)

### Step 5 - VISIBLE:
- [x] Complete review summary
- [x] All social media links

---

## ✨ STYLING HIGHLIGHTS

### Social Media Section (Step 1):
```
┌─────────────────────────────────────┐
│ Social Media & Web Presence (Opt.)  │
├─────────────────────────────────────┤
│ Website  │ Facebook                 │
│ Instagram│ Twitter                  │
│ TikTok   │ LinkedIn                 │
│ YouTube  │                          │
└─────────────────────────────────────┘
```

### Restaurant Section (Step 3):
```
┌────────────────────────────────────┐
│ 🍽️ Restaurant Information           │ ← Blue background
├────────────────────────────────────┤
│ Dietary Options:                   │
│ ☐ Vegetarian   ☐ Vegan            │
│ ☐ Gluten-Free  ☐ Halal            │
│ ☐ Kosher       ☐ Dairy-Free       │
│                                    │
│ ☐ We Accept Table Reservations     │
└────────────────────────────────────┘
```

### Package Cards (Step 4):
```
┌──────────────┬──────────────┬──────────────┐
│  ESSENTIAL   │ PROFESSIONAL │  PLATINUM    │
│   R799       │   R1,299     │   R1,999     │
│              │              │              │
│ ✓ Listing    │ ✓ Everything │ ✓ Everything │
│ ✓ Photos     │ ✓ + Priority │ ✓ + Featured │
│ ✓ Contact    │ ✓ + Analytics│ ✓ + Concierge│
└──────────────┴──────────────┴──────────────┘
```

---

**Visual Structure: ✅ Complete and Professional**
