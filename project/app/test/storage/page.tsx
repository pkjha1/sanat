"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"
import { testDatabaseConnection, testCrudOperations } from "@/app/actions/test-actions"

export default function StorageTestPage() {
  const [connectionLoading, setConnectionLoading] = useState(false)
  const [connectionResult, setConnectionResult] = useState<any>(null)
  const [connectionError, setConnectionError] = useState<string | null>(null)

  const [crudLoading, setCrudLoading] = useState(false)
  const [crudResult, setCrudResult] = useState<any>(null)
  const [crudError, setCrudError] = useState<string | null>(null)

  const handleTestConnection = async () => {
    try {
      setConnectionLoading(true)
      setConnectionError(null)

      const response = await testDatabaseConnection()

      setConnectionResult(response)

      if (!response.success) {
        setConnectionError(response.message)
      }
    } catch (err) {
      console.error("Error testing database connection:", err)
      setConnectionError("An unexpected error occurred")
    } finally {
      setConnectionLoading(false)
    }
  }

  const handleTestCrud = async () => {
    try {
      setCrudLoading(true)
      setCrudError(null)

      const response = await testCrudOperations()

      setCrudResult(response)

      if (!response.success) {
        setCrudError(response.message)
      }
    } catch (err) {
      console.error("Error testing CRUD operations:", err)
      setCrudError("An unexpected error occurred")
    } finally {
      setCrudLoading(false)
    }
  }

  return (
    <div className="container py-10 mt-16">
      <h1 className="text-3xl font-bold mb-6">Storage Test</h1>

      <Tabs defaultValue="connection" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="connection">Database Connection</TabsTrigger>
          <TabsTrigger value="crud">CRUD Operations</TabsTrigger>
        </TabsList>

        <TabsContent value="connection">
          <Card>
            <CardHeader>
              <CardTitle>Database Connection Test</CardTitle>
              <CardDescription>Test the connection to your Neon PostgreSQL database</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-500">
                  Click the button below to test the connection to your database. This will verify that your application
                  can connect to the database and execute queries.
                </p>

                {connectionError && (
                  <div className="p-4 bg-red-50 text-red-700 rounded-md">
                    <p className="font-medium">Error:</p>
                    <p>{connectionError}</p>
                  </div>
                )}

                {connectionResult && connectionResult.success && (
                  <div className="p-4 bg-green-50 text-green-700 rounded-md">
                    <p className="font-medium">Success!</p>
                    <p>Connected to database successfully.</p>
                    <p className="mt-2 text-sm">
                      <strong>Database:</strong> {connectionResult.database}
                    </p>
                    <p className="text-sm">
                      <strong>Version:</strong> {connectionResult.version}
                    </p>
                    <p className="text-sm">
                      <strong>Tables:</strong> {connectionResult.tables?.length || 0}
                    </p>

                    {connectionResult.tables && connectionResult.tables.length > 0 && (
                      <div className="mt-4">
                        <p className="font-medium">Available Tables:</p>
                        <ul className="list-disc list-inside text-sm">
                          {connectionResult.tables.map((table: string) => (
                            <li key={table}>{table}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleTestConnection} disabled={connectionLoading}>
                {connectionLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Testing Connection...
                  </>
                ) : (
                  "Test Database Connection"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="crud">
          <Card>
            <CardHeader>
              <CardTitle>CRUD Operations Test</CardTitle>
              <CardDescription>Test Create, Read, Update, and Delete operations on the database</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-500">
                  Click the button below to test CRUD operations. This will create a temporary table, insert a record,
                  read it, update it, delete it, and then drop the table.
                </p>

                {crudError && (
                  <div className="p-4 bg-red-50 text-red-700 rounded-md">
                    <p className="font-medium">Error:</p>
                    <p>{crudError}</p>
                  </div>
                )}

                {crudResult && crudResult.success && (
                  <div className="p-4 bg-green-50 text-green-700 rounded-md">
                    <p className="font-medium">Success!</p>
                    <p>{crudResult.message}</p>

                    <div className="mt-4 space-y-4">
                      <div>
                        <p className="font-medium">Create:</p>
                        <pre className="text-xs bg-gray-100 p-2 rounded mt-1 overflow-auto">
                          {JSON.stringify(crudResult.results.create, null, 2)}
                        </pre>
                      </div>

                      <div>
                        <p className="font-medium">Read:</p>
                        <pre className="text-xs bg-gray-100 p-2 rounded mt-1 overflow-auto">
                          {JSON.stringify(crudResult.results.read, null, 2)}
                        </pre>
                      </div>

                      <div>
                        <p className="font-medium">Update:</p>
                        <pre className="text-xs bg-gray-100 p-2 rounded mt-1 overflow-auto">
                          {JSON.stringify(crudResult.results.update, null, 2)}
                        </pre>
                      </div>

                      <div>
                        <p className="font-medium">Delete:</p>
                        <p className="text-sm">{crudResult.results.delete}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleTestCrud} disabled={crudLoading}>
                {crudLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Testing CRUD Operations...
                  </>
                ) : (
                  "Test CRUD Operations"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

