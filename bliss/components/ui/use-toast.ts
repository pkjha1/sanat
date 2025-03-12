"use client"

import type { ToastAction } from "@/components/ui/toast"

import * as React from "react"

type ToastProps = {
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  duration?: number
  variant?: "default" | "destructive"
}

type Toast = ToastProps & {
  id: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

type ToastActionElement = React.ReactElement<typeof ToastAction>

interface UseToast {
  toasts: Toast[]
  toast: (props: ToastProps) => {
    id: string
    dismiss: () => void
    update: (props: Partial<ToastProps>) => void
  }
  dismiss: (toastId?: string) => void
}

type Action =
  | {
      type: "ADD_TOAST"
      toast: Toast
    }
  | {
      type: "UPDATE_TOAST"
      toast: Partial<Toast>
    }
  | {
      type: "DISMISS_TOAST"
      toastId?: string
    }

interface State {
  toasts: Toast[]
}

const ToastContext = React.createContext<UseToast>({
  toasts: [],
  toast: () => ({ id: "", dismiss: () => {}, update: () => {} }),
  dismiss: () => {},
})

function useToast() {
  return React.useContext(ToastContext)
}

function toast(props: ToastProps) {
  const context = React.useContext(ToastContext)
  return context.toast(props)
}

export { useToast, toast }

