"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, Filter, PlusCircle, MapPin, Building, Loader2 } from "lucide-react"
import { TemplesList } from "@/components/admin/temples-list"

export default function PlaceTemplesPage({ params }: { params: { placeId: string } }) {
  const [isLoading, setIsLoading] = useState(true)
  const [place, setPlace] = useState<any>(null)

  useEffect(() => {
    // In a real app, this would fetch the place data from your API
    setTimeout(() => {
      setPlace({
        id: params.placeId,
        name: "Varanasi",
        state: "Uttar Pradesh",
        type: "City",
        temples: 156,
        mainDeity: "Lord Shiva",
        significance: "One of the oldest continuously inhabited cities in the world and a major religious hub.",
        coordinates: "25.3176° N, 82.9739° E",
        image: "/placeholder.svg?height=300&width=500",
      })
      setIsLoading(false)
    }, 1000)
  }, [params.placeId])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/admin/religious-places" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{place.name}</h1>
            <p className="text-muted-foreground">
              Manage temples in {place.name}, {place.state}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/admin/religious-places/${place.id}/import-temples`}>
            <Button variant="outline" className="gap-2">
              <Building className="h-4 w-4" />
              Import Temples
            </Button>
          </Link>
          <Link href={`/admin/religious-places/${place.id}/temples/new`}>
            <Button className="bg-amber-600 hover:bg-amber-700">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Temple
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Temples</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4 text-amber-500" />
              <div className="text-2xl font-bold">{place.temples}</div>
            </div>
            <p className="text-xs text-muted-foreground">In {place.name}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Main Deity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{place.mainDeity}</div>
            <p className="text-xs text-muted-foreground">Most worshipped</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Location</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-amber-500" />
              <div className="text-lg font-medium font-mono">{place.coordinates}</div>
            </div>
            <p className="text-xs text-muted-foreground">{place.state}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Temples in {place.name}</CardTitle>
            <CardDescription>Manage temples and their information</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search temples..." className="w-[250px] pl-8" />
            </div>
            <Button variant="outline" size="sm" className="gap-1">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <TemplesList placeId={params.placeId} />
        </CardContent>
      </Card>
    </div>
  )
}

