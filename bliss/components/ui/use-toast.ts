"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"
import type { ReactNode } from "react"

export type ToastActionElement = React.ReactElement

export type ToastProps = {
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  duration?: number
  variant?: "default" | "destructive"
}

interface ToastContextProps {
  toasts: {
    id: string
    title?: React.ReactNode
    description?: React.ReactNode
    action?: React.ReactNode
    duration?: number
    variant?: "default" | "destructive"
  }[]
  toast: (props: ToastProps) => void
  dismiss: (id: string) => void
}

const ToastContext = createContext<ToastContextProps>({
  toasts: [],
  toast: () => {},
  dismiss: () => {},
})

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<
    {
      id: string
      title?: React.ReactNode
      description?: React.ReactNode
      action?: React.ReactNode
      duration?: number
      variant?: "default" | "destructive"
    }[]
  >([])

  const toast = (props: ToastProps) => {
    const id = Math.random().toString(36).substring(2)
    setToasts([...toasts, { id, ...props }])
    setTimeout(() => dismiss(id), props.duration || 3000)
  }

  const dismiss = (id: string) => {
    setToasts(toasts.filter((toast) => toast.id !== id))
  }

  return <ToastContext.Provider value={{ toasts, toast, dismiss }}>{children}</ToastContext.Provider>
}

export function useToast() {
  return useContext(ToastContext)
}

