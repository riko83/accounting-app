// ============================================
// SHARED TYPES FOR ACCOUNTING APP
// ============================================

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface Client {
  id: string;
  name: string;
  nipt: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  status: ClientStatus;
  notes?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Document {
  id: string;
  name: string;
  type: DocumentType;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  description?: string;
  clientId: string;
  userId: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface Transaction {
  id: string;
  date: Date;
  description: string;
  amount: number;
  type: TransactionType;
  category: string;
  vatRate: number;
  vatAmount: number;
  totalAmount: number;
  reference?: string;
  notes?: string;
  clientId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientId: string;
  userId: string;
  issueDate: Date;
  dueDate: Date;
  status: InvoiceStatus;
  items: InvoiceItem[];
  subtotal: number;
  vatAmount: number;
  totalAmount: number;
  notes?: string;
  pdfUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
  total: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: Date;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// ============================================
// ENUMS
// ============================================

export enum UserRole {
  ADMIN = 'ADMIN',
  ACCOUNTANT = 'ACCOUNTANT',
  VIEWER = 'VIEWER'
}

export enum ClientStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING'
}

export enum DocumentType {
  INVOICE = 'INVOICE',
  RECEIPT = 'RECEIPT',
  CONTRACT = 'CONTRACT',
  BALANCE_SHEET = 'BALANCE_SHEET',
  VAT_DECLARATION = 'VAT_DECLARATION',
  PAYROLL = 'PAYROLL',
  OTHER = 'OTHER'
}

export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE'
}

export enum InvoiceStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  PAID = 'PAID',
  OVERDUE = 'OVERDUE',
  CANCELLED = 'CANCELLED'
}

// ============================================
// REQUEST/RESPONSE TYPES
// ============================================

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface RegisterRequest {
  email: string;
  name: string;
  password: string;
  role?: UserRole;
}

export interface CreateClientRequest {
  name: string;
  nipt: string;
  email?: string;
  phone?: string;
  address?: string;
  status?: ClientStatus;
}

export interface UploadDocumentRequest {
  clientId: string;
  file: File;
  type: DocumentType;
  description?: string;
}

// ============================================
// UTILITY TYPES
// ============================================

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;