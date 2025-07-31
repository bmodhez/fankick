import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Globe,
  Eye,
  MousePointer,
  Package,
  Star,
  ArrowUp,
  ArrowDown,
  Download,
  Calendar,
  Filter,
  MoreVertical
} from 'lucide-react'

interface MetricCardProps {
  title: string
  value: string
  change: string
  trend: 'up' | 'down'
  icon: React.ElementType
  color: string
}

function MetricCard({ title, value, change, trend, icon: Icon, color }: MetricCardProps) {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-white mt-1">{value}</p>
            <div className="flex items-center mt-2">
              {trend === 'up' ? (
                <ArrowUp className="h-3 w-3 text-green-400 mr-1" />
              ) : (
                <ArrowDown className="h-3 w-3 text-red-400 mr-1" />
              )}
              <span className={`text-xs ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                {change}
              </span>
              <span className="text-xs text-gray-500 ml-1">vs last month</span>
            </div>
          </div>
          <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function Dashboard() {
  const [timeRange, setTimeRange] = useState('7d')

  const metrics = [
    {
      title: 'Total Revenue',
      value: '₹2,45,680',
      change: '+12.5%',
      trend: 'up' as const,
      icon: DollarSign,
      color: 'bg-green-600'
    },
    {
      title: 'Total Orders',
      value: '1,243',
      change: '+8.2%',
      trend: 'up' as const,
      icon: ShoppingCart,
      color: 'bg-blue-600'
    },
    {
      title: 'New Customers',
      value: '342',
      change: '+23.1%',
      trend: 'up' as const,
      icon: Users,
      color: 'bg-purple-600'
    },
    {
      title: 'Conversion Rate',
      value: '3.24%',
      change: '-0.8%',
      trend: 'down' as const,
      icon: TrendingUp,
      color: 'bg-orange-600'
    }
  ]

  const topProducts = [
    {
      id: 1,
      name: 'Messi Inter Miami Jersey 2024',
      category: 'Football',
      sales: 156,
      revenue: '₹12,48,444',
      image: '/placeholder.svg',
      trend: '+15%'
    },
    {
      id: 2,
      name: 'Naruto Akatsuki Ring Set',
      category: 'Anime',
      sales: 234,
      revenue: '₹4,67,766',
      image: '/placeholder.svg',
      trend: '+28%'
    },
    {
      id: 3,
      name: 'Taylor Swift Eras Hoodie',
      category: 'Pop Culture',
      sales: 89,
      revenue: '₹3,38,111',
      image: '/placeholder.svg',
      trend: '+7%'
    },
    {
      id: 4,
      name: 'Ronaldo Al Nassr Jersey',
      category: 'Football',
      sales: 124,
      revenue: '₹10,53,876',
      image: '/placeholder.svg',
      trend: '+12%'
    }
  ]

  const countryData = [
    { country: 'India', flag: '🇮🇳', orders: 456, revenue: '₹1,23,450', percentage: 45.2 },
    { country: 'USA', flag: '🇺🇸', orders: 234, revenue: '₹67,890', percentage: 23.1 },
    { country: 'UK', flag: '🇬🇧', orders: 123, revenue: '₹34,567', percentage: 12.3 },
    { country: 'Germany', flag: '🇩🇪', orders: 89, revenue: '₹23,456', percentage: 8.8 },
    { country: 'Canada', flag: '🇨🇦', orders: 67, revenue: '₹18,234', percentage: 6.7 },
    { country: 'Others', flag: '🌍', orders: 43, revenue: '₹12,345', percentage: 3.9 }
  ]

  const recentActivity = [
    {
      type: 'order',
      message: 'New order #FK2024001 from John Doe',
      time: '2 minutes ago',
      amount: '₹2,999',
      status: 'success'
    },
    {
      type: 'product',
      message: 'Low stock alert: Messi Jersey (S)',
      time: '15 minutes ago',
      amount: '3 left',
      status: 'warning'
    },
    {
      type: 'customer',
      message: 'New customer registration: Sarah Wilson',
      time: '1 hour ago',
      amount: null,
      status: 'info'
    },
    {
      type: 'refund',
      message: 'Refund processed for order #FK2024000',
      time: '2 hours ago',
      amount: '₹1,599',
      status: 'error'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Dashboard Overview</h2>
          <p className="text-gray-400">Welcome back! Here's what's happening with your store.</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <Button className="bg-primary text-black hover:bg-primary/90">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">Revenue Trend</CardTitle>
              <Button variant="ghost" size="sm" className="text-gray-400">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-primary mx-auto mb-2" />
                <p className="text-gray-400">Revenue chart visualization</p>
                <p className="text-xs text-gray-500">Integration with chart library needed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Traffic Sources */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-300">Direct</span>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">45.2%</p>
                  <p className="text-xs text-gray-400">2,340 visits</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-300">Social Media</span>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">28.7%</p>
                  <p className="text-xs text-gray-400">1,485 visits</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-300">Search Engines</span>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">18.9%</p>
                  <p className="text-xs text-gray-400">978 visits</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-300">Email</span>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">7.2%</p>
                  <p className="text-xs text-gray-400">372 visits</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Products and Country Sales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">🔥 Top Selling Products</CardTitle>
              <Button variant="ghost" size="sm" className="text-primary">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.id} className="flex items-center space-x-4 p-3 bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-center w-8 h-8 bg-gray-600 rounded-full text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-10 h-10 rounded object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{product.name}</p>
                    <p className="text-xs text-gray-400">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-white">{product.revenue}</p>
                    <div className="flex items-center space-x-1">
                      <span className="text-xs text-gray-400">{product.sales} sales</span>
                      <Badge className="bg-green-600 text-white text-xs">
                        {product.trend}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Country-wise Sales */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">🌍 Country-wise Sales</CardTitle>
              <Button variant="ghost" size="sm" className="text-primary">
                View Map
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {countryData.map((country, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{country.flag}</span>
                    <div>
                      <p className="text-sm font-medium text-white">{country.country}</p>
                      <p className="text-xs text-gray-400">{country.orders} orders</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-white">{country.revenue}</p>
                    <p className="text-xs text-gray-400">{country.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">⚡ Recent Activity</CardTitle>
            <Button variant="ghost" size="sm" className="text-primary">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 bg-gray-700 rounded-lg">
                <div className={`w-2 h-2 rounded-full ${
                  activity.status === 'success' ? 'bg-green-500' :
                  activity.status === 'warning' ? 'bg-yellow-500' :
                  activity.status === 'error' ? 'bg-red-500' : 'bg-blue-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm text-white">{activity.message}</p>
                  <p className="text-xs text-gray-400">{activity.time}</p>
                </div>
                {activity.amount && (
                  <Badge className={`${
                    activity.status === 'success' ? 'bg-green-600' :
                    activity.status === 'warning' ? 'bg-yellow-600' :
                    activity.status === 'error' ? 'bg-red-600' : 'bg-blue-600'
                  } text-white`}>
                    {activity.amount}
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
