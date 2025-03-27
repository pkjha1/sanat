CREATE OR REPLACE FUNCTION create_chapters_table()
RETURNS void AS $$
BEGIN
  -- Check if the table already exists
  IF NOT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'chapters'
  ) THEN
    -- Create the chapters table
    CREATE TABLE chapters (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      book_id UUID NOT NULL REFERENCES books(id) ON DELETE CASCADE,
      title VARCHAR(255) NOT NULL,
      content TEXT,
      order_number INTEGER NOT NULL DEFAULT 1,
      status VARCHAR(50) DEFAULT 'draft',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    
    -- Create indexes
    CREATE INDEX idx_chapters_book_id ON chapters(book_id);
    CREATE INDEX idx_chapters_order ON chapters(book_id, order_number);
    
    -- Add RLS policies
    ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;
    
    -- Policy for authenticated users to read all chapters
    CREATE POLICY "Allow authenticated users to read chapters"
      ON chapters FOR SELECT
      TO authenticated
      USING (true);
    
    -- Policy for admins to insert/update/delete chapters
    CREATE POLICY "Allow admins to manage chapters"
      ON chapters FOR ALL
      TO authenticated
      USING (
        EXISTS (
          SELECT 1 FROM profiles
          WHERE profiles.id = auth.uid()
          AND profiles.role = 'admin'
        )
      );
  END IF;
END;
$$ LANGUAGE plpgsql;

