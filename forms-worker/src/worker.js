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

function escapeHtml(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function prettyLabel(key) {
  return String(key)
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function buildEmailHtml({ formLabel, fields, fileLinks }) {
  const rows = fields.map(({ key, value }) => `
    <tr>
      <td style="padding:10px 16px;border-bottom:1px solid #eee;font-family:-apple-system,'Lato',sans-serif;font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#861F41;white-space:nowrap;vertical-align:top;">${escapeHtml(prettyLabel(key))}</td>
      <td style="padding:10px 16px;border-bottom:1px solid #eee;font-family:-apple-system,'Lato',sans-serif;font-size:14px;color:#222;line-height:1.5;">${escapeHtml(value)}</td>
    </tr>`).join('');

  const filesBlock = fileLinks.length
    ? `<div style="margin-top:24px;">
         <div style="font-family:-apple-system,'Lato',sans-serif;font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#861F41;margin-bottom:10px;">Attached Files</div>
         ${fileLinks.map((f) => `
           <a href="${escapeHtml(f.url)}" style="display:block;font-family:-apple-system,'Lato',sans-serif;font-size:14px;color:#fff;background:#E5751F;text-decoration:none;padding:12px 16px;border-radius:4px;margin-bottom:8px;">
             📎 ${escapeHtml(f.name)} <span style="opacity:0.85;font-size:12px;">(${f.sizeKB} KB)</span>
           </a>`).join('')}
       </div>`
    : `<p style="font-family:-apple-system,'Lato',sans-serif;font-size:13px;color:#999;font-style:italic;margin-top:20px;">No files attached.</p>`;

  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f5f3f1;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f3f1;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#fff;border-radius:6px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06);">
          <tr>
            <td style="background:#861F41;padding:24px 28px;border-bottom:3px solid #E5751F;">
              <div style="font-family:Georgia,'Newsreader',serif;color:#fff;font-size:20px;">Virginia Tech Undergraduate Law Review</div>
              <div style="font-family:-apple-system,'Lato',sans-serif;color:rgba(255,255,255,0.75);font-size:12px;letter-spacing:0.08em;text-transform:uppercase;margin-top:4px;">New ${escapeHtml(formLabel)}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 28px 8px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                ${rows}
              </table>
              ${filesBlock}
            </td>
          </tr>
          <tr>
            <td style="padding:20px 28px;background:#f9f7f5;">
              <div style="font-family:-apple-system,'Lato',sans-serif;font-size:11px;color:#999;">Sent automatically from the vtulr.org form backend.</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

async function sendEmail(env, subject, { formLabel, fields, fileLinks }) {
  if (!env.RESEND_API_KEY || !env.NOTIFY_EMAIL) {
    console.log('sendEmail skipped: missing RESEND_API_KEY or NOTIFY_EMAIL secret');
    return;
  }
  const textLines = [
    `New ${formLabel.toLowerCase()} received on vtulr.org`,
    '',
    ...fields.map((f) => `${prettyLabel(f.key)}: ${f.value}`),
    '',
    fileLinks.length
      ? ['Files:', ...fileLinks.map((f) => `  - ${f.name} (${f.sizeKB} KB): ${f.url}`)].join('\n')
      : 'No files attached.',
  ];
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
      html: buildEmailHtml({ formLabel, fields, fileLinks }),
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
        const url = publicBase ? `${publicBase}/${key2}` : `#r2-object-${key2}`;
        fileLinks.push({ name: value.name, sizeKB: Math.round(value.size / 1024), url });
      } else if (typeof value === 'string' && value.trim()) {
        fields.push({ key, value });
      }
    }

    const subject = `New ${formLabel} — VTULR (${new Date().toISOString()})`;
    await sendEmail(env, subject, { formLabel, fields, fileLinks });

    return Response.redirect(thanksPage, 303);
  },
};
