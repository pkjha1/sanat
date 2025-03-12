"use client"

import type React from "react"

import { useState, useEffect } from "react"

export type Toast = {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
  duration?: number
  variant?: "default" | "destructive"
}

const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 5000

// Create a simple store for managing toasts
class ToastStore {
  private toasts: Toast[] = []
  private listeners: Array<(toasts: Toast[]) => void> = []

  getToasts() {
    return this.toasts
  }

  subscribe(listener: (toasts: Toast[]) => void) {
    this.listeners.push(listener)
    return () => {
      const index = this.listeners.indexOf(listener)
      if (index > -1) {
        this.listeners.splice(index, 1)
      }
    }
  }

  private notify() {
    this.listeners.forEach((listener) => {
      listener([...this.toasts])
    })
  }

  addToast(toast: Omit<Toast, "id">) {
    const id = Math.random().toString(36).substring(2, 9)
    this.toasts = [{ id, ...toast }, ...this.toasts].slice(0, TOAST_LIMIT)
    this.notify()

    // Auto-remove toast after duration
    if (toast.duration !== Number.POSITIVE_INFINITY) {
      setTimeout(() => {
        this.removeToast(id)
      }, toast.duration || TOAST_REMOVE_DELAY)
    }

    return id
  }

  removeToast(id: string) {
    this.toasts = this.toasts.filter((t) => t.id !== id)
    this.notify()
  }

  updateToast(id: string, toast: Partial<Toast>) {
    this.toasts = this.toasts.map((t) => (t.id === id ? { ...t, ...toast } : t))
    this.notify()
  }
}

// Create a singleton instance of the store
const store = new ToastStore()

// Export the useToast hook
export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>(store.getToasts())

  useEffect(() => {
    return store.subscribe(setToasts)
  }, [])

  const toast = (props: Omit<Toast, "id">) => {
    const id = store.addToast(props)
    return {
      id,
      dismiss: () => store.removeToast(id),
      update: (props: Partial<Toast>) => store.updateToast(id, props),
    }
  }

  return {
    toasts,
    toast,
    dismiss: (id: string) => store.removeToast(id),
  }
}

