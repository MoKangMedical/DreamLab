# DreamLab — Step-by-Step Feature Implementation + QC Plan

## Goal
Systematically implement every promised platform feature, then QC-verify each one works in the static GitHub Pages deployment (no backend dependency).

---

## Feature Inventory & Current Status

### 1. 🏠 Homepage (`/`) — Professional International Platform
**Status:** ✅ Implemented (v14)
**What works:** Hero, trust indicators, 6 capability cards, 3 pillars, CTA, footer, bathhouse link
**QC:** Visual verification

### 2. 🏯 Bathhouse (`/bathhouse`) — Spirited Away Secondary Homepage
**Status:** ⚠️ Needs verification
**Content:** Ghibli film-grade page with particles, kanji, oil-house architecture
**QC:** Navigate to `/bathhouse`, verify all Ghibli elements render

### 3. 🪞 Assessments (`/assessments` + `/[id]`)
**Status:** ⚠️ Functional but with CSS variable issues
**Mock data:** 6 scales with full questions ✅
**Issues:**
- `AssessmentTakeClient.tsx` uses `--gradient-bg`, `--geo-coral`, `--accent-purple` — need verification these exist in globals.css
- Loading screen "正在打开契约之镜..." works ✅
- Submit result page with score + interpretation ✅
**QC Steps:**
1. Visit `/assessments` — all 6 scale cards visible
2. Click into each assessment — questions render
3. Answer all questions → submit → see result with score + interpretation
4. "重新测试" button resets correctly

### 4. 👤 AI Companion (`/companion`)
**Status:** ⚠️ Functional but bypasses api.ts mock layer
**Issues:**
- CompanionPage uses direct `fetch()` instead of `@/lib/api` functions
- On static deployment, fetch to `/api/companion/chat` fails → fallback catch block works but only gives generic fallback message instead of the richer mock replies
- Uses `--accent-purple` CSS variable
**Fix:** Refactor companion to use API layer for consistent mock fallback
**QC:** Type a message → get mock No-Face reply within 1s

### 5. 🌙 Dream Analysis (`/dream` + `/history`)
**Status:** ⚠️ Form works, analysis needs mock data
**Issues:**
- Dream recording form with emotion tags ✅
- Writing prompts sidebar ✅
- Submit goes to backend → fails on static deployment
- Dream history page shows empty (API returns `[]`)
- `DreamClient.tsx` uses `alert()` on error — need better UX
**Fix:** 
- Add mock dream list for history
- Add client-side mock analysis result
- Replace `alert()` with inline error
**QC:** 
1. Fill dream form → submit → see mock analysis result
2. Visit `/dream/history` → see mock dream entries

### 6. 📚 Knowledge Base (`/knowledge`)
**Status:** ❌ Broken — mock data returns `{}`
**Issues:**
- `api.ts` `getMockData` returns `{}` for `/api/knowledge*` endpoints
- No articles, no categories, no featured content visible
- Article detail + quiz system is fully coded but has no data
**Fix:** Add mock knowledge data (articles + categories + quizzes)
**QC:** Visit `/knowledge` → see articles grid, click article → see content + quiz

### 7. 🧘 Wellness (`/wellness`)
**Status:** ✅ Mostly self-contained
**Working tabs:** Meditation (4 presets with timer), Breathing (4 exercises with animation), Gratitude journal (needs backend), Dashboard (needs backend), Sleep (needs backend)
**Issues:**
- Gratitude journal, Dashboard, Sleep all call backend API — fail silently
- Gratitude submit gives no feedback on static deployment
**Fix:** Add mock wellness data layer
**QC:** 
1. Start meditation → timer works → breathing circle animates
2. Start breathing exercise → countdown works
3. Gratitude: submit entry → shows in list (mock)
4. Dashboard: shows mock stats

### 8. 📖 Courses (`/courses` + `/[id]`)
**Status:** ⚠️ List page works with mock data, detail page needs content
**Issues:**
- Course list shows 4 courses from mock ✅
- Course detail page (`/courses/[id]`) fetches from backend — returns empty `{content: []}`
- Course progress tracking needs backend
**Fix:** Add mock course content with chapters
**QC:** Click a course → see chapter list / content

### 9. 👥 Profile (`/profile`)
**Status:** ✅ Fully static
**Works:** Stats animation, journey milestones, quick actions, activity timeline
**QC:** Visual verification

### 10. 🔮 Reflect (`/reflect`)
**Status:** ⚠️ Needs verification
**Has:** ReflectClient component, needs backend for insights
**Fix:** Add mock reflection data
**QC:** Page loads without error, form submits with mock result

### 11. 👻 Spirited Journey (`/spirited` + `/[floor]`)
**Status:** ⚠️ Needs verification
**Has:** Floor system, NPC dialogues, progress tracking — all backend-dependent
**Fix:** Add mock dialogue data for static deployment
**QC:** Visit `/spirited` → see journey map, click floor → see dialogues

### 12. 🎵 Global Components
**Status:** Mixed
- **BottomNav** ✅
- **GhibliMusic** ✅ (YouTube embed)
- **SpiritedInteractions** ✅ (SootSprites + Shikigami)
- **MarginDecor** ✅
- **InteractiveGhibli** ✅
- **GlobalExploreMore** ✅

### 13. 🎨 CSS Variable Audit
**Status:** ⚠️ Critical
**Issue:** Many components reference CSS variables from v12 manga design (`--accent-purple`, `--geo-coral`, `--geo-lavender`, `--geo-mint`, `--geo-sand`, `--gradient-bg`) that may have been removed or renamed in v14 professional redesign. Need to verify globals.css defines all referenced variables.

---

## Implementation Order (by dependency)

### Phase 1: Foundation Fixes
1. **CSS Variable Audit** — Check globals.css for all variable references
2. **Mock Data Expansion** — Knowledge, Courses detail, Wellness, Dreams, Reflect, Spirited

### Phase 2: Feature Completion
3. **Knowledge Base** — Mock articles + categories + quizzes
4. **Course Detail** — Mock chapter content
5. **Dream Analysis** — Mock analysis result + history
6. **Companion** — Refactor to use API layer
7. **Wellness Backend Tabs** — Mock data for Dashboard, Gratitude, Sleep
8. **Reflect** — Mock insight generation

### Phase 3: Polish
9. **Bathhouse** — Verify and fix any regressions
10. **Spirited Journey** — Mock dialogues + floor content

### Phase 4: QC
11. **Build + Deploy** — Verify all pages load without errors
12. **Systematic QC** — Check every page, every interactive element

---

## Files to Modify (estimated)

| File | Changes |
|------|---------|
| `frontend/src/lib/api.ts` | Expand mock data for knowledge, courses detail, wellness, dreams, reflect |
| `frontend/src/app/companion/page.tsx` | Refactor to use `@/lib/api` |
| `frontend/src/components/DreamClient.tsx` | Add mock analysis fallback |
| `frontend/src/components/DreamHistoryClient.tsx` | Add mock history data |
| `frontend/src/app/courses/[id]/page.tsx` | Handle mock course content |
| `frontend/src/app/globals.css` | Audit CSS variables |
| `frontend/src/app/bathhouse/page.tsx` | Verify/restore Ghibli elements |

---

## QC Checklist (final verification)

- [ ] `/` — Professional homepage loads, all sections visible
- [ ] `/bathhouse` — Ghibli experience renders (particles, kanji, oil house)
- [ ] `/assessments` — 6 scale cards, click into each, complete quiz, see results
- [ ] `/companion` — Chat works, messages render, mock replies appear
- [ ] `/dream` — Form works, submit gives mock analysis, history shows entries
- [ ] `/knowledge` — Articles grid visible, article detail + quiz functional
- [ ] `/courses` — 4 courses listed, click into detail, see chapters
- [ ] `/wellness` — All 5 tabs functional (meditation, breathing, dashboard, gratitude, sleep)
- [ ] `/profile` — Stats animate, milestones render, quick actions link correctly
- [ ] `/reflect` — Form renders, submit works with mock insight
- [ ] `/spirited` — Journey map visible, floor pages load with mock dialogues
- [ ] BottomNav — All links navigate correctly on mobile
- [ ] Music player — YouTube embed visible bottom-right
- [ ] No console errors on any page
- [ ] CSS variables resolve (no undefined variable warnings)
