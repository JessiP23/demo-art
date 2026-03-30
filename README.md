# ArtMatch

ArtMatch is an AI-powered brokerage product for first-time affluent collectors.  
This implementation includes authentication, taste onboarding, explainable recommendations, fair-value pricing, room preview, concierge operations, checkout, subscription, and admin workflows.

## Tech Stack

- Next.js App Router + TypeScript
- Tailwind CSS + shadcn-style UI primitives
- Zustand + TanStack Query
- Stripe (checkout + subscription, with mock fallback)
- Supabase client wiring (with local mock data layer for end-to-end local use)
- Uploadthing (room image upload)
- Resend (email notifications, with mock fallback)
- Framer Motion

## Local Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Demo login:
- Email: `collector@artmatch.app`
- Password: `password123`

## Environment Variables

Set these in `.env.local` for production-grade integrations:

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

STRIPE_SECRET_KEY=
STRIPE_PRO_PRICE_ID=

UPLOADTHING_TOKEN=

RESEND_API_KEY=
RESEND_FROM_EMAIL=notifications@yourdomain.com
```

Behavior:
- If Stripe keys are missing, checkout/subscription use mock sessions.
- If Resend variables are missing, concierge notifications are mocked.
- Supabase client is initialized only when Supabase env vars exist.

## Product Routes

- `/` landing
- `/auth` authentication
- `/onboard` taste profile setup (12 dimensions)
- `/recommendations` personalized matches
- `/artwork/[id]` artwork detail + fair value + momentum
- `/room-preview/[id]` room intelligence upload + preview generation
- `/concierge` concierge request workflow
- `/checkout/[session]` purchase checkout
- `/profile` saved works, subscription, transactions
- `/admin` inventory management, concierge approval, analytics

## API Routes

- `POST /api/checkout`
- `POST /api/subscription`
- `POST /api/concierge/notify`
- `GET /api/analytics`
- `GET/POST /api/uploadthing`

## Supabase Schema (Target)

```sql
create table users (
  id uuid primary key,
  email text unique not null,
  taste_profile jsonb,
  subscription_tier text not null default 'free'
);

create table artworks (
  id text primary key,
  title text not null,
  artist text not null,
  image_url text not null,
  price_range jsonb not null,
  fair_value_score int not null,
  momentum_score int not null
);

create table recommendations (
  user_id uuid not null,
  artwork_id text not null,
  match_score int not null,
  rationale text not null
);

create table concierge_requests (
  id uuid primary key,
  user_id uuid not null,
  artwork_id text not null,
  status text not null
);

create table transactions (
  id uuid primary key,
  user_id uuid not null,
  artwork_id text not null,
  amount numeric not null,
  commission numeric not null
);
```

## Quality Checks

```bash
npm run lint
npm run build
```

Both pass in current state.

## Vercel Deployment

1. Import repository in Vercel.
2. Add all environment variables listed above.
3. Deploy with:
   - Build command: `npm run build`
   - Output: `.next`
