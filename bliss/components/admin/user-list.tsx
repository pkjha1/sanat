import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { BarChart3 } from "lucide-react"

export function UserList() {
  const users = [
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul.sharma@example.com",
      role: "User",
      status: "Active",
      joinDate: "2023-01-15",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Priya Patel",
      email: "priya.patel@example.com",
      role: "Admin",
      status: "Active",
      joinDate: "2022-11-20",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Amit Singh",
      email: "amit.singh@example.com",
      role: "User",
      status: "Inactive",
      joinDate: "2023-02-05",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Neha Gupta",
      email: "neha.gupta@example.com",
      role: "User",
      status: "Active",
      joinDate: "2023-01-30",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      name: "Vikram Mehta",
      email: "vikram.mehta@example.com",
      role: "User",
      status: "Active",
      joinDate: "2022-12-10",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <div className="relative w-full overflow-auto">
      <table className="w-full caption-bottom text-sm">
        <thead className="[&_tr]:border-b">
          <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">User</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Email</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Role</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Join Date</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {users.map((user) => (
            <tr key={user.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <td className="p-4 align-middle">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>
                      {user.name.charAt(0)}
                      {user.name.split(" ")[1]?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{user.name}</span>
                </div>
              </td>
              <td className="p-4 align-middle">{user.email}</td>
              <td className="p-4 align-middle">
                <Badge
                  variant={user.role === "Admin" ? "default" : "outline"}
                  className={user.role === "Admin" ? "bg-amber-500" : ""}
                >
                  {user.role}
                </Badge>
              </td>
              <td className="p-4 align-middle">
                <Badge
                  variant="outline"
                  className={`${
                    user.status === "Active"
                      ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-50"
                      : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {user.status}
                </Badge>
              </td>
              <td className="p-4 align-middle">{user.joinDate}</td>
              <td className="p-4 align-middle">
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                    Delete
                  </Button>
                  <Link href={`/dashboard?admin=true&userId=${user.id}`}>
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                      <BarChart3 className="h-4 w-4" />
                      <span className="sr-only">View Dashboard</span>
                    </Button>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between py-4">
        <div className="text-sm text-muted-foreground">
          Showing <strong>5</strong> of <strong>1,234</strong> users
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

