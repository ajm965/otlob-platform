# UX Rules

**Project:** Otlob Platform (اطلب ولا تتعنى)  
**Document Type:** Product Bible — UX Rules  
**Phase:** 1.9  
**Status:** Baseline  
**Applies to:** Customer app (external), Technician app, Admin panel, Company console  

---

## 1. Purpose

Cross-app UX rules ensuring trust, speed, Arabic-first RTL quality, and consistency. Not a visual design system file—behavioral product rules.

---

## 2. Loading

| Rule | Detail |
|------|--------|
| Immediate feedback | Any tap that calls network shows progress within 100–200ms |
| Skeletons over spinners | Prefer content placeholders on lists |
| Blocking loaders | Only for non-resumable critical actions (payment confirm) |
| Timeouts | Show recoverable error with retry |
| Don’t lie | Don’t show fake offers/technicians while loading |

---

## 3. Buttons

| Rule | Detail |
|------|--------|
| One primary CTA per view | Especially first viewport / sheets |
| Destructive actions | Distinct style + confirm |
| Disabled state | Explain why (missing fields) |
| Double-tap protection | Especially Accept / Pay |
| Labels | Verb-first; Arabic natural phrasing |

---

## 4. Navigation

| Rule | Detail |
|------|--------|
| Predictable back | No dead ends after payment |
| Deep links | Resume after auth |
| Tab vs stack | Clear hierarchy: Home / Requests|Jobs / Wallet|Earnings / Profile |
| Admin | Queue-first navigation for ops roles |
| Brand | Commercial identity visible without clutter |

---

## 5. Errors

| Rule | Detail |
|------|--------|
| Inline for fields | |
| Banners for page-level | |
| Full-screen only for blocking account states | Suspension, force update |
| Map code → message | AR/EN catalogs |
| Include next step | Retry, support, edit |

See `ERROR_SCENARIOS.md`.

---

## 6. Success

| Rule | Detail |
|------|--------|
| Explicit confirmation | Accept, pay, complete, review |
| Short and calm | Avoid confetti spam on every micro action |
| Next best action | e.g., after accept → tracking |

---

## 7. Animations

| Rule | Detail |
|------|--------|
| Purposeful | Status transitions, offer arrival, sheet present |
| Short | Typically < 300ms for micro; respect reduced motion |
| Not blocking | Never delay payment confirmation rendering |
| Marketplace taste | Avoid gimmicky game-like effects that hurt trust |

---

## 8. Accessibility

| Rule | Detail |
|------|--------|
| Contrast | WCAG-minded for text/CTA |
| Touch targets | Comfortable for thumbs |
| Screen readers | Labels on icons |
| Dynamic type | Layouts reflow |
| Don’t rely on color alone | Status uses text/icons |

---

## 9. Arabic RTL

| Rule | Detail |
|------|--------|
| Default locale | Arabic |
| Mirroring | Navigation, icons with directionality, lists |
| Numbers/amounts | Consistent SAR formatting rules |
| Mixed content | English technical codes may stay LTR inside RTL |
| Copy length | Design for Arabic expansion vs English |

---

## 10. Performance UX

| Rule | Detail |
|------|--------|
| Perceived speed | Cache catalog; paginate offers/jobs |
| Images | Compress; lazy load; thumbnails before full |
| Maps | Load on demand |
| Startup | Minimal blocking work |

---

## 11. Offline Behavior

| Rule | Detail |
|------|--------|
| Banner | Clear offline indicator |
| Allowed offline | View cached history; edit local draft request |
| Blocked offline | Pay, accept, start/complete job finalization |
| Sync | On reconnect, reconcile with server truth |
| Conflict | Server wins for money/state |

---

## 12. Trust UX Specifics

- Show price breakdown before pay  
- Show warranty dates clearly  
- Don’t hide cheaper offers due to badges  
- Evidence photos easy to review  
- Support entry always reachable on money/dispute screens  

---

## 13. Empty States

Every list needs honest empty state + CTA (no offers yet, no earnings, no disputes).

---

## 14. Related Documents

- `PRODUCT_PRINCIPLES.md`
- `USER_JOURNEYS.md`
- `ERROR_SCENARIOS.md`
- `MVP_SCOPE.md`
