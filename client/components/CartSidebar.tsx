import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { convertPrice, formatPrice } from "@/utils/currency";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  CreditCard,
  Truck,
  ShieldCheck,
  Gift,
} from "lucide-react";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
  const { selectedCurrency } = useCurrency();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);

  if (!isOpen) return null;

  const convertedTotal = convertPrice(totalPrice, selectedCurrency.code, "INR");
  // Set free shipping threshold based on currency (4200 INR = ~50 USD equivalent)
  const freeShippingThreshold = convertPrice(4200, selectedCurrency.code, "INR");
  const shippingCost = convertedTotal >= freeShippingThreshold ? 0 : convertPrice(420, selectedCurrency.code, "INR"); // 420 INR = ~5 USD
  const discount = appliedCoupon ? (convertedTotal * appliedCoupon.discount) / 100 : 0;
  const finalTotal = convertedTotal + shippingCost - discount;

  const applyCoupon = () => {
    const validCoupons = {
      "WELCOME10": { discount: 10, description: "10% off for new customers" },
      "SAVE20": { discount: 20, description: "20% off on orders above $100" },
      "FANKICK15": { discount: 15, description: "15% off sitewide" },
    };

    const coupon = validCoupons[couponCode.toUpperCase() as keyof typeof validCoupons];
    if (coupon) {
      setAppliedCoupon({ code: couponCode.toUpperCase(), discount: coupon.discount });
      setCouponCode("");
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      return;
    }
    onClose(); // Close the cart sidebar
    navigate('/checkout'); // Navigate to checkout page
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-[60]"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-lg bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 z-[61] shadow-2xl border-l-2 border-primary/20 flex flex-col backdrop-blur-sm transform transition-transform duration-300 ease-out animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-2 border-gray-600/50 bg-gradient-to-r from-primary/15 via-purple-500/10 to-blue-500/15 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/20 rounded-full">
              <ShoppingBag className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                Shopping Cart
              </h2>
              {totalItems > 0 && (
                <p className="text-sm text-gray-300">
                  {totalItems} item{totalItems > 1 ? 's' : ''} in cart
                </p>
              )}
            </div>
            {totalItems > 0 && (
              <Badge className="bg-primary text-black font-bold px-3 py-1">
                {totalItems}
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-white hover:bg-gray-700 rounded-full p-2"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {items.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-12 h-12 text-gray-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Your cart is empty
              </h3>
              <p className="text-gray-400 mb-8 leading-relaxed px-4">
                Add some amazing products to get started with your shopping journey!
              </p>
              <Button
                onClick={onClose}
                className="bg-primary text-black hover:bg-primary/90 px-8 py-3 rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-all"
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
                  "INR"
                );

                return (
                  <div key={item.id} className="bg-gradient-to-r from-gray-800/60 to-gray-700/40 rounded-2xl p-5 border border-gray-600/50 hover:border-primary/40 hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
                    <div className="flex space-x-3">
                      {/* Product Image */}
                      <div className="relative">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-20 h-20 object-cover rounded-xl border-2 border-gray-600"
                        />
                        <div className="absolute -top-2 -left-2 bg-primary text-black text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                          {item.quantity}
                        </div>
                      </div>
                      
                      {/* Product Details */}
                      <div className="flex-1 space-y-3">
                        <h4 className="font-semibold text-white text-base line-clamp-2 leading-tight">
                          {item.product.name}
                        </h4>
                        
                        {/* Variant Info */}
                        <div className="flex items-center gap-3 text-xs">
                          {item.variant.size && (
                            <span className="bg-gray-600/50 px-2 py-1 rounded-full text-gray-300">
                              Size: {item.variant.size}
                            </span>
                          )}
                          {item.variant.color && (
                            <span className="bg-gray-600/50 px-2 py-1 rounded-full text-gray-300">
                              {item.variant.color}
                            </span>
                          )}
                        </div>

                        {/* Price */}
                        <p className="font-bold text-lg text-primary bg-primary/10 px-3 py-1 rounded-lg inline-block">
                          {formatPrice(convertedPrice, selectedCurrency)}
                        </p>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center bg-gray-700/70 rounded-xl p-1 border border-gray-600">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-9 h-9 p-0 hover:bg-primary/20 text-gray-300 hover:text-primary rounded-lg transition-all"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="text-white font-bold w-12 text-center bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-lg mx-1 py-2 border border-primary/30">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-9 h-9 p-0 hover:bg-primary/20 text-gray-300 hover:text-primary rounded-lg transition-all"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl p-2 transition-all transform hover:scale-105"
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
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white"
                />
                <Button
                  onClick={applyCoupon}
                  disabled={!couponCode.trim()}
                  className="bg-primary text-black hover:bg-primary/90"
                >
                  Apply
                </Button>
              </div>
              
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

            {/* Free Shipping Message */}
            {shippingCost > 0 && (
              <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-2 border-blue-400/50 rounded-xl p-4 text-blue-300 text-sm font-medium">
                <div className="flex items-center">
                  <Truck className="w-5 h-5 mr-3 text-blue-400" />
                  <div>
                    <div className="font-semibold">Almost there!</div>
                    <div>Add {formatPrice(freeShippingThreshold - convertedTotal, selectedCurrency)} more for FREE shipping!</div>
                  </div>
                </div>
              </div>
            )}

            {/* Security & Benefits */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-center bg-green-500/10 border border-green-500/30 rounded-lg p-2">
                <ShieldCheck className="w-4 h-4 mr-2 text-green-400" />
                <span className="text-green-300 font-medium">Secure Payment</span>
              </div>
              <div className="flex items-center bg-purple-500/10 border border-purple-500/30 rounded-lg p-2">
                <Gift className="w-4 h-4 mr-2 text-purple-400" />
                <span className="text-purple-300 font-medium">Gift Options</span>
              </div>
            </div>

            {/* Checkout Button */}
            <div className="relative">
              <Button
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-primary via-green-400 to-blue-400 text-black hover:from-primary/90 hover:via-green-400/90 hover:to-blue-400/90 font-bold py-5 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-primary/30"
              >
                <div className="flex items-center justify-center">
                  <CreditCard className="w-6 h-6 mr-3" />
                  <div className="text-center">
                    <div className="text-lg">Proceed to Checkout</div>
                    <div className="text-sm opacity-90">{formatPrice(finalTotal, selectedCurrency)}</div>
                  </div>
                </div>
              </Button>

              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-green-400/20 rounded-2xl blur-xl -z-10"></div>
            </div>
            
            <div className="text-center space-y-2">
              <p className="text-xs text-gray-400 flex items-center justify-center">
                <ShieldCheck className="w-3 h-3 mr-1 text-green-400" />
                256-bit SSL encrypted • Multiple payment options
              </p>
              <div className="flex justify-center space-x-4 text-xs text-gray-500">
                <span>💳 Card</span>
                <span>📱 UPI</span>
                <span>🏦 NetBanking</span>
                <span>💰 COD</span>
              </div>
            </div>
          </div>
        )}
      </div>

    </>
  );
}
