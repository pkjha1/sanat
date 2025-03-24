import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, Globe, Shield, BookText, Video, Headphones, Bot as Lotus, Heart, Sparkles, Clock, Laptop } from 'lucide-react';

export function WhyUsPage() {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Why Choose Sanatani?</h1>
          <p className="text-xl text-muted-foreground">
            Your trusted platform for exploring and understanding the timeless wisdom of Sanatan Dharma
          </p>
        </div>
        
        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Comprehensive Library
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Access a vast collection of sacred texts, teachings, and spiritual resources, carefully curated and digitally preserved for easy access.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Expert Guidance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Learn from verified scholars and spiritual masters who bring authentic knowledge and deep understanding of Sanatan traditions.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Global Accessibility
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Connect with Sanatan Dharma from anywhere in the world, breaking geographical barriers to spiritual knowledge.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Authentic Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Every piece of content is verified for authenticity, ensuring you receive genuine spiritual knowledge rooted in tradition.
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Content Types Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Diverse Learning Formats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center space-y-2 p-6 bg-muted/30 rounded-lg">
              <BookText className="h-8 w-8 text-primary" />
              <h3 className="font-semibold">Sacred Texts</h3>
              <p className="text-sm text-muted-foreground">
                Digital versions of ancient scriptures with translations and commentaries
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center space-y-2 p-6 bg-muted/30 rounded-lg">
              <Video className="h-8 w-8 text-primary" />
              <h3 className="font-semibold">Video Teachings</h3>
              <p className="text-sm text-muted-foreground">
                Visual lessons and discourses from spiritual masters
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center space-y-2 p-6 bg-muted/30 rounded-lg">
              <Headphones className="h-8 w-8 text-primary" />
              <h3 className="font-semibold">Audio Content</h3>
              <p className="text-sm text-muted-foreground">
                Listen to spiritual teachings during your daily activities
              </p>
            </div>
          </div>
        </div>
        
        {/* Benefits Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Platform Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Lotus className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Guided Practice</h3>
                <p className="text-sm text-muted-foreground">
                  Step-by-step guidance for spiritual practices and meditation techniques
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Community Support</h3>
                <p className="text-sm text-muted-foreground">
                  Connect with fellow seekers on the spiritual path
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Regular Updates</h3>
                <p className="text-sm text-muted-foreground">
                  New content added regularly to deepen your spiritual knowledge
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Flexible Learning</h3>
                <p className="text-sm text-muted-foreground">
                  Learn at your own pace with 24/7 access to all content
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Technology Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Modern Technology, Ancient Wisdom</h2>
          <div className="bg-muted/30 p-6 rounded-lg space-y-4">
            <div className="flex items-center gap-3">
              <Laptop className="h-6 w-6 text-primary" />
              <p className="text-muted-foreground">
                Our platform combines cutting-edge technology with ancient spiritual wisdom, making sacred knowledge accessible in the digital age.
              </p>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground ml-10">
              <li>Mobile-friendly interface for learning on the go</li>
              <li>Offline access to downloaded content</li>
              <li>Progress tracking and personalized recommendations</li>
              <li>Regular platform updates and improvements</li>
            </ul>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="text-center bg-primary/5 p-8 rounded-lg space-y-4">
          <h2 className="text-2xl font-bold">Begin Your Spiritual Journey Today</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of seekers who have chosen Sanatani as their trusted platform for exploring and understanding Sanatan Dharma. Start your journey of spiritual growth and self-discovery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Users className="h-5 w-5" />
              <span>10,000+ Active Users</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <BookOpen className="h-5 w-5" />
              <span>1,000+ Resources</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Globe className="h-5 w-5" />
              <span>Global Community</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}