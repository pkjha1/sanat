import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, Globe, Shield, Heart, Sparkles, GraduationCap, BookText, Headphones, Bot as Lotus, Video } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">About Sanatani</h1>
          <p className="text-xl text-muted-foreground">
            Preserving and sharing the timeless wisdom of Sanatan Dharma in the digital age
          </p>
        </div>

        {/* Main Image */}
        <div className="aspect-[21/9] overflow-hidden rounded-lg">
          <img 
            src="https://source.unsplash.com/random/1920x1080/?temple,hindu" 
            alt="Ancient Hindu Temple" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To make the profound wisdom of Sanatan Dharma accessible to seekers worldwide through a modern digital platform, preserving ancient knowledge while fostering spiritual growth and understanding.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To create a global community where seekers can explore, learn, and practice the teachings of Sanatan Dharma, bridging ancient wisdom with modern accessibility.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* What We Offer */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">What We Offer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Sacred Texts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Digital access to ancient scriptures including Vedas, Upanishads, Bhagavad Gita, and other sacred texts with translations and commentaries.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Video className="h-5 w-5 text-primary" />
                  Video Teachings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Insightful video lectures and discussions from respected spiritual masters and scholars on various aspects of Sanatan Dharma.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Headphones className="h-5 w-5 text-primary" />
                  Audio Content
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Audiobooks and podcasts featuring spiritual teachings, making learning possible during daily activities.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BookText className="h-5 w-5 text-primary" />
                  Spiritual Stories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Collection of inspiring stories from ancient texts and traditions that convey deep spiritual truths through engaging narratives.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Lotus className="h-5 w-5 text-primary" />
                  Guided Practices
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Step-by-step guidance for meditation, pranayama, and other spiritual practices from qualified teachers.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  Educational Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Structured courses and study materials on various aspects of Sanatan Dharma, suitable for beginners to advanced practitioners.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Our Approach */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Our Approach</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center space-y-2 p-6 bg-muted/30 rounded-lg">
              <Shield className="h-8 w-8 text-primary" />
              <h3 className="font-semibold">Authentic Knowledge</h3>
              <p className="text-sm text-muted-foreground">
                Content verified by scholars and experts in Sanatan traditions
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-2 p-6 bg-muted/30 rounded-lg">
              <Globe className="h-8 w-8 text-primary" />
              <h3 className="font-semibold">Global Accessibility</h3>
              <p className="text-sm text-muted-foreground">
                Making spiritual wisdom accessible to seekers worldwide
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-2 p-6 bg-muted/30 rounded-lg">
              <Users className="h-8 w-8 text-primary" />
              <h3 className="font-semibold">Community Support</h3>
              <p className="text-sm text-muted-foreground">
                Building a global community of spiritual practitioners
              </p>
            </div>
          </div>
        </div>

        {/* Our Team */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Our Team</h2>
          <p className="text-muted-foreground">
            Our team consists of dedicated individuals with diverse expertise in Sanskrit, comparative religion, philosophy, and technology. We work together to create a platform that honors the depth and authenticity of Sanatan Dharma while making it accessible to a global audience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="space-y-2">
              <h3 className="font-semibold">Spiritual Advisors</h3>
              <p className="text-sm text-muted-foreground">
                Our content is guided by respected scholars and practitioners who ensure authenticity and depth in our presentations of Sanatan teachings.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Technical Team</h3>
              <p className="text-sm text-muted-foreground">
                Our developers and designers work to create an intuitive and accessible platform that brings ancient wisdom into the digital age.
              </p>
            </div>
          </div>
        </div>

        {/* Join Us */}
        <div className="bg-primary/5 rounded-lg p-8 text-center space-y-4">
          <h2 className="text-2xl font-bold">Join Us on This Sacred Journey</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Whether you're new to Sanatan Dharma or have been practicing for years, we welcome you to explore our platform and join our growing community of seekers. Together, we can preserve and share this precious spiritual heritage for generations to come.
          </p>
          <div className="flex flex-wrap justify-center gap-8 mt-6">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <span className="text-muted-foreground">10,000+ Active Users</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="text-muted-foreground">1,000+ Resources</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              <span className="text-muted-foreground">Global Community</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}