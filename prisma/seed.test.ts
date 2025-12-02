// prisma/seed.test.ts

import { TaskPriority, TaskStatus } from '@/src/generated/enums';
import { prisma } from '../app/lib/db';
import bcrypt from 'bcrypt';
import 'dotenv/config';

async function main() {
  console.log('Seeding TEST data...');

  // Clear existing data to guarantee a clean test DB
  await prisma.task.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // ===========================================
  // USERS (deterministic)
  // ===========================================
  const hashedPassword = await bcrypt.hash('testpassword', 10);

  const testUser = await prisma.user.create({
    data: {
      id: 'user-test-1',
      fullName: 'Test User',
      email: 'test@example.com',
      password: hashedPassword,
    },
  });

  console.log('→ Created test user');

  // ===========================================
  // CATEGORIES (deterministic)
  // ===========================================
  const categoryWork = await prisma.category.create({
    data: {
      id: 'cat-work',
      name: 'Work',
      color: '#FF0000',
      userId: testUser.id,
    },
  });

  const categoryPersonal = await prisma.category.create({
    data: {
      id: 'cat-personal',
      name: 'Personal',
      color: '#00FF00',
      userId: testUser.id,
    },
  });

  console.log('→ Created test categories');

  // ===========================================
  // TASKS (deterministic)
  // ===========================================
  await prisma.task.create({
    data: {
      id: 'task-1',
      title: 'Write documentation',
      description: 'Draft API specs for authentication module',
      status: TaskStatus.INCOMPLETE,
      priority: TaskPriority.HIGH,
      userId: testUser.id,
      categoryId: categoryWork.id,
    },
  });

  await prisma.task.create({
    data: {
      id: 'task-2',
      title: 'Buy groceries',
      description: 'Milk, eggs, bread',
      status: TaskStatus.COMPLETE,
      priority: TaskPriority.LOW,
      userId: testUser.id,
      categoryId: categoryPersonal.id,
    },
  });

  await prisma.task.create({
    data: {
      id: 'task-3',
      title: 'Refactor UI components',
      description: null,
      status: TaskStatus.INCOMPLETE,
      priority: TaskPriority.MEDIUM,
      userId: testUser.id,
      categoryId: categoryWork.id,
    },
  });

  console.log('→ Created test tasks');
}

main()
  .then(() => {
    console.log('TEST seed complete.');
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
