export interface Currency {
  code: string;
  symbol: string;
  flag: string;
  rate: number; // Exchange rate from USD
}

export const CURRENCIES: Record<string, Currency> = {
  USD: { code: "USD", symbol: "$", flag: "🇺🇸", rate: 1 },
  EUR: { code: "EUR", symbol: "€", flag: "🇪🇺", rate: 0.92 },
  GBP: { code: "GBP", symbol: "£", flag: "🇬🇧", rate: 0.79 },
  CAD: { code: "CAD", symbol: "C$", flag: "🇨🇦", rate: 1.36 },
  SAR: { code: "SAR", symbol: "ر.س", flag: "🇸🇦", rate: 3.75 },
  INR: { code: "INR", symbol: "₹", flag: "🇮🇳", rate: 84.15 },
};

export const COUNTRY_CURRENCY_MAP: Record<string, string> = {
  US: "USD",
  CA: "CAD",
  GB: "GBP",
  EU: "EUR",
  DE: "EUR",
  FR: "EUR",
  IT: "EUR",
  ES: "EUR",
  SA: "SAR",
  IN: "INR",
};

export function convertPrice(usdPrice: number, toCurrency: string): number {
  const currency = CURRENCIES[toCurrency];
  if (!currency) return usdPrice;

  const convertedPrice = usdPrice * currency.rate;

  // Round to appropriate decimal places based on currency
  if (toCurrency === "JPY" || toCurrency === "KRW") {
    return Math.round(convertedPrice);
  }

  return Math.round(convertedPrice * 100) / 100;
}

export function formatPrice(price: number, currency: string): string {
  const currencyData = CURRENCIES[currency];
  if (!currencyData) return `$${price}`;

  // Special formatting for different currencies
  switch (currency) {
    case "USD":
    case "CAD":
      return `${currencyData.symbol}${price.toFixed(2)}`;
    case "EUR":
    case "GBP":
      return `${currencyData.symbol}${price.toFixed(2)}`;
    case "SAR":
      return `${currencyData.symbol} ${price.toFixed(2)}`;
    case "INR":
      return `${currencyData.symbol}${price.toLocaleString("en-IN")}`;
    default:
      return `${currencyData.symbol}${price.toFixed(2)}`;
  }
}

export function detectUserCurrency(): string {
  // Try to detect from browser language/region
  const locale = navigator.language;
  const region = locale.split("-")[1];

  if (region && COUNTRY_CURRENCY_MAP[region]) {
    return COUNTRY_CURRENCY_MAP[region];
  }

  // Fallback based on timezone (rough estimation)
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  if (timezone.includes("America")) {
    if (timezone.includes("Toronto") || timezone.includes("Vancouver")) {
      return "CAD";
    }
    return "USD";
  }

  if (timezone.includes("Europe")) {
    if (timezone.includes("London")) {
      return "GBP";
    }
    return "EUR";
  }

  if (timezone.includes("Asia")) {
    if (timezone.includes("Kolkata") || timezone.includes("Mumbai")) {
      return "INR";
    }
    if (timezone.includes("Riyadh")) {
      return "SAR";
    }
  }

  // Default fallback
  return "USD";
}

export function getShippingInfo(currency: string): {
  freeShippingThreshold: number;
  deliveryTime: string;
  codAvailable: boolean;
} {
  switch (currency) {
    case "USD":
      return {
        freeShippingThreshold: convertPrice(50, currency),
        deliveryTime: "5-7 business days",
        codAvailable: false,
      };
    case "EUR":
      return {
        freeShippingThreshold: convertPrice(50, currency),
        deliveryTime: "6-9 business days",
        codAvailable: false,
      };
    case "GBP":
      return {
        freeShippingThreshold: convertPrice(50, currency),
        deliveryTime: "7-10 business days",
        codAvailable: false,
      };
    case "CAD":
      return {
        freeShippingThreshold: convertPrice(50, currency),
        deliveryTime: "8-12 business days",
        codAvailable: false,
      };
    case "SAR":
      return {
        freeShippingThreshold: convertPrice(40, currency),
        deliveryTime: "5-8 business days",
        codAvailable: true,
      };
    case "INR":
      return {
        freeShippingThreshold: convertPrice(25, currency),
        deliveryTime: "3-5 business days",
        codAvailable: true,
      };
    default:
      return {
        freeShippingThreshold: convertPrice(50, currency),
        deliveryTime: "7-14 business days",
        codAvailable: false,
      };
  }
}
