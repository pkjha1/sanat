"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Edit, BookOpen, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function BookList() {
  const books = [
    {
      id: 1,
      title: "The Bhagavad Gita: A New Translation",
      author: "Sadguru Riteshwarji Maharaj",
      category: "Sacred Texts",
      status: "Published",
      chapters: 18,
      readers: 1245,
      lastUpdated: "2023-01-15",
      cover: "/placeholder.svg?height=60&width=40",
    },
    {
      id: 2,
      title: "Meditation Techniques for Modern Life",
      author: "Sadguru Riteshwarji Maharaj",
      category: "Meditation",
      status: "Published",
      chapters: 12,
      readers: 876,
      lastUpdated: "2022-11-20",
      cover: "/placeholder.svg?height=60&width=40",
    },
    {
      id: 3,
      title: "Understanding Vedic Philosophy",
      author: "Dr. Amit Sharma",
      category: "Philosophy",
      status: "Draft",
      chapters: 8,
      readers: 0,
      lastUpdated: "2023-03-05",
      cover: "/placeholder.svg?height=60&width=40",
    },
    {
      id: 4,
      title: "The Art of Mindful Living",
      author: "Sadguru Riteshwarji Maharaj",
      category: "Lifestyle",
      status: "Published",
      chapters: 15,
      readers: 543,
      lastUpdated: "2023-02-10",
      cover: "/placeholder.svg?height=60&width=40",
    },
    {
      id: 5,
      title: "Sacred Temples of India",
      author: "Dr. Priya Patel",
      category: "Travel",
      status: "Published",
      chapters: 24,
      readers: 321,
      lastUpdated: "2022-12-05",
      cover: "/placeholder.svg?height=60&width=40",
    },
  ]

  const [currentPage, setCurrentPage] = useState(1)
  const booksPerPage = 5
  const totalBooks = 56 // Total number of books in the database
  const totalPages = Math.ceil(totalBooks / booksPerPage)

  // Get current books (this would normally fetch from an API with pagination)
  const indexOfLastBook = currentPage * booksPerPage
  const indexOfFirstBook = indexOfLastBook - booksPerPage
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook) // Simulating pagination with the first 5 books

  return (
    <div className="relative w-full overflow-auto">
      <table className="w-full caption-bottom text-sm">
        <thead className="[&_tr]:border-b">
          <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Book</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Author</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Category</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Chapters</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Readers</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Last Updated</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {currentBooks.map((book) => (
            <tr key={book.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <td className="p-4 align-middle">
                <div className="flex items-center gap-3">
                  <img
                    src={book.cover || "/placeholder.svg"}
                    alt={book.title}
                    className="h-12 w-8 object-cover rounded border"
                  />
                  <span className="font-medium">{book.title}</span>
                </div>
              </td>
              <td className="p-4 align-middle">{book.author}</td>
              <td className="p-4 align-middle">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50">
                  {book.category}
                </Badge>
              </td>
              <td className="p-4 align-middle">
                <Badge
                  variant="outline"
                  className={`${
                    book.status === "Published"
                      ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-50"
                      : "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50"
                  }`}
                >
                  {book.status}
                </Badge>
              </td>
              <td className="p-4 align-middle">{book.chapters}</td>
              <td className="p-4 align-middle">{book.readers.toLocaleString()}</td>
              <td className="p-4 align-middle">{book.lastUpdated}</td>
              <td className="p-4 align-middle">
                <div className="flex gap-2">
                  <Link href={`/admin/books/${book.id}/edit`}>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                  </Link>
                  <Link href={`/admin/books/${book.id}/chapters`}>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <BookOpen className="h-4 w-4" />
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
                      <DropdownMenuItem>View Book</DropdownMenuItem>
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
          Showing{" "}
          <strong>
            {indexOfFirstBook + 1}-{Math.min(indexOfLastBook, totalBooks)}
          </strong>{" "}
          of <strong>{totalBooks}</strong> books
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground px-2">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

