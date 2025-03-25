import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-background border-t py-12">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold text-foreground">Sanatani</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Empowering spiritual growth through accessible knowledge of Sanatan Dharma.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-muted-foreground hover:text-primary" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" className="text-muted-foreground hover:text-primary" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" className="text-muted-foreground hover:text-primary" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://youtube.com" className="text-muted-foreground hover:text-primary" aria-label="Youtube">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/books" className="text-muted-foreground hover:text-primary text-sm">
                  Books
                </Link>
              </li>
              <li>
                <Link to="/teachings" className="text-muted-foreground hover:text-primary text-sm">
                  Teachings
                </Link>
              </li>
              <li>
                <Link to="/audiobooks" className="text-muted-foreground hover:text-primary text-sm">
                  Audiobooks
                </Link>
              </li>
              <li>
                <Link to="/stories" className="text-muted-foreground hover:text-primary text-sm">
                  Stories
                </Link>
              </li>
              <li>
                <Link to="/religious-places" className="text-muted-foreground hover:text-primary text-sm">
                  Religious Places
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/donate" className="text-muted-foreground hover:text-primary text-sm">
                  Donate
                </Link>
              </li>
              <li>
                <Link to="/subscription" className="text-muted-foreground hover:text-primary text-sm">
                  Subscription
                </Link>
              </li>
              <li>
                <Link to="/offerings" className="text-muted-foreground hover:text-primary text-sm">
                  Offerings
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-muted-foreground hover:text-primary text-sm">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-border">
          <p className="text-center text-muted-foreground text-sm">
            © {new Date().getFullYear()} Sanatani. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}