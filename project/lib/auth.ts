// Mock authentication helper

import { cookies } from "next/headers"

// Mock user data
const mockUsers = [
  {
    id: "user-123",
    email: "john@example.com",
    name: "John Doe",
    avatar: "/placeholder.svg?height=100&width=100",
  },
]

export async function auth() {
  // Check if user is logged in via cookie
  const cookieStore = cookies()
  const sessionCookie = cookieStore.get("session")

  if (sessionCookie) {
    try {
      // In a real app, you would verify the session token
      // For now, just return the mock user
      return {
        user: mockUsers[0],
      }
    } catch (error) {
      return null
    }
  }

  return null
}

export async function signIn(email, password) {
  // Mock sign in functionality
  if (email === "john@example.com" && password === "password") {
    return {
      user: mockUsers[0],
      session: {
        access_token: "mock-token",
        expires_at: Date.now() + 3600000, // 1 hour from now
      },
    }
  }

  throw new Error("Invalid login credentials")
}

export async function signOut() {
  // Mock sign out functionality
  return { success: true }
}

export async function signUp(email, password) {
  // Mock sign up functionality
  return {
    user: {
      id: "new-user-" + Math.floor(Math.random() * 1000),
      email,
      name: email.split("@")[0],
      avatar: "/placeholder.svg?height=100&width=100",
    },
    session: {
      access_token: "mock-token",
      expires_at: Date.now() + 3600000, // 1 hour from now
    },
  }
}

export async function resetPassword(email) {
  // Mock reset password functionality
  return { success: true }
}

