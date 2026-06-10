# StudioFlow - Simple management software for small professional studios.

## What you received
The online site is a demo (local data). This code is the complete app, ready to become real by connecting your own services.

## Requirements
Node.js 18+, Supabase account, Stripe account, Resend account.

## Installation
cd server && npm install
cd ../client && npm install

## Configuration (.env)
Server (process.env):
STRIPE_SECRET_KEY: Stripe secret key
STRIPE_WEBHOOK_SECRET: Stripe webhook secret
RESEND_API_KEY: Resend API key
EMAIL_FROM: Verified sender email
SUPABASE_SERVICE_KEY: Supabase service role key

Client (VITE_*):
VITE_API_URL: Backend URL (e.g., http://localhost:4000)
VITE_SUPABASE_URL: Supabase project URL
VITE_SUPABASE_ANON_KEY: Supabase anon key

## Database
CREATE TABLE clients (id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, user_id UUID, name TEXT, email TEXT, phone TEXT, created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW());
CREATE TABLE appointments (id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, user_id UUID, client_id UUID REFERENCES clients(id), title TEXT, date TIMESTAMP WITH TIME ZONE, status TEXT, created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW());
CREATE TABLE invoices (id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, user_id UUID, client_id UUID REFERENCES clients(id), amount NUMERIC, status TEXT, date DATE, created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW());

## Run locally
Backend: cd server && node index.js
Frontend: cd client && npm run dev
Set VITE_API_URL to connect frontend to backend.

## Go live (production)
Deploy frontend on Vercel, backend on Render/Railway. Set env variables on both platforms.

## Enable payments
Configure prices on Stripe Dashboard and connect the keys in .env.