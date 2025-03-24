/*
  # Create user interactions with content

  1. New Tables
    - `bookmarks`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users.id)
      - `content_type` (text, not null) -- 'book', 'teaching', 'audiobook', 'story'
      - `content_id` (uuid, not null)
      - `created_at` (timestamp with time zone, default: now())
    
    - `reading_progress`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users.id)
      - `book_id` (uuid, references books.id)
      - `chapter_id` (uuid, references book_chapters.id)
      - `progress_percentage` (integer)
      - `last_read_at` (timestamp with time zone, default: now())
      - `updated_at` (timestamp with time zone, default: now())

    - `listening_progress`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users.id)
      - `audiobook_id` (uuid, references audiobooks.id)
      - `chapter_id` (uuid, references audiobook_chapters.id)
      - `progress_seconds` (integer)
      - `last_listened_at` (timestamp with time zone, default: now())
      - `updated_at` (timestamp with time zone, default: now())

  2. Security
    - Enable RLS on all tables
    - Add policies for users to manage their own data
*/

-- Bookmarks Table
CREATE TABLE IF NOT EXISTS bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content_type TEXT NOT NULL CHECK (content_type IN ('book', 'teaching', 'audiobook', 'story')),
  content_id UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, content_type, content_id)
);

-- Reading Progress Table
CREATE TABLE IF NOT EXISTS reading_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  book_id UUID NOT NULL REFERENCES books(id) ON DELETE CASCADE,
  chapter_id UUID REFERENCES book_chapters(id) ON DELETE CASCADE,
  progress_percentage INTEGER DEFAULT 0,
  last_read_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, book_id)
);

-- Listening Progress Table
CREATE TABLE IF NOT EXISTS listening_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  audiobook_id UUID NOT NULL REFERENCES audiobooks(id) ON DELETE CASCADE,
  chapter_id UUID REFERENCES audiobook_chapters(id) ON DELETE CASCADE,
  progress_seconds INTEGER DEFAULT 0,
  last_listened_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, audiobook_id)
);

-- Enable Row Level Security
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE reading_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE listening_progress ENABLE ROW LEVEL SECURITY;

-- Policies for bookmarks
CREATE POLICY "Users can view their own bookmarks"
  ON bookmarks
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookmarks"
  ON bookmarks
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own bookmarks"
  ON bookmarks
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for reading_progress
CREATE POLICY "Users can view their own reading progress"
  ON reading_progress
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own reading progress"
  ON reading_progress
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reading progress"
  ON reading_progress
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for listening_progress
CREATE POLICY "Users can view their own listening progress"
  ON listening_progress
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own listening progress"
  ON listening_progress
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own listening progress"
  ON listening_progress
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Add policies for admins to view all user interactions
CREATE POLICY "Admins can view all bookmarks"
  ON bookmarks
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can view all reading progress"
  ON reading_progress
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can view all listening progress"
  ON listening_progress
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );