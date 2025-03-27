"use client"

import type React from "react"

import { useState, useEffect } from "react"

export type ToastProps = {
  id?: string
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "destructive"
  duration?: number
}

export type Toast = ToastProps & {
  id: string
}

// Create a global store for toasts
let toasts: Toast[] = []
let listeners: Function[] = []

// Function to notify all listeners of changes
const notifyListeners = () => {
  listeners.forEach((listener) => listener(toasts))
}

// Add a toast to the store
const addToast = (props: ToastProps) => {
  const id = props.id || Math.random().toString(36).substring(2, 9)
  const newToast = { ...props, id }
  toasts = [...toasts, newToast]
  notifyListeners()

  if (props.duration !== Number.POSITIVE_INFINITY) {
    setTimeout(() => {
      dismissToast(id)
    }, props.duration || 5000)
  }

  return {
    id,
    dismiss: () => dismissToast(id),
    update: (props: ToastProps) => updateToast(id, props),
  }
}

// Dismiss a toast from the store
const dismissToast = (id: string) => {
  toasts = toasts.filter((toast) => toast.id !== id)
  notifyListeners()
}

// Update a toast in the store
const updateToast = (id: string, props: ToastProps) => {
  toasts = toasts.map((toast) => (toast.id === id ? { ...toast, ...props } : toast))
  notifyListeners()
}

// Hook to access toasts
export function useToast() {
  const [state, setState] = useState<Toast[]>(toasts)

  useEffect(() => {
    // Add listener
    listeners.push(setState)

    // Remove listener on cleanup
    return () => {
      listeners = listeners.filter((listener) => listener !== setState)
    }
  }, [])

  return {
    toasts: state,
    toast: addToast,
    dismiss: dismissToast,
  }
}

// Direct toast function export
export const toast = addToast

