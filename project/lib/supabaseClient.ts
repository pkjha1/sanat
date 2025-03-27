// Mock Supabase client implementation
// This file replaces the actual Supabase client with mock functionality

// Mock data
const mockUsers = [
  {
    id: "user-123",
    email: "user@example.com",
    created_at: "2023-01-15T00:00:00Z",
  },
]

const mockProfiles = [
  {
    id: "user-123",
    full_name: "John Doe",
    avatar_url: "/placeholder.svg?height=64&width=64",
    role: "user",
  },
]

const mockBooks = [
  { id: 1, title: "The Bhagavad Gita", author: "Vyasa", created_at: "2023-01-15T00:00:00Z" },
  { id: 2, title: "Yoga Sutras", author: "Patanjali", created_at: "2023-02-20T00:00:00Z" },
  { id: 3, title: "Upanishads", author: "Various Authors", created_at: "2023-03-10T00:00:00Z" },
]

const mockStories = [
  { id: 1, title: "The Story of Rama", published: true, created_at: "2023-01-20T00:00:00Z" },
  { id: 2, title: "Krishna's Childhood", published: true, created_at: "2023-02-15T00:00:00Z" },
  { id: 3, title: "The Wisdom of Hanuman", published: false, created_at: "2023-03-05T00:00:00Z" },
]

const mockTeachings = [
  { id: 1, title: "Introduction to Meditation", author: "Swami Vivekananda", created_at: "2023-01-25T00:00:00Z" },
  { id: 2, title: "Understanding Karma", author: "Sadhguru", created_at: "2023-02-10T00:00:00Z" },
  { id: 3, title: "The Path to Enlightenment", author: "Dalai Lama", created_at: "2023-03-15T00:00:00Z" },
]

// Mock query builder
class QueryBuilder {
  private table: string
  private filters: any[] = []
  private orderByField: string | null = null
  private orderDirection: "asc" | "desc" = "asc"
  private limitCount: number | null = null

  constructor(table: string) {
    this.table = table
  }

  select(columns: string) {
    // In a real implementation, this would filter columns
    return this
  }

  eq(field: string, value: any) {
    this.filters.push({ field, value, operator: "eq" })
    return this
  }

  order(field: string, options: { ascending: boolean }) {
    this.orderByField = field
    this.orderDirection = options.ascending ? "asc" : "desc"
    return this
  }

  limit(count: number) {
    this.limitCount = count
    return this
  }

  single() {
    return this.execute().then((result) => {
      if (result.data && result.data.length > 0) {
        return { data: result.data[0], error: null }
      }
      return { data: null, error: { message: "No rows found" } }
    })
  }

  async execute() {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    let data: any[] = []

    // Select data based on table
    switch (this.table) {
      case "users":
        data = [...mockUsers]
        break
      case "profiles":
        data = [...mockProfiles]
        break
      case "books":
        data = [...mockBooks]
        break
      case "stories":
        data = [...mockStories]
        break
      case "teachings":
        data = [...mockTeachings]
        break
      default:
        data = []
    }

    // Apply filters
    if (this.filters.length > 0) {
      data = data.filter((item) => {
        return this.filters.every((filter) => {
          if (filter.operator === "eq") {
            return item[filter.field] === filter.value
          }
          return true
        })
      })
    }

    // Apply ordering
    if (this.orderByField) {
      data.sort((a, b) => {
        if (a[this.orderByField!] < b[this.orderByField!]) {
          return this.orderDirection === "asc" ? -1 : 1
        }
        if (a[this.orderByField!] > b[this.orderByField!]) {
          return this.orderDirection === "asc" ? 1 : -1
        }
        return 0
      })
    }

    // Apply limit
    if (this.limitCount !== null) {
      data = data.slice(0, this.limitCount)
    }

    return { data, error: null }
  }
}

// Mock Supabase client
export const supabase = {
  from: (table: string) => new QueryBuilder(table),
  auth: {
    getUser: async () => {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return { data: { user: mockUsers[0] }, error: null }
    },
    signIn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return { data: { user: mockUsers[0] }, error: null }
    },
    signUp: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return { data: { user: mockUsers[0] }, error: null }
    },
    signOut: async () => {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return { error: null }
    },
    resetPasswordForEmail: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return { error: null }
    },
  },
}

