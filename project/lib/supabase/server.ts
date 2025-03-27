// This file replaces the actual Supabase client with mock data
import { fetchData } from "../mock-data"

// Mock Supabase client that uses our static data
export const supabase = {
  from: (collection) => ({
    select: () => ({
      eq: () => ({
        single: async () => ({ data: await fetchData(collection) }),
        data: async () => await fetchData(collection),
      }),
      data: async () => await fetchData(collection),
    }),
    insert: () => ({
      select: () => ({
        single: async () => ({ data: { id: Math.floor(Math.random() * 1000) + 4 } }),
      }),
    }),
    update: () => ({
      eq: () => ({
        select: () => ({
          single: async () => ({ data: { updated: true } }),
        }),
      }),
    }),
    delete: () => ({
      eq: () => ({
        select: () => ({
          single: async () => ({ data: { deleted: true } }),
        }),
      }),
    }),
  }),
  storage: {
    from: () => ({
      upload: async () => ({ data: { path: "/placeholder.svg?height=400&width=300" } }),
      getPublicUrl: () => ({ data: { publicUrl: "/placeholder.svg?height=400&width=300" } }),
    }),
  },
}

// Mock function to get a specific item by ID
export async function getItemById(collection, id) {
  return { data: await fetchData(collection, id) }
}

// This ensures we're not actually trying to connect to Supabase
export const createClient = () => supabase

