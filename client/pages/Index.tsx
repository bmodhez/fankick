import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Footer } from '@/components/Footer'
import { Star, TrendingUp, Zap, ShoppingBag, Instagram } from 'lucide-react'

export default function Index() {
  const featuredPlayers = [
    {
      name: 'Lionel Messi',
      team: 'Inter Miami',
      image: '/placeholder.svg',
      trending: true,
      products: 156
    },
    {
      name: 'Cristiano Ronaldo',
      team: 'Al Nassr',
      image: '/placeholder.svg',
      trending: true,
      products: 203
    },
    {
      name: 'Kylian Mbappé',
      team: 'PSG',
      image: '/placeholder.svg',
      trending: false,
      products: 89
    }
  ]

  const featuredClubs = [
    {
      name: 'Al Nassr',
      league: 'Saudi Pro League',
      image: '/placeholder.svg',
      color: 'bg-yellow-500'
    },
    {
      name: 'PSG',
      league: 'Ligue 1',
      image: '/placeholder.svg',
      color: 'bg-blue-600'
    },
    {
      name: 'FC Barcelona',
      league: 'La Liga',
      image: '/placeholder.svg',
      color: 'bg-red-600'
    }
  ]

  const trendingProducts = [
    {
      name: 'Messi Miami Jersey',
      price: '₹2,999',
      originalPrice: '₹3,999',
      image: '/placeholder.svg',
      rating: 4.8,
      reviews: 1247
    },
    {
      name: 'Ronaldo Phone Cover',
      price: '₹599',
      originalPrice: '₹899',
      image: '/placeholder.svg',
      rating: 4.6,
      reviews: 543
    },
    {
      name: 'PSG Snapback Cap',
      price: '₹1,299',
      originalPrice: '₹1,799',
      image: '/placeholder.svg',
      rating: 4.7,
      reviews: 892
    },
    {
      name: 'Barcelona Mug',
      price: '₹399',
      originalPrice: '₹599',
      image: '/placeholder.svg',
      rating: 4.5,
      reviews: 234
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-black via-gray-900 to-black py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-6 bg-primary text-black font-semibold px-4 py-2">
              <Zap className="w-4 h-4 mr-2" />
              Global Football Merchandise
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-sport font-bold text-white mb-6">
              GEAR UP FOR
              <span className="block text-primary">GREATNESS</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              From Messi's magic to Ronaldo's power - get authentic football merchandise 
              from your favorite players and clubs. Fast delivery, COD available.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary text-black hover:bg-primary/90 font-semibold px-8 py-4">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Shop Now
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black px-8 py-4">
                View Trending
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Player Collections */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-sport font-bold text-black mb-4">
              PLAYER COLLECTIONS
            </h2>
            <p className="text-gray-600 text-lg">Official merchandise from football legends</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredPlayers.map((player, index) => (
              <Card key={index} className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative">
                    <img 
                      src={player.image} 
                      alt={player.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {player.trending && (
                      <Badge className="absolute top-4 left-4 bg-primary text-black">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading font-bold text-xl mb-2">{player.name}</h3>
                    <p className="text-gray-600 mb-4">{player.team}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{player.products} Products</span>
                      <Button variant="outline" size="sm">View Collection</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Club Collections */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-sport font-bold text-black mb-4">
              CLUB COLLECTIONS
            </h2>
            <p className="text-gray-600 text-lg">Support your favorite teams worldwide</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredClubs.map((club, index) => (
              <Card key={index} className="group cursor-pointer hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className={`h-32 ${club.color} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
                    <div className="absolute bottom-4 left-6 text-white">
                      <h3 className="font-heading font-bold text-2xl">{club.name}</h3>
                      <p className="text-white/80">{club.league}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <Button className="w-full" variant="outline">
                      Explore Collection
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-sport font-bold text-black mb-4">
              TRENDING NOW
            </h2>
            <p className="text-gray-600 text-lg">What football fans are buying right now</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product, index) => (
              <Card key={index} className="group cursor-pointer hover:shadow-lg transition-all duration-300">
                <CardContent className="p-0">
                  <div className="relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-2 right-2 bg-red-500 text-white">
                      Sale
                    </Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 text-sm">{product.name}</h3>
                    <div className="flex items-center mb-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-primary">{product.price}</span>
                        <span className="text-gray-400 line-through text-sm ml-2">
                          {product.originalPrice}
                        </span>
                      </div>
                      <Button size="sm">Add to Cart</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Accessories Section */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-sport font-bold mb-4">
              FOOTBALL ACCESSORIES
            </h2>
            <p className="text-gray-300 text-lg">Complete your fan collection</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group cursor-pointer">
              <div className="bg-primary rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-3xl">📱</span>
              </div>
              <h3 className="font-heading font-bold text-xl mb-2">Phone Covers</h3>
              <p className="text-gray-300 mb-4">Protect your phone with style</p>
              <Link to="/accessories/phone-covers">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                  Shop Now
                </Button>
              </Link>
            </div>
            
            <div className="text-center group cursor-pointer">
              <div className="bg-primary rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-3xl">☕</span>
              </div>
              <h3 className="font-heading font-bold text-xl mb-2">Mugs & Bottles</h3>
              <p className="text-gray-300 mb-4">Drink like a champion</p>
              <Link to="/accessories/drinkware">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                  Shop Now
                </Button>
              </Link>
            </div>
            
            <div className="text-center group cursor-pointer">
              <div className="bg-primary rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-3xl">🧢</span>
              </div>
              <h3 className="font-heading font-bold text-xl mb-2">Caps & Hats</h3>
              <p className="text-gray-300 mb-4">Top off your fan gear</p>
              <Link to="/accessories/headwear">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                  Shop Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Feed */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-sport font-bold text-black mb-4">
              FOLLOW US
            </h2>
            <p className="text-gray-600 text-lg mb-6">See how fans rock their FanKick gear</p>
            <Button className="bg-primary text-black hover:bg-primary/90">
              <Instagram className="w-4 h-4 mr-2" />
              @fankick_official
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded-lg overflow-hidden group cursor-pointer">
                <img 
                  src="/placeholder.svg" 
                  alt={`Instagram post ${i}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
