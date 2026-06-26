import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

interface ContactPayload {
  name?: string;
  phone?: string;
  email?: string;
  service?: string;
  message?: string;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!)
  );

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    if (!RESEND_API_KEY) {
      return new Response(JSON.stringify({ error: 'Email service not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const body = (await req.json()) as ContactPayload;
    const name = (body.name || '').toString().trim().slice(0, 120);
    const phone = (body.phone || '').toString().trim().slice(0, 40);
    const email = (body.email || '').toString().trim().slice(0, 160);
    const service = (body.service || '').toString().trim().slice(0, 80);
    const message = (body.message || '').toString().trim().slice(0, 4000);

    if (!name || !message || (!phone && !email)) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const subject = `New Cleaning Request – ${service || 'General'} – ${name}`;
    const html = `
      <div style="font-family:Arial,sans-serif;color:#0d2b4e;max-width:600px;margin:auto">
        <h2 style="color:#3AB5E5;margin-bottom:8px">New Contact Form Submission</h2>
        <p style="color:#555;margin-top:0">From ridgeperfectcleaning.com</p>
        <table style="width:100%;border-collapse:collapse;margin-top:16px">
          <tr><td style="padding:8px;border-bottom:1px solid #eee"><b>Name</b></td><td style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(name)}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee"><b>Phone</b></td><td style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(phone || '—')}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee"><b>Email</b></td><td style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(email || '—')}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee"><b>Service</b></td><td style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(service || '—')}</td></tr>
          <tr><td style="padding:8px;vertical-align:top"><b>Message</b></td><td style="padding:8px;white-space:pre-wrap">${escapeHtml(message)}</td></tr>
        </table>
      </div>
    `;

    const replyTo = email || undefined;

    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Ridge Perfect Cleaning <onboarding@resend.dev>',
        to: ['info@ridgeperfectcleaning.com'],
        subject,
        html,
        reply_to: replyTo,
      }),
    });

    const data = await resp.json().catch(() => ({}));
    if (!resp.ok) {
      console.error('Resend error', resp.status, data);
      return new Response(JSON.stringify({ error: 'Failed to send', details: data }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ ok: true, id: data?.id }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error('send-contact-email error', e);
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
