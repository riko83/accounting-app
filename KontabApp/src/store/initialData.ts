// src/store/initialData.ts
import { Client, Document, Task } from '../types';

export const initialClients: Client[] = [
  {
    id: '1',
    name: 'Tech Solutions Sh.P.K',
    taxId: 'K12345678L',
    email: 'info@techsolutions.al',
    phone: '+355 69 123 4567',
    address: 'Rr. Deshmoret e Kombit, Tirana',
    status: 'active',
    accountantId: 'acc1',
    createdAt: new Date('2024-01-15'),
    notes: 'Klient i rregullt, pagesa në kohë'
  },
  {
    id: '2',
    name: 'Green Energy AL',
    taxId: 'J87654321M',
    email: 'contact@greenenergy.al',
    phone: '+355 68 987 6543',
    address: 'Rr. Myslym Shyri, Durrës',
    status: 'active',
    accountantId: 'acc1',
    createdAt: new Date('2024-02-20'),
    notes: 'Kërkon raporte mujore'
  },
  {
    id: '3',
    name: 'Food Express',
    taxId: 'L45678912N',
    email: 'accounting@foodexpress.al',
    phone: '+355 67 456 7890',
    address: 'Rr. Kavajës, Tiranë',
    status: 'pending',
    accountantId: 'acc1',
    createdAt: new Date('2024-03-10'),
    notes: 'Në pritje të dokumenteve'
  },
  {
    id: '4',
    name: 'Construct Plus',
    taxId: 'M98765432O',
    email: 'office@constructplus.al',
    phone: '+355 69 555 4444',
    address: 'Rr. 28 Nëntori, Vlorë',
    status: 'inactive',
    accountantId: 'acc1',
    createdAt: new Date('2023-12-05'),
    notes: 'Përkohësisht i ndalur'
  },
  {
    id: '5',
    name: 'Digital Marketing Pro',
    taxId: 'N12398765P',
    email: 'finance@digitalpro.al',
    phone: '+355 68 222 3333',
    address: 'Rr. Gjergj Fishta, Tiranë',
    status: 'active',
    accountantId: 'acc1',
    createdAt: new Date('2024-03-01'),
    notes: 'Startup, kërkon ndihmë të shpeshtë'
  }
];

export const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Përgatit deklaratën e TVSH-së për Mars',
    description: 'Deklarata TVSH për klientin Tech Solutions',
    clientId: '1',
    assignedTo: 'acc1',
    status: 'in_progress',
    priority: 'high',
    dueDate: new Date('2024-04-05'),
    createdAt: new Date('2024-03-28'),
    comments: []
  },
  {
    id: '2',
    title: 'Kontrollo faturat e shkurtit',
    description: 'Verifikimi i të gjitha faturave të shkurtit',
    clientId: '2',
    assignedTo: 'acc1',
    status: 'pending',
    priority: 'medium',
    dueDate: new Date('2024-04-10'),
    createdAt: new Date('2024-03-29'),
    comments: []
  },
  {
    id: '3',
    title: 'Përditëso të dhënat e klientit',
    description: 'Përditëso adresën dhe kontaktet e Food Express',
    clientId: '3',
    assignedTo: 'acc1',
    status: 'completed',
    priority: 'low',
    dueDate: new Date('2024-03-25'),
    createdAt: new Date('2024-03-20'),
    completedAt: new Date('2024-03-24'),
    comments: []
  }
];

// Shto në store-in tënd në fillim:
// src/store/useStore.ts - shto në fund të create:
/*
  setClients(initialClients),
  setTasks(initialTasks),
*/