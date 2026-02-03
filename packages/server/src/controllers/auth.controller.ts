import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../utils/prisma';
import { logger } from '../utils/logger';
import { ApiResponse, LoginRequest, RegisterRequest, User } from '@accounting/shared';

interface AuthRequest extends Request {
  user?: any;
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as LoginRequest;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      const response: ApiResponse = {
        success: false,
        error: 'Invalid credentials',
        timestamp: new Date()
      };
      return res.status(401).json(response);
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      const response: ApiResponse = {
        success: false,
        error: 'Invalid credentials',
        timestamp: new Date()
      };
      return res.status(401).json(response);
    }

    // Generate tokens
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d' }
    );

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() }
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    const response: ApiResponse = {
      success: true,
      message: 'Login successful',
      data: {
        user: userWithoutPassword,
        token,
        refreshToken
      },
      timestamp: new Date()
    };

    res.json(response);
  } catch (error) {
    logger.error('Login error:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Internal server error',
      timestamp: new Date()
    };
    res.status(500).json(response);
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, name, password, role = 'ACCOUNTANT' }: RegisterRequest = req.body;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      const response: ApiResponse = {
        success: false,
        error: 'User already exists',
        timestamp: new Date()
      };
      return res.status(400).json(response);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role,
        isVerified: true // For demo, auto-verify
      }
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    const response: ApiResponse = {
      success: true,
      message: 'User registered successfully',
      data: userWithoutPassword,
      timestamp: new Date()
    };

    res.status(201).json(response);
  } catch (error) {
    logger.error('Registration error:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Internal server error',
      timestamp: new Date()
    };
    res.status(500).json(response);
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      const response: ApiResponse = {
        success: false,
        error: 'Refresh token required',
        timestamp: new Date()
      };
      return res.status(400).json(response);
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as { id: string };

    // Find user
    const user = await prisma.user.findUnique({
      where: { id: decoded.id }
    });

    if (!user) {
      const response: ApiResponse = {
        success: false,
        error: 'Invalid refresh token',
        timestamp: new Date()
      };
      return res.status(401).json(response);
    }

    // Generate new access token
    const newToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    const response: ApiResponse = {
      success: true,
      message: 'Token refreshed',
      data: { token: newToken },
      timestamp: new Date()
    };

    res.json(response);
  } catch (error) {
    logger.error('Refresh token error:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Invalid refresh token',
      timestamp: new Date()
    };
    res.status(401).json(response);
  }
};

export const logout = async (req: AuthRequest, res: Response) => {
  try {
    // In a real app, you might want to blacklist the token
    const response: ApiResponse = {
      success: true,
      message: 'Logout successful',
      timestamp: new Date()
    };
    res.json(response);
  } catch (error) {
    logger.error('Logout error:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Internal server error',
      timestamp: new Date()
    };
    res.status(500).json(response);
  }
};

export const getCurrentUser = async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!user) {
      const response: ApiResponse = {
        success: false,
        error: 'User not found',
        timestamp: new Date()
      };
      return res.status(404).json(response);
    }

    const response: ApiResponse = {
      success: true,
      data: user,
      timestamp: new Date()
    };

    res.json(response);
  } catch (error) {
    logger.error('Get current user error:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Internal server error',
      timestamp: new Date()
    };
    res.status(500).json(response);
  }
};