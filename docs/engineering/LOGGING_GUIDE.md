# Logging Guide

**Project:** Otlob Platform (اطلب ولا تتعنى)  
**Document Type:** Engineering Handbook — Logging Strategy  
**Phase:** 1.8  
**Status:** Mandatory  

---

## 1. Purpose

Defines structured logging levels, formats, PII rules, and operational expectations for backend and clients.

---

## 2. Goals

- Debuggability with correlation IDs
- Safe operations without leaking secrets/PII
- Actionable alerts on true problems
- Cost-aware log volumes at GCC scale

---

## 3. Log Levels

| Level | When to use | Examples |
|-------|-------------|----------|
| **Debug** | High-verbosity development diagnostics | Raw query params (sanitized), branch taken |
| **Info** | Normal significant business events | Offer submitted, booking completed |
| **Warning** | Recoverable unexpected situations | Retryable dependency timeout, authz deny spikes |
| **Error** | Failed operations requiring attention | Unhandled exception, payment capture failure |
| **Critical** | Immediate pages / severe impact | Data corruption risk, widespread outage, secret misuse suspicion |

Production default minimum: Info. Debug enabled selectively via config/flags.

---

## 4. Structured Format

Prefer JSON fields:

| Field | Description |
|-------|-------------|
| `timestamp` | ISO time |
| `severity` | debug/info/warn/error/critical |
| `message` | Short human summary |
| `requestId` | Correlation |
| `traceId` | Optional distributed trace |
| `module` | `offers`, `payments`, … |
| `action` | `acceptOffer` |
| `actorId` | uid if available |
| `entityType` / `entityId` | |
| `errorCode` | Stable code |
| `durationMs` | For timed ops |
| `market` | `SA` / future GCC |

---

## 5. What to Log on Hot Paths

- Request start/end with status
- Business state transitions
- External dependency calls (PSP, SMS) with latency + result class
- Idempotency replays
- Auth failures (without token content)

Avoid logging every loop iteration or full large documents.

---

## 6. PII Rules

| Data | Rule |
|------|------|
| Phone / email | Mask (`+966*****123`) or hash for correlation |
| Names | Avoid in routine logs; use ids |
| Addresses | Do not log full free text routinely |
| Chat message bodies | Do not log by default |
| KYC images | Never log; storage paths only if needed |
| Precise lat/long | Prefer geohash prefix if needed |

When support needs PII, use controlled admin tools with audit—not verbose logs.

---

## 7. Sensitive Data (Never Log)

- ID tokens / refresh tokens
- Passwords / OTP codes
- PSP secret keys / webhook secrets
- Raw card data (should never be in our systems)
- Encryption keys
- Full payment provider payloads if they contain sensitive fields—store redacted summaries

---

## 8. Client Logging

| Surface | Practice |
|---------|----------|
| Flutter (future) | Crashlytics for crashes; analytics for funnel; minimal debug in prod |
| Admin | Same PII rules |

Do not use `print`/`console.log` for production diagnostics without wrapping level/gated logger.

---

## 9. Retention & Access

- Retention per env/compliance policy
- Production log access restricted
- Export for incidents controlled

---

## 10. Alerting Hooks

Create alerts on:

- Error/critical rate thresholds
- Payment failure spikes
- Matching empty-result spikes
- Auth anomaly spikes

Logs must be alert-friendly (stable codes, not only free text).

---

## 11. Related Documents

- `ERROR_HANDLING_GUIDE.md`
- `SECURITY_STANDARDS.md`
- `ENGINEERING_GUIDE.md`
