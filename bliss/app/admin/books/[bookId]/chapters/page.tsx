import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, PlusCircle, GripVertical, Edit, Trash2 } from "lucide-react"

export default function BookChaptersPage({ params }: { params: { bookId: string } }) {
  // This would be fetched from the database in a real application
  const book = {
    id: params.bookId,
    title: "The Bhagavad Gita: A New Translation",
    author: "Sadguru Riteshwarji Maharaj",
    sections: [
      {
        id: 1,
        title: "Introduction",
        chapters: [
          { id: 1, title: "Preface", status: "completed" },
          { id: 2, title: "About This Translation", status: "completed" },
          { id: 3, title: "Historical Context", status: "completed" },
        ],
      },
      {
        id: 2,
        title: "Section I: Arjuna's Dilemma",
        chapters: [
          { id: 4, title: "Chapter 1: The Battlefield of Kurukshetra", status: "completed" },
          { id: 5, title: "Chapter 2: The Yoga of Knowledge", status: "completed" },
        ],
      },
      {
        id: 3,
        title: "Section II: The Path of Action",
        chapters: [
          { id: 6, title: "Chapter 3: Karma Yoga", status: "completed" },
          { id: 7, title: "Chapter 4: The Path of Knowledge and Action", status: "in-progress" },
          { id: 8, title: "Chapter 5: The Path of Renunciation", status: "not-started" },
        ],
      },
    ],
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/admin/books" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{book.title}</h1>
            <p className="text-muted-foreground">Manage chapters and sections</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Preview Book</Button>
          <Link href={`/admin/books/${book.id}/chapters/new`}>
            <Button className="bg-amber-600 hover:bg-amber-700">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Chapter
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Book Structure</CardTitle>
            <CardDescription>Organize your book into sections and chapters</CardDescription>
          </div>
          <Button variant="outline">Add Section</Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {book.sections.map((section) => (
            <div key={section.id} className="space-y-2">
              <div className="flex items-center gap-2 bg-muted p-3 rounded-md">
                <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
                <div className="flex-1">
                  <h3 className="font-medium">{section.title}</h3>
                  <p className="text-xs text-muted-foreground">{section.chapters.length} chapters</p>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit Section</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete Section</span>
                  </Button>
                </div>
              </div>

              <div className="pl-6 space-y-2">
                {section.chapters.map((chapter) => (
                  <div key={chapter.id} className="flex items-center gap-2 border p-3 rounded-md">
                    <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
                    <div className="flex-1">
                      <h4 className="font-medium">{chapter.title}</h4>
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-block h-2 w-2 rounded-full ${
                            chapter.status === "completed"
                              ? "bg-green-500"
                              : chapter.status === "in-progress"
                                ? "bg-amber-500"
                                : "bg-gray-300"
                          }`}
                        />
                        <span className="text-xs text-muted-foreground capitalize">
                          {chapter.status.replace("-", " ")}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Link href={`/admin/books/${book.id}/chapters/${chapter.id}`}>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit Chapter</span>
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete Chapter</span>
                      </Button>
                    </div>
                  </div>
                ))}
                <Button variant="ghost" size="sm" className="ml-6">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Chapter to this Section
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

