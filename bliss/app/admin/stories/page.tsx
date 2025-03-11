import { Button } from "@/components/ui/button"
import { PlusCircle, FileText, FolderPlus, Clock, Star, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function StoriesDashboard() {
  // Sample data - would come from your database
  const recentStories = [
    { id: "1-1", name: "The Dragon's Quest", updatedAt: "2 hours ago", folder: "Fantasy Stories" },
    { id: "2-1", name: "Space Odyssey", updatedAt: "Yesterday", folder: "Science Fiction" },
    { id: "3", name: "Story Ideas", updatedAt: "3 days ago", folder: null },
  ]

  const favoriteStories = [
    { id: "1-2", name: "Enchanted Forest", folder: "Fantasy Stories" },
    { id: "4", name: "Writing Tips", folder: null },
  ]

  return (
    <div className="w-full p-4 md:p-6 overflow-auto">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 border-b pb-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">Story Workspace</h1>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">Manage and organize your stories</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <FolderPlus className="h-4 w-4" />
            <span className="hidden sm:inline">New Folder</span>
            <span className="sm:hidden">Folder</span>
          </Button>
          <Button size="sm" className="gap-2 bg-amber-600 hover:bg-amber-700">
            <PlusCircle className="h-4 w-4" />
            <span className="hidden sm:inline">New Story</span>
            <span className="sm:hidden">Story</span>
          </Button>
        </div>
      </div>

      {/* Dashboard content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6">
        <div className="bg-white rounded-lg border shadow-sm p-3 md:p-5">
          <div className="flex items-center gap-2 mb-3 md:mb-4">
            <Clock className="h-4 w-4 md:h-5 md:w-5 text-gray-500" />
            <h2 className="text-lg md:text-xl font-semibold">Recent Stories</h2>
          </div>
          <div className="space-y-2">
            {recentStories.map((story) => (
              <Link key={story.id} href={`/admin/stories/${story.id}`}>
                <Card className="hover:bg-gray-50 transition-colors border-0 shadow-none">
                  <CardContent className="p-2 md:p-3 flex items-center">
                    <div className="bg-amber-50 p-1.5 md:p-2 rounded-md mr-2 md:mr-3 flex-shrink-0">
                      <FileText className="h-4 w-4 md:h-5 md:w-5 text-amber-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate text-sm md:text-base">{story.name}</h3>
                      <p className="text-xs md:text-sm text-gray-500 truncate">
                        {story.folder ? `${story.folder} • ` : ""}
                        {story.updatedAt}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border shadow-sm p-3 md:p-5">
          <div className="flex items-center gap-2 mb-3 md:mb-4">
            <Star className="h-4 w-4 md:h-5 md:w-5 text-amber-500" />
            <h2 className="text-lg md:text-xl font-semibold">Favorites</h2>
          </div>
          <div className="space-y-2">
            {favoriteStories.map((story) => (
              <Link key={story.id} href={`/admin/stories/${story.id}`}>
                <Card className="hover:bg-gray-50 transition-colors border-0 shadow-none">
                  <CardContent className="p-2 md:p-3 flex items-center">
                    <div className="bg-amber-50 p-1.5 md:p-2 rounded-md mr-2 md:mr-3 flex-shrink-0">
                      <FileText className="h-4 w-4 md:h-5 md:w-5 text-amber-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate text-sm md:text-base">{story.name}</h3>
                      <p className="text-xs md:text-sm text-gray-500 truncate">
                        {story.folder ? `${story.folder}` : ""}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border shadow-sm p-3 md:p-5 mb-6">
        <div className="flex items-center gap-2 mb-3 md:mb-4">
          <Calendar className="h-4 w-4 md:h-5 md:w-5 text-gray-500" />
          <h2 className="text-lg md:text-xl font-semibold">All Stories</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
          {[...recentStories, ...favoriteStories].map((story, index) => (
            <Link key={`all-${story.id}-${index}`} href={`/admin/stories/${story.id}`}>
              <Card className="hover:bg-gray-50 transition-colors h-full border shadow-sm">
                <CardContent className="p-3 md:p-4 flex flex-col h-full">
                  <div className="flex items-center mb-2">
                    <div className="bg-amber-50 p-1.5 rounded-md mr-2 flex-shrink-0">
                      <FileText className="h-3.5 w-3.5 text-amber-600" />
                    </div>
                    <h3 className="font-medium truncate text-sm md:text-base">{story.name}</h3>
                  </div>
                  <p className="text-xs md:text-sm text-gray-500 mt-auto">{story.folder ? `${story.folder}` : ""}</p>
                </CardContent>
              </Card>
            </Link>
          ))}

          <Button
            variant="outline"
            className="h-full min-h-[100px] md:min-h-[120px] border-dashed flex flex-col gap-2 hover:bg-gray-50"
            asChild
          >
            <Link href="/admin/stories/new">
              <PlusCircle className="h-5 w-5 md:h-6 md:w-6 text-amber-600" />
              <span className="text-sm md:text-base">New Story</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

