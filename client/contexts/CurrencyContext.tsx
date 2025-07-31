import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { CURRENCIES, detectUserCurrency, Currency } from "@/utils/currency";

interface CurrencyContextType {
  selectedCurrency: Currency;
  setCurrency: (currencyCode: string) => void;
  isLoading: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined,
);

interface CurrencyProviderProps {
  children: ReactNode;
}

export function CurrencyProvider({ children }: CurrencyProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(
    CURRENCIES.USD,
  );

  useEffect(() => {
    // Check if currency is stored in localStorage
    const storedCurrency = localStorage.getItem("fankick-currency");

    if (storedCurrency && CURRENCIES[storedCurrency]) {
      setSelectedCurrency(CURRENCIES[storedCurrency]);
    } else {
      // Auto-detect user currency
      const detectedCurrency = detectUserCurrency();
      setSelectedCurrency(CURRENCIES[detectedCurrency]);
      localStorage.setItem("fankick-currency", detectedCurrency);
    }

    setIsLoading(false);
  }, []);

  const setCurrency = (currencyCode: string) => {
    if (CURRENCIES[currencyCode]) {
      setSelectedCurrency(CURRENCIES[currencyCode]);
      localStorage.setItem("fankick-currency", currencyCode);
    }
  };

  return (
    <CurrencyContext.Provider
      value={{
        selectedCurrency,
        setCurrency,
        isLoading,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
