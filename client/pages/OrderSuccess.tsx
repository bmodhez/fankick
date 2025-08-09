import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { CheckCircle, Home, Package, Star } from "lucide-react";

export default function OrderSuccess() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SimpleNav />
      
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Order Placed Successfully! 🎉
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Thank you for your purchase! Your order has been received and is being processed.
          </p>

          {/* Order Details */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500 dark:text-gray-400">Order Number</p>
                <p className="font-bold text-gray-900 dark:text-white">#FK{Date.now().toString().slice(-6)}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">Estimated Delivery</p>
                <p className="font-bold text-gray-900 dark:text-white">3-5 Business Days</p>
              </div>
            </div>
          </div>

          {/* What's Next */}
          <div className="text-left mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              What happens next?
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400">1</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  We'll send you an order confirmation email shortly
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-yellow-600 dark:text-yellow-400">2</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Your order will be packed and shipped within 24 hours
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-green-600 dark:text-green-400">3</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  You'll receive tracking information once your order ships
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-black font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Home className="w-4 h-4 mr-2" />
              Continue Shopping
            </Link>
            
            <Link
              to="/profile"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Package className="w-4 h-4 mr-2" />
              Track Order
            </Link>
          </div>

          {/* Customer Satisfaction */}
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center space-x-2 text-yellow-500 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              We hope you love your purchase! Rate your experience with us.
            </p>
          </div>

          {/* Support */}
          <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            <p>
              Need help? Contact our{" "}
              <Link to="/contact" className="text-primary hover:underline">
                customer support
              </Link>{" "}
              team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
