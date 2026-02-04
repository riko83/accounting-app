// src/store/useStore.ts - UPDATED
import { create } from 'zustand';
import { Client, Document, Task, User, DashboardStats,CalendarEvent  } from '../types';
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

export const useStore = create<AppState>((set) => ({
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