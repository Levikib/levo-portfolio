<div align="center">

<br />

```
███╗   ███╗ █████╗ ██╗  ██╗███████╗     ██╗ █████╗     ██╗  ██╗ ██████╗ ███╗   ███╗███████╗███████╗
████╗ ████║██╔══██╗██║ ██╔╝██╔════╝     ██║██╔══██╗    ██║  ██║██╔═══██╗████╗ ████║██╔════╝██╔════╝
██╔████╔██║███████║█████╔╝ █████╗       ██║███████║    ███████║██║   ██║██╔████╔██║█████╗  ███████╗
██║╚██╔╝██║██╔══██║██╔═██╗ ██╔══╝  ██   ██║██╔══██║    ██╔══██║██║   ██║██║╚██╔╝██║██╔══╝  ╚════██║
██║ ╚═╝ ██║██║  ██║██║  ██╗███████╗╚█████╔╝██║  ██║    ██║  ██║╚██████╔╝██║ ╚═╝ ██║███████╗███████║
╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝ ╚════╝ ╚═╝  ╚═╝    ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝╚══════╝
```

**Production-grade residential property management SaaS · Built solo · Nairobi, Kenya**

[![Status](https://img.shields.io/badge/status-live-brightgreen?style=flat-square)](https://makejahomes.co.ke)
[![Units](https://img.shields.io/badge/units_managed-170%2B-purple?style=flat-square)](https://makejahomes.co.ke)
[![Volume](https://img.shields.io/badge/monthly_volume-KSH_1.5M-blue?style=flat-square)](https://makejahomes.co.ke)
[![Stack](https://img.shields.io/badge/stack-Next.js_14_·_Prisma_·_PostgreSQL-orange?style=flat-square)](https://makejahomes.co.ke)
[![Built By](https://img.shields.io/badge/built_by-1_engineer-red?style=flat-square)](https://github.com/Levikib)

</div>

---

## What This Is

Makeja Homes is a **multi-tenant SaaS platform** for residential property management in Kenya. It handles the full lifecycle of a rental property business — units, tenants, leases, bills, payments, and automated communications — in a single production system.

**Built by one engineer. Zero external funding. Live with real landlords managing real money.**

---

## Numbers That Matter

| Metric | Value |
|--------|-------|
| Residential units managed | **170+** |
| Monthly transaction volume | **KSH 1,500,000+** |
| Payment processor | **Paystack** |
| Database provider | **Neon (PostgreSQL)** |
| Deployment | **Vercel + custom VPS** |
| Team size at launch | **1** |

---

## Core Features

### 🏠 Property & Unit Management
- Multi-property support with per-property configuration
- Unit creation, categorisation, and status tracking
- Unit-switching workflow for tenants transferring between units
- Occupancy dashboard with real-time status

### 👥 Tenant Management
- Full tenant onboarding and profile management
- Lease creation with start/end dates and custom terms
- Automated lease expiry detection with email reminders (30, 14, 7 days)
- Tenant portal for payment history and lease documents

### 💳 Billing & Payments
- `monthly_bills` as the single source of truth — DB-driven, not logic-driven
- Automated bill generation with configurable recurring charges
- Multi-property recurring charges schema
- Paystack payment integration with full webhook pipeline
- Automated payment receipts via Resend on successful webhook events
- Bill status lifecycle: `pending → initiated → paid → overdue`
- Payment reconciliation and landlord payout tracking

### 📧 Automated Communications
- Lease expiry reminder sequences (cron-job driven)
- Payment confirmation receipts (webhook-triggered)
- Overdue payment notifications
- All email via Resend with custom HTML templates

### 📊 Financial Dashboard
- Monthly transaction volume tracking
- Unit occupancy rates
- Bill collection status (outstanding vs collected)
- Tenant-level payment history

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Next.js 14 App                    │
│              (App Router + TypeScript)               │
├──────────────┬──────────────┬───────────────────────┤
│   Dashboard  │  Tenant UI   │     Admin Panel        │
│   (SSR/RSC)  │  (Client)    │     (Protected)        │
└──────┬───────┴──────┬───────┴────────────┬──────────┘
       │              │                    │
┌──────▼──────────────▼────────────────────▼──────────┐
│                   API Routes Layer                   │
│         /api/bills  /api/payments  /api/tenants      │
│              /api/webhooks/paystack                  │
└──────────────────────┬──────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────┐
│                   Prisma ORM                         │
│              (Type-safe DB client)                   │
└──────────────────────┬──────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────┐
│            PostgreSQL — Neon (serverless)            │
│                                                      │
│  properties → units → tenants → leases              │
│       └──────────── monthly_bills ──────────────┐   │
│                          │                      │   │
│                     payments ──────────→ receipts   │
└─────────────────────────────────────────────────────┘
```

---

## Payment Flow

```
Tenant initiates payment
        │
        ▼
POST /api/payments/initiate
  → Create pending bill record
  → Call Paystack Initialize API
  → Return payment URL
        │
        ▼
Tenant completes payment on Paystack
        │
        ▼
Paystack sends webhook → POST /api/webhooks/paystack
  → Verify HMAC signature (X-Paystack-Signature)
  → Validate idempotency (check reference not already processed)
  → Update bill status: pending → paid
  → Create payment record with metadata
  → Trigger receipt email via Resend
  → Return 200 OK
```

---

## Database Schema (Core Tables)

```prisma
model Property {
  id         String   @id @default(cuid())
  name       String
  ownerId    String
  units      Unit[]
  createdAt  DateTime @default(now())
}

model Unit {
  id           String   @id @default(cuid())
  propertyId   String
  property     Property @relation(fields: [propertyId], references: [id])
  unitNumber   String
  monthlyRent  Decimal
  status       UnitStatus // VACANT | OCCUPIED | MAINTENANCE
  tenancies    Tenancy[]
  bills        MonthlyBill[]
}

model Tenancy {
  id          String   @id @default(cuid())
  unitId      String
  unit        Unit     @relation(fields: [unitId], references: [id])
  tenantId    String
  tenant      Tenant   @relation(fields: [tenantId], references: [id])
  startDate   DateTime
  endDate     DateTime?
  status      TenancyStatus // ACTIVE | EXPIRED | TERMINATED
  bills       MonthlyBill[]
}

model MonthlyBill {
  id            String      @id @default(cuid())
  tenancyId     String
  tenancy       Tenancy     @relation(fields: [tenancyId], references: [id])
  unitId        String
  unit          Unit        @relation(fields: [unitId], references: [id])
  month         Int
  year          Int
  rentAmount    Decimal
  waterAmount   Decimal     @default(0)
  garbageAmount Decimal     @default(0)
  otherCharges  Decimal     @default(0)
  totalAmount   Decimal
  status        BillStatus  // PENDING | INITIATED | PAID | OVERDUE
  payments      Payment[]
  createdAt     DateTime    @default(now())
}

model Payment {
  id              String   @id @default(cuid())
  billId          String
  bill            MonthlyBill @relation(fields: [billId], references: [id])
  amount          Decimal
  paystackRef     String   @unique
  channel         String
  status          String
  paidAt          DateTime?
  metadata        Json?
  receiptSent     Boolean  @default(false)
}
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| UI | React + Tailwind CSS |
| ORM | Prisma |
| Database | PostgreSQL (Neon serverless) |
| Payments | Paystack API + Webhooks |
| Email | Resend |
| Auth | NextAuth.js |
| Deployment | Vercel + VPS (Nginx + PM2) |
| CI/CD | GitHub → Vercel (auto-deploy) |

---

## Engineering Decisions

### Why `monthly_bills` as single source of truth?
Early versions generated bill data on the fly from lease + charge configurations. This created inconsistencies when charges changed mid-month and made the payment reconciliation logic brittle. The nuclear rebuild made `monthly_bills` a persistent DB record — generated once, mutated only by payments and admin overrides. Dramatically simplified the entire payment pipeline.

### Why Neon PostgreSQL over PlanetScale?
Neon's serverless branching fits the multi-tenant development workflow. Branch-per-feature for schema migrations without touching production. PlanetScale's vitess-based MySQL doesn't support foreign key constraints — a deal-breaker for the relational billing schema.

### Why Paystack over Stripe?
Simple: Kenyan landlords and tenants pay via M-Pesa and local cards. Paystack has first-class Kenyan support. Stripe's M-Pesa integration is a separate product with additional friction. Paystack webhooks are reliable and the SDK is well-maintained.

### Webhook Idempotency
Every payment webhook verifies the Paystack signature first, then checks the `paystackRef` against existing payment records before processing. Duplicate webhook deliveries are a production reality — the check ensures a payment is never double-counted.

---

## What I'd Do Differently

- **Background jobs**: Cron jobs currently run via Vercel's edge functions. For scale, I'd move to a proper queue (Bull/BullMQ + Redis) for webhook processing and email sending
- **Database connection pooling**: Neon serverless handles this well, but at higher traffic I'd add PgBouncer
- **Event sourcing for bills**: The current mutation-based bill system works but an event log would make audit trails and disputes easier to handle
- **Real-time updates**: Payment status updates currently require a page refresh. Socket.io or Pusher would make the dashboard feel live

---

## Status

> **🟢 Live in production.** Real landlords. Real tenants. Real money flowing through the system every month.

This repository represents active, production software — not a portfolio demo. The core billing and payment infrastructure has been running without data loss or payment processing failures since launch.

---

## Builder

**Levis Kibirie** — Founding Fullstack Engineer

- 🌍 Nairobi, Kenya
- 🐙 [github.com/Levikib](https://github.com/Levikib)
- 💼 [linkedin.com/in/levis-kibirie-6bba13344](https://linkedin.com/in/levis-kibirie-6bba13344)
- 🌐 [levis.makejahomes.co.ke](https://levis.makejahomes.co.ke)

---

<div align="center">
<sub>Built with TypeScript, PostgreSQL, and an unreasonable amount of late nights — from Nairobi to the world.</sub>
</div>
