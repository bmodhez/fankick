import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp,
  BarChart3,
  PieChart,
  Download,
  Calendar,
  Globe,
  Users,
  ShoppingCart,
  DollarSign,
  Eye,
  MousePointer,
  Smartphone,
  Monitor,
  ArrowUp,
  ArrowDown,
  Filter
} from 'lucide-react'

interface MetricCardProps {
  title: string
  value: string
  change: string
  trend: 'up' | 'down'
  icon: React.ElementType
  timeframe: string
}

function MetricCard({ title, value, change, trend, icon: Icon, timeframe }: MetricCardProps) {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <div className="flex items-center space-x-1">
            {trend === 'up' ? (
              <ArrowUp className="w-4 h-4 text-green-400" />
            ) : (
              <ArrowDown className="w-4 h-4 text-red-400" />
            )}
            <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
              {change}
            </span>
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
          <p className="text-sm text-gray-400">{title}</p>
          <p className="text-xs text-gray-500 mt-1">{timeframe}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export function Analytics() {
  const [timeRange, setTimeRange] = useState('30d')
  const [reportType, setReportType] = useState('overview')

  const keyMetrics = [
    {
      title: 'Total Revenue',
      value: '₹12.45L',
      change: '+23.5%',
      trend: 'up' as const,
      icon: DollarSign,
      timeframe: 'vs last 30 days'
    },
    {
      title: 'Website Visits',
      value: '45.2K',
      change: '+18.2%',
      trend: 'up' as const,
      icon: Eye,
      timeframe: 'unique visitors'
    },
    {
      title: 'Conversion Rate',
      value: '3.24%',
      change: '-0.8%',
      trend: 'down' as const,
      icon: MousePointer,
      timeframe: 'visitor to customer'
    },
    {
      title: 'Avg Order Value',
      value: '₹2,890',
      change: '+12.1%',
      trend: 'up' as const,
      icon: ShoppingCart,
      timeframe: 'per transaction'
    }
  ]

  const topCountries = [
    { country: 'India', flag: '🇮🇳', sessions: 15420, revenue: '₹5.67L', conversion: '3.8%' },
    { country: 'USA', flag: '🇺🇸', sessions: 8930, revenue: '₹3.21L', conversion: '4.2%' },
    { country: 'UK', flag: '🇬🇧', sessions: 5640, revenue: '₹1.89L', conversion: '3.1%' },
    { country: 'Germany', flag: '🇩🇪', sessions: 4230, revenue: '₹1.45L', conversion: '3.5%' },
    { country: 'Canada', flag: '🇨🇦', sessions: 3180, revenue: '₹98K', conversion: '2.9%' }
  ]

  const deviceStats = [
    { device: 'Mobile', icon: Smartphone, percentage: 68.4, sessions: 30890, color: 'bg-blue-500' },
    { device: 'Desktop', icon: Monitor, percentage: 24.1, sessions: 10890, color: 'bg-green-500' },
    { device: 'Tablet', icon: Monitor, percentage: 7.5, sessions: 3380, color: 'bg-purple-500' }
  ]

  const productPerformance = [
    {
      category: 'Football',
      emoji: '⚽',
      revenue: '₹6.78L',
      orders: 2840,
      avgOrder: '₹2,387',
      growth: '+28%',
      trend: 'up'
    },
    {
      category: 'Anime',
      emoji: '🎌',
      revenue: '₹3.21L',
      orders: 1950,
      avgOrder: '₹1,646',
      growth: '+35%',
      trend: 'up'
    },
    {
      category: 'Pop Culture',
      emoji: '🎭',
      revenue: '₹2.46L',
      orders: 1120,
      avgOrder: '₹2,196',
      growth: '+15%',
      trend: 'up'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">📈 Analytics & Reports</h2>
          <p className="text-gray-400">Track performance and generate insights</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <Button className="bg-primary text-black hover:bg-primary/90">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {keyMetrics.map((metric, index) => (
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
              <div className="flex items-center space-x-2">
                <Badge className="bg-green-600 text-white">+23.5%</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 text-primary mx-auto mb-4" />
                <p className="text-gray-400">Revenue Chart</p>
                <p className="text-xs text-gray-500 mt-2">Chart.js integration would show revenue trends</p>
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
                  <span className="text-gray-300">Direct Traffic</span>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">45.2%</p>
                  <p className="text-xs text-gray-400">20,430 visits</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-300">Social Media</span>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">28.7%</p>
                  <p className="text-xs text-gray-400">12,980 visits</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-300">Search Engines</span>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">18.9%</p>
                  <p className="text-xs text-gray-400">8,540 visits</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-300">Email Marketing</span>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">7.2%</p>
                  <p className="text-xs text-gray-400">3,250 visits</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Geographic and Device Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Countries */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">🌍 Top Countries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCountries.map((country, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{country.flag}</span>
                    <div>
                      <p className="text-white font-medium">{country.country}</p>
                      <p className="text-xs text-gray-400">{country.sessions.toLocaleString()} sessions</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-primary font-bold">{country.revenue}</p>
                    <p className="text-xs text-gray-400">{country.conversion} conv. rate</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Device Breakdown */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">📱 Device Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deviceStats.map((device, index) => {
                const IconComponent = device.icon
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <IconComponent className="w-5 h-5 text-gray-400" />
                        <span className="text-white">{device.device}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-white font-medium">{device.percentage}%</span>
                        <p className="text-xs text-gray-400">{device.sessions.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className={`${device.color} h-2 rounded-full`}
                        style={{ width: `${device.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Product Performance */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">🎯 Category Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {productPerformance.map((category, index) => (
              <div key={index} className="bg-gray-700 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{category.emoji}</span>
                    <h3 className="text-lg font-semibold text-white">{category.category}</h3>
                  </div>
                  <Badge className={`${category.trend === 'up' ? 'bg-green-600' : 'bg-red-600'} text-white`}>
                    {category.growth}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Revenue</span>
                    <span className="text-white font-bold">{category.revenue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Orders</span>
                    <span className="text-white">{category.orders.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Avg Order</span>
                    <span className="text-white">{category.avgOrder}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">📊 Export Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="border-gray-600 text-gray-300 h-20 flex flex-col">
              <Download className="w-6 h-6 mb-2" />
              <span>Sales Report</span>
              <span className="text-xs text-gray-500">CSV Export</span>
            </Button>
            <Button variant="outline" className="border-gray-600 text-gray-300 h-20 flex flex-col">
              <BarChart3 className="w-6 h-6 mb-2" />
              <span>Analytics Report</span>
              <span className="text-xs text-gray-500">PDF Export</span>
            </Button>
            <Button variant="outline" className="border-gray-600 text-gray-300 h-20 flex flex-col">
              <Users className="w-6 h-6 mb-2" />
              <span>Customer Report</span>
              <span className="text-xs text-gray-500">Excel Export</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
