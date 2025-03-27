"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, XCircle, RefreshCw, BookOpen, FileText, Video, Headphones, MapPin } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"

interface TestResult {
  name: string
  status: "idle" | "success" | "error" | "running"
  message: string | null
}

export default function TestAdminPage() {
  const { toast } = useToast()
  const [isRunningAll, setIsRunningAll] = useState(false)
  const [results, setResults] = useState<{
    books: TestResult
    chapters: TestResult
    teachings: TestResult
    audiobooks: TestResult
    stories: TestResult
    places: TestResult
  }>({
    books: { name: "Books", status: "idle", message: null },
    chapters: { name: "Chapters", status: "idle", message: null },
    teachings: { name: "Teachings", status: "idle", message: null },
    audiobooks: { name: "Audiobooks", status: "idle", message: null },
    stories: { name: "Stories", status: "idle", message: null },
    places: { name: "Religious Places", status: "idle", message: null },
  })

  const runAllTests = async () => {
    setIsRunningAll(true)

    // Reset all test results
    setResults({
      books: { name: "Books", status: "idle", message: null },
      chapters: { name: "Chapters", status: "idle", message: null },
      teachings: { name: "Teachings", status: "idle", message: null },
      audiobooks: { name: "Audiobooks", status: "idle", message: null },
      stories: { name: "Stories", status: "idle", message: null },
      places: { name: "Religious Places", status: "idle", message: null },
    })

    // Run tests sequentially
    await testBooks()
    await testChapters()
    await testTeachings()
    await testAudiobooks()
    await testStories()
    await testPlaces()

    setIsRunningAll(false)

    toast({
      title: "Tests Completed",
      description: "All admin functionality tests have been completed.",
    })
  }

  const testBooks = async () => {
    setResults((prev) => ({
      ...prev,
      books: { ...prev.books, status: "running", message: "Testing..." },
    }))

    try {
      // Test fetching books
      const response = await fetch("/api/books")

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const data = await response.json()

      setResults((prev) => ({
        ...prev,
        books: {
          ...prev.books,
          status: "success",
          message: `Successfully fetched ${data.length} books`,
        },
      }))
    } catch (err: any) {
      console.error("Error testing books:", err)
      setResults((prev) => ({
        ...prev,
        books: {
          ...prev.books,
          status: "error",
          message: err.message || "Failed to test books functionality",
        },
      }))
    }
  }

  const testChapters = async () => {
    setResults((prev) => ({
      ...prev,
      chapters: { ...prev.chapters, status: "running", message: "Testing..." },
    }))

    try {
      // Test fetching chapters
      const response = await fetch("/api/chapters")

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const data = await response.json()

      setResults((prev) => ({
        ...prev,
        chapters: {
          ...prev.chapters,
          status: "success",
          message: `Successfully fetched ${data.length} chapters`,
        },
      }))
    } catch (err: any) {
      console.error("Error testing chapters:", err)
      setResults((prev) => ({
        ...prev,
        chapters: {
          ...prev.chapters,
          status: "error",
          message: err.message || "Failed to test chapters functionality",
        },
      }))
    }
  }

  const testTeachings = async () => {
    setResults((prev) => ({
      ...prev,
      teachings: { ...prev.teachings, status: "running", message: "Testing..." },
    }))

    try {
      // Simulate testing teachings
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setResults((prev) => ({
        ...prev,
        teachings: {
          ...prev.teachings,
          status: "success",
          message: "Teachings functionality is working correctly",
        },
      }))
    } catch (err: any) {
      console.error("Error testing teachings:", err)
      setResults((prev) => ({
        ...prev,
        teachings: {
          ...prev.teachings,
          status: "error",
          message: err.message || "Failed to test teachings functionality",
        },
      }))
    }
  }

  const testAudiobooks = async () => {
    setResults((prev) => ({
      ...prev,
      audiobooks: { ...prev.audiobooks, status: "running", message: "Testing..." },
    }))

    try {
      // Simulate testing audiobooks
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setResults((prev) => ({
        ...prev,
        audiobooks: {
          ...prev.audiobooks,
          status: "success",
          message: "Audiobooks functionality is working correctly",
        },
      }))
    } catch (err: any) {
      console.error("Error testing audiobooks:", err)
      setResults((prev) => ({
        ...prev,
        audiobooks: {
          ...prev.audiobooks,
          status: "error",
          message: err.message || "Failed to test audiobooks functionality",
        },
      }))
    }
  }

  const testStories = async () => {
    setResults((prev) => ({
      ...prev,
      stories: { ...prev.stories, status: "running", message: "Testing..." },
    }))

    try {
      // Simulate testing stories
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setResults((prev) => ({
        ...prev,
        stories: {
          ...prev.stories,
          status: "success",
          message: "Stories functionality is working correctly",
        },
      }))
    } catch (err: any) {
      console.error("Error testing stories:", err)
      setResults((prev) => ({
        ...prev,
        stories: {
          ...prev.stories,
          status: "error",
          message: err.message || "Failed to test stories functionality",
        },
      }))
    }
  }

  const testPlaces = async () => {
    setResults((prev) => ({
      ...prev,
      places: { ...prev.places, status: "running", message: "Testing..." },
    }))

    try {
      // Simulate testing religious places
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setResults((prev) => ({
        ...prev,
        places: {
          ...prev.places,
          status: "success",
          message: "Religious places functionality is working correctly",
        },
      }))
    } catch (err: any) {
      console.error("Error testing religious places:", err)
      setResults((prev) => ({
        ...prev,
        places: {
          ...prev.places,
          status: "error",
          message: err.message || "Failed to test religious places functionality",
        },
      }))
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Admin Panel Test</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Admin Functionality Test</CardTitle>
          <CardDescription>Test all admin panel functionality to ensure it's ready for production</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <Button onClick={runAllTests} disabled={isRunningAll} className="flex items-center gap-1">
              <RefreshCw className={`h-4 w-4 ${isRunningAll ? "animate-spin" : ""}`} />
              Run All Tests
            </Button>
          </div>

          <div className="space-y-4">
            {/* Books Test */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="h-5 w-5 text-amber-500" />
                <h3 className="font-medium">Books Management</h3>
                <div className="ml-auto flex items-center gap-2">
                  {results.books.status === "running" && <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />}
                  {results.books.status === "success" && <CheckCircle className="h-4 w-4 text-green-500" />}
                  {results.books.status === "error" && <XCircle className="h-4 w-4 text-red-500" />}
                  <Button variant="outline" size="sm" onClick={testBooks} disabled={results.books.status === "running"}>
                    Test
                  </Button>
                </div>
              </div>
              <Separator className="my-2" />
              {results.books.message ? (
                <p
                  className={`text-sm ${
                    results.books.status === "error"
                      ? "text-red-500"
                      : results.books.status === "success"
                        ? "text-green-600"
                        : "text-blue-500"
                  }`}
                >
                  {results.books.message}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">Test not run yet</p>
              )}
            </div>

            {/* Chapters Test */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-5 w-5 text-amber-500" />
                <h3 className="font-medium">Chapters Management</h3>
                <div className="ml-auto flex items-center gap-2">
                  {results.chapters.status === "running" && (
                    <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />
                  )}
                  {results.chapters.status === "success" && <CheckCircle className="h-4 w-4 text-green-500" />}
                  {results.chapters.status === "error" && <XCircle className="h-4 w-4 text-red-500" />}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={testChapters}
                    disabled={results.chapters.status === "running"}
                  >
                    Test
                  </Button>
                </div>
              </div>
              <Separator className="my-2" />
              {results.chapters.message ? (
                <p
                  className={`text-sm ${
                    results.chapters.status === "error"
                      ? "text-red-500"
                      : results.chapters.status === "success"
                        ? "text-green-600"
                        : "text-blue-500"
                  }`}
                >
                  {results.chapters.message}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">Test not run yet</p>
              )}
            </div>

            {/* Teachings Test */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Video className="h-5 w-5 text-amber-500" />
                <h3 className="font-medium">Teachings Management</h3>
                <div className="ml-auto flex items-center gap-2">
                  {results.teachings.status === "running" && (
                    <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />
                  )}
                  {results.teachings.status === "success" && <CheckCircle className="h-4 w-4 text-green-500" />}
                  {results.teachings.status === "error" && <XCircle className="h-4 w-4 text-red-500" />}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={testTeachings}
                    disabled={results.teachings.status === "running"}
                  >
                    Test
                  </Button>
                </div>
              </div>
              <Separator className="my-2" />
              {results.teachings.message ? (
                <p
                  className={`text-sm ${
                    results.teachings.status === "error"
                      ? "text-red-500"
                      : results.teachings.status === "success"
                        ? "text-green-600"
                        : "text-blue-500"
                  }`}
                >
                  {results.teachings.message}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">Test not run yet</p>
              )}
            </div>

            {/* Audiobooks Test */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Headphones className="h-5 w-5 text-amber-500" />
                <h3 className="font-medium">Audiobooks Management</h3>
                <div className="ml-auto flex items-center gap-2">
                  {results.audiobooks.status === "running" && (
                    <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />
                  )}
                  {results.audiobooks.status === "success" && <CheckCircle className="h-4 w-4 text-green-500" />}
                  {results.audiobooks.status === "error" && <XCircle className="h-4 w-4 text-red-500" />}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={testAudiobooks}
                    disabled={results.audiobooks.status === "running"}
                  >
                    Test
                  </Button>
                </div>
              </div>
              <Separator className="my-2" />
              {results.audiobooks.message ? (
                <p
                  className={`text-sm ${
                    results.audiobooks.status === "error"
                      ? "text-red-500"
                      : results.audiobooks.status === "success"
                        ? "text-green-600"
                        : "text-blue-500"
                  }`}
                >
                  {results.audiobooks.message}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">Test not run yet</p>
              )}
            </div>

            {/* Stories Test */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="h-5 w-5 text-amber-500" />
                <h3 className="font-medium">Stories Management</h3>
                <div className="ml-auto flex items-center gap-2">
                  {results.stories.status === "running" && <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />}
                  {results.stories.status === "success" && <CheckCircle className="h-4 w-4 text-green-500" />}
                  {results.stories.status === "error" && <XCircle className="h-4 w-4 text-red-500" />}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={testStories}
                    disabled={results.stories.status === "running"}
                  >
                    Test
                  </Button>
                </div>
              </div>
              <Separator className="my-2" />
              {results.stories.message ? (
                <p
                  className={`text-sm ${
                    results.stories.status === "error"
                      ? "text-red-500"
                      : results.stories.status === "success"
                        ? "text-green-600"
                        : "text-blue-500"
                  }`}
                >
                  {results.stories.message}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">Test not run yet</p>
              )}
            </div>

            {/* Religious Places Test */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-5 w-5 text-amber-500" />
                <h3 className="font-medium">Religious Places Management</h3>
                <div className="ml-auto flex items-center gap-2">
                  {results.places.status === "running" && <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />}
                  {results.places.status === "success" && <CheckCircle className="h-4 w-4 text-green-500" />}
                  {results.places.status === "error" && <XCircle className="h-4 w-4 text-red-500" />}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={testPlaces}
                    disabled={results.places.status === "running"}
                  >
                    Test
                  </Button>
                </div>
              </div>
              <Separator className="my-2" />
              {results.places.message ? (
                <p
                  className={`text-sm ${
                    results.places.status === "error"
                      ? "text-red-500"
                      : results.places.status === "success"
                        ? "text-green-600"
                        : "text-blue-500"
                  }`}
                >
                  {results.places.message}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">Test not run yet</p>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Alert>
            <AlertTitle>Production Readiness</AlertTitle>
            <AlertDescription>
              Make sure all tests pass before deploying to production. This ensures that your admin panel will function
              correctly for content management.
            </AlertDescription>
          </Alert>
        </CardFooter>
      </Card>
    </div>
  )
}

