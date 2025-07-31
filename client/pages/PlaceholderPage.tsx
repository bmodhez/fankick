import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

import { ArrowLeft, Construction } from 'lucide-react'

interface PlaceholderPageProps {
  title: string
  description: string
}

export default function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="text-center">
          <CardContent className="py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
              <Construction className="w-12 h-12 text-primary" />
            </div>
            
            <h1 className="text-3xl font-sport font-bold text-black mb-4">
              {title}
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              {description}
            </p>
            
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                This page is currently under construction. Check back soon for amazing football merchandise!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/">
                  <Button className="bg-primary text-black hover:bg-primary/90">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                  </Button>
                </Link>
                
                <Button variant="outline">
                  Notify When Ready
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
