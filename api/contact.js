import { neon } from '@neondatabase/serverless'

export const config = { runtime: 'nodejs' }

const LIMITS = { name: 120, email: 200, company: 120, budget: 60, projectType: 60, message: 5000, referer: 300, userAgent: 300 }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const DB_ENV_KEYS = ['POSTGRES_URL', 'DATABASE_URL', 'NEON_DATABASE_URL', 'POSTGRES_URL_UNPOOLED', 'DATABASE_URL_UNPOOLED']

let tableReady = null

function ensureTable(sql) {
  if (!tableReady) {
    tableReady = sql`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id BIGSERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        company TEXT,
        budget TEXT,
        project_type TEXT,
        message TEXT NOT NULL,
        source TEXT,
        user_agent TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `.catch((err) => {
      tableReady = null
      throw err
    })
  }
  return tableReady
}

function json(res, status, payload) {
  res.status(status).json(payload)
}

function readBody(req) {
  const raw = typeof req.body === 'string' ? req.body : null
  if (raw) {
    try {
      return JSON.parse(raw)
    } catch {
      return Object.fromEntries(new URLSearchParams(raw).entries())
    }
  }
  return req.body && typeof req.body === 'object' ? req.body : {}
}

function clean(value, key) {
  if (value === undefined || value === null) return ''
  return String(value).trim().slice(0, LIMITS[key] ?? LIMITS.message)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return json(res, 405, { ok: false, error: 'Method not allowed.' })
  }

  let body
  try {
    body = readBody(req)
  } catch {
    return json(res, 400, { ok: false, error: 'Could not read the submitted form.' })
  }

  if (clean(body.website, 'company')) {
    return json(res, 200, { ok: true })
  }

  const name = clean(body.name, 'name')
  const email = clean(body.email, 'email').toLowerCase()
  const message = clean(body.message, 'message')
  const company = clean(body.company, 'company')
  const budget = clean(body.budget, 'budget')
  const projectType = clean(body.projectType ?? body.project_type, 'projectType')

  if (name.length < 2) return json(res, 400, { ok: false, error: 'Please enter your name.' })
  if (!EMAIL_RE.test(email)) return json(res, 400, { ok: false, error: 'Please enter a valid email address.' })
  if (message.length < 10) return json(res, 400, { ok: false, error: 'Please tell us a little more about your project.' })

  const connectionString = DB_ENV_KEYS.map((key) => process.env[key]).find(Boolean)
  if (!connectionString) {
    console.error('contact: missing database connection string (set POSTGRES_URL in Vercel)')
    return json(res, 500, { ok: false, error: 'The contact form is not configured yet. Please email helloboltz@gmail.com.' })
  }

  try {
    const sql = neon(connectionString)
    await ensureTable(sql)
    await sql`
      INSERT INTO contact_submissions (name, email, company, budget, project_type, message, source, user_agent)
      VALUES (${name}, ${email}, ${company || null}, ${budget || null}, ${projectType || null}, ${message}, ${clean(req.headers.referer, 'referer') || null}, ${clean(req.headers['user-agent'], 'userAgent') || null})
    `
    return json(res, 200, { ok: true })
  } catch (err) {
    console.error('contact: insert failed', err)
    return json(res, 500, { ok: false, error: 'We could not save your message. Please email helloboltz@gmail.com.' })
  }
}
