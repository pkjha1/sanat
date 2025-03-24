/*
  # Fix infinite recursion in profiles policies

  1. Changes
    - Drop the recursive admin policies that are causing infinite recursion
    - Create new non-recursive policies for admins
    - Keep existing user policies for reading/updating own profile

  2. Security
    - Maintain RLS for profiles table
    - Ensure users can still access their own profiles
    - Provide admin access without circular dependencies
*/

-- First, drop the problematic policies that are causing recursion
DROP POLICY IF EXISTS "Admins can read all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;

-- Create new admin policies that don't create a circular dependency
-- For admin read access, use a direct check against the auth.uid() role claim
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

-- The existing user policies for reading and updating their own profiles should remain as they are
-- "Users can read own profile" and "Users can update own profile"
-- These don't cause recursion since they directly check uid() = id