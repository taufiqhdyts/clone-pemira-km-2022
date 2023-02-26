import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findMany();

  console.log(user);

  const votes = await prisma.vote.findMany();

  console.log(votes);
}

main();
