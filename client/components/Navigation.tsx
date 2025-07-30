import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Search, ShoppingCart, User } from 'lucide-react'
import { Button } from './ui/button'

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-black text-white sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-lg">⚽</span>
            </div>
            <span className="font-sport font-bold text-xl tracking-wide">
              FAN<span className="text-primary">KICK</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              <Link 
                to="/players" 
                className="hover:text-primary transition-colors font-medium"
              >
                Players
              </Link>
              <Link 
                to="/clubs" 
                className="hover:text-primary transition-colors font-medium"
              >
                Clubs
              </Link>
              <Link 
                to="/accessories" 
                className="hover:text-primary transition-colors font-medium"
              >
                Accessories
              </Link>
              <Link 
                to="/trending" 
                className="hover:text-primary transition-colors font-medium"
              >
                Trending
              </Link>
            </div>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingCart className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 bg-primary text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-800">
              <Link
                to="/players"
                className="block px-3 py-2 text-base font-medium hover:text-primary hover:bg-gray-900 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Players
              </Link>
              <Link
                to="/clubs"
                className="block px-3 py-2 text-base font-medium hover:text-primary hover:bg-gray-900 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Clubs
              </Link>
              <Link
                to="/accessories"
                className="block px-3 py-2 text-base font-medium hover:text-primary hover:bg-gray-900 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Accessories
              </Link>
              <Link
                to="/trending"
                className="block px-3 py-2 text-base font-medium hover:text-primary hover:bg-gray-900 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Trending
              </Link>
              <div className="pt-4 pb-3 border-t border-gray-800">
                <Button variant="ghost" className="w-full justify-start">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
