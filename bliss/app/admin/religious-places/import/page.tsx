"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Search, MapPin, Building, Loader2, Check, AlertCircle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"

export default function ImportPlacesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [selectedPlaces, setSelectedPlaces] = useState<any[]>([])
  const [isImporting, setIsImporting] = useState(false)
  const [importStatus, setImportStatus] = useState<{ success: number; failed: number } | null>(null)

  const handleSearch = () => {
    if (!searchQuery.trim()) return

    setIsSearching(true)
    setSearchResults([])

    // Simulate API call to Google Maps
    setTimeout(() => {
      // Mock search results
      const results = [
        {
          id: "place_1",
          name: "Varanasi",
          state: "Uttar Pradesh",
          type: "City",
          temples: 156,
          mainDeity: "Lord Shiva",
          coordinates: "25.3176° N, 82.9739° E",
          image: "/placeholder.svg?height=100&width=150",
          selected: false,
        },
        {
          id: "place_2",
          name: "Tirupati",
          state: "Andhra Pradesh",
          type: "City",
          temples: 42,
          mainDeity: "Lord Venkateswara",
          coordinates: "13.6288° N, 79.4192° E",
          image: "/placeholder.svg?height=100&width=150",
          selected: false,
        },
        {
          id: "place_3",
          name: "Mathura",
          state: "Uttar Pradesh",
          type: "City",
          temples: 78,
          mainDeity: "Lord Krishna",
          coordinates: "27.4924° N, 77.6737° E",
          image: "/placeholder.svg?height=100&width=150",
          selected: false,
        },
      ]

      setSearchResults(results)
      setIsSearching(false)
    }, 1500)
  }

  const togglePlaceSelection = (placeId: string) => {
    setSearchResults(
      searchResults.map((place) => (place.id === placeId ? { ...place, selected: !place.selected } : place)),
    )
  }

  const handleImport = () => {
    const selectedItems = searchResults.filter((place) => place.selected)
    if (selectedItems.length === 0) return

    setIsImporting(true)
    setSelectedPlaces(selectedItems)

    // Simulate import process
    setTimeout(() => {
      setImportStatus({
        success: selectedItems.length,
        failed: 0,
      })
      setIsImporting(false)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/admin/religious-places" className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Import from Google Maps</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search for Religious Places</CardTitle>
          <CardDescription>Search for religious places and temples using Google Maps data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="places" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="places" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Places
              </TabsTrigger>
              <TabsTrigger value="temples" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                Temples
              </TabsTrigger>
            </TabsList>

            <TabsContent value="places" className="pt-4">
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="search-query">Search Query</Label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="search-query"
                          placeholder="Search for cities, regions, or religious sites..."
                          className="pl-8"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <Button onClick={handleSearch} disabled={isSearching || !searchQuery.trim()}>
                        {isSearching ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Searching...
                          </>
                        ) : (
                          "Search"
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="place-type">Place Type</Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="place-type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="city">City</SelectItem>
                        <SelectItem value="town">Town</SelectItem>
                        <SelectItem value="village">Village</SelectItem>
                        <SelectItem value="site">Religious Site</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="state">State/Region</Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="state">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All States</SelectItem>
                        <SelectItem value="andhra-pradesh">Andhra Pradesh</SelectItem>
                        <SelectItem value="gujarat">Gujarat</SelectItem>
                        <SelectItem value="karnataka">Karnataka</SelectItem>
                        <SelectItem value="kerala">Kerala</SelectItem>
                        <SelectItem value="maharashtra">Maharashtra</SelectItem>
                        <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                        <SelectItem value="uttar-pradesh">Uttar Pradesh</SelectItem>
                        <SelectItem value="west-bengal">West Bengal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="religion">Religion</Label>
                    <Select defaultValue="hindu">
                      <SelectTrigger id="religion">
                        <SelectValue placeholder="Select religion" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Religions</SelectItem>
                        <SelectItem value="hindu">Hinduism</SelectItem>
                        <SelectItem value="buddhist">Buddhism</SelectItem>
                        <SelectItem value="jain">Jainism</SelectItem>
                        <SelectItem value="sikh">Sikhism</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {searchResults.length > 0 && (
                  <div className="space-y-4 mt-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Search Results</h3>
                      <Button variant="outline" size="sm" onClick={() => setSearchResults([])}>
                        Clear Results
                      </Button>
                    </div>

                    <div className="border rounded-md">
                      <div className="flex items-center justify-between p-4 border-b">
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="select-all"
                            checked={searchResults.every((place) => place.selected)}
                            onCheckedChange={() => {
                              const allSelected = searchResults.every((place) => place.selected)
                              setSearchResults(searchResults.map((place) => ({ ...place, selected: !allSelected })))
                            }}
                          />
                          <Label htmlFor="select-all" className="text-sm font-medium">
                            Select All
                          </Label>
                        </div>
                        <Button
                          size="sm"
                          className="bg-amber-600 hover:bg-amber-700"
                          disabled={!searchResults.some((place) => place.selected) || isImporting}
                          onClick={handleImport}
                        >
                          {isImporting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Importing...
                            </>
                          ) : (
                            `Import Selected (${searchResults.filter((place) => place.selected).length})`
                          )}
                        </Button>
                      </div>

                      <div className="divide-y">
                        {searchResults.map((place) => (
                          <div key={place.id} className="flex items-center p-4 hover:bg-gray-50">
                            <div className="flex items-center gap-3 flex-1">
                              <Checkbox
                                id={`place-${place.id}`}
                                checked={place.selected}
                                onCheckedChange={() => togglePlaceSelection(place.id)}
                              />
                              <div className="flex items-center gap-3">
                                <img
                                  src={place.image || "/placeholder.svg"}
                                  alt={place.name}
                                  className="h-16 w-24 object-cover rounded-md"
                                />
                                <div>
                                  <h4 className="font-medium">{place.name}</h4>
                                  <p className="text-sm text-muted-foreground">{place.state}</p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                      {place.type}
                                    </Badge>
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                      <Building className="h-3 w-3" />
                                      <span>{place.temples} temples</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="text-xs text-muted-foreground font-mono">{place.coordinates}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {importStatus && (
                  <div
                    className={`p-4 rounded-md ${
                      importStatus.failed > 0
                        ? "bg-amber-50 border border-amber-200"
                        : "bg-green-50 border border-green-200"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {importStatus.failed > 0 ? (
                        <AlertCircle className="h-5 w-5 text-amber-500" />
                      ) : (
                        <Check className="h-5 w-5 text-green-500" />
                      )}
                      <h3 className="font-medium">
                        {importStatus.failed > 0
                          ? "Import completed with some issues"
                          : "Import completed successfully"}
                      </h3>
                    </div>
                    <p className="mt-2 text-sm">
                      Successfully imported {importStatus.success} places.
                      {importStatus.failed > 0 && ` Failed to import ${importStatus.failed} places.`}
                    </p>
                    {importStatus.success > 0 && (
                      <div className="mt-4">
                        <Link href="/admin/religious-places">
                          <Button size="sm">View Imported Places</Button>
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="temples" className="pt-4">
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="temple-search">Search Query</Label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="temple-search"
                          placeholder="Search for temples by name, deity, or location..."
                          className="pl-8"
                        />
                      </div>
                      <Button>Search</Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="temple-type">Temple Type</Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="temple-type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="mandir">Mandir</SelectItem>
                        <SelectItem value="temple">Temple</SelectItem>
                        <SelectItem value="shrine">Shrine</SelectItem>
                        <SelectItem value="math">Math</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="temple-deity">Main Deity</Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="temple-deity">
                        <SelectValue placeholder="Select deity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Deities</SelectItem>
                        <SelectItem value="shiva">Lord Shiva</SelectItem>
                        <SelectItem value="vishnu">Lord Vishnu</SelectItem>
                        <SelectItem value="krishna">Lord Krishna</SelectItem>
                        <SelectItem value="rama">Lord Rama</SelectItem>
                        <SelectItem value="hanuman">Lord Hanuman</SelectItem>
                        <SelectItem value="ganesha">Lord Ganesha</SelectItem>
                        <SelectItem value="durga">Goddess Durga</SelectItem>
                        <SelectItem value="lakshmi">Goddess Lakshmi</SelectItem>
                        <SelectItem value="saraswati">Goddess Saraswati</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="temple-location">Location</Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="temple-location">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Locations</SelectItem>
                        <SelectItem value="varanasi">Varanasi</SelectItem>
                        <SelectItem value="tirupati">Tirupati</SelectItem>
                        <SelectItem value="mathura">Mathura</SelectItem>
                        <SelectItem value="puri">Puri</SelectItem>
                        <SelectItem value="amritsar">Amritsar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox id="include-images" defaultChecked />
                  <Label htmlFor="include-images" className="text-sm">
                    Include images from Google Maps
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox id="fetch-reviews" defaultChecked />
                  <Label htmlFor="fetch-reviews" className="text-sm">
                    Fetch visitor reviews and ratings
                  </Label>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/admin/religious-places">
            <Button variant="outline">Cancel</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

