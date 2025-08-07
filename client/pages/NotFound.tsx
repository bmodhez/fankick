import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { 
  Home, 
  Search, 
  ArrowLeft, 
  AlertTriangle,
  Zap,
  ShoppingBag
} from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Illustration */}
          <div className="relative mb-8">
            <div className="text-[120px] sm:text-[150px] font-bold text-primary/20 leading-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-gradient-to-r from-primary via-cyan-500 to-purple-500 rounded-full p-6 animate-pulse">
                <AlertTriangle className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-3xl sm:text-4xl font-sport font-bold text-foreground mb-4">
            Oops! Page Not Found
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>

          {/* Quick Actions */}
          <Card className="mb-8 bg-card border-border">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                What would you like to do?
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link to="/">
                  <Button className="w-full bg-primary text-black hover:bg-primary/90">
                    <Home className="w-4 h-4 mr-2" />
                    Go Home
                  </Button>
                </Link>
                
                <Link to="/search">
                  <Button variant="outline" className="w-full">
                    <Search className="w-4 h-4 mr-2" />
                    Search Products
                  </Button>
                </Link>
                
                <Link to="/trending">
                  <Button variant="outline" className="w-full">
                    <Zap className="w-4 h-4 mr-2" />
                    Trending Now
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Popular Categories */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Or browse our popular categories:
            </h3>
            
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/category/football">
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                  ⚽ Football
                </Button>
              </Link>
              
              <Link to="/category/anime">
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                  🎌 Anime
                </Button>
              </Link>
              
              <Link to="/category/pop-culture">
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                  🎭 Pop Culture
                </Button>
              </Link>
              
              <Link to="/collections">
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                  ✨ Collections
                </Button>
              </Link>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-8">
            <Button 
              variant="ghost" 
              onClick={() => window.history.back()}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NotFound;
