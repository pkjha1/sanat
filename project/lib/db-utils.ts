import { createClient } from "@/lib/supabase-server"

/**
 * Get all records from a table
 */
export async function getAllRecords(
  table: string,
  options: {
    limit?: number
    orderBy?: { column: string; ascending?: boolean }
    filters?: { column: string; value: any }[]
  } = {},
) {
  try {
    const supabase = createClient()

    let query = supabase.from(table).select("*")

    // Apply filters if provided
    if (options.filters && options.filters.length > 0) {
      options.filters.forEach((filter) => {
        query = query.eq(filter.column, filter.value)
      })
    }

    // Apply ordering if provided
    if (options.orderBy) {
      query = query.order(options.orderBy.column, { ascending: options.orderBy.ascending ?? true })
    }

    // Apply limit if provided
    if (options.limit) {
      query = query.limit(options.limit)
    }

    const { data, error } = await query

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error(`Error fetching records from ${table}:`, error)
    throw error
  }
}

/**
 * Get a record by ID
 */
export async function getRecordById(table: string, id: string) {
  try {
    const supabase = createClient()

    const { data, error } = await supabase.from(table).select("*").eq("id", id).single()

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error(`Error fetching record from ${table} with ID ${id}:`, error)
    throw error
  }
}

/**
 * Create a new record
 */
export async function createRecord(table: string, data: any) {
  try {
    const supabase = createClient()

    const { data: newRecord, error } = await supabase.from(table).insert(data).select()

    if (error) {
      throw error
    }

    return newRecord[0]
  } catch (error) {
    console.error(`Error creating record in ${table}:`, error)
    throw error
  }
}

/**
 * Update a record
 */
export async function updateRecord(table: string, id: string, data: any) {
  try {
    const supabase = createClient()

    const { data: updatedRecord, error } = await supabase.from(table).update(data).eq("id", id).select()

    if (error) {
      throw error
    }

    return updatedRecord[0]
  } catch (error) {
    console.error(`Error updating record in ${table} with ID ${id}:`, error)
    throw error
  }
}

/**
 * Delete a record
 */
export async function deleteRecord(table: string, id: string) {
  try {
    const supabase = createClient()

    const { error } = await supabase.from(table).delete().eq("id", id)

    if (error) {
      throw error
    }

    return true
  } catch (error) {
    console.error(`Error deleting record from ${table} with ID ${id}:`, error)
    throw error
  }
}

/**
 * Count records in a table
 */
export async function countRecords(table: string, filters?: { column: string; value: any }[]) {
  try {
    const supabase = createClient()

    let query = supabase.from(table).select("*", { count: "exact", head: true })

    // Apply filters if provided
    if (filters && filters.length > 0) {
      filters.forEach((filter) => {
        query = query.eq(filter.column, filter.value)
      })
    }

    const { count, error } = await query

    if (error) {
      throw error
    }

    return count || 0
  } catch (error) {
    console.error(`Error counting records in ${table}:`, error)
    throw error
  }
}

/**
 * Get records with pagination
 */
export async function getPaginatedRecords(
  table: string,
  options: {
    page?: number
    pageSize?: number
    orderBy?: { column: string; ascending?: boolean }
    filters?: { column: string; value: any }[]
  } = {},
) {
  try {
    const page = options.page || 1
    const pageSize = options.pageSize || 10

    const supabase = createClient()

    // Calculate range start and end
    const from = (page - 1) * pageSize
    const to = from + pageSize - 1

    let query = supabase.from(table).select("*", { count: "exact" })

    // Apply filters if provided
    if (options.filters && options.filters.length > 0) {
      options.filters.forEach((filter) => {
        query = query.eq(filter.column, filter.value)
      })
    }

    // Apply ordering if provided
    if (options.orderBy) {
      query = query.order(options.orderBy.column, { ascending: options.orderBy.ascending ?? true })
    }

    // Apply pagination
    query = query.range(from, to)

    const { data, count, error } = await query

    if (error) {
      throw error
    }

    return {
      data: data || [],
      pagination: {
        page,
        pageSize,
        total: count || 0,
        totalPages: count ? Math.ceil(count / pageSize) : 0,
      },
    }
  } catch (error) {
    console.error(`Error fetching paginated records from ${table}:`, error)
    throw error
  }
}

