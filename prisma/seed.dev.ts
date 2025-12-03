import { hashPassword } from '@/app/lib/auth';
import { prisma } from '../app/lib/db';
import { faker } from '@faker-js/faker';
import 'dotenv/config';

async function main() {
  console.log('Seeding development data...');

  // Clear existing data to guarantee a clean test DB
  await prisma.task.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // ===========================================
  // 1. CREATE USERS
  // ===========================================
  const users = [];
  for (let i = 0; i < 5; i++) {
    const hashedPassword = await hashPassword('devpassword');

    const user = await prisma.user.create({
      data: {
        fullName: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        password: hashedPassword,
      },
    });

    users.push(user);
  }

  console.log(`→ Created ${users.length} users`);

  // ===========================================
  // 2. CREATE CATEGORIES FOR EACH USER
  // ===========================================
  const categories = [];

  // Global Categories
  await prisma.category.createMany({
    data: [
      { name: 'General', color: '#808080' },
      { name: 'Work', color: '#1E90FF' },
      { name: 'Personal', color: '#32CD32' },
    ],
  });

  // Categories belong to user
  for (const user of users) {
    for (let i = 0; i < 3; i++) {
      const category = await prisma.category.create({
        data: {
          name: faker.commerce.department(),
          color: faker.color.rgb(), // or faker.internet.color()
          userId: user.id,
        },
      });

      categories.push(category);
    }
  }

  console.log(`→ Created ${categories.length} categories`);

  // ===========================================
  // 3. CREATE TASKS FOR EACH CATEGORY
  // ===========================================
  const tasks = [];

  for (const category of categories) {
    for (let i = 0; i < 5; i++) {
      const created = await prisma.task.create({
        data: {
          title: faker.lorem.sentence(),
          description: faker.lorem.paragraph(),
          dueDate: faker.date.between({
            from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // past 7 days
            to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // next 7 days
          }),
          completedAt: faker.helpers.maybe(() =>
            faker.date.between({
              from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // past 7 days
              to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // next 7 days
            })
          ),
          priority: faker.helpers.arrayElement(['LOW', 'MEDIUM', 'HIGH']),
          userId: category.userId!, // each category belongs to exactly one user
          categoryId: category.id,
        },
      });

      tasks.push(created);
    }
  }

  console.log(`→ Created ${tasks.length} tasks`);
}

main()
  .then(() => {
    console.log('Development seed complete.');
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
