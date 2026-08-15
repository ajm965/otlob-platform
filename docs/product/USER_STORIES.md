# User Stories

**Project:** Otlob Platform (اطلب ولا تتعنى)  
**Document Type:** Product Bible — User Stories  
**Phase:** 1.9  
**Status:** Baseline  

---

## 1. Purpose

Complete user stories for Customer, Technician, Company, and Admin. Format:

> As a …  
> I want …  
> So that …

IDs are stable references for acceptance criteria and tickets.

Release tags are binding scope metadata. Stories without an inline tag inherit their subsection tag; mixed-release stories must state both scopes explicitly.

---

## 2. Customer Stories

### Identity & Access [`MVP`]

**US-C-001**  
As a guest, I want to understand Otlob’s value before signing up, so that I know why I should register.  

**US-C-002**  
As a new customer, I want to register with my phone number, so that I can request services quickly.  

**US-C-003**  
As a returning customer, I want to log in securely, so that I can access my requests and bookings.  

**US-C-004**  
As a suspended customer, I want to see why I’m blocked and how to contact support, so that I can resolve the issue.

### Home & Catalog [`MVP`]

**US-C-010**  
As a customer, I want a clear home screen with a primary “Create Request” action, so that I can get help immediately.  

**US-C-011**  
As a customer, I want to browse service categories in Arabic, so that I can find the right service type.

### Requests & Offers [`MVP`]

**US-C-020**  
As a customer, I want to create a service request with location and photos, so that technicians understand my problem.  

**US-C-021**  
As a customer, I want nearby technicians to be notified, so that I receive offers quickly.  

**US-C-022**  
As a customer, I want to receive offers with price and ETA, so that I can compare options.  

**US-C-023**  
As a customer, I want to compare offers by price, rating, and ETA, so that I can choose fairly.  

**US-C-024**  
As a customer, I want to accept one offer, so that a booking is created.  

**US-C-025**  
As a customer, I want to reject offers I don’t like, so that my list stays relevant.  

**US-C-026**  
As a customer, I want to cancel a request before booking, so that I’m not committed.

### Payment & Job [`MVP`]

**US-C-030**  
As a customer, I want to pay securely with a clear breakdown including VAT when applicable, so that I trust the charge.  

**US-C-031**  
As a customer, I want to track booking status, so that I know what happens next.  

**US-C-032**  
As a customer, I want to see before/after images, so that I have evidence of work.  

**US-C-033**  
As a customer, I want chat with the provider, so that I can coordinate access and details.

### Trust [`MVP`]

**US-C-040**  
As a customer, I want an automatic warranty after eligible jobs, so that I’m protected if issues return.  

**US-C-041**  
As a customer, I want to claim warranty with evidence, so that rework can be arranged.  

**US-C-042**  
As a customer, I want to leave a review, so that I can help others and reward good work.  

**US-C-043**  
As a customer, I want to open a dispute when something goes wrong, so that the platform can help resolve it.  

**US-C-044**  
As a customer, I want refund status visibility, so that I know when money returns.

### Home Passport & Repeat [`v1.5`, except request-again may be MVP]

**US-C-050**  
As a customer, I want a Home Passport for my property and devices, so that future service is faster and smarter.  

**US-C-051**  
As a customer, I want upcoming maintenance reminders, so that I prevent breakdowns.  

**US-C-052**  
As a customer, I want to repeat a past service quickly, so that I save time.

### Loyalty [`v1.5`]

**US-C-060**  
As a customer, I want to earn points for completed jobs, so that I get rewards for loyalty.  

**US-C-061**  
As a customer, I want to redeem points at checkout, so that I save money.

---

## 3. Technician Stories [`MVP` unless tagged otherwise]

**US-T-001**  
As a technician, I want to register and verify my identity, so that customers can trust me.  

**US-T-002**  
As a technician, I want to complete my profile and services, so that I receive relevant requests.  

**US-T-003 [v1.5]**  
As a technician, I want to choose a subscription plan, so that I get better limits and fees.  

**US-T-004**  
As a technician, I want nearby request alerts, so that I can respond quickly.  

**US-T-005**  
As a technician, I want to submit and edit offers, so that I can compete fairly.  

**US-T-006**  
As a technician, I want to withdraw an offer, so that I don’t overcommit.  

**US-T-007**  
As a technician, I want clear notification when my offer is accepted, so that I can start navigating.  

**US-T-008**  
As a technician, I want navigation to the job, so that I arrive on time.  

**US-T-009**  
As a technician, I want to upload before images to start, so that work evidence is recorded.  

**US-T-010**  
As a technician, I want to upload after images to finish, so that completion is trusted.  

**US-T-011**  
As a technician, I want to see earnings and commissions, so that I understand my net pay.  

**US-T-012 [v1.5]**  
As a technician, I want to withdraw available balance, so that I get paid.  

**US-T-013**  
As a technician, I want to see my performance score tips, so that I can improve.  

**US-T-014**  
As a technician, I want warranty claim alerts, so that I can fulfill rework obligations.  

**US-T-015**  
As a technician, I want chat with customers on bookings, so that I can coordinate access.

---

## 4. Company Stories

All Company stories are `[v1.5 / post-MVP]`; they are not MVP delivery requirements.

**US-CO-001 [v1.5 / post-MVP]**  
As a company owner, I want to register and verify my company, so that we can offer services under our brand.  

**US-CO-002 [v1.5 / post-MVP]**  
As a company manager, I want to create branches with coverage areas, so that we match nearby jobs.  

**US-CO-003 [v1.5 / post-MVP]**  
As a company manager, I want to invite technicians to seats, so that we can scale workforce.  

**US-CO-004 [v1.5 / post-MVP]**  
As a dispatcher, I want to submit company offers, so that we win jobs.  

**US-CO-005 [v1.5 / post-MVP]**  
As a dispatcher, I want to assign technicians to bookings, so that the right person arrives.  

**US-CO-006 [v1.5 / post-MVP]**  
As a company manager, I want operational reports, so that I can manage SLA and quality.  

**US-CO-007 [v1.5 / post-MVP]**  
As an accountant, I want invoices and payout views, so that finance can reconcile.  

**US-CO-008 [v1.5 / post-MVP]**  
As a company owner, I want to manage company subscription and seats, so that entitlements match our size.

---

## 5. Admin Stories [`MVP` unless tagged otherwise]

**US-A-001**  
As an admin, I want a dashboard of marketplace health, so that I can prioritize ops work.  

**US-A-002 [MVP technician verification / v1.5 company verification]**  
As an admin, I want to verify technicians and companies, so that only trusted providers participate.  

**US-A-003**  
As support, I want to inspect user requests and bookings, so that I can help customers.  

**US-A-004**  
As an admin, I want to moderate reviews and abuse, so that the marketplace stays safe.  

**US-A-005**  
As an admin, I want to resolve disputes with evidence, so that outcomes are fair.  

**US-A-006**  
As finance, I want to manage refunds and payment investigations, so that money movement is correct.  

**US-A-007**  
As operations, I want analytics funnels by city/service, so that we improve supply and demand.  

**US-A-008**  
As a super admin, I want to grant elevated entitlements with audit, so that exceptions are controlled.  

**US-A-009**  
As an admin, I want to suspend abusive accounts, so that we protect the community.  

**US-A-010**  
As an admin, I want to manage catalog categories/services, so that customers request the right work.

---

## 6. Related Documents

- `ACCEPTANCE_CRITERIA.md`
- `USER_JOURNEYS.md`
- `PERMISSIONS_MATRIX.md`
