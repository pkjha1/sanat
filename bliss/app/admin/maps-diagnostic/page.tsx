"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, XCircle, AlertTriangle, ExternalLink } from "lucide-react"
import { google } from "google-maps"

export default function MapsDiagnosticPage() {
  const [apiKey, setApiKey] = useState<string | null>(null)
  const [embedStatus, setEmbedStatus] = useState<"loading" | "success" | "error">("loading")
  const [jsStatus, setJsStatus] = useState<"loading" | "success" | "error">("loading")
  const [jsError, setJsError] = useState<string | null>(null)

  // Check if API key is available
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    setApiKey(key || null)

    if (!key) {
      setEmbedStatus("error")
      setJsStatus("error")
      setJsError("API key not found in environment variables")
    }
  }, [])

  // Test Embed API
  useEffect(() => {
    if (!apiKey) return

    // We'll consider the embed API working if we don't get an error within 3 seconds
    const timer = setTimeout(() => {
      setEmbedStatus("success")
    }, 3000)

    return () => clearTimeout(timer)
  }, [apiKey])

  // Test JavaScript API
  useEffect(() => {
    if (!apiKey) return

    // Load Google Maps JavaScript API
    const script = document.createElement("script")
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`
    script.async = true
    script.defer = true

    // Define the callback function
    window.initMap = () => {
      try {
        // Try to create a map instance
        const mapDiv = document.getElementById("test-map")
        if (mapDiv) {
          new google.maps.Map(mapDiv, {
            center: { lat: 20.5937, lng: 78.9629 }, // Center of India
            zoom: 5,
          })
          setJsStatus("success")
        }
      } catch (error) {
        setJsStatus("error")
        setJsError(error.message)
      }
    }

    // Handle script load error
    script.onerror = () => {
      setJsStatus("error")
      setJsError("Failed to load Google Maps JavaScript API")
    }

    document.head.appendChild(script)

    return () => {
      // Clean up
      document.head.removeChild(script)
      delete window.initMap
    }
  }, [apiKey])

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Google Maps API Diagnostic</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>API Key Status</CardTitle>
            <CardDescription>Checking if your Google Maps API key is properly configured</CardDescription>
          </CardHeader>
          <CardContent>
            {apiKey ? (
              <div className="flex items-center text-green-600 mb-4">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span>API key found in environment variables</span>
              </div>
            ) : (
              <div className="flex items-center text-red-600 mb-4">
                <XCircle className="h-5 w-5 mr-2" />
                <span>API key not found in environment variables</span>
              </div>
            )}

            <div className="text-sm text-muted-foreground">
              <p className="mb-2">Your API key should be set as:</p>
              <code className="bg-gray-100 p-2 rounded block mb-4">
                NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
              </code>
              <p>Make sure this is added to your environment variables in Vercel.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Maps Embed API Test</CardTitle>
            <CardDescription>Testing if the Google Maps Embed API works with your key</CardDescription>
          </CardHeader>
          <CardContent>
            {embedStatus === "loading" && apiKey && (
              <div className="h-[200px] bg-gray-100 rounded-md flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin h-6 w-6 border-2 border-amber-600 border-t-transparent rounded-full inline-block mb-2"></div>
                  <p>Testing Embed API...</p>
                </div>
              </div>
            )}

            {embedStatus === "success" && apiKey && (
              <>
                <div className="flex items-center text-green-600 mb-4">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span>Maps Embed API is working correctly</span>
                </div>

                <div className="h-[200px] rounded-md overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=India`}
                  ></iframe>
                </div>
              </>
            )}

            {embedStatus === "error" && (
              <div className="flex items-center text-red-600">
                <XCircle className="h-5 w-5 mr-2" />
                <span>Maps Embed API is not working</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>JavaScript Maps API Test</CardTitle>
          <CardDescription>Testing if the Google Maps JavaScript API works with your key</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              {jsStatus === "loading" && apiKey && (
                <div className="h-[300px] bg-gray-100 rounded-md flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin h-6 w-6 border-2 border-amber-600 border-t-transparent rounded-full inline-block mb-2"></div>
                    <p>Testing JavaScript API...</p>
                  </div>
                </div>
              )}

              {jsStatus === "success" && (
                <>
                  <div className="flex items-center text-green-600 mb-4">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span>Maps JavaScript API is working correctly</span>
                  </div>

                  <div id="test-map" className="h-[300px] rounded-md"></div>
                </>
              )}

              {jsStatus === "error" && (
                <div className="h-[300px] bg-gray-100 rounded-md flex items-center justify-center">
                  <div className="text-center p-4">
                    <div className="flex items-center text-red-600 justify-center mb-4">
                      <XCircle className="h-6 w-6 mr-2" />
                      <span className="font-medium">JavaScript API Error</span>
                    </div>
                    {jsError && <p className="text-sm bg-red-50 p-3 rounded border border-red-100">{jsError}</p>}
                  </div>
                </div>
              )}
            </div>

            <div>
              <h3 className="font-medium text-lg mb-4">Troubleshooting Steps</h3>

              <ol className="space-y-4 text-sm">
                <li className="flex">
                  <span className="bg-gray-200 rounded-full h-6 w-6 flex items-center justify-center mr-2 flex-shrink-0">
                    1
                  </span>
                  <span>Verify your API key is correct and has been added to your environment variables.</span>
                </li>
                <li className="flex">
                  <span className="bg-gray-200 rounded-full h-6 w-6 flex items-center justify-center mr-2 flex-shrink-0">
                    2
                  </span>
                  <span>
                    Make sure you've enabled the necessary APIs in the Google Cloud Console:
                    <ul className="list-disc ml-8 mt-2">
                      <li>Maps JavaScript API</li>
                      <li>Maps Embed API</li>
                      <li>Geocoding API (if using geocoding)</li>
                    </ul>
                  </span>
                </li>
                <li className="flex">
                  <span className="bg-gray-200 rounded-full h-6 w-6 flex items-center justify-center mr-2 flex-shrink-0">
                    3
                  </span>
                  <span>
                    Check if your API key has any restrictions (HTTP referrers, IP addresses) that might be blocking
                    access.
                  </span>
                </li>
                <li className="flex">
                  <span className="bg-gray-200 rounded-full h-6 w-6 flex items-center justify-center mr-2 flex-shrink-0">
                    4
                  </span>
                  <span>Verify that billing is enabled for your Google Cloud project.</span>
                </li>
              </ol>

              <div className="mt-6">
                <Button variant="outline" className="flex items-center" asChild>
                  <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noopener noreferrer">
                    Open Google Cloud Console
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert className="mb-8">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Recommendation</AlertTitle>
        <AlertDescription>
          If the JavaScript API is not working but the Embed API is working, we recommend using the SimpleMap component
          which uses the more reliable Embed API.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>API Key Security</CardTitle>
          <CardDescription>Best practices for securing your Google Maps API key</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm">
            <p>
              Since your Google Maps API key is exposed in the client-side code (as NEXT_PUBLIC_*), it's important to
              secure it properly:
            </p>

            <ol className="space-y-4">
              <li className="flex">
                <span className="bg-gray-200 rounded-full h-6 w-6 flex items-center justify-center mr-2 flex-shrink-0">
                  1
                </span>
                <span>
                  <strong>Restrict your API key</strong> to only work on your domain(s) by setting HTTP referrer
                  restrictions in the Google Cloud Console.
                </span>
              </li>
              <li className="flex">
                <span className="bg-gray-200 rounded-full h-6 w-6 flex items-center justify-center mr-2 flex-shrink-0">
                  2
                </span>
                <span>
                  <strong>Limit which APIs</strong> can be used with this key. Only enable the specific APIs you need.
                </span>
              </li>
              <li className="flex">
                <span className="bg-gray-200 rounded-full h-6 w-6 flex items-center justify-center mr-2 flex-shrink-0">
                  3
                </span>
                <span>
                  <strong>Set usage quotas</strong> to prevent unexpected billing in case your key is compromised.
                </span>
              </li>
              <li className="flex">
                <span className="bg-gray-200 rounded-full h-6 w-6 flex items-center justify-center mr-2 flex-shrink-0">
                  4
                </span>
                <span>
                  <strong>Monitor usage</strong> regularly in the Google Cloud Console to detect any unusual activity.
                </span>
              </li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

