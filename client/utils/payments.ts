export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  description: string;
  countries: string[];
  codSupported: boolean;
}

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "cod",
    name: "Cash on Delivery",
    icon: "💰",
    description: "Pay when your order arrives",
    countries: ["IN", "SA"],
    codSupported: true,
  },
  {
    id: "razorpay",
    name: "Razorpay",
    icon: "🇮🇳",
    description: "UPI, Cards, Net Banking, Wallets",
    countries: ["IN"],
    codSupported: false,
  },
  {
    id: "paypal",
    name: "PayPal",
    icon: "🌐",
    description: "Secure global payments",
    countries: ["US", "CA", "GB", "EU", "DE", "FR", "IT", "ES"],
    codSupported: false,
  },
  {
    id: "stripe",
    name: "Credit/Debit Cards",
    icon: "💳",
    description: "Visa, Mastercard, Amex",
    countries: ["US", "CA", "GB", "EU", "DE", "FR", "IT", "ES", "SA"],
    codSupported: false,
  },
];

export function getAvailablePaymentMethods(country: string): PaymentMethod[] {
  return PAYMENT_METHODS.filter(
    (method) =>
      method.countries.includes(country) || method.countries.includes("ALL"),
  );
}

export function isCODAvailable(country: string): boolean {
  return country === "IN"; // COD only available in India
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: any) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
}

export function initializeRazorpay(options: RazorpayOptions) {
  if (typeof window !== "undefined" && (window as any).Razorpay) {
    const rzp = new (window as any).Razorpay(options);
    return rzp;
  }
  throw new Error("Razorpay SDK not loaded");
}

export interface StripeOptions {
  publishableKey: string;
  amount: number;
  currency: string;
  description: string;
  successUrl: string;
  cancelUrl: string;
}

export function createStripeCheckout(options: StripeOptions) {
  // In a real implementation, this would create a Stripe checkout session
  return {
    sessionId: "stripe_session_" + Date.now(),
    url: `https://checkout.stripe.com/pay/${options.publishableKey}`,
  };
}

export interface PayPalOptions {
  clientId: string;
  amount: number;
  currency: string;
  description: string;
  onSuccess: (details: any) => void;
  onError: (error: any) => void;
}

export function initializePayPal(options: PayPalOptions) {
  // In a real implementation, this would initialize PayPal SDK
  return {
    paypalButtonsComponent: null,
    createOrder: () => Promise.resolve("paypal_order_" + Date.now()),
    onApprove: options.onSuccess,
  };
}

export function calculateShippingCost(
  country: string,
  orderValue: number,
  shippingDays: number,
): {
  cost: number;
  isFree: boolean;
  estimatedDays: number;
} {
  const shippingRates: Record<
    string,
    { threshold: number; cost: number; multiplier: number }
  > = {
    IN: { threshold: 999, cost: 99, multiplier: 1 },
    US: { threshold: 2000, cost: 299, multiplier: 1.2 },
    CA: { threshold: 2000, cost: 399, multiplier: 1.3 },
    GB: { threshold: 1800, cost: 349, multiplier: 1.25 },
    EU: { threshold: 1800, cost: 329, multiplier: 1.25 },
    SA: { threshold: 1200, cost: 199, multiplier: 1.1 },
  };

  const rate = shippingRates[country] || shippingRates["US"];
  const isFree = orderValue >= rate.threshold;
  const cost = isFree ? 0 : rate.cost;
  const estimatedDays = Math.ceil(shippingDays * rate.multiplier);

  return { cost, isFree, estimatedDays };
}

export function formatOrderId(timestamp: number): string {
  return `FK${timestamp.toString().slice(-8).padStart(8, "0")}`;
}

export function generateTrackingNumber(): string {
  const prefix = "FK";
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.random().toString(36).substr(2, 4).toUpperCase();
  return `${prefix}${timestamp}${random}`;
}
