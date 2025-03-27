"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { testCrudOperations } from "@/app/actions/test-actions"

export default function CrudTestPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleTestCrud = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await testCrudOperations()

      setResult(response)

      if (!response.success) {
        setError(response.message)
      }
    } catch (err) {
      console.error("Error testing CRUD operations:", err)
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-10 mt-16">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>CRUD Operations Test</CardTitle>
          <CardDescription>Test Create, Read, Update, and Delete operations on the database</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Click the button below to test CRUD operations. This will create a temporary table, insert a record, read
              it, update it, delete it, and then drop the table.
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
                <p>{result.message}</p>

                <div className="mt-4 space-y-4">
                  <div>
                    <p className="font-medium">Create:</p>
                    <pre className="text-xs bg-gray-100 p-2 rounded mt-1 overflow-auto">
                      {JSON.stringify(result.results.create, null, 2)}
                    </pre>
                  </div>

                  <div>
                    <p className="font-medium">Read:</p>
                    <pre className="text-xs bg-gray-100 p-2 rounded mt-1 overflow-auto">
                      {JSON.stringify(result.results.read, null, 2)}
                    </pre>
                  </div>

                  <div>
                    <p className="font-medium">Update:</p>
                    <pre className="text-xs bg-gray-100 p-2 rounded mt-1 overflow-auto">
                      {JSON.stringify(result.results.update, null, 2)}
                    </pre>
                  </div>

                  <div>
                    <p className="font-medium">Delete:</p>
                    <p className="text-sm">{result.results.delete}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleTestCrud} disabled={loading}>
            {loading ? (
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
    </div>
  )
}

