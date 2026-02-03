import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker/locale/en';
import { logger } from '../utils/logger';

const prisma = new PrismaClient();

async function main() {
  logger.info('🌱 Starting database seeding...');

  // Clear existing data
  await prisma.activity.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.document.deleteMany();
  await prisma.client.deleteMany();
  await prisma.user.deleteMany();

  logger.info('🗑️  Cleared existing data');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@accounting.app',
      name: 'Administrator',
      password: adminPassword,
      role: 'ADMIN',
      isVerified: true,
      phone: '+355 67 123 4567'
    }
  });

  // Create accountant user
  const accountantPassword = await bcrypt.hash('accountant123', 10);
  const accountant = await prisma.user.create({
    data: {
      email: 'accountant@accounting.app',
      name: 'Kontabilist Test',
      password: accountantPassword,
      role: 'ACCOUNTANT',
      isVerified: true,
      phone: '+355 68 987 6543'
    }
  });

  logger.info(`✅ Created users: ${admin.email}, ${accountant.email}`);

  // Create sample clients
  const clientNames = [
    'Restorant Palma',
    'Kafe Bar Dritë',
    'Ndërtimtari Sh.p.k',
    'Market Ushqimore',
    'Auto Servis',
    'Farmaci Dr. Shëndeti',
    'Hotel Riviera',
    'Salon Bukurie',
    'Transporti i Shpejtë',
    'Klinika Dentare'
  ];

  const cities = ['Tiranë', 'Durrës', 'Vlorë', 'Shkodër', 'Elbasan', 'Korçë', 'Fier', 'Berat'];

  for (let i = 0; i < clientNames.length; i++) {
    const client = await prisma.client.create({
      data: {
        name: clientNames[i],
        nipt: `L${String(i + 1).padStart(8, '0')}A`,
        email: faker.internet.email().toLowerCase(),
        phone: faker.phone.number(),
        address: faker.location.streetAddress(),
        city: cities[i % cities.length],
        status: i < 8 ? 'ACTIVE' : 'INACTIVE',
        userId: accountant.id,
        notes: i === 0 ? 'Klient kryesor që nga 2020' : null
      }
    });
    logger.info(`Created client: ${client.name} (${client.nipt})`);
  }

  logger.info(`✅ Created ${clientNames.length} clients`);

  // Get all clients
  const clients = await prisma.client.findMany();

  // Create sample documents
  const documentTypes = ['INVOICE', 'RECEIPT', 'CONTRACT', 'BALANCE_SHEET', 'VAT_DECLARATION'];
  
  for (const client of clients.slice(0, 5)) {
    for (let i = 0; i < 3; i++) {
      const docType = documentTypes[Math.floor(Math.random() * documentTypes.length)];
      await prisma.document.create({
        data: {
          name: `${docType.toLowerCase().replace('_', ' ')} - ${faker.date.month()} 2023`,
          type: docType,
          fileUrl: `/uploads/sample-${docType.toLowerCase()}.pdf`,
          fileSize: Math.floor(Math.random() * 5000000) + 100000,
          mimeType: 'application/pdf',
          description: faker.lorem.sentence(),
          clientId: client.id,
          userId: accountant.id,
          metadata: {
            uploadedAt: new Date().toISOString(),
            pages: docType === 'BALANCE_SHEET' ? 5 : 2
          }
        }
      });
    }
  }

  logger.info('✅ Created sample documents');

  // Create sample transactions
  const categories = ['Ushqim', 'Produkte', 'Shërbime', 'Paga', 'TVSH', 'Taksa', 'Komunikim', 'Energji'];
  
  for (const client of clients.slice(0, 3)) {
    for (let i = 0; i < 20; i++) {
      const isIncome = Math.random() > 0.6;
      const amount = Math.floor(Math.random() * 5000) + 100;
      const vatRate = isIncome ? 0.2 : 0;
      const vatAmount = amount * vatRate;
      
      await prisma.transaction.create({
        data: {
          date: faker.date.between({ from: '2023-01-01', to: '2023-12-31' }),
          description: isIncome 
            ? `Pagesë nga ${faker.company.name()}`
            : `Shpenzim për ${faker.commerce.productName()}`,
          amount,
          type: isIncome ? 'INCOME' : 'EXPENSE',
          category: categories[Math.floor(Math.random() * categories.length)],
          vatRate,
          vatAmount,
          totalAmount: amount + vatAmount,
          reference: `REF-${String(i + 1).padStart(6, '0')}`,
          clientId: client.id,
          userId: accountant.id
        }
      });
    }
  }

  logger.info('✅ Created sample transactions');

  // Create sample invoices
  for (const client of clients.slice(0, 2)) {
    for (let i = 1; i <= 3; i++) {
      const subtotal = Math.floor(Math.random() * 5000) + 1000;
      const vatAmount = subtotal * 0.2;
      const totalAmount = subtotal + vatAmount;
      
      await prisma.invoice.create({
        data: {
          invoiceNumber: `INV-2023-${String(i).padStart(4, '0')}`,
          clientId: client.id,
          userId: accountant.id,
          issueDate: new Date(2023, i - 1, 15),
          dueDate: new Date(2023, i - 1, 30),
          status: i === 1 ? 'PAID' : i === 2 ? 'PENDING' : 'OVERDUE',
          items: [
            { description: 'Shërbime kontabiliteti', quantity: 1, price: subtotal * 0.8 },
            { description: 'Konsulencë tatimore', quantity: 1, price: subtotal * 0.2 }
          ],
          subtotal,
          vatAmount,
          totalAmount,
          notes: i === 3 ? 'Kujdes! Fatura e vonuar' : null,
          pdfUrl: i === 1 ? '/uploads/invoice-001.pdf' : null
        }
      });
    }
  }

  logger.info('✅ Created sample invoices');

  logger.info('🎉 Database seeding completed successfully!');
}

main()
  .catch((error) => {
    logger.error('❌ Seeding error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });