import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase-server"

export async function GET() {
  try {
    const supabase = createClient()

    // Check if profiles table exists
    const { data: tableExists, error: tableCheckError } = await supabase
      .from("information_schema.tables")
      .select("table_name")
      .eq("table_schema", "public")
      .eq("table_name", "profiles")
      .single()

    if (tableCheckError && tableCheckError.code !== "PGRST116") {
      throw tableCheckError
    }

    // If table doesn't exist, create it
    if (!tableExists) {
      // Create profiles table
      const { error: createTableError } = await supabase.rpc("create_profiles_table")

      if (createTableError) {
        // If RPC function doesn't exist, create table directly
        const { error: directCreateError } = await supabase.query(`
          CREATE TABLE IF NOT EXISTS public.profiles (
            id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
            full_name TEXT,
            avatar_url TEXT,
            email TEXT,
            role TEXT DEFAULT 'user',
            phone TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
          );
          
          -- Set up Row Level Security
          ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
          
          -- Create policies
          CREATE POLICY "Users can view their own profile"
            ON public.profiles FOR SELECT
            USING (auth.uid() = id);
            
          CREATE POLICY "Users can update their own profile"
            ON public.profiles FOR UPDATE
            USING (auth.uid() = id);
            
          CREATE POLICY "Admin users can view all profiles"
            ON public.profiles FOR SELECT
            USING (
              EXISTS (
                SELECT 1 FROM public.profiles
                WHERE id = auth.uid() AND role = 'admin'
              )
            );
            
          CREATE POLICY "Admin users can update all profiles"
            ON public.profiles FOR UPDATE
            USING (
              EXISTS (
                SELECT 1 FROM public.profiles
                WHERE id = auth.uid() AND role = 'admin'
              )
            );
            
          CREATE POLICY "Admin users can delete profiles"
            ON public.profiles FOR DELETE
            USING (
              EXISTS (
                SELECT 1 FROM public.profiles
                WHERE id = auth.uid() AND role = 'admin'
              )
            );
        `)

        if (directCreateError) {
          throw directCreateError
        }
      }

      return NextResponse.json({
        success: true,
        message: "Profiles table created successfully",
      })
    }

    // If table exists, check if email column exists
    const { data: columnExists, error: columnCheckError } = await supabase
      .from("information_schema.columns")
      .select("column_name")
      .eq("table_schema", "public")
      .eq("table_name", "profiles")
      .eq("column_name", "email")
      .single()

    if (columnCheckError && columnCheckError.code !== "PGRST116") {
      throw columnCheckError
    }

    // If email column doesn't exist, add it
    if (!columnExists) {
      const { error: addColumnError } = await supabase.query(`
        ALTER TABLE public.profiles
        ADD COLUMN IF NOT EXISTS email TEXT;
      `)

      if (addColumnError) {
        throw addColumnError
      }

      return NextResponse.json({
        success: true,
        message: "Email column added to profiles table",
      })
    }

    return NextResponse.json({
      success: true,
      message: "Profiles table already exists with email column",
    })
  } catch (error: any) {
    console.error("Error initializing profiles table:", error)

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to initialize profiles table",
      },
      { status: 500 },
    )
  }
}

