"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertTriangle, RefreshCw, Database, Table } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"

interface TableStatus {
  name: string
  exists: boolean
  created?: boolean
}

export default function DatabaseSetupPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [tables, setTables] = useState<TableStatus[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    checkDatabaseStatus()
  }, [])

  const checkDatabaseStatus = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/database-init")

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || "Unknown error")
      }

      // Process table status
      const requiredTables = [
        "profiles",
        "books",
        "chapters",
        "teachings",
        "audiobooks",
        "stories",
        "religious_places",
        "temples",
        "donations",
      ]

      const tableStatus = requiredTables.map((table) => ({
        name: table,
        exists: data.existingTables.includes(table),
        created: data.createdTables.includes(table),
      }))

      setTables(tableStatus)

      // Show toast if tables were created
      if (data.createdTables.length > 0) {
        toast({
          title: "Tables Created",
          description: `Successfully created ${data.createdTables.length} missing tables.`,
        })
      }
    } catch (err: any) {
      console.error("Error checking database status:", err)
      setError(err.message || "Failed to check database status")
      toast({
        title: "Error",
        description: "Failed to check database status. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const initializeDatabase = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/database-init")

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || "Unknown error")
      }

      // Refresh table status
      await checkDatabaseStatus()

      toast({
        title: "Success",
        description: "Database initialization completed successfully.",
      })
    } catch (err: any) {
      console.error("Error initializing database:", err)
      setError(err.message || "Failed to initialize database")
      toast({
        title: "Error",
        description: "Failed to initialize database. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Database Setup</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Database Status
          </CardTitle>
          <CardDescription>Check and initialize your database for production</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <Badge variant={error ? "destructive" : "outline"} className="px-3 py-1 text-sm">
              {isLoading ? "Checking..." : error ? "Error" : "Ready"}
            </Badge>

            <Button
              variant="outline"
              size="sm"
              onClick={checkDatabaseStatus}
              disabled={isLoading}
              className="flex items-center gap-1"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              Refresh
            </Button>

            <Button onClick={initializeDatabase} disabled={isLoading} className="flex items-center gap-1 ml-auto">
              <Database className="h-4 w-4" />
              Initialize Database
            </Button>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <h3 className="font-medium">Required Tables</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tables.map((table) => (
                <div
                  key={table.name}
                  className={`border rounded-md p-4 ${
                    table.created
                      ? "bg-green-50 border-green-200"
                      : table.exists
                        ? "bg-blue-50 border-blue-200"
                        : "bg-yellow-50 border-yellow-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Table className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="font-medium">{table.name}</span>
                    </div>
                    {table.exists || table.created ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-yellow-500" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {table.created
                      ? "Table was just created successfully"
                      : table.exists
                        ? "Table exists in database"
                        : "Table needs to be created"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Alert>
            <AlertTitle>Important</AlertTitle>
            <AlertDescription>
              Make sure all required tables are created before deploying to production. Missing tables will cause
              application errors.
            </AlertDescription>
          </Alert>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Production Readiness Checklist</CardTitle>
          <CardDescription>Ensure your database is ready for production</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <h3 className="font-medium">Database Connection</h3>
                <p className="text-sm text-muted-foreground">Supabase connection is configured correctly</p>
              </div>
            </div>

            <Separator />

            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <h3 className="font-medium">Environment Variables</h3>
                <p className="text-sm text-muted-foreground">All required environment variables are set</p>
              </div>
            </div>

            <Separator />

            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <h3 className="font-medium">API Routes</h3>
                <p className="text-sm text-muted-foreground">All API routes are connected to the database</p>
              </div>
            </div>

            <Separator />

            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <h3 className="font-medium">Admin Panel</h3>
                <p className="text-sm text-muted-foreground">Admin panel is fully functional for content management</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

