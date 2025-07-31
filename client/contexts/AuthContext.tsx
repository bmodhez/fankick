import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface User {
  id: string;
  email: string;
  phone: string;
  name: string;
  isAdmin: boolean;
  isVerified: boolean;
  createdAt: string;
  lastLogin: string;
  orders: number;
  totalSpent: number;
}

interface AuthContextType {
  user: User | null;
  users: User[];
  isLoading: boolean;
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  signup: (
    email: string,
    phone: string,
    name: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  verifyOTP: (
    phone: string,
    otp: string,
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  sendOTP: (phone: string) => Promise<{ success: boolean; error?: string }>;
  isAdmin: () => boolean;
  getAllUsers: () => User[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Admin credentials
const ADMIN_EMAIL = "modhbhavin05@gmail.com";
const ADMIN_PHONE = "9322667822";
const ADMIN_PASSWORD = "Bhavin@111005";

// Mock users database - In production, this would be a real database
const MOCK_USERS: User[] = [
  {
    id: "admin-001",
    email: ADMIN_EMAIL,
    phone: ADMIN_PHONE,
    name: "Bhavin Modh",
    isAdmin: true,
    isVerified: true,
    createdAt: "2024-01-01",
    lastLogin: new Date().toISOString(),
    orders: 0,
    totalSpent: 0,
  },
  {
    id: "user-001",
    email: "user1@example.com",
    phone: "9876543210",
    name: "John Doe",
    isAdmin: false,
    isVerified: true,
    createdAt: "2024-01-15",
    lastLogin: "2024-01-20",
    orders: 3,
    totalSpent: 15999,
  },
  {
    id: "user-002",
    email: "user2@example.com",
    phone: "8765432109",
    name: "Jane Smith",
    isAdmin: false,
    isVerified: false,
    createdAt: "2024-01-18",
    lastLogin: "2024-01-19",
    orders: 1,
    totalSpent: 2499,
  },
  {
    id: "user-003",
    email: "user3@example.com",
    phone: "7654321098",
    name: "Mike Johnson",
    isAdmin: false,
    isVerified: true,
    createdAt: "2024-01-10",
    lastLogin: "2024-01-22",
    orders: 5,
    totalSpent: 28499,
  },
];

// Mock OTP storage - In production, this would be handled by SMS service
const otpStore: Record<string, { otp: string; expires: number }> = {};

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("fankick-user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Find updated user data
        const currentUser = users.find((u) => u.id === parsedUser.id);
        if (currentUser) {
          setUser(currentUser);
        }
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("fankick-user");
      }
    }
    setIsLoading(false);
  }, [users]);

  const login = async (
    email: string,
    password: string,
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      // Check admin credentials
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const adminUser = users.find((u) => u.email === ADMIN_EMAIL);
        if (adminUser) {
          // Update last login
          const updatedAdmin = {
            ...adminUser,
            lastLogin: new Date().toISOString(),
          };
          setUsers((prev) =>
            prev.map((u) => (u.id === adminUser.id ? updatedAdmin : u)),
          );
          setUser(updatedAdmin);
          localStorage.setItem("fankick-user", JSON.stringify(updatedAdmin));
          return { success: true };
        }
      }

      // Check regular users (for demo purposes, accept any password for existing users)
      const foundUser = users.find((u) => u.email === email);
      if (foundUser) {
        const updatedUser = {
          ...foundUser,
          lastLogin: new Date().toISOString(),
        };
        setUsers((prev) =>
          prev.map((u) => (u.id === foundUser.id ? updatedUser : u)),
        );
        setUser(updatedUser);
        localStorage.setItem("fankick-user", JSON.stringify(updatedUser));
        return { success: true };
      }

      return { success: false, error: "Invalid email or password" };
    } catch (error) {
      return { success: false, error: "Login failed. Please try again." };
    }
  };

  const signup = async (
    email: string,
    phone: string,
    name: string,
    password: string,
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      // Check if user already exists
      if (users.find((u) => u.email === email || u.phone === phone)) {
        return {
          success: false,
          error: "User with this email or phone already exists",
        };
      }

      // Create new user
      const newUser: User = {
        id: "user-" + Date.now(),
        email,
        phone,
        name,
        isAdmin: false,
        isVerified: false,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        orders: 0,
        totalSpent: 0,
      };

      setUsers((prev) => [...prev, newUser]);
      setUser(newUser);
      localStorage.setItem("fankick-user", JSON.stringify(newUser));

      // Send OTP for verification
      await sendOTP(phone);

      return { success: true };
    } catch (error) {
      return { success: false, error: "Signup failed. Please try again." };
    }
  };

  const sendOTP = async (
    phone: string,
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      // Generate 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      // Store OTP with 5 minute expiry
      otpStore[phone] = {
        otp,
        expires: Date.now() + 5 * 60 * 1000, // 5 minutes
      };

      // In production, send SMS here
      console.log(`OTP for ${phone}: ${otp}`); // For demo purposes

      // For admin phone, always use fixed OTP for demo
      if (phone === ADMIN_PHONE) {
        otpStore[phone].otp = "123456";
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: "Failed to send OTP. Please try again." };
    }
  };

  const verifyOTP = async (
    phone: string,
    otp: string,
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const storedOTP = otpStore[phone];

      if (!storedOTP) {
        return {
          success: false,
          error: "OTP not found. Please request a new one.",
        };
      }

      if (Date.now() > storedOTP.expires) {
        delete otpStore[phone];
        return {
          success: false,
          error: "OTP has expired. Please request a new one.",
        };
      }

      if (storedOTP.otp !== otp) {
        return { success: false, error: "Invalid OTP. Please try again." };
      }

      // Mark user as verified
      const userToVerify = users.find((u) => u.phone === phone);
      if (userToVerify) {
        const verifiedUser = { ...userToVerify, isVerified: true };
        setUsers((prev) =>
          prev.map((u) => (u.id === userToVerify.id ? verifiedUser : u)),
        );

        if (user && user.id === userToVerify.id) {
          setUser(verifiedUser);
          localStorage.setItem("fankick-user", JSON.stringify(verifiedUser));
        }
      }

      // Clean up OTP
      delete otpStore[phone];

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: "OTP verification failed. Please try again.",
      };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("fankick-user");
  };

  const isAdmin = () => {
    return user?.isAdmin === true;
  };

  const getAllUsers = () => {
    return users;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        isLoading,
        login,
        signup,
        verifyOTP,
        logout,
        sendOTP,
        isAdmin,
        getAllUsers,
      }}
    >
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
