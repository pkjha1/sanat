"use client"

interface MapFallbackProps {
  height?: string | number
  message?: string
  onRetry?: () => void
}

export function MapFallback({ height = "100%", message = "Map could not be loaded", onRetry }: MapFallbackProps) {
  const containerStyle = {
    width: "100%",
    height: typeof height === "number" ? `${height}px` : height,
  }

  return (
    <div style={containerStyle} className="flex items-center justify-center bg-gray-100 rounded-lg">
      <div className="text-center p-4">
        <h3 className="text-lg font-medium mb-2">{message}</h3>
        <p className="text-sm text-muted-foreground mb-4">Please check your internet connection and try again.</p>
        {onRetry && (
          <button onClick={onRetry} className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700">
            Try Again
          </button>
        )}
      </div>
    </div>
  )
}

