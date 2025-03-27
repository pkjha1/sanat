"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, AlertTriangle, RefreshCw, Database } from "lucide-react"

export default function InitProfilesPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{
    success: boolean
    message: string
    error?: string
  } | null>(null)

  const initializeProfiles = async () => {
    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/init-profiles-table")
      const data = await response.json()

      setResult({
        success: data.success,
        message: data.message || "Operation completed",
        error: data.error,
      })
    } catch (error: any) {
      setResult({
        success: false,
        message: "Failed to initialize profiles table",
        error: error.message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Initialize Profiles Table</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Profiles Table Setup
          </CardTitle>
          <CardDescription>
            Initialize the profiles table with the correct schema including the email column
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            This will create the profiles table if it doesn't exist, or add the email column if the table exists but is
            missing the column.
          </p>

          {result && (
            <Alert variant={result.success ? "default" : "destructive"} className="mb-4">
              {result.success ? <CheckCircle className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
              <AlertTitle>{result.success ? "Success" : "Error"}</AlertTitle>
              <AlertDescription>
                {result.message}
                {result.error && <div className="mt-2 text-sm font-mono bg-muted p-2 rounded">{result.error}</div>}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={initializeProfiles} disabled={isLoading} className="flex items-center gap-2">
            {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Database className="h-4 w-4" />}
            {isLoading ? "Initializing..." : "Initialize Profiles Table"}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <p>After initializing the profiles table:</p>
          <ol className="list-decimal ml-5 mt-2 space-y-1">
            <li>
              Return to the{" "}
              <a href="/database-test" className="text-primary underline">
                Database Test
              </a>{" "}
              page
            </li>
            <li>Run the CRUD operations test again</li>
            <li>Verify that the operations complete successfully</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}

