import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useAuth } from "@/contexts/AuthContext";
import { convertPrice, formatPrice } from "@/utils/currency";
import { PaymentModal } from "@/components/PaymentModal";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ShoppingCart,
  CreditCard,
  Truck,
  ShieldCheck,
  Gift,
  MapPin,
  Zap,
} from "lucide-react";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const {
    items,
    totalItems,
    totalPrice,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();
  const { selectedCurrency } = useCurrency();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discount: number;
  } | null>(null);

  if (!isOpen) return null;

  const convertedTotal = convertPrice(totalPrice, selectedCurrency.code, "INR");
  const freeShippingThreshold = convertPrice(
    4200,
    selectedCurrency.code,
    "INR",
  );
  const shippingCost =
    convertedTotal >= freeShippingThreshold
      ? 0
      : convertPrice(420, selectedCurrency.code, "INR");
  const discount = appliedCoupon
    ? (convertedTotal * appliedCoupon.discount) / 100
    : 0;
  const finalTotal = convertedTotal + shippingCost - discount;

  const applyCoupon = () => {
    const validCoupons = {
      WELCOME10: { discount: 10, description: "10% off for new customers" },
      SAVE20: { discount: 20, description: "20% off on orders above $100" },
      FANKICK15: { discount: 15, description: "15% off sitewide" },
      FK2025: { discount: 10, description: "10% off with FK2025 code" },
    };

    const coupon =
      validCoupons[couponCode.toUpperCase() as keyof typeof validCoupons];
    if (coupon) {
      setAppliedCoupon({
        code: couponCode.toUpperCase(),
        discount: coupon.discount,
      });
      setCouponCode("");
      alert(`🎉 Coupon applied! You saved ${coupon.discount}%`);
    } else if (couponCode.trim()) {
      alert("❌ Invalid coupon code. Try FK2025 for 10% off!");
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      return;
    }

    if (!user) {
      onClose();
      navigate("/login", {
        state: { from: { pathname: "/checkout" } },
      });
      return;
    }

    onClose();
    navigate("/checkout");
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-[60]"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-lg bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 z-[61] shadow-2xl border-l-2 border-primary/30 flex flex-col backdrop-blur-sm transform transition-all duration-500 ease-out animate-slide-in relative overflow-hidden">
        {/* Header */}
        <div className="relative flex items-center justify-between p-6 border-b-2 border-gray-600/30 bg-gradient-to-r from-primary/20 via-purple-500/15 to-blue-500/20 backdrop-blur-md shadow-lg">
          <div className="relative flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-primary/30 to-purple-500/30 rounded-xl border border-primary/40 shadow-lg">
              <ShoppingBag className="w-6 h-6 text-primary drop-shadow-lg" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white drop-shadow-lg">
                Shopping Cart
              </h2>
              {totalItems > 0 && (
                <p className="text-sm text-gray-300">
                  {totalItems} item{totalItems > 1 ? "s" : ""} in cart
                </p>
              )}
            </div>
            {totalItems > 0 && (
              <Badge className="bg-gradient-to-r from-primary to-yellow-400 text-black font-bold px-3 py-1 shadow-lg animate-pulse">
                {totalItems}
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="relative text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-full p-2 transition-all duration-300 hover:scale-110"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="relative flex-1 overflow-y-auto p-6 custom-scrollbar">
          {items.length === 0 ? (
            <div className="text-center py-20 animate-fade-in">
              <div className="relative w-28 h-28 bg-gradient-to-br from-gray-700/50 to-gray-600/30 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-600/50 shadow-xl">
                <ShoppingBag className="w-14 h-14 text-gray-400 animate-bounce" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">
                Your cart is empty
              </h3>
              <p className="text-gray-400 mb-8 leading-relaxed px-4 text-lg">
                Add some amazing products to get started with your shopping
                journey!
              </p>
              <Button
                onClick={onClose}
                className="bg-gradient-to-r from-primary to-yellow-400 text-black hover:from-primary/90 hover:to-yellow-400/90 px-10 py-4 rounded-xl font-semibold shadow-xl transform hover:scale-105 transition-all duration-300 border border-primary/30"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => {
                const convertedPrice = convertPrice(
                  item.variant.price,
                  selectedCurrency.code,
                  "INR",
                );

                return (
                  <div
                    key={item.id}
                    className="relative bg-gradient-to-r from-gray-800/80 to-gray-700/60 rounded-2xl p-5 border border-gray-600/50 hover:border-primary/60 hover:shadow-2xl transition-all duration-300 backdrop-blur-md group overflow-hidden"
                  >
                    <div className="relative flex space-x-4">
                      {/* Product Image */}
                      <div className="relative group">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-20 h-20 object-cover rounded-xl border-2 border-gray-600/70 group-hover:border-primary/50 transition-all duration-300 shadow-lg"
                        />
                        <div className="absolute -top-2 -left-2 bg-gradient-to-r from-primary to-yellow-400 text-black text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center shadow-lg border-2 border-white/20 animate-pulse">
                          {item.quantity}
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="relative flex-1 space-y-3">
                        <h4 className="font-semibold text-white text-base line-clamp-2 leading-tight group-hover:text-primary transition-colors duration-300">
                          {item.product.name}
                        </h4>

                        {/* Variant Info */}
                        <div className="flex items-center gap-3 text-xs">
                          {item.variant.size && (
                            <span className="bg-gradient-to-r from-gray-600/60 to-gray-500/40 px-3 py-1.5 rounded-full text-gray-300 border border-gray-500/30 shadow-sm">
                              Size: {item.variant.size}
                            </span>
                          )}
                          {item.variant.color && (
                            <span className="bg-gradient-to-r from-gray-600/60 to-gray-500/40 px-3 py-1.5 rounded-full text-gray-300 border border-gray-500/30 shadow-sm">
                              {item.variant.color}
                            </span>
                          )}
                        </div>

                        {/* Price */}
                        <p className="font-bold text-lg text-primary bg-gradient-to-r from-primary/15 to-yellow-400/15 px-4 py-2 rounded-xl inline-block border border-primary/30 shadow-lg">
                          {formatPrice(convertedPrice, selectedCurrency)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center bg-gradient-to-r from-gray-700/80 to-gray-600/60 rounded-xl p-1 border border-gray-500/50 shadow-lg backdrop-blur-sm">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="w-10 h-10 p-0 hover:bg-primary/30 text-gray-300 hover:text-primary rounded-lg transition-all duration-300 hover:scale-110"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="text-white font-bold w-14 text-center bg-gradient-to-r from-primary/25 to-purple-500/25 rounded-lg mx-1 py-2.5 border border-primary/40 shadow-inner text-lg">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="w-10 h-10 p-0 hover:bg-primary/30 text-gray-300 hover:text-primary rounded-lg transition-all duration-300 hover:scale-110"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-400 hover:bg-red-500/20 rounded-xl p-3 transition-all transform hover:scale-110 duration-300 shadow-lg border border-transparent hover:border-red-400/30"
                          >
                            <Trash2 className="w-5 h-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Clear Cart */}
              {items.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (confirm("Are you sure you want to clear your cart?")) {
                      clearCart();
                    }
                  }}
                  className="w-full border-2 border-red-500/30 text-red-400 hover:text-white hover:bg-red-500/20 hover:border-red-400 rounded-xl py-3 transition-all font-medium"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All Items
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Cart Summary */}
        {items.length > 0 && (
          <div className="border-t border-gray-600 p-6 space-y-5 bg-gradient-to-t from-gray-800 to-gray-800/50">
            {/* Coupon Code */}
            <div className="space-y-2">
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter coupon code (Try FK2025)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && couponCode.trim() && applyCoupon()}
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                />
                <Button
                  onClick={applyCoupon}
                  disabled={!couponCode.trim()}
                  className="bg-primary text-black hover:bg-primary/90"
                >
                  Apply
                </Button>
              </div>
              {!appliedCoupon && (
                <div className="text-xs text-gray-400 flex items-center space-x-1">
                  <span>💡</span>
                  <span>Use code <strong className="text-primary">FK2025</strong> for 10% off!</span>
                </div>
              )}

              {appliedCoupon && (
                <div className="flex items-center justify-between bg-green-500/20 border border-green-500 rounded p-2">
                  <span className="text-green-400 text-sm">
                    🎉 {appliedCoupon.code} (-{appliedCoupon.discount}%)
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={removeCoupon}
                    className="text-green-400 hover:text-green-300"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-4 text-sm bg-gradient-to-br from-gray-700/40 to-gray-600/30 rounded-2xl p-5 border-2 border-gray-600/50 backdrop-blur-sm">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal ({totalItems} items)</span>
                <span>{formatPrice(convertedTotal, selectedCurrency)}</span>
              </div>

              <div className="flex justify-between text-gray-300">
                <span>Shipping</span>
                <span>
                  {shippingCost === 0 ? (
                    <span className="text-green-400">FREE</span>
                  ) : (
                    formatPrice(shippingCost, selectedCurrency)
                  )}
                </span>
              </div>

              {appliedCoupon && (
                <div className="flex justify-between text-green-400">
                  <span>Discount ({appliedCoupon.discount}%)</span>
                  <span>-{formatPrice(discount, selectedCurrency)}</span>
                </div>
              )}

              <div className="border-t-2 border-gray-600/70 pt-3 flex justify-between font-bold text-lg">
                <span className="text-white">Total Amount</span>
                <span className="text-primary bg-primary/10 px-3 py-1 rounded-lg">
                  {formatPrice(finalTotal, selectedCurrency)}
                </span>
              </div>
            </div>

            {/* Urgency Message */}
            <div className="text-center py-2 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-lg border border-red-500/30 mb-3">
              <p className="text-sm text-red-400 font-semibold">
                🔥 Limited Stock! Complete your purchase now!
              </p>
            </div>

            {/* Buy Now Buttons */}
            <div className="space-y-3">
              {/* Main Buy Button */}
              <Button
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-primary via-green-400 to-blue-400 text-black hover:from-primary/95 hover:via-green-400/95 hover:to-blue-400/95 font-bold py-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-primary/40 relative overflow-hidden animate-pulse"
              >
                <div className="relative flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 mr-3" />
                  <div className="text-center">
                    <div className="text-xl font-extrabold">
                      🛒 BUY NOW / खरीदें
                    </div>
                    <div className="text-sm opacity-90 font-semibold">
                      Total: {formatPrice(finalTotal, selectedCurrency)}
                    </div>
                  </div>
                </div>
              </Button>

              {/* Quick Payment Option */}
              <Button
                onClick={() => setShowPaymentModal(true)}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 font-bold py-4 rounded-xl shadow-lg transition-all duration-300 border border-orange-400"
              >
                <div className="flex items-center justify-center">
                  <Zap className="w-5 h-5 mr-2" />
                  <span>⚡ Quick Pay - {formatPrice(finalTotal, selectedCurrency)}</span>
                </div>
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          amount={finalTotal}
          currency={selectedCurrency}
          items={items}
        />
      )}
    </>
  );
}
