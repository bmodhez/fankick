import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Smartphone,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [loginMode, setLoginMode] = useState<"email" | "phone">("email");

  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      const redirectTo = (location.state as any)?.from?.pathname || "/";
      navigate(redirectTo, { replace: true });
    }
  }, [user, navigate, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const result = await login(email, password);

    if (result.success) {
      const redirectTo = (location.state as any)?.from?.pathname || "/";
      navigate(redirectTo, { replace: true });
    } else {
      setError(result.error || "Login failed. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      {/* Back to home button */}
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Back to FanKick</span>
      </Link>

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-primary via-cyan-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">⚡</span>
            </div>
            <span className="font-sport font-bold text-2xl tracking-wide text-foreground">
              FAN<span className="text-primary">KICK</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Sign in to your account to continue shopping
          </p>
        </div>

        {/* Main Login Card */}
        <Card className="shadow-2xl border-0 bg-white dark:bg-gray-800">
          <CardContent className="p-8">
            {/* Login Mode Switcher */}
            <div className="flex rounded-lg bg-gray-100 dark:bg-gray-700 p-1 mb-6">
              <button
                type="button"
                onClick={() => setLoginMode("email")}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                  loginMode === "email"
                    ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <Mail className="w-4 h-4 inline mr-2" />
                Email
              </button>
              <button
                type="button"
                onClick={() => setLoginMode("phone")}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                  loginMode === "phone"
                    ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <Smartphone className="w-4 h-4 inline mr-2" />
                Phone
              </button>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email/Phone Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {loginMode === "email" ? "Email address" : "Phone number"}
                </label>

                {/* Error Message - Above Email Field */}
                {error && (
                  <div className="mb-3 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                    <p className="text-sm text-red-600 dark:text-red-400">
                      {error}
                    </p>
                  </div>
                )}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {loginMode === "email" ? (
                      <Mail className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Smartphone className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                  <input
                    type={loginMode === "email" ? "email" : "tel"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    placeholder={
                      loginMode === "email"
                        ? "Enter your email address"
                        : "Enter your phone number"
                    }
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    Sign in
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </div>
                )}
              </Button>

              {/* Demo Login Button */}
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEmail("test@example.com");
                  setPassword("password123");
                  // Auto-submit demo login
                  setTimeout(() => {
                    const form = document.querySelector("form");
                    if (form) {
                      const event = new Event("submit", {
                        bubbles: true,
                        cancelable: true,
                      });
                      form.dispatchEvent(event);
                    }
                  }, 100);
                }}
                className="w-full mt-3 border-2 border-primary/30 text-primary hover:bg-primary/10"
              >
                🚀 Try Demo Login
              </Button>
            </form>

            {/* Divider */}
            <div className="my-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                    Don't have an account?
                  </span>
                </div>
              </div>
            </div>

            {/* Sign Up Link */}
            <Link
              to="/signup"
              className="w-full bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-3 px-4 rounded-lg shadow transition-all duration-200 flex items-center justify-center"
            >
              Create new account
              <ChevronRight className="w-4 h-4 ml-2" />
            </Link>

            {/* Terms */}
            <p className="mt-6 text-xs text-center text-gray-500 dark:text-gray-400">
              By continuing, you agree to FanKick's{" "}
              <Link to="/terms" className="text-primary hover:underline">
                Terms of Use
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </p>
          </CardContent>
        </Card>

        {/* Additional Benefits */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Free Shipping
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              Secure Payments
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
              24/7 Support
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
