// src/data/mockData.ts
import { Client, Document, Task, AccountingEntry,CalendarEvent } from '../types';

export const mockClients: Client[] = [
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
  },
  {
    id: '6',
    name: 'Auto Service Tirana',
    taxId: 'O65432198Q',
    email: 'service@autoservice.al',
    phone: '+355 69 777 8888',
    address: 'Rr. Dëshmorët, Tiranë',
    status: 'active',
    accountantId: 'acc1',
    createdAt: new Date('2024-02-01'),
    notes: 'Servis automjetesh'
  }
];

export const mockDocuments: Document[] = [
  {
    id: 'doc1',
    clientId: '1',
    filename: 'invoice_jan_2024.pdf',
    originalName: 'Fatura Janar 2024.pdf',
    fileType: 'invoice',
    fileSize: 2450000,
    uploadDate: new Date('2024-01-31'),
    month: 1,
    year: 2024,
    processed: true,
    amount: 12500,
    vat: 2500
  },
  {
    id: 'doc2',
    clientId: '2',
    filename: 'bank_statement_feb.pdf',
    originalName: 'Ekstrakt Bankar Shkurt 2024.pdf',
    fileType: 'bank_statement',
    fileSize: 1800000,
    uploadDate: new Date('2024-02-28'),
    month: 2,
    year: 2024,
    processed: false,
    amount: 8500,
    vat: 1700
  },
  {
    id: 'doc3',
    clientId: '1',
    filename: 'receipt_office_supplies.pdf',
    originalName: 'Faturë furnizime zyre.pdf',
    fileType: 'receipt',
    fileSize: 850000,
    uploadDate: new Date('2024-03-05'),
    month: 3,
    year: 2024,
    processed: true,
    amount: 3500,
    vat: 700
  },
  {
    id: 'doc4',
    clientId: '3',
    filename: 'payroll_mar_2024.xlsx',
    originalName: 'Fletëpagesa Mars 2024.xlsx',
    fileType: 'payroll',
    fileSize: 3200000,
    uploadDate: new Date('2024-03-25'),
    month: 3,
    year: 2024,
    processed: true,
    amount: 28000,
    vat: 0
  },
  {
    id: 'doc5',
    clientId: '2',
    filename: 'tax_declaration_q1.pdf',
    originalName: 'Deklarata TVSH Q1 2024.pdf',
    fileType: 'tax',
    fileSize: 1100000,
    uploadDate: new Date('2024-03-30'),
    month: 3,
    year: 2024,
    processed: false,
    amount: 0,
    vat: 4200
  }
];

export const mockTasks: Task[] = [
  {
    id: 'task1',
    title: 'Përgatit deklaratën e TVSH-së për Mars',
    description: 'Deklarata TVSH për klientin Tech Solutions për muajin Mars 2024',
    clientId: '1',
    assignedTo: 'acc1',
    status: 'in_progress',
    priority: 'high',
    dueDate: new Date('2024-04-05'),
    createdAt: new Date('2024-03-28'),
    comments: [
      {
        id: 'comment1',
        taskId: 'task1',
        userId: 'acc1',
        content: 'Dokumentet janë mbledhur, duke përpunuar',
        createdAt: new Date('2024-03-29')
      }
    ]
  },
  {
    id: 'task2',
    title: 'Kontrollo faturat e shkurtit',
    description: 'Verifikimi i të gjitha faturave të shkurtit për Green Energy',
    clientId: '2',
    assignedTo: 'acc1',
    status: 'pending',
    priority: 'medium',
    dueDate: new Date('2024-04-10'),
    createdAt: new Date('2024-03-29'),
    comments: []
  },
  {
    id: 'task3',
    title: 'Përditëso të dhënat e klientit',
    description: 'Përditëso adresën dhe kontaktet e Food Express',
    clientId: '3',
    assignedTo: 'acc1',
    status: 'completed',
    priority: 'low',
    dueDate: new Date('2024-03-25'),
    createdAt: new Date('2024-03-20'),
    completedAt: new Date('2024-03-24'),
    comments: [
      {
        id: 'comment2',
        taskId: 'task3',
        userId: 'acc1',
        content: 'Të dhënat u përditësuan me sukses',
        createdAt: new Date('2024-03-24')
      }
    ]
  },
  {
    id: 'task4',
    title: 'Gjenero raportin mujor për Shkurt',
    description: 'Raporti financiar mujor për Digital Marketing Pro',
    clientId: '5',
    assignedTo: 'acc1',
    status: 'pending',
    priority: 'high',
    dueDate: new Date('2024-04-03'),
    createdAt: new Date('2024-03-30'),
    comments: []
  }
];

export const mockAccountingEntries: AccountingEntry[] = [
  {
    id: 'entry1',
    clientId: '1',
    date: new Date('2024-03-15'),
    description: 'Faturë shitje - Projekt software',
    debitAccount: '4010 - Të ardhura nga shitjet',
    creditAccount: '1110 - Llogari bankare',
    amount: 12500,
    documentId: 'doc1',
    category: 'revenue',
    vatRate: 20,
    vatAmount: 2500
  },
  {
    id: 'entry2',
    clientId: '1',
    date: new Date('2024-03-14'),
    description: 'Blerje pajisjesh zyre',
    debitAccount: '5210 - Pajisje zyre',
    creditAccount: '1110 - Llogari bankare',
    amount: 3500,
    documentId: 'doc3',
    category: 'expense',
    vatRate: 20,
    vatAmount: 700
  },
  {
    id: 'entry3',
    clientId: '2',
    date: new Date('2024-03-10'),
    description: 'Paguar qira lokali',
    debitAccount: '6310 - Shpenzime qiraje',
    creditAccount: '1110 - Llogari bankare',
    amount: 2000,
    category: 'expense',
    vatRate: 0,
    vatAmount: 0
  }
];
// src/data/mockData.ts - Shto në fund të skedarit

  
  export const mockCalendarEvents: CalendarEvent[] = [
    {
      id: 'event1',
      title: 'Afati i TVSH-së për Mars',
      description: 'Deklarimi dhe pagesa e TVSH-së për muajin Mars',
      startDate: new Date(2024, 2, 15), // 15 Mars 2024
      clientId: '1',
      type: 'tax_deadline',
      priority: 'high',
      status: 'pending',
      createdAt: new Date(2024, 2, 1),
      createdBy: 'acc1'
    },
    {
      id: 'event2',
      title: 'Takim me Tech Solutions',
      description: 'Rishikimi i raporteve tremujore',
      startDate: new Date(2024, 2, 18),
      endDate: new Date(2024, 2, 18, 11, 0),
      clientId: '1',
      type: 'meeting',
      priority: 'medium',
      status: 'pending',
      createdAt: new Date(2024, 2, 10),
      createdBy: 'acc1'
    },
    {
      id: 'event3',
      title: 'Pagesa e faturës së energjisë',
      description: 'Fatura e shkurtit - Green Energy',
      startDate: new Date(2024, 2, 20),
      clientId: '2',
      type: 'payment',
      priority: 'medium',
      status: 'pending',
      createdAt: new Date(2024, 2, 5),
      createdBy: 'acc1'
    },
    {
      id: 'event4',
      title: 'Raporti mujor - Digital Marketing',
      description: 'Gjenerimi i raportit financiar për Shkurt',
      startDate: new Date(2024, 2, 25),
      clientId: '5',
      type: 'report',
      priority: 'high',
      status: 'in_progress',
      createdAt: new Date(2024, 2, 20),
      createdBy: 'acc1'
    },
    {
      id: 'event5',
      title: 'Konsultim me Food Express',
      description: 'Diskutim për optimizimin e shpenzimeve',
      startDate: new Date(2024, 2, 22, 14, 0),
      endDate: new Date(2024, 2, 22, 15, 30),
      clientId: '3',
      type: 'meeting',
      priority: 'low',
      status: 'pending',
      createdAt: new Date(2024, 2, 15),
      createdBy: 'acc1'
    },
    {
      id: 'event6',
      title: 'Përgatitja e bilancit tremujor',
      description: 'Bilanci i tremujorit të parë 2024',
      startDate: new Date(2024, 2, 28),
      clientId: '4',
      type: 'report',
      priority: 'high',
      status: 'pending',
      createdAt: new Date(2024, 2, 25),
      createdBy: 'acc1'
    },
    {
      id: 'event7',
      title: 'Kujtesë: Nisja e planifikimit tatimor',
      description: 'Planifikimi i strategjisë tatimore për vitin 2024',
      startDate: new Date(2024, 3, 5),
      clientId: '6',
      type: 'reminder',
      priority: 'medium',
      status: 'pending',
      createdAt: new Date(2024, 2, 28),
      createdBy: 'acc1'
    },
    {
      id: 'event8',
      title: 'Takim me Construct Plus',
      description: 'Rishikimi i kontratave dhe pagesave',
      startDate: new Date(2024, 2, 29, 10, 0),
      endDate: new Date(2024, 2, 29, 11, 30),
      clientId: '4',
      type: 'meeting',
      priority: 'medium',
      status: 'pending',
      createdAt: new Date(2024, 2, 22),
      createdBy: 'acc1'
    }
  ];