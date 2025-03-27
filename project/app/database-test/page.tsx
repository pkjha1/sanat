"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircleIcon,
  XCircle,
  AlertTriangle,
  RefreshCw,
  Database,
  Table,
  FileText,
  Edit,
  Trash2,
  Plus,
} from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { createClient } from "@supabase/supabase-js"

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
const supabase = createClient(supabaseUrl, supabaseKey)

// Mock data
const mockBooks = [
  { id: 1, title: "The Bhagavad Gita", author: "Vyasa", description: "Ancient Hindu scripture" },
  { id: 2, title: "Yoga Sutras", author: "Patanjali", description: "Classical yoga philosophy" },
  { id: 3, title: "Upanishads", author: "Various Authors", description: "Ancient Sanskrit texts" },
]

export default function DatabaseTestPage() {
  const [books, setBooks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    description: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "success" | "error">("idle")
  const [connectionDetails, setConnectionDetails] = useState<any>(null)
  const [connectionError, setConnectionError] = useState<string | null>(null)
  const [tables, setTables] = useState<string[]>([])
  const [selectedTable, setSelectedTable] = useState<string | null>(null)
  const [tableData, setTableData] = useState<any[]>([])
  const [crudResults, setCrudResults] = useState<{
    create: { status: "idle" | "success" | "error"; message: string | null; data: any | null }
    read: { status: "idle"; message: null; data: null }
    update: { status: "idle" | "success" | "error"; message: string | null; data: any | null }
    delete: { status: "idle" | "success" | "error"; message: string | null; data: any | null }
  }>({
    create: { status: "idle", message: null, data: null },
    read: { status: "idle", message: null, data: null },
    update: { status: "idle", message: null, data: null },
    delete: { status: "idle", message: null, data: null },
  })

  useEffect(() => {
    async function fetchBooks() {
      try {
        setLoading(true)
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Set mock data
        setBooks(mockBooks)
        setError(null)
      } catch (err) {
        setError("Failed to fetch books. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])

  // Test connection to Supabase
  const testConnection = async () => {
    setIsLoading(true)
    setConnectionStatus("idle")
    setConnectionError(null)
    setConnectionDetails(null)

    try {
      // Simple query to test connection
      const { data, error } = await supabase.from("profiles").select("count").limit(1)

      if (error) throw error

      // Get project details
      const { data: projectData } = await supabase.rpc("get_project_details", {})

      setConnectionStatus("success")
      setConnectionDetails({
        project: projectData || "Unknown",
        timestamp: new Date().toISOString(),
      })

      // Get list of tables
      await fetchTables()
    } catch (err: any) {
      setConnectionStatus("error")
      setConnectionError(err.message || "Unknown error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch available tables
  const fetchTables = async () => {
    try {
      const { data, error } = await supabase
        .from("information_schema.tables")
        .select("table_name")
        .eq("table_schema", "public")

      if (error) throw error

      const tableNames = data
        .map((t) => t.table_name)
        .filter(
          // Filter out Supabase system tables
          (name) => !name.startsWith("_"),
        )

      setTables(tableNames)

      // Select first table by default if available
      if (tableNames.length > 0 && !selectedTable) {
        setSelectedTable(tableNames[0])
        fetchTableData(tableNames[0])
      }
    } catch (err: any) {
      console.error("Error fetching tables:", err)
    }
  }

  // Fetch data from selected table
  const fetchTableData = async (tableName: string) => {
    try {
      const { data, error } = await supabase.from(tableName).select("*").limit(5)

      if (error) throw error

      setTableData(data || [])
    } catch (err: any) {
      console.error(`Error fetching data from ${tableName}:`, err)
      setTableData([])
    }
  }

  // Handle table selection
  const handleTableSelect = (tableName: string) => {
    setSelectedTable(tableName)
    fetchTableData(tableName)
  }

  // Test CRUD operations on a test table
  const testCrudOperations = async () => {
    // Reset previous results
    setCrudResults({
      create: { status: "idle", message: null, data: null },
      read: { status: "idle", message: null, data: null },
      update: { status: "idle", message: null, data: null },
      delete: { status: "idle", message: null, data: null },
    })

    // Create a test record
    try {
      setCrudResults((prev) => ({
        ...prev,
        create: { ...prev.create, status: "idle", message: "Testing..." },
      }))

      const testData = {
        name: `Test User ${Date.now()}`,
        full_name: `Test User ${Date.now()}`, // Use full_name instead of name if needed
        created_at: new Date().toISOString(),
      }

      // Only add email if it's supported
      try {
        const { data: columnExists } = await supabase
          .from("information_schema.columns")
          .select("column_name")
          .eq("table_schema", "public")
          .eq("table_name", "profiles")
          .eq("column_name", "email")
          .single()

        if (columnExists) {
          testData.email = `test${Date.now()}@example.com`
        }
      } catch (err) {
        // If we can't check, try without email
        console.warn("Couldn't verify email column, proceeding without it")
      }

      const { data, error } = await supabase.from("profiles").insert(testData).select()

      if (error) {
        // If error mentions missing email column, suggest initialization
        if (error.message.includes("email") && error.message.includes("column")) {
          throw new Error(
            `${error.message}. Please visit /admin/init-profiles to initialize the profiles table with the correct schema.`,
          )
        }
        throw error
      }

      const createdRecord = data[0]

      setCrudResults((prev) => ({
        ...prev,
        create: {
          status: "success",
          message: "Successfully created test record",
          data: createdRecord,
        },
      }))

      // Read the created record
      await testReadOperation(createdRecord.id)

      // Update the created record
      await testUpdateOperation(createdRecord.id)

      // Delete the created record
      await testDeleteOperation(createdRecord.id)
    } catch (err: any) {
      setCrudResults((prev) => ({
        ...prev,
        create: {
          status: "error",
          message: `Error creating record: ${err.message}`,
          data: null,
        },
      }))
    }
  }

  // Test read operation
  const testReadOperation = async (id: string) => {
    try {
      setCrudResults((prev) => ({
        ...prev,
        read: { ...prev.read, status: "idle", message: "Testing..." },
      }))

      const { data, error } = await supabase.from("profiles").select("*").eq("id", id).single()

      if (error) throw error

      setCrudResults((prev) => ({
        ...prev,
        read: {
          status: "success",
          message: "Successfully read test record",
          data,
        },
      }))
    } catch (err: any) {
      setCrudResults((prev) => ({
        ...prev,
        read: {
          status: "error",
          message: `Error reading record: ${err.message}`,
          data: null,
        },
      }))
    }
  }

  // Test update operation
  const testUpdateOperation = async (id: string) => {
    try {
      setCrudResults((prev) => ({
        ...prev,
        update: { ...prev.update, status: "idle", message: "Testing..." },
      }))

      const updateData = {
        updated_at: new Date().toISOString(),
        name: `Updated Test User ${Date.now()}`,
      }

      const { data, error } = await supabase.from("profiles").update(updateData).eq("id", id).select()

      if (error) throw error

      setCrudResults((prev) => ({
        ...prev,
        update: {
          status: "success",
          message: "Successfully updated test record",
          data: data[0],
        },
      }))
    } catch (err: any) {
      setCrudResults((prev) => ({
        ...prev,
        update: {
          status: "error",
          message: `Error updating record: ${err.message}`,
          data: null,
        },
      }))
    }
  }

  // Test delete operation
  const testDeleteOperation = async (id: string) => {
    try {
      setCrudResults((prev) => ({
        ...prev,
        delete: { ...prev.delete, status: "idle", message: "Testing..." },
      }))

      const { error } = await supabase.from("profiles").delete().eq("id", id)

      if (error) throw error

      setCrudResults((prev) => ({
        ...prev,
        delete: {
          status: "success",
          message: "Successfully deleted test record",
          data: { id },
        },
      }))
    } catch (err: any) {
      setCrudResults((prev) => ({
        ...prev,
        delete: {
          status: "error",
          message: `Error deleting record: ${err.message}`,
          data: null,
        },
      }))
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewBook((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Add new book to mock data
      const newId = books.length > 0 ? Math.max(...books.map((book) => book.id)) + 1 : 1
      const bookToAdd = { id: newId, ...newBook }

      setBooks((prev) => [...prev, bookToAdd])
      setSuccess("Book added successfully!")

      // Reset form
      setNewBook({
        title: "",
        author: "",
        description: "",
      })
    } catch (err) {
      setError("Failed to add book. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Run connection test on component mount
  useEffect(() => {
    testConnection()
  }, [])

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Database Connection Test</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Connection Status
          </CardTitle>
          <CardDescription>Testing connection to Supabase database</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <Badge
              variant={
                connectionStatus === "idle" ? "outline" : connectionStatus === "success" ? "success" : "destructive"
              }
              className="px-3 py-1 text-sm"
            >
              {connectionStatus === "idle"
                ? "Testing..."
                : connectionStatus === "success"
                  ? "Connected"
                  : "Connection Failed"}
            </Badge>

            <Button
              variant="outline"
              size="sm"
              onClick={testConnection}
              disabled={isLoading}
              className="flex items-center gap-1"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>

          {connectionStatus === "success" && connectionDetails && (
            <div className="bg-muted p-4 rounded-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Project</p>
                  <p>{connectionDetails.project || "Unknown"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Last Checked</p>
                  <p>{new Date(connectionDetails.timestamp).toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}

          {connectionStatus === "error" && connectionError && (
            <Alert variant="destructive" className="mt-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Connection Error</AlertTitle>
              <AlertDescription>{connectionError}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {connectionStatus === "success" && (
        <Tabs defaultValue="tables" className="mb-8">
          <TabsList>
            <TabsTrigger value="tables">Database Tables</TabsTrigger>
            <TabsTrigger value="crud">CRUD Operations</TabsTrigger>
            <TabsTrigger value="view">View Books</TabsTrigger>
            <TabsTrigger value="add">Add Book</TabsTrigger>
          </TabsList>

          <TabsContent value="tables">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Table className="h-5 w-5" />
                  Database Tables
                </CardTitle>
                <CardDescription>View available tables and sample data</CardDescription>
              </CardHeader>
              <CardContent>
                {tables.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="md:col-span-1 space-y-2">
                      <h3 className="text-sm font-medium mb-2">Available Tables</h3>
                      <div className="space-y-1">
                        {tables.map((table) => (
                          <Button
                            key={table}
                            variant={selectedTable === table ? "default" : "outline"}
                            size="sm"
                            className="w-full justify-start"
                            onClick={() => handleTableSelect(table)}
                          >
                            {table}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="md:col-span-3">
                      {selectedTable && (
                        <>
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium">
                              Sample Data from <span className="font-bold">{selectedTable}</span>
                            </h3>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => fetchTableData(selectedTable)}
                              className="flex items-center gap-1"
                            >
                              <RefreshCw className="h-4 w-4" />
                              Refresh
                            </Button>
                          </div>

                          {tableData.length > 0 ? (
                            <div className="overflow-x-auto">
                              <table className="w-full border-collapse">
                                <thead>
                                  <tr className="bg-muted">
                                    {Object.keys(tableData[0]).map((key) => (
                                      <th
                                        key={key}
                                        className="px-4 py-2 text-left text-xs font-medium text-muted-foreground"
                                      >
                                        {key}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {tableData.map((row, i) => (
                                    <tr key={i} className="border-b border-muted">
                                      {Object.values(row).map((value: any, j) => (
                                        <td key={j} className="px-4 py-2 text-sm">
                                          {typeof value === "object"
                                            ? JSON.stringify(value).substring(0, 30) +
                                              (JSON.stringify(value).length > 30 ? "..." : "")
                                            : String(value).substring(0, 30) + (String(value).length > 30 ? "..." : "")}
                                        </td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          ) : (
                            <div className="bg-muted p-8 rounded-md text-center">
                              <p className="text-muted-foreground">No data available in this table</p>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="bg-muted p-8 rounded-md text-center">
                    <p className="text-muted-foreground">No tables found in the database</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="crud">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  CRUD Operations Test
                </CardTitle>
                <CardDescription>Test Create, Read, Update, Delete operations on the profiles table</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <Button onClick={testCrudOperations} className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Run CRUD Tests
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Create Operation */}
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Plus className="h-5 w-5 text-green-500" />
                      <h3 className="font-medium">Create Operation</h3>
                      {crudResults.create.status === "success" && (
                        <CheckCircleIcon className="h-4 w-4 text-green-500 ml-auto" />
                      )}
                      {crudResults.create.status === "error" && <XCircle className="h-4 w-4 text-red-500 ml-auto" />}
                    </div>
                    <Separator className="my-2" />
                    {crudResults.create.message ? (
                      <div>
                        <p
                          className={`text-sm ${
                            crudResults.create.status === "error"
                              ? "text-red-500"
                              : crudResults.create.status === "success"
                                ? "text-green-600"
                                : ""
                          }`}
                        >
                          {crudResults.create.message}
                        </p>
                        {crudResults.create.data && (
                          <pre className="bg-muted p-2 rounded text-xs mt-2 overflow-x-auto">
                            {JSON.stringify(crudResults.create.data, null, 2)}
                          </pre>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">Test not run yet</p>
                    )}
                    {crudResults.create.status === "error" && (
                      <div>
                        <p className="text-sm text-red-500">{crudResults.create.message}</p>
                        {crudResults.create.message?.includes("init-profiles") && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-2"
                            onClick={() => (window.location.href = "/admin/init-profiles")}
                          >
                            Initialize Profiles Table
                          </Button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Read Operation */}
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="h-5 w-5 text-blue-500" />
                      <h3 className="font-medium">Read Operation</h3>
                      {crudResults.read.status === "success" && (
                        <CheckCircleIcon className="h-4 w-4 text-green-500 ml-auto" />
                      )}
                      {crudResults.read.status === "error" && <XCircle className="h-4 w-4 text-red-500 ml-auto" />}
                    </div>
                    <Separator className="my-2" />
                    {crudResults.read.message ? (
                      <div>
                        <p
                          className={`text-sm ${
                            crudResults.read.status === "error"
                              ? "text-red-500"
                              : crudResults.read.status === "success"
                                ? "text-green-600"
                                : ""
                          }`}
                        >
                          {crudResults.read.message}
                        </p>
                        {crudResults.read.data && (
                          <pre className="bg-muted p-2 rounded text-xs mt-2 overflow-x-auto">
                            {JSON.stringify(crudResults.read.data, null, 2)}
                          </pre>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">Test not run yet</p>
                    )}
                  </div>

                  {/* Update Operation */}
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Edit className="h-5 w-5 text-amber-500" />
                      <h3 className="font-medium">Update Operation</h3>
                      {crudResults.update.status === "success" && (
                        <CheckCircleIcon className="h-4 w-4 text-green-500 ml-auto" />
                      )}
                      {crudResults.update.status === "error" && <XCircle className="h-4 w-4 text-red-500 ml-auto" />}
                    </div>
                    <Separator className="my-2" />
                    {crudResults.update.message ? (
                      <div>
                        <p
                          className={`text-sm ${
                            crudResults.update.status === "error"
                              ? "text-red-500"
                              : crudResults.update.status === "success"
                                ? "text-green-600"
                                : ""
                          }`}
                        >
                          {crudResults.update.message}
                        </p>
                        {crudResults.update.data && (
                          <pre className="bg-muted p-2 rounded text-xs mt-2 overflow-x-auto">
                            {JSON.stringify(crudResults.update.data, null, 2)}
                          </pre>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">Test not run yet</p>
                    )}
                  </div>

                  {/* Delete Operation */}
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Trash2 className="h-5 w-5 text-red-500" />
                      <h3 className="font-medium">Delete Operation</h3>
                      {crudResults.delete.status === "success" && (
                        <CheckCircleIcon className="h-4 w-4 text-green-500 ml-auto" />
                      )}
                      {crudResults.delete.status === "error" && <XCircle className="h-4 w-4 text-red-500 ml-auto" />}
                    </div>
                    <Separator className="my-2" />
                    {crudResults.delete.message ? (
                      <div>
                        <p
                          className={`text-sm ${
                            crudResults.delete.status === "error"
                              ? "text-red-500"
                              : crudResults.delete.status === "success"
                                ? "text-green-600"
                                : ""
                          }`}
                        >
                          {crudResults.delete.message}
                        </p>
                        {crudResults.delete.data && (
                          <pre className="bg-muted p-2 rounded text-xs mt-2 overflow-x-auto">
                            {JSON.stringify(crudResults.delete.data, null, 2)}
                          </pre>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">Test not run yet</p>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start">
                <Alert>
                  <AlertTitle>Note</AlertTitle>
                  <AlertDescription>
                    This test creates temporary records in the profiles table and then deletes them. It's safe to run in
                    both development and production environments.
                  </AlertDescription>
                </Alert>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="view">
            <Card>
              <CardHeader>
                <CardTitle>Books Collection</CardTitle>
                <CardDescription>View all books in the database</CardDescription>
              </CardHeader>
              <CardContent>
                {loading && <p className="text-center py-4">Loading books...</p>}

                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {!loading && books.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No books found in the database.</p>
                  </div>
                )}

                {!loading && books.length > 0 && (
                  <div className="space-y-4">
                    {books.map((book) => (
                      <Card key={book.id}>
                        <CardHeader className="pb-2">
                          <CardTitle>{book.title}</CardTitle>
                          <CardDescription>By {book.author}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p>{book.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="add">
            <Card>
              <CardHeader>
                <CardTitle>Add New Book</CardTitle>
                <CardDescription>Add a new book to the database</CardDescription>
              </CardHeader>
              <CardContent>
                {success && (
                  <Alert className="mb-4 bg-green-50 border-green-200">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertTitle className="text-green-800">Success</AlertTitle>
                    <AlertDescription className="text-green-700">{success}</AlertDescription>
                  </Alert>
                )}

                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleAddBook} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" name="title" value={newBook.title} onChange={handleInputChange} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="author">Author</Label>
                    <Input id="author" name="author" value={newBook.author} onChange={handleInputChange} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={newBook.description}
                      onChange={handleInputChange}
                      rows={4}
                      required
                    />
                  </div>

                  <Button type="submit" disabled={loading}>
                    {loading ? "Adding..." : "Add Book"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {/* Troubleshooting Guide */}
      <Card>
        <CardHeader>
          <CardTitle>Troubleshooting Guide</CardTitle>
          <CardDescription>Common issues and solutions for database connectivity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Connection Errors</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Verify that your Supabase URL and anon key are correctly set in environment variables</li>
                <li>Check that your Supabase project is active and not in maintenance mode</li>
                <li>Ensure your IP address is not blocked by Supabase's security settings</li>
                <li>Verify that your database is not paused due to inactivity</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2">Permission Errors</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Check Row Level Security (RLS) policies for the tables you're trying to access</li>
                <li>Verify that the anonymous role has appropriate permissions</li>
                <li>Ensure you're authenticated if the tables require authentication</li>
                <li>Check for any custom roles or policies that might be restricting access</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2">Schema Issues</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Verify that the tables you're trying to access exist in the database</li>
                <li>Check for any recent schema changes that might affect your queries</li>
                <li>Ensure column names and types match what your code expects</li>
                <li>Look for any constraints (unique, foreign key) that might be causing errors</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

