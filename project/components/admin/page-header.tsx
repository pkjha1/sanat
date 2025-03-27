import type { ReactNode } from "react"
import { Breadcrumb } from "@/components/admin/breadcrumb"

interface PageHeaderProps {
  title: string
  description?: string
  actions?: ReactNode
}

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col space-y-4 mb-6">
      <Breadcrumb />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>
          {description && <p className="text-muted-foreground mt-1">{description}</p>}
        </div>

        {actions && <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">{actions}</div>}
      </div>
    </div>
  )
}

