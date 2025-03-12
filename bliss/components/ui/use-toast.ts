"use client"

import type React from "react"

import { createContext, useContext } from "react"

type Toast = {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
  duration?: number
  variant?: "default" | "destructive"
}

type ToastContextProps = {
  toasts: Toast[]
  toast: (toast: Omit<Toast, "id">) => { id: string; dismiss: () => void; update: (toast: Partial<Toast>) => void }
  dismiss: (id: string) => void
}

const ToastContext = createContext<ToastContextProps>({
  toasts: [],
  toast: () => ({ id: "", dismiss: () => {}, update: () => {} }),
  dismiss: () => {},
})

export const useToast = () => useContext(ToastContext)

export type { Toast }

