import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/Footer";
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Truck,
  Shield,
  CreditCard,
  RotateCcw,
  Globe,
  Star,
  Clock,
  Gift,
  MessageCircle,
  Phone,
  Mail,
  ArrowLeft,
} from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  popular?: boolean;
}

const faqData: FAQItem[] = [
  // Shipping & Delivery
  {
    id: "shipping-1",
    question: "Do you offer worldwide shipping?",
    answer:
      "Yes! We ship to 150+ countries worldwide. We offer FREE shipping on orders over ₹2,000 in India and $50 internationally. Standard delivery takes 3-7 business days in India and 7-14 days internationally.",
    category: "Shipping & Delivery",
    popular: true,
  },
  {
    id: "shipping-2",
    question: "What shipping methods do you offer?",
    answer:
      "We offer Standard Shipping (3-7 days), Express Shipping (1-3 days), and Cash on Delivery (COD) in select regions. Express shipping costs extra but includes tracking and insurance.",
    category: "Shipping & Delivery",
  },
  {
    id: "shipping-3",
    question: "Can I track my order?",
    answer:
      "Absolutely! Once your order ships, you'll receive a tracking number via email and SMS. You can track your package in real-time through our website or the courier's tracking portal.",
    category: "Shipping & Delivery",
    popular: true,
  },
  {
    id: "shipping-4",
    question: "Do you offer Cash on Delivery (COD)?",
    answer:
      "Yes! COD is available in India, UAE, and select countries. There's a small COD handling fee of ₹50. Just select 'Cash on Delivery' during checkout.",
    category: "Shipping & Delivery",
  },

  // Product & Authenticity
  {
    id: "product-1",
    question: "Are all your products authentic and original?",
    answer:
      "100% YES! All our merchandise is officially licensed and authentic. We work directly with authorized distributors and brands. Every product comes with authenticity guarantees.",
    category: "Product & Authenticity",
    popular: true,
  },
  {
    id: "product-2",
    question: "What fan merchandise do you sell?",
    answer:
      "We specialize in Football jerseys (Messi, Ronaldo, Mbappé), Anime collectibles (Naruto, Demon Slayer, Chainsaw Man), Pop Culture items (Taylor Swift, K-pop, Marvel), rings, hoodies, and accessories.",
    category: "Product & Authenticity",
  },
  {
    id: "product-3",
    question: "Do you have size guides for jerseys and clothing?",
    answer:
      "Yes! Each product page has detailed size charts. Our jerseys follow European sizing. When in doubt, we recommend sizing up. Contact us for personalized size recommendations.",
    category: "Product & Authenticity",
  },
  {
    id: "product-4",
    question: "How do I care for my merchandise?",
    answer:
      "Jerseys: Machine wash cold, inside out. Air dry only. Rings: Clean with soft cloth. Hoodies: Wash in cold water, tumble dry low. Detailed care instructions come with each product.",
    category: "Product & Authenticity",
  },

  // Returns & Exchanges
  {
    id: "returns-1",
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy! Items must be unused, with original tags. Return shipping is free for defective items. For size exchanges, we cover return shipping costs.",
    category: "Returns & Exchanges",
    popular: true,
  },
  {
    id: "returns-2",
    question: "How do I return or exchange an item?",
    answer:
      "Go to 'My Orders' in your account, select the item, and click 'Return/Exchange'. Print the return label, pack the item, and ship it back. Refunds process within 5-7 business days.",
    category: "Returns & Exchanges",
  },
  {
    id: "returns-3",
    question: "Can I exchange for a different size?",
    answer:
      "Yes! Size exchanges are FREE within 30 days. Just request an exchange in your account and we'll send the new size while you return the original.",
    category: "Returns & Exchanges",
  },

  // Payment & Pricing
  {
    id: "payment-1",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit/debit cards, UPI, Net Banking, digital wallets (Paytm, PhonePe), international cards (Visa, Mastercard), and Cash on Delivery in select regions.",
    category: "Payment & Pricing",
  },
  {
    id: "payment-2",
    question: "Is it safe to pay on your website?",
    answer:
      "Absolutely! We use 256-bit SSL encryption and PCI DSS compliance. We never store your card details. All payments are processed through secure payment gateways.",
    category: "Payment & Pricing",
    popular: true,
  },
  {
    id: "payment-3",
    question: "Do you offer discounts for bulk orders?",
    answer:
      "Yes! Orders of 5+ items get 10% extra discount. Orders of 10+ items get 15% extra discount. Contact our sales team for custom bulk pricing on large orders.",
    category: "Payment & Pricing",
  },
  {
    id: "payment-4",
    question: "How do I use a promo code?",
    answer:
      "Enter your promo code in the 'Discount Code' field during checkout. Current codes: FANKICK50 (50% off), NEWUSER20 (20% off first order), FREESHIP (free shipping).",
    category: "Payment & Pricing",
  },

  // Account & Orders
  {
    id: "account-1",
    question: "Do I need an account to place an order?",
    answer:
      "No, you can checkout as a guest. However, creating an account lets you track orders, save addresses, earn loyalty points, and get exclusive member discounts.",
    category: "Account & Orders",
  },
  {
    id: "account-2",
    question: "How do I track my order status?",
    answer:
      "Log into your account and go to 'My Orders'. You'll see real-time status updates from 'Order Confirmed' to 'Delivered'. You'll also get email/SMS notifications.",
    category: "Account & Orders",
    popular: true,
  },
  {
    id: "account-3",
    question: "Can I modify or cancel my order?",
    answer:
      "You can cancel orders within 1 hour of placing them. To modify orders (size, color, address), contact us immediately at orders@fankick.com or WhatsApp +91-9876543210.",
    category: "Account & Orders",
  },

  // Customer Support
  {
    id: "support-1",
    question: "How can I contact customer support?",
    answer:
      "We're here 24/7! WhatsApp: +91-9876543210, Email: support@fankick.com, Live Chat on website, or call +91-1800-123-4567 (toll-free). Average response time: under 2 hours.",
    category: "Customer Support",
    popular: true,
  },
  {
    id: "support-2",
    question: "Do you have a loyalty or rewards program?",
    answer:
      "Yes! Join FanKick VIP for exclusive perks: Early access to new drops, 15% member discount, free express shipping, birthday rewards, and loyalty points on every purchase.",
    category: "Customer Support",
  },
  {
    id: "support-3",
    question: "What if my product is damaged or defective?",
    answer:
      "We'll make it right immediately! Send us photos at support@fankick.com. We'll send a replacement via express shipping at no cost. No need to return the damaged item first.",
    category: "Customer Support",
  },
];

const categories = Array.from(new Set(faqData.map((faq) => faq.category)));

export default function FAQ() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFAQs = faqData.filter((faq) => {
    const matchesCategory =
      selectedCategory === "All" || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const popularFAQs = faqData.filter((faq) => faq.popular);

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 via-cyan-500/10 to-purple-500/10 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            to="/"
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to FanKick
          </Link>

          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-cyan-500 rounded-full flex items-center justify-center mr-4">
                <HelpCircle className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-sport font-bold text-foreground">
                Frequently Asked Questions
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to know about FanKick - your ultimate fan
              merchandise destination
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Contact Banner */}
        <Card className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-800">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <MessageCircle className="w-8 h-8 text-green-600 mr-4" />
                <div>
                  <h3 className="font-bold text-lg text-foreground">
                    Need Immediate Help?
                  </h3>
                  <p className="text-muted-foreground">
                    Our support team is available 24/7
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <Phone className="w-4 h-4 mr-2" />
                  Call +91-1800-123-4567
                </Button>
                <Button
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-50"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  support@fankick.com
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Popular FAQs */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
            <Star className="w-6 h-6 text-yellow-500 mr-2" />
            Most Popular Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {popularFAQs.map((faq) => (
              <Card key={faq.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <button
                    onClick={() => toggleExpanded(faq.id)}
                    className="w-full text-left"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <Badge className="mb-2 text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                          Popular
                        </Badge>
                        <h3 className="font-semibold text-foreground mb-2">
                          {faq.question}
                        </h3>
                        {expandedItems.has(faq.id) && (
                          <p className="text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </p>
                        )}
                      </div>
                      {expandedItems.has(faq.id) ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground ml-4 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground ml-4 flex-shrink-0" />
                      )}
                    </div>
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <HelpCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto">
              <button
                onClick={() => setSelectedCategory("All")}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === "All"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                All Categories
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFAQs.map((faq) => (
            <Card key={faq.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <button
                  onClick={() => toggleExpanded(faq.id)}
                  className="w-full text-left p-6 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <Badge variant="outline" className="text-xs mr-2">
                          {faq.category}
                        </Badge>
                        {faq.popular && (
                          <Badge className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                            Popular
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">
                        {faq.question}
                      </h3>
                      {expandedItems.has(faq.id) && (
                        <p className="text-muted-foreground leading-relaxed mt-4">
                          {faq.answer}
                        </p>
                      )}
                    </div>
                    {expandedItems.has(faq.id) ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground ml-4 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground ml-4 flex-shrink-0" />
                    )}
                  </div>
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredFAQs.length === 0 && (
          <div className="text-center py-12">
            <HelpCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No FAQs found
            </h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or browse all categories
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Contact Support */}
        <Card className="mt-12 bg-gradient-to-r from-primary/5 to-cyan-500/5 border-primary/20">
          <CardContent className="p-8 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Didn't find what you were looking for?
              </h2>
              <p className="text-muted-foreground mb-6">
                Our friendly support team is here to help you with any questions
                about FanKick products, orders, or anything else!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Start Live Chat
                </Button>
                <Button size="lg" variant="outline">
                  <Mail className="w-5 h-5 mr-2" />
                  Email Support
                </Button>
              </div>
              <div className="mt-6 flex items-center justify-center text-sm text-muted-foreground">
                <Clock className="w-4 h-4 mr-2" />
                Average response time: Under 2 hours
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
