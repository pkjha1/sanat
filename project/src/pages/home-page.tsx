import React from 'react';
import { HeroSection } from '@/components/hero-section';
import { FeaturedContent } from '@/components/featured-content';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Leaf, Heart, BookOpen, MapPin } from 'lucide-react';

export function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />

      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Explore the Essence of Sanatan Dharma</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Immerse yourself in the profound wisdom and spiritual practices of one of the world's oldest living traditions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader className="pb-2">
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-2">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Sacred Texts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Explore ancient scriptures and commentaries from revered traditions.</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader className="pb-2">
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-2">
                  <Leaf className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Spiritual Teachings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Learn from timeless wisdom through video and written teachings.</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader className="pb-2">
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-2">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Devotional Stories</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Discover inspiring stories that illuminate spiritual truths.</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader className="pb-2">
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-2">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Sacred Places</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Explore temples and holy sites with rich cultural heritage.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <FeaturedContent 
        type="books" 
        title="Featured Books" 
        description="Explore sacred texts and spiritual classics"
      />

      <FeaturedContent 
        type="teachings" 
        title="Featured Teachings" 
        description="Wisdom from spiritual masters and gurus"
      />

      <FeaturedContent 
        type="audiobooks" 
        title="Featured Audiobooks" 
        description="Listen to spiritual wisdom on the go"
      />

      <section className="py-16 bg-primary/5">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Support Our Mission</h2>
              <p className="text-lg text-muted-foreground">
                Your contribution helps us preserve and share the timeless wisdom of Sanatan Dharma with seekers around the world.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  <p>Support the digitization of rare and ancient texts</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  <p>Help create educational content in multiple languages</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  <p>Preserve sacred knowledge for future generations</p>
                </div>
              </div>
              <div className="pt-4">
                <Button asChild size="lg">
                  <Link to="/donate">Make a Donation</Link>
                </Button>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://source.unsplash.com/random/800x600/?temple,donation"
                alt="Supporting Sanatan Dharma"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <FeaturedContent 
        type="stories" 
        title="Featured Stories" 
        description="Ancient stories with timeless spiritual lessons"
      />

      <section className="py-16 bg-muted/30">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Spiritual Community</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Create a free account to track your progress, bookmark favorite content, and connect with fellow seekers on the spiritual path.
          </p>
          <Button asChild size="lg">
            <Link to="/auth/signup">Sign Up for Free</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}