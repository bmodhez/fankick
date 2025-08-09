import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Instagram,
  Twitter,
  Facebook,
  Mail,
  Phone,
  MapPin,
  Crown,
  Heart
} from "lucide-react";

export function ModernFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl">
                FAN<span className="text-blue-400">KICK</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm max-w-xs">
              India's most trusted destination for authentic fan merchandise. 
              Quality products for passionate fans.
            </p>
            <div className="flex space-x-3">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-blue-400 p-2 hover:bg-gray-800"
              >
                <Instagram className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-blue-400 p-2 hover:bg-gray-800"
              >
                <Twitter className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-blue-400 p-2 hover:bg-gray-800"
              >
                <Facebook className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/collections" className="text-gray-400 hover:text-white text-sm transition-colors">
                  All Collections
                </Link>
              </li>
              <li>
                <Link to="/category/football" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Football Jerseys
                </Link>
              </li>
              <li>
                <Link to="/category/anime" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Anime Merchandise
                </Link>
              </li>
              <li>
                <Link to="/category/pop-culture" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Pop Culture Items
                </Link>
              </li>
              <li>
                <Link to="/trending" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Trending Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-white mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/refunds" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-white mb-4">Get in Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-blue-400" />
                <span className="text-gray-400 text-sm">support@fankick.in</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-blue-400" />
                <span className="text-gray-400 text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span className="text-gray-400 text-sm">Mumbai, India</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="font-medium text-white mb-2">Stay Updated</h4>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                />
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © {currentYear} FanKick. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-1 text-sm text-gray-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span>for true fans</span>
            </div>

            <div className="flex space-x-6">
              <Link to="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
                Terms
              </Link>
              <Link to="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
                Privacy
              </Link>
              <Link to="/refunds" className="text-sm text-gray-400 hover:text-white transition-colors">
                Refunds
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
