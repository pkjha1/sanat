/*
  # Subscription System Schema

  1. New Tables
    - `subscription_plans` - Defines available subscription plans
    - `user_subscriptions` - Links users to their subscriptions
  
  2. Security
    - Enables RLS on all tables
    - Defines appropriate access policies
*/

-- Create subscription plans table
CREATE TABLE IF NOT EXISTS subscription_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric NOT NULL,
  duration_days integer NOT NULL DEFAULT 30,
  modules text[] NOT NULL DEFAULT '{}',
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE subscription_plans IS 'Available subscription plans that users can purchase';
COMMENT ON COLUMN subscription_plans.modules IS 'Array of module names that this plan grants access to';

-- Create user subscriptions table
CREATE TABLE IF NOT EXISTS user_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subscription_plan_id uuid NOT NULL REFERENCES subscription_plans(id),
  status text NOT NULL CHECK (status IN ('active', 'canceled', 'expired')),
  start_date timestamptz NOT NULL DEFAULT now(),
  end_date timestamptz NOT NULL,
  auto_renew boolean NOT NULL DEFAULT false,
  metadata jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE user_subscriptions IS 'User subscriptions linking users to subscription plans';

-- Index for faster lookups of a user's active subscriptions
CREATE INDEX IF NOT EXISTS user_subscriptions_user_id_status_idx ON user_subscriptions (user_id, status);

-- Enable Row Level Security
ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for subscription_plans
CREATE POLICY "Anyone can view active subscription plans" 
  ON subscription_plans
  FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Admins can manage subscription plans" 
  ON subscription_plans
  FOR ALL 
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Create RLS policies for user_subscriptions
CREATE POLICY "Users can view their own subscriptions" 
  ON user_subscriptions
  FOR SELECT 
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all subscriptions" 
  ON user_subscriptions
  FOR SELECT 
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can manage subscriptions" 
  ON user_subscriptions
  FOR ALL 
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Insert initial subscription plans
INSERT INTO subscription_plans (name, description, price, duration_days, modules)
VALUES 
  ('Basic', 'Access to basic books and teachings', 9.99, 30, ARRAY['books', 'teachings']),
  ('Standard', 'Access to books, teachings, and stories', 14.99, 30, ARRAY['books', 'teachings', 'stories']),
  ('Premium', 'Full access to all content', 19.99, 30, ARRAY['books', 'teachings', 'stories', 'audiobooks', 'meditation']);