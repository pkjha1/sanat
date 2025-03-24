import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot as Lotus, Heart, Star, BookOpen, Users, Sparkles, Scroll, GraduationCap, Globe, Calendar, MapPin } from 'lucide-react';

export function AboutGurujiPage() {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Sadguru Riteshwar Ji Maharaj</h1>
          <p className="text-xl text-muted-foreground">
            Spiritual Leader, Guide & Visionary
          </p>
        </div>

        {/* Main Image */}
        <div className="aspect-[16/9] overflow-hidden rounded-lg">
          <img 
            src="https://source.unsplash.com/random/1920x1080/?spiritual,guru" 
            alt="Sadguru Riteshwar Ji Maharaj" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Introduction */}
        <div className="prose max-w-none">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Born on January 5, 1973, in Gorakhpur, Uttar Pradesh, Sadguru Riteshwar Ji Maharaj hails from an aristocratic Brahmin family. His parents, both educators, instilled deep values of knowledge and spirituality in him. Despite earning a Master's in Geology and a degree in Sanskrit, he chose the path of Sanatana Dharma over a conventional career.
          </p>
        </div>

        {/* Key Aspects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                Path to Spirituality
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                His spiritual journey began early, with intense penance in Trikuta mountains, Uttarakhand, Varanasi, and Vrindavan. Deeply moved by Lord Krishna's teachings, he embarked on a lifelong mission to revive Sanatana Dharma and guide humanity toward enlightenment.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Global Influence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                His spiritual discourses have inspired millions across India, Nepal, Scotland, South Africa, Australia, and Canada, spreading the divine message of Bhagavad Gita and Shrimad Bhagwat Mahapuran.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Spiritual Journey */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Spiritual Journey</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lotus className="h-5 w-5 text-primary" />
                  The Seeker
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  From an early age, Guruji displayed mystical talents and deep wisdom, leading him to intense spiritual practices in the Himalayas, Vrindavan, and Kashi.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scroll className="h-5 w-5 text-primary" />
                  The Messenger
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Traveling across India and beyond, he conducted Bhagwat Katha, Valmiki Ramayana, and Bhaktamal discourses, reviving Sanatana Dharma's essence among devotees.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  The Reformer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Guruji founded Shri Anandam Dham, an international non-profit, spreading environmental awareness, addiction rehabilitation, and spiritual upliftment.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  The Visionary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  His establishment of Bhagwat Research Institute and promotion of Sanatni movement aim to bring spiritual wisdom into daily life and shape a conscious, enlightened generation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Shri Anandam Dham */}
        <div className="bg-muted/30 rounded-lg p-8">
          <div className="flex items-start gap-4">
            <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold mb-4">Shri Anandam Dham</h2>
              <p className="text-muted-foreground">
                An international educational non-profit in Vrindavan, running programs on spirituality, environmental conservation, & youth transformation.
              </p>
            </div>
          </div>
        </div>

        {/* SANATNI - The Revival */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            SANATNI - The Revival
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center space-y-2 p-6 bg-muted/30 rounded-lg">
              <Scroll className="h-8 w-8 text-primary" />
              <h3 className="font-semibold">Ancient Wisdom</h3>
              <p className="text-sm text-muted-foreground">
                Restoring the lost wisdom of ancient India
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-2 p-6 bg-muted/30 rounded-lg">
              <GraduationCap className="h-8 w-8 text-primary" />
              <h3 className="font-semibold">Modern Education</h3>
              <p className="text-sm text-muted-foreground">
                Bringing Vedic teachings to today's world
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-2 p-6 bg-muted/30 rounded-lg">
              <Users className="h-8 w-8 text-primary" />
              <h3 className="font-semibold">Global Community</h3>
              <p className="text-sm text-muted-foreground">
                Building a worldwide spiritual family
              </p>
            </div>
          </div>
        </div>

        {/* The Legacy Continues */}
        <div className="bg-primary/5 rounded-lg p-8 text-center space-y-4">
          <h2 className="text-2xl font-bold">The Legacy Continues</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Sadguru Riteshwar Ji Maharaj's life is a beacon of enlightenment, dedicated to reviving Sanatana Dharma through Sanatni. His vision is to awaken humanity, reconnecting it with eternal wisdom and divine consciousness.
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
            Sanatni is not just a movement; it is the revival of a lost legacy. Guruji has rekindled the fire of wisdom to guide the world back to its spiritual roots.
          </p>
          <div className="flex flex-wrap justify-center gap-8 mt-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span className="text-muted-foreground">Born January 5, 1973</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="text-muted-foreground">Gorakhpur, Uttar Pradesh</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              <span className="text-muted-foreground">Global Spiritual Leader</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}