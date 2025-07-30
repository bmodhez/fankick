import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Navigation } from '@/components/Navigation'
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Truck, 
  Shield, 
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus
} from 'lucide-react'

export default function ProductPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)

  const product = {
    id: 1,
    name: 'Lionel Messi Inter Miami CF Jersey - Official Home Kit 2024',
    price: 2999,
    originalPrice: 3999,
    rating: 4.8,
    reviews: 1247,
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      '/placeholder.svg',
      '/placeholder.svg',
      '/placeholder.svg',
      '/placeholder.svg'
    ],
    description: 'Official Lionel Messi Inter Miami CF home jersey for the 2024 season. Premium quality fabric with moisture-wicking technology. Features official team badges and Messi\'s name and number.',
    features: [
      'Official Inter Miami CF merchandise',
      'Premium moisture-wicking fabric',
      'Official team badges and sponsors',
      'Messi name and number included',
      'Machine washable'
    ]
  }

  const reviews = [
    {
      id: 1,
      name: 'Arjun K.',
      rating: 5,
      date: '2 days ago',
      comment: 'Amazing quality! The jersey fits perfectly and the print quality is top-notch. Delivery was super fast.',
      verified: true
    },
    {
      id: 2,
      name: 'Priya S.',
      rating: 5,
      date: '1 week ago',
      comment: 'Got this for my brother and he absolutely loves it. Great material and authentic feel.',
      verified: true
    },
    {
      id: 3,
      name: 'Rohit M.',
      rating: 4,
      date: '2 weeks ago',
      comment: 'Good jersey but sizing runs a bit large. Quality is excellent though.',
      verified: true
    }
  ]

  const relatedProducts = [
    {
      name: 'Messi Phone Cover',
      price: 599,
      originalPrice: 899,
      image: '/placeholder.svg',
      rating: 4.6
    },
    {
      name: 'Inter Miami Cap',
      price: 1299,
      originalPrice: 1799,
      image: '/placeholder.svg',
      rating: 4.7
    },
    {
      name: 'Messi Signature Mug',
      price: 399,
      originalPrice: 599,
      image: '/placeholder.svg',
      rating: 4.5
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/players" className="hover:text-primary">Players</Link>
          <span>/</span>
          <Link to="/players/messi" className="hover:text-primary">Messi</Link>
          <span>/</span>
          <span className="text-gray-900">Jersey</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-4 left-4 bg-red-500 text-white">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </Badge>
              <div className="absolute top-4 right-4 space-y-2">
                <Button size="sm" variant="outline" className="bg-white">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="bg-white">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            {/* Thumbnail Images */}
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-primary' : 'border-gray-200'
                  }`}
                >
                  <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-sport font-bold text-black mb-2">
                {product.name}
              </h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
                <Badge variant="outline" className="text-primary border-primary">
                  In Stock
                </Badge>
              </div>

              <div className="flex items-center space-x-3 mb-6">
                <span className="text-3xl font-bold text-primary">₹{product.price}</span>
                <span className="text-xl text-gray-400 line-through">₹{product.originalPrice}</span>
                <Badge className="bg-red-100 text-red-800">
                  Save ₹{product.originalPrice - product.price}
                </Badge>
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-semibold mb-3">Size</h3>
              <div className="flex space-x-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 border rounded-lg font-medium ${
                      selectedSize === size 
                        ? 'border-primary bg-primary text-black' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-semibold mb-3">Quantity</h3>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-3">
              <Button 
                size="lg" 
                className="w-full bg-primary text-black hover:bg-primary/90 font-semibold py-4"
                disabled={!selectedSize}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart - ₹{(product.price * quantity).toLocaleString()}
              </Button>
              <Button size="lg" variant="outline" className="w-full py-4">
                Buy Now with COD
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 py-6 border-t border-gray-200">
              <div className="text-center">
                <Truck className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Free Delivery</p>
                <p className="text-xs text-gray-500">On orders above ₹999</p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Easy Returns</p>
                <p className="text-xs text-gray-500">15 days return policy</p>
              </div>
              <div className="text-center">
                <Shield className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Authentic</p>
                <p className="text-xs text-gray-500">100% genuine product</p>
              </div>
            </div>

            {/* Product Description */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Product Details</h3>
              <p className="text-gray-600">{product.description}</p>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-sport font-bold">Customer Reviews</h2>
            <Button variant="outline">Write a Review</Button>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">{product.rating}</div>
                  <div className="flex justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">{product.reviews} total reviews</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-2 space-y-6">
              {reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium">{review.name}</span>
                          {review.verified && (
                            <Badge variant="outline" className="text-xs">Verified Purchase</Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < review.rating 
                                    ? 'text-yellow-400 fill-current' 
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-sport font-bold mb-8">You might also like</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {relatedProducts.map((product, index) => (
              <Card key={index} className="group cursor-pointer hover:shadow-lg transition-all duration-300">
                <CardContent className="p-0">
                  <div className="relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-2 right-2 bg-red-500 text-white">Sale</Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 text-sm">{product.name}</h3>
                    <div className="flex items-center mb-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-primary">₹{product.price}</span>
                        <span className="text-gray-400 line-through text-sm ml-2">₹{product.originalPrice}</span>
                      </div>
                      <Button size="sm">Add to Cart</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
