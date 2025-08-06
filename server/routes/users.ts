import { Request, Response } from 'express';
import { Request, Response } from "express";
import { UserService } from '../services/userService.js';
import { UserCreateRequest, UserLoginRequest, AuthResponse, UserResponse } from '../types/user.js';

const userService = new UserService();

// POST /api/auth/register - Register new user
export async function registerUser(req: Request, res: Response) {
  try {
    const userData: UserCreateRequest = req.body;
    
    // Basic validation
    if (!userData.email || !userData.password) {
      const response: AuthResponse = {
        success: false,
        error: 'Email and password are required'
      };
      return res.status(400).json(response);
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      const response: AuthResponse = {
        success: false,
        error: 'Please provide a valid email address'
      };
      return res.status(400).json(response);
    }
    
    // Password validation
    if (userData.password.length < 6) {
      const response: AuthResponse = {
        success: false,
        error: 'Password must be at least 6 characters long'
      };
      return res.status(400).json(response);
    }
    
    const user = await userService.registerUser(userData);
    
    const response: UserResponse = {
      success: true,
      data: user,
      message: 'User registered successfully'
    };
    
    res.status(201).json(response);
  } catch (error) {
    console.error('Error registering user:', error);
    
    let errorMessage = 'Failed to register user';
    if (error instanceof Error) {
      if (error.message.includes('already exists')) {
        errorMessage = 'User with this email already exists';
      } else {
        errorMessage = error.message;
      }
    }
    
    const response: AuthResponse = {
      success: false,
      error: errorMessage
    };
    
    res.status(400).json(response);
  }
}

// POST /api/auth/login - Login user
export async function loginUser(req: Request, res: Response) {
  try {
    const loginData: UserLoginRequest = req.body;
    console.log('Login attempt for email:', loginData.email);

    // Basic validation
    if (!loginData.email || !loginData.password) {
      console.log('Login failed: Missing email or password');
      const response: AuthResponse = {
        success: false,
        error: 'Email and password are required'
      };
      return res.status(400).json(response);
    }

    const authData = await userService.loginUser(loginData);
    console.log('Login successful for:', loginData.email);

    const response: AuthResponse = {
      success: true,
      data: authData,
      message: 'Login successful'
    };
    
    res.json(response);
  } catch (error) {
    console.error('Login error for user:', error.message);

    const response: AuthResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Login failed'
    };

    res.status(401).json(response);
  }
}

// POST /api/auth/logout - Logout user
export async function logoutUser(req: Request, res: Response) {
  try {
    const sessionToken = req.headers.authorization?.replace('Bearer ', '');
    
    if (!sessionToken) {
      const response: AuthResponse = {
        success: false,
        error: 'No session token provided'
      };
      return res.status(400).json(response);
    }
    
    await userService.logout(sessionToken);
    
    const response: AuthResponse = {
      success: true,
      message: 'Logout successful'
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error logging out user:', error);
    
    const response: AuthResponse = {
      success: false,
      error: 'Logout failed'
    };
    
    res.status(500).json(response);
  }
}

// GET /api/auth/me - Get current user
export async function getCurrentUser(req: Request, res: Response) {
  try {
    const sessionToken = req.headers.authorization?.replace('Bearer ', '');
    
    if (!sessionToken) {
      const response: UserResponse = {
        success: false,
        error: 'No session token provided'
      };
      return res.status(401).json(response);
    }
    
    const user = await userService.getUserFromSession(sessionToken);
    
    if (!user) {
      const response: UserResponse = {
        success: false,
        error: 'Invalid or expired session'
      };
      return res.status(401).json(response);
    }
    
    const response: UserResponse = {
      success: true,
      data: user
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error getting current user:', error);
    
    const response: UserResponse = {
      success: false,
      error: 'Failed to get user information'
    };
    
    res.status(500).json(response);
  }
}

// PUT /api/users/profile - Update user profile
export async function updateUserProfile(req: Request, res: Response) {
  try {
    const sessionToken = req.headers.authorization?.replace('Bearer ', '');
    
    if (!sessionToken) {
      const response: UserResponse = {
        success: false,
        error: 'No session token provided'
      };
      return res.status(401).json(response);
    }
    
    const currentUser = await userService.getUserFromSession(sessionToken);

    if (!currentUser) {
      const response: UserResponse = {
        success: false,
        error: 'Invalid or expired session'
      };
      return res.status(401).json(response);
    }

    const updateData = req.body;
    const updatedUser = await userService.updateUser(currentUser.id, updateData);
    
    if (!updatedUser) {
      const response: UserResponse = {
        success: false,
        error: 'User not found'
      };
      return res.status(404).json(response);
    }
    
    const response: UserResponse = {
      success: true,
      data: updatedUser,
      message: 'Profile updated successfully'
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error updating user profile:', error);
    
    const response: UserResponse = {
      success: false,
      error: 'Failed to update profile'
    };
    
    res.status(500).json(response);
  }
}

// GET /api/users/addresses - Get user addresses
export async function getUserAddresses(req: Request, res: Response) {
  try {
    const sessionToken = req.headers.authorization?.replace('Bearer ', '');
    
    if (!sessionToken) {
      return res.status(401).json({
        success: false,
        error: 'No session token provided'
      });
    }
    
    const currentUser = await userService.getUserFromSession(sessionToken);
    
    if (!currentUser) {
      return res.status(401).json({
        success: false,
        error: 'Invalid or expired session'
      });
    }
    
    const addresses = await userService.getUserAddresses(currentUser.id);
    
    res.json({
      success: true,
      data: addresses
    });
  } catch (error) {
    console.error('Error getting user addresses:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to get addresses'
    });
  }
}

// POST /api/users/addresses - Add user address
export async function addUserAddress(req: Request, res: Response) {
  try {
    const sessionToken = req.headers.authorization?.replace('Bearer ', '');
    
    if (!sessionToken) {
      return res.status(401).json({
        success: false,
        error: 'No session token provided'
      });
    }
    
    const currentUser = await userService.getUserFromSession(sessionToken);
    
    if (!currentUser) {
      return res.status(401).json({
        success: false,
        error: 'Invalid or expired session'
      });
    }
    
    const addressData = req.body;
    
    // Basic validation
    if (!addressData.streetAddress || !addressData.city || !addressData.state || !addressData.postalCode) {
      return res.status(400).json({
        success: false,
        error: 'Street address, city, state, and postal code are required'
      });
    }
    
    const address = await userService.addUserAddress(currentUser.id, addressData);
    
    res.status(201).json({
      success: true,
      data: address,
      message: 'Address added successfully'
    });
  } catch (error) {
    console.error('Error adding user address:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to add address'
    });
  }
}

// GET /api/users/cart - Get user cart
export async function getUserCart(req: Request, res: Response) {
  try {
    const sessionToken = req.headers.authorization?.replace('Bearer ', '');
    
    if (!sessionToken) {
      return res.status(401).json({
        success: false,
        error: 'No session token provided'
      });
    }
    
    const currentUser = await userService.getUserFromSession(sessionToken);
    
    if (!currentUser) {
      return res.status(401).json({
        success: false,
        error: 'Invalid or expired session'
      });
    }
    
    const cart = await userService.getUserCart(currentUser.id);
    
    res.json({
      success: true,
      data: cart
    });
  } catch (error) {
    console.error('Error getting user cart:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to get cart'
    });
  }
}

// POST /api/users/cart - Add to cart
export async function addToCart(req: Request, res: Response) {
  try {
    const sessionToken = req.headers.authorization?.replace('Bearer ', '');
    
    if (!sessionToken) {
      return res.status(401).json({
        success: false,
        error: 'No session token provided'
      });
    }
    
    const currentUser = await userService.getUserFromSession(sessionToken);
    
    if (!currentUser) {
      return res.status(401).json({
        success: false,
        error: 'Invalid or expired session'
      });
    }
    
    const { productId, variantId, quantity = 1 } = req.body;
    
    if (!productId || !variantId) {
      return res.status(400).json({
        success: false,
        error: 'Product ID and variant ID are required'
      });
    }
    
    const cartItem = await userService.addToCart(currentUser.id, productId, variantId, quantity);
    
    res.json({
      success: true,
      data: cartItem,
      message: 'Item added to cart'
    });
  } catch (error) {
    console.error('Error adding to cart:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to add to cart'
    });
  }
}

// DELETE /api/users/cart/:itemId - Remove from cart
export async function removeFromCart(req: Request, res: Response) {
  try {
    const sessionToken = req.headers.authorization?.replace('Bearer ', '');
    
    if (!sessionToken) {
      return res.status(401).json({
        success: false,
        error: 'No session token provided'
      });
    }
    
    const currentUser = await userService.getUserFromSession(sessionToken);
    
    if (!currentUser) {
      return res.status(401).json({
        success: false,
        error: 'Invalid or expired session'
      });
    }
    
    const { itemId } = req.params;
    const removed = await userService.removeFromCart(currentUser.id, itemId);
    
    if (!removed) {
      return res.status(404).json({
        success: false,
        error: 'Cart item not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Item removed from cart'
    });
  } catch (error) {
    console.error('Error removing from cart:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to remove from cart'
    });
  }
}

// GET /api/users/wishlist - Get user wishlist
export async function getUserWishlist(req: Request, res: Response) {
  try {
    const sessionToken = req.headers.authorization?.replace('Bearer ', '');
    
    if (!sessionToken) {
      return res.status(401).json({
        success: false,
        error: 'No session token provided'
      });
    }
    
    const currentUser = await userService.getUserFromSession(sessionToken);
    
    if (!currentUser) {
      return res.status(401).json({
        success: false,
        error: 'Invalid or expired session'
      });
    }
    
    const wishlist = await userService.getUserWishlist(currentUser.id);
    
    res.json({
      success: true,
      data: wishlist
    });
  } catch (error) {
    console.error('Error getting user wishlist:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to get wishlist'
    });
  }
}

// POST /api/users/wishlist - Add to wishlist
export async function addToWishlist(req: Request, res: Response) {
  try {
    const sessionToken = req.headers.authorization?.replace('Bearer ', '');
    
    if (!sessionToken) {
      return res.status(401).json({
        success: false,
        error: 'No session token provided'
      });
    }
    
    const currentUser = await userService.getUserFromSession(sessionToken);
    
    if (!currentUser) {
      return res.status(401).json({
        success: false,
        error: 'Invalid or expired session'
      });
    }
    
    const { productId } = req.body;
    
    if (!productId) {
      return res.status(400).json({
        success: false,
        error: 'Product ID is required'
      });
    }
    
    const wishlistItem = await userService.addToWishlist(currentUser.id, productId);
    
    res.json({
      success: true,
      data: wishlistItem,
      message: 'Item added to wishlist'
    });
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to add to wishlist'
    });
  }
}

// DELETE /api/users/wishlist/:productId - Remove from wishlist
export async function removeFromWishlist(req: Request, res: Response) {
  try {
    const sessionToken = req.headers.authorization?.replace('Bearer ', '');
    
    if (!sessionToken) {
      return res.status(401).json({
        success: false,
        error: 'No session token provided'
      });
    }
    
    const currentUser = await userService.getUserFromSession(sessionToken);
    
    if (!currentUser) {
      return res.status(401).json({
        success: false,
        error: 'Invalid or expired session'
      });
    }
    
    const { productId } = req.params;
    const removed = await userService.removeFromWishlist(currentUser.id, productId);
    
    if (!removed) {
      return res.status(404).json({
        success: false,
        error: 'Item not found in wishlist'
      });
    }
    
    res.json({
      success: true,
      message: 'Item removed from wishlist'
    });
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to remove from wishlist'
    });
  }
}
