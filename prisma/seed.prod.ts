import { prisma } from '@/app/lib/db';

async function main() {
  // Global Categories
  await prisma.category.createMany({
    data: [
      { name: 'General', color: '#808080' },
      { name: 'Work', color: '#1E90FF' },
      { name: 'Personal', color: '#32CD32' },
    ],
  });
}

main()
  .then(() => {
    console.log('Production seed complete.');
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
