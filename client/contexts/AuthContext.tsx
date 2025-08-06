import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { userApi, User, UserCreateRequest, UserLoginRequest } from "@/services/userApi";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: () => boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (userData: UserCreateRequest) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (updateData: Partial<User>) => Promise<{ success: boolean; error?: string }>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing session on startup
  const checkSession = async () => {
    try {
      setIsLoading(true);
      const sessionToken = localStorage.getItem('sessionToken');
      const expiresAt = localStorage.getItem('sessionExpiresAt');
      
      if (!sessionToken || !expiresAt) {
        setIsLoading(false);
        return;
      }
      
      // Check if session is expired
      if (new Date() >= new Date(expiresAt)) {
        localStorage.removeItem('sessionToken');
        localStorage.removeItem('sessionExpiresAt');
        setIsLoading(false);
        return;
      }
      
      // Verify session with server
      const currentUser = await userApi.getCurrentUser();
      setUser(currentUser);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Session verification failed:', error);
      // Clear invalid session
      localStorage.removeItem('sessionToken');
      localStorage.removeItem('sessionExpiresAt');
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true);
      
      const authData = await userApi.login({ email, password });
      
      // Store session data
      localStorage.setItem('sessionToken', authData.sessionToken);
      localStorage.setItem('sessionExpiresAt', authData.expiresAt);
      
      setUser(authData.user);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error) {
      console.error('Login failed:', error);
      
      let errorMessage = 'Login failed';
      if (error instanceof Error) {
        if (error.message.includes('Invalid email or password')) {
          errorMessage = 'Invalid email or password';
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
          errorMessage = 'Network error. Please check your connection.';
        } else {
          errorMessage = error.message;
        }
      }
      
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: UserCreateRequest): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true);
      
      const newUser = await userApi.register(userData);
      
      // Auto-login after successful registration
      const loginResult = await login(userData.email, userData.password);
      
      if (loginResult.success) {
        return { success: true };
      } else {
        // Registration successful but login failed
        return { 
          success: true, 
          error: 'Registration successful. Please log in manually.' 
        };
      }
    } catch (error) {
      console.error('Signup failed:', error);
      
      let errorMessage = 'Registration failed';
      if (error instanceof Error) {
        if (error.message.includes('already exists')) {
          errorMessage = 'An account with this email already exists';
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
          errorMessage = 'Network error. Please check your connection.';
        } else {
          errorMessage = error.message;
        }
      }
      
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      // Notify server about logout
      await userApi.logout();
    } catch (error) {
      console.error('Logout request failed:', error);
      // Continue with local logout even if server request fails
    } finally {
      // Clear local session data
      localStorage.removeItem('sessionToken');
      localStorage.removeItem('sessionExpiresAt');
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const updateProfile = async (updateData: Partial<User>): Promise<{ success: boolean; error?: string }> => {
    try {
      const updatedUser = await userApi.updateProfile(updateData);
      setUser(updatedUser);
      return { success: true };
    } catch (error) {
      console.error('Profile update failed:', error);
      
      let errorMessage = 'Failed to update profile';
      if (error instanceof Error) {
        if (error.message.includes('network') || error.message.includes('fetch')) {
          errorMessage = 'Network error. Please check your connection.';
        } else {
          errorMessage = error.message;
        }
      }
      
      return { success: false, error: errorMessage };
    }
  };

  const refreshUser = async (): Promise<void> => {
    try {
      if (isAuthenticated) {
        const currentUser = await userApi.getCurrentUser();
        setUser(currentUser);
      }
    } catch (error) {
      console.error('Failed to refresh user data:', error);
      // If refresh fails, user might be logged out
      if (error instanceof Error && error.message.includes('401')) {
        await logout();
      }
    }
  };

  // Check if current user is admin based on specific email and phone
  const isAdmin = (): boolean => {
    if (!user) return false;

    const adminEmail = 'modhbhavin05@gmail.com';
    const adminPhone = '9322667822';

    return user.email === adminEmail && user.phone === adminPhone;
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    isAdmin,
    login,
    signup,
    logout,
    updateProfile,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export type { User };
