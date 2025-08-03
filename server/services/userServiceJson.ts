import fs from 'fs/promises';
import path from 'path';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { User, UserCreateRequest, UserLoginRequest } from '../types/user.js';

const USERS_DB_PATH = path.join(process.cwd(), 'server/database/users.json');

interface StoredUser extends User {
  passwordHash: string;
}

interface AuthData {
  user: User;
  sessionToken: string;
  expiresAt: string;
}

// In-memory session storage for simplicity
const sessions = new Map<string, { userId: string; expiresAt: Date }>();

// Initialize database
async function initializeDatabase() {
  try {
    await fs.access(USERS_DB_PATH);
  } catch (error) {
    // Create users database file
    const dir = path.dirname(USERS_DB_PATH);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(USERS_DB_PATH, JSON.stringify([], null, 2));
  }
}

async function loadUsers(): Promise<StoredUser[]> {
  try {
    const data = await fs.readFile(USERS_DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading users:', error);
    return [];
  }
}

async function saveUsers(users: StoredUser[]): Promise<void> {
  try {
    await fs.writeFile(USERS_DB_PATH, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error saving users:', error);
    throw error;
  }
}

function generateId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function generateSessionToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

function userToPublic(user: StoredUser): User {
  const { passwordHash, ...publicUser } = user;
  return publicUser;
}

export class UserServiceJson {
  constructor() {
    initializeDatabase();
  }

  async registerUser(userData: UserCreateRequest): Promise<User> {
    const users = await loadUsers();
    
    // Check if user already exists
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    
    // Hash password
    const passwordHash = await bcrypt.hash(userData.password, 10);
    
    // Create new user
    const newUser: StoredUser = {
      id: generateId(),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      dateOfBirth: userData.dateOfBirth,
      gender: userData.gender,
      profileImage: undefined,
      isVerified: false,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      passwordHash
    };
    
    users.push(newUser);
    await saveUsers(users);
    
    return userToPublic(newUser);
  }

  async loginUser(loginData: UserLoginRequest): Promise<AuthData> {
    const users = await loadUsers();
    
    // Find user by email
    const user = users.find(u => u.email === loginData.email);
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    // Verify password
    const isValidPassword = await bcrypt.compare(loginData.password, user.passwordHash);
    if (!isValidPassword) {
      throw new Error('Invalid email or password');
    }
    
    // Generate session token
    const sessionToken = generateSessionToken();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days from now
    
    // Store session
    sessions.set(sessionToken, {
      userId: user.id,
      expiresAt
    });
    
    return {
      user: userToPublic(user),
      sessionToken,
      expiresAt: expiresAt.toISOString()
    };
  }

  async getUserFromSession(sessionToken: string): Promise<User | null> {
    const session = sessions.get(sessionToken);
    if (!session || session.expiresAt < new Date()) {
      // Clean up expired session
      if (session) {
        sessions.delete(sessionToken);
      }
      return null;
    }
    
    const users = await loadUsers();
    const user = users.find(u => u.id === session.userId);
    
    return user ? userToPublic(user) : null;
  }

  async logout(sessionToken: string): Promise<void> {
    sessions.delete(sessionToken);
  }

  async updateUser(userId: string, updateData: Partial<User>): Promise<User> {
    const users = await loadUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    // Update user data
    users[userIndex] = {
      ...users[userIndex],
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    
    await saveUsers(users);
    return userToPublic(users[userIndex]);
  }
}

export const userService = new UserServiceJson();
