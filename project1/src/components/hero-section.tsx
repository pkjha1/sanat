import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookOpen, Video, Headphones } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://source.unsplash.com/random/1920x1080/?temple,hindu')] bg-cover bg-center"></div>
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
            Discover the Timeless Wisdom of Sanatan Dharma
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 animate-fade-in">
            Explore sacred texts, teachings, audiobooks, and stories to deepen your understanding and connection with ancient spiritual knowledge.
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in">
            <Button asChild size="lg" className="gap-2">
              <Link to="/books">
                <BookOpen className="h-5 w-5" />
                <span>Explore Books</span>
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20 gap-2">
              <Link to="/teachings">
                <Video className="h-5 w-5" />
                <span>Watch Teachings</span>
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20 gap-2">
              <Link to="/audiobooks">
                <Headphones className="h-5 w-5" />
                <span>Listen to Audiobooks</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}