import { useState } from "react";
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
} from "lucide-react";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { AuthModal } from "./AuthModal";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useAuth } from "@/contexts/AuthContext";
import { CURRENCIES } from "@/utils/currency";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCurrency, setShowCurrency] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { selectedCurrency, setCurrency } = useCurrency();
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const currencies = Object.values(CURRENCIES);

  return (
    <nav className="bg-black text-white sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-lg">⚡</span>
            </div>
            <span className="font-sport font-bold text-xl tracking-wide">
              FAN<span className="text-primary">KICK</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-6">
              <Link
                to="/football"
                className="hover:text-primary transition-colors font-medium"
              >
                Football
              </Link>
              <Link
                to="/anime"
                className="hover:text-primary transition-colors font-medium"
              >
                Anime
              </Link>
              <Link
                to="/pop-culture"
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
            <div className="relative hidden sm:block">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:text-primary"
                onClick={() => setShowCurrency(!showCurrency)}
              >
                <Globe className="h-4 w-4 mr-1" />
                <span className="text-sm">
                  {selectedCurrency.flag} {selectedCurrency.symbol}
                </span>
                <ChevronDown className="h-3 w-3 ml-1" />
              </Button>

              {showCurrency && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg border z-50">
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

            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:flex text-white hover:text-primary"
            >
              <Search className="h-4 w-4" />
            </Button>
            <ThemeToggle />

            {/* User Authentication */}
            {user ? (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-primary"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-black font-bold text-xs">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    {user.isAdmin && <Crown className="w-3 h-3 text-primary" />}
                    <ChevronDown className="w-3 h-3" />
                  </div>
                </Button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg border z-50">
                    <div className="px-4 py-3 border-b">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    {user.isAdmin && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 hover:bg-gray-100 flex items-center"
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
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:text-primary"
                onClick={() => setShowAuthModal(true)}
              >
                <User className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Login</span>
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="relative text-white hover:text-primary"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 bg-primary text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                0
              </span>
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
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
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-800">
              <Link
                to="/football"
                className="block px-3 py-2 text-base font-medium hover:text-primary hover:bg-gray-900 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                ⚽ Football
              </Link>
              <Link
                to="/anime"
                className="block px-3 py-2 text-base font-medium hover:text-primary hover:bg-gray-900 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                🎌 Anime
              </Link>
              <Link
                to="/pop-culture"
                className="block px-3 py-2 text-base font-medium hover:text-primary hover:bg-gray-900 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                🎭 Pop Culture
              </Link>
              <Link
                to="/trending"
                className="block px-3 py-2 text-base font-medium hover:text-primary hover:bg-gray-900 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                🔥 Trending
              </Link>
              <Link
                to="/collections"
                className="block px-3 py-2 text-base font-medium hover:text-primary hover:bg-gray-900 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                ✨ Collections
              </Link>

              {/* Mobile Currency Selector */}
              <div className="pt-4 pb-3 border-t border-gray-800">
                <div className="px-3 py-2">
                  <span className="text-sm text-gray-400">Currency</span>
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
                            ? "bg-primary text-black"
                            : "bg-gray-800 text-white hover:bg-gray-700"
                        }`}
                      >
                        {currency.flag} {currency.code}
                      </button>
                    ))}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white hover:text-primary"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Search Products
                </Button>
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
    </nav>
  );
}
