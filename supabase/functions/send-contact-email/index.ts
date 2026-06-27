import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

// ─────────────────────────────────────────────────────────────────────────────
// TEST_MODE = true  → Resend sandbox: can only send FROM onboarding@resend.dev
//                     and TO the Resend account owner's email. No customer ack.
// TEST_MODE = false → Domain verified: send to info@ + acknowledgment to customer.
//
// Switch to false once ridgeperfectcleaning.com is verified at resend.com/domains.
// ─────────────────────────────────────────────────────────────────────────────
const TEST_MODE = false;
const OWNER_EMAIL = 'denspierre10@gmail.com'; // Resend account owner (test-mode recipient)

const FROM_NOTIFY = TEST_MODE
  ? 'Ridge Perfect Cleaning <onboarding@resend.dev>'
  : 'Ridge Perfect Cleaning <noreply@ridgeperfectcleaning.com>';
const FROM_ACK = TEST_MODE
  ? 'Ridge Perfect Cleaning <onboarding@resend.dev>'
  : 'Ridge Perfect Cleaning <noreply@ridgeperfectcleaning.com>';
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

// ── Branded email shell ───────────────────────────────────────────────────────
const brandHeader = `
  <div style="background:#0D2B4E;padding:26px 32px;text-align:center">
    <div style="font-size:22px;font-weight:800;letter-spacing:1px;color:#ffffff;font-family:Arial,Helvetica,sans-serif">
      RIDGE <span style="color:#3AB5E5">PERFECT</span> CLEANING
    </div>
    <div style="font-size:11px;color:#9fb3c8;letter-spacing:3px;text-transform:uppercase;margin-top:5px">
      Cleaning Beyond Expectations
    </div>
  </div>`;

const brandFooter = `
  <div style="background:#F8FBFF;padding:22px 32px;text-align:center;border-top:1px solid #e8eef5">
    <div style="font-size:13px;font-weight:700;color:#0D2B4E;margin-bottom:8px">
      <span style="color:#3AB5E5">Better Price</span> &middot; Better Solutions &middot; <span style="color:#6BC043">Perfect Clean</span>
    </div>
    <div style="font-size:12px;color:#7a8aa0;line-height:1.7">
      <a href="tel:+15618180778" style="color:#3AB5E5;text-decoration:none">(561) 818-0778</a>
      &nbsp;&middot;&nbsp;
      <a href="mailto:info@ridgeperfectcleaning.com" style="color:#3AB5E5;text-decoration:none">info@ridgeperfectcleaning.com</a><br/>
      Serving all of Palm Beach County, FL &middot;
      <a href="https://ridgeperfectcleaning.com" style="color:#3AB5E5;text-decoration:none">ridgeperfectcleaning.com</a>
    </div>
  </div>`;

const emailShell = (inner: string) => `
  <div style="background:#eef2f7;padding:24px 12px;font-family:Arial,Helvetica,sans-serif;-webkit-font-smoothing:antialiased">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 4px 18px rgba(13,43,78,.10)">
      ${brandHeader}
      <div style="padding:30px 32px">${inner}</div>
      ${brandFooter}
    </div>
  </div>`;

const row = (label: string, value: string) =>
  `<tr>
     <td style="padding:11px 0;border-bottom:1px solid #eef2f7;color:#7a8aa0;font-size:13px;width:90px;vertical-align:top">${label}</td>
     <td style="padding:11px 0;border-bottom:1px solid #eef2f7;color:#0D2B4E;font-size:14px;font-weight:600;white-space:pre-wrap">${value}</td>
   </tr>`;

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

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // ── 1. Notification email to the business ──────────────────────────────────
    const subject = `New Cleaning Request – ${service || 'General'} – ${name}`;
    const notifyHtml = emailShell(`
      <h1 style="font-size:19px;color:#0D2B4E;margin:0 0 4px">New Cleaning Request 🧽</h1>
      <p style="color:#7a8aa0;font-size:13px;margin:0 0 22px">A new lead just came in from your website.</p>
      <table style="width:100%;border-collapse:collapse">
        ${row('Name', escapeHtml(name))}
        ${row('Phone', escapeHtml(phone || '—'))}
        ${row('Email', escapeHtml(email || '—'))}
        ${row('Service', escapeHtml(service || '—'))}
        ${row('Message', escapeHtml(message))}
      </table>
      <div style="text-align:center;margin-top:26px">
        <a href="mailto:${escapeHtml(email)}?subject=Re: Your cleaning request" style="display:inline-block;background:#3AB5E5;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:12px 28px;border-radius:999px">
          Reply to ${escapeHtml(name)}
        </a>
      </div>
    `);

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
      const ackHtml = emailShell(`
        <h1 style="font-size:21px;color:#0D2B4E;margin:0 0 10px">Thank you, ${escapeHtml(name)}! 🎉</h1>
        <p style="color:#3a4a5c;font-size:15px;line-height:1.65;margin:0 0 6px">
          We've received your request and a member of our team will contact you shortly
          with your <b style="color:#0D2B4E">free, no-obligation quote</b>.
        </p>
        <div style="background:#F8FBFF;border:1px solid #e3eef7;border-left:4px solid #3AB5E5;padding:16px 18px;margin:22px 0;border-radius:8px">
          <p style="margin:0 0 8px;color:#7a8aa0;font-size:12px;text-transform:uppercase;letter-spacing:1px">Your request</p>
          <p style="margin:0 0 6px;color:#0D2B4E;font-size:14px"><b>Service:</b> ${escapeHtml(service || 'General inquiry')}</p>
          <p style="margin:0;color:#3a4a5c;font-size:14px;white-space:pre-wrap"><b style="color:#0D2B4E">Message:</b> ${escapeHtml(message)}</p>
        </div>
        <p style="color:#3a4a5c;font-size:15px;line-height:1.65;margin:0 0 20px">
          Need us sooner? We're here to help.
        </p>
        <div style="text-align:center;margin:0 0 6px">
          <a href="tel:+15618180778" style="display:inline-block;background:#3AB5E5;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:12px 26px;border-radius:999px;margin:0 4px 8px">
            📞 Call (561) 818-0778
          </a>
          <a href="https://wa.me/15618180778" style="display:inline-block;background:#25D366;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:12px 26px;border-radius:999px;margin:0 4px 8px">
            💬 WhatsApp
          </a>
        </div>
      `);
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
