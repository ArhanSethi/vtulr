/**
 * vtulr-forms — Cloudflare Worker form backend
 *
 * Receives multipart/form-data POSTs from the Contact and Submit forms on
 * vtulr.org, stores any uploaded file in R2, and emails a notification
 * (with a link to the file) via Resend. Free forever at this scale:
 * Workers (100k req/day free), R2 (10GB storage free, no egress fees),
 * Resend (3,000 emails/month free).
 *
 * Deploy: wrangler deploy
 * Secrets (set once via `wrangler secret put <NAME>`):
 *   RESEND_API_KEY  — Resend API key
 *   NOTIFY_EMAIL    — where notifications should be sent
 *   CONTACT_KEY     — access_key the contact form must send
 *   SUBMIT_KEY      — access_key the submit form must send
 */

const FORMS = {
  // access_key -> { label, requiredFields }
  // resolved at request time against env.CONTACT_KEY / env.SUBMIT_KEY
};

function corsHeaders(env) {
  return {
    'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function json(data, status, env) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders(env) },
  });
}

function safeFileName(name) {
  return String(name || 'file').replace(/[^a-zA-Z0-9._-]/g, '_').slice(-120);
}

async function sendEmail(env, subject, textLines) {
  if (!env.RESEND_API_KEY || !env.NOTIFY_EMAIL) {
    console.log('sendEmail skipped: missing RESEND_API_KEY or NOTIFY_EMAIL secret');
    return;
  }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.FROM_EMAIL || 'onboarding@resend.dev',
      to: [env.NOTIFY_EMAIL],
      subject,
      text: textLines.join('\n'),
    }),
  });
  const body = await res.text();
  if (!res.ok) {
    console.log(`Resend error ${res.status}: ${body}`);
  } else {
    console.log(`Resend accepted: ${body}`);
  }
}

const LANDING_PAGE = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>VTULR Form Backend</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: -apple-system, 'Lato', sans-serif;
    background: #861F41;
    color: #fff;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 24px;
  }
  .card { max-width: 420px; }
  h1 {
    font-family: Georgia, 'Newsreader', serif;
    font-weight: 400;
    font-size: 1.8rem;
    margin-bottom: 12px;
  }
  p { color: rgba(255,255,255,0.75); line-height: 1.6; font-size: 0.95rem; margin-bottom: 24px; }
  a {
    display: inline-block;
    color: #fff;
    background: #E5751F;
    text-decoration: none;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 12px 24px;
  }
  a:hover { background: #c45e0e; }
</style>
</head>
<body>
  <div class="card">
    <h1>VTULR Form Backend</h1>
    <p>This is a private API endpoint that powers the Contact and Submit forms on vtulr.org. There's nothing to see here directly.</p>
    <a href="https://vtulr.org">Go to VTULR &rarr;</a>
  </div>
</body>
</html>`;

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders(env) });
    }

    if (request.method === 'GET') {
      return new Response(LANDING_PAGE, {
        headers: { 'Content-Type': 'text/html; charset=UTF-8' },
      });
    }

    if (request.method !== 'POST') {
      return json({ success: false, message: 'Method not allowed' }, 405, env);
    }

    let formData;
    try {
      formData = await request.formData();
    } catch (err) {
      return json({ success: false, message: 'Invalid form data' }, 400, env);
    }

    const accessKey = formData.get('access_key');
    let formLabel = null;
    let thanksPage = null;
    if (accessKey && env.CONTACT_KEY && accessKey === env.CONTACT_KEY) {
      formLabel = 'Contact';
      thanksPage = 'https://vtulr.org/contact-thanks.html';
    }
    if (accessKey && env.SUBMIT_KEY && accessKey === env.SUBMIT_KEY) {
      formLabel = 'Submission';
      thanksPage = 'https://vtulr.org/submit-thanks.html';
    }

    if (!formLabel) {
      return json({ success: false, message: 'Invalid or missing access_key' }, 403, env);
    }

    // Honeypot: if the hidden "_gotcha" field is filled, silently pretend success.
    if (formData.get('_gotcha')) {
      return Response.redirect(thanksPage, 303);
    }

    const fields = [];
    const fileLinks = [];

    for (const [key, value] of formData.entries()) {
      if (key === 'access_key' || key === '_gotcha') continue;

      if (value instanceof File && value.size > 0) {
        const key2 = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}-${safeFileName(value.name)}`;
        await env.UPLOADS.put(key2, value.stream(), {
          httpMetadata: { contentType: value.type || 'application/octet-stream' },
        });
        const publicBase = env.PUBLIC_R2_URL; // e.g. https://pub-xxxx.r2.dev
        const link = publicBase ? `${publicBase}/${key2}` : `(R2 object: ${key2} — set PUBLIC_R2_URL to get a link)`;
        fileLinks.push(`${value.name} (${Math.round(value.size / 1024)} KB): ${link}`);
      } else if (typeof value === 'string' && value.trim()) {
        fields.push(`${key}: ${value}`);
      }
    }

    const subject = `New ${formLabel} — VTULR (${new Date().toISOString()})`;
    const lines = [
      `New ${formLabel.toLowerCase()} received on vtulr.org`,
      '',
      ...fields,
    ];
    if (fileLinks.length) {
      lines.push('', 'Files:', ...fileLinks.map((f) => `  - ${f}`));
    } else {
      lines.push('', 'No files attached.');
    }

    await sendEmail(env, subject, lines);

    return Response.redirect(thanksPage, 303);
  },
};
