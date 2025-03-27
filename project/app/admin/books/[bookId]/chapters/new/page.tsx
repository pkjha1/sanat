import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save } from "lucide-react"

export default function NewChapterPage({ params }: { params: { bookId: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href={`/admin/books/${params.bookId}/chapters`} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">Add New Chapter</h1>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Chapter Information</CardTitle>
          <CardDescription>Enter the details for your new chapter</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="chapter-title">Chapter Title</Label>
              <Input id="chapter-title" placeholder="Enter chapter title" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="section">Section</Label>
              <Select>
                <SelectTrigger id="section">
                  <SelectValue placeholder="Select section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="introduction">Introduction</SelectItem>
                  <SelectItem value="section-1">Section I: Arjuna's Dilemma</SelectItem>
                  <SelectItem value="section-2">Section II: The Path of Action</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Chapter Type</Label>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="border rounded-md p-4 cursor-pointer hover:border-amber-500 hover:bg-amber-50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Text Chapter</h3>
                  <input
                    type="radio"
                    name="chapter-type"
                    value="text"
                    defaultChecked
                    className="h-4 w-4 text-amber-600"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Standard chapter with text content and formatting options.
                </p>
              </div>

              <div className="border rounded-md p-4 cursor-pointer hover:border-amber-500 hover:bg-amber-50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Image Gallery</h3>
                  <input type="radio" name="chapter-type" value="gallery" className="h-4 w-4 text-amber-600" />
                </div>
                <p className="text-sm text-muted-foreground">Chapter with multiple images and captions.</p>
              </div>

              <div className="border rounded-md p-4 cursor-pointer hover:border-amber-500 hover:bg-amber-50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Audio Chapter</h3>
                  <input type="radio" name="chapter-type" value="audio" className="h-4 w-4 text-amber-600" />
                </div>
                <p className="text-sm text-muted-foreground">Chapter with audio narration and optional text.</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="chapter-summary">Chapter Summary (Optional)</Label>
            <textarea
              id="chapter-summary"
              className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Enter a brief summary of this chapter"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href={`/admin/books/${params.bookId}/chapters`}>
            <Button variant="outline">Cancel</Button>
          </Link>
          <Link href={`/admin/books/${params.bookId}/chapters/new-chapter-id`}>
            <Button className="bg-amber-600 hover:bg-amber-700">
              <Save className="mr-2 h-4 w-4" />
              Create Chapter & Continue to Editor
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

