import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlacesList } from "@/components/admin/places-list"
import { Input } from "@/components/ui/input"
import { Search, Filter, PlusCircle, MapPin, Building, RefreshCw } from "lucide-react"

export default function ReligiousPlacesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Religious Places</h1>
          <p className="text-muted-foreground">Manage sacred locations and temples across India</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/religious-places/import">
            <Button variant="outline" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Import from Google Maps
            </Button>
          </Link>
          <Link href="/admin/religious-places/new">
            <Button className="bg-amber-600 hover:bg-amber-700">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Place
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Places</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-amber-500" />
              <div className="text-2xl font-bold">248</div>
            </div>
            <p className="text-xs text-muted-foreground">Sacred cities and locations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Temples</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4 text-amber-500" />
              <div className="text-2xl font-bold">1,456</div>
            </div>
            <p className="text-xs text-muted-foreground">Temples and shrines</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Most Popular</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Varanasi</div>
            <p className="text-xs text-muted-foreground">25,678 monthly views</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Last Import</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3 days ago</div>
            <p className="text-xs text-muted-foreground">Added 15 new places</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Religious Places</CardTitle>
            <CardDescription>Manage sacred locations and their temples</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search places..." className="w-[250px] pl-8" />
            </div>
            <Button variant="outline" size="sm" className="gap-1">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <PlacesList />
        </CardContent>
      </Card>
    </div>
  )
}

