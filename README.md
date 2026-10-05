# BOLTZ landing page

Vite + React single-page site for BOLTZ, with a contact form that stores submissions in Postgres on Vercel.

## Local development

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Contact form database (Vercel + Neon Postgres)

The form posts JSON to `POST /api/contact` (`api/contact.js`) and inserts a row into `contact_submissions`.

Setup, once, on Vercel:

1. Project -> **Storage** -> **Create Database** -> **Neon** (Postgres). Neon is Vercel's Postgres provider; Vercel Postgres was retired in its favour.
2. Vercel adds the connection string as an environment variable automatically. If the name differs, set `POSTGRES_URL` manually (the route also accepts `DATABASE_URL`, `NEON_DATABASE_URL`, `POSTGRES_URL_UNPOOLED`, `DATABASE_URL_UNPOOLED`).
3. Deploy. The route creates the table on the first submission.

The table is also defined in `db/schema.sql` if you would rather run it yourself in the Neon SQL editor.

Read submissions in the Neon console:

```sql
SELECT * FROM contact_submissions ORDER BY created_at DESC;
```

For local testing, copy `.env.example` to `.env` and paste your connection string. Local `.env` files are gitignored.

Stored per submission: `name`, `email`, `company`, `budget`, `project_type`, `message`, referrer, user agent, and timestamp. IP addresses are not stored.

The form includes a hidden `website` honeypot field. Submissions that fill it return success without writing a row.
