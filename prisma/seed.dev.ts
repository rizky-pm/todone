import { hashPassword } from '@/app/lib/auth';
import { prisma } from '../app/lib/db';
import { faker } from '@faker-js/faker';
import 'dotenv/config';

async function main() {
  console.log('Seeding development data...');

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
          status: faker.helpers.arrayElement(['INCOMPLETE', 'COMPLETE']),
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
