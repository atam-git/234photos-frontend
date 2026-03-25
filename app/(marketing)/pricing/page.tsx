export default function PricingPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-4">Simple, Transparent Pricing</h1>
      <p className="text-center text-gray-600 mb-12">Choose the plan that works for you</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Free Plan */}
        <div className="border rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-2">Free</h3>
          <p className="text-4xl font-bold mb-4">$0</p>
          <ul className="space-y-3 mb-8">
            <li>✓ 5 free downloads</li>
            <li>✓ Standard license</li>
            <li>✓ Basic support</li>
          </ul>
          <button className="w-full border border-primary text-primary py-3 rounded-lg">
            Get Started
          </button>
        </div>
        
        {/* Pro Plan */}
        <div className="border-2 border-primary rounded-lg p-8 relative">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm">
            Popular
          </div>
          <h3 className="text-2xl font-bold mb-2">Pro</h3>
          <p className="text-4xl font-bold mb-4">$49<span className="text-lg">/mo</span></p>
          <ul className="space-y-3 mb-8">
            <li>✓ Unlimited downloads</li>
            <li>✓ All license types</li>
            <li>✓ Priority support</li>
            <li>✓ API access</li>
          </ul>
          <button className="w-full bg-primary text-white py-3 rounded-lg">
            Start Free Trial
          </button>
        </div>
        
        {/* Enterprise Plan */}
        <div className="border rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
          <p className="text-4xl font-bold mb-4">Custom</p>
          <ul className="space-y-3 mb-8">
            <li>✓ Team management</li>
            <li>✓ SSO integration</li>
            <li>✓ Dedicated support</li>
            <li>✓ Custom contracts</li>
          </ul>
          <button className="w-full border border-primary text-primary py-3 rounded-lg">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
}
