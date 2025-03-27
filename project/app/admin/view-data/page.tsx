"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type DataType = {
  id: string
  title?: string
  name?: string
  author?: string
  description?: string
  created_at: string
  [key: string]: any
}

export default function ViewDataPage() {
  const [activeTab, setActiveTab] = useState("books")
  const [data, setData] = useState<DataType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        let result

        switch (activeTab) {
          case "books":
            result = await fetch("/api/data/books")
            break
          case "teachings":
            result = await fetch("/api/data/teachings")
            break
          case "audiobooks":
            result = await fetch("/api/data/audiobooks")
            break
          case "places":
            result = await fetch("/api/data/religious-places")
            break
          case "stories":
            result = await fetch("/api/data/stories")
            break
          case "donations":
            result = await fetch("/api/data/donations")
            break
          default:
            result = await fetch("/api/data/books")
        }

        if (!result.ok) {
          throw new Error(`Failed to fetch data: ${result.statusText}`)
        }

        const jsonData = await result.json()
        setData(jsonData)
      } catch (err) {
        setError(`Error fetching data: ${err instanceof Error ? err.message : String(err)}`)
        setData([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [activeTab])

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>View Seeded Data</CardTitle>
          <CardDescription>Browse the sample data that has been added to the database.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-6 mb-8">
              <TabsTrigger value="books">Books</TabsTrigger>
              <TabsTrigger value="teachings">Teachings</TabsTrigger>
              <TabsTrigger value="audiobooks">Audiobooks</TabsTrigger>
              <TabsTrigger value="places">Places</TabsTrigger>
              <TabsTrigger value="stories">Stories</TabsTrigger>
              <TabsTrigger value="donations">Donations</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              {loading ? (
                <div className="flex justify-center items-center h-40">
                  <p>Loading...</p>
                </div>
              ) : error ? (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">{error}</div>
              ) : data.length === 0 ? (
                <div className="text-center py-8">
                  <p>No data found. Please run the seed script first.</p>
                </div>
              ) : (
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        {Object.keys(data[0])
                          .filter((key) => !["id", "updated_at"].includes(key) && typeof data[0][key] !== "object")
                          .map((key) => (
                            <TableHead key={key}>{key.replace(/_/g, " ").toUpperCase()}</TableHead>
                          ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.map((item, index) => (
                        <TableRow key={index}>
                          {Object.entries(item)
                            .filter(([key]) => !["id", "updated_at"].includes(key) && typeof item[key] !== "object")
                            .map(([key, value]) => (
                              <TableCell key={key}>
                                {key === "created_at" || key === "published_date" || key === "donation_date"
                                  ? new Date(value as string).toLocaleDateString()
                                  : key === "content" || key === "description"
                                    ? String(value).length > 100
                                      ? `${String(value).substring(0, 100)}...`
                                      : value
                                    : key === "cover_image" || key === "image_url"
                                      ? value
                                        ? "✓ (Image URL)"
                                        : "✗ (No Image)"
                                      : String(value)}
                              </TableCell>
                            ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

