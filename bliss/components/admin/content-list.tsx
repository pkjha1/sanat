import { Button } from "@/components/ui/button"

export function ContentList() {
  const contentItems = [
    { id: 1, title: "The Path to Inner Peace", type: "Video", status: "Published", date: "2023-03-15" },
    { id: 2, title: "Understanding Bhagavad Gita", type: "Article", status: "Published", date: "2023-03-10" },
    { id: 3, title: "Meditation Techniques", type: "Video", status: "Published", date: "2023-03-05" },
    { id: 4, title: "The Law of Karma", type: "Teaching", status: "Published", date: "2023-02-28" },
    { id: 5, title: "Sacred Temples of India", type: "Article", status: "Draft", date: "2023-02-20" },
  ]

  return (
    <div className="relative w-full overflow-auto">
      <table className="w-full caption-bottom text-sm">
        <thead className="[&_tr]:border-b">
          <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">ID</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Title</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Type</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {contentItems.map((item) => (
            <tr key={item.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <td className="p-4 align-middle">{item.id}</td>
              <td className="p-4 align-middle font-medium">{item.title}</td>
              <td className="p-4 align-middle">{item.type}</td>
              <td className="p-4 align-middle">
                <span
                  className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                    item.status === "Published"
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-amber-50 text-amber-700 border-amber-200"
                  }`}
                >
                  {item.status}
                </span>
              </td>
              <td className="p-4 align-middle">{item.date}</td>
              <td className="p-4 align-middle">
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

