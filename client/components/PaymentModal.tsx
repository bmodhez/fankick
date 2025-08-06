import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useAuth } from "@/contexts/AuthContext";
import {
  getAvailablePaymentMethods,
  formatOrderId,
  generateTrackingNumber,
} from "@/utils/payments";
import { formatPrice } from "@/utils/currency";
import {
  X,
  CreditCard,
  Smartphone,
  Banknote,
  Globe,
  Shield,
  CheckCircle,
  Clock,
  User,
  ArrowRight,
} from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  currency: string;
  items?: any[];
  product?: {
    name: string;
    image: string;
    price: number;
    quantity: number;
  };
  shippingCost?: number;
  codAvailable?: boolean;
}

export function PaymentModal({
  isOpen,
  onClose,
  amount,
  currency,
  items = [],
  product,
  shippingCost = 0,
  codAvailable = false,
}: PaymentModalProps) {
  const { user } = useAuth();
  const { selectedCurrency } = useCurrency();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedPayment, setSelectedPayment] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderDetails, setOrderDetails] = useState<any>(null);

  // Safety check for currency
  if (!selectedCurrency || !selectedCurrency.code) {
    console.warn(
      "PaymentModal: selectedCurrency is invalid:",
      selectedCurrency,
    );
    return null;
  }

  const country = selectedCurrency.code === "INR" ? "IN" : "US";
  const paymentMethods = getAvailablePaymentMethods(country);

  // Debug logging for product image
  if (product) {
    console.log("PaymentModal product data:", product);
    console.log("Product image URL:", product.image);
    console.log("Product name:", product.name);
    console.log("Image exists check:", !!product.image);
  }

  const subtotal = product ? product.price * product.quantity : amount;
  const total = subtotal + (shippingCost || 0);

  if (!isOpen) return null;

  const handleLoginRedirect = () => {
    // Store the current product data temporarily for after login
    if (product) {
      sessionStorage.setItem(
        "pendingCheckoutProduct",
        JSON.stringify({
          product,
          amount,
          shippingCost,
          codAvailable,
        }),
      );
    }

    // Close the modal first
    onClose();

    // Navigate to login with current page as return destination
    navigate("/login", {
      state: {
        from: location,
        returnToPurchase: true,
      },
    });
  };

  const handlePayment = async () => {
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const orderId = formatOrderId(Date.now());
    const trackingNumber = generateTrackingNumber();

    setOrderDetails({
      orderId,
      trackingNumber,
      estimatedDelivery: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000,
      ).toLocaleDateString(),
    });

    setIsProcessing(false);
    setOrderComplete(true);
  };

  const handleRazorpayPayment = () => {
    if (typeof window !== "undefined" && (window as any).Razorpay) {
      const options = {
        key: "rzp_test_9999999999", // Demo key
        amount: Math.round(total * 100), // Amount in paise
        currency: "INR",
        name: "FanKick",
        description: product?.name || "FanKick Purchase",
        image: "/placeholder.svg",
        handler: (response: any) => {
          console.log("Payment successful:", response);
          handlePayment();
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#00ff7f",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } else {
      // Fallback to simulated payment
      handlePayment();
    }
  };

  if (orderComplete) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-600">
              Order Confirmed!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-mono font-bold">
                  {orderDetails.orderId}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tracking:</span>
                <span className="font-mono font-bold">
                  {orderDetails.trackingNumber}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Delivery:</span>
                <span className="font-medium">
                  {orderDetails.estimatedDelivery}
                </span>
              </div>
            </div>

            <div className="text-center text-sm text-gray-600">
              You'll receive email updates about your order status
            </div>

            <div className="flex space-x-3">
              <Button variant="outline" className="flex-1" onClick={onClose}>
                Continue Shopping
              </Button>
              <Button className="flex-1 bg-primary text-black">
                Track Order
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
            Quick Checkout
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Login Required Notice */}
          {!user && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center mx-auto mb-3">
                <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-blue-800 dark:text-blue-300 font-semibold text-lg mb-2">
                Login Required
              </div>
              <p className="text-blue-700 dark:text-blue-400 text-sm mb-4">
                Please sign in to your account to complete this purchase
                securely. Your items will be saved.
              </p>
              <Button
                className="bg-primary text-black hover:bg-primary/90 font-semibold px-6 py-2"
                onClick={handleLoginRedirect}
              >
                <User className="w-4 h-4 mr-2" />
                Login to Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-3">
                Don't have an account? You'll be able to create one after
                clicking login.
              </p>
            </div>
          )}

          {/* Order Summary */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">
              Order Summary
            </h3>
            {product && (
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded border border-gray-200 dark:border-gray-600"
                  onLoad={() => {
                    console.log("Image loaded successfully:", product.image);
                  }}
                  onError={(e) => {
                    console.log("Image failed to load:", product.image);
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg";
                  }}
                />
                <div className="flex-1">
                  <h4 className="font-medium text-sm text-gray-900 dark:text-white">
                    {product.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Quantity: {product.quantity}
                  </p>
                </div>
                <span className="font-bold text-gray-900 dark:text-white">
                  {formatPrice(
                    product.price * product.quantity,
                    selectedCurrency,
                  )}
                </span>
              </div>
            )}
            {!product && items.length > 0 && (
              <div className="space-y-3 mb-4">
                {items.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded border border-gray-200 dark:border-gray-600"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.svg";
                      }}
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-gray-900 dark:text-white">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <span className="font-bold text-sm text-gray-900 dark:text-white">
                      {formatPrice(
                        item.price * item.quantity,
                        selectedCurrency,
                      )}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-2 text-sm border-t border-gray-200 dark:border-gray-600 pt-3">
              <div className="flex justify-between text-gray-900 dark:text-white">
                <span>Subtotal:</span>
                <span>{formatPrice(subtotal, selectedCurrency)}</span>
              </div>
              <div className="flex justify-between text-gray-900 dark:text-white">
                <span>Shipping:</span>
                <span>
                  {shippingCost === 0
                    ? "FREE"
                    : formatPrice(shippingCost, selectedCurrency)}
                </span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t border-gray-200 dark:border-gray-600 pt-2 text-gray-900 dark:text-white">
                <span>Total:</span>
                <span>{formatPrice(total, selectedCurrency)}</span>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">
              Choose Payment Method
            </h3>
            <div className="space-y-3">
              {/* COD Option */}
              {codAvailable && (
                <div
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedPayment === "cod"
                      ? "border-primary bg-primary/5 dark:bg-primary/10"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                  onClick={() => setSelectedPayment("cod")}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <Banknote className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Cash on Delivery
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Pay when your order arrives
                      </p>
                    </div>
                    <Badge className="ml-auto bg-green-100 text-green-800">
                      Popular
                    </Badge>
                  </div>
                </div>
              )}

              {/* Razorpay for India */}
              {selectedCurrency.code === "INR" && (
                <div
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedPayment === "razorpay"
                      ? "border-primary bg-primary/5 dark:bg-primary/10"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                  onClick={() => setSelectedPayment("razorpay")}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <Smartphone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Razorpay
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        UPI, Cards, Net Banking, Wallets
                      </p>
                    </div>
                    <Badge className="ml-auto bg-blue-100 text-blue-800">
                      Instant
                    </Badge>
                  </div>
                </div>
              )}

              {/* Global Payment Methods */}
              {selectedCurrency.code !== "INR" && (
                <>
                  <div
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedPayment === "stripe"
                        ? "border-primary bg-primary/5"
                        : "border-gray-300"
                    }`}
                    onClick={() => setSelectedPayment("stripe")}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Credit/Debit Cards</h4>
                        <p className="text-sm text-gray-600">
                          Visa, Mastercard, Amex
                        </p>
                      </div>
                      <Badge className="ml-auto bg-purple-100 text-purple-800">
                        Secure
                      </Badge>
                    </div>
                  </div>

                  <div
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedPayment === "paypal"
                        ? "border-primary bg-primary/5"
                        : "border-gray-300"
                    }`}
                    onClick={() => setSelectedPayment("paypal")}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Globe className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">PayPal</h4>
                        <p className="text-sm text-gray-600">
                          Secure global payments
                        </p>
                      </div>
                      <Badge className="ml-auto bg-yellow-100 text-yellow-800">
                        Global
                      </Badge>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-blue-50 rounded-lg p-4 flex items-center space-x-3">
            <Shield className="w-5 h-5 text-blue-600" />
            <div className="text-sm">
              <p className="font-medium text-blue-900">Secure Payment</p>
              <p className="text-blue-700">
                Your payment information is encrypted and secure
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button
              className="flex-1 bg-primary text-black hover:bg-primary/90"
              onClick={
                selectedPayment === "razorpay"
                  ? handleRazorpayPayment
                  : handlePayment
              }
              disabled={!selectedPayment || isProcessing || !user}
            >
              {isProcessing ? (
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : (
                `Pay ${formatPrice(total, selectedCurrency)}`
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
