// Marketing page mock data

export const PRICING_PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    desc: 'For individuals exploring African content.',
    monthlyPrice: null,
    badge: null,
    cta: 'Get started free',
    ctaVariant: 'outline' as const,
    href: '/signup',
  },
  {
    id: 'standard',
    name: 'Standard',
    desc: 'For creators, marketers and small businesses.',
    monthlyPrice: 45000,
    badge: 'Most popular',
    cta: 'Start free trial',
    ctaVariant: 'red' as const,
    href: '/signup?plan=standard',
  },
  {
    id: 'business',
    name: 'Business',
    desc: 'For agencies, teams and high-volume brands.',
    monthlyPrice: 120000,
    badge: null,
    cta: 'Contact sales',
    ctaVariant: 'dark' as const,
    href: '/contact-sales',
  },
]

export const PRICING_FEATURES = [
  { category: 'Downloads', rows: [
    { label: 'Assets per month', starter: '10 previews', standard: '750 assets', business: 'Unlimited' },
    { label: 'Full HD photos & footage', starter: false, standard: true, business: true },
    { label: '4K footage & RAW files', starter: false, standard: false, business: true },
    { label: 'Bulk download', starter: false, standard: false, business: true },
  ]},
  { category: 'AI Tools', rows: [
    { label: 'AI image generator credits', starter: '0', standard: '50 / mo', business: '500 / mo' },
    { label: 'Background remover', starter: false, standard: true, business: true },
    { label: 'Generative fill', starter: false, standard: false, business: true },
  ]},
  { category: 'Licensing', rows: [
    { label: 'Standard commercial licence', starter: true, standard: true, business: true },
    { label: 'Enhanced licence', starter: false, standard: false, business: true },
    { label: 'Editorial licence', starter: false, standard: true, business: true },
  ]},
  { category: 'Team & Enterprise', rows: [
    { label: 'Team seats', starter: '1', standard: '1', business: 'Up to 10' },
    { label: 'Custom collections & folders', starter: false, standard: false, business: true },
    { label: 'Usage reports', starter: false, standard: false, business: true },
    { label: 'API access', starter: false, standard: false, business: true },
    { label: 'SSO / SAML', starter: false, standard: false, business: true },
  ]},
  { category: 'Support', rows: [
    { label: 'Email support', starter: true, standard: true, business: true },
    { label: 'Priority support', starter: false, standard: true, business: true },
    { label: 'Dedicated account manager', starter: false, standard: false, business: true },
  ]},
]

export const PRICING_FAQS = [
  { q: 'Can I cancel anytime?', a: 'Yes. You can cancel your subscription at any time from your account settings. You\'ll retain access until the end of your billing period.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major cards, bank transfers, and local payment methods including Flutterwave for NGN, GHS, KES and ZAR payments.' },
  { q: 'Do unused downloads roll over?', a: 'No — downloads reset at the start of each billing cycle. We recommend choosing a plan that matches your typical monthly usage.' },
  { q: 'What\'s the difference between Standard and Enhanced licence?', a: 'Standard covers web, social media, and print up to 500,000 copies. Enhanced covers unlimited print runs, resale products, and broadcast use.' },
  { q: 'Can I upgrade or downgrade my plan?', a: 'Yes, you can change your plan at any time. Upgrades take effect immediately; downgrades apply at the next billing cycle.' },
  { q: 'Is there a free trial?', a: 'The Standard plan includes a 7-day free trial. No credit card required to start.' },
]

export const BUYER_STEPS = [
  { n: '01', title: 'Search', desc: 'Type a keyword or upload an image to find visually similar assets. Filter by type, orientation, license and more.' },
  { n: '02', title: 'Preview', desc: 'Click any asset to see a full watermarked preview. Check dimensions, license terms and contributor details.' },
  { n: '03', title: 'Download', desc: 'Choose your license type and download. Assets are yours to use forever under the terms of your license.' },
]

export const CONTRIBUTOR_STEPS = [
  { n: '01', title: 'Create your account', desc: 'Sign up free in under 2 minutes. No approval needed to get started.' },
  { n: '02', title: 'Upload your work', desc: 'Drag and drop up to 100 files at once. We support JPG, PNG, SVG, MP4 and MOV.' },
  { n: '03', title: 'Add metadata', desc: 'Our AI suggests tags automatically. Review, edit and submit for review.' },
  { n: '04', title: 'Get approved & earn', desc: 'Assets go live within 24–48 hours. Earn royalties every time your work is downloaded.' },
]

export const CONTRIBUTOR_STATS = [
  { value: '100K+', label: 'Active contributors' },
  { value: '54', label: 'African countries' },
  { value: '₦3.2B+', label: 'Paid to contributors' },
  { value: '50M+', label: 'Assets in library' },
]

export const CONTRIBUTOR_FAQS = [
  { q: 'How much do I earn per download?', a: 'Contributors earn 30–50% royalty per download depending on your contributor tier and the license type purchased.' },
  { q: 'What content can I upload?', a: 'Photos, vectors, illustrations, footage and music with African subjects or created by African creators. Content must be original and you must own the rights.' },
  { q: 'How long does review take?', a: 'Most submissions are reviewed within 24–48 hours. You\'ll receive a notification when your assets go live or if any are rejected with feedback.' },
  { q: 'Do I need a model release?', a: 'Yes, for any identifiable people in your images. We provide a model release template you can use.' },
  { q: 'When and how do I get paid?', a: 'Earnings are paid monthly via bank transfer, PayPal or mobile money once you reach the ₦5,000 minimum threshold.' },
]

export const CONTACT_TOPICS = ['General enquiry', 'Licensing question', 'Contributor support', 'Enterprise / sales', 'Press & media', 'Report an issue']

export const LICENSES = [
  {
    name: 'Standard Licence',
    price: '₦15,000',
    desc: 'Perfect for most projects',
    features: [
      'Use in web, social media, blogs',
      'Print up to 500,000 copies',
      'Use in presentations and templates',
      'Unlimited projects',
      'Lifetime usage rights',
    ],
  },
  {
    name: 'Enhanced Licence',
    price: '₦75,000',
    desc: 'For larger campaigns and products',
    features: [
      'Everything in Standard',
      'Unlimited print runs',
      'Use in products for resale',
      'Broadcast and streaming',
      'OOH advertising (billboards, etc.)',
    ],
  },
  {
    name: 'Editorial Licence',
    price: '₦30,000',
    desc: 'For news, education and commentary',
    features: [
      'News articles and journalism',
      'Educational materials',
      'Documentary projects',
      'Non-commercial use only',
      'Attribution may be required',
    ],
  },
]

export const TEAM_MEMBERS = [
  { name: 'Adaeze Okafor', role: 'CEO & Co-founder', country: '🇳🇬 Nigeria', img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300&q=80' },
  { name: 'Kwame Asante', role: 'CTO & Co-founder', country: '🇬🇭 Ghana', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80' },
  { name: 'Amara Nwosu', role: 'Head of Community', country: '🇳🇬 Nigeria', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80' },
  { name: 'Kofi Mensah', role: 'Lead Designer', country: '🇬🇭 Ghana', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80' },
]

export const COMPANY_VALUES = [
  { title: 'Authenticity', desc: 'We believe Africa deserves to be represented on its own terms — not through a foreign lens.' },
  { title: 'Creator-first', desc: 'Contributors are the heart of 234photos. We build every feature with their success in mind.' },
  { title: 'Quality', desc: 'Every asset is reviewed by our team to ensure it meets our standards for technical quality and cultural authenticity.' },
  { title: 'Community', desc: 'We\'re building more than a marketplace — we\'re fostering a community of African creatives supporting each other.' },
]

export const FEATURED_COLLECTIONS = [
  { slug: 'african-entrepreneurs', title: 'African Entrepreneurs', count: '320K', desc: 'Business leaders, founders and innovators across the continent.', images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80', 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80'] },
  { slug: 'pan-african-festivals', title: 'Pan-African Festivals', count: '180K', desc: 'Celebrations, carnivals and cultural events from Lagos to Cape Town.', images: ['https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&q=80', 'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=400&q=80', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80'] },
  { slug: 'african-fashion', title: 'African Fashion', count: '250K', desc: 'Contemporary and traditional fashion from across the continent.', images: ['https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80', 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&q=80'] },
  { slug: 'african-cuisine', title: 'African Cuisine', count: '140K', desc: 'Traditional dishes, street food and modern African gastronomy.', images: ['https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80'] },
  { slug: 'african-wildlife', title: 'African Wildlife', count: '420K', desc: 'Safari, conservation and the incredible biodiversity of Africa.', images: ['https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80', 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=400&q=80', 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=400&q=80'] },
  { slug: 'african-tech', title: 'African Tech', count: '95K', desc: 'Innovation hubs, startups and the digital revolution across Africa.', images: ['https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80', 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&q=80', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80'] },
]

export const SPECIALTIES = [
  'Business', 'Fashion', 'Food & Cuisine', 'Nature', 'Sports', 
  'Technology', 'Culture', 'Architecture', 'Lifestyle', 'Music',
  'Portrait', 'Street', 'Documentary', 'Editorial'
]

export const UPLOAD_CATEGORIES = [
  'Business', 'Fashion', 'Food & Cuisine', 'Nature', 'Sports', 
  'Technology', 'Culture', 'Architecture', 'Lifestyle', 'Music'
]

export const AI_TAGS: Record<string, string[]> = {
  default: ['africa', 'authentic', 'photography', 'stock', 'creative'],
}

// Legal page sections
export const TERMS_SECTIONS = [
  { title: '1. Acceptance of Terms', body: 'By accessing or using 234photos, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.' },
  { title: '2. Use Licence', body: 'Permission is granted to temporarily download one copy of the materials on 234photos for personal, non-commercial transitory viewing only. This is the grant of a licence, not a transfer of title, and under this licence you may not modify or copy the materials; use the materials for any commercial purpose; attempt to decompile or reverse engineer any software contained on 234photos; remove any copyright or other proprietary notations from the materials; or transfer the materials to another person or "mirror" the materials on any other server.' },
  { title: '3. Disclaimer', body: 'The materials on 234photos are provided on an "as is" basis. 234photos makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.' },
  { title: '4. Limitations', body: 'In no event shall 234photos or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on 234photos, even if 234photos or a 234photos authorized representative has been notified orally or in writing of the possibility of such damage.' },
]

export const PRIVACY_SECTIONS = [
  { title: '1. Information We Collect', body: 'We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This includes your name, email address, payment information, and any content you upload. We also collect information automatically when you use our services, including log data, device information, and cookies.' },
  { title: '2. How We Use Your Information', body: 'We use the information we collect to provide, maintain, and improve our services; process transactions and send related information; send promotional communications (with your consent); respond to comments and questions; and monitor and analyse trends and usage.' },
  { title: '3. Information Sharing', body: 'We do not sell your personal information. We may share your information with service providers who perform services on our behalf, when required by law, or with your consent. Contributors\' public profiles and uploaded content are visible to all users.' },
  { title: '4. Data Security', body: 'We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.' },
  { title: '5. Your Rights', body: 'You have the right to access, correct, or delete your personal information. You can also object to processing, request data portability, and withdraw consent. Contact us at privacy@234photos.com to exercise these rights.' },
]

export const COOKIES_SECTIONS = [
  { title: 'What are cookies?', body: 'Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.' },
  { title: 'How we use cookies', body: 'We use cookies to keep you signed in, remember your preferences (such as language and currency), understand how you use our site so we can improve it, and show you relevant content and advertising.' },
  { title: 'Types of cookies we use', body: 'Essential cookies: Required for the website to function. Performance cookies: Help us understand how visitors use our site. Functionality cookies: Remember your preferences. Advertising cookies: Show you relevant ads based on your interests.' },
  { title: 'Managing cookies', body: 'You can control and manage cookies through your browser settings. Please note that removing or blocking cookies may impact your user experience and some features may no longer work.' },
]

// Media type tabs (used across search interfaces)
export const MEDIA_TABS = ['Photos', 'Videos', 'Footage', 'Vectors', 'Illustrations', 'Music', 'Templates', '3D']
