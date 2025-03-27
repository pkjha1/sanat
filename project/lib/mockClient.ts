// Mock client for data access
export const supabase = {
  from: (table: string) => ({
    select: () => ({
      eq: () => ({
        data: [],
        error: null,
      }),
    }),
    insert: () => ({
      data: null,
      error: null,
    }),
    update: () => ({
      data: null,
      error: null,
    }),
    delete: () => ({
      data: null,
      error: null,
    }),
  }),
  auth: {
    getUser: async () => ({
      data: { user: null },
      error: null,
    }),
  },
}

export const isSupabaseConfigured = false

