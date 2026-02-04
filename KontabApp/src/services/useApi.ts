// src/services/useApi.ts - React Hook for API
import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { ApiService } from './api';
import { Client, Document, Task, AccountingEntry } from '../types';

export const useApi = () => {
  const [loading, setLoading] = useState(false);

  const handleError = (error: any) => {
    console.error('API Error:', error);
    toast.error(error.message || 'Diçka shkoi keq');
    throw error;
  };

  // Clients
  const getClients = useCallback(async () => {
    setLoading(true);
    try {
      return await ApiService.getClients();
    } catch (error) {
      return handleError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const createClient = useCallback(async (clientData: Omit<Client, 'id' | 'createdAt'>) => {
    setLoading(true);
    try {
      const client = await ApiService.createClient(clientData);
      toast.success('Klienti u krijua me sukses');
      return client;
    } catch (error) {
      return handleError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateClient = useCallback(async (id: string, updates: Partial<Client>) => {
    setLoading(true);
    try {
      const client = await ApiService.updateClient(id, updates);
      toast.success('Klienti u përditësua me sukses');
      return client;
    } catch (error) {
      return handleError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteClient = useCallback(async (id: string) => {
    setLoading(true);
    try {
      await ApiService.deleteClient(id);
      toast.success('Klienti u fshi me sukses');
    } catch (error) {
      return handleError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Documents
  const getDocuments = useCallback(async () => {
    setLoading(true);
    try {
      return await ApiService.getDocuments();
    } catch (error) {
      return handleError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const uploadDocument = useCallback(async (file: File, clientId: string, metadata: any) => {
    setLoading(true);
    try {
      const document = await ApiService.uploadDocument(file, clientId, metadata);
      toast.success('Dokumenti u ngarkua me sukses');
      return document;
    } catch (error) {
      return handleError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Tasks
  const getTasks = useCallback(async () => {
    setLoading(true);
    try {
      return await ApiService.getTasks();
    } catch (error) {
      return handleError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const createTask = useCallback(async (taskData: Omit<Task, 'id' | 'createdAt' | 'comments'>) => {
    setLoading(true);
    try {
      const task = await ApiService.createTask(taskData);
      toast.success('Detyra u krijua me sukses');
      return task;
    } catch (error) {
      return handleError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateTaskStatus = useCallback(async (id: string, status: Task['status']) => {
    setLoading(true);
    try {
      const task = await ApiService.updateTaskStatus(id, status);
      toast.success('Statusi i detyrës u përditësua');
      return task;
    } catch (error) {
      return handleError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Dashboard
  const getDashboardStats = useCallback(async () => {
    setLoading(true);
    try {
      return await ApiService.getDashboardStats();
    } catch (error) {
      return handleError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    // Clients
    getClients,
    createClient,
    updateClient,
    deleteClient,
    // Documents
    getDocuments,
    uploadDocument,
    // Tasks
    getTasks,
    createTask,
    updateTaskStatus,
    // Dashboard
    getDashboardStats
  };
};