# Copilot Instructions — Update Summary

**Date:** January 31, 2026  
**Status:** ✅ Updated & Verified

## What Was Updated

The `.github/copilot-instructions.md` file has been refreshed with the latest state of the LowveldHub codebase. This document serves as the authoritative guide for AI coding agents working on this project.

### Key Updates

1. **Timestamp & Status (Header)**
   - Updated: "January 31, 2026 (verified & current)"
   - Status changed from "Phase 3—Feature-complete" to "Phase 3 Complete—Production-ready"
   - Frontend line count: 3846 → **3898 lines** (verified actual)
   - Backend routes: 13 → **14 modules** (added productRoutes.ts)

2. **Critical Constraint #6 (Added)**
   - New constraint emphasizing Phase 3 production-readiness
   - Highlights 6 database tables, 14 API routes, complete security middleware

3. **Quick Reference Table (Enhanced)**
   - Added 2 new rows:
     - "Add Marketplace product" → ProductCard + MARKETPLACE_CATEGORY_GROUPS pattern
     - "Create Business Submission form" → BusinessSubmissionFormV2.tsx reference
   - Clarifies integration patterns for Phase 3 features

4. **New Section: Phase 3 Status & Production Readiness**
   - Comprehensive checklist of completed features (Frontend, Backend, Database, Admin, AI, Marketplace, etc.)
   - Integration points documentation
   - Quick reference for Phase 3 status

5. **Line Count Updates (Throughout)**
   - App.tsx: ~3846 → ~3898 lines
   - types.ts: ~1275 → ~1511 lines
   - Data files: 30+ → 32 files verified

6. **Backend Routes (Updated)**
   - Clarified all 14 route modules including new productRoutes.ts
   - Highlights recent additions: productRoutes, submissionRoutes, etc.

7. **Data Model Section**
   - Updated data directory to reflect 32 confirmed seed files (verified via imports in App.tsx)

## What This Document Does

The copilot-instructions.md file provides AI agents with:

- **Architecture Overview** — How the monolithic React SPA works, seed data lifecycle, backend integration
- **Navigation Patterns** — Explicit routing via `handleNavigate()`, no React Router
- **Critical Patterns** — Detail view scroll-to-top requirement, AI service centralization, tier system
- **Backend Workflow** — Build-then-run critical for TypeScript compilation, 14 route modules with full middleware
- **Database Schema** — 6 tables, security middleware, auth patterns
- **Common Tasks** — Quick reference table for frequent development patterns
- **Gotchas & Anti-patterns** — 10 critical "don't do this" items to prevent common bugs
- **Integration Checklist** — Must-read items before implementing new features

## Verification Sources

All updates verified against:

- Actual codebase inspection (App.tsx, types.ts, backend structure)
- Seed file enumeration (32 files in data/ directory)
- Backend route listing (14 modules in backend/src/routes/)
- Recent phase completion documentation (PHASE_3_DELIVERY_SUMMARY.md, etc.)
- Database schema documentation (BACKEND_FINALIZATION_FINAL_SUMMARY.md)
- Production readiness checklist (PHASE_3_EXECUTIVE_SUMMARY.md)

## Sections Verified as Current

✅ Frontend architecture & routing patterns  
✅ Seed data organization & lifecycle  
✅ Backend API structure & middleware chain  
✅ AI integration (Gemini 3-Flash)  
✅ Database schema (6 tables)  
✅ Admin dashboard implementation  
✅ Tier system (Trial → Premium → Elite → Platinum)  
✅ Business submission flow (5-step form)  
✅ Loyalty & agent tracking systems  
✅ Security patterns (JWT, bcryptjs, helmet.js, rate-limiting)

## For Next Agent Session

When working on LowveldHub, agents should:

1. **Read** `.github/copilot-instructions.md` sections relevant to their task
2. **Reference** the Quick Reference Table for common patterns
3. **Check** Critical Gotchas before committing code
4. **Verify** Backend build before runtime: `npm run build` → `node dist/server.js`
5. **Follow** the navigation pattern: Always use `handleNavigate()`, never React Router
6. **Remember** Seed data is read-only; real persistence = backend PostgreSQL API

## Questions?

If any section appears outdated or unclear:
- Search actual codebase (grep, read_file tools) to verify
- Cross-reference with recent completion documentation (PHASE_3_*.md files)
- Update this file with verified findings

**Document is current as of January 31, 2026** ✅
