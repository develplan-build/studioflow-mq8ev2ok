require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');
const { Resend } = require('resend');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = 4000;

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const supabase = (process.env.VITE_SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY) ? createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY) : null;

app.post('/api/webhook', express.raw({type: 'application/json'}), (req, res) => {
  if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) return res.status(503).send('Stripe non configurato');
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  if (event.type === 'checkout.session.completed') {
    console.log('Pagamento completato:', event.data.object);
  }
  res.json({received: true});
});

app.use(cors());
app.use(express.json());

app.post('/api/checkout', async (req, res) => {
  if (!stripe) return res.status(503).json({ error: 'Stripe non configurato: aggiungi STRIPE_SECRET_KEY' });
  try {
    const { priceId, successUrl, cancelUrl } = req.body;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: successUrl,
      cancel_url: cancelUrl,
    });
    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/email/send', async (req, res) => {
  if (!resend) return res.status(503).json({ error: 'Resend non configurato' });
  try {
    const { to, subject, html } = req.body;
    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
      to,
      subject,
      html
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/demo/status', (req, res) => {
  res.json({ status: 'ok', services: { stripe: !!stripe, resend: !!resend, supabase: !!supabase } });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server in ascolto su porta ${PORT}`);
});