-- Create user activities table
CREATE TABLE IF NOT EXISTS user_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  action VARCHAR(50) NOT NULL, -- 'bookmark_added', 'bookmark_removed', 'content_viewed', etc.
  content_type VARCHAR(50), -- 'book', 'teaching', 'audiobook', 'place'
  content_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Add foreign key if users table exists
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Add indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_user_activities_user_id ON user_activities(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activities_created_at ON user_activities(created_at);

