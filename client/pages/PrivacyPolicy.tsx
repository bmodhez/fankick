import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-sport font-bold text-black mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600 text-lg">
            How we collect, use, and protect your personal information
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          {/* Introduction */}
          <div className="mb-8 bg-blue-50 rounded-lg p-6">
            <p className="text-gray-800 font-medium mb-2">
              🔒 <strong>Your Privacy Matters</strong>
            </p>
            <p className="text-gray-700">
              At FanKick, we respect your privacy and are committed to protecting your personal information. 
              This policy explains how we collect, use, and safeguard your data when you use our services.
            </p>
          </div>

          {/* What Information We Collect */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4">📋 **What Information We Collect**</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Personal Information You Provide:</h3>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Account Information:</strong> Name, email address, phone number, password</li>
                <li>• <strong>Shipping Details:</strong> Delivery address, billing address, postal code</li>
                <li>• <strong>Payment Information:</strong> Credit card details, PayPal information (securely processed)</li>
                <li>• <strong>Profile Data:</strong> Preferences, wishlist items, size preferences</li>
                <li>• <strong>Communication:</strong> Messages, reviews, customer service interactions</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Information We Collect Automatically:</h3>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Device Information:</strong> IP address, browser type, device type, operating system</li>
                <li>• <strong>Usage Data:</strong> Pages visited, time spent, clicks, search terms</li>
                <li>• <strong>Location Data:</strong> Country, city (based on IP address)</li>
                <li>• <strong>Shopping Behavior:</strong> Products viewed, cart activity, purchase history</li>
                <li>• <strong>Technical Data:</strong> Log files, cookies, tracking pixels</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Analytics & Cookies:</h3>
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">🍪 **Types of Cookies We Use:**</h4>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• <strong>Essential Cookies:</strong> Required for website functionality</li>
                  <li>• <strong>Performance Cookies:</strong> Help us analyze website performance</li>
                  <li>• <strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                  <li>• <strong>Marketing Cookies:</strong> Used for targeted advertising</li>
                </ul>
              </div>

              <div className="bg-yellow-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">📊 **Analytics Tools:**</h4>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• Google Analytics - Website traffic and user behavior</li>
                  <li>• Facebook Pixel - Social media advertising effectiveness</li>
                  <li>• Hotjar - User experience and heatmap analysis</li>
                  <li>• TikTok Pixel - Social commerce tracking</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Your Data */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4">🎯 **How We Use Your Data**</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Order Processing & Fulfillment:</h3>
            <div className="bg-green-50 rounded-lg p-4 mb-4">
              <ul className="space-y-2 text-gray-700">
                <li>• Process and fulfill your orders</li>
                <li>• Send order confirmations and shipping updates</li>
                <li>• Handle returns, refunds, and customer service</li>
                <li>• Verify payment information and prevent fraud</li>
                <li>• Communicate about your orders and account</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Improving Your Experience:</h3>
            <div className="bg-purple-50 rounded-lg p-4 mb-4">
              <ul className="space-y-2 text-gray-700">
                <li>• Personalize product recommendations</li>
                <li>• Remember your preferences and settings</li>
                <li>• Analyze website usage to improve functionality</li>
                <li>• Optimize our mobile app and website performance</li>
                <li>• Provide relevant content and offers</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Marketing & Communication:</h3>
            <div className="bg-orange-50 rounded-lg p-4 mb-4">
              <ul className="space-y-2 text-gray-700">
                <li>• Send promotional emails and newsletters (with your consent)</li>
                <li>• Show targeted advertisements on social media</li>
                <li>• Notify you about sales, new products, and special offers</li>
                <li>• Send cart abandonment reminders</li>
                <li>• Conduct customer surveys and feedback requests</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Legal & Security:</h3>
            <div className="bg-red-50 rounded-lg p-4">
              <ul className="space-y-2 text-gray-700">
                <li>• Comply with legal obligations and regulations</li>
                <li>• Prevent fraud and protect against security threats</li>
                <li>• Enforce our terms of service and policies</li>
                <li>• Respond to legal requests and court orders</li>
                <li>• Protect our rights and intellectual property</li>
              </ul>
            </div>
          </section>

          {/* Security Measures */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4">🛡️ **Security Measures**</h2>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <p className="text-gray-800 font-medium mb-2">
                🔐 <strong>Your Data is Protected</strong>
              </p>
              <p className="text-gray-700 text-sm">
                We implement industry-standard security measures to protect your personal information 
                from unauthorized access, disclosure, or misuse.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Technical Security:</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">🔒 **Data Encryption:**</h4>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• SSL/TLS encryption for all data transmission</li>
                  <li>• Encrypted storage of sensitive information</li>
                  <li>• Secure payment processing with trusted providers</li>
                  <li>• Regular security audits and updates</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">🏢 **Access Controls:**</h4>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• Limited employee access to personal data</li>
                  <li>• Multi-factor authentication for admin accounts</li>
                  <li>• Regular staff training on data protection</li>
                  <li>• Monitoring and logging of data access</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Data Storage & Retention:</h3>
            <div className="bg-blue-50 rounded-lg p-4">
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Secure Servers:</strong> Data stored on secure, monitored servers</li>
                <li>• <strong>Backup Systems:</strong> Regular backups to prevent data loss</li>
                <li>• <strong>Retention Limits:</strong> Data kept only as long as necessary</li>
                <li>• <strong>Secure Deletion:</strong> Permanent deletion when no longer needed</li>
              </ul>
            </div>
          </section>

          {/* Third-Party Tools */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4">🔗 **Third-Party Tools & Services**</h2>
            
            <p className="text-gray-700 mb-4">
              We work with trusted third-party services to provide you with the best shopping experience:
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">💳 **Payment Processors:**</h4>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• <strong>Stripe:</strong> Secure credit card processing</li>
                  <li>• <strong>PayPal:</strong> Alternative payment method</li>
                  <li>• <strong>Razorpay:</strong> Local payment solutions for India</li>
                  <li>• <strong>Apple Pay/Google Pay:</strong> Mobile payments</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">📊 **Analytics & Marketing:**</h4>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• <strong>Google Analytics:</strong> Website performance tracking</li>
                  <li>• <strong>Facebook/Meta:</strong> Social media advertising</li>
                  <li>• <strong>TikTok:</strong> Social commerce analytics</li>
                  <li>• <strong>Mailchimp:</strong> Email marketing automation</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">📦 **Logistics & Support:**</h4>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• <strong>Shipping Carriers:</strong> YunExpress, 4PX, ePacket</li>
                  <li>• <strong>Customer Support:</strong> Zendesk, Intercom</li>
                  <li>• <strong>Reviews Platform:</strong> Trustpilot, Yotpo</li>
                  <li>• <strong>Live Chat:</strong> Real-time customer assistance</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">☁️ **Technology Partners:**</h4>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• <strong>AWS/Google Cloud:</strong> Secure hosting</li>
                  <li>• <strong>Cloudflare:</strong> Website security and speed</li>
                  <li>• <strong>SendGrid:</strong> Transactional emails</li>
                  <li>• <strong>Twilio:</strong> SMS notifications</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-gray-800 font-medium mb-2">
                ⚠️ <strong>Third-Party Privacy:</strong>
              </p>
              <p className="text-gray-700 text-sm">
                These third-party services have their own privacy policies. We carefully select partners 
                who meet our privacy and security standards, but we encourage you to review their policies as well.
              </p>
            </div>
          </section>

          {/* Data Sharing */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4">🤝 **When We Share Your Information**</h2>
            
            <div className="space-y-4">
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">✅ **We share your data when:**</h4>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• You explicitly consent to sharing</li>
                  <li>• Required for order fulfillment (shipping address to carriers)</li>
                  <li>• Necessary for payment processing</li>
                  <li>• Required by law or legal process</li>
                  <li>• Protecting our rights or investigating fraud</li>
                </ul>
              </div>

              <div className="bg-red-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">❌ **We never:**</h4>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• Sell your personal information to third parties</li>
                  <li>• Share your data for others' marketing without consent</li>
                  <li>• Give access to your account information unnecessarily</li>
                  <li>• Share sensitive data like passwords or payment details</li>
                  <li>• Use your data for purposes you haven't agreed to</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4">👤 **Your Privacy Rights**</h2>
            
            <p className="text-gray-700 mb-4">
              You have control over your personal information. Here's what you can do:
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">📱 **Access & Control:**</h4>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• View and update your account information</li>
                  <li>• Download a copy of your personal data</li>
                  <li>• Correct inaccurate information</li>
                  <li>• Update your communication preferences</li>
                </ul>
              </div>

              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">🗑️ **Deletion & Restriction:**</h4>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• Request deletion of your account and data</li>
                  <li>• Opt out of marketing communications</li>
                  <li>• Restrict certain data processing</li>
                  <li>• Object to automated decision-making</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">How to exercise your rights:</h3>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Account Settings:</strong> Update most information directly in your account</li>
                <li>• <strong>Email Preferences:</strong> Unsubscribe links in all marketing emails</li>
                <li>• <strong>Data Requests:</strong> Email privacy@fankick.com for data access or deletion</li>
                <li>• <strong>Customer Support:</strong> Contact us via live chat or phone for assistance</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-gray-800 font-medium mb-2">
                ⏱️ <strong>Response Time:</strong>
              </p>
              <p className="text-gray-700 text-sm">
                We'll respond to your privacy requests within 30 days. For complex requests, 
                we may need additional time and will keep you informed of our progress.
              </p>
            </div>
          </section>

          {/* International Data Transfers */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4">🌍 **International Data Transfers**</h2>
            
            <p className="text-gray-700 mb-4">
              As a global e-commerce platform, we may transfer your data across borders to provide our services:
            </p>

            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">🛡️ **Data Protection:**</h4>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• We ensure adequate protection in all countries where we process data</li>
                  <li>• Use standard contractual clauses for international transfers</li>
                  <li>• Work only with partners who meet international privacy standards</li>
                  <li>• Comply with GDPR, CCPA, and other applicable privacy laws</li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">📍 **Where Your Data May Go:**</h4>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• Servers in USA, Europe, and Asia for global accessibility</li>
                  <li>• Payment processors in your country for transaction processing</li>
                  <li>• Shipping partners for order fulfillment</li>
                  <li>• Customer support centers for assistance</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Children's Privacy */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4">👶 **Children's Privacy**</h2>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-gray-800 font-medium mb-2">
                🔞 <strong>Age Requirement:</strong>
              </p>
              <p className="text-gray-700">
                FanKick is intended for users 13 years and older. We do not knowingly collect 
                personal information from children under 13 without parental consent.
              </p>
            </div>

            <div className="space-y-3 text-gray-700">
              <p>
                <strong>If you're under 18:</strong> Please get parental permission before making purchases 
                or providing personal information.
              </p>
              <p>
                <strong>For parents:</strong> If you believe your child has provided us with personal information, 
                please contact us immediately so we can remove it.
              </p>
              <p>
                <strong>Parental controls:</strong> Parents can contact us to review, modify, or delete 
                their child's information.
              </p>
            </div>
          </section>

          {/* Policy Updates */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4">📝 **Policy Updates**</h2>
            
            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time to reflect changes in our practices, 
                technology, or legal requirements. Here's how we'll keep you informed:
              </p>
            </div>

            <div className="space-y-3 text-gray-700">
              <ul className="space-y-2">
                <li>• <strong>Email Notification:</strong> For significant changes that affect your rights</li>
                <li>• <strong>Website Notice:</strong> Prominent notification on our homepage</li>
                <li>• <strong>Updated Date:</strong> Always shown at the top of this policy</li>
                <li>• <strong>Version History:</strong> Available upon request</li>
              </ul>
            </div>

            <p className="text-gray-600 text-sm mt-4">
              Your continued use of our services after policy updates constitutes acceptance of the changes. 
              If you disagree with updates, you may close your account.
            </p>
          </section>

          {/* Contact Us */}
          <section className="mb-8 bg-gray-100 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-black mb-4">📞 **Privacy Questions?**</h2>
            
            <p className="text-gray-700 mb-4">
              We're here to help with any privacy concerns or questions you may have.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">📧 Contact Our Privacy Team:</h4>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li><strong>Email:</strong> privacy@fankick.com</li>
                  <li><strong>Data Protection Officer:</strong> dpo@fankick.com</li>
                  <li><strong>General Support:</strong> support@fankick.com</li>
                  <li><strong>Phone:</strong> +91 9876543210</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">🏢 Mailing Address:</h4>
                <div className="text-gray-700 text-sm">
                  <p>FanKick Privacy Department</p>
                  <p>123 Commerce Street</p>
                  <p>Mumbai, Maharashtra 400001</p>
                  <p>India</p>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-primary/10 rounded-lg p-4">
              <p className="text-gray-800 font-medium text-center">
                🛡️ <strong>We take your privacy seriously and will respond to all inquiries promptly.</strong>
              </p>
            </div>
          </section>

          {/* Effective Date */}
          <div className="text-center py-6 border-t border-gray-200">
            <p className="text-gray-600">
              This Privacy Policy is effective as of January 1, 2024
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Last updated: January 2024 | Version 2.0
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
