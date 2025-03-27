"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { testDatabaseConnection } from "@/app/actions/test-actions"

export default function DatabaseTestPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleTestConnection = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await testDatabaseConnection()

      setResult(response)

      if (!response.success) {
        setError(response.message)
      }
    } catch (err) {
      console.error("Error testing database connection:", err)
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-10 mt-16">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Database Connection Test</CardTitle>
          <CardDescription>Test the connection to your Neon PostgreSQL database</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Click the button below to test the connection to your database. This will verify that your application can
              connect to the database and execute queries.
            </p>

            {error && (
              <div className="p-4 bg-red-50 text-red-700 rounded-md">
                <p className="font-medium">Error:</p>
                <p>{error}</p>
              </div>
            )}

            {result && result.success && (
              <div className="p-4 bg-green-50 text-green-700 rounded-md">
                <p className="font-medium">Success!</p>
                <p>Connected to database successfully.</p>
                <p className="mt-2 text-sm">
                  <strong>Database:</strong> {result.database}
                </p>
                <p className="text-sm">
                  <strong>Version:</strong> {result.version}
                </p>
                <p className="text-sm">
                  <strong>Tables:</strong> {result.tables?.length || 0}
                </p>

                {result.tables && result.tables.length > 0 && (
                  <div className="mt-4">
                    <p className="font-medium">Available Tables:</p>
                    <ul className="list-disc list-inside text-sm">
                      {result.tables.map((table: string) => (
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
          <Button onClick={handleTestConnection} disabled={loading}>
            {loading ? (
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
    </div>
  )
}

