# Notification Engine

**Project:** Otlob Platform (اطلب ولا تتعنى)  
**Document Type:** Business Engine Specification  
**Engine ID:** `notification`  
**Phase:** 1.5 — Business Engines  
**Status:** Design baseline  
**Scale Target:** Millions of users across KSA and future GCC markets  

---

## 1. Purpose

The Notification Engine delivers timely, localized, preference-aware messages across **push, SMS, email, and in-app** channels. It owns templates, routing, reminder schedules, escalation, deduplication, and delivery status—not business decisions themselves.

---

## 2. Design Goals

| Goal | Requirement |
|------|-------------|
| Reliability | At-least-once processing with idempotent sends |
| Relevance | Respect preferences, quiet hours, role context |
| Localization | Arabic primary, English secondary |
| Cost control | SMS/email used selectively |
| Scale | Fan-out for matching waves without melting providers |
| Observability | Delivery/read/failure metrics |

---

## 3. Channels

### 3.1 Push Notifications (FCM)

| Use | Examples |
|-----|----------|
| Real-time marketplace | New nearby request, new offer, offer accepted |
| Job ops | Job starting soon, booking updates |
| Trust | Dispute updates, warranty issued |

Requirements:

- Device token registry with pruning
- Platform payloads (iOS/Android) + data deep links
- Collapse keys for replacing outdated status pushes

### 3.2 SMS

| Use | Examples |
|-----|----------|
| High-priority | OTP (Auth), booking confirmed, payment failures |
| Fallback | Critical alerts when push disabled/uninstalled |

Constraints:

- Higher cost → strict template allowlist
- E.164 phone numbers
- Opt-in/legal compliance per market
- Rate limits per user

### 3.3 Email

| Use | Examples |
|-----|----------|
| Receipts | Invoices, payment receipts |
| Summaries | Weekly earnings, dispute resolutions |
| Formal | Account suspensions, policy notices |

Constraints:

- Verified sending domains
- AR/EN templates
- Unsubscribe for marketing categories only (transactional exempt where lawful)

### 3.4 In-App Notifications

| Use | Examples |
|-----|----------|
| Persistent inbox | All major events |
| Badge counts | Unread |
| Low urgency | Tips, soft reminders |

In-app records are the system of record for user notification history.

---

## 4. Notification Record (Logical)

| Field | Description |
|-------|-------------|
| `userId` | Recipient |
| `type` | Event type code |
| `titleAr` / `titleEn` | Or template key + params |
| `bodyAr` / `bodyEn` | |
| `data` | Deep link entity refs |
| `channelsRequested` | push/sms/email/in_app |
| `channelsDelivered` | Results map |
| `status` | pending/sent/partial/failed/read |
| `priority` | low/normal/high/critical |
| `dedupeKey` | Idempotency |
| `relatedEntityType` / `Id` | request/offer/booking/... |

---

## 5. Event Catalog (Core)

| Type code | Typical channels | Audience |
|-----------|------------------|----------|
| `request_published_nearby` | push, in_app | Matched providers |
| `offer_received` | push, in_app | Customer |
| `offer_updated` | push, in_app | Customer |
| `offer_accepted` | push, in_app, SMS optional | Winner provider |
| `offer_rejected` | push, in_app | Provider |
| `offer_expired` | in_app | Provider |
| `booking_confirmed` | push, in_app, SMS/email | Both parties |
| `booking_starting_soon` | push, SMS optional | Both |
| `job_started` | push, in_app | Customer |
| `job_completed` | push, in_app | Customer |
| `payment_failed` | push, SMS, email | Payer |
| `warranty_activated` | push, in_app, email | Customer |
| `warranty_claim_update` | push, in_app | Parties |
| `dispute_opened` | push, in_app, email | Counterparty + admin ops |
| `dispute_resolved` | push, in_app, email | Parties |
| `subscription_past_due` | push, email, SMS | Provider |
| `loyalty_reward_earned` | in_app, push optional | User |
| `admin_broadcast` | varies | Segmented |

Admin may add types via config without code changes where possible.

---

## 6. Routing Rules

### 6.1 Priority → Channel Matrix (defaults)

| Priority | In-app | Push | SMS | Email |
|----------|:------:|:----:|:---:|:-----:|
| low | ✓ | optional | — | — |
| normal | ✓ | ✓ | — | optional |
| high | ✓ | ✓ | fallback | ✓ if receipt-like |
| critical | ✓ | ✓ | ✓ | ✓ |

### 6.2 User Preferences

Users can disable non-critical categories. Critical transactional notifications cannot be fully disabled (legal/safety exceptions documented per market).

### 6.3 Quiet Hours

- Default quiet hours local (e.g., 23:00–08:00) for non-critical
- Emergency matching / payment failure may bypass
- Company dispatchers may have different quiet hour profiles

### 6.4 Locale

- Prefer `users.locale`
- Always store AR+EN or key+params for replay

---

## 7. Reminder Rules

Reminders are scheduled follow-ups if state has not progressed.

| Reminder | Condition | Timing examples |
|----------|-----------|-----------------|
| Customer choose offer | Request open with ≥1 offer, no accept | +30m, +2h |
| Provider respond | Matched, no offer yet | +10m (emergency faster) |
| Upcoming booking | Confirmed booking | T-24h, T-2h |
| Complete job | In progress too long | +X hours after start |
| Review request | Completed, no review | +2h, +24h, +72h (stop after) |
| Subscription renewal | Before endsAt | T-3d, T-1d |
| Dispute evidence | Awaiting party | +24h |

### Reminder Controls

- Max reminders per type
- Cancel on state change
- Dedupe against fresh primary events

---

## 8. Escalation

Escalation raises urgency or audience when SLAs breach.

| Scenario | Escalation path |
|----------|-----------------|
| Emergency request unmatched | Expand matching waves + SMS to top providers |
| Provider no-show risk | High push + SMS to provider; notify customer; alert ops |
| Payment failed repeatedly | Email + SMS; lock job start; ops ticket |
| Dispute SLA breach | Notify senior admin queue |
| Warranty rework SLA breach | Escalate to Dispute / ops |
| Subscription grace ending | SMS + email final notice |

Escalations create ops tasks where configured, not only user messages.

---

## 9. Matching Wave Coordination

Works with Matching Engine:

1. Bucket 0 notified immediately
2. Wait `waveDelay`
3. If insufficient offers, notify next bucket
4. Respect `maxNotifyPerRequest` and provider daily notice caps
5. Stop waves when offer cap reached or request closed

This prevents thundering herds at city scale.

---

## 10. Deduplication & Idempotency

| Mechanism | Purpose |
|-----------|---------|
| `dedupeKey` | Same event not spammed (e.g., `offer_received:{offerId}`) |
| Collapse keys | Replace outdated push for same booking status |
| Token fan-out limits | Cap devices per user |

At-least-once queue workers must check dedupe before expensive SMS.

---

## 11. Delivery Status & Retries

| Channel | Retry policy intent |
|---------|---------------------|
| Push | Retry transient FCM errors; prune invalid tokens |
| SMS | Limited retries; provider outage backoff |
| Email | Bounce handling; suppress bad addresses |
| In-app | Durable write; mark read by user |

Partial success allowed (`push ok`, `sms failed`).

---

## 12. Template System

- Template ID + version
- Parameters validated
- AR and EN bodies required for user templates
- Deep link schema documented (`otlob://...` or https links)
- Marketing vs transactional template classes

No free-form admin SMS without template approval in production.

---

## 13. Security & Privacy

- Do not put sensitive document contents in push bodies
- Mask phone/email in logs
- Authorize sender services only
- Admin broadcasts require role + audit
- Respect chat privacy—don’t leak message text to wrong uid

---

## 14. Scale Architecture Notes

- Queue-based async dispatch
- Partition by market/user shard
- Separate high-priority queue for OTP/payments
- Rate limiters per channel globally and per user
- Archive old in-app notifications (TTL/retention policy)
- GCC: local SMS providers per country possible behind port

---

## 15. Observability KPIs

- Send success rate by channel
- Push open rate
- SMS cost per booking
- Reminder conversion (did user act)
- Unmatched emergency escalation count
- Preference opt-out rates

---

## 16. Non-Goals

- Marketing CRM journeys beyond transactional/lifecycle basics (can integrate later)
- In-chat messaging transport (Messaging domain)
- Making match/offer business decisions

---

## 17. Related Documents

- `MATCHING_ENGINE.md`
- `OFFERS_ENGINE.md`
- `WARRANTY_ENGINE.md`
- `DISPUTE_ENGINE.md`
- `SUBSCRIPTION_ENGINE.md`
- `LOYALTY_ENGINE.md`
- `../API.md`
- `../SECURITY.md`

---

## 18. Canonical Policy — SMS Consent, Caps, and Recovery

KSA v1 is in-app and push first. Matching SMS is disabled for normal and same-day requests. It is allowed only for an emergency escalation after push delivery or reachability has failed, and only for a provider who has explicitly consented to emergency marketplace SMS.

Hard KSA v1 caps are: one SMS per recipient per business event; two emergency matching SMS messages per provider in 24 hours; ten matching SMS recipients per request; and five non-OTP transactional SMS messages per user in 24 hours. Subscription reminders are limited to one SMS in 24 hours and two per billing failure episode. Caps apply across retries and templates through the business dedupe key. OTP and security alerts use a separate, security-owned limiter and do not create capacity for marketplace SMS.

Consent records are versioned by country, purpose, channel, source, and timestamp. Withdrawal stops optional SMS immediately. Legally required transactional notices rely on the applicable market policy and still obey anti-abuse limits. Quiet-hour bypass never bypasses consent or caps. When a cap blocks SMS, the engine records `sms_cap_reached`, continues eligible in-app/push/email delivery, and does not retry SMS for the same event.

All dispatch follows the shared outbox/inbox contract in the engine index. The canonical notification idempotency key combines recipient, business event ID, notification type, and template version. Channel delivery attempts are children of that notification and cannot create another logical message. Reconciliation compares requested channels with terminal delivery records, retries only transient eligible failures, and never repeats a capped or permanently rejected SMS.
