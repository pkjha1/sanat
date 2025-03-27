"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle, Database, Server, Settings, User } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function DebugPage() {
  const [loading, setLoading] = useState(true)
  const [systemInfo, setSystemInfo] = useState<any>({})
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchDebugInfo() {
      try {
        setLoading(true)
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock system info
        setSystemInfo({
          nextVersion: "14.0.4",
          nodeVersion: "18.17.0",
          environment: "development",
          database: {
            connected: true,
            version: "PostgreSQL 15.3",
            tables: ["users", "books", "places", "teachings", "stories", "bookmarks"],
            connectionPool: {
              total: 10,
              idle: 8,
              active: 2,
            },
          },
          auth: {
            provider: "NextAuth.js",
            version: "4.24.5",
            strategies: ["Email", "Google", "GitHub"],
            usersCount: 156,
          },
          storage: {
            provider: "Vercel Blob",
            usage: "1.2 GB / 5 GB",
            files: 87,
          },
          cache: {
            provider: "Redis",
            status: "connected",
            keys: 245,
          },
          deployment: {
            platform: "Vercel",
            region: "iad1",
            lastDeployed: "2023-11-15T14:32:00Z",
            buildTime: "1m 42s",
          },
        })
        setError(null)
      } catch (err) {
        setError("Failed to fetch debug information. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchDebugInfo()
  }, [])

  if (loading) {
    return (
      <div className="container py-10 flex justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-sm text-muted-foreground">Loading debug information...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">System Debug</h1>
        <Button variant="outline" onClick={() => window.location.reload()}>
          <Settings className="mr-2 h-4 w-4" />
          Refresh Data
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
          <TabsTrigger value="auth">Authentication</TabsTrigger>
          <TabsTrigger value="storage">Storage</TabsTrigger>
          <TabsTrigger value="deployment">Deployment</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">System</CardTitle>
                <CardDescription>Core system information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Next.js Version</span>
                    <span className="font-medium">{systemInfo.nextVersion}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Node.js Version</span>
                    <span className="font-medium">{systemInfo.nodeVersion}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Environment</span>
                    <Badge variant={systemInfo.environment === "production" ? "default" : "outline"}>
                      {systemInfo.environment}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Database</CardTitle>
                  {systemInfo.database?.connected ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Connected
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                      Disconnected
                    </Badge>
                  )}
                </div>
                <CardDescription>Database connection status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type</span>
                    <span className="font-medium">{systemInfo.database?.version || "Unknown"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tables</span>
                    <span className="font-medium">{systemInfo.database?.tables?.length || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Active Connections</span>
                    <span className="font-medium">{systemInfo.database?.connectionPool?.active || 0}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Authentication</CardTitle>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {systemInfo.auth?.provider || "None"}
                  </Badge>
                </div>
                <CardDescription>Auth system status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Version</span>
                    <span className="font-medium">{systemInfo.auth?.version || "Unknown"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Strategies</span>
                    <span className="font-medium">{systemInfo.auth?.strategies?.length || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Users</span>
                    <span className="font-medium">{systemInfo.auth?.usersCount || 0}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="database">
          <Card>
            <CardHeader>
              <div className="flex items-center">
                <Database className="mr-2 h-5 w-5 text-primary" />
                <CardTitle>Database Information</CardTitle>
              </div>
              <CardDescription>Detailed database status and metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Connection Status</h3>
                  <Alert
                    className={
                      systemInfo.database?.connected ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                    }
                  >
                    {systemInfo.database?.connected ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-600" />
                    )}
                    <AlertTitle className={systemInfo.database?.connected ? "text-green-800" : "text-red-800"}>
                      {systemInfo.database?.connected ? "Connected" : "Disconnected"}
                    </AlertTitle>
                    <AlertDescription className={systemInfo.database?.connected ? "text-green-700" : "text-red-700"}>
                      {systemInfo.database?.connected
                        ? `Successfully connected to ${systemInfo.database?.version}`
                        : "Failed to connect to database. Check your connection string and credentials."}
                    </AlertDescription>
                  </Alert>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Tables</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {systemInfo.database?.tables?.map((table: string) => (
                      <div key={table} className="bg-muted p-2 rounded text-center">
                        {table}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Connection Pool</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="pt-6 text-center">
                        <div className="text-2xl font-bold">{systemInfo.database?.connectionPool?.total || 0}</div>
                        <p className="text-sm text-muted-foreground">Total</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6 text-center">
                        <div className="text-2xl font-bold">{systemInfo.database?.connectionPool?.active || 0}</div>
                        <p className="text-sm text-muted-foreground">Active</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6 text-center">
                        <div className="text-2xl font-bold">{systemInfo.database?.connectionPool?.idle || 0}</div>
                        <p className="text-sm text-muted-foreground">Idle</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="auth">
          <Card>
            <CardHeader>
              <div className="flex items-center">
                <User className="mr-2 h-5 w-5 text-primary" />
                <CardTitle>Authentication System</CardTitle>
              </div>
              <CardDescription>Authentication provider and user statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Provider Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Provider</span>
                        <span className="font-medium">{systemInfo.auth?.provider || "None"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Version</span>
                        <span className="font-medium">{systemInfo.auth?.version || "Unknown"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Users</span>
                        <span className="font-medium">{systemInfo.auth?.usersCount || 0}</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Authentication Strategies</h4>
                      <div className="flex flex-wrap gap-2">
                        {systemInfo.auth?.strategies?.map((strategy: string) => (
                          <Badge key={strategy} variant="outline">
                            {strategy}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">User Statistics</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="pt-6 text-center">
                        <div className="text-2xl font-bold">{systemInfo.auth?.usersCount || 0}</div>
                        <p className="text-sm text-muted-foreground">Total Users</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6 text-center">
                        <div className="text-2xl font-bold">24</div>
                        <p className="text-sm text-muted-foreground">Active Today</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6 text-center">
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-sm text-muted-foreground">New This Week</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6 text-center">
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-sm text-muted-foreground">Admin Users</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="storage">
          <Card>
            <CardHeader>
              <div className="flex items-center">
                <Server className="mr-2 h-5 w-5 text-primary" />
                <CardTitle>Storage Information</CardTitle>
              </div>
              <CardDescription>Storage provider and usage statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Provider Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Provider</span>
                        <span className="font-medium">{systemInfo.storage?.provider || "None"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Usage</span>
                        <span className="font-medium">{systemInfo.storage?.usage || "0 GB / 0 GB"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Files</span>
                        <span className="font-medium">{systemInfo.storage?.files || 0}</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Storage Usage</h4>
                      <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: "24%" }}></div>
                      </div>
                      <p className="text-xs text-right mt-1 text-muted-foreground">24% used</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deployment">
          <Card>
            <CardHeader>
              <div className="flex items-center">
                <Server className="mr-2 h-5 w-5 text-primary" />
                <CardTitle>Deployment Information</CardTitle>
              </div>
              <CardDescription>Deployment platform and build statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Platform Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Platform</span>
                        <span className="font-medium">{systemInfo.deployment?.platform || "Unknown"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Region</span>
                        <span className="font-medium">{systemInfo.deployment?.region || "Unknown"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Last Deployed</span>
                        <span className="font-medium">
                          {systemInfo.deployment?.lastDeployed
                            ? new Date(systemInfo.deployment.lastDeployed).toLocaleString()
                            : "Unknown"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Build Time</span>
                        <span className="font-medium">{systemInfo.deployment?.buildTime || "Unknown"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

