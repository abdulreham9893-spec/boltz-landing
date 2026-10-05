-- BOLTZ contact form submissions
-- The API route creates this table automatically on the first submission.
-- Run it manually in the Neon console if you prefer to set the table up first.

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
);

CREATE INDEX IF NOT EXISTS contact_submissions_created_at_idx
  ON contact_submissions (created_at DESC);

-- Read submissions (Neon console SQL editor)
-- SELECT * FROM contact_submissions ORDER BY created_at DESC;
