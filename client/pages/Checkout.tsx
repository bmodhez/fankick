import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
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
  Lock,
  User,
  Mail,
  Phone,
  Home,
  Zap,
  Heart,
  Crown,
  Sparkles,
  Timer,
  Calculator,
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
  const [selectedPayment, setSelectedPayment] = useState(
    location.state?.paymentMethod || "card"
  );

  // Form states with user data pre-filled
  const [shippingForm, setShippingForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
  });

  const [paymentForm, setPaymentForm] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: user?.firstName ? `${user.firstName} ${user.lastName || ''}` : "",
    upiId: "",
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/login", {
        state: {
          from: location,
          message: "Please login to proceed with checkout"
        },
        replace: true,
      });
    }
  }, [user, navigate, location]);

  // Update form when user data changes
  useEffect(() => {
    if (user) {
      setShippingForm(prev => ({
        ...prev,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
      }));
      setPaymentForm(prev => ({
        ...prev,
        cardholderName: user.firstName ? `${user.firstName} ${user.lastName || ''}` : "",
      }));
    }
  }, [user]);

  // Show loading or redirect if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-xl font-semibold text-white mb-2">Securing Your Session</h2>
          <p className="text-gray-400">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  // Price calculations with enhanced display
  const convertedTotal = convertPrice(totalPrice, selectedCurrency.code, "INR");
  const freeShippingThreshold = convertPrice(4200, selectedCurrency.code, "INR");
  const shippingCost = convertedTotal >= freeShippingThreshold ? 0 : convertPrice(420, selectedCurrency.code, "INR");
  const tax = Math.round(convertedTotal * 0.18); // 18% GST
  const discount = Math.round(convertedTotal * 0.1); // 10% loyalty discount for logged-in users
  const finalTotal = convertedTotal + shippingCost + tax - discount;

  // Redirect if cart is empty
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <SimpleNav />
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-primary to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Crown className="w-10 h-10 text-black" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">Your cart is empty</h1>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Hey {user.firstName}! Add some amazing products to your cart to continue shopping
            </p>
            <Link
              to="/"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-purple-500 text-black rounded-xl hover:opacity-90 transition-all duration-300 font-bold shadow-2xl shadow-primary/25"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const steps = [
    { id: 1, name: "Shipping", icon: Truck, completed: activeStep > 1 },
    { id: 2, name: "Payment", icon: CreditCard, completed: activeStep > 2 },
    { id: 3, name: "Review", icon: CheckCircle, completed: false },
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

    try {
      // Validate payment details based on selected payment method
      if (selectedPayment === "card") {
        if (!paymentForm.cardNumber || !paymentForm.cardholderName || !paymentForm.expiryDate || !paymentForm.cvv) {
          alert("Please fill in all card details");
          setIsProcessing(false);
          return;
        }

        // Basic card number validation (should be 16 digits)
        const cleanCardNumber = paymentForm.cardNumber.replace(/\s/g, '');
        if (cleanCardNumber.length !== 16 || !/^\d+$/.test(cleanCardNumber)) {
          alert("Please enter a valid 16-digit card number");
          setIsProcessing(false);
          return;
        }

        // Basic CVV validation
        if (!/^\d{3,4}$/.test(paymentForm.cvv)) {
          alert("Please enter a valid CVV (3-4 digits)");
          setIsProcessing(false);
          return;
        }

        // Basic expiry date validation
        const [month, year] = paymentForm.expiryDate.split('/');
        const currentDate = new Date();
        const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
        if (expiryDate <= currentDate) {
          alert("Card has expired. Please use a valid card");
          setIsProcessing(false);
          return;
        }
      } else if (selectedPayment === "upi") {
        if (!paymentForm.upiId) {
          alert("Please enter your UPI ID");
          setIsProcessing(false);
          return;
        }

        // Basic UPI ID validation
        if (!paymentForm.upiId.includes('@') || paymentForm.upiId.length < 6) {
          alert("Please enter a valid UPI ID (e.g., yourname@paytm)");
          setIsProcessing(false);
          return;
        }
      } else if (selectedPayment === "cod") {
        // COD is always valid, but confirm with user
        const confirmCOD = window.confirm("Confirm Cash on Delivery order?");
        if (!confirmCOD) {
          setIsProcessing(false);
          return;
        }
      }

      // Validate shipping details
      if (!shippingForm.firstName || !shippingForm.lastName || !shippingForm.email || !shippingForm.phone || !shippingForm.address || !shippingForm.city || !shippingForm.state || !shippingForm.zipCode) {
        alert("Please fill in all shipping details");
        setIsProcessing(false);
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(shippingForm.email)) {
        alert("Please enter a valid email address");
        setIsProcessing(false);
        return;
      }

      // Phone validation (basic)
      if (!/^\d{10}$/.test(shippingForm.phone.replace(/[^\d]/g, ''))) {
        alert("Please enter a valid 10-digit phone number");
        setIsProcessing(false);
        return;
      }

      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Simulate payment verification (95% success rate for demo)
      const paymentSuccess = Math.random() > 0.05;

      if (!paymentSuccess) {
        alert("Payment failed. Please try again or use a different payment method.");
        setIsProcessing(false);
        return;
      }

      // Clear cart and redirect only after successful payment
      clearCart();
      navigate("/order-success", {
        state: {
          orderDetails: {
            paymentMethod: selectedPayment,
            amount: finalTotal,
            currency: selectedCurrency.code,
            shippingAddress: shippingForm,
            customerName: user.firstName
          }
        }
      });
    } catch (error) {
      console.error("Order processing error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      <SimpleNav />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Enhanced Header with User Greeting */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-sm text-gray-400 hover:text-primary mb-4 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Continue Shopping
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 font-sport">
                Secure Checkout
              </h1>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-black" />
                </div>
                <p className="text-gray-300">
                  Hey <span className="text-primary font-semibold">{user.firstName}</span>! Let's complete your order
                </p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2">
                <ShieldCheck className="w-4 h-4 mr-2" />
                SSL Secured
              </Badge>
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2">
                <Crown className="w-4 h-4 mr-2" />
                VIP Customer
              </Badge>
            </div>
          </div>
        </div>

        {/* Enhanced Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex items-center">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                        step.completed
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/25"
                          : activeStep === step.id
                            ? "bg-gradient-to-r from-primary to-purple-500 text-black shadow-lg shadow-primary/25"
                            : "bg-white/10 text-gray-400 border border-white/20"
                      }`}
                    >
                      {step.completed ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <IconComponent className="w-6 h-6" />
                      )}
                    </div>
                    <div className="ml-3">
                      <span
                        className={`block text-sm font-bold ${
                          activeStep === step.id
                            ? "text-white"
                            : step.completed 
                              ? "text-green-400"
                              : "text-gray-400"
                        }`}
                      >
                        {step.name}
                      </span>
                      <span className="block text-xs text-gray-500">
                        Step {step.id} of 3
                      </span>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-1 mx-6 rounded-full transition-all duration-300 ${
                      step.completed ? "bg-gradient-to-r from-green-500 to-emerald-500" : "bg-white/10"
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Shipping Address */}
            {activeStep === 1 && (
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 shadow-2xl">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center text-white text-xl">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary to-purple-500 rounded-lg flex items-center justify-center mr-3">
                      <MapPin className="w-5 h-5 text-black" />
                    </div>
                    Delivery Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Enhanced Saved Addresses */}
                  <RadioGroup
                    value={selectedAddress}
                    onValueChange={setSelectedAddress}
                  >
                    <div className="space-y-4">
                      <div className="group relative overflow-hidden">
                        <div className="flex items-start space-x-4 p-6 border border-white/10 rounded-xl hover:bg-white/5 cursor-pointer transition-all duration-300 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
                          <RadioGroupItem
                            value="saved"
                            id="saved"
                            className="mt-1 border-white/30"
                          />
                          <div className="flex-1">
                            <Label htmlFor="saved" className="cursor-pointer">
                              <div className="flex items-center space-x-2 mb-2">
                                <div className="font-medium text-white">{user.firstName} {user.lastName}</div>
                                <Badge className="bg-green-500/20 text-green-400 border border-green-500/30">
                                  <Home className="w-3 h-3 mr-1" />
                                  Primary
                                </Badge>
                              </div>
                              <div className="text-sm text-gray-300 leading-relaxed">
                                123 Main Street, Apartment 4B
                                <br />
                                New York, NY 10001
                                <br />
                                Phone: +1 (555) 123-4567
                              </div>
                            </Label>
                          </div>
                          <div className="absolute top-4 right-4">
                            <Sparkles className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      </div>

                      <div className="group relative overflow-hidden">
                        <div className="flex items-start space-x-4 p-6 border border-white/10 rounded-xl hover:bg-white/5 cursor-pointer transition-all duration-300">
                          <RadioGroupItem value="new" id="new" className="mt-1 border-white/30" />
                          <Label htmlFor="new" className="cursor-pointer font-medium text-white flex items-center">
                            <MapPin className="w-4 h-4 mr-2 text-primary" />
                            Add new address
                          </Label>
                          <div className="absolute top-4 right-4">
                            <Sparkles className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </RadioGroup>

                  {/* Enhanced New Address Form */}
                  {selectedAddress === "new" && (
                    <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="firstName" className="text-white font-medium mb-2 flex items-center">
                            <User className="w-4 h-4 mr-2 text-primary" />
                            First Name *
                          </Label>
                          <Input
                            id="firstName"
                            value={shippingForm.firstName}
                            onChange={(e) =>
                              setShippingForm((prev) => ({
                                ...prev,
                                firstName: e.target.value,
                              }))
                            }
                            className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-primary"
                            placeholder="Enter first name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName" className="text-white font-medium mb-2 flex items-center">
                            <User className="w-4 h-4 mr-2 text-primary" />
                            Last Name *
                          </Label>
                          <Input
                            id="lastName"
                            value={shippingForm.lastName}
                            onChange={(e) =>
                              setShippingForm((prev) => ({
                                ...prev,
                                lastName: e.target.value,
                              }))
                            }
                            className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-primary"
                            placeholder="Enter last name"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="email" className="text-white font-medium mb-2 flex items-center">
                            <Mail className="w-4 h-4 mr-2 text-primary" />
                            Email Address *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={shippingForm.email}
                            onChange={(e) =>
                              setShippingForm((prev) => ({
                                ...prev,
                                email: e.target.value,
                              }))
                            }
                            className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-primary"
                            placeholder="Enter email address"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="phone" className="text-white font-medium mb-2 flex items-center">
                            <Phone className="w-4 h-4 mr-2 text-primary" />
                            Phone Number *
                          </Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={shippingForm.phone}
                            onChange={(e) =>
                              setShippingForm((prev) => ({
                                ...prev,
                                phone: e.target.value,
                              }))
                            }
                            className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-primary"
                            placeholder="Enter phone number"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="address" className="text-white font-medium mb-2 flex items-center">
                            <Home className="w-4 h-4 mr-2 text-primary" />
                            Street Address *
                          </Label>
                          <Input
                            id="address"
                            value={shippingForm.address}
                            onChange={(e) =>
                              setShippingForm((prev) => ({
                                ...prev,
                                address: e.target.value,
                              }))
                            }
                            className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-primary"
                            placeholder="Enter street address"
                          />
                        </div>
                        <div>
                          <Label htmlFor="city" className="text-white font-medium mb-2 flex items-center">
                            <MapPin className="w-4 h-4 mr-2 text-primary" />
                            City *
                          </Label>
                          <Input
                            id="city"
                            value={shippingForm.city}
                            onChange={(e) =>
                              setShippingForm((prev) => ({
                                ...prev,
                                city: e.target.value,
                              }))
                            }
                            className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-primary"
                            placeholder="Enter city"
                          />
                        </div>
                        <div>
                          <Label htmlFor="state" className="text-white font-medium mb-2">
                            State *
                          </Label>
                          <Input
                            id="state"
                            value={shippingForm.state}
                            onChange={(e) =>
                              setShippingForm((prev) => ({
                                ...prev,
                                state: e.target.value,
                              }))
                            }
                            className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-primary"
                            placeholder="Enter state"
                          />
                        </div>
                        <div>
                          <Label htmlFor="zipCode" className="text-white font-medium mb-2">
                            ZIP Code *
                          </Label>
                          <Input
                            id="zipCode"
                            value={shippingForm.zipCode}
                            onChange={(e) =>
                              setShippingForm((prev) => ({
                                ...prev,
                                zipCode: e.target.value,
                              }))
                            }
                            className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-primary"
                            placeholder="Enter ZIP code"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end">
                    <Button
                      onClick={handleStepNext}
                      className="bg-gradient-to-r from-primary to-purple-500 text-black hover:opacity-90 font-bold px-8 py-3 shadow-2xl shadow-primary/25"
                    >
                      Continue to Payment
                      <Zap className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Enhanced Payment Method */}
            {activeStep === 2 && (
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 shadow-2xl">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center text-white text-xl">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary to-purple-500 rounded-lg flex items-center justify-center mr-3">
                      <CreditCard className="w-5 h-5 text-black" />
                    </div>
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <RadioGroup
                    value={selectedPayment}
                    onValueChange={setSelectedPayment}
                  >
                    <div className="space-y-4">
                      {/* Enhanced Credit/Debit Card */}
                      <div className="border border-white/10 rounded-xl overflow-hidden bg-gradient-to-br from-blue-500/5 to-purple-500/5">
                        <div className="p-6">
                          <div className="flex items-center space-x-3 mb-4">
                            <RadioGroupItem value="card" id="card" className="border-white/30" />
                            <Label htmlFor="card" className="cursor-pointer font-medium text-white flex items-center">
                              <CreditCard className="w-5 h-5 mr-2 text-primary" />
                              Credit/Debit Card
                            </Label>
                            <Badge className="bg-green-500/20 text-green-400 border border-green-500/30">
                              Most Popular
                            </Badge>
                            <div className="flex space-x-2 ml-auto">
                              <img
                                src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
                                alt="Visa"
                                className="h-6 opacity-80 hover:opacity-100 transition-opacity"
                              />
                              <img
                                src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                                alt="Mastercard"
                                className="h-6 opacity-80 hover:opacity-100 transition-opacity"
                              />
                            </div>
                          </div>

                          {selectedPayment === "card" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white/5 rounded-lg">
                              <div className="md:col-span-2">
                                <Label htmlFor="cardNumber" className="text-white font-medium mb-2">
                                  Card Number *
                                </Label>
                                <Input
                                  id="cardNumber"
                                  placeholder="1234 5678 9012 3456"
                                  value={paymentForm.cardNumber}
                                  onChange={(e) =>
                                    setPaymentForm((prev) => ({
                                      ...prev,
                                      cardNumber: e.target.value,
                                    }))
                                  }
                                  className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-primary"
                                />
                              </div>
                              <div className="md:col-span-2">
                                <Label htmlFor="cardholderName" className="text-white font-medium mb-2">
                                  Cardholder Name *
                                </Label>
                                <Input
                                  id="cardholderName"
                                  placeholder="John Doe"
                                  value={paymentForm.cardholderName}
                                  onChange={(e) =>
                                    setPaymentForm((prev) => ({
                                      ...prev,
                                      cardholderName: e.target.value,
                                    }))
                                  }
                                  className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-primary"
                                />
                              </div>
                              <div>
                                <Label htmlFor="expiryDate" className="text-white font-medium mb-2">
                                  Expiry Date *
                                </Label>
                                <Input
                                  id="expiryDate"
                                  placeholder="MM/YY"
                                  value={paymentForm.expiryDate}
                                  onChange={(e) =>
                                    setPaymentForm((prev) => ({
                                      ...prev,
                                      expiryDate: e.target.value,
                                    }))
                                  }
                                  className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-primary"
                                />
                              </div>
                              <div>
                                <Label htmlFor="cvv" className="text-white font-medium mb-2">
                                  CVV *
                                </Label>
                                <Input
                                  id="cvv"
                                  placeholder="123"
                                  value={paymentForm.cvv}
                                  onChange={(e) =>
                                    setPaymentForm((prev) => ({
                                      ...prev,
                                      cvv: e.target.value,
                                    }))
                                  }
                                  className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-primary"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Enhanced UPI */}
                      <div className="border border-white/10 rounded-xl overflow-hidden">
                        <div className="p-6">
                          <div className="flex items-center space-x-3 mb-4">
                            <RadioGroupItem value="upi" id="upi" className="border-white/30" />
                            <Label htmlFor="upi" className="cursor-pointer font-medium text-white flex items-center">
                              <Zap className="w-5 h-5 mr-2 text-primary" />
                              UPI Payment
                            </Label>
                            <Badge className="bg-purple-500/20 text-purple-400 border border-purple-500/30">
                              Instant
                            </Badge>
                          </div>

                          {selectedPayment === "upi" && (
                            <div className="p-4 bg-white/5 rounded-lg">
                              <Label htmlFor="upiId" className="text-white font-medium mb-2">
                                UPI ID *
                              </Label>
                              <Input
                                id="upiId"
                                placeholder="yourname@upi"
                                value={paymentForm.upiId}
                                onChange={(e) =>
                                  setPaymentForm((prev) => ({
                                    ...prev,
                                    upiId: e.target.value,
                                  }))
                                }
                                className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-primary"
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Enhanced Cash on Delivery */}
                      <div className="border border-white/10 rounded-xl overflow-hidden">
                        <div className="p-6">
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value="cod" id="cod" className="border-white/30" />
                            <Label htmlFor="cod" className="cursor-pointer font-medium text-white flex items-center">
                              <Truck className="w-5 h-5 mr-2 text-primary" />
                              Cash on Delivery
                            </Label>
                            <Badge className="bg-green-500/20 text-green-400 border border-green-500/30">
                              Available
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </RadioGroup>

                  <div className="flex items-center justify-between">
                    <Button 
                      variant="outline" 
                      onClick={handleStepBack}
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      Back to Shipping
                    </Button>
                    <Button
                      onClick={handleStepNext}
                      className="bg-gradient-to-r from-primary to-purple-500 text-black hover:opacity-90 font-bold px-8 py-3 shadow-2xl shadow-primary/25"
                    >
                      Review Order
                      <CheckCircle className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Enhanced Order Review */}
            {activeStep === 3 && (
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 shadow-2xl">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center text-white text-xl">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary to-purple-500 rounded-lg flex items-center justify-center mr-3">
                      <CheckCircle className="w-5 h-5 text-black" />
                    </div>
                    Review Your Order
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Enhanced Order Items */}
                  <div className="space-y-4">
                    {items.map((item) => {
                      const convertedPrice = convertPrice(
                        item.variant.price,
                        selectedCurrency.code,
                        "INR",
                      );
                      return (
                        <div
                          key={item.id}
                          className="flex items-center space-x-4 p-4 bg-gradient-to-r from-white/5 to-white/10 rounded-xl border border-white/10"
                        >
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-white">
                              {item.product.name}
                            </h4>
                            <p className="text-sm text-gray-400">
                              {item.variant.size && `Size: ${item.variant.size}`}
                              {item.variant.color && ` • Color: ${item.variant.color}`}
                            </p>
                            <p className="text-sm font-medium text-gray-300">
                              Qty: {item.quantity} × {formatPrice(convertedPrice, selectedCurrency)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-primary text-lg">
                              {formatPrice(convertedPrice * item.quantity, selectedCurrency)}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <Separator className="bg-white/10" />

                  {/* Enhanced Delivery & Payment Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-4 rounded-xl border border-white/10">
                      <h4 className="font-medium mb-3 text-white flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-primary" />
                        Delivery Address
                      </h4>
                      <div className="text-sm text-gray-300 leading-relaxed">
                        {user.firstName} {user.lastName}
                        <br />
                        123 Main Street, Apartment 4B
                        <br />
                        New York, NY 10001
                        <br />
                        Phone: +1 (555) 123-4567
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 p-4 rounded-xl border border-white/10">
                      <h4 className="font-medium mb-3 text-white flex items-center">
                        <CreditCard className="w-4 h-4 mr-2 text-primary" />
                        Payment Method
                      </h4>
                      <div className="text-sm text-gray-300">
                        {selectedPayment === "card" && "Credit/Debit Card"}
                        {selectedPayment === "upi" && "UPI Payment"}
                        {selectedPayment === "cod" && "Cash on Delivery"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Button 
                      variant="outline" 
                      onClick={handleStepBack}
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      Back to Payment
                    </Button>
                    <Button
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:opacity-90 font-bold px-8 py-3 shadow-2xl shadow-green-500/25"
                    >
                      {isProcessing ? (
                        <div className="flex items-center">
                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                          Processing...
                        </div>
                      ) : (
                        <>
                          <Lock className="w-4 h-4 mr-2" />
                          Place Order Securely
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Enhanced Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 bg-white/5 backdrop-blur-sm border-white/10 shadow-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-white flex items-center">
                  <Calculator className="w-5 h-5 mr-2 text-primary" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Enhanced Items Preview */}
                <div className="space-y-3">
                  {items.slice(0, 3).map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-3 text-sm bg-white/5 p-3 rounded-lg"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="truncate text-white font-medium">{item.product.name}</p>
                        <p className="text-gray-400">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                  {items.length > 3 && (
                    <p className="text-sm text-gray-400 text-center p-2">
                      +{items.length - 3} more items
                    </p>
                  )}
                </div>

                <Separator className="bg-white/10" />

                {/* Enhanced Price Breakdown */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal ({totalItems} items)</span>
                    <span>{formatPrice(convertedTotal, selectedCurrency)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Shipping</span>
                    <span className={shippingCost === 0 ? "text-green-400 font-medium" : ""}>
                      {shippingCost === 0 ? "FREE" : formatPrice(shippingCost, selectedCurrency)}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Tax (GST)</span>
                    <span>{formatPrice(tax, selectedCurrency)}</span>
                  </div>
                  <div className="flex justify-between text-green-400">
                    <span className="flex items-center">
                      <Crown className="w-4 h-4 mr-1" />
                      VIP Discount (10%)
                    </span>
                    <span>-{formatPrice(discount, selectedCurrency)}</span>
                  </div>
                  <Separator className="bg-white/10" />
                  <div className="flex justify-between font-bold text-lg text-white bg-gradient-to-r from-primary/20 to-purple-500/20 p-3 rounded-lg">
                    <span>Total</span>
                    <span className="text-primary">
                      {formatPrice(finalTotal, selectedCurrency)}
                    </span>
                  </div>
                </div>

                {/* Enhanced Delivery Info */}
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <div className="flex items-center space-x-2 text-sm text-green-400">
                    <Truck className="w-4 h-4" />
                    <span>
                      Free delivery on orders above {formatPrice(freeShippingThreshold, selectedCurrency)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-blue-400">
                    <Clock className="w-4 h-4" />
                    <span>Estimated delivery: 3-5 business days</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-purple-400">
                    <ShieldCheck className="w-4 h-4" />
                    <span>100% secure checkout</span>
                  </div>
                </div>

                {/* Enhanced Trust Signals */}
                <div className="pt-4 border-t border-white/10">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="flex flex-col items-center space-y-2 p-3 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20">
                      <ShieldCheck className="w-6 h-6 text-green-400" />
                      <span className="text-green-400 font-medium">Secure Payment</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2 p-3 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-500/20">
                      <Truck className="w-6 h-6 text-blue-400" />
                      <span className="text-blue-400 font-medium">Fast Delivery</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2 p-3 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
                      <Gift className="w-6 h-6 text-purple-400" />
                      <span className="text-purple-400 font-medium">Easy Returns</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2 p-3 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-lg border border-yellow-500/20">
                      <Star className="w-6 h-6 text-yellow-400" />
                      <span className="text-yellow-400 font-medium">5-Star Support</span>
                    </div>
                  </div>
                </div>

                {/* Loyalty Program Preview */}
                <div className="pt-4 border-t border-white/10">
                  <div className="bg-gradient-to-r from-primary/20 to-purple-500/20 p-4 rounded-lg border border-primary/30">
                    <div className="flex items-center space-x-2 mb-2">
                      <Crown className="w-4 h-4 text-primary" />
                      <span className="text-white font-medium text-sm">VIP Benefits Applied</span>
                    </div>
                    <div className="text-xs text-gray-300 space-y-1">
                      <div>• 10% loyalty discount applied</div>
                      <div>• Free premium shipping</div>
                      <div>• Priority customer support</div>
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
