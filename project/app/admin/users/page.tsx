import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/admin/page-header"
import { UserList } from "@/components/admin/user-list"
import Link from "next/link"
import { Plus } from "lucide-react"

export default function UsersPage() {
  return (
    <div>
      <PageHeader
        title="Users"
        description="Manage user accounts and permissions"
        actions={
          <Link href="/admin/users/new">
            <Button className="bg-amber-600 hover:bg-amber-700 w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" /> Add New User
            </Button>
          </Link>
        }
      />

      <UserList />
    </div>
  )
}

