# Error Scenarios

**Project:** Otlob Platform (اطلب ولا تتعنى)  
**Document Type:** Product Bible — Business & System Error Scenarios  
**Phase:** 1.9  
**Status:** Baseline  

---

## 1. Purpose

Catalog of errors users and operators may encounter, with product-facing meaning and expected handling. Stable codes align with API/engineering standards.

---

## 2. Validation Errors

| Code / scenario | User meaning | Product handling |
|-----------------|--------------|------------------|
| Required field missing | Complete highlighted fields | Inline AR/EN errors |
| `amountHalalas` too low/high | Price outside allowed range | Show min/max guidance |
| Invalid enum/status | Unsupported value | Prevent submit |
| Media type/size invalid | File not allowed | Suggest allowed types |
| Description too long | Shorten text | Counter + block |
| Invalid phone/OTP format | Check number | Keep focus on field |
| Coupon invalid/expired | Cannot apply code | Clear explanation |
| Duplicate active offer | Already offered | Link to edit/withdraw |

HTTP: typically `400`.

---

## 3. Authentication Errors

| Scenario | Handling |
|----------|----------|
| Missing/expired token | Re-auth / OTP again; resume deep link |
| OTP wrong | Retry with attempt limits |
| OTP rate limited | Cooldown timer |
| Session revoked / password change N/A | Force login |
| Device compromised suspicion | Step-up verification (future) |

HTTP: `401`.

---

## 4. Authorization Errors

| Scenario | Handling |
|----------|----------|
| Customer accessing another’s request | Deny; generic not found/forbidden per policy |
| Technician offer while unverified | Explain verification required |
| Admin route without admin claim | Deny |
| Company dispatcher without role | Deny + ask manager |
| Suspended account privileged action | Blocking screen |

HTTP: `403` (or `404` when hiding existence).

---

## 5. Payment Errors

| Scenario | Handling |
|----------|----------|
| Card declined | Retry / other method |
| 3DS abandoned | Pending then fail; allow restart |
| Capture failure after auth | Auto-retry; ops alert; honest status |
| Idempotent replay mismatch | Conflict; support |
| Refund above captured | Block |
| PSP timeout | Pending reconciliation UI |
| Double charge detected | Auto-refund duplicate + apology messaging |

---

## 6. GPS / Location Errors

| Scenario | Handling |
|----------|----------|
| Permission denied | Explain why needed; manual pin fallback |
| GPS unavailable indoors | Manual address + map adjust |
| Geocode failure | Keep lat/lng pin; structured address required |
| Out of service area (MVP SA) | Block with coverage message |

---

## 7. Network Errors

| Scenario | Handling |
|----------|----------|
| Offline | Offline banner; queue safe drafts; block payments until online |
| Timeout | Retry with backoff; idempotent accepts |
| Partial upload | Resume media |
| Intermittent API | Optimistic UI only when safe; else wait confirmation |

---

## 8. Database / Platform Errors

| Scenario | Handling |
|----------|----------|
| Contention on accept | Conflict message; refresh |
| Missing index (eng failure) | Generic error; alert eng |
| Not found entity | Empty state / 404 |
| Soft-deleted resource | Treat as unavailable |
| Quota exceeded | Degrade gracefully; ops |

User message: non-technical; include support reference `requestId`.

---

## 9. Subscription Errors

| Scenario | Handling |
|----------|----------|
| Daily offer cap | Upgrade CTA |
| Plan not allowing feature | Explain + plans screen |
| Seat limit | Buy seat / remove member |
| Renewal failed | Grace warnings; update payment method |
| Trial already used | Block second trial |

---

## 10. Warranty Errors

| Scenario | Handling |
|----------|----------|
| `warranty_expired` | New request CTA |
| Out of scope | Explain exclusions summary |
| Evidence insufficient | Ask more photos/video |
| Open claim exists | Link to existing claim |
| Provider cannot fulfill rework | Escalate dispute/ops |

---

## 11. Dispute Errors

| Scenario | Handling |
|----------|----------|
| Not eligible status/window | Explain when allowed |
| Duplicate open dispute | Link existing |
| Evidence over cap | Remove extras |
| Appeal window passed | Closed final |
| Unauthorized party | Deny |

---

## 12. Matching / Offer Business Conflicts

| Scenario | Handling |
|----------|----------|
| `request_not_open` | Refresh |
| `offer_expired` | Refresh list |
| `offer_already_accepted` | Show booking |
| `provider_not_eligible` | Why (distance, hours, verification) when safe to reveal |
| `request_offer_cap_reached` | Decide sooner messaging for customer; block new offers |

---

## 13. Notification Errors

| Scenario | Handling |
|----------|----------|
| Push failed | Rely on in-app; SMS fallback if critical |
| SMS provider down | Retry; email if available; ops |
| Preference muted category | Skip non-critical silently |

---

## 14. Product Copy Rules for Errors

1. Arabic primary message; English available  
2. Say what happened + what to do next  
3. Never blame the user harshly  
4. Never expose stack traces or internal collection names  
5. Always provide support path for money issues  

---

## 15. Related Documents

- `EDGE_CASES.md`
- `ACCEPTANCE_CRITERIA.md`
- `docs/engineering/ERROR_HANDLING_GUIDE.md`
- `docs/engineering/API_STANDARDS.md`
- `UX_RULES.md`
