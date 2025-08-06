import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useAuth } from "@/contexts/AuthContext";
import { convertPrice, formatPrice } from "@/utils/currency";
import { SimpleNav } from "@/components/SimpleNav";
import {
  ChevronLeft,
  MapPin,
  CreditCard,
  Truck,
  ShieldCheck,
  CheckCircle,
  Clock,
  Gift,
  Star,
  Lock
} from "lucide-react";

export default function Checkout() {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const { selectedCurrency } = useCurrency();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // State management
  const [activeStep, setActiveStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("new");
  const [selectedPayment, setSelectedPayment] = useState("card");

  // Form states
  const [shippingForm, setShippingForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India"
  });

  const [paymentForm, setPaymentForm] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    upiId: ""
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login', {
        state: { from: location },
        replace: true
      });
    }
  }, [user, navigate, location]);

  // Show loading or redirect if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  // Price calculations
  const convertedTotal = convertPrice(totalPrice, selectedCurrency.code, "INR");
  const freeShippingThreshold = convertPrice(4200, selectedCurrency.code, "INR");
  const shippingCost = convertedTotal >= freeShippingThreshold ? 0 : convertPrice(420, selectedCurrency.code, "INR");
  const tax = Math.round(convertedTotal * 0.18); // 18% GST
  const finalTotal = convertedTotal + shippingCost + tax;

  // Redirect if cart is empty
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <SimpleNav />
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Your cart is empty
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Add some items to your cart to proceed with checkout
            </p>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const steps = [
    { id: 1, name: "Shipping", completed: activeStep > 1 },
    { id: 2, name: "Payment", completed: activeStep > 2 },
    { id: 3, name: "Review", completed: false }
  ];

  const handleStepNext = () => {
    if (activeStep < 3) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleStepBack = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Clear cart and redirect
    clearCart();
    navigate("/order-success");
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SimpleNav />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-primary mb-4"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Continue Shopping
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Checkout
          </h1>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step.completed
                        ? "bg-green-500 text-white"
                        : activeStep === step.id
                        ? "bg-primary text-black"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {step.completed ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <span
                    className={`ml-2 text-sm font-medium ${
                      activeStep === step.id
                        ? "text-gray-900 dark:text-white"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700 mx-4" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Shipping Address */}
            {activeStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-primary" />
                    Delivery Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Saved Addresses */}
                  <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                        <RadioGroupItem value="saved" id="saved" className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor="saved" className="cursor-pointer">
                            <div className="font-medium">John Doe</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              123 Main Street, Apartment 4B<br />
                              New York, NY 10001<br />
                              Phone: +1 (555) 123-4567
                            </div>
                          </Label>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                        <RadioGroupItem value="new" id="new" className="mt-1" />
                        <Label htmlFor="new" className="cursor-pointer font-medium">
                          Add new address
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>

                  {/* New Address Form */}
                  {selectedAddress === "new" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={shippingForm.firstName}
                          onChange={(e) => setShippingForm(prev => ({ ...prev, firstName: e.target.value }))}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={shippingForm.lastName}
                          onChange={(e) => setShippingForm(prev => ({ ...prev, lastName: e.target.value }))}
                          className="mt-1"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={shippingForm.email}
                          onChange={(e) => setShippingForm(prev => ({ ...prev, email: e.target.value }))}
                          className="mt-1"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={shippingForm.phone}
                          onChange={(e) => setShippingForm(prev => ({ ...prev, phone: e.target.value }))}
                          className="mt-1"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="address">Street Address *</Label>
                        <Input
                          id="address"
                          value={shippingForm.address}
                          onChange={(e) => setShippingForm(prev => ({ ...prev, address: e.target.value }))}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          value={shippingForm.city}
                          onChange={(e) => setShippingForm(prev => ({ ...prev, city: e.target.value }))}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State *</Label>
                        <Input
                          id="state"
                          value={shippingForm.state}
                          onChange={(e) => setShippingForm(prev => ({ ...prev, state: e.target.value }))}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="zipCode">ZIP Code *</Label>
                        <Input
                          id="zipCode"
                          value={shippingForm.zipCode}
                          onChange={(e) => setShippingForm(prev => ({ ...prev, zipCode: e.target.value }))}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end">
                    <Button onClick={handleStepNext} className="bg-primary text-black hover:bg-primary/90">
                      Continue to Payment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Payment Method */}
            {activeStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 text-primary" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment}>
                    <div className="space-y-4">
                      {/* Credit/Debit Card */}
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center space-x-3 mb-4">
                          <RadioGroupItem value="card" id="card" />
                          <Label htmlFor="card" className="cursor-pointer font-medium">
                            Credit/Debit Card
                          </Label>
                          <div className="flex space-x-2">
                            <img src="/api/placeholder/40/25" alt="Visa" className="h-6" />
                            <img src="/api/placeholder/40/25" alt="Mastercard" className="h-6" />
                            <img src="/api/placeholder/40/25" alt="American Express" className="h-6" />
                          </div>
                        </div>
                        
                        {selectedPayment === "card" && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                              <Label htmlFor="cardNumber">Card Number *</Label>
                              <Input
                                id="cardNumber"
                                placeholder="1234 5678 9012 3456"
                                value={paymentForm.cardNumber}
                                onChange={(e) => setPaymentForm(prev => ({ ...prev, cardNumber: e.target.value }))}
                                className="mt-1"
                              />
                            </div>
                            <div className="md:col-span-2">
                              <Label htmlFor="cardholderName">Cardholder Name *</Label>
                              <Input
                                id="cardholderName"
                                placeholder="John Doe"
                                value={paymentForm.cardholderName}
                                onChange={(e) => setPaymentForm(prev => ({ ...prev, cardholderName: e.target.value }))}
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label htmlFor="expiryDate">Expiry Date *</Label>
                              <Input
                                id="expiryDate"
                                placeholder="MM/YY"
                                value={paymentForm.expiryDate}
                                onChange={(e) => setPaymentForm(prev => ({ ...prev, expiryDate: e.target.value }))}
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label htmlFor="cvv">CVV *</Label>
                              <Input
                                id="cvv"
                                placeholder="123"
                                value={paymentForm.cvv}
                                onChange={(e) => setPaymentForm(prev => ({ ...prev, cvv: e.target.value }))}
                                className="mt-1"
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* UPI */}
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center space-x-3 mb-4">
                          <RadioGroupItem value="upi" id="upi" />
                          <Label htmlFor="upi" className="cursor-pointer font-medium">
                            UPI Payment
                          </Label>
                          <div className="flex space-x-2">
                            <img src="/api/placeholder/40/25" alt="Google Pay" className="h-6" />
                            <img src="/api/placeholder/40/25" alt="PhonePe" className="h-6" />
                            <img src="/api/placeholder/40/25" alt="Paytm" className="h-6" />
                          </div>
                        </div>
                        
                        {selectedPayment === "upi" && (
                          <div>
                            <Label htmlFor="upiId">UPI ID *</Label>
                            <Input
                              id="upiId"
                              placeholder="yourname@upi"
                              value={paymentForm.upiId}
                              onChange={(e) => setPaymentForm(prev => ({ ...prev, upiId: e.target.value }))}
                              className="mt-1"
                            />
                          </div>
                        )}
                      </div>

                      {/* Cash on Delivery */}
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="cod" id="cod" />
                          <Label htmlFor="cod" className="cursor-pointer font-medium">
                            Cash on Delivery
                          </Label>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            Available
                          </span>
                        </div>
                      </div>
                    </div>
                  </RadioGroup>

                  <div className="flex items-center justify-between">
                    <Button variant="outline" onClick={handleStepBack}>
                      Back to Shipping
                    </Button>
                    <Button onClick={handleStepNext} className="bg-primary text-black hover:bg-primary/90">
                      Review Order
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Order Review */}
            {activeStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>Review Your Order</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Order Items */}
                  <div className="space-y-4">
                    {items.map((item) => {
                      const convertedPrice = convertPrice(item.variant.price, selectedCurrency.code, "INR");
                      return (
                        <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {item.product.name}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {item.variant.size && `Size: ${item.variant.size}`}
                              {item.variant.color && ` • Color: ${item.variant.color}`}
                            </p>
                            <p className="text-sm font-medium">
                              Qty: {item.quantity} × {formatPrice(convertedPrice, selectedCurrency)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-primary">
                              {formatPrice(convertedPrice * item.quantity, selectedCurrency)}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <Separator />

                  {/* Delivery & Payment Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">Delivery Address</h4>
                      <div className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                        John Doe<br />
                        123 Main Street, Apartment 4B<br />
                        New York, NY 10001<br />
                        Phone: +1 (555) 123-4567
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Payment Method</h4>
                      <div className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                        {selectedPayment === "card" && "Credit/Debit Card"}
                        {selectedPayment === "upi" && "UPI Payment"}
                        {selectedPayment === "cod" && "Cash on Delivery"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Button variant="outline" onClick={handleStepBack}>
                      Back to Payment
                    </Button>
                    <Button 
                      onClick={handlePlaceOrder} 
                      disabled={isProcessing}
                      className="bg-primary text-black hover:bg-primary/90"
                    >
                      {isProcessing ? (
                        <div className="flex items-center">
                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                          Processing...
                        </div>
                      ) : (
                        <>
                          <Lock className="w-4 h-4 mr-2" />
                          Place Order
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Quick Items Preview */}
                <div className="space-y-2">
                  {items.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex items-center space-x-2 text-sm">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <div className="flex-1 truncate">
                        <p className="truncate">{item.product.name}</p>
                        <p className="text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                  {items.length > 3 && (
                    <p className="text-sm text-gray-500">
                      +{items.length - 3} more items
                    </p>
                  )}
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal ({totalItems} items)</span>
                    <span>{formatPrice(convertedTotal, selectedCurrency)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className={shippingCost === 0 ? "text-green-600" : ""}>
                      {shippingCost === 0 ? "FREE" : formatPrice(shippingCost, selectedCurrency)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (GST)</span>
                    <span>{formatPrice(tax, selectedCurrency)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-primary">{formatPrice(finalTotal, selectedCurrency)}</span>
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-green-600">
                    <Truck className="w-4 h-4" />
                    <span>Free delivery on orders above {formatPrice(freeShippingThreshold, selectedCurrency)}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-blue-600">
                    <Clock className="w-4 h-4" />
                    <span>Estimated delivery: 3-5 business days</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <ShieldCheck className="w-4 h-4" />
                    <span>100% secure checkout</span>
                  </div>
                </div>

                {/* Trust Signals */}
                <div className="mt-6 pt-4 border-t">
                  <div className="grid grid-cols-2 gap-2 text-xs text-center">
                    <div className="flex flex-col items-center space-y-1">
                      <ShieldCheck className="w-6 h-6 text-green-500" />
                      <span>Secure Payment</span>
                    </div>
                    <div className="flex flex-col items-center space-y-1">
                      <Truck className="w-6 h-6 text-blue-500" />
                      <span>Fast Delivery</span>
                    </div>
                    <div className="flex flex-col items-center space-y-1">
                      <Gift className="w-6 h-6 text-purple-500" />
                      <span>Easy Returns</span>
                    </div>
                    <div className="flex flex-col items-center space-y-1">
                      <Star className="w-6 h-6 text-yellow-500" />
                      <span>5-Star Support</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
