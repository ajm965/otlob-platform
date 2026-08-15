# Edge Cases

**Project:** Otlob Platform (اطلب ولا تتعنى)  
**Document Type:** Product Bible — Edge Cases Catalog  
**Phase:** 1.9  
**Status:** Baseline  

---

## 1. Purpose

Catalog of non-happy-path situations product and engineering must handle explicitly. Each item includes expected product behavior.

---

## 2. Supply / Matching

| ID | Case | Expected behavior |
|----|------|-------------------|
| EC-M01 | No technicians nearby | Expand radius rings; show sparse state; notify when candidates appear or suggest retry/different time |
| EC-M02 | Technicians nearby but all offline | Queue for next wave; soft ETA messaging; optional SMS to recently active |
| EC-M03 | All nearby at daily cap | Exclude capped; expand pool; inform customer of possible delay |
| EC-M04 | Service niche with zero supply in city | Empty state + suggest alternate service/support |
| EC-M05 | Emergency with sparse supply | Escalate waves; ops alert; broader radius |

---

## 3. Offers

| ID | Case | Expected behavior |
|----|------|-------------------|
| EC-O01 | No offers until expiry | Expire request; CTA re-request; optional feedback why |
| EC-O02 | Offer expired while customer taps accept | `409`/`offer_expired`; refresh list |
| EC-O03 | Technician declines (ignores) | No penalty beyond response metrics; waves continue |
| EC-O04 | Technician withdraws last offer | Customer notified; request stays open |
| EC-O05 | Duplicate offer submit | Reject with `duplicate_active_offer` |
| EC-O06 | Offer spam / velocity | Rate limit; possible temporary bid block |
| EC-O07 | Edit after customer opened detail | Policy: allow/deny; if deny, show reason |
| EC-O08 | Two customers N/A (one request owner) | Only owner accepts |
| EC-O09 | Double accept race | One wins; other gets conflict; no two bookings |
| EC-O10 | Provider becomes suspended mid-offer | Expire/disable accept; notify customer |
| EC-O11 | Offer version is superseded while customer views it | Disable accept on old version; refresh to replacement; preserve revision history |
| EC-O12 | Losing offer closure lags after winner accepted | Request exclusivity lock rejects loser accepts; UI refreshes; asynchronous closure uses `accepted_competitor` |

---

## 4. Customer Continuity

| ID | Case | Expected behavior |
|----|------|-------------------|
| EC-C01 | Customer disappears after offers | Reminders; request expires; offers expire |
| EC-C02 | Customer disappears after booking | Provider no-show/cancel policy; support; possible fee |
| EC-C03 | Customer unreachable for warranty claim visit | Reschedule SLA; claim may close for non-cooperation |
| EC-C04 | Customer deletes app mid-job | SMS/email critical updates still attempt |
| EC-C05 | Duplicate requests same issue | Detect near-duplicates; warn; allow with confirmation |

---

## 5. Technician Continuity

| ID | Case | Expected behavior |
|----|------|-------------------|
| EC-T01 | Technician disappears after accept | Reminders; escalate; reassign (company) or cancel/refund path |
| EC-T02 | Late technician | Customer notified; compensation policy optional; cancel window |
| EC-T03 | Technician no-show | Customer cancel + refund/dispute; ranking penalty |
| EC-T04 | Technician loses internet mid-upload | Resume uploads; do not complete until media committed |
| EC-T05 | Technician account suspended mid-job | Ops/admin path to finish or reassign; customer protected |

---

## 6. Payment

| ID | Case | Expected behavior |
|----|------|-------------------|
| EC-P01 | Payment fails | Clear retry; block start if prepaid required |
| EC-P02 | Double payment / double submit | Idempotency; reconcile; auto-refund duplicate if any |
| EC-P03 | Auth succeeds, capture fails | Retry capture; hold booking state; ops alert |
| EC-P04 | Partial refund then second dispute | Cap refunds to captured; ledger integrity |
| EC-P05 | Webhook delayed | Pending UI; eventual consistency; no duplicate capture |
| EC-P06 | Insufficient funds | Fail soft; suggest other method |
| EC-P07 | Refund to closed bank instrument | PSP rules; support manual |
| EC-P08 | Chargeback arrives after capture, refund, or provider payable | Record immutable reversal/dispute event; place applicable payout hold; reconcile without rewriting prior payment facts |
| EC-P09 | PSP webhooks arrive out of order | Verify signature; deduplicate by event ID; apply only legal monotonic transition or queue for reconciliation; never regress a later state |
| EC-P10 | Webhook replay after successful processing | Return idempotent success; do not duplicate charge, refund, ledger entry, or notification |

---

## 7. Location / Device

| ID | Case | Expected behavior |
|----|------|-------------------|
| EC-G01 | GPS unavailable | Manual pin + address entry; accuracy warning |
| EC-G02 | Wrong pin far from address text | Validation warning; confirm |
| EC-G03 | Cross-border pin outside SA (MVP) | Block or warn per market policy |
| EC-G04 | Provider GPS spoofing suspicion | Trust signals; do not auto-ban without review |

---

## 8. Network / Offline

| ID | Case | Expected behavior |
|----|------|-------------------|
| EC-N01 | Internet lost during create request | Draft saved locally if safe; resume |
| EC-N02 | Internet lost during payment | Do not re-charge blindly; reconcile via status API |
| EC-N03 | Internet lost during media upload | Retry queue; progress retained |
| EC-N04 | Flaky network on accept | Idempotency key prevents double booking |

---

## 9. Job Execution

| ID | Case | Expected behavior |
|----|------|-------------------|
| EC-J01 | Job cancelled after start | Partial work policy; photos retained; financial rules |
| EC-J02 | Late customer (not home) | Wait window; reschedule/cancel fees |
| EC-J03 | Before images missing | Cannot start |
| EC-J04 | After images missing | Cannot complete |
| EC-J05 | Technician completes wrong booking | Entity checks prevent; support fix |
| EC-J06 | Scope creep on site | Chat negotiate; optional change order (future); else new offer/request |

---

## 10. Warranty / Dispute

| ID | Case | Expected behavior |
|----|------|-------------------|
| EC-W01 | Warranty expired | Block claim; guide new request |
| EC-W02 | Claim out of scope | Reject with explanation |
| EC-W03 | Duplicate open claim | Reject |
| EC-W04 | Dispute + warranty simultaneously | Coordinate locks; single financial outcome path |
| EC-W05 | Rework SLA breach | Escalate dispute/ops; possible reassignment |
| EC-W06 | Claim submitted at warranty timezone boundary | Evaluate `endsAt` using the frozen market timezone (`Asia/Riyadh` for KSA); accept only if server receipt time is inside the documented boundary |
| EC-W07 | Prior claim resolved and warranty still active | Permit a distinct new claim when policy allowance remains; do not terminalize warranty as `claimed` |

---

## 11. Subscription

| ID | Case | Expected behavior |
|----|------|-------------------|
| EC-S01 | Hits daily offer cap | Block with upgrade CTA |
| EC-S02 | Grace period ends mid-day | Entitlements drop; in-progress jobs completable |
| EC-S03 | Seat limit when adding technician | Block; upsell seat |
| EC-S04 | Payment for plan fails | Grace + reminders |

---

## 12. Company

| ID | Case | Expected behavior |
|----|------|-------------------|
| EC-CO01 | Accepted company job unassigned | Dispatch reminders; escalate |
| EC-CO02 | Assigned technician removed | Force reassignment before progress |
| EC-CO03 | Branch deactivated with open coverage | Exclude from new matching; finish existing |

---

## 13. Trust & Safety

| ID | Case | Expected behavior |
|----|------|-------------------|
| EC-F01 | Fraudulent lowball + upsell off-platform | Detect patterns; warn; suspend |
| EC-F02 | Fake reviews ring | Moderation; ranking discount |
| EC-F03 | Abuse / harassment in chat | Report; mute; suspend |
| EC-F04 | KYC document fraud | Reject; ban path |
| EC-F05 | Account suspension | Block privileged actions; show reason + appeal/support |
| EC-F06 | Multiple accounts evasion | Graph checks; link bans |

---

## 14. Catalog / Content

| ID | Case | Expected behavior |
|----|------|-------------------|
| EC-X01 | Service deactivated after draft | Block publish; ask reselect |
| EC-X02 | Price bounds change after offer | Existing offers keep snapshot; new edits validate new bounds |
| EC-X03 | Profanity/PII in request text | Filter/flag per policy |

---

## 15. Notifications

| ID | Case | Expected behavior |
|----|------|-------------------|
| EC-NT01 | Push token invalid | Prune; fallback SMS if critical |
| EC-NT02 | User disabled non-critical push | Honor; keep critical transactional |
| EC-NT03 | Quiet hours | Defer non-critical |

---

## 16. Localization / UX

| ID | Case | Expected behavior |
|----|------|-------------------|
| EC-L01 | Missing Arabic string | Fallback EN + log gap |
| EC-L02 | RTL overflow long amounts | Format SAR safely |
| EC-L03 | Accessibility large font | Layout must not clip CTAs |
| EC-L04 | RTL directional content mixes phone, amount, and date | Preserve reading order, isolate bidirectional tokens, and keep semantic labels associated |
| EC-L05 | Screen reader or keyboard cannot complete critical flow | Block release; provide labels, focus order, focus visibility, and non-gesture alternatives |

---

## 17. Privacy / Retention

| ID | Case | Expected behavior |
|----|------|-------------------|
| EC-D01 | User requests deletion while no legal hold applies | Authenticate request; delete or irreversibly anonymize eligible data by policy; retain only required financial/audit records with purpose and expiry |
| EC-D02 | User requests deletion while dispute, chargeback, warranty claim, or legal hold is open | Restrict processing and hide non-required data; preserve scoped evidence; explain the hold; resume deletion when released |
| EC-D03 | Legal hold is released | Restart the suspended retention/deletion schedule; audit release and eventual disposition |

---

## 18. Resilience / Recovery

| ID | Case | Expected behavior |
|----|------|-------------------|
| EC-R01 | Regional service or Firestore dependency outage | Fail safely for money/exclusivity mutations; communicate degraded state; queue only idempotent work |
| EC-R02 | Restore from backup or point-in-time recovery | Verify referential, ledger, lifecycle, and authorization consistency before reopening writes |
| EC-R03 | Notification/worker backlog after recovery | Replay with idempotency and obsolete-event checks; reconcile projections before declaring recovery complete |

---

## 19. Related Documents

- `STATE_MACHINE.md`
- `ERROR_SCENARIOS.md`
- `BUSINESS_SCENARIOS.md`
- `ACCEPTANCE_CRITERIA.md`
