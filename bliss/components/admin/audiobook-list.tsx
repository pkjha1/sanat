import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Edit, MoreHorizontal, Play, Headphones } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Clock } from "lucide-react" // Import Clock icon

export function AudiobookList() {
  const audiobooks = [
    {
      id: 1,
      title: "The Bhagavad Gita: A New Translation",
      narrator: "Rajesh Kumar",
      category: "Sacred Texts",
      status: "Published",
      duration: "6h 45m",
      chapters: 18,
      listeners: 1245,
      lastUpdated: "2023-01-15",
      cover: "/placeholder.svg?height=60&width=40",
    },
    {
      id: 2,
      title: "Meditation Techniques for Modern Life",
      narrator: "Priya Sharma",
      category: "Meditation",
      status: "Published",
      duration: "4h 20m",
      chapters: 12,
      listeners: 876,
      lastUpdated: "2022-11-20",
      cover: "/placeholder.svg?height=60&width=40",
    },
    {
      id: 3,
      title: "Understanding Vedic Philosophy",
      narrator: "Dr. Amit Sharma",
      category: "Philosophy",
      status: "Draft",
      duration: "8h 15m",
      chapters: 8,
      listeners: 0,
      lastUpdated: "2023-03-05",
      cover: "/placeholder.svg?height=60&width=40",
    },
    {
      id: 4,
      title: "The Art of Mindful Living",
      narrator: "Ananya Patel",
      category: "Lifestyle",
      status: "Published",
      duration: "5h 30m",
      chapters: 15,
      listeners: 543,
      lastUpdated: "2023-02-10",
      cover: "/placeholder.svg?height=60&width=40",
    },
    {
      id: 5,
      title: "Sacred Temples of India",
      narrator: "Dr. Vikram Mehta",
      category: "Travel",
      status: "Published",
      duration: "9h 10m",
      chapters: 24,
      listeners: 321,
      lastUpdated: "2022-12-05",
      cover: "/placeholder.svg?height=60&width=40",
    },
  ]

  return (
    <div className="relative w-full overflow-auto">
      <table className="w-full caption-bottom text-sm">
        <thead className="[&_tr]:border-b">
          <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Audiobook</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Narrator</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Category</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Duration</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Chapters</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Listeners</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Last Updated</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {audiobooks.map((audiobook) => (
            <tr
              key={audiobook.id}
              className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
            >
              <td className="p-4 align-middle">
                <div className="flex items-center gap-3">
                  <img
                    src={audiobook.cover || "/placeholder.svg"}
                    alt={audiobook.title}
                    className="h-12 w-8 object-cover rounded border"
                  />
                  <span className="font-medium">{audiobook.title}</span>
                </div>
              </td>
              <td className="p-4 align-middle">{audiobook.narrator}</td>
              <td className="p-4 align-middle">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50">
                  {audiobook.category}
                </Badge>
              </td>
              <td className="p-4 align-middle">
                <Badge
                  variant="outline"
                  className={`${
                    audiobook.status === "Published"
                      ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-50"
                      : "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50"
                  }`}
                >
                  {audiobook.status}
                </Badge>
              </td>
              <td className="p-4 align-middle">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-gray-500" />
                  <span>{audiobook.duration}</span>
                </div>
              </td>
              <td className="p-4 align-middle">{audiobook.chapters}</td>
              <td className="p-4 align-middle">{audiobook.listeners.toLocaleString()}</td>
              <td className="p-4 align-middle">{audiobook.lastUpdated}</td>
              <td className="p-4 align-middle">
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Play className="h-4 w-4" />
                    <span className="sr-only">Play</span>
                  </Button>
                  <Link href={`/admin/audiobooks/${audiobook.id}/edit`}>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                  </Link>
                  <Link href={`/admin/audiobooks/${audiobook.id}/chapters`}>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Headphones className="h-4 w-4" />
                      <span className="sr-only">Manage Chapters</span>
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
                      <DropdownMenuItem>View Audiobook</DropdownMenuItem>
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
          Showing <strong>5</strong> of <strong>42</strong> audiobooks
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

