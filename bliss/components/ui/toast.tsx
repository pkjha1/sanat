// This file is a stub that provides simple toast components
// to maintain compatibility with existing code
"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "destructive"
}

export function Toast({ className, variant = "default", ...props }: ToastProps) {
  return (
    <div
      className={cn(
        "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all",
        variant === "destructive"
          ? "destructive border-destructive bg-destructive text-destructive-foreground"
          : "border-border bg-background text-foreground",
        className,
      )}
      {...props}
    />
  )
}

export function ToastTitle({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("text-sm font-semibold", className)} {...props} />
}

export function ToastDescription({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("text-sm opacity-90", className)} {...props} />
}

export function ToastAction({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
        className,
      )}
      {...props}
    />
  )
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function ToastViewport(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} />
}

export function ToastClose(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} />
}

export type ToastActionElement = React.ReactElement

