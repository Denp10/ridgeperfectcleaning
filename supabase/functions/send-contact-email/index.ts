import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

// ─────────────────────────────────────────────────────────────────────────────
// TEST_MODE = true  → Resend sandbox: can only send FROM onboarding@resend.dev
//                     and TO the Resend account owner's email. No customer ack.
// TEST_MODE = false → Domain verified: send to info@ + acknowledgment to customer.
//
// Switch to false once ridgeperfectcleaning.com is verified at resend.com/domains.
// ─────────────────────────────────────────────────────────────────────────────
const TEST_MODE = true;
const OWNER_EMAIL = 'denspierre10@gmail.com'; // Resend account owner (test-mode recipient)

const FROM_NOTIFY = TEST_MODE
  ? 'Ridge Perfect Cleaning <onboarding@resend.dev>'
  : 'Ridge Perfect Cleaning <noreply@ridgeperfectcleaning.com>';
const FROM_ACK = TEST_MODE
  ? 'Ridge Perfect Cleaning <onboarding@resend.dev>'
  : 'Ridge Perfect Cleaning <info@ridgeperfectcleaning.com>';
const TO_BUSINESS = TEST_MODE ? OWNER_EMAIL : 'info@ridgeperfectcleaning.com';

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

async function sendEmail(payload: Record<string, unknown>) {
  const resp = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const data = await resp.json().catch(() => ({}));
  return { ok: resp.ok, status: resp.status, data };
}

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

    // ── 1. Notification email to the business ──────────────────────────────────
    const subject = `New Cleaning Request – ${service || 'General'} – ${name}`;
    const notifyHtml = `
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

    const notify = await sendEmail({
      from: FROM_NOTIFY,
      to: [TO_BUSINESS],
      subject,
      html: notifyHtml,
      reply_to: email || undefined,
    });

    if (!notify.ok) {
      console.error('Resend notify error', notify.status, notify.data);
      return new Response(JSON.stringify({ error: 'Failed to send', details: notify.data }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // ── 2. Acknowledgment email to the customer ────────────────────────────────
    // Skipped in TEST_MODE: Resend sandbox can't email arbitrary recipients.
    let ackSent = false;
    if (!TEST_MODE && email) {
      const ackHtml = `
        <div style="font-family:Arial,sans-serif;color:#0d2b4e;max-width:600px;margin:auto">
          <h2 style="color:#3AB5E5;margin-bottom:4px">Thank you, ${escapeHtml(name)}!</h2>
          <p style="color:#333;line-height:1.6">
            We've received your request and a member of the Ridge Perfect Cleaning team
            will contact you shortly with your free quote.
          </p>
          <div style="background:#F8FBFF;border-left:4px solid #3AB5E5;padding:12px 16px;margin:18px 0;border-radius:6px">
            <p style="margin:0;color:#555"><b>Service requested:</b> ${escapeHtml(service || 'General inquiry')}</p>
            <p style="margin:8px 0 0;color:#555;white-space:pre-wrap"><b>Your message:</b> ${escapeHtml(message)}</p>
          </div>
          <p style="color:#333;line-height:1.6">
            Need us sooner? Call us at <a href="tel:+15618180778" style="color:#3AB5E5;font-weight:bold">(561) 818-0778</a>
            or message us on WhatsApp.
          </p>
          <p style="color:#0d2b4e;font-weight:bold;margin-top:24px">
            Ridge Perfect Cleaning Solutions<br/>
            <span style="color:#6BC043;font-weight:normal">Better Price · Better Solutions · Perfect Clean</span>
          </p>
          <p style="color:#999;font-size:12px;margin-top:18px">
            Serving all of Palm Beach County, FL · ridgeperfectcleaning.com
          </p>
        </div>
      `;
      const ack = await sendEmail({
        from: FROM_ACK,
        to: [email],
        subject: 'We received your request – Ridge Perfect Cleaning',
        html: ackHtml,
        reply_to: 'info@ridgeperfectcleaning.com',
      });
      ackSent = ack.ok;
      if (!ack.ok) console.error('Resend ack error', ack.status, ack.data);
    }

    return new Response(JSON.stringify({ ok: true, id: notify.data?.id, ackSent }), {
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
