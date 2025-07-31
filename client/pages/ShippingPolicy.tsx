import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'

export default function ShippingPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-sport font-bold text-black mb-4">
            Shipping Policy
          </h1>
          <p className="text-gray-600 text-lg">
            Fast and reliable global shipping for all FanKick products
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          {/* Introduction */}
          <div className="mb-8 bg-primary/10 rounded-lg p-6">
            <p className="text-gray-800 font-medium mb-2">
              📦 <strong>Free Worldwide Shipping</strong> on orders over €50
            </p>
            <p className="text-gray-700">
              We ship to 150+ countries worldwide with reliable tracking and fast delivery times. 
              Your FanKick merchandise will reach you safely, no matter where you are!
            </p>
          </div>

          {/* Processing Time */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4">⏰ **Processing Time**</h2>
            
            <p className="text-gray-700 mb-4">
              We process and prepare your order for shipment within:
            </p>

            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <ul className="space-y-2 text-gray-700">
                <li><strong>Standard Items:</strong> 2-3 business days</li>
                <li><strong>Custom/Personalized Items:</strong> 3-5 business days</li>
                <li><strong>Pre-order Items:</strong> As specified on product page</li>
              </ul>
            </div>

            <p className="text-gray-600 text-sm">
              <strong>Note:</strong> Processing time starts from the next business day after your order is placed. 
              Orders placed on weekends or holidays will be processed on the next business day.
            </p>
          </section>

          {/* Shipping Methods & Times */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4">🚚 **Shipping Methods & Delivery Times**</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Standard Shipping (Free on orders €50+)</h3>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-3">🇪🇺 **Europe**</h4>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• Germany, France, Italy: <strong>7-12 days</strong></li>
                  <li>• Spain, Netherlands: <strong>8-14 days</strong></li>
                  <li>• Eastern Europe: <strong>10-16 days</strong></li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-3">🇺🇸 **North America**</h4>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• USA: <strong>10-18 days</strong></li>
                  <li>• Canada: <strong>12-20 days</strong></li>
                  <li>• Mexico: <strong>15-25 days</strong></li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-3">🌏 **Asia Pacific**</h4>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• India: <strong>8-15 days</strong></li>
                  <li>• Australia: <strong>12-20 days</strong></li>
                  <li>• Japan, South Korea: <strong>10-16 days</strong></li>
                  <li>• Southeast Asia: <strong>12-18 days</strong></li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-3">🌍 **Other Regions**</h4>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• Middle East: <strong>10-18 days</strong></li>
                  <li>• South America: <strong>15-25 days</strong></li>
                  <li>• Africa: <strong>18-30 days</strong></li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Express Shipping (Additional cost)</h3>
            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Europe:</strong> 5-8 days (+€15)</li>
                <li>• <strong>USA/Canada:</strong> 7-12 days (+€25)</li>
                <li>• <strong>Asia:</strong> 6-10 days (+€20)</li>
                <li>• <strong>Rest of World:</strong> 8-15 days (+€30)</li>
              </ul>
            </div>
          </section>

          {/* Shipping Carriers */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4">📮 **Shipping Carriers**</h2>
            
            <p className="text-gray-700 mb-4">
              We work with trusted international shipping partners to ensure safe delivery:
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <h4 className="font-semibold text-gray-800 mb-2">YunExpress</h4>
                <p className="text-sm text-gray-600">Fast delivery to Asia & Europe</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <h4 className="font-semibold text-gray-800 mb-2">4PX</h4>
                <p className="text-sm text-gray-600">Reliable worldwide shipping</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <h4 className="font-semibold text-gray-800 mb-2">ePacket</h4>
                <p className="text-sm text-gray-600">Cost-effective global delivery</p>
              </div>
            </div>

            <p className="text-gray-600 text-sm">
              All shipments include tracking numbers so you can monitor your package's journey. 
              You'll receive tracking information via email once your order ships.
            </p>
          </section>

          {/* Customs & Duties */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4">🛃 **Customs Duties & Taxes**</h2>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <p className="text-gray-800 font-medium mb-2">
                ⚠️ <strong>Important:</strong> International customers may be responsible for customs duties and taxes
              </p>
            </div>

            <div className="space-y-4 text-gray-700">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">What are customs duties?</h4>
                <p>
                  Customs duties and taxes are fees imposed by your country's government on imported goods. 
                  These fees are separate from your order total and shipping costs.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Who pays customs fees?</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Customers are responsible for all customs duties, taxes, and handling fees</li>
                  <li>Fees vary by country and product value</li>
                  <li>You may need to pay these fees to receive your package</li>
                  <li>FanKick cannot predict or control these charges</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Tips to minimize customs fees:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Check your country's duty-free threshold</li>
                  <li>Consider splitting large orders into smaller shipments</li>
                  <li>Factor potential duties into your budget</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Lost or Delayed Packages */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4">📦 **Lost or Delayed Packages**</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">If your package is delayed:</h3>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Standard shipping:</strong> Contact us if 30+ days past estimated delivery</li>
                <li>• <strong>Express shipping:</strong> Contact us if 20+ days past estimated delivery</li>
                <li>• Check with your local postal service first</li>
                <li>• Verify your shipping address is correct</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">If your package is lost:</h3>
            <div className="bg-red-50 rounded-lg p-4 mb-4">
              <p className="text-gray-700 mb-3">
                <strong>We've got you covered!</strong> If your package is confirmed lost in transit:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• We'll send a replacement at no extra cost</li>
                <li>• Or provide a full refund if you prefer</li>
                <li>• We handle all carrier investigations</li>
                <li>• You don't pay twice for the same item</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">How to report issues:</h3>
            <div className="space-y-2 text-gray-700">
              <p>Contact our support team with:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Your order number</li>
                <li>Tracking number</li>
                <li>Description of the issue</li>
                <li>Any relevant photos or documentation</li>
              </ul>
            </div>
          </section>

          {/* Special Shipping Info */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4">📋 **Additional Information**</h2>
            
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">🎁 **Gift Orders**</h4>
                <p className="text-gray-700 text-sm">
                  Gift orders are shipped to the recipient's address. Make sure to provide accurate 
                  shipping information. Gift messages can be added during checkout.
                </p>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">🏢 **Business Orders**</h4>
                <p className="text-gray-700 text-sm">
                  Bulk orders and business purchases may qualify for special shipping rates. 
                  Contact our sales team for custom shipping solutions.
                </p>
              </div>

              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">🌟 **VIP Customers**</h4>
                <p className="text-gray-700 text-sm">
                  Customers with high order volumes may qualify for priority processing 
                  and expedited shipping options.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="mb-8 bg-gray-100 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-black mb-4">📞 **Shipping Support**</h2>
            
            <p className="text-gray-700 mb-4">
              Have questions about shipping? Our support team is here to help!
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Get Help:</h4>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>📧 Email: shipping@fankick.com</li>
                  <li>💬 Live Chat: Available 24/7</li>
                  <li>📱 WhatsApp: +91 9876543210</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Track Your Order:</h4>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>🔍 Order tracking page</li>
                  <li>📧 Email notifications</li>
                  <li>📱 SMS updates (optional)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Last Updated */}
          <div className="text-center py-6 border-t border-gray-200">
            <p className="text-gray-600 text-sm">
              This shipping policy was last updated on January 1, 2024
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
