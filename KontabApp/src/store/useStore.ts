// src/store/useStore.ts - UPDATED
import { create } from 'zustand';
<<<<<<< HEAD
import { Client, Document, Task, User, DashboardStats,CalendarEvent, Spreadsheet  } from '../types';
=======
import { Client, Document, Task, User, DashboardStats,CalendarEvent  } from '../types';
>>>>>>> dbd45331346e0c62155f5f224ffe5017c2dd5762
import { mockClients, mockDocuments, mockTasks, mockCalendarEvents } from '../data/mockData';

const storedToken = localStorage.getItem('authToken');
const storedUserRaw = localStorage.getItem('authUser');
const storedUser = storedUserRaw ? JSON.parse(storedUserRaw) : null;

interface AppState {
  // User state
  user: User | null;
  setUser: (user: User | null) => void;
  
  // Clients state
  clients: Client[];
  selectedClient: Client | null;
  setClients: (clients: Client[]) => void;
  setSelectedClient: (client: Client | null) => void;
  addClient: (client: Client) => void;
  updateClient: (id: string, updates: Partial<Client>) => void;
  deleteClient: (id: string) => void;
<<<<<<< HEAD

  // Të dhënat për Spreadsheets
  spreadsheets: Spreadsheet[];
  currentSpreadsheet: Spreadsheet | null;
  recentSpreadsheets: Spreadsheet[]; 


  // Veprimet për Spreadsheets
  setSpreadsheets: (spreadsheets: Spreadsheet[]) => void;
  setCurrentSpreadsheet: (spreadsheet: Spreadsheet | null) => void;
  setRecentSpreadsheets: (spreadsheets: Spreadsheet[]) => void;
  addSpreadsheet: (spreadsheet: Spreadsheet) => void;
  updateSpreadsheet: (id: string, updates: Partial<Spreadsheet>) => void;
  deleteSpreadsheet: (id: string) => void;
  // Utility functions
  getSpreadsheetById: (id: string) => Spreadsheet | undefined;
  getRecentSpreadsheets: (limit?: number) => Spreadsheet[];
=======
  
>>>>>>> dbd45331346e0c62155f5f224ffe5017c2dd5762
  // Documents state
  documents: Document[];
  selectedDocument: Document | null;
  setDocuments: (documents: Document[]) => void;
  setSelectedDocument: (document: Document | null) => void;
  addDocument: (document: Document) => void;
  deleteDocument: (id: string) => void;
  
  // Tasks state
  tasks: Task[];
  selectedTask: Task | null;
  setTasks: (tasks: Task[]) => void;
  setSelectedTask: (task: Task | null) => void;
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  
  // UI state
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  notification: { type: 'success' | 'error' | 'info'; message: string } | null;
  setNotification: (notification: AppState['notification']) => void;
  
  // Dashboard stats
  dashboardStats: DashboardStats | null;
  setDashboardStats: (stats: DashboardStats | null) => void;

  calendarEvents: CalendarEvent[];
  setCalendarEvents: (events: CalendarEvent[]) => void;
  addCalendarEvent: (event: CalendarEvent) => void;
  updateCalendarEvent: (id: string, updates: Partial<CalendarEvent>) => void;
  deleteCalendarEvent: (id: string) => void;
}

<<<<<<< HEAD
export const useStore = create<AppState>((set,get) => ({
=======
export const useStore = create<AppState>((set) => ({
>>>>>>> dbd45331346e0c62155f5f224ffe5017c2dd5762
  user: storedUser,
  authToken: storedToken,
  setUser: (user) => set({ user }),
  setAuth: (user, token) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('authUser', JSON.stringify(user));
    set({ user, authToken: token });
  },
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    set({ user: null, authToken: null });
  },
<<<<<<< HEAD
  // Spreadsheets initial state
  spreadsheets: [],
  currentSpreadsheet: null,
  recentSpreadsheets: [],
  // Spreadsheet actions
  setSpreadsheets: (spreadsheets) => set({ spreadsheets }),
  setCurrentSpreadsheet: (spreadsheet) => set({ currentSpreadsheet: spreadsheet }),
  setRecentSpreadsheets: (recentSpreadsheets) => set({ recentSpreadsheets }),
  addSpreadsheet: (spreadsheet) => 
    set((state) => ({ 
      spreadsheets: [...state.spreadsheets, spreadsheet],
      recentSpreadsheets: [spreadsheet, ...state.recentSpreadsheets.slice(0, 4)]
    })),
  updateSpreadsheet: (id, updates) =>
    set((state) => ({
      spreadsheets: state.spreadsheets.map(sp => 
        sp.id === id ? { ...sp, ...updates, updatedAt: new Date() } : sp
      ),
      recentSpreadsheets: state.recentSpreadsheets.map(sp =>
        sp.id === id ? { ...sp, ...updates, updatedAt: new Date() } : sp
      ),
      currentSpreadsheet: state.currentSpreadsheet?.id === id 
        ? { ...state.currentSpreadsheet, ...updates, updatedAt: new Date() }
        : state.currentSpreadsheet
    })),
  deleteSpreadsheet: (id) =>
    set((state) => ({
      spreadsheets: state.spreadsheets.filter(sp => sp.id !== id),
      recentSpreadsheets: state.recentSpreadsheets.filter(sp => sp.id !== id),
      currentSpreadsheet: state.currentSpreadsheet?.id === id 
        ? null 
        : state.currentSpreadsheet
    })),
    // Utility functions
  getSpreadsheetById: (id) => {
    return get().spreadsheets.find(sp => sp.id === id);
  },
  getRecentSpreadsheets: (limit = 5) => {
    const spreadsheets = get().spreadsheets;
    return [...spreadsheets]
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, limit);
  },
=======
  
>>>>>>> dbd45331346e0c62155f5f224ffe5017c2dd5762
  clients: mockClients,
  selectedClient: null,
  setClients: (clients) => set({ clients }),
  setSelectedClient: (client) => set({ selectedClient: client }),
  addClient: (client) => set((state) => ({ clients: [...state.clients, client] })),
  updateClient: (id, updates) => set((state) => ({
    clients: state.clients.map(client => 
      client.id === id ? { ...client, ...updates } : client
    )
  })),
  deleteClient: (id) => set((state) => ({
    clients: state.clients.filter(client => client.id !== id)
  })),
  
  documents: mockDocuments,
  selectedDocument: null,
  setDocuments: (documents) => set({ documents }),
  setSelectedDocument: (document) => set({ selectedDocument: document }),
  addDocument: (document) => set((state) => ({ documents: [...state.documents, document] })),
  deleteDocument: (id) => set((state) => ({
    documents: state.documents.filter(doc => doc.id !== id)
  })),
  
  tasks: mockTasks,
  selectedTask: null,
  setTasks: (tasks) => set({ tasks }),
  setSelectedTask: (task) => set({ selectedTask: task }),
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  updateTask: (id, updates) => set((state) => ({
    tasks: state.tasks.map(task => 
      task.id === id ? { ...task, ...updates } : task
    )
  })),
  deleteTask: (id) => set((state) => ({
    tasks: state.tasks.filter(task => task.id !== id)
  })),
  
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
  notification: null,
  setNotification: (notification) => set({ notification }),
  
  dashboardStats: {
    totalClients: mockClients.length,
    activeClients: mockClients.filter(c => c.status === 'active').length,
    pendingDocuments: mockDocuments.filter(d => !d.processed).length,
    pendingTasks: mockTasks.filter(t => t.status !== 'completed').length,
    upcomingDeadlines: 3,
    monthlyRevenue: 12500
  },
  setDashboardStats: (stats) => set({ dashboardStats: stats }),
  calendarEvents: mockCalendarEvents,
  setCalendarEvents: (events) => set({ calendarEvents: events }),
  addCalendarEvent: (event) => set((state) => ({ 
    calendarEvents: [...state.calendarEvents, event] 
  })),
  updateCalendarEvent: (id, updates) => set((state) => ({
    calendarEvents: state.calendarEvents.map(event => 
      event.id === id ? { ...event, ...updates } : event
    )
  })),
  deleteCalendarEvent: (id) => set((state) => ({
    calendarEvents: state.calendarEvents.filter(event => event.id !== id)
  })),
}));