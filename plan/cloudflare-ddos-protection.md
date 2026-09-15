# 🛡️ DDoS Protection Plan — Hackatopia (Cloudflare + GoDaddy)

> **Purpose:** Protect the hackathon event registration website from DDoS attacks using Cloudflare's free/pro tier, with the domain managed on GoDaddy.

---

## 📋 Overview

| Item            | Detail                          |
|-----------------|--------------------------------|
| Domain Registrar | GoDaddy                       |
| DNS / CDN / WAF  | Cloudflare                    |
| Protection Type  | DDoS mitigation, WAF, rate limiting |
| Website Type     | Hackathon event registration   |
| Recommended Plan | Cloudflare Free (minimum) or Pro ($20/mo) |

---

## 🗺️ Architecture Flow

```
User Request
     │
     ▼
Cloudflare Edge Network  ◄── DDoS filtered here
     │
     ▼
Your Hosting Server (origin)
     │
     ▼
Hackatopia Registration Site
```

Cloudflare sits **in front of** your server. All traffic passes through Cloudflare first, where attacks are absorbed before reaching your origin.

---

## 🚀 Step-by-Step Implementation Plan

---

### Phase 1 — Create a Cloudflare Account

1. Go to [https://cloudflare.com](https://cloudflare.com) and sign up for a **free account**.
2. Click **"Add a Site"** and enter your domain (e.g., `hackatopia.com`).
3. Choose a plan:
   - **Free** — Basic DDoS protection (good for small events)
   - **Pro ($20/mo)** — WAF rules, advanced bot protection (recommended for hackathons expecting high traffic)
4. Cloudflare will scan your existing DNS records — review and confirm them.

---

### Phase 2 — Update Nameservers on GoDaddy

> [!IMPORTANT]
> This is the critical step that routes all traffic through Cloudflare.

1. Log into your **GoDaddy account** → **My Products** → Find your domain → click **DNS**.
2. Scroll to the **Nameservers** section → click **Change**.
3. Select **"Enter my own nameservers (advanced)"**.
4. Replace existing nameservers with the two Cloudflare nameservers provided (they look like):
   ```
   ns1.cloudflare.com
   ns2.cloudflare.com
   ```
   *(Your actual nameservers will be shown in the Cloudflare dashboard — use those exact values.)*
5. Save changes.

> [!NOTE]
> DNS propagation takes **24–48 hours** but typically completes within 1–2 hours.

---

### Phase 3 — Configure DNS Records in Cloudflare

Once Cloudflare is active, manage all DNS from the Cloudflare dashboard (not GoDaddy).

| Record Type | Name  | Value                    | Proxied? |
|-------------|-------|--------------------------|----------|
| `A`         | `@`   | Your server's IP address | ✅ Yes (Orange cloud) |
| `A`         | `www` | Your server's IP address | ✅ Yes |
| `CNAME`     | `www` | `yourdomain.com`         | ✅ Yes |
| `MX`        | `@`   | Your mail server         | ❌ No (DNS only) |

> [!CAUTION]
> Never expose your origin server IP directly. Keep the **orange cloud (proxied)** enabled on all web-facing records. If your real IP leaks, DDoS attacks can bypass Cloudflare.

---

### Phase 4 — Enable DDoS Protection Settings

In your Cloudflare dashboard → **Security** section:

#### 4.1 — DDoS Protection
- Go to **Security → DDoS**
- Set **HTTP DDoS attack protection** to **"High"** sensitivity
- Cloudflare Free automatically enables **unmetered DDoS mitigation** at Layer 3, 4, and 7

#### 4.2 — Enable "Under Attack" Mode (Emergency)
- **Security → Settings → Security Level** → Set to **"Under Attack"** during active attacks
- This adds a JS challenge page for all visitors
- Normal operation: Set to **"Medium"**

#### 4.3 — Web Application Firewall (WAF)
- Go to **Security → WAF**
- Enable **Cloudflare Managed Rules** (Free: basic rules, Pro: full OWASP ruleset)
- Add a custom rule to block suspicious patterns:
  ```
  Rule: Block requests with empty User-Agent
  Expression: (http.user_agent eq "")
  Action: Block
  ```

---

### Phase 5 — Rate Limiting (Protect Registration Endpoint)

> [!IMPORTANT]
> Rate limiting is critical to prevent form spam and brute-force on your registration page.

1. Go to **Security → WAF → Rate Limiting Rules**
2. Create a rule:

| Setting      | Value                              |
|--------------|------------------------------------|
| Rule Name    | Protect Registration Form          |
| Path         | `/register` or `/api/register`     |
| Threshold    | 10 requests per 1 minute per IP    |
| Action       | Block for 1 hour                   |

3. Create another rule for general site protection:

| Setting      | Value                              |
|--------------|------------------------------------|
| Rule Name    | General Rate Limit                 |
| Path         | `/*` (all paths)                   |
| Threshold    | 200 requests per minute per IP     |
| Action       | Challenge (CAPTCHA)                |

---

### Phase 6 — Enable SSL/TLS (HTTPS)

1. Go to **SSL/TLS** in Cloudflare dashboard
2. Set encryption mode to **"Full (Strict)"** if your origin has a valid SSL cert, or **"Flexible"** for basic setups
3. Enable:
   - ✅ **Always Use HTTPS**
   - ✅ **Automatic HTTPS Rewrites**
   - ✅ **HSTS** (for production)

---

### Phase 7 — Bot Management

1. Go to **Security → Bots**
2. Enable **Bot Fight Mode** (Free tier) — blocks known bad bots automatically
3. (Pro) Enable **Super Bot Fight Mode** for more granular control

---

### Phase 8 — Firewall Rules for Extra Protection

Go to **Security → WAF → Custom Rules** and add:

```
# Block known bad countries (optional — adjust for your event)
Rule: Block High-Risk Country Traffic
Expression: (ip.geoip.country in {"CN" "RU" "KP"})
Action: Block

# Challenge Tor exit nodes
Rule: Challenge Tor
Expression: (ip.src in $cf.anonymizer)
Action: Managed Challenge
```

---

### Phase 9 — Monitoring & Alerts

1. Go to **Notifications** in Cloudflare
2. Set up alerts for:
   - ✅ DDoS attack detected
   - ✅ WAF spike (unusual traffic)
   - ✅ Error rate spike (5xx errors)
3. Monitor in real-time: **Analytics → Traffic** dashboard

---

### Phase 10 — Test & Verify

Before the hackathon event:

- [ ] Verify nameservers are pointing to Cloudflare (`dig NS yourdomain.com`)
- [ ] Check the orange cloud is active on DNS records
- [ ] Confirm HTTPS is working (`https://yourdomain.com`)
- [ ] Test registration form still works end-to-end
- [ ] Simulate a rate limit (send >10 requests to `/register` quickly)
- [ ] Review Cloudflare Analytics for baseline traffic

---

## ⏱️ Timeline

```
Day 1:   Create Cloudflare account, add site, get nameservers
Day 1:   Update nameservers on GoDaddy
Day 2:   DNS propagation completes — configure WAF, rate limiting, SSL
Day 3:   Test all rules, verify registration flow
Day 4+:  Monitor analytics before event day
```

---

## 💰 Cost Summary

| Plan         | Cost       | Recommended For                     |
|--------------|------------|--------------------------------------|
| Free         | $0/mo      | Small events (<500 registrations)    |
| Pro          | $20/mo     | Medium events, WAF + bot protection  |
| Business     | $200/mo    | Large events, custom WAF rules       |

> [!TIP]
> For a hackathon, the **Pro plan** ($20/mo) is the sweet spot — it includes advanced WAF rules, bot protection, and image optimization that keep the site fast under load.

---

## 🆘 Emergency Playbook (During Attack)

If you detect a live DDoS attack during the event:

1. **Cloudflare Dashboard → Security → Settings**
2. Set **Security Level** to **"I'm Under Attack"**
3. Set **Browser Integrity Check** to **On**
4. Check **Firewall Events** to identify attack source/pattern
5. Add a **Block rule** for the attacking IP range or country
6. Contact **Cloudflare Support** (Pro+ plans) via live chat

---

## 📎 Useful Links

- [Cloudflare Signup](https://cloudflare.com)
- [Cloudflare DDoS Docs](https://developers.cloudflare.com/ddos-protection/)
- [GoDaddy Nameserver Change Guide](https://in.godaddy.com/help/change-nameservers-for-my-domains-664)
- [Cloudflare WAF Rules](https://developers.cloudflare.com/waf/)
- [Cloudflare Rate Limiting](https://developers.cloudflare.com/waf/rate-limiting-rules/)
