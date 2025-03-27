"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"

interface Book {
  id: string
  title: string
  author: string
  description: string
  cover_image: string
}

interface Chapter {
  id: string
  book_id: string
  title: string
  content: string
  order_number: number
}

export default function StorageTestPage() {
  const [activeTab, setActiveTab] = useState("books")
  const [books, setBooks] = useState<Book[]>([])
  const [chapters, setChapters] = useState<Chapter[]>([])
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Book form state
  const [bookTitle, setBookTitle] = useState("")
  const [bookAuthor, setBookAuthor] = useState("")
  const [bookDescription, setBookDescription] = useState("")
  const [bookCoverImage, setBookCoverImage] = useState("/placeholder.svg?height=400&width=300")

  // Chapter form state
  const [chapterBookId, setChapterBookId] = useState("")
  const [chapterTitle, setChapterTitle] = useState("")
  const [chapterContent, setChapterContent] = useState("")
  const [chapterOrderNumber, setChapterOrderNumber] = useState(1)

  // Fetch books
  const fetchBooks = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/books")
      if (!response.ok) throw new Error("Failed to fetch books")
      const data = await response.json()
      setBooks(data)
    } catch (error) {
      console.error("Error fetching books:", error)
      toast({
        title: "Error",
        description: "Failed to fetch books",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch chapters
  const fetchChapters = async (bookId?: string) => {
    try {
      setIsLoading(true)
      const url = bookId ? `/api/chapters?book_id=${bookId}` : "/api/chapters"
      const response = await fetch(url)
      if (!response.ok) throw new Error("Failed to fetch chapters")
      const data = await response.json()
      setChapters(data)
    } catch (error) {
      console.error("Error fetching chapters:", error)
      toast({
        title: "Error",
        description: "Failed to fetch chapters",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Create book
  const createBook = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: bookTitle,
          author: bookAuthor,
          description: bookDescription,
          cover_image: bookCoverImage,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to create book")
      }

      const newBook = await response.json()
      setBooks([...books, newBook])
      resetBookForm()
      toast({
        title: "Success",
        description: "Book created successfully",
      })
    } catch (error) {
      console.error("Error creating book:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create book",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Update book
  const updateBook = async () => {
    if (!selectedBook) return

    try {
      setIsLoading(true)
      const response = await fetch(`/api/books/${selectedBook.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: bookTitle,
          author: bookAuthor,
          description: bookDescription,
          cover_image: bookCoverImage,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to update book")
      }

      const updatedBook = await response.json()
      setBooks(books.map((book) => (book.id === updatedBook.id ? updatedBook : book)))
      resetBookForm()
      setSelectedBook(null)
      toast({
        title: "Success",
        description: "Book updated successfully",
      })
    } catch (error) {
      console.error("Error updating book:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update book",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Delete book
  const deleteBook = async (id: string) => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/books/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to delete book")
      }

      setBooks(books.filter((book) => book.id !== id))
      toast({
        title: "Success",
        description: "Book deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting book:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete book",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Create chapter
  const createChapter = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/chapters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          book_id: chapterBookId,
          title: chapterTitle,
          content: chapterContent,
          order_number: chapterOrderNumber,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to create chapter")
      }

      const newChapter = await response.json()
      setChapters([...chapters, newChapter])
      resetChapterForm()
      toast({
        title: "Success",
        description: "Chapter created successfully",
      })
    } catch (error) {
      console.error("Error creating chapter:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create chapter",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Update chapter
  const updateChapter = async () => {
    if (!selectedChapter) return

    try {
      setIsLoading(true)
      const response = await fetch(`/api/chapters/${selectedChapter.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          book_id: chapterBookId,
          title: chapterTitle,
          content: chapterContent,
          order_number: chapterOrderNumber,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to update chapter")
      }

      const updatedChapter = await response.json()
      setChapters(chapters.map((chapter) => (chapter.id === updatedChapter.id ? updatedChapter : chapter)))
      resetChapterForm()
      setSelectedChapter(null)
      toast({
        title: "Success",
        description: "Chapter updated successfully",
      })
    } catch (error) {
      console.error("Error updating chapter:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update chapter",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Delete chapter
  const deleteChapter = async (id: string) => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/chapters/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to delete chapter")
      }

      setChapters(chapters.filter((chapter) => chapter.id !== id))
      toast({
        title: "Success",
        description: "Chapter deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting chapter:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete chapter",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Reset book form
  const resetBookForm = () => {
    setBookTitle("")
    setBookAuthor("")
    setBookDescription("")
    setBookCoverImage("/placeholder.svg?height=400&width=300")
  }

  // Reset chapter form
  const resetChapterForm = () => {
    setChapterBookId("")
    setChapterTitle("")
    setChapterContent("")
    setChapterOrderNumber(1)
  }

  // Select book for editing
  const selectBookForEdit = (book: Book) => {
    setSelectedBook(book)
    setBookTitle(book.title)
    setBookAuthor(book.author)
    setBookDescription(book.description || "")
    setBookCoverImage(book.cover_image || "/placeholder.svg?height=400&width=300")
  }

  // Select chapter for editing
  const selectChapterForEdit = (chapter: Chapter) => {
    setSelectedChapter(chapter)
    setChapterBookId(chapter.book_id)
    setChapterTitle(chapter.title)
    setChapterContent(chapter.content || "")
    setChapterOrderNumber(chapter.order_number || 1)
  }

  // Cancel book edit
  const cancelBookEdit = () => {
    setSelectedBook(null)
    resetBookForm()
  }

  // Cancel chapter edit
  const cancelChapterEdit = () => {
    setSelectedChapter(null)
    resetChapterForm()
  }

  // Load data on initial render
  useEffect(() => {
    fetchBooks()
    fetchChapters()
  }, [])

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Storage Test</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="books">Books</TabsTrigger>
          <TabsTrigger value="chapters">Chapters</TabsTrigger>
        </TabsList>

        <TabsContent value="books" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{selectedBook ? "Edit Book" : "Create New Book"}</CardTitle>
              <CardDescription>
                {selectedBook ? "Update the details of an existing book" : "Add a new book to the database"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bookTitle">Title</Label>
                <Input
                  id="bookTitle"
                  value={bookTitle}
                  onChange={(e) => setBookTitle(e.target.value)}
                  placeholder="Enter book title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bookAuthor">Author</Label>
                <Input
                  id="bookAuthor"
                  value={bookAuthor}
                  onChange={(e) => setBookAuthor(e.target.value)}
                  placeholder="Enter author name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bookDescription">Description</Label>
                <Textarea
                  id="bookDescription"
                  value={bookDescription}
                  onChange={(e) => setBookDescription(e.target.value)}
                  placeholder="Enter book description"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bookCoverImage">Cover Image URL</Label>
                <Input
                  id="bookCoverImage"
                  value={bookCoverImage}
                  onChange={(e) => setBookCoverImage(e.target.value)}
                  placeholder="Enter cover image URL"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              {selectedBook ? (
                <>
                  <Button variant="outline" onClick={cancelBookEdit}>
                    Cancel
                  </Button>
                  <Button onClick={updateBook} disabled={isLoading}>
                    {isLoading ? "Updating..." : "Update Book"}
                  </Button>
                </>
              ) : (
                <Button onClick={createBook} disabled={isLoading} className="ml-auto">
                  {isLoading ? "Creating..." : "Create Book"}
                </Button>
              )}
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Books List</CardTitle>
              <CardDescription>Manage your books</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {books.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center">
                        No books found
                      </TableCell>
                    </TableRow>
                  ) : (
                    books.map((book) => (
                      <TableRow key={book.id}>
                        <TableCell>{book.title}</TableCell>
                        <TableCell>{book.author}</TableCell>
                        <TableCell className="truncate max-w-xs">{book.description || "No description"}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button variant="outline" size="sm" onClick={() => selectBookForEdit(book)}>
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteBook(book.id)}
                            disabled={isLoading}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={fetchBooks} disabled={isLoading} className="ml-auto">
                Refresh
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="chapters" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{selectedChapter ? "Edit Chapter" : "Create New Chapter"}</CardTitle>
              <CardDescription>
                {selectedChapter ? "Update the details of an existing chapter" : "Add a new chapter to a book"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="chapterBookId">Book</Label>
                <select
                  id="chapterBookId"
                  value={chapterBookId}
                  onChange={(e) => setChapterBookId(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select a book</option>
                  {books.map((book) => (
                    <option key={book.id} value={book.id}>
                      {book.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="chapterTitle">Title</Label>
                <Input
                  id="chapterTitle"
                  value={chapterTitle}
                  onChange={(e) => setChapterTitle(e.target.value)}
                  placeholder="Enter chapter title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="chapterContent">Content</Label>
                <Textarea
                  id="chapterContent"
                  value={chapterContent}
                  onChange={(e) => setChapterContent(e.target.value)}
                  placeholder="Enter chapter content"
                  rows={5}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="chapterOrderNumber">Order Number</Label>
                <Input
                  id="chapterOrderNumber"
                  type="number"
                  value={chapterOrderNumber}
                  onChange={(e) => setChapterOrderNumber(Number.parseInt(e.target.value))}
                  placeholder="Enter order number"
                  min={1}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              {selectedChapter ? (
                <>
                  <Button variant="outline" onClick={cancelChapterEdit}>
                    Cancel
                  </Button>
                  <Button onClick={updateChapter} disabled={isLoading}>
                    {isLoading ? "Updating..." : "Update Chapter"}
                  </Button>
                </>
              ) : (
                <Button onClick={createChapter} disabled={isLoading} className="ml-auto">
                  {isLoading ? "Creating..." : "Create Chapter"}
                </Button>
              )}
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Chapters List</CardTitle>
              <CardDescription>Manage your chapters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Label htmlFor="filterBookId">Filter by Book</Label>
                <select
                  id="filterBookId"
                  onChange={(e) => fetchChapters(e.target.value || undefined)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">All Chapters</option>
                  {books.map((book) => (
                    <option key={book.id} value={book.id}>
                      {book.title}
                    </option>
                  ))}
                </select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Book</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Order</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {chapters.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center">
                        No chapters found
                      </TableCell>
                    </TableRow>
                  ) : (
                    chapters.map((chapter) => (
                      <TableRow key={chapter.id}>
                        <TableCell>{books.find((b) => b.id === chapter.book_id)?.title || "Unknown Book"}</TableCell>
                        <TableCell>{chapter.title}</TableCell>
                        <TableCell>{chapter.order_number}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button variant="outline" size="sm" onClick={() => selectChapterForEdit(chapter)}>
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteChapter(chapter.id)}
                            disabled={isLoading}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={() => fetchChapters()} disabled={isLoading} className="ml-auto">
                Refresh
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

