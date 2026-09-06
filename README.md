# Massif One Backend V1

Production backend foundation for the existing `massif-one.html` frontend.

## Stack
Node.js + TypeScript + Express + Supabase/PostgreSQL + Supabase Auth.

## Implemented foundation
- Health endpoint
- Bearer-token authentication middleware
- Business onboarding and tenant membership
- Products, customers, orders, inventory, invoices, payments
- Koda data endpoints with server-side boundary
- WhatsApp status boundary
- Subscription state/intent
- PostgreSQL RLS and safe inventory/order RPCs

## Not live yet
OpenAI, WhatsApp Cloud API, real payment processing, automated billing webhooks, and production deployment must be configured separately. The backend never claims these are connected until they actually are.

## Setup
1. Create a Supabase project.
2. Run `supabase/migrations/001_initial_schema.sql`.
3. Run `supabase/migrations/002_safe_operations.sql`.
4. Copy `.env.example` to `.env` and fill server-only secrets.
5. Run `npm install`.
6. Run `npm run dev`.

Health: `GET /health`

Protected requests use `Authorization: Bearer <Supabase access token>`.

Never put service-role, OpenAI, WhatsApp, or payment secrets in the frontend.
