# VERTACRUIT

Modern dark-mode recruitment website + CMS admin, built with React (Vite) and Node/Express, powered by MySQL.

## Structure

```
apps/web   → Public site + Admin panel (React, Vercel)
apps/api   → REST API (Express, Vercel serverless / Node)
```

## Local development

1. Copy `.env.example` to `.env` and set DB credentials + `JWT_SECRET`.
2. Install dependencies from the repo root:

```bash
npm install
```

3. Start the API (port **9999**):

```bash
npm run dev:api
```

On first boot the API **auto-creates tables** and **seeds** Vertacruit content + admin user.

4. Start the web app (port **5173**):

```bash
npm run dev:web
```

- Site: http://localhost:5173  
- Admin: http://localhost:5173/admin/login  
- Credentials: `admin@gmail.com` / `admin`

## Admin CMS

Edit pages (hero + every section), Services Master (list + detail pages), process steps, stats, testimonials, FAQs, jobs, referral program, site settings, and leads inbox.

## Deploy on Vercel

### Web

- Root directory: `apps/web`
- Env: `VITE_API_URL` = your API URL (e.g. `https://vertacruit-api.vercel.app`)
- Build: `npm run build` · Output: `dist`

### API

- Root directory: `apps/api`
- Env: `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `JWT_SECRET`, `CORS_ORIGIN` (your web URL)

### Hostinger MySQL

Enable **Remote MySQL** for your database user (allow `%` or Vercel egress). If remote access is locked to a single IP, Vercel serverless calls will fail.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home |
| `/about-us` | About |
| `/services` | Services list |
| `/services/:slug` | Service detail |
| `/career` | Open roles |
| `/referral` | Refer & earn |
| `/contact-us` | Contact |
| `/admin/*` | CMS |

## Brand

Dark theme · royal blue `#0083B0` / `#00B4DB` · emerald `#00D2A0` · fonts Syne + Plus Jakarta Sans + DM Mono.
