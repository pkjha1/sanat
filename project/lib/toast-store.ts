import type React from "react"
import { create } from "zustand"
import { v4 as uuidv4 } from "uuid"

export type ToastProps = {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "destructive"
}

type ToastState = {
  toasts: ToastProps[]
  add: (toast: Omit<ToastProps, "id">) => void
  dismiss: (id: string) => void
  update: (id: string, toast: Partial<ToastProps>) => void
}

export const useToast = create<ToastState>((set) => ({
  toasts: [],
  add: (toast) => {
    const id = uuidv4()
    set((state) => ({
      toasts: [...state.toasts, { id, ...toast }],
    }))
    return id
  },
  dismiss: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }))
  },
  update: (id, toast) => {
    set((state) => ({
      toasts: state.toasts.map((t) => (t.id === id ? { ...t, ...toast } : t)),
    }))
  },
}))

export const toast = (props: Omit<ToastProps, "id">) => {
  return useToast.getState().add(props)
}

