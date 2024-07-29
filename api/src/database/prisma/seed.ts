import argon2 from 'argon2';
import { PrismaClient, Prisma, UserRole } from '@prisma/client';
const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'admin',
    email: 'admin@mail.com',
    phone: '812634746122',
    password: 'P@ssw0rd',
    role: UserRole.ADMIN,
  },
  {
    name: 'Pimpinan',
    email: 'pimpinan@mail.com',
    phone: '812634346122',
    password: 'P@ssw0rd',
    role: UserRole.ADVISER,
  },
];

async function main() {
  console.log(`Start seeding ...`);
  const password = await argon2.hash('P@ssw0rd');
  for (const data of userData) {
    const user = await prisma.user.create({
      data: { ...data, password },
    });
    console.log(`Created user with id: ${user.id}`);
  }

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
