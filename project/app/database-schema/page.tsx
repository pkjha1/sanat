"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Database, RefreshCw, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface Column {
  column_name: string
  data_type: string
  is_nullable: string
  column_default: string | null
}

interface TableSchema {
  table: string
  columns: Column[]
}

interface SchemaResponse {
  success: boolean
  schema?: TableSchema[]
  error?: string
}

export default function DatabaseSchemaPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [schema, setSchema] = useState<TableSchema[]>([])
  const [error, setError] = useState<string | null>(null)
  const [selectedTable, setSelectedTable] = useState<string | null>(null)

  const fetchSchema = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/database-schema")
      const data: SchemaResponse = await response.json()

      if (!data.success || !data.schema) {
        throw new Error(data.error || "Failed to fetch schema")
      }

      setSchema(data.schema)

      // Select first table by default if available
      if (data.schema.length > 0 && !selectedTable) {
        setSelectedTable(data.schema[0].table)
      }
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching the database schema")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSchema()
  }, [])

  const getSelectedTableSchema = () => {
    return schema.find((t) => t.table === selectedTable)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Database Schema</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Database Structure
          </CardTitle>
          <CardDescription>View the structure of your Supabase database tables</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <Badge
              variant={error ? "destructive" : schema.length > 0 ? "success" : "outline"}
              className="px-3 py-1 text-sm"
            >
              {error ? "Error" : isLoading ? "Loading..." : schema.length > 0 ? "Schema Loaded" : "No Schema"}
            </Badge>

            <Button
              variant="outline"
              size="sm"
              onClick={fetchSchema}
              disabled={isLoading}
              className="flex items-center gap-1"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {schema.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-1 space-y-2">
                <h3 className="text-sm font-medium mb-2">Tables</h3>
                <div className="space-y-1">
                  {schema.map((table) => (
                    <Button
                      key={table.table}
                      variant={selectedTable === table.table ? "default" : "outline"}
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => setSelectedTable(table.table)}
                    >
                      {table.table}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="md:col-span-3">
                {selectedTable && getSelectedTableSchema() && (
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium">
                        Table Structure: <span className="font-bold">{selectedTable}</span>
                      </h3>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-muted">
                            <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                              Column Name
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Data Type</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Nullable</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Default</th>
                          </tr>
                        </thead>
                        <tbody>
                          {getSelectedTableSchema()?.columns.map((column, i) => (
                            <tr key={i} className="border-b border-muted">
                              <td className="px-4 py-2 text-sm font-medium">{column.column_name}</td>
                              <td className="px-4 py-2 text-sm">{column.data_type}</td>
                              <td className="px-4 py-2 text-sm">
                                {column.is_nullable === "YES" ? (
                                  <Badge variant="outline" className="bg-yellow-100">
                                    Nullable
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="bg-blue-100">
                                    Required
                                  </Badge>
                                )}
                              </td>
                              <td className="px-4 py-2 text-sm">
                                {column.column_default ? (
                                  <code className="bg-muted px-1 py-0.5 rounded text-xs">{column.column_default}</code>
                                ) : (
                                  <span className="text-muted-foreground">—</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : !error && !isLoading ? (
            <div className="bg-muted p-8 rounded-md text-center">
              <p className="text-muted-foreground">No tables found in the database</p>
            </div>
          ) : null}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Database Schema Guide</CardTitle>
          <CardDescription>Understanding your database structure</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Common Tables</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>
                  <strong>profiles</strong> - User profile information
                </li>
                <li>
                  <strong>books</strong> - Book metadata
                </li>
                <li>
                  <strong>chapters</strong> - Book chapter content
                </li>
                <li>
                  <strong>teachings</strong> - Video and article teachings
                </li>
                <li>
                  <strong>stories</strong> - Spiritual stories
                </li>
                <li>
                  <strong>religious_places</strong> - Religious sites information
                </li>
                <li>
                  <strong>donations</strong> - Donation records
                </li>
              </ul>
            </div>

            <Separator />

            <div>
              <h3 className="font-medium mb-2">Schema Management</h3>
              <p className="text-sm mb-2">You can modify your database schema through:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Supabase Dashboard Table Editor</li>
                <li>SQL Editor in Supabase Dashboard</li>
                <li>Migration scripts in your application</li>
                <li>Programmatic schema changes via the Supabase API</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

