-- Add preferences column to profiles table if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'profiles' 
    AND column_name = 'preferences'
  ) THEN
    ALTER TABLE profiles ADD COLUMN preferences JSONB DEFAULT '{}'::jsonb;
  END IF;
END
$$;

