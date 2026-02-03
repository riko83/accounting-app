import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';
import { logger } from '../utils/logger';
import { ApiResponse, Client, CreateClientRequest } from '@accounting/shared';

interface AuthRequest extends Request {
  user?: any;
}

export const getClients = async (req: AuthRequest, res: Response) => {
  try {
    const clients = await prisma.client.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' }
    });

    const response: ApiResponse<Client[]> = {
      success: true,
      data: clients,
      timestamp: new Date()
    };

    res.json(response);
  } catch (error) {
    logger.error('Get clients error:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Failed to fetch clients',
      timestamp: new Date()
    };
    res.status(500).json(response);
  }
};

export const getClientById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    
    const client = await prisma.client.findFirst({
      where: {
        id,
        userId: req.user.id
      },
      include: {
        documents: true,
        invoices: true
      }
    });

    if (!client) {
      const response: ApiResponse = {
        success: false,
        error: 'Client not found',
        timestamp: new Date()
      };
      return res.status(404).json(response);
    }

    const response: ApiResponse<Client> = {
      success: true,
      data: client,
      timestamp: new Date()
    };

    res.json(response);
  } catch (error) {
    logger.error('Get client error:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Failed to fetch client',
      timestamp: new Date()
    };
    res.status(500).json(response);
  }
};

export const createClient = async (req: AuthRequest, res: Response) => {
  try {
    const data: CreateClientRequest = req.body;
    
    // Check if NIPT already exists
    const existingClient = await prisma.client.findUnique({
      where: { nipt: data.nipt }
    });

    if (existingClient) {
      const response: ApiResponse = {
        success: false,
        error: 'Client with this NIPT already exists',
        timestamp: new Date()
      };
      return res.status(400).json(response);
    }

    const client = await prisma.client.create({
      data: {
        ...data,
        userId: req.user.id
      }
    });

    // Emit socket event
    const io = req.app.get('io');
    if (io) {
      io.to(`user:${req.user.id}`).emit('client:created', client);
    }

    const response: ApiResponse<Client> = {
      success: true,
      message: 'Client created successfully',
      data: client,
      timestamp: new Date()
    };

    res.status(201).json(response);
  } catch (error) {
    logger.error('Create client error:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Failed to create client',
      timestamp: new Date()
    };
    res.status(500).json(response);
  }
};

export const updateClient = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const client = await prisma.client.findFirst({
      where: {
        id,
        userId: req.user.id
      }
    });

    if (!client) {
      const response: ApiResponse = {
        success: false,
        error: 'Client not found',
        timestamp: new Date()
      };
      return res.status(404).json(response);
    }

    const updatedClient = await prisma.client.update({
      where: { id },
      data
    });

    // Emit socket event
    const io = req.app.get('io');
    if (io) {
      io.to(`user:${req.user.id}`).emit('client:updated', updatedClient);
    }

    const response: ApiResponse<Client> = {
      success: true,
      message: 'Client updated successfully',
      data: updatedClient,
      timestamp: new Date()
    };

    res.json(response);
  } catch (error) {
    logger.error('Update client error:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Failed to update client',
      timestamp: new Date()
    };
    res.status(500).json(response);
  }
};

export const deleteClient = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const client = await prisma.client.findFirst({
      where: {
        id,
        userId: req.user.id
      }
    });

    if (!client) {
      const response: ApiResponse = {
        success: false,
        error: 'Client not found',
        timestamp: new Date()
      };
      return res.status(404).json(response);
    }

    await prisma.client.delete({
      where: { id }
    });

    // Emit socket event
    const io = req.app.get('io');
    if (io) {
      io.to(`user:${req.user.id}`).emit('client:deleted', id);
    }

    const response: ApiResponse = {
      success: true,
      message: 'Client deleted successfully',
      timestamp: new Date()
    };

    res.json(response);
  } catch (error) {
    logger.error('Delete client error:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Failed to delete client',
      timestamp: new Date()
    };
    res.status(500).json(response);
  }
};