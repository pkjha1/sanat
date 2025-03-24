/*
  # Create content tables for Sanatani platform

  1. New Tables
    - `books`
      - `id` (uuid, primary key)
      - `title` (text, not null)
      - `author` (text, not null)
      - `description` (text)
      - `cover_image` (text)
      - `category` (text)
      - `created_at` (timestamp with time zone, default: now())
      - `updated_at` (timestamp with time zone, default: now())
      - `created_by` (uuid, references auth.users.id)
    
    - `book_chapters`
      - `id` (uuid, primary key)
      - `book_id` (uuid, references books.id)
      - `title` (text, not null)
      - `content` (text, not null)
      - `chapter_number` (integer, not null)
      - `created_at` (timestamp with time zone, default: now())
      - `updated_at` (timestamp with time zone, default: now())

    - `teachings`
      - `id` (uuid, primary key)
      - `title` (text, not null)
      - `description` (text)
      - `author` (text)
      - `content_type` (text, not null) -- 'video' or 'article'
      - `video_url` (text) -- If content_type is 'video'
      - `article_content` (text) -- If content_type is 'article'
      - `thumbnail` (text)
      - `created_at` (timestamp with time zone, default: now())
      - `updated_at` (timestamp with time zone, default: now())
      - `created_by` (uuid, references auth.users.id)

    - `audiobooks`
      - `id` (uuid, primary key)
      - `title` (text, not null)
      - `author` (text, not null)
      - `narrator` (text)
      - `description` (text)
      - `cover_image` (text)
      - `created_at` (timestamp with time zone, default: now())
      - `updated_at` (timestamp with time zone, default: now())
      - `created_by` (uuid, references auth.users.id)

    - `audiobook_chapters`
      - `id` (uuid, primary key)
      - `audiobook_id` (uuid, references audiobooks.id)
      - `title` (text, not null)
      - `audio_url` (text, not null)
      - `duration` (integer) -- Duration in seconds
      - `chapter_number` (integer, not null)
      - `created_at` (timestamp with time zone, default: now())
      - `updated_at` (timestamp with time zone, default: now())

    - `stories`
      - `id` (uuid, primary key)
      - `title` (text, not null)
      - `content` (text, not null)
      - `author` (text)
      - `image` (text)
      - `category` (text)
      - `created_at` (timestamp with time zone, default: now())
      - `updated_at` (timestamp with time zone, default: now())
      - `created_by` (uuid, references auth.users.id)

  2. Security
    - Enable RLS on all tables
    - Add policies for public reading
    - Add policies for admin creation and updates
*/

-- Books Table
CREATE TABLE IF NOT EXISTS books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  description TEXT,
  cover_image TEXT,
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Book Chapters Table
CREATE TABLE IF NOT EXISTS book_chapters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  book_id UUID NOT NULL REFERENCES books(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  chapter_number INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Teachings Table
CREATE TABLE IF NOT EXISTS teachings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  author TEXT,
  content_type TEXT NOT NULL CHECK (content_type IN ('video', 'article')),
  video_url TEXT,
  article_content TEXT,
  thumbnail TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Audiobooks Table
CREATE TABLE IF NOT EXISTS audiobooks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  narrator TEXT,
  description TEXT,
  cover_image TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Audiobook Chapters Table
CREATE TABLE IF NOT EXISTS audiobook_chapters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  audiobook_id UUID NOT NULL REFERENCES audiobooks(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  audio_url TEXT NOT NULL,
  duration INTEGER,
  chapter_number INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Stories Table
CREATE TABLE IF NOT EXISTS stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT,
  image TEXT,
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Enable Row Level Security on all tables
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE book_chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachings ENABLE ROW LEVEL SECURITY;
ALTER TABLE audiobooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE audiobook_chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;

-- Policies for books table
CREATE POLICY "Anyone can read books"
  ON books
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admins can insert books"
  ON books
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update books"
  ON books
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can delete books"
  ON books
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Similar policies for book_chapters
CREATE POLICY "Anyone can read book chapters"
  ON book_chapters
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admins can insert book chapters"
  ON book_chapters
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update book chapters"
  ON book_chapters
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can delete book chapters"
  ON book_chapters
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Policies for teachings
CREATE POLICY "Anyone can read teachings"
  ON teachings
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admins can insert teachings"
  ON teachings
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update teachings"
  ON teachings
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can delete teachings"
  ON teachings
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Policies for audiobooks
CREATE POLICY "Anyone can read audiobooks"
  ON audiobooks
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admins can insert audiobooks"
  ON audiobooks
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update audiobooks"
  ON audiobooks
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can delete audiobooks"
  ON audiobooks
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Policies for audiobook chapters
CREATE POLICY "Anyone can read audiobook chapters"
  ON audiobook_chapters
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admins can insert audiobook chapters"
  ON audiobook_chapters
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update audiobook chapters"
  ON audiobook_chapters
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can delete audiobook chapters"
  ON audiobook_chapters
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Policies for stories
CREATE POLICY "Anyone can read stories"
  ON stories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admins can insert stories"
  ON stories
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update stories"
  ON stories
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can delete stories"
  ON stories
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );