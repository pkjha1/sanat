"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Bold, Italic, List, ListOrdered, Image, LinkIcon, Save } from "lucide-react"

export default function ChapterEditorPage({
  params,
}: {
  params: { bookId: string; chapterId: string }
}) {
  const [activeTab, setActiveTab] = useState("editor")

  // This would be fetched from the database in a real application
  const chapter = {
    id: params.chapterId,
    title: "Chapter 1: The Battlefield of Kurukshetra",
    section: "Section I: Arjuna's Dilemma",
    status: "completed",
    content: `
      <p>Dhritarashtra said: O Sanjaya, what did my sons and the sons of Pandu do when they assembled on the holy field of Kurukshetra, eager for battle?</p>
      
      <p>Sanjaya said: Having seen the army of the Pandavas arrayed for battle, King Duryodhana approached his teacher Drona and spoke these words:</p>
      
      <p>"O teacher, behold this mighty army of the sons of Pandu, arranged for battle by your talented pupil, the son of Drupada.</p>
      
      <p>Here are heroes, mighty archers, equal in battle to Bhima and Arjuna: Yuyudhana, Virata, and the great warrior Drupada;</p>
      
      <p>Dhrishtaketu, Chekitana, and the valiant king of Kashi; Purujit, Kuntibhoja, and the great man Shaibya;</p>
      
      <p>The heroic Yudhamanyu, the valiant Uttamaujas, the son of Subhadra, and the sons of Draupadi—all of them great warriors.</p>
    `,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href={`/admin/books/${params.bookId}/chapters`} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">Edit Chapter</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Preview</Button>
          <Button className="bg-amber-600 hover:bg-amber-700">
            <Save className="mr-2 h-4 w-4" />
            Save Chapter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Chapter Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="chapter-title">Title</Label>
                <Input id="chapter-title" defaultValue={chapter.title} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="section">Section</Label>
                <Select defaultValue="section-1">
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

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue="completed">
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="not-started">Not Started</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Chapter Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="show-title">Show Title</Label>
                <input
                  type="checkbox"
                  id="show-title"
                  defaultChecked
                  className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="show-number">Show Chapter Number</Label>
                <input
                  type="checkbox"
                  id="show-number"
                  defaultChecked
                  className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="enable-comments">Enable Comments</Label>
                <input
                  type="checkbox"
                  id="enable-comments"
                  className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-3">
          <Card className="h-full">
            <CardHeader className="border-b">
              <Tabs defaultValue="editor" onValueChange={setActiveTab} className="w-full">
                <TabsList>
                  <TabsTrigger value="editor">Editor</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="p-0">
              {activeTab === "editor" ? (
                <div className="p-4">
                  <div className="mb-4 border rounded-md">
                    <div className="flex items-center gap-1 border-b p-2 bg-muted">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Bold className="h-4 w-4" />
                        <span className="sr-only">Bold</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Italic className="h-4 w-4" />
                        <span className="sr-only">Italic</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <List className="h-4 w-4" />
                        <span className="sr-only">Bullet List</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <ListOrdered className="h-4 w-4" />
                        <span className="sr-only">Numbered List</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Image className="h-4 w-4" />
                        <span className="sr-only">Insert Image</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <LinkIcon className="h-4 w-4" />
                        <span className="sr-only">Insert Link</span>
                      </Button>
                    </div>
                    <textarea className="w-full min-h-[500px] p-4 focus:outline-none" defaultValue={chapter.content} />
                  </div>
                </div>
              ) : (
                <div className="p-6 prose max-w-none">
                  <h2>Chapter 1: The Battlefield of Kurukshetra</h2>
                  <p>
                    Dhritarashtra said: O Sanjaya, what did my sons and the sons of Pandu do when they assembled on the
                    holy field of Kurukshetra, eager for battle?
                  </p>

                  <p>
                    Sanjaya said: Having seen the army of the Pandavas arrayed for battle, King Duryodhana approached
                    his teacher Drona and spoke these words:
                  </p>

                  <p>
                    "O teacher, behold this mighty army of the sons of Pandu, arranged for battle by your talented
                    pupil, the son of Drupada.
                  </p>

                  <p>
                    Here are heroes, mighty archers, equal in battle to Bhima and Arjuna: Yuyudhana, Virata, and the
                    great warrior Drupada;
                  </p>

                  <p>
                    Dhrishtaketu, Chekitana, and the valiant king of Kashi; Purujit, Kuntibhoja, and the great man
                    Shaibya;
                  </p>

                  <p>
                    The heroic Yudhamanyu, the valiant Uttamaujas, the son of Subhadra, and the sons of Draupadi—all of
                    them great warriors.
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t p-2 flex justify-end">
              <div className="text-xs text-muted-foreground">Last saved: 10 minutes ago</div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

