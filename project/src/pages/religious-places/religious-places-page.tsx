{/* Previous imports and code remain exactly the same until the return statement */}

export function ReligiousPlacesPage() {
  // ... all the previous state and functions remain the same ...

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
                              <Temple className="h-4 w-4 mr-1 text-primary" />
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
                      center={getMapCenter()} 
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
            // Show selected collection details
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
                            center={getMapCenter()} 
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
                      
                      {collection.id === 'char_dham_national' && (
                        <div className="space-y-4">
                          <p>
                            The Char Dham (National) refers to the four sacred pilgrimage sites spread across the four directions of India, established by Adi Shankaracharya in the 8th century CE. These four sites are:
                          </p>
                          <ul className="list-disc pl-5 space-y-2">
                            <li>Badrinath (North) in Uttarakhand - Dedicated to Lord Vishnu</li>
                            <li>Dwarka (West) in Gujarat - Associated with Lord Krishna</li>
                            <li>Puri (East) in Odisha - Home to the Jagannath Temple</li>
                            <li>Rameshwaram (South) in Tamil Nadu - Known for its connection to Lord Rama</li>
                          </ul>
                          <p>
                            This pilgrimage is considered highly sacred in Hinduism, and it is believed that visiting these four sites helps a devotee attain moksha (salvation). Each site has its unique spiritual significance and architectural heritage, representing different aspects of Hindu theology and culture.
                          </p>
                          <p>
                            Unlike the Uttarakhand Char Dham which can be completed in one trip, the National Char Dham requires traveling across the entire Indian subcontinent, making it a more extensive pilgrimage often undertaken over a longer period.
                          </p>
                        </div>
                      )}
                      
                      {collection.id === 'kailash_mansarovar_yatra' && (
                        <div className="space-y-4">
                          <p>
                            The Kailash Mansarovar Yatra is a pilgrimage to Mount Kailash and Lake Mansarovar in Tibet, China. Mount Kailash is considered the abode of Lord Shiva and is sacred to Hindus, Buddhists, Jains, and followers of the ancient Bon religion.
                          </p>
                          <p>
                            Lake Mansarovar, situated at the foot of Mount Kailash, is believed to have been created by Lord Brahma. It is one of the highest freshwater lakes in the world and is considered highly sacred. Bathing in its waters is believed to cleanse all sins.
                          </p>
                          <p>
                            The pilgrimage involves performing a parikrama (circumambulation) around Mount Kailash, which is a 52 km trek usually completed in three days. The entire yatra is physically demanding due to the high altitude and challenging terrain.
                          </p>
                          <p>
                            Due to its location in Tibet (China), special permits are required for this pilgrimage, and it is usually organized through official channels with limited availability each year.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}
            </>
          ) : (
            // Show list of collections
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