import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Search, FilterX } from 'lucide-react';

// Mock data for books
const BOOKS = [
  {
    id: 1,
    title: 'Bhagavad Gita',
    author: 'Vyasa',
    description: 'The sacred dialogue between Lord Krishna and Arjuna on the battlefield of Kurukshetra.',
    coverImage: 'https://source.unsplash.com/random/400x600/?bhagavad,gita',
    category: 'scripture',
  },
  {
    id: 2,
    title: 'Upanishads',
    author: 'Various Sages',
    description: 'A collection of philosophical texts that form the theoretical basis for the Hindu religion.',
    coverImage: 'https://source.unsplash.com/random/400x600/?upanishad,scripture',
    category: 'scripture',
  },
  {
    id: 3,
    title: 'Ramayana',
    author: 'Valmiki',
    description: 'The epic tale of Lord Rama, the prince of Ayodhya, and his battle against Ravana.',
    coverImage: 'https://source.unsplash.com/random/400x600/?rama,temple',
    category: 'epic',
  },
  {
    id: 4,
    title: 'Mahabharata',
    author: 'Vyasa',
    description: 'One of the two major Sanskrit epics of ancient India, centered on the Kurukshetra War.',
    coverImage: 'https://source.unsplash.com/random/400x600/?mahabharata,hindu',
    category: 'epic',
  },
  {
    id: 5,
    title: 'Yoga Sutras of Patanjali',
    author: 'Patanjali',
    description: 'A foundational text of Yoga, outlining the eight limbs of yoga practice.',
    coverImage: 'https://source.unsplash.com/random/400x600/?yoga,meditation',
    category: 'philosophy',
  },
  {
    id: 6,
    title: 'Vivekachudamani',
    author: 'Adi Shankaracharya',
    description: 'A philosophical text that expounds the path to liberation through knowledge of the self.',
    coverImage: 'https://source.unsplash.com/random/400x600/?hindu,philosopher',
    category: 'philosophy',
  },
  {
    id: 7,
    title: 'Vedas',
    author: 'Ancient Rishis',
    description: 'The oldest sacred texts of Hinduism composed in Vedic Sanskrit.',
    coverImage: 'https://source.unsplash.com/random/400x600/?vedas,sanskrit',
    category: 'scripture',
  },
  {
    id: 8,
    title: 'Puranas',
    author: 'Various Authors',
    description: 'Ancient texts embodying stories of the history of the universe from creation to destruction.',
    coverImage: 'https://source.unsplash.com/random/400x600/?hindu,mythology',
    category: 'scripture',
  },
  {
    id: 9,
    title: 'Brahma Sutras',
    author: 'Badarayana',
    description: 'A text systematizing and summarizing the philosophical and spiritual ideas in the Upanishads.',
    coverImage: 'https://source.unsplash.com/random/400x600/?brahma,hindu',
    category: 'philosophy',
  },
];

export function BooksPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const filteredBooks = BOOKS.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === null || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  const categories = ['scripture', 'epic', 'philosophy'];
  
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory(null);
  };

  return (
    <div className="container py-12">
      <div className="space-y-4 mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Sacred Books</h1>
        <p className="text-muted-foreground text-lg">
          Explore the ancient wisdom of Sanatan Dharma through sacred texts and spiritual classics
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search books by title or author..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 flex-wrap">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
              className="capitalize"
            >
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
      
      {filteredBooks.length === 0 ? (
        <div className="text-center py-16">
          <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No books found</h2>
          <p className="text-muted-foreground mb-4">
            We couldn't find any books matching your search criteria.
          </p>
          <Button onClick={clearFilters}>Clear Filters</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map(book => (
            <Card key={book.id} className="overflow-hidden h-full flex flex-col">
              <div className="relative pt-[60%]">
                <img 
                  src={book.coverImage} 
                  alt={book.title}
                  className="absolute top-0 left-0 w-full h-full object-cover transition-all hover:scale-105"
                />
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="line-clamp-1">{book.title}</CardTitle>
                    <CardDescription>{book.author}</CardDescription>
                  </div>
                  <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full capitalize">
                    {book.category}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground line-clamp-3">{book.description}</p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full gap-2">
                  <Link to={`/books/${book.id}`}>
                    <BookOpen className="h-4 w-4" />
                    Read Book
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}