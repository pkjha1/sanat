"use server"

import { executeQuery } from "@/lib/db"
import { auth } from "@/auth"

export async function testDatabaseConnection() {
  try {
    // Check if user is authenticated
    const session = await auth()

    if (!session?.user) {
      return {
        success: false,
        message: "You must be logged in to test the database connection",
      }
    }

    // Test the connection by getting the PostgreSQL version
    const {
      data: versionData,
      success: versionSuccess,
      error: versionError,
    } = await executeQuery(`
      SELECT version()
    `)

    if (!versionSuccess) {
      throw versionError
    }

    // Get database name
    const {
      data: dbData,
      success: dbSuccess,
      error: dbError,
    } = await executeQuery(`
      SELECT current_database() as database_name
    `)

    if (!dbSuccess) {
      throw dbError
    }

    // Get list of tables
    const {
      data: tablesData,
      success: tablesSuccess,
      error: tablesError,
    } = await executeQuery(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name
    `)

    if (!tablesSuccess) {
      throw tablesError
    }

    return {
      success: true,
      version: versionData[0].version,
      database: dbData[0].database_name,
      tables: tablesData.map((row) => row.table_name),
    }
  } catch (error) {
    console.error("Error testing database connection:", error)
    return {
      success: false,
      message: "Failed to connect to database: " + (error instanceof Error ? error.message : String(error)),
    }
  }
}

export async function testCrudOperations() {
  try {
    // Check if user is authenticated
    const session = await auth()

    if (!session?.user) {
      return {
        success: false,
        message: "You must be logged in to test CRUD operations",
      }
    }

    // Create a temporary test table
    const createTableResult = await executeQuery(`
      CREATE TABLE IF NOT EXISTS test_crud (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `)

    if (!createTableResult.success) {
      throw createTableResult.error
    }

    // Insert a record
    const insertResult = await executeQuery(`
      INSERT INTO test_crud (name)
      VALUES ('Test Record')
      RETURNING id, name, created_at
    `)

    if (!insertResult.success) {
      throw insertResult.error
    }

    const insertedId = insertResult.data[0].id

    // Read the record
    const readResult = await executeQuery(
      `
      SELECT id, name, created_at
      FROM test_crud
      WHERE id = $1
    `,
      [insertedId],
    )

    if (!readResult.success) {
      throw readResult.error
    }

    // Update the record
    const updateResult = await executeQuery(
      `
      UPDATE test_crud
      SET name = 'Updated Test Record'
      WHERE id = $1
      RETURNING id, name, created_at
    `,
      [insertedId],
    )

    if (!updateResult.success) {
      throw updateResult.error
    }

    // Delete the record
    const deleteResult = await executeQuery(
      `
      DELETE FROM test_crud
      WHERE id = $1
    `,
      [insertedId],
    )

    if (!deleteResult.success) {
      throw deleteResult.error
    }

    // Drop the test table
    const dropTableResult = await executeQuery(`
      DROP TABLE test_crud
    `)

    if (!dropTableResult.success) {
      throw dropTableResult.error
    }

    return {
      success: true,
      message: "CRUD operations completed successfully",
      results: {
        create: insertResult.data[0],
        read: readResult.data[0],
        update: updateResult.data[0],
        delete: "Record deleted successfully",
      },
    }
  } catch (error) {
    console.error("Error testing CRUD operations:", error)
    return {
      success: false,
      message: "Failed to complete CRUD operations: " + (error instanceof Error ? error.message : String(error)),
    }
  }
}

