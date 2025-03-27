import { Pool } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-serverless"

// Create a PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

// Create a Drizzle instance
export const db = drizzle(pool)

// Mock SQL function for database operations
export const sql = async (query: string, params?: any[]) => {
  console.log("SQL query:", query, params)
  return { rows: [] }
}

// Helper function to execute SQL queries
export async function executeQuery(query: string, params: any[] = []) {
  try {
    const client = await pool.connect()
    try {
      const result = await client.query(query, params)
      return result.rows
    } finally {
      client.release()
    }
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}

