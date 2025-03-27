"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Pencil, Trash2, BookOpen, Plus } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"

interface Book {
  id: string
  title: string
  author: string
  description: string
  cover_image: string
  status: string
  created_at: string
  updated_at: string
}

export function BookList() {
  const [books, setBooks] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/books")

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const data = await response.json()
      setBooks(data || [])
    } catch (err: any) {
      console.error("Error fetching books:", err)
      setError("Failed to load books. Please try again.")
      toast({
        title: "Error",
        description: "Failed to load books. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteBook = async (id: string) => {
    if (!confirm("Are you sure you want to delete this book? This action cannot be undone.")) {
      return
    }

    try {
      const response = await fetch(`/api/books/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      // Remove the deleted book from the state
      setBooks(books.filter((book) => book.id !== id))

      toast({
        title: "Success",
        description: "Book deleted successfully",
      })
    } catch (err: any) {
      console.error("Error deleting book:", err)
      toast({
        title: "Error",
        description: "Failed to delete book. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4 p-4 border rounded-md">
            <Skeleton className="h-12 w-12 rounded-md" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={fetchBooks}>Try Again</Button>
      </div>
    )
  }

  if (books.length === 0) {
    return (
      <div className="p-8 text-center border rounded-md">
        <h3 className="text-lg font-medium mb-2">No books found</h3>
        <p className="text-muted-foreground mb-4">Get started by creating your first book.</p>
        <Button asChild>
          <Link href="/admin/books/new" className="inline-flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            Create New Book
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {books.map((book) => (
        <div key={book.id} className="flex items-center p-4 border rounded-md hover:bg-muted/50 transition-colors">
          <div className="h-16 w-12 bg-muted rounded-sm overflow-hidden mr-4 flex-shrink-0">
            {book.cover_image ? (
              <img
                src={book.cover_image || "/placeholder.svg"}
                alt={book.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-amber-100">
                <BookOpen className="h-6 w-6 text-amber-600" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center">
              <h3 className="font-medium truncate">{book.title}</h3>
              <Badge variant={book.status === "published" ? "success" : "secondary"} className="ml-2">
                {book.status || "Draft"}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground truncate">By {book.author}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Last updated: {new Date(book.updated_at || book.created_at).toLocaleDateString()}
            </p>
          </div>

          <div className="flex items-center gap-2 ml-4">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/admin/books/${book.id}/chapters`}>Chapters</Link>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={`/admin/books/${book.id}`} className="cursor-pointer">
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/books/${book.id}`} className="cursor-pointer">
                    <BookOpen className="mr-2 h-4 w-4" />
                    View
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600 focus:text-red-600 cursor-pointer"
                  onClick={() => handleDeleteBook(book.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  )
}

