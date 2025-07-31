export interface ProductVariant {
  id: string
  size?: string
  color?: string
  price: number
  originalPrice: number
  stock: number
  sku: string
}

export interface Product {
  id: string
  name: string
  description: string
  category: 'football' | 'anime' | 'pop-culture'
  subcategory: string
  images: string[]
  variants: ProductVariant[]
  basePrice: number
  originalPrice: number
  rating: number
  reviews: number
  tags: string[]
  badges: string[]
  shippingDays: number
  codAvailable: boolean
  isTrending: boolean
  isExclusive: boolean
  stockAlert?: string
  brand?: string
  materials?: string[]
  features?: string[]
  sizeGuide?: {
    sizes: string[]
    measurements: Record<string, string>
  }
}

export const PRODUCTS: Product[] = [
  // Football Products
  {
    id: 'messi-inter-miami-jersey',
    name: 'Lionel Messi Inter Miami CF Jersey 2024 - Official Home Kit',
    description: 'Official Lionel Messi Inter Miami CF home jersey for the 2024 season. Premium quality moisture-wicking fabric with official team badges, sponsors, and Messi\'s iconic number 10. Perfect for true football fans and collectors.',
    category: 'football',
    subcategory: 'jerseys',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    variants: [
      { id: 'messi-s', size: 'S', price: 7999, originalPrice: 9999, stock: 5, sku: 'MES-MIA-S' },
      { id: 'messi-m', size: 'M', price: 7999, originalPrice: 9999, stock: 12, sku: 'MES-MIA-M' },
      { id: 'messi-l', size: 'L', price: 7999, originalPrice: 9999, stock: 8, sku: 'MES-MIA-L' },
      { id: 'messi-xl', size: 'XL', price: 7999, originalPrice: 9999, stock: 3, sku: 'MES-MIA-XL' },
      { id: 'messi-xxl', size: 'XXL', price: 8499, originalPrice: 10499, stock: 2, sku: 'MES-MIA-XXL' }
    ],
    basePrice: 7999,
    originalPrice: 9999,
    rating: 4.9,
    reviews: 2847,
    tags: ['Messi', 'Inter Miami', 'MLS', 'Official', 'Limited Edition'],
    badges: ['FanKick Exclusive', 'Limited Stock', 'Ships Worldwide'],
    shippingDays: 7,
    codAvailable: true,
    isTrending: true,
    isExclusive: true,
    stockAlert: 'Only 3 left in XL!',
    brand: 'Adidas',
    materials: ['100% Polyester', 'Moisture-wicking fabric', 'Official team badges'],
    features: ['Official Messi name & number', 'Team crest and sponsors', 'Authentic fit', 'Machine washable'],
    sizeGuide: {
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      measurements: {
        'S': 'Chest: 36-38"',
        'M': 'Chest: 38-40"',
        'L': 'Chest: 40-42"',
        'XL': 'Chest: 42-44"',
        'XXL': 'Chest: 44-46"'
      }
    }
  },
  {
    id: 'ronaldo-al-nassr-jersey',
    name: 'Cristiano Ronaldo Al Nassr Jersey 2024 - Official Saudi League Kit',
    description: 'Official Cristiano Ronaldo Al Nassr jersey featuring the iconic CR7 branding. Premium quality with official Saudi Pro League badges and Ronaldo\'s legendary number 7.',
    category: 'football',
    subcategory: 'jerseys',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    variants: [
      { id: 'ronaldo-s', size: 'S', price: 8499, originalPrice: 10999, stock: 8, sku: 'CR7-NAS-S' },
      { id: 'ronaldo-m', size: 'M', price: 8499, originalPrice: 10999, stock: 15, sku: 'CR7-NAS-M' },
      { id: 'ronaldo-l', size: 'L', price: 8499, originalPrice: 10999, stock: 12, sku: 'CR7-NAS-L' },
      { id: 'ronaldo-xl', size: 'XL', price: 8499, originalPrice: 10999, stock: 6, sku: 'CR7-NAS-XL' }
    ],
    basePrice: 8499,
    originalPrice: 10999,
    rating: 4.8,
    reviews: 1923,
    tags: ['Ronaldo', 'Al Nassr', 'Saudi League', 'CR7', 'Official'],
    badges: ['Ships Worldwide', 'Trending Now'],
    shippingDays: 8,
    codAvailable: true,
    isTrending: true,
    isExclusive: false,
    brand: 'Nike',
    materials: ['Dri-FIT technology', '100% Polyester'],
    features: ['Official CR7 name & number', 'Al Nassr crest', 'Saudi Pro League badges']
  },
  {
    id: 'football-boots-predator',
    name: 'Adidas Predator Elite Football Boots - Messi Edition',
    description: 'Professional-grade football boots inspired by Messi\'s playing style. Features advanced grip technology, lightweight design, and superior ball control for the perfect game.',
    category: 'football',
    subcategory: 'boots',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    variants: [
      { id: 'boots-38', size: '6 (EU 38)', price: 12999, originalPrice: 15999, stock: 4, sku: 'PRED-38' },
      { id: 'boots-39', size: '7 (EU 39)', price: 12999, originalPrice: 15999, stock: 8, sku: 'PRED-39' },
      { id: 'boots-40', size: '8 (EU 40)', price: 12999, originalPrice: 15999, stock: 6, sku: 'PRED-40' },
      { id: 'boots-41', size: '9 (EU 41)', price: 12999, originalPrice: 15999, stock: 3, sku: 'PRED-41' },
      { id: 'boots-42', size: '10 (EU 42)', price: 12999, originalPrice: 15999, stock: 2, sku: 'PRED-42' }
    ],
    basePrice: 12999,
    originalPrice: 15999,
    rating: 4.7,
    reviews: 892,
    tags: ['Football Boots', 'Messi', 'Predator', 'Professional', 'Elite'],
    badges: ['Limited Stock', 'Professional Grade'],
    shippingDays: 12,
    codAvailable: false,
    isTrending: false,
    isExclusive: true,
    stockAlert: 'Low stock alert!',
    brand: 'Adidas',
    features: ['Advanced grip technology', 'Lightweight design', 'Superior ball control', 'Professional grade']
  },

  // Anime Products
  {
    id: 'naruto-akatsuki-ring-set',
    name: 'Naruto Akatsuki Ring Set - Complete 10 Ring Collection',
    description: 'Complete set of 10 official Akatsuki rings from Naruto series. High-quality metal construction with authentic engravings. Perfect for cosplay and collectors.',
    category: 'anime',
    subcategory: 'rings',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    variants: [
      { id: 'akatsuki-full', size: 'Full Set', price: 1999, originalPrice: 3299, stock: 25, sku: 'NAR-AKA-SET' },
      { id: 'akatsuki-single', size: 'Single Ring', price: 299, originalPrice: 499, stock: 150, sku: 'NAR-AKA-1' }
    ],
    basePrice: 1999,
    originalPrice: 3299,
    rating: 4.7,
    reviews: 1523,
    tags: ['Naruto', 'Akatsuki', 'Rings', 'Cosplay', 'Collector'],
    badges: ['Fast Selling', 'Ships Worldwide'],
    shippingDays: 10,
    codAvailable: true,
    isTrending: true,
    isExclusive: false,
    stockAlert: 'Fast selling!',
    materials: ['High-quality metal alloy', 'Anti-tarnish coating'],
    features: ['Complete 10-ring set', 'Authentic engravings', 'Adjustable sizes', 'Gift box included']
  },
  {
    id: 'chainsaw-man-hoodie',
    name: 'Chainsaw Man Denji Hoodie - Premium Anime Streetwear',
    description: 'Premium quality Chainsaw Man hoodie featuring Denji artwork. Ultra-soft cotton blend with kangaroo pocket and adjustable hood. Perfect for anime fans and streetwear enthusiasts.',
    category: 'anime',
    subcategory: 'hoodies',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    variants: [
      { id: 'chainsaw-s-black', size: 'S', color: 'Black', price: 2499, originalPrice: 3499, stock: 12, sku: 'CSM-S-BLK' },
      { id: 'chainsaw-m-black', size: 'M', color: 'Black', price: 2499, originalPrice: 3499, stock: 18, sku: 'CSM-M-BLK' },
      { id: 'chainsaw-l-black', size: 'L', color: 'Black', price: 2499, originalPrice: 3499, stock: 15, sku: 'CSM-L-BLK' },
      { id: 'chainsaw-xl-black', size: 'XL', color: 'Black', price: 2499, originalPrice: 3499, stock: 8, sku: 'CSM-XL-BLK' },
      { id: 'chainsaw-s-white', size: 'S', color: 'White', price: 2499, originalPrice: 3499, stock: 10, sku: 'CSM-S-WHT' },
      { id: 'chainsaw-m-white', size: 'M', color: 'White', price: 2499, originalPrice: 3499, stock: 14, sku: 'CSM-M-WHT' },
      { id: 'chainsaw-l-white', size: 'L', color: 'White', price: 2499, originalPrice: 3499, stock: 11, sku: 'CSM-L-WHT' }
    ],
    basePrice: 2499,
    originalPrice: 3499,
    rating: 4.6,
    reviews: 987,
    tags: ['Chainsaw Man', 'Denji', 'Hoodie', 'Anime', 'Streetwear'],
    badges: ['Back in Stock', 'Premium Quality'],
    shippingDays: 10,
    codAvailable: true,
    isTrending: false,
    isExclusive: false,
    stockAlert: 'Back in stock!',
    materials: ['80% Cotton, 20% Polyester', 'Pre-shrunk fabric'],
    features: ['Premium anime artwork', 'Kangaroo pocket', 'Adjustable hood', 'Unisex design']
  },
  {
    id: 'demon-slayer-necklace',
    name: 'Demon Slayer Tanjiro Hanafuda Earrings Necklace Set',
    description: 'Beautiful Demon Slayer inspired necklace featuring Tanjiro\'s iconic Hanafuda earrings design. Hypoallergenic materials with adjustable chain length.',
    category: 'anime',
    subcategory: 'necklaces',
    images: ['/placeholder.svg', '/placeholder.svg'],
    variants: [
      { id: 'tanjiro-necklace', size: 'One Size', price: 899, originalPrice: 1299, stock: 35, sku: 'DS-TAN-NECK' }
    ],
    basePrice: 899,
    originalPrice: 1299,
    rating: 4.5,
    reviews: 654,
    tags: ['Demon Slayer', 'Tanjiro', 'Necklace', 'Hanafuda', 'Jewelry'],
    badges: ['Hypoallergenic', 'Adjustable'],
    shippingDays: 8,
    codAvailable: true,
    isTrending: false,
    isExclusive: false,
    materials: ['Stainless steel', 'Hypoallergenic coating'],
    features: ['Authentic Hanafuda design', 'Adjustable chain 16-20"', 'Gift box included']
  },

  // Pop Culture Products
  {
    id: 'taylor-swift-eras-hoodie',
    name: 'Taylor Swift Eras Tour Hoodie - Official Merchandise',
    description: 'Official Taylor Swift Eras Tour hoodie featuring iconic tour artwork. Premium cotton blend with embroidered details and tour dates on the back.',
    category: 'pop-culture',
    subcategory: 'hoodies',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    variants: [
      { id: 'eras-s-lavender', size: 'S', color: 'Lavender', price: 3799, originalPrice: 5499, stock: 8, sku: 'TS-ERAS-S-LAV' },
      { id: 'eras-m-lavender', size: 'M', color: 'Lavender', price: 3799, originalPrice: 5499, stock: 12, sku: 'TS-ERAS-M-LAV' },
      { id: 'eras-l-lavender', size: 'L', color: 'Lavender', price: 3799, originalPrice: 5499, stock: 6, sku: 'TS-ERAS-L-LAV' },
      { id: 'eras-xl-lavender', size: 'XL', color: 'Lavender', price: 3799, originalPrice: 5499, stock: 4, sku: 'TS-ERAS-XL-LAV' },
      { id: 'eras-s-black', size: 'S', color: 'Black', price: 3799, originalPrice: 5499, stock: 10, sku: 'TS-ERAS-S-BLK' },
      { id: 'eras-m-black', size: 'M', color: 'Black', price: 3799, originalPrice: 5499, stock: 15, sku: 'TS-ERAS-M-BLK' }
    ],
    basePrice: 3799,
    originalPrice: 5499,
    rating: 4.8,
    reviews: 3921,
    tags: ['Taylor Swift', 'Eras Tour', 'Official', 'Limited Edition', 'Concert'],
    badges: ['Limited Edition', 'Official Merch', 'Ships Worldwide'],
    shippingDays: 14,
    codAvailable: false,
    isTrending: true,
    isExclusive: true,
    stockAlert: 'Limited edition - few left!',
    materials: ['Premium cotton blend', 'Embroidered details'],
    features: ['Official tour merchandise', 'Embroidered artwork', 'Tour dates on back', 'Limited edition']
  },
  {
    id: 'bts-dynamite-tshirt',
    name: 'BTS Dynamite Official T-Shirt - K-Pop Merchandise',
    description: 'Official BTS Dynamite era t-shirt featuring colorful artwork and member signatures. Comfortable cotton fabric with vibrant print that won\'t fade.',
    category: 'pop-culture',
    subcategory: 'tshirts',
    images: ['/placeholder.svg', '/placeholder.svg'],
    variants: [
      { id: 'bts-s', size: 'S', price: 1599, originalPrice: 2299, stock: 20, sku: 'BTS-DYN-S' },
      { id: 'bts-m', size: 'M', price: 1599, originalPrice: 2299, stock: 25, sku: 'BTS-DYN-M' },
      { id: 'bts-l', size: 'L', price: 1599, originalPrice: 2299, stock: 18, sku: 'BTS-DYN-L' },
      { id: 'bts-xl', size: 'XL', price: 1599, originalPrice: 2299, stock: 12, sku: 'BTS-DYN-XL' }
    ],
    basePrice: 1599,
    originalPrice: 2299,
    rating: 4.7,
    reviews: 2156,
    tags: ['BTS', 'K-pop', 'Dynamite', 'Official', 'ARMY'],
    badges: ['Official BTS Merch', 'ARMY Approved'],
    shippingDays: 12,
    codAvailable: true,
    isTrending: true,
    isExclusive: false,
    materials: ['100% Cotton', 'Fade-resistant print'],
    features: ['Official BTS merchandise', 'Member signatures', 'Vibrant colors', 'Comfortable fit']
  },
  {
    id: 'marvel-spiderman-hoodie',
    name: 'Marvel Spider-Man No Way Home Hoodie - Premium Superhero Apparel',
    description: 'Official Marvel Spider-Man No Way Home hoodie featuring the three Spider-Men. Premium quality with detailed graphics and comfortable fit for superhero fans.',
    category: 'pop-culture',
    subcategory: 'hoodies',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    variants: [
      { id: 'spidey-s-red', size: 'S', color: 'Red', price: 2999, originalPrice: 4299, stock: 15, sku: 'MAR-SM-S-RED' },
      { id: 'spidey-m-red', size: 'M', color: 'Red', price: 2999, originalPrice: 4299, stock: 22, sku: 'MAR-SM-M-RED' },
      { id: 'spidey-l-red', size: 'L', color: 'Red', price: 2999, originalPrice: 4299, stock: 18, sku: 'MAR-SM-L-RED' },
      { id: 'spidey-xl-red', size: 'XL', color: 'Red', price: 2999, originalPrice: 4299, stock: 10, sku: 'MAR-SM-XL-RED' },
      { id: 'spidey-s-black', size: 'S', color: 'Black', price: 2999, originalPrice: 4299, stock: 12, sku: 'MAR-SM-S-BLK' },
      { id: 'spidey-m-black', size: 'M', color: 'Black', price: 2999, originalPrice: 4299, stock: 16, sku: 'MAR-SM-M-BLK' }
    ],
    basePrice: 2999,
    originalPrice: 4299,
    rating: 4.6,
    reviews: 1387,
    tags: ['Marvel', 'Spider-Man', 'No Way Home', 'Superhero', 'Official'],
    badges: ['Marvel Official', 'Superhero Collection'],
    shippingDays: 11,
    codAvailable: true,
    isTrending: false,
    isExclusive: false,
    materials: ['Cotton-polyester blend', 'Official Marvel licensing'],
    features: ['Three Spider-Men artwork', 'Detailed graphics', 'Official Marvel merchandise', 'Comfortable hood']
  }
]

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find(product => product.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return PRODUCTS.filter(product => product.category === category)
}

export function getTrendingProducts(limit: number = 8): Product[] {
  return PRODUCTS.filter(product => product.isTrending).slice(0, limit)
}

export function getProductsBySubcategory(subcategory: string): Product[] {
  return PRODUCTS.filter(product => product.subcategory === subcategory)
}

export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase()
  return PRODUCTS.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  )
}
