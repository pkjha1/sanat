import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, PlusCircle, GripVertical, Edit, Trash2, Clock } from "lucide-react"
import { AudioPlayer } from "@/components/admin/audio-player"

export default function AudiobookChaptersPage({ params }: { params: { audiobookId: string } }) {
  // This would be fetched from the database in a real application
  const audiobook = {
    id: params.audiobookId,
    title: "The Bhagavad Gita: A New Translation",
    narrator: "Rajesh Kumar",
    sections: [
      {
        id: 1,
        title: "Introduction",
        chapters: [
          { id: 1, title: "Preface", duration: "5:23", status: "completed", audioUrl: "#" },
          { id: 2, title: "About This Translation", duration: "8:15", status: "completed", audioUrl: "#" },
          { id: 3, title: "Historical Context", duration: "12:40", status: "completed", audioUrl: "#" },
        ],
      },
      {
        id: 2,
        title: "Section I: Arjuna's Dilemma",
        chapters: [
          {
            id: 4,
            title: "Chapter 1: The Battlefield of Kurukshetra",
            duration: "24:18",
            status: "completed",
            audioUrl: "#",
          },
          { id: 5, title: "Chapter 2: The Yoga of Knowledge", duration: "28:45", status: "completed", audioUrl: "#" },
        ],
      },
      {
        id: 3,
        title: "Section II: The Path of Action",
        chapters: [
          { id: 6, title: "Chapter 3: Karma Yoga", duration: "22:10", status: "completed", audioUrl: "#" },
          {
            id: 7,
            title: "Chapter 4: The Path of Knowledge and Action",
            duration: "26:35",
            status: "in-progress",
            audioUrl: "#",
          },
          {
            id: 8,
            title: "Chapter 5: The Path of Renunciation",
            duration: "0:00",
            status: "not-started",
            audioUrl: null,
          },
        ],
      },
    ],
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/admin/audiobooks" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{audiobook.title}</h1>
            <p className="text-muted-foreground">Narrated by {audiobook.narrator} • Manage chapters and sections</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Preview Audiobook</Button>
          <Link href={`/admin/audiobooks/${audiobook.id}/chapters/new`}>
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
            <CardTitle>Audiobook Structure</CardTitle>
            <CardDescription>Organize your audiobook into sections and chapters</CardDescription>
          </div>
          <Button variant="outline">Add Section</Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {audiobook.sections.map((section) => (
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
                        {chapter.duration !== "0:00" && (
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {chapter.duration}
                          </span>
                        )}
                      </div>
                    </div>

                    {chapter.audioUrl && <AudioPlayer audioUrl={chapter.audioUrl} title={chapter.title} />}

                    <div className="flex gap-1">
                      <Link href={`/admin/audiobooks/${audiobook.id}/chapters/${chapter.id}`}>
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

