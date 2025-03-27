"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Loader2, Plus, Pencil, Trash2, Search, BookOpen } from "lucide-react"
import { getBooks, createBook, updateBook, deleteBook, getBookById } from "@/app/actions/book-actions"
import { toast } from "@/components/ui/use-toast"

export default function BooksManagementPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [books, setBooks] = useState<any[]>([])
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 0 })
  const [search, setSearch] = useState("")
  const [selectedBook, setSelectedBook] = useState<any>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    coverImage: "",
    category: "",
    publishedYear: "",
    language: "",
  })
  const [formMode, setFormMode] = useState<"create" | "edit">("create")
  const [submitting, setSubmitting] = useState(false)

  // Categories for dropdown
  const categories = ["Spiritual", "Philosophy", "History", "Biography", "Scripture", "Mythology"]
  const languages = ["Sanskrit", "Hindi", "English", "Tamil", "Bengali", "Telugu"]

  // Load books on initial render and when pagination/search changes
  useEffect(() => {
    loadBooks()
  }, [pagination.page, search])

  const loadBooks = async () => {
    setLoading(true)
    try {
      const result = await getBooks(pagination.page, pagination.limit, search)
      if (result.success) {
        setBooks(result.books)
        setPagination(result.pagination)
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to load books",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error loading books:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setPagination((prev) => ({ ...prev, page: 1 })) // Reset to first page on new search
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      coverImage: "",
      category: "",
      publishedYear: "",
      language: "",
    })
    setFormMode("create")
    setSelectedBook(null)
  }

  const handleEditBook = async (bookId: string) => {
    try {
      const result = await getBookById(bookId)
      if (result.success && result.book) {
        setSelectedBook(result.book)
        setFormData({
          title: result.book.title || "",
          description: result.book.description || "",
          coverImage: result.book.cover_image || "",
          category: result.book.category || "",
          publishedYear: result.book.published_year || "",
          language: result.book.language || "",
        })
        setFormMode("edit")
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to load book details",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error loading book details:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    }
  }

  const handleDeleteBook = async (bookId: string) => {
    if (!confirm("Are you sure you want to delete this book? This action cannot be undone.")) {
      return
    }

    try {
      const result = await deleteBook(bookId)
      if (result.success) {
        toast({
          title: "Success",
          description: result.message || "Book deleted successfully",
        })
        loadBooks()
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to delete book",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error deleting book:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    }
  }

  const handleViewChapters = (bookId: string) => {
    router.push(`/admin/books/${bookId}/chapters`)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const formDataObj = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        formDataObj.append(key, value)
      })

      let result

      if (formMode === "create") {
        result = await createBook(formDataObj)
      } else {
        if (!selectedBook) return
        result = await updateBook(selectedBook.id, formDataObj)
      }

      if (result.success) {
        toast({
          title: "Success",
          description: result.message || `Book ${formMode === "create" ? "created" : "updated"} successfully`,
        })
        resetForm()
        loadBooks()
      } else {
        toast({
          title: "Error",
          description: result.message || `Failed to ${formMode} book`,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error(`Error ${formMode === "create" ? "creating" : "updating"} book:`, error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Books Management</h1>

      <Tabs defaultValue="list" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="list">Book List</TabsTrigger>
          <TabsTrigger value="form">{formMode === "create" ? "Add New Book" : "Edit Book"}</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Books</CardTitle>
              <CardDescription>Manage your spiritual books collection</CardDescription>

              <form onSubmit={handleSearchSubmit} className="flex gap-2 mt-4">
                <Input
                  placeholder="Search books..."
                  value={search}
                  onChange={handleSearchChange}
                  className="max-w-sm"
                />
                <Button type="submit" variant="outline" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
              </form>
            </CardHeader>

            <CardContent>
              {loading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : books.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No books found. Add your first book to get started.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Language</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {books.map((book) => (
                        <TableRow key={book.id}>
                          <TableCell className="font-medium">{book.title}</TableCell>
                          <TableCell>{book.category || "—"}</TableCell>
                          <TableCell>{book.language || "—"}</TableCell>
                          <TableCell>{book.author_name || "—"}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleViewChapters(book.id)}
                                title="View Chapters"
                              >
                                <BookOpen className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleEditBook(book.id)}
                                title="Edit Book"
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleDeleteBook(book.id)}
                                title="Delete Book"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm text-muted-foreground">
                    Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
                    {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} books
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPagination((prev) => ({ ...prev, page: prev.page - 1 }))}
                      disabled={pagination.page === 1}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPagination((prev) => ({ ...prev, page: prev.page + 1 }))}
                      disabled={pagination.page === pagination.pages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>

            <CardFooter className="flex justify-end">
              <Button
                onClick={() => {
                  resetForm()
                  document
                    .querySelector('[data-value="form"]')
                    ?.dispatchEvent(new MouseEvent("click", { bubbles: true }))
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Book
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="form">
          <Card>
            <CardHeader>
              <CardTitle>{formMode === "create" ? "Add New Book" : "Edit Book"}</CardTitle>
              <CardDescription>
                {formMode === "create" ? "Add a new book to your collection" : "Update the details of an existing book"}
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input id="title" name="title" value={formData.title} onChange={handleInputChange} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="coverImage">Cover Image URL</Label>
                    <Input
                      id="coverImage"
                      name="coverImage"
                      value={formData.coverImage}
                      onChange={handleInputChange}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select value={formData.language} onValueChange={(value) => handleSelectChange("language", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a language" />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((language) => (
                          <SelectItem key={language} value={language}>
                            {language}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="publishedYear">Published Year</Label>
                    <Input
                      id="publishedYear"
                      name="publishedYear"
                      value={formData.publishedYear}
                      onChange={handleInputChange}
                      placeholder="e.g. 1950"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={5}
                  />
                </div>
              </CardContent>

              <CardFooter className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    resetForm()
                    document
                      .querySelector('[data-value="list"]')
                      ?.dispatchEvent(new MouseEvent("click", { bubbles: true }))
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {formMode === "create" ? "Creating..." : "Updating..."}
                    </>
                  ) : formMode === "create" ? (
                    "Create Book"
                  ) : (
                    "Update Book"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

