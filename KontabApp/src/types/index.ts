// Tipet themelore për kontabilistët
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'accountant' | 'admin' | 'client';
  avatar?: string;
  createdAt: Date | string;
}

export interface Client {
  id: string;
  name: string;
  taxId: string; // NIPT
  address?: string;
  phone?: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  accountantId: string;
  createdAt: Date | string;
  notes?: string;
}

export interface Document {
  id: string;
  clientId: string;
  filename: string;
  originalName: string;
  fileType: 'invoice' | 'receipt' | 'bank_statement' | 'payroll' | 'tax' | 'other';
  fileSize: number;
  uploadDate: Date;
  month: number;
  year: number;
  processed: boolean;
  ocrData?: Record<string, any>;
  amount?: number;
  vat?: number;
}

export interface AccountingEntry {
  id: string;
  clientId: string;
  date: Date;
  description: string;
  debitAccount: string;
  creditAccount: string;
  amount: number;
  documentId?: string;
  category: 'revenue' | 'expense' | 'asset' | 'liability' | 'equity';
  vatRate?: number;
  vatAmount?: number;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  clientId: string;
  assignedTo: string;
  status: 'pending' | 'in_progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  createdAt: Date | string;
  completedAt?: Date;
  comments: Comment[];
}

export interface Comment {
  id: string;
  taskId: string;
  userId: string;
  content: string;
  createdAt: Date | string;
}

export interface DashboardStats {
  totalClients: number;
  activeClients: number;
  pendingDocuments: number;
  pendingTasks: number;
  upcomingDeadlines: number;
  monthlyRevenue?: number;
}
export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  clientId: string;
  type: 'tax_deadline' | 'payment' | 'meeting' | 'report' | 'reminder';
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'completed';
  createdAt: Date | string;
  createdBy: string;
}