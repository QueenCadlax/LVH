# Copilot Instructions Update — February 3, 2026

## Summary of Changes

The `.github/copilot-instructions.md` file has been reviewed and updated to reflect the current state of the LowveldHub codebase as of February 3, 2026.

### Key Updates

**1. Version Information Updated**
- Last Updated date: January 31, 2026 → **February 3, 2026**
- Frontend line count: ~4194 lines → **~4639 lines** (445 lines added to App.tsx)
- Types line count: ~1511 lines → **~1514 lines**
- Category enum: 28 values → **30 values**

**2. New "⚡ Critical Onboarding Checklist" Section**
Added at the very top after the header for maximum visibility. Provides a quick checkbox-style list of 10 foundational patterns that EVERY agent must verify before making changes:
- Monolithic state design
- Backend build pipeline requirements
- Seed data behavior
- AI call centralization
- Detail view scrolling
- ID uniqueness constraints
- Image field requirements
- Tier system functionality
- Authentication checks
- API response contracts

**3. New "Top 10 Critical 'Do NOT' Rules" Section**
Extracted from the existing content and reorganized for emphasis. These are common pitfalls that can break the codebase:
1. Never call `@google/genai` directly
2. Don't mutate `localBusinesses` array
3. Seed IDs must be unique
4. Detail views must scroll
5. Marketplace ≠ Directory
6. Every listing needs an image
7. Use code patterns, not line numbers
8. Protect routes check auth
9. Navbar z-index handling
10. Concierge preferences merging

**4. Reorganized "Advanced Patterns" Section**
Combined and clarified advanced patterns for:
- Tier-gated features
- AI-powered search ranking
- Marketplace filtering
- Responsive design patterns
- Favorites persistence
- Detail view scrolling
- Layout compression
- Authentication flow
- Concierge chat context

**5. Consolidated "Adding a New Listing Type" Section**
Step-by-step guide for the most common development task (adding new business categories):
- Type definition in types.ts
- Seed file creation
- Import statements
- Routing setup
- Component creation
- Tier management
- Testing

**6. "Common Patterns" Reference**
High-level summary of architectural decisions and WHY they exist:
- Monolithic design intentionality
- Extensive seed data organization
- Tier system dual role (visual + functional)
- No persistence across page reloads
- Component reusability principles
- Explicit routing requirements
- Separate marketplace namespace
- Centralized AI service
- Domain service wrapping
- Detail view data flow

## File Structure Overview

The updated document now follows this hierarchy:

```
# Title & Metadata
⚡ Critical Onboarding Checklist (NEW - moved to top for visibility)
30-Second Quick Start
For New Agents: Start Here
Phase 3 Status & Production Readiness
Quick Facts
Critical Files & Architecture
  - Frontend Core
  - Services (Frontend)
  - UI Components
  - Component Architecture & Lazy Loading
  - Data Model
State Management & Routing
Listing Tier System
AI Integration Pattern
Backend Architecture (Express + PostgreSQL)
Real Estate Service Pattern
Seed Data Organization
UI Components & Patterns
[... existing sections ...]
Top 10 Critical "Do NOT" Rules (NEW - reorganized for emphasis)
Advanced Patterns (NEW - consolidated)
Adding a New Listing Type (NEW - dedicated section)
Common Patterns (NEW - reference guide)
[... remaining original sections ...]
```

## Content Quality Improvements

### What Was Preserved
- All 1148 lines of original comprehensive documentation
- Detailed backend architecture explanations
- Service layer descriptions
- Database schema information
- Build and deployment workflows
- API response format standards
- Protected route patterns
- Seed data persistence lifecycle
- Extended systems documentation (Business Submission, Loyalty, Agents, Activity, Messaging)

### What Was Enhanced
- **Clarity:** Added checkbox format for onboarding checklist (easy to verify)
- **Actionability:** Reorganized "Do NOT" rules for quick reference
- **Discoverability:** Moved critical patterns to top of document
- **Coherence:** Grouped similar patterns into consolidated sections
- **Examples:** Maintained specific code examples and file references

### What Remains Current
- AI service integration patterns (Gemini 3-Flash)
- Admin dashboard implementation status
- Marketplace and business submission systems
- Loyalty points and agent tracking
- Activity logging and messaging services
- All TypeScript patterns and middleware chains
- Database migration and seeding workflows

## How to Use This Document

### For New Agents
1. **Start with:** "⚡ Critical Onboarding Checklist" (verify 10 items)
2. **Then read:** "30-Second Quick Start" (3-minute overview)
3. **Deep dive:** "For New Agents: Start Here" (understand 6 core constraints)
4. **Reference:** "Top 10 Critical 'Do NOT' Rules" (avoid common mistakes)
5. **Implement:** Jump to relevant section (e.g., "Adding a New Listing Type")

### For Code Review
- Check against "Top 10 Critical 'Do NOT' Rules"
- Verify detail views have scroll reset
- Confirm AI calls go through aiService.ts
- Validate seed ID uniqueness
- Check image fields are present
- Verify API response format

### For Feature Development
1. Reference "Common Patterns" to understand if your feature fits existing paradigm
2. Check "Adding a New Listing Type" for step-by-step guide
3. Review "Advanced Patterns" for implementation approaches
4. Consult "Backend Architecture" for API integration
5. Verify against "Critical Integration Patterns" before committing

## Document Statistics

| Metric | Before | After |
|--------|--------|-------|
| Total Lines | 1148 | 1223 |
| Main Sections | 30+ | 35+ |
| Code Examples | ~25 | ~25 (preserved) |
| Checklist Items | 0 | 10 (added) |
| "Do NOT" Rules | Listed | **Top 10 dedicated section** |
| Quick Reference Sections | 2 | **7 dedicated sections** |

## Next Steps for Agents Using This Document

**For immediate productivity:**
- Check off all items in the "⚡ Critical Onboarding Checklist"
- Read "30-Second Quick Start" (2 minutes)
- Skim "Top 10 Critical 'Do NOT' Rules" (3 minutes)

**For specific tasks:**
- Adding a new view? → "Adding a New Listing Type"
- Creating backend endpoint? → "Backend Architecture" + "Protected Routes & Error Codes"
- Calling AI? → "AI Integration Pattern"
- Styling component? → "UI Components & Patterns"
- Debugging state? → "State Management & Routing"

**For architecture understanding:**
- "Why monolithic?" → "Common Patterns"
- "How does auth work?" → "Frontend-Backend Data Sync" + "JWT Workflow"
- "What's the seed data strategy?" → "Seed Data Organization" + "Seed Data Persistence Lifecycle"
- "How to extend the dashboard?" → "Admin Dashboard Implementation Status"

---

**Document Updated:** February 3, 2026  
**Codebase Version:** Phase 3 Complete (Production Ready)  
**Total Project Size:** ~4639 frontend lines + Backend REST API + PostgreSQL
