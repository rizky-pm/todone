import { prisma } from '../src/lib/db';

async function main() {
  await prisma.category.createMany({
    data: [
      { name: 'General', color: '#808080' },
      { name: 'Work', color: '#1E90FF' },
      { name: 'Personal', color: '#32CD32' },
    ],
  });
}

main()
  .then(async () => {
    console.log('Seed complete');
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
