import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function BookmarksLoading() {
  return (
    <div className="container py-10 mt-16">
      <Skeleton className="h-10 w-48 mb-6" />

      <div className="mb-4">
        <Skeleton className="h-10 w-72" />
      </div>

      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-full mt-2" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex border rounded-lg overflow-hidden">
                <div className="w-20 h-32 bg-gray-100 flex-shrink-0">
                  <Skeleton className="w-full h-full" />
                </div>
                <div className="p-4 flex flex-col justify-between w-full">
                  <div>
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-4 w-32 mt-1" />
                  </div>
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

