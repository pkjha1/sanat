"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { PlusCircle, Search, Filter, MoreHorizontal, ArrowUpDown, FileText, Star, Calendar, Clock } from "lucide-react"
import Link from "next/link"

type Story = {
  id: string
  title: string
  folder: string | null
  createdAt: string
  updatedAt: string
  status: "draft" | "published"
  favorite: boolean
}

export default function StoriesDatabase() {
  // Sample data - would come from your database
  const [stories, setStories] = useState<Story[]>([
    {
      id: "1-1",
      title: "The Dragon's Quest",
      folder: "Fantasy Stories",
      createdAt: "2023-03-15",
      updatedAt: "2023-03-17",
      status: "published",
      favorite: true,
    },
    {
      id: "1-2",
      title: "Enchanted Forest",
      folder: "Fantasy Stories",
      createdAt: "2023-03-10",
      updatedAt: "2023-03-12",
      status: "published",
      favorite: true,
    },
    {
      id: "1-3-1",
      title: "Heroes",
      folder: "Character Profiles",
      createdAt: "2023-02-28",
      updatedAt: "2023-03-05",
      status: "published",
      favorite: false,
    },
    {
      id: "1-3-2",
      title: "Villains",
      folder: "Character Profiles",
      createdAt: "2023-02-25",
      updatedAt: "2023-03-01",
      status: "draft",
      favorite: false,
    },
    {
      id: "2-1",
      title: "Space Odyssey",
      folder: "Science Fiction",
      createdAt: "2023-02-20",
      updatedAt: "2023-02-22",
      status: "published",
      favorite: false,
    },
    {
      id: "2-2",
      title: "Time Travelers",
      folder: "Science Fiction",
      createdAt: "2023-02-15",
      updatedAt: "2023-02-18",
      status: "draft",
      favorite: false,
    },
    {
      id: "3",
      title: "Story Ideas",
      folder: null,
      createdAt: "2023-02-10",
      updatedAt: "2023-02-12",
      status: "published",
      favorite: false,
    },
    {
      id: "4",
      title: "Writing Tips",
      folder: null,
      createdAt: "2023-02-05",
      updatedAt: "2023-02-08",
      status: "published",
      favorite: true,
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [sortField, setSortField] = useState<keyof Story>("updatedAt")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const toggleFavorite = (id: string) => {
    setStories(stories.map((story) => (story.id === id ? { ...story, favorite: !story.favorite } : story)))
  }

  const toggleSort = (field: keyof Story) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const filteredStories = stories.filter(
    (story) =>
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (story.folder && story.folder.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const sortedStories = [...filteredStories].sort((a, b) => {
    if (sortField === "favorite") {
      return sortDirection === "asc"
        ? a.favorite === b.favorite
          ? 0
          : a.favorite
            ? 1
            : -1
        : a.favorite === b.favorite
          ? 0
          : a.favorite
            ? -1
            : 1
    }

    if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1
    if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  return (
    <div className="container mx-auto px-4 py-6 md:py-8 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">Stories Database</h1>
        <Link href="/admin/stories/new">
          <Button className="gap-2 bg-amber-600 hover:bg-amber-700">
            <PlusCircle className="h-4 w-4" />
            New Story
          </Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search stories..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Calendar className="h-4 w-4" />
                View
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link href="/admin/stories" className="flex w-full">
                  List View
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/admin/stories/database" className="flex w-full">
                  Database View
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="border rounded-md shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => toggleSort("favorite")}>
                  <Star className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" className="hover:bg-transparent" onClick={() => toggleSort("title")}>
                  <span>Title</span>
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" className="hover:bg-transparent" onClick={() => toggleSort("folder")}>
                  <span>Folder</span>
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" className="hover:bg-transparent" onClick={() => toggleSort("status")}>
                  <span>Status</span>
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" className="hover:bg-transparent" onClick={() => toggleSort("updatedAt")}>
                  <span>Last Updated</span>
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedStories.map((story) => (
              <TableRow key={story.id}>
                <TableCell>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => toggleFavorite(story.id)}>
                    <Star className={`h-4 w-4 ${story.favorite ? "fill-amber-500 text-amber-500" : "text-gray-400"}`} />
                    <span className="sr-only">{story.favorite ? "Remove from favorites" : "Add to favorites"}</span>
                  </Button>
                </TableCell>
                <TableCell>
                  <Link
                    href={`/admin/stories/${story.id}`}
                    className="flex items-center gap-2 hover:underline font-medium text-gray-900"
                  >
                    <FileText className="h-4 w-4 text-gray-500" />
                    <span>{story.title}</span>
                  </Link>
                </TableCell>
                <TableCell>
                  {story.folder ? (
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-gray-50 text-gray-700 border-gray-200">
                      {story.folder}
                    </span>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      story.status === "published"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    }`}
                  >
                    {story.status === "published" ? "Published" : "Draft"}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Clock className="h-3 w-3" />
                    <span>{story.updatedAt}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Link href={`/admin/stories/${story.id}`} className="flex w-full">
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuItem>Move</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

