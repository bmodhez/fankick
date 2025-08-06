import { pool } from '../database/connection.js';
import { 
  User, 
  UserCreateRequest, 
  UserLoginRequest, 
  UserSession, 
  UserAddress, 
  UserAddressCreateRequest,
  UserPreferences,
  CartItem,
  WishlistItem 
} from '../types/user.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export class UserService {
  
  // Helper method to convert database row to User object
  private dbRowToUser(row: any): User {
    return {
      id: row.id,
      email: row.email,
      firstName: row.first_name,
      lastName: row.last_name,
      phone: row.phone,
      dateOfBirth: row.date_of_birth,
      gender: row.gender,
      profileImage: row.profile_image,
      isVerified: row.is_verified,
      isActive: row.is_active,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }

  // Helper method to convert database row to UserAddress object
  private dbRowToAddress(row: any): UserAddress {
    return {
      id: row.id,
      userId: row.user_id,
      addressType: row.address_type,
      streetAddress: row.street_address,
      city: row.city,
      state: row.state,
      postalCode: row.postal_code,
      country: row.country,
      isDefault: row.is_default,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }

  // Generate secure session token
  private generateSessionToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  // Generate order number
  private generateOrderNumber(): string {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substr(2, 5).toUpperCase();
    return `ORD-${timestamp}-${random}`;
  }

  // Hash password
  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
  }

  // Verify password
  private async verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  // Register new user
  async registerUser(userData: UserCreateRequest): Promise<User> {
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      // Check if user already exists
      const existingUser = await client.query(
        'SELECT id FROM users WHERE email = $1',
        [userData.email.toLowerCase()]
      );
      
      if (existingUser.rows.length > 0) {
        throw new Error('User with this email already exists');
      }
      
      // Hash password
      const passwordHash = await this.hashPassword(userData.password);
      
      // Insert user
      const userResult = await client.query(`
        INSERT INTO users (email, password_hash, first_name, last_name, phone, date_of_birth, gender)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
      `, [
        userData.email.toLowerCase(),
        passwordHash,
        userData.firstName,
        userData.lastName,
        userData.phone,
        userData.dateOfBirth,
        userData.gender
      ]);
      
      const user = userResult.rows[0];
      
      // Create default user preferences
      await client.query(`
        INSERT INTO user_preferences (user_id)
        VALUES ($1)
      `, [user.id]);
      
      await client.query('COMMIT');
      
      return this.dbRowToUser(user);
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  // Login user
  async loginUser(loginData: UserLoginRequest): Promise<{ user: User; sessionToken: string; expiresAt: string }> {
    const client = await pool.connect();

    try {
      // Check if it's a phone number or email
      const isPhoneNumber = /^\d{10,15}$/.test(loginData.email.replace(/[^\d]/g, ''));

      // Find user by email or phone
      let userResult;
      if (isPhoneNumber) {
        userResult = await client.query(
          'SELECT * FROM users WHERE phone = $1 AND is_active = true',
          [loginData.email]
        );
      } else {
        userResult = await client.query(
          'SELECT * FROM users WHERE email = $1 AND is_active = true',
          [loginData.email.toLowerCase()]
        );
      }

      if (userResult.rows.length === 0) {
        if (isPhoneNumber) {
          throw new Error('Phone number not registered. Please sign up first.');
        } else {
          throw new Error('Email not registered. Please sign up first.');
        }
      }

      const user = userResult.rows[0];

      // Verify password
      const isValidPassword = await this.verifyPassword(loginData.password, user.password_hash);
      if (!isValidPassword) {
        throw new Error('Incorrect password. Please try again.');
      }
      
      // Create session
      const sessionToken = this.generateSessionToken();
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 30); // 30 days
      
      const sessionResult = await client.query(`
        INSERT INTO user_sessions (user_id, session_token, expires_at)
        VALUES ($1, $2, $3)
        RETURNING *
      `, [user.id, sessionToken, expiresAt]);
      
      return {
        user: this.dbRowToUser(user),
        sessionToken: sessionResult.rows[0].session_token,
        expiresAt: sessionResult.rows[0].expires_at
      };
    } finally {
      client.release();
    }
  }

  // Verify session
  async verifySession(sessionToken: string): Promise<User | null> {
    const result = await pool.query(`
      SELECT u.* FROM users u
      JOIN user_sessions s ON u.id = s.user_id
      WHERE s.session_token = $1 
        AND s.expires_at > CURRENT_TIMESTAMP
        AND u.is_active = true
    `, [sessionToken]);
    
    if (result.rows.length === 0) {
      return null;
    }
    
    return this.dbRowToUser(result.rows[0]);
  }

  // Logout user (invalidate session)
  async logoutUser(sessionToken: string): Promise<boolean> {
    const result = await pool.query(
      'DELETE FROM user_sessions WHERE session_token = $1',
      [sessionToken]
    );
    
    return result.rowCount > 0;
  }

  // Get user by ID
  async getUserById(userId: string): Promise<User | null> {
    const result = await pool.query(
      'SELECT * FROM users WHERE id = $1 AND is_active = true',
      [userId]
    );
    
    if (result.rows.length === 0) {
      return null;
    }
    
    return this.dbRowToUser(result.rows[0]);
  }

  // Update user profile
  async updateUser(userId: string, updateData: Partial<User>): Promise<User | null> {
    const fields = [];
    const values = [];
    let paramCount = 1;
    
    if (updateData.firstName !== undefined) {
      fields.push(`first_name = $${paramCount++}`);
      values.push(updateData.firstName);
    }
    if (updateData.lastName !== undefined) {
      fields.push(`last_name = $${paramCount++}`);
      values.push(updateData.lastName);
    }
    if (updateData.phone !== undefined) {
      fields.push(`phone = $${paramCount++}`);
      values.push(updateData.phone);
    }
    if (updateData.dateOfBirth !== undefined) {
      fields.push(`date_of_birth = $${paramCount++}`);
      values.push(updateData.dateOfBirth);
    }
    if (updateData.gender !== undefined) {
      fields.push(`gender = $${paramCount++}`);
      values.push(updateData.gender);
    }
    if (updateData.profileImage !== undefined) {
      fields.push(`profile_image = $${paramCount++}`);
      values.push(updateData.profileImage);
    }
    
    if (fields.length === 0) {
      return this.getUserById(userId);
    }
    
    values.push(userId);
    
    const query = `
      UPDATE users 
      SET ${fields.join(', ')}
      WHERE id = $${paramCount} AND is_active = true
      RETURNING *
    `;
    
    const result = await pool.query(query, values);
    
    if (result.rows.length === 0) {
      return null;
    }
    
    return this.dbRowToUser(result.rows[0]);
  }

  // Get user addresses
  async getUserAddresses(userId: string): Promise<UserAddress[]> {
    const result = await pool.query(
      'SELECT * FROM user_addresses WHERE user_id = $1 ORDER BY is_default DESC, created_at DESC',
      [userId]
    );
    
    return result.rows.map(row => this.dbRowToAddress(row));
  }

  // Add user address
  async addUserAddress(userId: string, addressData: UserAddressCreateRequest): Promise<UserAddress> {
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      // If this is the default address, remove default from other addresses
      if (addressData.isDefault) {
        await client.query(
          'UPDATE user_addresses SET is_default = false WHERE user_id = $1',
          [userId]
        );
      }
      
      const result = await client.query(`
        INSERT INTO user_addresses (
          user_id, address_type, street_address, city, state, postal_code, country, is_default
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
      `, [
        userId,
        addressData.addressType || 'home',
        addressData.streetAddress,
        addressData.city,
        addressData.state,
        addressData.postalCode,
        addressData.country || 'India',
        addressData.isDefault || false
      ]);
      
      await client.query('COMMIT');
      
      return this.dbRowToAddress(result.rows[0]);
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  // Get user cart
  async getUserCart(userId: string): Promise<CartItem[]> {
    const result = await pool.query(
      'SELECT * FROM user_cart WHERE user_id = $1 ORDER BY updated_at DESC',
      [userId]
    );
    
    return result.rows.map(row => ({
      id: row.id,
      userId: row.user_id,
      productId: row.product_id,
      variantId: row.variant_id,
      quantity: row.quantity,
      addedAt: row.added_at,
      updatedAt: row.updated_at
    }));
  }

  // Add to cart
  async addToCart(userId: string, productId: string, variantId: string, quantity: number = 1): Promise<CartItem> {
    const result = await pool.query(`
      INSERT INTO user_cart (user_id, product_id, variant_id, quantity)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (user_id, product_id, variant_id)
      DO UPDATE SET quantity = user_cart.quantity + $4, updated_at = CURRENT_TIMESTAMP
      RETURNING *
    `, [userId, productId, variantId, quantity]);
    
    return {
      id: result.rows[0].id,
      userId: result.rows[0].user_id,
      productId: result.rows[0].product_id,
      variantId: result.rows[0].variant_id,
      quantity: result.rows[0].quantity,
      addedAt: result.rows[0].added_at,
      updatedAt: result.rows[0].updated_at
    };
  }

  // Remove from cart
  async removeFromCart(userId: string, cartItemId: string): Promise<boolean> {
    const result = await pool.query(
      'DELETE FROM user_cart WHERE id = $1 AND user_id = $2',
      [cartItemId, userId]
    );
    
    return result.rowCount > 0;
  }

  // Clear cart
  async clearCart(userId: string): Promise<boolean> {
    const result = await pool.query(
      'DELETE FROM user_cart WHERE user_id = $1',
      [userId]
    );
    
    return result.rowCount >= 0; // Returns true even if cart was already empty
  }

  // Get user wishlist
  async getUserWishlist(userId: string): Promise<WishlistItem[]> {
    const result = await pool.query(
      'SELECT * FROM user_wishlist WHERE user_id = $1 ORDER BY added_at DESC',
      [userId]
    );
    
    return result.rows.map(row => ({
      id: row.id,
      userId: row.user_id,
      productId: row.product_id,
      addedAt: row.added_at
    }));
  }

  // Add to wishlist
  async addToWishlist(userId: string, productId: string): Promise<WishlistItem> {
    const result = await pool.query(`
      INSERT INTO user_wishlist (user_id, product_id)
      VALUES ($1, $2)
      ON CONFLICT (user_id, product_id) DO NOTHING
      RETURNING *
    `, [userId, productId]);
    
    // If no rows returned, item already exists
    if (result.rows.length === 0) {
      const existing = await pool.query(
        'SELECT * FROM user_wishlist WHERE user_id = $1 AND product_id = $2',
        [userId, productId]
      );
      return {
        id: existing.rows[0].id,
        userId: existing.rows[0].user_id,
        productId: existing.rows[0].product_id,
        addedAt: existing.rows[0].added_at
      };
    }
    
    return {
      id: result.rows[0].id,
      userId: result.rows[0].user_id,
      productId: result.rows[0].product_id,
      addedAt: result.rows[0].added_at
    };
  }

  // Remove from wishlist
  async removeFromWishlist(userId: string, productId: string): Promise<boolean> {
    const result = await pool.query(
      'DELETE FROM user_wishlist WHERE user_id = $1 AND product_id = $2',
      [userId, productId]
    );
    
    return result.rowCount > 0;
  }
}

// Export singleton instance
export const userService = new UserService();
