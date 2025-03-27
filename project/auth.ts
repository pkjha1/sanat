// Mock authentication
export const auth = {
  signIn: async () => ({ error: null }),
  signOut: async () => {},
  getSession: async () => null,
  getUser: async () => null,
}

