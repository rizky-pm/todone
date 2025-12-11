// prisma/seed.ts
import { execSync } from 'child_process';
import 'dotenv/config';

const env = process.env.NODE_ENV;

if (env === 'development') {
  execSync('tsx prisma/seed.dev.ts', { stdio: 'inherit' });
} else if (env === 'test') {
  execSync('tsx prisma/seed.test.ts', { stdio: 'inherit' });
} else if (env === 'production') {
  execSync('tsx prisma/seed.prod.ts', { stdio: 'inherit' });
} else {
  console.log(`No seeding defined for NODE_ENV="${env}"`);
}

// import { prisma } from '../app/lib/db';

// async function main() {
//   await prisma.category.createMany({
//     data: [
//       { name: 'General', color: '#808080' },
//       { name: 'Work', color: '#1E90FF' },
//       { name: 'Personal', color: '#32CD32' },
//     ],
//   });
// }

// main()
//   .then(async () => {
//     console.log('Seed complete');
//     await prisma.$disconnect();
//   })
//   .catch(async (err) => {
//     console.error(err);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
