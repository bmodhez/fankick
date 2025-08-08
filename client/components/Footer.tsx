import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useCurrency } from "@/contexts/CurrencyContext";
import {
  Instagram,
  Twitter,
  Facebook,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export function Footer() {
  const { selectedCurrency } = useCurrency();
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-8 sm:py-12 lg:py-16 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand Section */}
          <div className="col-span-2 md:col-span-1 space-y-3 sm:space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-lg">⚽</span>
              </div>
              <span className="font-sport font-bold text-xl tracking-wide">
                FAN<span className="text-primary">KICK</span>
              </span>
            </Link>
            <p className="text-gray-300 text-xs sm:text-sm max-w-xs">
              Your ultimate destination for authentic football merchandise from
              legendary players and iconic clubs worldwide.
            </p>
            <div className="flex space-x-2 sm:space-x-3">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-300 hover:text-primary p-2"
              >
                <Instagram className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-300 hover:text-primary p-2"
              >
                <Twitter className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-300 hover:text-primary p-2"
              >
                <Facebook className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-base sm:text-lg mb-3 sm:mb-4">
              Shop
            </h3>
            <ul className="space-y-1.5 sm:space-y-2">
              <li>
                <Link
                  to="/players"
                  className="text-gray-300 hover:text-primary text-xs sm:text-sm block"
                >
                  Player Collections
                </Link>
              </li>
              <li>
                <Link
                  to="/clubs"
                  className="text-gray-300 hover:text-primary text-xs sm:text-sm block"
                >
                  Club Collections
                </Link>
              </li>
              <li>
                <Link
                  to="/accessories"
                  className="text-gray-300 hover:text-primary text-xs sm:text-sm block"
                >
                  Accessories
                </Link>
              </li>
              <li>
                <Link
                  to="/trending"
                  className="text-gray-300 hover:text-primary text-xs sm:text-sm block"
                >
                  Trending Now
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="font-heading font-semibold text-base sm:text-lg mb-3 sm:mb-4">
              Support
            </h3>
            <ul className="space-y-1.5 sm:space-y-2">
              <li>
                <Link
                  to="/shipping"
                  className="text-gray-300 hover:text-primary text-xs sm:text-sm block"
                >
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/refunds"
                  className="text-gray-300 hover:text-primary text-sm"
                >
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-gray-300 hover:text-primary text-sm"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-300 hover:text-primary text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-primary text-sm"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-heading font-semibold text-base sm:text-lg mb-3 sm:mb-4">
              Contact
            </h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-300">
                <Phone className="w-3 sm:w-4 h-3 sm:h-4 text-primary" />
                <span>+91 9322667822</span>
              </div>
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-300">
                <Mail className="w-3 sm:w-4 h-3 sm:h-4 text-primary" />
                <span>support@fankick.com</span>
              </div>
              <div className="flex items-start space-x-2 text-xs sm:text-sm text-gray-300">
                <MapPin className="w-3 sm:w-4 h-3 sm:h-4 text-primary mt-0.5" />
                <span>Mumbai, India</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-4 sm:mt-6">
              <h4 className="font-medium mb-2 text-sm sm:text-base">
                Stay Updated
              </h4>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <input
                  type="email"
                  placeholder="Enter email"
                  className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-800 border border-gray-700 rounded text-xs sm:text-sm focus:outline-none focus:border-primary"
                />
                <Button
                  size="sm"
                  className="bg-primary text-black hover:bg-primary/90 text-xs sm:text-sm px-3 py-1.5 sm:py-2"
                >
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="py-4 sm:py-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 sm:space-y-4 md:space-y-0">
            <div>
              <h4 className="font-medium mb-2 text-sm sm:text-base">
                We Accept
              </h4>
              <div className="flex items-center flex-wrap gap-2 sm:gap-4">
                {selectedCurrency.code === "INR" && (
                  <>
                    <div className="bg-primary rounded px-2 py-1">
                      <span className="text-black text-xs sm:text-sm font-medium">
                        COD
                      </span>
                    </div>
                    <div className="bg-blue-600 rounded px-2 py-1">
                      <span className="text-white text-xs sm:text-sm font-medium">
                        Razorpay
                      </span>
                    </div>
                    <div className="bg-gray-700 rounded px-2 py-1">
                      <span className="text-white text-xs sm:text-sm font-medium">
                        UPI
                      </span>
                    </div>
                  </>
                )}
                {selectedCurrency.code !== "INR" && (
                  <>
                    <div className="bg-blue-600 rounded px-2 py-1">
                      <span className="text-white text-xs sm:text-sm font-medium">
                        PayPal
                      </span>
                    </div>
                    <div className="bg-gray-700 rounded px-2 py-1">
                      <span className="text-white text-xs sm:text-sm font-medium">
                        Stripe
                      </span>
                    </div>
                  </>
                )}
                <div className="bg-gray-700 rounded px-2 py-1">
                  <span className="text-white text-xs sm:text-sm font-medium">
                    Cards
                  </span>
                </div>
              </div>
            </div>

            <div className="text-center md:text-right">
              <p className="text-gray-400 text-xs sm:text-sm">
                © 2024 FanKick. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center md:justify-end gap-2 sm:gap-4 mt-2 text-xs text-gray-500">
                <Link to="/privacy" className="hover:text-primary">
                  Privacy
                </Link>
                <Link to="/terms" className="hover:text-primary">
                  Terms
                </Link>
                <Link to="/shipping" className="hover:text-primary">
                  Shipping
                </Link>
                <Link to="/refunds" className="hover:text-primary">
                  Returns
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
