import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { convertPrice, formatPrice } from "@/utils/currency";
import { PaymentModal } from "@/components/PaymentModal";
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
  const [showPaymentModal, setShowPaymentModal] = useState(false);
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
      alert(`🎉 Coupon applied! You saved ${coupon.discount}%`);
    } else {
      alert("❌ Invalid coupon code. Try: WELCOME10, SAVE20, or FANKICK15");
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    setShowPaymentModal(true);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-[60]"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-gradient-to-b from-gray-900 to-gray-800 z-[61] shadow-2xl border-l border-gray-600 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-600 bg-gradient-to-r from-primary/10 to-purple-500/10">
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
        <div className="flex-1 overflow-y-auto p-4">
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
            <div className="space-y-4">
              {items.map((item) => {
                const convertedPrice = convertPrice(
                  item.variant.price,
                  selectedCurrency.code,
                  "INR"
                );

                return (
                  <div key={item.id} className="bg-gray-800/50 rounded-xl p-4 border border-gray-600 hover:border-primary/30 transition-all shadow-lg">
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
                      <div className="flex-1 space-y-2">
                        <h4 className="font-medium text-white text-sm line-clamp-2">
                          {item.product.name}
                        </h4>
                        
                        {/* Variant Info */}
                        <div className="flex items-center space-x-2 text-xs text-gray-400">
                          {item.variant.size && (
                            <span>Size: {item.variant.size}</span>
                          )}
                          {item.variant.color && (
                            <span>• Color: {item.variant.color}</span>
                          )}
                        </div>
                        
                        {/* Price */}
                        <p className="font-semibold text-primary">
                          {formatPrice(convertedPrice, selectedCurrency)}
                        </p>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center space-x-1 bg-gray-700 rounded-lg p-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 p-0 hover:bg-gray-600 text-gray-300"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="text-white font-bold w-10 text-center bg-gray-600 rounded px-2 py-1">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 p-0 hover:bg-gray-600 text-gray-300"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="w-4 h-4" />
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
                  className="w-full border-gray-600 text-gray-400 hover:text-white"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear Cart
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Cart Summary */}
        {items.length > 0 && (
          <div className="border-t border-gray-700 p-4 space-y-4">
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
            <div className="space-y-3 text-sm bg-gray-700/30 rounded-xl p-4 border border-gray-600">
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
              
              <div className="border-t border-gray-600 pt-2 flex justify-between font-semibold text-white">
                <span>Total</span>
                <span className="text-primary">
                  {formatPrice(finalTotal, selectedCurrency)}
                </span>
              </div>
            </div>

            {/* Free Shipping Message */}
            {shippingCost > 0 && (
              <div className="bg-blue-500/20 border border-blue-500 rounded p-2 text-blue-400 text-sm">
                <Truck className="w-4 h-4 inline mr-2" />
                Add {formatPrice(freeShippingThreshold - convertedTotal, selectedCurrency)} more for FREE shipping!
              </div>
            )}

            {/* Security & Benefits */}
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
              <div className="flex items-center">
                <ShieldCheck className="w-3 h-3 mr-1 text-green-400" />
                Secure checkout
              </div>
              <div className="flex items-center">
                <Gift className="w-3 h-3 mr-1 text-purple-400" />
                Gift wrapping
              </div>
            </div>

            {/* Checkout Button */}
            <Button
              onClick={handleCheckout}
              className="w-full bg-gradient-to-r from-primary to-green-400 text-black hover:from-primary/90 hover:to-green-400/90 font-bold py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all"
            >
              <CreditCard className="w-5 h-5 mr-2" />
              Proceed to Checkout • {formatPrice(finalTotal, selectedCurrency)}
            </Button>
            
            <p className="text-xs text-gray-500 text-center">
              Secure checkout powered by multiple payment methods
            </p>
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
