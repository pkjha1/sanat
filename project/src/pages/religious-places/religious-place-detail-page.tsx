import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Bookmark, Share2, MapPin, Calendar, Info, Navigation, Clock, Camera, Compass, History, Cloud, Sun, Route, BookTemplate as Temple, Building, Globe, Footprints } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useAuth } from '@/contexts/auth-context';

// Fix Leaflet marker icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Custom icon for temples
const templeIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: 'temple-marker',
});

// Mock data for religious places
const RELIGIOUS_PLACES = [
  {
    id: 1,
    name: 'Varanasi',
    description: 'One of the oldest continuously inhabited cities in the world and a major religious hub in India.',
    thumbnailUrl: 'https://source.unsplash.com/random/800x450/?varanasi,ganges',
    image: 'https://source.unsplash.com/random/1200x600/?varanasi,ganges',
    location: 'Uttar Pradesh, India',
    category: 'city',
    coordinates: { lat: 25.3176, lng: 82.9739 },
    highlights: ['Dashashwamedh Ghat', 'Kashi Vishwanath Temple', 'Sarnath', 'Ramnagar Fort'],
    temples: [
      {
        name: 'Kashi Vishwanath Temple',
        description: 'One of the most famous Hindu temples dedicated to Lord Shiva and one of the twelve Jyotirlingas.',
        image: 'https://source.unsplash.com/random/400x300/?kashi,vishwanath',
        coordinates: { lat: 25.3109, lng: 83.0107 }
      },
      {
        name: 'Sankat Mochan Hanuman Temple',
        description: 'A famous Hindu temple dedicated to Lord Hanuman, founded by saint Tulsidas.',
        image: 'https://source.unsplash.com/random/400x300/?hanuman,temple',
        coordinates: { lat: 25.2718, lng: 82.9988 }
      },
      {
        name: 'Durga Temple (Monkey Temple)',
        description: 'A Hindu temple dedicated to the goddess Durga, known for the monkeys that live in the trees nearby.',
        image: 'https://source.unsplash.com/random/400x300/?durga,temple',
        coordinates: { lat: 25.2823, lng: 83.0063 }
      },
      {
        name: 'New Vishwanath Temple (BHU)',
        description: 'A temple built by the Birla family within the Banaras Hindu University campus.',
        image: 'https://source.unsplash.com/random/400x300/?vishwanath,temple',
        coordinates: { lat: 25.2677, lng: 82.9913 }
      },
      {
        name: 'Tulsi Manas Temple',
        description: 'Built in 1964, dedicated to Lord Rama, with walls inscribed with verses from Ramcharitmanas.',
        image: 'https://source.unsplash.com/random/400x300/?rama,temple',
        coordinates: { lat: 25.2824, lng: 83.0045 }
      },
      {
        name: 'Bharat Mata Temple',
        description: 'A unique temple dedicated to Mother India, featuring a relief map of undivided India carved in marble.',
        image: 'https://source.unsplash.com/random/400x300/?bharat,mata',
        coordinates: { lat: 25.3077, lng: 83.0062 }
      }
    ],
    fullDescription: `
      <p>Varanasi, also known as Kashi or Banaras, is one of the oldest living cities in the world. Situated on the banks of the sacred river Ganges, it has been a cultural and religious center for thousands of years.</p>
      
      <p>For Hindus, Varanasi is one of the most important pilgrimage sites. It is believed that dying in Varanasi brings moksha, liberation from the cycle of rebirth. The city is dedicated to Lord Shiva and is home to over 23,000 temples.</p>
      
      <p>The ghats of Varanasi, stretching along the western bank of the Ganges, are the heart of the city's religious life. They serve as sites for rituals, cremations, and daily activities. The evening Ganga Aarti at Dashashwamedh Ghat is a mesmerizing spiritual ceremony that attracts thousands of visitors.</p>
      
      <p>Beyond its Hindu significance, Varanasi is also important to Buddhism, as Buddha gave his first sermon at nearby Sarnath in 528 BCE. The city has also been a center for education, arts, and music throughout its long history.</p>
      
      <p>Walking through the narrow winding lanes of Varanasi is like walking through time itself, with ancient temples nestled beside homes and shops, the sounds of temple bells and Sanskrit chants filling the air, and the spiritual energy that has drawn seekers for millennia.</p>
    `,
    galleryImages: [
      'https://source.unsplash.com/random/800x600/?varanasi,temple',
      'https://source.unsplash.com/random/800x600/?ganges,boat',
      'https://source.unsplash.com/random/800x600/?varanasi,ceremony',
      'https://source.unsplash.com/random/800x600/?varanasi,ghat',
      'https://source.unsplash.com/random/800x600/?varanasi,prayer',
      'https://source.unsplash.com/random/800x600/?varanasi,sadhu',
    ],
    bestTimeToVisit: 'October to March',
    howToReach: 'Varanasi has its own domestic airport, Lal Bahadur Shastri International Airport, with connections to major Indian cities. It is also well-connected by train and road.',
    travelTips: [
      'The narrow lanes (galis) can be confusing; consider hiring a local guide.',
      'Morning boat rides on the Ganges provide a beautiful view of the sunrise and the ghats.',
      'Respect local customs, especially around the ghats and temples.',
      'Try the local specialties like Banarasi paan and lassi.',
      'Dress modestly, particularly when visiting temples and religious sites.'
    ],
    historicalSignificance: 'Varanasi has been a cultural center for over 3,000 years. It was an important commercial and industrial center famous for its muslin and silk fabrics, perfumes, ivory works, and sculpture during ancient and medieval times. It has also been a center of education, with the renowned Banaras Hindu University established in 1916.'
  },
  {
    id: 2,
    name: 'Kedarnath Temple',
    description: 'One of the twelve Jyotirlingas of Lord Shiva, situated in the Himalayan ranges.',
    thumbnailUrl: 'https://source.unsplash.com/random/800x450/?kedarnath,temple',
    image: 'https://source.unsplash.com/random/1200x600/?kedarnath,temple',
    location: 'Uttarakhand, India',
    category: 'temple',
    coordinates: { lat: 30.7433, lng: 79.0669 },
    collections: ['char_dham', 'panch_kedar'],
    highlights: ['Ancient Temple', 'Himalayan Backdrop', 'Chorabari Tal', 'Vasuki Tal'],
    fullDescription: `
      <p>Kedarnath Temple is one of the holiest Hindu temples dedicated to Lord Shiva and is located on the Garhwal Himalayan range near the Mandakini river. This ancient temple is one of the twelve Jyotirlingas (holiest Shiva temples) and is also one of the four major sites in India's Chota Char Dham pilgrimage circuit.</p>
      
      <p>The temple was built by Adi Shankaracharya in the 8th century, though its origins are believed to be even more ancient. According to Hindu legends, the Pandavas sought Lord Shiva's forgiveness here after the Kurukshetra War. To avoid them, Shiva took the form of a bull and hid. When discovered, he dived into the ground, leaving parts of his body in five different locations, with the hump appearing in Kedarnath.</p>
      
      <p>The temple stands at an altitude of 3,583 meters above sea level, surrounded by snow-capped peaks. Built of large, heavy stone slabs, the temple has survived for centuries in this harsh environment. The temple faces south and houses a conical rock formation, the Sadashiva form of Lord Shiva, which is considered the main deity.</p>
      
      <p>The temple is accessible only for six months in a year, from April to November, as it remains snowbound during winter. The journey to the temple involves a trek of about 16 kilometers from Gaurikund, offering breathtaking views of the Himalayan landscape.</p>
      
      <p>Despite severe damage during the 2013 Uttarakhand floods, the temple structure remained largely intact, which many devotees consider miraculous. The site continues to be a symbol of faith, resilience, and the eternal presence of the divine in one of the most challenging terrains on Earth.</p>
    `,
    galleryImages: [
      'https://source.unsplash.com/random/800x600/?kedarnath,mountains',
      'https://source.unsplash.com/random/800x600/?himalaya,snow',
      'https://source.unsplash.com/random/800x600/?kedarnath,path',
      'https://source.unsplash.com/random/800x600/?kedarnath,pilgrims',
    ],
    bestTimeToVisit: 'May to June and September to October',
    howToReach: 'The closest airport is Jolly Grant Airport in Dehradun. From there, one can take a taxi to Gaurikund via Rudraprayag and Guptkashi. From Gaurikund, a 16 km trek or a helicopter ride leads to Kedarnath.',
    travelTips: [
      'Acclimatize properly before starting the trek to avoid altitude sickness.',
      'Carry warm clothing as temperatures can drop significantly, even during summer.',
      'Pack light but essential items for the trek.',
      'Consider the helicopter service if you have health concerns about the trek.',
      'Check weather conditions before planning your visit.'
    ],
    historicalSignificance: 'The temple is believed to be over 1,200 years old and is considered one of the most sacred sites in Hinduism. It has been mentioned in ancient Hindu scriptures and is part of the Char Dham pilgrimage circuit that Hindus aspire to complete at least once in their lifetime.',
    pilgrimageInfo: `
      <h3>Char Dham Yatra</h3>
      <p>Kedarnath is a crucial part of the Char Dham Yatra, a pilgrimage circuit in the Garhwal Himalayas. The four sites (Yamunotri, Gangotri, Kedarnath, and Badrinath) are dedicated to different deities and natural elements, representing a holistic spiritual journey.</p>
      
      <p>According to tradition, the Char Dham Yatra begins at Yamunotri, proceeds to Gangotri, then Kedarnath, and concludes at Badrinath. Completing this circuit is believed to wash away sins and lead to moksha (liberation from the cycle of birth and death).</p>
      
      <h3>Panch Kedar</h3>
      <p>Kedarnath is also part of the Panch Kedar, five temples dedicated to Lord Shiva in the Garhwal region. According to legend, the Pandavas sought Lord Shiva's blessing after the Mahabharata war. The other four Kedar temples are Madhyamaheshwar, Tungnath, Rudranath, and Kalpeshwar.</p>
      
      <p>Each of these temples represents a different part of Lord Shiva's body: Kedarnath (hump), Tungnath (arms), Rudranath (face), Madhyamaheshwar (navel), and Kalpeshwar (hair).</p>
    `
  },
];

// Define pilgrimage collections
const PILGRIMAGE_COLLECTIONS = [
  {
    id: 'char_dham',
    name: 'Char Dham Yatra',
    description: 'The four sacred sites in the Indian Himalayas - Yamunotri, Gangotri, Kedarnath, and Badrinath.',
    image: 'https://source.unsplash.com/random/800x600/?himalaya,temple',
    places: [10, 11, 2, 5]
  },
  {
    id: 'char_dham_national',
    name: 'Char Dham (National)',
    description: 'The four sacred pilgrimage sites in the four directions of India - Badrinath, Dwarka, Puri, and Rameshwaram.',
    image: 'https://source.unsplash.com/random/800x600/?india,temple',
    places: [5, 12, 13, 14]
  },
  {
    id: 'panch_kedar',
    name: 'Panch Kedar',
    description: 'Five Hindu temples dedicated to Lord Shiva in the Garhwal Himalayan region.',
    image: 'https://source.unsplash.com/random/800x600/?kedar,himalaya',
    places: [2]
  },
];

export function ReligiousPlaceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [place, setPlace] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'highlights' | 'travel' | 'history' | 'temples'>('overview');
  const [mapLoaded, setMapLoaded] = useState(false);
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundPlace = RELIGIOUS_PLACES.find(place => place.id === Number(id));
      setPlace(foundPlace || null);
      setIsLoading(false);
      
      // If the place has temples, set active tab to 'temples' by default
      if (foundPlace && foundPlace.temples && foundPlace.temples.length > 0) {
        setActiveTab('temples');
      }
      
      // Ensure map loads properly
      setMapLoaded(true);
    }, 500);
  }, [id]);
  
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };
  
  // Helper function to get collections this place belongs to
  const getCollections = () => {
    if (!place || !place.collections) return [];
    
    return place.collections.map(collectionId => 
      PILGRIMAGE_COLLECTIONS.find(c => c.id === collectionId)
    ).filter(collection => collection !== undefined);
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!place) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Place Not Found</h1>
        <p className="text-muted-foreground mb-6">
          We couldn't find the religious place you're looking for.
        </p>
        <Button asChild>
          <Link to="/religious-places">Return to Religious Places</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <Button variant="ghost" asChild className="gap-2">
          <Link to="/religious-places">
            <ChevronLeft className="h-4 w-4" />
            Back to Religious Places
          </Link>
        </Button>
        
        <div className="flex gap-2">
          {user && (
            <Button 
              variant="ghost" 
              size="icon" 
              aria-label={isBookmarked ? "Remove bookmark" : "Bookmark this place"}
              onClick={toggleBookmark}
              className={isBookmarked ? "text-primary" : ""}
            >
              <Bookmark className="h-5 w-5" fill={isBookmarked ? "currentColor" : "none"} />
            </Button>
          )}
          <Button variant="ghost" size="icon" aria-label="Share this place">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-8">
            {/* Hero Image */}
            <div className="aspect-[16/9] overflow-hidden rounded-lg shadow-md">
              <img 
                src={place.image} 
                alt={place.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Basic Info */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                {place.category === 'temple' ? (
                  <Temple className="h-6 w-6 text-primary" />
                ) : place.category === 'city' ? (
                  <Building className="h-6 w-6 text-primary" />
                ) : (
                  <MapPin className="h-6 w-6 text-primary" />
                )}
                <h1 className="text-3xl font-bold leading-tight">{place.name}</h1>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <MapPin className="h-4 w-4" />
                <span>{place.location}</span>
              </div>
              
              {/* Pilgrimage Route Tags */}
              {place.collections && place.collections.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {place.collections.map(collectionId => {
                    const collection = PILGRIMAGE_COLLECTIONS.find(c => c.id === collectionId);
                    return collection ? (
                      <Link 
                        key={collectionId} 
                        to={`/religious-places?collection=${collectionId}`}
                        className="inline-flex items-center gap-1 text-sm bg-primary/10 text-primary px-2 py-1 rounded-full"
                      >
                        <Route className="h-4 w-4" />
                        <span>{collection.name}</span>
                      </Link>
                    ) : null;
                  })}
                </div>
              )}
              
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="inline-flex items-center gap-1 text-sm bg-muted px-2 py-0.5 rounded-full capitalize">
                  {place.category}
                </span>
                <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Best time: {place.bestTimeToVisit}
                </span>
              </div>
            </div>
            
            {/* Tabs Navigation */}
            <div className="border-b flex overflow-x-auto">
              <Button 
                variant="ghost" 
                className={`rounded-none border-b-2 ${activeTab === 'overview' ? 'border-primary' : 'border-transparent'}`}
                onClick={() => setActiveTab('overview')}
              >
                <Info className="h-4 w-4 mr-2" />
                Overview
              </Button>
              
              {place.temples && place.temples.length > 0 && (
                <Button 
                  variant="ghost" 
                  className={`rounded-none border-b-2 ${activeTab === 'temples' ? 'border-primary' : 'border-transparent'}`}
                  onClick={() => setActiveTab('temples')}
                >
                  <Temple className="h-4 w-4 mr-2" />
                  Temples
                </Button>
              )}
              
              <Button 
                variant="ghost" 
                className={`rounded-none border-b-2 ${activeTab === 'highlights' ? 'border-primary' : 'border-transparent'}`}
                onClick={() => setActiveTab('highlights')}
              >
                <Camera className="h-4 w-4 mr-2" />
                Highlights
              </Button>
              
              <Button 
                variant="ghost" 
                className={`rounded-none border-b-2 ${activeTab === 'travel' ? 'border-primary' : 'border-transparent'}`}
                onClick={() => setActiveTab('travel')}
              >
                <Navigation className="h-4 w-4 mr-2" />
                Travel Info
              </Button>
              
              <Button 
                variant="ghost" 
                className={`rounded-none border-b-2 ${activeTab === 'history' ? 'border-primary' : 'border-transparent'}`}
                onClick={() => setActiveTab('history')}
              >
                <History className="h-4 w-4 mr-2" />
                History
              </Button>
            </div>
            
            {/* Tab Content */}
            <div className="space-y-6">
              {activeTab === 'overview' && (
                <div>
                  <div className="prose max-w-none mb-6" dangerouslySetInnerHTML={{ __html: place.fullDescription }} />
                  
                  {/* Pilgrimage Information if available */}
                  {place.pilgrimageInfo && (
                    <div className="bg-muted/30 p-6 rounded-lg mt-6">
                      <h3 className="text-xl font-semibold mb-4 flex items-center">
                        <Route className="h-5 w-5 text-primary mr-2" />
                        Pilgrimage Information
                      </h3>
                      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: place.pilgrimageInfo }} />
                    </div>
                  )}
                  
                  {/* Gallery */}
                  <h2 className="text-xl font-semibold mb-4 mt-8">Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {place.galleryImages.map((image: string, index: number) => (
                      <div key={index} className="aspect-square overflow-hidden rounded-md">
                        <img 
                          src={image} 
                          alt={`${place.name} - Image ${index + 1}`} 
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === 'temples' && place.temples && (
                <div>
                  <h2 className="text-xl font-semibold mb-6 flex items-center">
                    <Temple className="h-5 w-5 text-primary mr-2" />
                    Important Temples in {place.name}
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {place.temples.map((temple: any, index: number) => (
                      <Card key={index} className="overflow-hidden">
                        <div className="aspect-video">
                          <img 
                            src={temple.image} 
                            alt={temple.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardHeader>
                          <CardTitle>{temple.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground mb-4">{temple.description}</p>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>Located at: {temple.coordinates.lat.toFixed(4)}, {temple.coordinates.lng.toFixed(4)}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  {/* Map of Temples */}
                  <div className="rounded-lg overflow-hidden border h-[400px] mt-8">
                    {mapLoaded && (
                      <MapContainer 
                        center={[place.coordinates.lat, place.coordinates.lng]} 
                        zoom={14} 
                        style={{ height: "100%", width: "100%" }}
                      >
                        <TileLayer
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        
                        <Marker position={[place.coordinates.lat, place.coordinates.lng]}>
                          <Popup>
                            <strong>{place.name}</strong><br />
                            Main location
                          </Popup>
                        </Marker>
                        
                        {place.temples.map((temple: any, index: number) => (
                          <Marker 
                            key={index} 
                            position={[temple.coordinates.lat, temple.coordinates.lng]}
                            icon={templeIcon}
                          >
                            <Popup>
                              <div>
                                <strong>{temple.name}</strong><br />
                                {temple.description.substring(0, 100)}...
                              </div>
                            </Popup>
                          </Marker>
                        ))}
                      </MapContainer>
                    )}
                  </div>
                </div>
              )}
              
              {activeTab === 'highlights' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Key Highlights</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {place.highlights.map((highlight: string, index: number) => (
                      <Card key={index} className="overflow-hidden">
                        <div className="aspect-video">
                          <img 
                            src={`https://source.unsplash.com/random/400x300/?${highlight.toLowerCase().replace(/\s+/g, ',')}`} 
                            alt={highlight} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardHeader>
                          <CardTitle>{highlight}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">A significant attraction in {place.name}, offering visitors a glimpse into the rich cultural and spiritual heritage of the area.</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === 'travel' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-3 flex items-center">
                      <Globe className="h-5 w-5 text-primary mr-2" />
                      How to Reach
                    </h2>
                    <p className="text-muted-foreground">{place.howToReach}</p>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-3 flex items-center">
                      <Calendar className="h-5 w-5 text-primary mr-2" />
                      Best Time to Visit
                    </h2>
                    <div className="flex items-start gap-2">
                      <Sun className="h-5 w-5 text-amber-500 mt-1" />
                      <p className="text-muted-foreground">{place.bestTimeToVisit}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-3 flex items-center">
                      <Footprints className="h-5 w-5 text-primary mr-2" />
                      Travel Tips
                    </h2>
                    <ul className="space-y-2">
                      {place.travelTips.map((tip: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary mt-1"><Compass className="h-4 w-4" /></span>
                          <span className="text-muted-foreground">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Map */}
                  <div>
                    <h2 className="text-xl font-semibold mb-3 flex items-center">
                      <MapPin className="h-5 w-5 text-primary mr-2" />
                      Location Map
                    </h2>
                    <div className="rounded-lg overflow-hidden border h-[400px]">
                      {mapLoaded && (
                        <MapContainer 
                          center={[place.coordinates.lat, place.coordinates.lng]} 
                          zoom={12} 
                          style={{ height: "100%", width: "100%" }}
                        >
                          <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          />
                          
                          <Marker position={[place.coordinates.lat, place.coordinates.lng]}>
                            <Popup>
                              <strong>{place.name}</strong><br />
                              {place.location}
                            </Popup>
                          </Marker>
                        </MapContainer>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'history' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <History className="h-5 w-5 text-primary mr-2" />
                    Historical Significance
                  </h2>
                  <p className="text-muted-foreground whitespace-pre-line mb-6">{place.historicalSignificance}</p>
                  
                  {/* Historical Timeline - Example for Varanasi */}
                  {place.id === 1 && (
                    <div className="mt-8">
                      <h3 className="text-lg font-medium mb-4">Historical Timeline</h3>
                      <div className="space-y-6">
                        <div className="flex gap-4">
                          <div className="w-24 flex-shrink-0 text-sm font-semibold text-primary">
                            ~1800 BCE
                          </div>
                          <div>
                            <h4 className="font-medium">Earliest Mentions</h4>
                            <p className="text-muted-foreground text-sm">Archaeological evidence suggests human settlement in the area dating back to this period.</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-4">
                          <div className="w-24 flex-shrink-0 text-sm font-semibold text-primary">
                            ~500 BCE
                          </div>
                          <div>
                            <h4 className="font-medium">Buddha's First Sermon</h4>
                            <p className="text-muted-foreground text-sm">Buddha gave his first sermon at Sarnath, near Varanasi, marking the beginning of Buddhism.</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-4">
                          <div className="w-24 flex-shrink-0 text-sm font-semibold text-primary">
                            8th Century CE
                          </div>
                          <div>
                            <h4 className="font-medium">Revival by Adi Shankaracharya</h4>
                            <p className="text-muted-foreground text-sm">Adi Shankaracharya visited Varanasi and established it as a major center for Hindu philosophy and learning.</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-4">
                          <div className="w-24 flex-shrink-0 text-sm font-semibold text-primary">
                            17th Century
                          </div>
                          <div>
                            <h4 className="font-medium">Mughal Period</h4>
                            <p className="text-muted-foreground text-sm">During Emperor Akbar's reign, Varanasi saw relative peace and religious tolerance. Later, under Aurangzeb, many temples were destroyed and rebuilt.</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-4">
                          <div className="w-24 flex-shrink-0 text-sm font-semibold text-primary">
                            1916
                          </div>
                          <div>
                            <h4 className="font-medium">Banaras Hindu University</h4>
                            <p className="text-muted-foreground text-sm">Establishment of BHU by Pandit Madan Mohan Malaviya, cementing Varanasi's status as a center of learning.</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-4">
                          <div className="w-24 flex-shrink-0 text-sm font-semibold text-primary">
                            Present Day
                          </div>
                          <div>
                            <h4 className="font-medium">Living Heritage</h4>
                            <p className="text-muted-foreground text-sm">Varanasi continues to be one of the most important pilgrimage sites for Hindus and a cultural center with unbroken traditions spanning millennia.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* Map */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Location
                </CardTitle>
                <CardDescription>{place.name}, {place.location}</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                  <img 
                    src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${place.coordinates.lng},${place.coordinates.lat},10,0/600x450?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA`} 
                    alt={`Map showing ${place.name}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-primary bg-white rounded-full p-2 shadow-lg">
                      <MapPin className="h-6 w-6" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Pilgrimage Routes */}
            {place.collections && place.collections.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Route className="h-5 w-5 text-primary" />
                    Pilgrimage Routes
                  </CardTitle>
                  <CardDescription>
                    {place.name} is part of these sacred journeys
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {getCollections().map((collection: any) => (
                    <div key={collection.id} className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                        <img 
                          src={collection.image} 
                          alt={collection.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{collection.name}</h4>
                        <p className="text-xs text-muted-foreground line-clamp-2">{collection.description}</p>
                        <Link 
                          to={`/religious-places?collection=${collection.id}`} 
                          className="text-xs text-primary hover:underline inline-flex items-center gap-1 mt-1"
                        >
                          View route
                          <ChevronLeft className="h-3 w-3 rotate-180" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
            
            {/* Weather */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cloud className="h-5 w-5 text-primary" />
                  Weather
                </CardTitle>
                <CardDescription>Current conditions at {place.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Sun className="h-10 w-10 text-amber-500" />
                    <div>
                      <div className="text-2xl font-semibold">24°C</div>
                      <div className="text-sm text-muted-foreground">Sunny</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">H: 28°C</div>
                    <div className="text-sm">L: 16°C</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Bookmark Button */}
            {user && (
              <Button 
                onClick={toggleBookmark}
                variant="outline"
                className={`w-full gap-2 ${isBookmarked ? "text-primary border-primary" : ""}`}
              >
                <Bookmark className="h-5 w-5" fill={isBookmarked ? "currentColor" : "none"} />
                {isBookmarked ? 'Bookmarked' : 'Add to Bookmarks'}
              </Button>
            )}
            
            {/* Related Places */}
            <div>
              <h3 className="text-lg font-semibold mb-3">You might also like</h3>
              <div className="space-y-4">
                {RELIGIOUS_PLACES.filter(p => p.id !== place.id && p.category === place.category).slice(0, 2).map(relatedPlace => (
                  <Link key={relatedPlace.id} to={`/religious-places/${relatedPlace.id}`} className="block">
                    <div className="flex gap-3 group">
                      <div className="w-20 h-20 overflow-hidden rounded-md flex-shrink-0">
                        <img 
                          src={relatedPlace.image} 
                          alt={relatedPlace.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium group-hover:text-primary transition-colors">{relatedPlace.name}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">{relatedPlace.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}