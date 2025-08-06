import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Search,
  ShoppingCart,
  User,
  Globe,
  ChevronDown,
  Crown,
  LogOut,
  Heart,
} from "lucide-react";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { AuthModal } from "./AuthModal";
import { CartSidebar } from "./CartSidebar";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { CURRENCIES } from "@/utils/currency";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCurrency, setShowCurrency] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCart, setShowCart] = useState(false);
  const { selectedCurrency, setCurrency } = useCurrency();
  const { user, logout, isAdmin } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const currencyRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const currencies = Object.values(CURRENCIES);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (currencyRef.current && !currencyRef.current.contains(event.target as Node)) {
        setShowCurrency(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearch(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Cleanup all modals on component unmount
  useEffect(() => {
    return () => {
      setShowAuthModal(false);
      setShowCart(false);
      setShowCurrency(false);
      setShowUserMenu(false);
      setShowSearch(false);
    };
  }, []);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setShowSearch(false);
      setSearchQuery("");
    }
  };

  const handleQuickSearch = () => {
    console.log("Search button clicked");
    setShowSearch(!showSearch);
  };

  return (
    <nav className="bg-background/95 border-border sticky top-0 z-50 border-b backdrop-blur-xl shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary via-cyan-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg shadow-primary/25 animate-pulse">
              <span className="text-white font-bold text-lg">⚡</span>
            </div>
            <span className="font-sport font-bold text-xl tracking-wide text-foreground">
              FAN<span className="text-primary">KICK</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-6">
              <Link
                to="/category/football"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Football
              </Link>
              <Link
                to="/category/anime"
                className="hover:text-primary transition-colors font-medium"
              >
                Anime
              </Link>
              <Link
                to="/category/pop-culture"
                className="hover:text-primary transition-colors font-medium"
              >
                Pop Culture
              </Link>
              <Link
                to="/trending"
                className="hover:text-primary transition-colors font-medium relative"
              >
                Trending
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  HOT
                </span>
              </Link>
              <Link
                to="/collections"
                className="hover:text-primary transition-colors font-medium"
              >
                Collections
              </Link>
            </div>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-3">
            {/* Currency Selector */}
            <div className="relative hidden sm:block" ref={currencyRef}>
              <Button
              variant="ghost"
              size="sm"
              className="text-foreground hover:text-primary cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log("Currency button clicked");
                setShowCurrency(!showCurrency);
              }}
              style={{ pointerEvents: 'auto' }}
            >
                <Globe className="h-4 w-4 mr-1" />
                <span className="text-sm">
                  {selectedCurrency.flag} {selectedCurrency.symbol}
                </span>
                <ChevronDown className="h-3 w-3 ml-1" />
              </Button>

              {showCurrency && (
                <div className="absolute right-0 mt-2 w-48 bg-background border rounded-lg shadow-lg z-50">
                  {currencies.map((currency) => (
                    <button
                      key={currency.code}
                      onClick={() => {
                        setCurrency(currency.code);
                        setShowCurrency(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <span>{currency.flag}</span>
                      <span className="font-medium">{currency.code}</span>
                      <span className="text-gray-500">{currency.symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative" ref={searchRef}>
              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:flex text-foreground hover:text-primary cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleQuickSearch();
                }}
                style={{ pointerEvents: 'auto' }}
              >
                <Search className="h-4 w-4" />
              </Button>

              {/* Quick Search Dropdown */}
              {showSearch && (
                <div className="absolute right-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50 p-4">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleSearch(searchQuery);
                        }
                      }}
                      className="flex-1 px-3 py-2 bg-background border border-border rounded text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      autoFocus
                    />
                    <Button
                      onClick={() => handleSearch(searchQuery)}
                      className="bg-primary text-black hover:bg-primary/90"
                      size="sm"
                    >
                      <Search className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="mt-3 text-xs text-muted-foreground">
                    Try: "Naruto", "Messi", "Taylor Swift", "Football Jersey"
                  </div>
                </div>
              )}
            </div>
            <ThemeToggle />

            {/* User Authentication */}
            {user ? (
              <div className="relative" ref={userMenuRef}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-foreground hover:text-primary"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-black font-bold text-xs">
                        {(user.firstName || user.email).charAt(0).toUpperCase()}
                      </span>
                    </div>

                    <ChevronDown className="w-3 h-3" />
                  </div>
                </Button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-background text-foreground rounded-lg shadow-lg border border-border z-50">
                    <div className="px-4 py-3 border-b border-border">
                      <p className="font-medium">{user.firstName || 'User'}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>

                    </div>

                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-700 flex items-center"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <User className="w-4 h-4 mr-2" />
                      My Profile
                    </Link>

                    <button
                      onClick={() => {
                        setShowCart(true);
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Cart ({totalItems})
                    </button>

                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-700 flex items-center"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      Wishlist
                    </Link>

                    {isAdmin() && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 hover:bg-gray-700 flex items-center border-t border-gray-700"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Crown className="w-4 h-4 mr-2 text-primary" />
                        Admin Panel
                      </Link>
                    )}

                    <button
                      onClick={() => {
                        logout();
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center border-t border-gray-700 text-red-400"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                <User className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Login</span>
              </Link>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="relative text-foreground hover:text-primary cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log("Cart button clicked");
                setShowCart(true);
              }}
              style={{ pointerEvents: 'auto' }}
            >
              <ShoppingCart className="h-4 w-4" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-foreground cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log("Mobile menu button clicked");
                setIsMenuOpen(!isMenuOpen);
              }}
              style={{ pointerEvents: 'auto' }}
            >
              {isMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-border">
              <Link
                to="/category/football"
                className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-secondary rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                ⚽ Football
              </Link>
              <Link
                to="/category/anime"
                className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-secondary rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                🎌 Anime
              </Link>
              <Link
                to="/category/pop-culture"
                className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-secondary rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                🎭 Pop Culture
              </Link>
              <Link
                to="/trending"
                className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-secondary rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                🔥 Trending
              </Link>
              <Link
                to="/collections"
                className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-secondary rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                ✨ Collections
              </Link>

              {/* Mobile Currency Selector */}
              <div className="pt-4 pb-3 border-t border-gray-800">
                <div className="px-3 py-2">
                  <span className="text-sm text-muted-foreground">Currency</span>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {currencies.map((currency) => (
                      <button
                        key={currency.code}
                        onClick={() => {
                          setCurrency(currency.code);
                          setIsMenuOpen(false);
                        }}
                        className={`px-2 py-1 text-xs rounded ${
                          selectedCurrency.code === currency.code
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                        }`}
                      >
                        {currency.flag} {currency.code}
                      </button>
                    ))}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-foreground hover:text-primary"
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate('/search');
                  }}
                >
                  <Search className="h-4 w-4 mr-2" />
                  Search Products
                </Button>

                {/* Theme Toggle in Mobile Menu */}
                <div className="px-3 py-2 border-t border-border mt-2 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Theme</span>
                    <ThemeToggle />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultMode="login"
      />

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={showCart}
        onClose={() => setShowCart(false)}
      />
    </nav>
  );
}
