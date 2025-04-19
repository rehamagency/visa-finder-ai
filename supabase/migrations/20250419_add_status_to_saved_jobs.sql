
-- Add status column to saved_jobs table
ALTER TABLE IF EXISTS public.saved_jobs
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'Saved';

-- Update any existing rows to have the default status
UPDATE public.saved_jobs
SET status = 'Saved'
WHERE status IS NULL;
