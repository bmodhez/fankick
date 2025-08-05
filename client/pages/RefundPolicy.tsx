import { Footer } from '@/components/Footer'

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-background">
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-sport font-bold text-black mb-4">
            Refund & Return Policy
          </h1>
          <p className="text-gray-600 text-lg">
            We want you to love your FanKick purchase. If you're not happy, we're here to help!
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          {/* Introduction */}
          <div className="mb-8 bg-green-50 rounded-lg p-6">
            <p className="text-gray-800 font-medium mb-2">
              😊 <strong>Customer Satisfaction Guarantee</strong>
            </p>
            <p className="text-gray-700">
              Your happiness is our priority! We offer a 14-day return window and hassle-free refunds 
              to ensure you're completely satisfied with your FanKick merchandise.
            </p>
          </div>

          {/* Return Eligibility */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4">✅ **Return Eligibility**</h2>
            
            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <p className="text-gray-800 font-medium mb-2">
                �� <strong>14-Day Return Window</strong>
              </p>
              <p className="text-gray-700 text-sm">
                You have 14 days from the date you receive your item to request a return. 
                The return period starts when you receive your package, not when you place the order.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Items must be:</h3>
            <ul className="space-y-2 text-gray-700 mb-4">
              <li>• <strong>Unused and unworn</strong> - Items should be in the same condition you received them</li>
              <li>• <strong>In original packaging</strong> - Keep tags, labels, and protective packaging</li>
              <li>• <strong>Clean and odor-free</strong> - No perfume, smoke, or pet odors</li>
              <li>• <strong>Undamaged</strong> - No stains, tears, or alterations</li>
            </ul>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">💡 **Pro Tip:**</h4>
              <p className="text-gray-700 text-sm">
                Try items on carefully and keep them in a clean environment. Take photos when you 
                first receive your order - this helps with any quality issues that might arise.
              </p>
            </div>
          </section>

          {/* Non-Returnable Items */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4">❌ **Non-Returnable Items**</h2>
            
            <p className="text-gray-700 mb-4">
              For hygiene and quality reasons, some items cannot be returned:
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-red-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">🚫 **Never Returnable:**</h4>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• Underwear and intimate apparel</li>
                  <li>• Custom/personalized items</li>
                  <li>• Items with custom printing/embroidery</li>
                  <li>• Earrings and body jewelry</li>
                  <li>• Face masks and protective gear</li>
                </ul>
              </div>

              <div className="bg-yellow-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">⚠️ **Special Conditions:**</h4>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• Sale items (50%+ discount) - Final sale</li>
                  <li>• Clearance items - No returns</li>
                  <li>• Items damaged by misuse</li>
                  <li>• Items returned after 14 days</li>
                  <li>• Gift cards and digital products</li>
                </ul>
              </div>
            </div>

            <p className="text-gray-600 text-sm">
              <strong>Note:</strong> Custom jerseys with your name/number printed cannot be returned unless 
              there was an error in our printing process.
            </p>
          </section>

          {/* Refund Process */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4">💰 **Refund Process**</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">How to start a return:</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start space-x-3 bg-gray-50 rounded-lg p-4">
                <span className="bg-primary text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                <div>
                  <h4 className="font-semibold text-gray-800">Contact our support team</h4>
                  <p className="text-gray-700 text-sm">Email returns@fankick.com or use our live chat with your order number</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-gray-50 rounded-lg p-4">
                <span className="bg-primary text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                <div>
                  <h4 className="font-semibold text-gray-800">Get your return authorization</h4>
                  <p className="text-gray-700 text-sm">We'll send you a return authorization number and instructions</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-gray-50 rounded-lg p-4">
                <span className="bg-primary text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                <div>
                  <h4 className="font-semibold text-gray-800">Package and ship your return</h4>
                  <p className="text-gray-700 text-sm">Include the return form and send to our returns center</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-gray-50 rounded-lg p-4">
                <span className="bg-primary text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span>
                <div>
                  <h4 className="font-semibold text-gray-800">Get your refund</h4>
                  <p className="text-gray-700 text-sm">Refund processed within 5-7 business days after we receive your return</p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Refund timeline:</h3>
            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Credit/Debit Cards:</strong> 5-7 business days</li>
                <li>• <strong>PayPal:</strong> 3-5 business days</li>
                <li>• <strong>Bank Transfers:</strong> 7-10 business days</li>
                <li>• <strong>Digital Wallets:</strong> 1-3 business days</li>
              </ul>
            </div>

            <p className="text-gray-600 text-sm">
              Refunds are processed to your original payment method. If the original payment method 
              is no longer available, we'll work with you to find an alternative solution.
            </p>
          </section>

          {/* Damaged or Wrong Items */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4">🛠️ **Damaged or Wrong Items**</h2>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-gray-800 font-medium mb-2">
                🚨 <strong>We take full responsibility for our mistakes!</strong>
              </p>
              <p className="text-gray-700 text-sm">
                If you receive a damaged, defective, or incorrect item, we'll make it right immediately 
                at no cost to you.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">What we cover:</h3>
            <ul className="space-y-2 text-gray-700 mb-4">
              <li>• <strong>Damaged items:</strong> Tears, stains, or defects</li>
              <li>• <strong>Wrong size/color:</strong> Different from what you ordered</li>
              <li>• <strong>Missing items:</strong> Parts of your order didn't arrive</li>
              <li>• <strong>Defective products:</strong> Items that don't work properly</li>
              <li>• <strong>Quality issues:</strong> Poor printing or manufacturing</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">What to do:</h3>
            <div className="space-y-3 mb-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <h4 className="font-semibold text-gray-800 text-sm mb-1">📸 Take photos immediately</h4>
                <p className="text-gray-700 text-sm">
                  Photo evidence helps us resolve your issue faster and improve our quality control
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <h4 className="font-semibold text-gray-800 text-sm mb-1">📞 Contact us within 48 hours</h4>
                <p className="text-gray-700 text-sm">
                  Report the issue as soon as possible for the fastest resolution
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <h4 className="font-semibold text-gray-800 text-sm mb-1">📦 Keep the packaging</h4>
                <p className="text-gray-700 text-sm">
                  Don't throw away the packaging until the issue is resolved
                </p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Our solution options:</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <h4 className="font-semibold text-gray-800 mb-2">🔄 Replacement</h4>
                <p className="text-gray-700 text-sm">Free replacement sent immediately</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <h4 className="font-semibold text-gray-800 mb-2">💰 Full Refund</h4>
                <p className="text-gray-700 text-sm">Complete refund including shipping</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <h4 className="font-semibold text-gray-800 mb-2">🎁 Store Credit</h4>
                <p className="text-gray-700 text-sm">Extra credit for future purchases</p>
              </div>
            </div>
          </section>

          {/* Return Shipping */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4">📦 **Return Shipping Responsibility**</h2>
            
            <div className="space-y-4">
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">✅ **We pay return shipping when:**</h4>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• Item is damaged or defective</li>
                  <li>• We sent the wrong item</li>
                  <li>• Quality doesn't match description</li>
                  <li>• Item has manufacturing defects</li>
                </ul>
              </div>

              <div className="bg-yellow-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">📋 **You pay return shipping when:**</h4>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• You changed your mind</li>
                  <li>• Item doesn't fit as expected</li>
                  <li>• You ordered the wrong size/color</li>
                  <li>• Return is for personal preference</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">Return shipping tips:</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• <strong>Use tracking:</strong> Always get a tracking number for your return shipment</li>
                <li>• <strong>Insurance:</strong> Consider insurance for high-value items</li>
                <li>• <strong>Pack safely:</strong> Use original packaging when possible</li>
                <li>• <strong>Keep receipts:</strong> Save your shipping receipt until refund is processed</li>
              </ul>
            </div>

            <p className="text-gray-600 text-sm mt-4">
              <strong>International returns:</strong> Return shipping costs vary by location. 
              We'll provide estimated costs and the most economical shipping options.
            </p>
          </section>

          {/* Exchange Policy */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4">🔄 **Exchanges**</h2>
            
            <p className="text-gray-700 mb-4">
              Want a different size or color? Exchanges are easy!
            </p>

            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">How exchanges work:</h4>
              <ol className="space-y-1 text-gray-700 text-sm">
                <li>1. Contact us with your order number and exchange request</li>
                <li>2. We'll check availability of your preferred item</li>
                <li>3. Return your original item using our return process</li>
                <li>4. We'll send your new item once we receive the return</li>
              </ol>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">✅ **Free exchanges:**</h4>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• Same item, different size</li>
                  <li>• Same price or lower</li>
                  <li>• Within 14-day window</li>
                </ul>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">💳 **Additional payment:**</h4>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• Higher-priced item</li>
                  <li>• Different product entirely</li>
                  <li>• Express shipping requested</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Contact Support */}
          <section className="mb-8 bg-gray-100 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-black mb-4">🤝 **Need Help?**</h2>
            
            <p className="text-gray-700 mb-4">
              Our friendly customer service team is here to make returns and refunds as smooth as possible!
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">📞 Contact Options:</h4>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>📧 <strong>Email:</strong> returns@fankick.com</li>
                  <li>💬 <strong>Live Chat:</strong> Available 24/7 on our website</li>
                  <li>📱 <strong>WhatsApp:</strong> +91 9876543210</li>
                  <li>🌐 <strong>Help Center:</strong> fankick.com/help</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">⏰ Response Times:</h4>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>💬 <strong>Live Chat:</strong> Instant response</li>
                  <li>📧 <strong>Email:</strong> Within 4 hours</li>
                  <li>📱 <strong>WhatsApp:</strong> Within 1 hour</li>
                  <li>🔄 <strong>Returns:</strong> Processed within 2 business days</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-primary/10 rounded-lg p-4">
              <p className="text-gray-800 font-medium text-center">
                💯 <strong>Our Promise:</strong> We'll work with you to find a solution that makes you happy. 
                Your satisfaction is our top priority!
              </p>
            </div>
          </section>

          {/* Last Updated */}
          <div className="text-center py-6 border-t border-gray-200">
            <p className="text-gray-600 text-sm">
              This refund and return policy was last updated on January 1, 2024
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
