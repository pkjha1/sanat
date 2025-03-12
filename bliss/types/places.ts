// Shared type definitions for places
export type Place = {
    id: string
    name: string
    location: { lat: number; lng: number }
    description: string
    image: string
    type?: string
    temples?: number
    rating?: number
  }
  
  