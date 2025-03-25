import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Search, FilterX, MapPin, Building, BookTemplate as TempleIcon, Route, Grid, Map as MapIcon, Navigation, ChevronLeft, Compass, Globe, Cloud, Sun, Info, Clock, Calendar } from 'lucide-react';

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
    collections: ['char_dham', 'panch_kedar'],
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
      }
    ]
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
    highlights: ['Ancient Temple', 'Himalayan Backdrop', 'Chorabari Tal', 'Vasuki Tal']
  }
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
    id: 'panch_kedar',
    name: 'Panch Kedar',
    description: 'Five Hindu temples dedicated to Lord Shiva in the Garhwal Himalayan region.',
    image: 'https://source.unsplash.com/random/800x600/?kedar,himalaya',
    places: [2]
  }
];

export function ReligiousPlacesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [activeTab, setActiveTab] = useState<'all' | 'collections'>('all');
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const categories = ['temple', 'city'];

  const filteredPlaces = RELIGIOUS_PLACES.filter(place => {
    const matchesSearch = place.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        place.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === null || place.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory(null);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'temple':
        return <TempleIcon className="h-4 w-4" />;
      case 'city':
        return <Building className="h-4 w-4" />;
      default:
        return <MapPin className="h-4 w-4" />;
    }
  };

  const getMapCenter = () => {
    if (filteredPlaces.length === 0) {
      return [20.5937, 78.9629]; // Center of India
    }
    const firstPlace = filteredPlaces[0];
    return [firstPlace.coordinates.lat, firstPlace.coordinates.lng];
  };

  const getCollectionPlaces = (collectionId: string) => {
    const collection = PILGRIMAGE_COLLECTIONS.find(c => c.id === collectionId);
    if (!collection) return [];
    return collection.places
      .map(placeId => RELIGIOUS_PLACES.find(p => p.id === placeId))
      .filter(place => place !== undefined) as typeof RELIGIOUS_PLACES;
  };

  useEffect(() => {
    setMapLoaded(true);
  }, []);

  return (
    <div className="container py-12">
      <div className="space-y-4 mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Sacred Places</h1>
        <p className="text-muted-foreground text-lg">
          Explore temples, cities, and historical sites of spiritual significance
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'all' | 'collections')}>
        <div className="border-b mb-6">
          <TabsList className="w-full justify-start rounded-none border-0 bg-transparent p-0">
            <TabsTrigger 
              value="all" 
              className="rounded-none border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              <MapPin className="h-4 w-4 mr-2" />
              All Sacred Places
            </TabsTrigger>
            <TabsTrigger 
              value="collections" 
              className="rounded-none border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              <Route className="h-4 w-4 mr-2" />
              Pilgrimage Routes
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="all" className="mt-0">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search places by name, description or location..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 items-center flex-wrap">
              <span className="text-sm text-muted-foreground whitespace-nowrap">Filter by:</span>
              <div className="flex gap-2 flex-wrap">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                    className="capitalize flex items-center"
                  >
                    {getCategoryIcon(category)}
                    {category}
                  </Button>
                ))}
                
                {(searchTerm || selectedCategory) && (
                  <Button 
                    variant="ghost" 
                    onClick={clearFilters}
                    className="gap-2"
                  >
                    <FilterX className="h-4 w-4" />
                    Clear
                  </Button>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-muted-foreground">
              {filteredPlaces.length} {filteredPlaces.length === 1 ? 'place' : 'places'} found
            </div>
            
            <ToggleGroup 
              type="single" 
              value={viewMode} 
              onValueChange={(value) => value && setViewMode(value as 'grid' | 'map')}
              className="border"
            >
              <ToggleGroupItem value="grid" aria-label="Grid View">
                <Grid className="h-4 w-4 mr-2" />
                Grid
              </ToggleGroupItem>
              <ToggleGroupItem value="map" aria-label="Map View">
                <MapIcon className="h-4 w-4 mr-2" />
                Map
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          
          {filteredPlaces.length === 0 ? (
            <div className="text-center py-16">
              <MapPin className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-2xl font-semibold mb-2">No places found</h2>
              <p className="text-muted-foreground mb-4">
                We couldn't find any religious places matching your search criteria.
              </p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          ) : (
            <>
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPlaces.map(place => (
                    <Card key={place.id} className="overflow-hidden h-full flex flex-col">
                      <div className="aspect-video w-full overflow-hidden">
                        <img 
                          src={place.image} 
                          alt={place.name} 
                          className="w-full h-full object-cover transition-all hover:scale-105"
                        />
                      </div>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="line-clamp-1 flex items-center gap-2">
                              {getCategoryIcon(place.category)}
                              {place.name}
                            </CardTitle>
                            <CardDescription className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {place.location}
                            </CardDescription>
                          </div>
                          
                          {place.collections && place.collections.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {place.collections.map(collectionId => {
                                const collection = PILGRIMAGE_COLLECTIONS.find(c => c.id === collectionId);
                                return collection ? (
                                  <span key={collectionId} className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
                                    <Route className="h-3 w-3" />
                                    {collection.name.split(' ')[0]}
                                  </span>
                                ) : null;
                              })}
                            </div>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-muted-foreground line-clamp-3">{place.description}</p>
                        
                        {/* Show temples if available */}
                        {place.temples && place.temples.length > 0 && (
                          <div className="mt-4">
                            <h4 className="text-sm font-medium mb-2 flex items-center">
                              <TempleIcon className="h-4 w-4 mr-1 text-primary" />
                              Key Temples:
                            </h4>
                            <ul className="text-sm text-muted-foreground pl-4 list-disc">
                              {place.temples.slice(0, 3).map((temple, index) => (
                                <li key={index} className="line-clamp-1">{temple.name}</li>
                              ))}
                              {place.temples.length > 3 && (
                                <li className="text-primary hover:underline cursor-pointer">
                                  +{place.temples.length - 3} more
                                </li>
                              )}
                            </ul>
                          </div>
                        )}
                        
                        {/* If no temples, show highlights */}
                        {(!place.temples || place.temples.length === 0) && place.highlights && (
                          <div className="mt-4">
                            <h4 className="text-sm font-medium mb-2">Highlights:</h4>
                            <ul className="text-sm text-muted-foreground pl-4 list-disc">
                              {place.highlights.slice(0, 2).map((highlight, index) => (
                                <li key={index}>{highlight}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </CardContent>
                      <CardFooter>
                        <Button asChild className="w-full gap-2">
                          <Link to={`/religious-places/${place.id}`}>
                            <Compass className="h-4 w-4" />
                            Explore
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg overflow-hidden border h-[600px]">
                  {mapLoaded && (
                    <MapContainer 
                      center={getMapCenter() as [number, number]} 
                      zoom={5} 
                      style={{ height: "100%", width: "100%" }}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      
                      {filteredPlaces.map((place) => (
                        <Marker 
                          key={place.id} 
                          position={[place.coordinates.lat, place.coordinates.lng]}
                          icon={place.category === 'temple' ? templeIcon : undefined}
                        >
                          <Popup>
                            <div className="p-1">
                              <div className="font-bold mb-1">{place.name}</div>
                              <div className="text-xs text-gray-600 mb-2">{place.location}</div>
                              <div className="text-xs mb-2">{place.description.slice(0, 100)}...</div>
                              
                              {place.temples && place.temples.length > 0 && (
                                <div className="text-xs mb-2">
                                  <span className="font-semibold">Key Temples:</span> 
                                  {' '}{place.temples.slice(0, 2).map(t => t.name).join(', ')}
                                  {place.temples.length > 2 ? ` +${place.temples.length - 2} more` : ''}
                                </div>
                              )}
                              
                              <Link 
                                to={`/religious-places/${place.id}`}
                                className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                              >
                                View Details
                                <Navigation className="h-3 w-3" />
                              </Link>
                            </div>
                          </Popup>
                        </Marker>
                      ))}
                      
                      {/* Display temples within cities */}
                      {filteredPlaces
                        .filter(place => place.temples && place.temples.length > 0)
                        .flatMap(place => 
                          place.temples?.map(temple => ({
                            ...temple,
                            cityName: place.name
                          })) || []
                        )
                        .map((temple, index) => (
                          <Marker
                            key={`temple-${index}`}
                            position={[temple.coordinates.lat, temple.coordinates.lng]}
                            icon={templeIcon}
                          >
                            <Popup>
                              <div className="p-1">
                                <div className="font-bold mb-1">{temple.name}</div>
                                <div className="text-xs text-gray-600 mb-2">Located in {temple.cityName}</div>
                                <div className="text-xs mb-2">{temple.description}</div>
                              </div>
                            </Popup>
                          </Marker>
                        ))
                      }
                    </MapContainer>
                  )}
                </div>
              )}
            </>
          )}
        </TabsContent>
        
        <TabsContent value="collections" className="mt-0">
          {selectedCollection ? (
            <>
              {(() => {
                const collection = PILGRIMAGE_COLLECTIONS.find(c => c.id === selectedCollection);
                if (!collection) return null;
                
                const collectionPlaces = getCollectionPlaces(selectedCollection);
                
                return (
                  <div className="space-y-6">
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setSelectedCollection(null)}
                        className="gap-1"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Back to Collections
                      </Button>
                    </div>
                    
                    <div className="relative aspect-[3/1] overflow-hidden rounded-lg">
                      <img 
                        src={collection.image} 
                        alt={collection.name} 
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
                        <h2 className="text-3xl font-bold text-white mb-2">{collection.name}</h2>
                        <p className="text-white/80 max-w-2xl">{collection.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        <Route className="h-5 w-5 text-primary" />
                        Places in this Pilgrimage
                      </h3>
                      
                      <ToggleGroup 
                        type="single" 
                        value={viewMode} 
                        onValueChange={(value) => value && setViewMode(value as 'grid' | 'map')}
                        className="border"
                      >
                        <ToggleGroupItem value="grid" aria-label="Grid View">
                          <Grid className="h-4 w-4 mr-2" />
                          Grid
                        </ToggleGroupItem>
                        <ToggleGroupItem value="map" aria-label="Map View">
                          <MapIcon className="h-4 w-4 mr-2" />
                          Map
                        </ToggleGroupItem>
                      </ToggleGroup>
                    </div>
                    
                    {viewMode === 'grid' ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {collectionPlaces.map((place, index) => (
                          <Card key={place.id} className="overflow-hidden h-full flex flex-col">
                            <div className="relative">
                              <div className="aspect-video w-full overflow-hidden">
                                <img 
                                  src={place.image} 
                                  alt={place.name} 
                                  className="w-full h-full object-cover transition-all hover:scale-105"
                                />
                              </div>
                              <div className="absolute top-2 left-2 bg-primary text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center">
                                {index + 1}
                              </div>
                            </div>
                            <CardHeader className="pb-2">
                              <CardTitle className="line-clamp-1">{place.name}</CardTitle>
                              <CardDescription className="line-clamp-1">{place.location}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow pb-2">
                              <p className="text-sm text-muted-foreground line-clamp-2">{place.description}</p>
                            </CardContent>
                            <CardFooter>
                              <Button asChild className="w-full" variant="outline" size="sm">
                                <Link to={`/religious-places/${place.id}`}>
                                  Explore
                                </Link>
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-lg overflow-hidden border h-[600px]">
                        {mapLoaded && (
                          <MapContainer 
                            center={getMapCenter() as [number, number]} 
                            zoom={5} 
                            style={{ height: "100%", width: "100%" }}
                          >
                            <TileLayer
                              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            
                            {collectionPlaces.map((place, index) => (
                              <Marker 
                                key={place.id} 
                                position={[place.coordinates.lat, place.coordinates.lng]}
                              >
                                <Popup>
                                  <div className="p-1">
                                    <div className="font-bold mb-1">
                                      {index + 1}. {place.name}
                                    </div>
                                    <div className="text-xs text-gray-600 mb-2">{place.location}</div>
                                    <div className="text-xs mb-2">{place.description.slice(0, 100)}...</div>
                                    <Link 
                                      to={`/religious-places/${place.id}`}
                                      className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                                    >
                                      View Details
                                      <Navigation className="h-3 w-3" />
                                    </Link>
                                  </div>
                                </Popup>
                              </Marker>
                            ))}
                          </MapContainer>
                        )}
                      </div>
                    )}
                    
                    <div className="bg-muted/40 rounded-lg p-6 mt-8">
                      <h3 className="text-lg font-semibold mb-4">About {collection.name}</h3>
                      {collection.id === 'char_dham' && (
                        <div className="space-y-4">
                          <p>
                            The Char Dham Yatra is a sacred Hindu pilgrimage to four holy sites in the Indian Himalayas, all located in the state of Uttarakhand. The four sites—Yamunotri, Gangotri, Kedarnath, and Badrinath—are collectively known as Char Dham (meaning "four abodes").
                          </p>
                          <p>
                            This pilgrimage circuit is typically completed in a clockwise direction, beginning with Yamunotri in the west, followed by Gangotri, then Kedarnath, and finally Badrinath in the east. The complete circuit is approximately 1,000 kilometers and traditionally takes about two weeks to complete.
                          </p>
                          <h4 className="font-medium mt-4">Significance:</h4>
                          <ul className="list-disc pl-5 space-y-2">
                            <li>Yamunotri: The source of the River Yamuna and dedicated to Goddess Yamuna</li>
                            <li>Gangotri: The origin of the River Ganges and dedicated to Goddess Ganga</li>
                            <li>Kedarnath: One of the twelve Jyotirlingas, dedicated to Lord Shiva</li>
                            <li>Badrinath: Dedicated to Lord Vishnu in his Badri avatar</li>
                          </ul>
                          <p>
                            Completing the Char Dham Yatra is believed to cleanse all sins and ensure salvation (moksha) after death. The pilgrimage season typically runs from late April to early November, with the sites being inaccessible during winter due to heavy snowfall.
                          </p>
                        </div>
                      )}
                      
                      {collection.id === 'panch_kedar' && (
                        <div className="space-y-4">
                          <p>
                            The Panch Kedar refers to five Hindu temples dedicated to Lord Shiva, located in the Garhwal region of Uttarakhand, India. According to legend, the Pandavas sought Lord Shiva's blessings after the Kurukshetra war to atone for their sins.
                          </p>
                          <p>
                            The five temples are Kedarnath, Tungnath, Rudranath, Madhyamaheshwar, and Kalpeshwar. Each temple has its unique significance and represents different parts of Lord Shiva's body:
                          </p>
                          <ul className="list-disc pl-5 space-y-2">
                            <li>Kedarnath: Represents the hump of Lord Shiva</li>
                            <li>Tungnath: Represents the arms of Lord Shiva</li>
                            <li>Rudranath: Represents the face of Lord Shiva</li>
                            <li>Madhyamaheshwar: Represents the navel of Lord Shiva</li>
                            <li>Kalpeshwar: Represents the hair (jata) of Lord Shiva</li>
                          </ul>
                          <p>
                            The Panch Kedar pilgrimage is considered highly sacred and challenging, as most temples are located at high altitudes and require trekking through difficult terrain. The best time to undertake this pilgrimage is between May and October.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}
            </>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Route className="h-5 w-5 text-primary" />
                  Sacred Pilgrimage Routes
                </h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search collections..."
                    className="pl-10 w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PILGRIMAGE_COLLECTIONS.filter(collection => 
                  collection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  collection.description.toLowerCase().includes(searchTerm.toLowerCase())
                ).map(collection => (
                  <Card key={collection.id} className="overflow-hidden">
                    <div className="aspect-[2/1] overflow-hidden">
                      <img 
                        src={collection.image} 
                        alt={collection.name} 
                        className="w-full h-full object-cover transition-all hover:scale-105"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{collection.name}</CardTitle>
                      <CardDescription>{collection.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex flex-wrap gap-1 mb-3">
                        {collection.places.map(placeId => {
                          const place = RELIGIOUS_PLACES.find(p => p.id === placeId);
                          return place ? (
                            <span key={place.id} className="text-xs bg-muted px-2 py-1 rounded-full">
                              {place.name}
                            </span>
                          ) : null;
                        })}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full" 
                        onClick={() => setSelectedCollection(collection.id)}
                      >
                        Explore Pilgrimage Route
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              <div className="rounded-lg bg-muted/30 p-6 mt-8">
                <h3 className="text-xl font-semibold mb-3">About Hindu Pilgrimages</h3>
                <p className="mb-4">
                  Pilgrimages (yatras) hold immense significance in Hinduism, believed to purify the soul and bring devotees closer to divine realization. These spiritual journeys often involve visiting sacred sites associated with deities, holy rivers, mountains, or historical events from Hindu scriptures.
                </p>
                <p className="mb-4">
                  Each pilgrimage route has its own rituals, traditions, and spiritual significance. They often follow specific sequences and seasonal patterns, with some routes only accessible during certain months of the year due to geographical constraints.
                </p>
                <p>
                  Beyond religious importance, these pilgrimages have served as cultural bridges, connecting diverse regions of India and fostering a sense of unity among followers of Sanatan Dharma despite regional, linguistic, and cultural differences.
                </p>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}