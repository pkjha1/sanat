import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Edit, FileText, Headphones, Video, MoreHorizontal, Eye, Clock, Calendar } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function TeachingsList() {
  const teachings = [
    {
      id: 1,
      title: "The Path to Inner Peace",
      type: "video",
      category: "Spiritual Growth",
      status: "Published",
      duration: "28:45",
      views: 1245,
      publishDate: "2023-01-15",
      thumbnail: "/placeholder.svg?height=60&width=100",
    },
    {
      id: 2,
      title: "Understanding Bhagavad Gita",
      type: "text",
      category: "Sacred Texts",
      status: "Published",
      duration: null,
      views: 876,
      publishDate: "2022-11-20",
      thumbnail: null,
    },
    {
      id: 3,
      title: "Meditation Techniques",
      type: "audio",
      category: "Meditation",
      status: "Published",
      duration: "15:20",
      views: 543,
      publishDate: "2023-02-05",
      thumbnail: null,
    },
    {
      id: 4,
      title: "The Law of Karma",
      type: "video",
      category: "Philosophy",
      status: "Draft",
      duration: "18:30",
      views: 0,
      publishDate: null,
      thumbnail: "/placeholder.svg?height=60&width=100",
    },
    {
      id: 5,
      title: "Morning Chants for Spiritual Awakening",
      type: "audio",
      category: "Chants",
      status: "Published",
      duration: "12:15",
      views: 321,
      publishDate: "2022-12-10",
      thumbnail: null,
    },
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "text":
        return <FileText className="h-4 w-4 text-blue-500" />
      case "audio":
        return <Headphones className="h-4 w-4 text-amber-500" />
      case "video":
        return <Video className="h-4 w-4 text-red-500" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div className="relative w-full overflow-auto">
      <table className="w-full caption-bottom text-sm">
        <thead className="[&_tr]:border-b">
          <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Title</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Type</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Category</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Duration</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Views</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Publish Date</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {teachings.map((teaching) => (
            <tr
              key={teaching.id}
              className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
            >
              <td className="p-4 align-middle">
                <div className="flex items-center gap-3">
                  {teaching.type === "video" && teaching.thumbnail && (
                    <img
                      src={teaching.thumbnail || "/placeholder.svg"}
                      alt={teaching.title}
                      className="h-12 w-20 object-cover rounded border"
                    />
                  )}
                  <span className="font-medium">{teaching.title}</span>
                </div>
              </td>
              <td className="p-4 align-middle">
                <div className="flex items-center gap-1">
                  {getTypeIcon(teaching.type)}
                  <span className="capitalize">{teaching.type}</span>
                </div>
              </td>
              <td className="p-4 align-middle">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50">
                  {teaching.category}
                </Badge>
              </td>
              <td className="p-4 align-middle">
                <Badge
                  variant="outline"
                  className={`${
                    teaching.status === "Published"
                      ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-50"
                      : "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50"
                  }`}
                >
                  {teaching.status}
                </Badge>
              </td>
              <td className="p-4 align-middle">
                {teaching.duration ? (
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-gray-500" />
                    <span>{teaching.duration}</span>
                  </div>
                ) : (
                  <span className="text-gray-400">—</span>
                )}
              </td>
              <td className="p-4 align-middle">
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3 text-gray-500" />
                  <span>{teaching.views.toLocaleString()}</span>
                </div>
              </td>
              <td className="p-4 align-middle">
                {teaching.publishDate ? (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-gray-500" />
                    <span>{teaching.publishDate}</span>
                  </div>
                ) : (
                  <span className="text-gray-400">—</span>
                )}
              </td>
              <td className="p-4 align-middle">
                <div className="flex gap-2">
                  <Link href={`/admin/teachings/${teaching.id}/preview`}>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">Preview</span>
                    </Button>
                  </Link>
                  <Link href={`/admin/teachings/${teaching.id}/edit`}>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">More</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>View Analytics</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuItem>Archive</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between py-4">
        <div className="text-sm text-muted-foreground">
          Showing <strong>5</strong> of <strong>124</strong> teachings
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

