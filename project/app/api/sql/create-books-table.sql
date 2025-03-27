CREATE OR REPLACE FUNCTION create_books_table()
RETURNS void AS $$
BEGIN
  -- Check if the table already exists
  IF NOT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'books'
  ) THEN
    -- Create the books table
    CREATE TABLE books (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      title VARCHAR(255) NOT NULL,
      author VARCHAR(255) NOT NULL,
      description TEXT,
      cover_image VARCHAR(255),
      status VARCHAR(50) DEFAULT 'draft',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    
    -- Create an index on the title for faster searches
    CREATE INDEX idx_books_title ON books(title);
    
    -- Add RLS policies
    ALTER TABLE books ENABLE ROW LEVEL SECURITY;
    
    -- Policy for authenticated users to read all books
    CREATE POLICY "Allow authenticated users to read books"
      ON books FOR SELECT
      TO authenticated
      USING (true);
    
    -- Policy for admins to insert/update/delete books
    CREATE POLICY "Allow admins to manage books"
      ON books FOR ALL
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

