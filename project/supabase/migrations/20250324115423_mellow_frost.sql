/*
  # Fix profile policies to avoid infinite recursion

  1. Changes
    - Drop problematic policies that cause infinite recursion
    - Create new admin policies that use JWT claims instead of database lookups
    - Maintain user policies that are already working correctly
    
  2. Security
    - Ensure admins can still read and update all profiles 
    - Ensure regular users can still read and update their own profiles
*/

-- First, drop the problematic policies that are causing recursion
DROP POLICY IF EXISTS "Admins can read all profiles based on role claim" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update all profiles based on role claim" ON public.profiles;
DROP POLICY IF EXISTS "Admins can read all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;

-- Create new admin policies that don't create a circular dependency
-- For admin read access, use a direct check against the auth.jwt() role claim
CREATE POLICY "Admins can read all profiles based on role claim" 
ON public.profiles
FOR SELECT 
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin');

-- For admin update access, also use the JWT claim
CREATE POLICY "Admins can update all profiles based on role claim" 
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin');

-- Make sure the user policies for reading and updating their own profiles exist
-- If they don't exist for some reason, we'll create them
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'profiles' 
    AND policyname = 'Users can read own profile'
  ) THEN
    CREATE POLICY "Users can read own profile"
      ON public.profiles
      FOR SELECT
      TO authenticated
      USING (auth.uid() = id);
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'profiles' 
    AND policyname = 'Users can update own profile'
  ) THEN
    CREATE POLICY "Users can update own profile"
      ON public.profiles
      FOR UPDATE
      TO authenticated
      USING (auth.uid() = id);
  END IF;
END $$;