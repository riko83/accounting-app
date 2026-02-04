// src/services/api.ts - Mock API Service
import { Client, Document, Task, AccountingEntry } from '../types';
import { mockClients, mockDocuments, mockTasks, mockAccountingEntries } from '../data/mockData';

// Simulojmë delay API
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class ApiService {
  // ========== CLIENT OPERATIONS ==========
  static async getClients(): Promise<Client[]> {
    await delay(300);
    return [...mockClients];
  }

  static async getClientById(id: string): Promise<Client | null> {
    await delay(200);
    return mockClients.find(client => client.id === id) || null;
  }

  static async createClient(clientData: Omit<Client, 'id' | 'createdAt'>): Promise<Client> {
    await delay(400);
    const newClient: Client = {
      ...clientData,
      id: `client_${Date.now()}`,
      createdAt: new Date()
    };
    mockClients.push(newClient);
    return newClient;
  }

  static async updateClient(id: string, updates: Partial<Client>): Promise<Client> {
    await delay(300);
    const index = mockClients.findIndex(client => client.id === id);
    if (index === -1) throw new Error('Client not found');
    
    mockClients[index] = { ...mockClients[index], ...updates };
    return mockClients[index];
  }

  static async deleteClient(id: string): Promise<void> {
    await delay(300);
    const index = mockClients.findIndex(client => client.id === id);
    if (index !== -1) {
      mockClients.splice(index, 1);
    }
  }

  // ========== DOCUMENT OPERATIONS ==========
  static async getDocuments(): Promise<Document[]> {
    await delay(300);
    return [...mockDocuments];
  }

  static async getDocumentsByClient(clientId: string): Promise<Document[]> {
    await delay(200);
    return mockDocuments.filter(doc => doc.clientId === clientId);
  }

  static async uploadDocument(file: File, clientId: string, metadata: any): Promise<Document> {
    await delay(800);
    const newDocument: Document = {
      id: `doc_${Date.now()}`,
      clientId,
      filename: file.name,
      originalName: file.name,
      fileType: this.getFileType(file.name),
      fileSize: file.size,
      uploadDate: new Date(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      processed: false,
      amount: metadata.amount,
      vat: metadata.vat
    };
    mockDocuments.push(newDocument);
    return newDocument;
  }

  static async deleteDocument(id: string): Promise<void> {
    await delay(300);
    const index = mockDocuments.findIndex(doc => doc.id === id);
    if (index !== -1) {
      mockDocuments.splice(index, 1);
    }
  }

  // ========== TASK OPERATIONS ==========
  static async getTasks(): Promise<Task[]> {
    await delay(300);
    return [...mockTasks];
  }

  static async createTask(taskData: Omit<Task, 'id' | 'createdAt' | 'comments'>): Promise<Task> {
    await delay(400);
    const newTask: Task = {
      ...taskData,
      id: `task_${Date.now()}`,
      createdAt: new Date(),
      comments: []
    };
    mockTasks.push(newTask);
    return newTask;
  }

  static async updateTaskStatus(id: string, status: Task['status']): Promise<Task> {
    await delay(300);
    const task = mockTasks.find(t => t.id === id);
    if (!task) throw new Error('Task not found');
    
    task.status = status;
    if (status === 'completed') {
      task.completedAt = new Date();
    }
    return task;
  }

  // ========== ACCOUNTING OPERATIONS ==========
  static async getAccountingEntries(): Promise<AccountingEntry[]> {
    await delay(300);
    return [...mockAccountingEntries];
  }

  static async createAccountingEntry(entryData: Omit<AccountingEntry, 'id'>): Promise<AccountingEntry> {
    await delay(400);
    const newEntry: AccountingEntry = {
      ...entryData,
      id: `entry_${Date.now()}`
    };
    mockAccountingEntries.push(newEntry);
    return newEntry;
  }

  // ========== DASHBOARD STATS ==========
  static async getDashboardStats() {
    await delay(300);
    return {
      totalClients: mockClients.length,
      activeClients: mockClients.filter(c => c.status === 'active').length,
      pendingDocuments: mockDocuments.filter(d => !d.processed).length,
      pendingTasks: mockTasks.filter(t => t.status !== 'completed').length,
      upcomingDeadlines: mockTasks.filter(t => 
        t.dueDate && 
        new Date(t.dueDate) > new Date() && 
        new Date(t.dueDate) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      ).length,
<<<<<<< HEAD
      monthlyRevenue: 12500,
      totalSpreadsheets:3
=======
      monthlyRevenue: 12500
>>>>>>> dbd45331346e0c62155f5f224ffe5017c2dd5762
    };
  }

  // ========== HELPER METHODS ==========
  private static getFileType(filename: string): Document['fileType'] {
    const ext = filename.split('.').pop()?.toLowerCase();
    if (['pdf'].includes(ext || '')) return 'invoice';
    if (['xlsx', 'xls', 'csv'].includes(ext || '')) return 'payroll';
    if (['jpg', 'jpeg', 'png'].includes(ext || '')) return 'receipt';
    return 'other';
  }
}