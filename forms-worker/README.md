# vtulr-forms — free form backend (Cloudflare Worker)

Replaces third-party form services (which all gate file uploads behind a
paid plan) with a small serverless function you own. Free forever at
VTULR's scale:

- **Workers**: 100,000 requests/day free
- **R2 storage**: 10 GB free, zero egress fees
- **Resend** (email notifications): 3,000 emails/month free

## One-time setup

1. **Install wrangler** (Cloudflare's CLI) if you don't have it:
   ```
   npm install -g wrangler
   ```

2. **Log in to Cloudflare:**
   ```
   wrangler login
   ```
   This opens a browser to authorize. Needs a free Cloudflare account
   (https://dash.cloudflare.com/sign-up) if you don't already have one.

3. **Create the R2 bucket:**
   ```
   wrangler r2 bucket create vtulr-form-uploads
   ```

4. **Enable public access on the bucket** so file links work:
   - Cloudflare dashboard → R2 → `vtulr-form-uploads` → Settings → Public access → Allow
   - Copy the `https://pub-xxxxxxxx.r2.dev` URL it gives you
   - Paste it into `wrangler.toml` as `PUBLIC_R2_URL`

5. **Create a free Resend account:** https://resend.com/signup
   - Copy your API key from the Resend dashboard

6. **Set secrets** (run each, paste the value when prompted):
   ```
   wrangler secret put RESEND_API_KEY
   wrangler secret put NOTIFY_EMAIL
   wrangler secret put CONTACT_KEY
   wrangler secret put SUBMIT_KEY
   ```
   - `NOTIFY_EMAIL` — where you want submissions sent, e.g. `ulr.virginiatech@gmail.com`
   - `CONTACT_KEY` / `SUBMIT_KEY` — make up any random string for each
     (these act like passwords identifying which form submitted).
     Example: run `openssl rand -hex 16` twice to generate two.

7. **Deploy:**
   ```
   wrangler deploy
   ```
   This prints your Worker's URL, something like:
   `https://vtulr-forms.<your-subdomain>.workers.dev`

8. **Tell Claude the deployed URL and the two access keys** — the site's
   `contact.html` and `submit.html` forms need their `action` and hidden
   `access_key` values updated to match.

## Testing

```
curl -X POST https://vtulr-forms.<your-subdomain>.workers.dev \
  -F "access_key=YOUR_CONTACT_KEY" \
  -F "name=Test" \
  -F "email=test@example.com" \
  -F "message=Testing the worker"
```
You should get `{"success":true}` back and an email at `NOTIFY_EMAIL`.
