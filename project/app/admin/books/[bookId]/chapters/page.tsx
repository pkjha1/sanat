"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Loader2, Plus, Pencil, Trash2, ArrowLeft } from "lucide-react"
import { getChapters, createChapter, updateChapter, deleteChapter, getChapterById } from "@/app/actions/chapter-actions"
import { getBookById } from "@/app/actions/book-actions"
import { toast } from "@/components/ui/use-toast"

export default function BookChaptersPage({ params }: { params: { bookId: string } }) {
  const router = useRouter()
  const { bookId } = params

  const [loading, setLoading] = useState(true)
  const [bookDetails, setBookDetails] = useState<any>(null)
  const [chapters, setChapters] = useState<any[]>([])
  const [selectedChapter, setSelectedChapter] = useState<any>(null)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    chapterNumber: "1",
  })
  const [formMode, setFormMode] = useState<"create" | "edit">("create")
  const [submitting, setSubmitting] = useState(false)

  // Load book details and chapters on initial render
  useEffect(() => {
    loadBookDetails()
    loadChapters()
  }, [bookId])

  const loadBookDetails = async () => {
    try {
      const result = await getBookById(bookId)
      if (result.success) {
        setBookDetails(result.book)
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

  const loadChapters = async () => {
    setLoading(true)
    try {
      const result = await getChapters(bookId)
      if (result.success) {
        setChapters(result.chapters)
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to load chapters",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error loading chapters:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      chapterNumber: "1",
    })
    setFormMode("create")
    setSelectedChapter(null)
  }

  const handleEditChapter = async (chapterId: string) => {
    try {
      const result = await getChapterById(chapterId)
      if (result.success && result.chapter) {
        setSelectedChapter(result.chapter)
        setFormData({
          title: result.chapter.title || "",
          content: result.chapter.content || "",
          chapterNumber: result.chapter.chapter_number?.toString() || "1",
        })
        setFormMode("edit")
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to load chapter details",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error loading chapter details:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    }
  }

  const handleDeleteChapter = async (chapterId: string) => {
    if (!confirm("Are you sure you want to delete this chapter? This action cannot be undone.")) {
      return
    }

    try {
      const result = await deleteChapter(chapterId)
      if (result.success) {
        toast({
          title: "Success",
          description: result.message || "Chapter deleted successfully",
        })
        loadChapters()
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to delete chapter",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error deleting chapter:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    }
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
        result = await createChapter(bookId, formDataObj)
      } else {
        if (!selectedChapter) return
        result = await updateChapter(selectedChapter.id, formDataObj)
      }

      if (result.success) {
        toast({
          title: "Success",
          description: result.message || `Chapter ${formMode === "create" ? "created" : "updated"} successfully`,
        })
        resetForm()
        loadChapters()
      } else {
        toast({
          title: "Error",
          description: result.message || `Failed to ${formMode} chapter`,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error(`Error ${formMode === "create" ? "creating" : "updating"} chapter:`, error)
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
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.push("/admin/books/management")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">{bookDetails ? `Chapters: ${bookDetails.title}` : "Book Chapters"}</h1>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="list">Chapter List</TabsTrigger>
          <TabsTrigger value="form">{formMode === "create" ? "Add New Chapter" : "Edit Chapter"}</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Chapters</CardTitle>
              <CardDescription>Manage chapters for {bookDetails?.title || "this book"}</CardDescription>
            </CardHeader>

            <CardContent>
              {loading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : chapters.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No chapters found. Add your first chapter to get started.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-16">Chapter</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Content Preview</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {chapters.map((chapter) => (
                        <TableRow key={chapter.id}>
                          <TableCell>{chapter.chapter_number}</TableCell>
                          <TableCell className="font-medium">{chapter.title}</TableCell>
                          <TableCell>
                            {chapter.content
                              ? chapter.content.substring(0, 100) + (chapter.content.length > 100 ? "..." : "")
                              : "—"}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleEditChapter(chapter.id)}
                                title="Edit Chapter"
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleDeleteChapter(chapter.id)}
                                title="Delete Chapter"
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
                Add New Chapter
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="form">
          <Card>
            <CardHeader>
              <CardTitle>{formMode === "create" ? "Add New Chapter" : "Edit Chapter"}</CardTitle>
              <CardDescription>
                {formMode === "create"
                  ? `Add a new chapter to "${bookDetails?.title || "this book"}"`
                  : `Update chapter details for "${bookDetails?.title || "this book"}"`}
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
                    <Label htmlFor="chapterNumber">Chapter Number *</Label>
                    <Input
                      id="chapterNumber"
                      name="chapterNumber"
                      type="number"
                      min="1"
                      value={formData.chapterNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    rows={15}
                    placeholder="Enter the chapter content here..."
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
                    "Create Chapter"
                  ) : (
                    "Update Chapter"
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

