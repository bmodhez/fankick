import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { Shield, Lock, User, Settings } from "lucide-react";

export function QuickAdminAccess() {
  const [email, setEmail] = useState("modhbhavin05@gmail.com");
  const [password, setPassword] = useState("Bhavin@111005");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleAdminLogin = async () => {
    setIsLoading(true);
    setError("");
    
    try {
      const success = await login(email, password);
      if (success) {
        navigate("/admin/products");
      } else {
        setError("Invalid admin credentials");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const quickAccess = () => {
    navigate("/admin/test");
  };

  const quickImages = () => {
    navigate("/admin/images");
  };

  return (
    <Card className="w-full max-w-md bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <Shield className="w-5 h-5 text-primary" />
          <span>Quick Admin Access</span>
        </CardTitle>
        <p className="text-gray-400 text-sm">
          Fast access to admin panel for testing
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Admin Email
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="Admin email"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Password
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="Admin password"
            />
          </div>
          
          {error && (
            <div className="p-2 bg-red-500/20 border border-red-500 rounded text-red-300 text-sm">
              {error}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Button 
            onClick={handleAdminLogin}
            disabled={isLoading}
            className="w-full bg-primary text-black hover:bg-primary/90"
          >
            <User className="w-4 h-4 mr-2" />
            {isLoading ? "Logging in..." : "Login as Admin"}
          </Button>
          
          <div className="grid grid-cols-1 gap-2">
            <Button
              onClick={quickAccess}
              variant="outline"
              className="w-full border-gray-600 text-gray-300"
            >
              <Settings className="w-4 h-4 mr-2" />
              Test Suite
            </Button>

            <Button
              onClick={quickImages}
              variant="outline"
              className="w-full border-gray-600 text-gray-300"
            >
              <FolderOpen className="w-4 h-4 mr-2" />
              📁 Folder Upload
            </Button>
          </div>
        </div>

        <div className="mt-4 p-3 bg-gray-700 rounded-lg">
          <h4 className="text-sm font-medium text-white mb-2">Admin Features:</h4>
          <ul className="text-xs text-gray-400 space-y-1">
            <li>• Complete Product CRUD Operations</li>
            <li>• 📁 Folder Upload & Drag-Drop</li>
            <li>• Bulk Image Management</li>
            <li>• Advanced Variant Management</li>
            <li>• Real-time Search & Filtering</li>
            <li>• Stock Tracking & Analytics</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
