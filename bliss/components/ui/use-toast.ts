import { useToast as useToastStore } from "@/lib/toast-store"

export function useToast() {
  return useToastStore()
}

export const toast = () => {
  const { toast } = useToastStore()
  return toast
}

