/*
  # Add Clerk Webhook Handler Function

  1. New Functions
    - Creates a webhook handler function to process user events from Clerk
    - Handles user creation, updates, and deletion events

  2. Security
    - Function executes with security definer permissions to bypass RLS
*/

-- Create a function to process webhook events from Clerk
CREATE OR REPLACE FUNCTION public.handle_clerk_webhook()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER -- Use security definer to bypass RLS
SET search_path = public
AS $$
DECLARE
  event_type TEXT;
  user_id TEXT;
  user_data JSONB;
  result JSON;
BEGIN
  -- Extract the event type and relevant data
  event_type := current_setting('request.jwt.claims', true)::jsonb->>'event';
  user_id := current_setting('request.jwt.claims', true)::jsonb->>'sub';
  user_data := current_setting('request.jwt.claims', true)::jsonb->'data';
  
  -- Handle different event types
  IF event_type = 'user.created' THEN
    -- Create a new profile record
    INSERT INTO public.profiles (
      id,
      full_name,
      avatar_url,
      role,
      created_at,
      updated_at
    ) VALUES (
      user_id,
      (user_data->>'first_name' || ' ' || user_data->>'last_name'),
      user_data->>'image_url',
      COALESCE(user_data->>'role', 'user'),
      now(),
      now()
    )
    ON CONFLICT (id) DO NOTHING
    RETURNING to_json(profiles.*) INTO result;
    
    RETURN json_build_object('success', true, 'event', event_type, 'result', result);
    
  ELSIF event_type = 'user.updated' THEN
    -- Update an existing profile
    UPDATE public.profiles
    SET 
      full_name = (user_data->>'first_name' || ' ' || user_data->>'last_name'),
      avatar_url = user_data->>'image_url',
      role = COALESCE(user_data->>'role', role),
      updated_at = now()
    WHERE id = user_id
    RETURNING to_json(profiles.*) INTO result;
    
    RETURN json_build_object('success', true, 'event', event_type, 'result', result);
    
  ELSIF event_type = 'user.deleted' THEN
    -- Delete the user profile (this will cascade to related data)
    DELETE FROM public.profiles
    WHERE id = user_id
    RETURNING to_json(profiles.*) INTO result;
    
    RETURN json_build_object('success', true, 'event', event_type, 'result', result);
    
  ELSE
    -- Unknown event type
    RETURN json_build_object('success', false, 'error', 'Unknown event type');
  END IF;
  
EXCEPTION
  WHEN OTHERS THEN
    RETURN json_build_object('success', false, 'error', SQLERRM);
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.handle_clerk_webhook() TO authenticated;