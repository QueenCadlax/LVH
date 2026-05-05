# 📚 LowveldHub AI Agent Documentation Portal

## Start Here: Your Path to Productivity

Welcome to the LowveldHub codebase! Follow this guide to get productive in < 30 minutes.

---

## 🚀 Quick Start Path (Choose Your Level)

### If You Have 5 Minutes ⚡
Read ONLY this section. You'll know enough to avoid breaking things.

```
1. App.tsx is monolithic (no Redux, no React Router)
2. Navigate ONLY via handleNavigate(view, id?, category?, sub?)
3. Never import @google/genai directly → use services/aiService.ts
4. Detail views MUST call window.scrollTo(0, 0) in useEffect
5. All seed data IDs must be unique (prefixes: b_, r_, p_)
6. Every listing needs an image field
7. Don't mutate localBusinesses directly
8. Protected routes check isAuthenticated first
9. All API responses: { success: true, data: {...} }
10. Backend: npm run build, then node dist/server.js
```

**Next:** Proceed to your specific task below.

---

### If You Have 30 Minutes 🔍
This will make you immediately productive.

**Steps:**
1. ✅ Read **Critical Onboarding Checklist** in `.github/copilot-instructions.md` (5 min)
2. ✅ Read **30-Second Quick Start** in `.github/copilot-instructions.md` (2 min)
3. ✅ Skim **Top 10 Critical 'Do NOT' Rules** in `.github/copilot-instructions.md` (5 min)
4. ✅ Find your task below and read its example in `QUICK_REFERENCE_COPILOT.md` (10 min)
5. ✅ Reference the main file for deeper context as needed (3 min)

**Result:** You can now write code, but shouldn't yet merge to main.

---

### If You Have 2 Hours 📖
This will make you a confident contributor.

**Path:**
1. Read **entire** `.github/copilot-instructions.md` (1.5 hours)
2. Read `COPILOT_INSTRUCTIONS_UPDATE_FEB3.md` to understand structure (15 min)
3. Bookmark `QUICK_REFERENCE_COPILOT.md` for daily use (5 min)
4. You're ready to contribute with confidence!

**Result:** You understand why things are designed this way, not just what to do.

---

## 📍 Document Map

### `.github/copilot-instructions.md` — THE SOURCE OF TRUTH
**1223 lines of comprehensive architecture & patterns**

**Start with these sections:**
- ⚡ Critical Onboarding Checklist (top)
- 30-Second Quick Start
- For New Agents: Start Here
- Critical Integration Patterns

**Then reference as needed:**
- Quick Facts
- Critical Files & Architecture
- State Management & Routing
- AI Integration Pattern
- Backend Architecture
- Top 10 Critical "Do NOT" Rules (NEW)
- Advanced Patterns (NEW)

---

### `QUICK_REFERENCE_COPILOT.md` — COPY-PASTE EXAMPLES
**400+ lines of working code examples for common tasks**

**Use when:**
- You need to navigate between views
- You're calling Gemini AI
- You're creating a new detail view
- You're adding a business category
- You're creating a backend endpoint
- You're handling favorites
- You're implementing authentication
- You're styling tier-specific UI
- You're filtering by area
- You're stuck and need help

**Format:** Each task has working code you can copy and adapt.

---

### `COPILOT_INSTRUCTIONS_UPDATE_FEB3.md` — WHAT CHANGED
**150+ lines explaining changes and how to use documents**

**Read when:**
- You want to understand what was updated
- You need guidance on using the documentation
- You're onboarding someone else
- You want to understand the documentation philosophy

---

### `COPILOT_ANALYSIS_COMPLETE.md` — META OVERVIEW
**200+ lines of analysis and success metrics**

**Read when:**
- You want to understand the big picture
- You're curious about methodology
- You need success metrics for evaluation

---

## 🎯 Task-Based Navigation

### I want to... → Read this

| Task | Primary Doc | Secondary Doc |
|------|-------------|---------------|
| Understand the architecture | `.github/copilot-instructions.md` Critical Files section | None (5-10 min) |
| Navigate between views | `QUICK_REFERENCE_COPILOT.md` #1 | `.github/copilot-instructions.md` State Management section |
| Call Gemini AI | `QUICK_REFERENCE_COPILOT.md` #2 | `.github/copilot-instructions.md` AI Integration Pattern |
| Create a new detail view | `QUICK_REFERENCE_COPILOT.md` #3 | `.github/copilot-instructions.md` Component Architecture |
| Add a new business category | `QUICK_REFERENCE_COPILOT.md` #4 | `.github/copilot-instructions.md` Adding a New Listing Type |
| Create a backend endpoint | `QUICK_REFERENCE_COPILOT.md` #5 | `.github/copilot-instructions.md` Backend Architecture |
| Implement authentication | `QUICK_REFERENCE_COPILOT.md` #6-7 | `.github/copilot-instructions.md` Protected Routes & Error Codes |
| Style tier-specific UI | `QUICK_REFERENCE_COPILOT.md` #8 | `.github/copilot-instructions.md` Listing Tier System |
| Debug an issue | `QUICK_REFERENCE_COPILOT.md` Debugging Checklist | `.github/copilot-instructions.md` Common Error Messages |
| Understand why design is this way | `.github/copilot-instructions.md` Common Patterns | `COPILOT_ANALYSIS_COMPLETE.md` |
| Avoid common mistakes | `.github/copilot-instructions.md` Top 10 Do NOT Rules | None (saves you hours) |

---

## ⚠️ Critical Rules (Memorize These)

### Do This ✅
1. Use `handleNavigate(view, category?, id?, sub?)` for all navigation
2. Route ALL Gemini calls through `services/aiService.ts`
3. Call `window.scrollTo(0, 0)` in every detail view's useEffect
4. Check `isAuthenticated` before rendering protected content
5. Ensure ALL listing IDs are globally unique (use prefixes)
6. Give every listing an `image` field with valid URL
7. Run `npm run build` BEFORE `node dist/server.js` (backend)
8. Return `{ success: true, data: {...} }` from all API endpoints
9. Search `localBusinesses` array to find listings (don't hardcode)
10. Reference code by pattern names, not line numbers

### Don't Do This ❌
1. Never import `@google/genai` in components
2. Don't mutate `localBusinesses` array directly
3. Don't allow duplicate seed IDs across files
4. Don't forget scroll-to-top in detail views
5. Don't conflate Marketplace and Directory categories
6. Don't create listings without images
7. Don't use React Router or browser history
8. Don't return non-standard API responses
9. Don't access protected routes without auth check
10. Don't ignore preferences returned from AI functions

---

## 📊 Current Codebase Stats

| Metric | Value |
|--------|-------|
| **Frontend** | React 19 + TypeScript + Vite |
| **Frontend Size** | ~4639 lines in App.tsx (monolithic) |
| **Types Definition** | ~1514 lines in types.ts |
| **Backend** | Express + TypeScript + PostgreSQL |
| **Database** | 6 tables (users, businesses, admins, admin_logs, subscriptions, payments) |
| **API Routes** | 14 modules (auth, business, review, admin, etc.) |
| **Seed Data** | 32 files with 4000+ listings |
| **Categories** | 30 business categories |
| **Areas** | 65+ Mpumalanga locations |
| **Listing Tiers** | 4 levels (Trial, Premium, Elite, Platinum) |
| **AI Integration** | Google Gemini 3-Flash (16 functions) |
| **Status** | Phase 3 Complete (Production Ready) |
| **Last Updated** | February 3, 2026 |

---

## 🆘 Stuck? Use This Flow

```
Question: "How do I...?"
  ↓
Check QUICK_REFERENCE_COPILOT.md first (copy-paste solution)
  ↓
Not there? → Search .github/copilot-instructions.md by topic
  ↓
Still stuck? → Check "Debugging Checklist" in QUICK_REFERENCE_COPILOT.md
  ↓
Need architecture context? → Read COPILOT_ANALYSIS_COMPLETE.md
  ↓
Want to understand why? → Read "Common Patterns" or "Advanced Patterns"
```

---

## 🎓 Learning Path

### Week 1: Get Productive
- Day 1: Critical Onboarding Checklist + 30-Second Quick Start
- Day 2-3: QUICK_REFERENCE_COPILOT.md for your first tasks
- Day 4-5: Deep dive into `.github/copilot-instructions.md` for your domain

### Week 2: Become Confident
- Read "State Management & Routing" section (understand App.tsx design)
- Read "Backend Architecture" section (understand REST API)
- Read "Top 10 Critical 'Do NOT' Rules" (avoid common mistakes)
- Review "Common Patterns" (understand architecture decisions)

### Week 3: Master the Codebase
- Read "AI Integration Pattern" (understand Gemini integration)
- Read "Seed Data Organization" (understand how data flows)
- Read "Advanced Patterns" (tackle complex features)
- Explore actual code files referenced throughout docs

### Week 4+: Contribute Confidently
- You're ready to add new features
- You can mentor others (share these docs!)
- You understand trade-offs in architecture

---

## 💡 Tips for Success

**Do:**
- Read the documentation before coding (saves hours)
- Keep QUICK_REFERENCE_COPILOT.md open while coding
- Reference code examples before asking questions
- Check the "Do NOT" rules before committing
- Use debugging checklist before reporting bugs

**Don't:**
- Skip the onboarding checklist (takes 5 min, saves hours)
- Import Gemini directly without checking aiService.ts
- Forget window.scrollTo(0, 0) in detail views
- Assume state persists across page reloads
- Make API responses non-standard

---

## 📞 Getting Help

### For Quick Answers
1. Check `QUICK_REFERENCE_COPILOT.md` for your task
2. Ctrl+F search `.github/copilot-instructions.md` for key terms
3. Read the "Debugging Checklist" in QUICK_REFERENCE_COPILOT.md

### For Understanding
1. Read the relevant section in `.github/copilot-instructions.md`
2. Look at "Common Patterns" to understand design decisions
3. Check "Advanced Patterns" for complex scenarios

### For Architecture Questions
1. Read "Critical Files & Architecture" section
2. Review "Backend Architecture" section
3. Check "State Management & Routing" section
4. Read `COPILOT_ANALYSIS_COMPLETE.md` for big picture

---

## ✅ Checklist: You're Ready When...

- [ ] You've read the Critical Onboarding Checklist
- [ ] You understand what handleNavigate() does
- [ ] You know where to put Gemini API calls
- [ ] You know detail views need window.scrollTo(0, 0)
- [ ] You understand seed data re-initializes every render
- [ ] You know the backend build command
- [ ] You understand tier-gated features
- [ ] You can list the "Top 10 Do NOT Rules" from memory
- [ ] You have QUICK_REFERENCE_COPILOT.md bookmarked
- [ ] You know how to search `.github/copilot-instructions.md`

**If you checked all 10:** You're ready to contribute! 🚀

---

## 📅 Document Maintenance

| Document | Last Updated | Status |
|----------|--------------|--------|
| `.github/copilot-instructions.md` | February 3, 2026 | Current |
| `QUICK_REFERENCE_COPILOT.md` | February 3, 2026 | Current |
| `COPILOT_INSTRUCTIONS_UPDATE_FEB3.md` | February 3, 2026 | Reference |
| `COPILOT_ANALYSIS_COMPLETE.md` | February 3, 2026 | Reference |

**How to Keep Updated:**
1. Check date stamp on `.github/copilot-instructions.md` (source of truth)
2. Search for `Last Updated:` in all docs before major work
3. Reference the "Last Updated" table in each doc
4. Ask your team lead if anything seems outdated

---

## 🚀 Ready to Start?

1. **Just 5 minutes?** → Memorize the "Critical Rules" section above
2. **Have 30 minutes?** → Follow the "Quick Start Path" above
3. **Have 2 hours?** → Read all three main documents in order
4. **Need to do a specific task?** → Jump to "Task-Based Navigation" above

---

**Welcome to LowveldHub! 🌍**

You now have everything you need to contribute effectively to this luxury B2B directory platform.

The three documentation files provide:
- ✅ Complete architecture overview
- ✅ Working code examples for common tasks
- ✅ Anti-patterns to avoid
- ✅ Debugging guidance
- ✅ Decision rationale

**Questions?** Start with the relevant document above. You'll find your answer 99% of the time.

Good luck, and welcome to the team! 🎉

---

**Document Version:** 1.0  
**Created:** February 3, 2026  
**Status:** Ready for distribution to AI agents and development teams
