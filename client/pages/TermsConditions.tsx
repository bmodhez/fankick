import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-sport font-bold text-black mb-4">
            Terms & Conditions
          </h1>
          <p className="text-gray-600 text-lg">
            Last updated: January 2024
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          {/* Introduction */}
          <div className="mb-8">
            <p className="text-gray-700 leading-relaxed">
              Welcome to FanKick! These Terms and Conditions ("Terms") govern your use of our website and services. 
              By accessing or using FanKick, you agree to be bound by these Terms. If you do not agree with any 
              part of these Terms, please do not use our services.
            </p>
          </div>

          {/* 1. Use of Site */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4">1. Use of Site</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Eligibility</h3>
            <p className="text-gray-700 mb-4">
              You must be at least 18 years old or have parental consent to use our services. By using FanKick, 
              you represent that you meet these requirements.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Acceptable Use</h3>
            <p className="text-gray-700 mb-4">You agree to use our website only for lawful purposes. You shall not:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Transmit harmful or malicious content</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Use our services for commercial purposes without permission</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Account Security</h3>
            <p className="text-gray-700 mb-4">
              You are responsible for maintaining the confidentiality of your account credentials and for all 
              activities that occur under your account. Please notify us immediately of any unauthorized access.
            </p>
          </section>

          {/* 2. Product Availability */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4">2. Product Availability</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Inventory</h3>
            <p className="text-gray-700 mb-4">
              All products are subject to availability. We make every effort to ensure accurate inventory levels, 
              but we cannot guarantee that all displayed items are in stock. We reserve the right to limit quantities 
              or discontinue products at any time.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Product Information</h3>
            <p className="text-gray-700 mb-4">
              We strive to provide accurate product descriptions, images, and specifications. However, we do not 
              warrant that product descriptions or other content is error-free, complete, or current.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Geographic Restrictions</h3>
            <p className="text-gray-700 mb-4">
              Some products may not be available in all regions due to licensing restrictions, shipping limitations, 
              or local regulations. We will inform you if a product cannot be shipped to your location.
            </p>
          </section>

          {/* 3. Pricing */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4">3. Pricing</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Price Display</h3>
            <p className="text-gray-700 mb-4">
              All prices are displayed in the selected currency and are subject to change without notice. 
              Prices include applicable taxes where required by law.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Currency Conversion</h3>
            <p className="text-gray-700 mb-4">
              Currency conversion rates are updated regularly but may fluctuate. The final charge to your 
              payment method will be based on the rate at the time of processing.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Pricing Errors</h3>
            <p className="text-gray-700 mb-4">
              In the event of a pricing error, we reserve the right to cancel orders and provide a full refund, 
              even if the order has been confirmed and payment processed.
            </p>
          </section>

          {/* 4. Order Acceptance */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4">4. Order Acceptance</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Order Processing</h3>
            <p className="text-gray-700 mb-4">
              Placing an order constitutes an offer to purchase. We reserve the right to accept or decline 
              any order for any reason. Order confirmation does not guarantee acceptance.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Payment Processing</h3>
            <p className="text-gray-700 mb-4">
              Payment is required at the time of order placement. We accept various payment methods including 
              credit cards, PayPal, and Cash on Delivery (where available). All transactions are processed securely.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Order Cancellation</h3>
            <p className="text-gray-700 mb-4">
              You may cancel your order within 1 hour of placement if it has not yet been processed. 
              Once an order enters processing, cancellation may not be possible.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Shipping and Delivery</h3>
            <p className="text-gray-700 mb-4">
              Shipping times are estimates and may vary based on location, product availability, and external factors. 
              We are not responsible for delays caused by customs, weather, or carrier issues.
            </p>
          </section>

          {/* 5. Intellectual Property */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4">5. Intellectual Property</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">FanKick Content</h3>
            <p className="text-gray-700 mb-4">
              All content on our website, including text, graphics, logos, and software, is owned by FanKick 
              or our licensors and is protected by copyright and other intellectual property laws.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Licensed Merchandise</h3>
            <p className="text-gray-700 mb-4">
              All licensed products (football jerseys, anime merchandise, pop culture items) are sold under 
              appropriate licensing agreements. Trademarks and copyrights belong to their respective owners.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">User Content</h3>
            <p className="text-gray-700 mb-4">
              By submitting reviews, comments, or other content, you grant FanKick a non-exclusive, royalty-free 
              license to use, modify, and display such content for business purposes.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Copyright Infringement</h3>
            <p className="text-gray-700 mb-4">
              If you believe any content infringes your copyright, please contact us immediately with 
              detailed information so we can investigate and take appropriate action.
            </p>
          </section>

          {/* 6. Returns and Refunds */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4">6. Returns and Refunds</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Return Policy</h3>
            <p className="text-gray-700 mb-4">
              We offer a 15-day return policy for most items. Products must be unused, in original packaging, 
              and in resaleable condition. Custom or personalized items may not be eligible for return.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Refund Processing</h3>
            <p className="text-gray-700 mb-4">
              Refunds will be processed to the original payment method within 5-10 business days after 
              we receive and inspect the returned item.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Return Shipping</h3>
            <p className="text-gray-700 mb-4">
              Customers are responsible for return shipping costs unless the item was defective or 
              we made an error in fulfillment.
            </p>
          </section>

          {/* 7. Limitation of Liability */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4">7. Limitation of Liability</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Service Disclaimer</h3>
            <p className="text-gray-700 mb-4">
              Our services are provided "as is" without warranties of any kind. We do not guarantee 
              uninterrupted or error-free operation of our website or services.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Liability Limits</h3>
            <p className="text-gray-700 mb-4">
              To the maximum extent permitted by law, FanKick shall not be liable for any indirect, 
              incidental, special, or consequential damages arising from your use of our services.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Maximum Liability</h3>
            <p className="text-gray-700 mb-4">
              Our total liability for any claim shall not exceed the amount you paid for the specific 
              product or service that gave rise to the claim.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Third-Party Services</h3>
            <p className="text-gray-700 mb-4">
              We are not responsible for the actions, content, or services of third-party websites, 
              payment processors, or shipping carriers linked to or integrated with our services.
            </p>
          </section>

          {/* 8. Privacy and Data Protection */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4">8. Privacy and Data Protection</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Data Collection</h3>
            <p className="text-gray-700 mb-4">
              We collect and process personal information as described in our Privacy Policy. 
              By using our services, you consent to such processing.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Data Security</h3>
            <p className="text-gray-700 mb-4">
              We implement appropriate security measures to protect your personal information, 
              but cannot guarantee absolute security of data transmitted over the internet.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Cookies</h3>
            <p className="text-gray-700 mb-4">
              Our website uses cookies to enhance user experience and analyze traffic. 
              You can control cookie settings through your browser preferences.
            </p>
          </section>

          {/* 9. Governing Law */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4">9. Governing Law</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Jurisdiction</h3>
            <p className="text-gray-700 mb-4">
              These Terms shall be governed by and construed in accordance with the laws of India, 
              without regard to conflict of law principles.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Dispute Resolution</h3>
            <p className="text-gray-700 mb-4">
              Any disputes arising from these Terms or your use of our services shall be resolved 
              through binding arbitration in Mumbai, India, or in the courts of Mumbai.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">International Customers</h3>
            <p className="text-gray-700 mb-4">
              International customers may be subject to additional terms based on local laws and regulations. 
              Local consumer protection laws may provide additional rights.
            </p>
          </section>

          {/* 10. Changes to Terms */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4">10. Changes to Terms</h2>
            
            <p className="text-gray-700 mb-4">
              We reserve the right to modify these Terms at any time. Changes will be effective immediately 
              upon posting on our website. Your continued use of our services constitutes acceptance of 
              any modifications.
            </p>

            <p className="text-gray-700 mb-4">
              We encourage you to review these Terms periodically to stay informed of any updates.
            </p>
          </section>

          {/* Contact Information */}
          <section className="mb-8 bg-gray-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-black mb-4">Contact Information</h2>
            
            <p className="text-gray-700 mb-4">
              If you have any questions about these Terms & Conditions, please contact us:
            </p>

            <div className="space-y-2 text-gray-700">
              <p><strong>Email:</strong> legal@fankick.com</p>
              <p><strong>Support:</strong> support@fankick.com</p>
              <p><strong>Phone:</strong> +91 9876543210</p>
              <p><strong>Address:</strong> FanKick Legal Department, Mumbai, Maharashtra, India</p>
            </div>

            <p className="text-gray-600 text-sm mt-4">
              Business Hours: Monday to Friday, 9:00 AM to 6:00 PM IST
            </p>
          </section>

          {/* Effective Date */}
          <div className="text-center py-8 border-t border-gray-200">
            <p className="text-gray-600">
              These Terms & Conditions are effective as of January 1, 2024
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Version 1.0 - Last updated: January 2024
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
