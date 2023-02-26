import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
const prisma = new PrismaClient();

const getRandom = (arr) => {
  const index = Math.abs(Math.floor(Math.random() * arr.length - 2));
  return arr[index];
};

async function main() {
  console.log('CREATING USER....');
  await prisma.user.createMany({
    data: Array.from(Array(100)).map(() => ({
      nim: faker.datatype.number().toString(),
      email_itb: faker.internet.email(),
      email_non_itb: faker.internet.email(),
      long_name: faker.name.findName(),
      short_name: faker.name.firstName(),
      fakultas: faker.lorem.words(),
    })),
  });
  console.log('SUCCESS!');

  console.log('GETTING USER....');
  const users = await prisma.user.findMany({
    skip: 30,
    take: 10,
  });
  console.log('SUCCESS!');

  console.log('CREATING CANDIDATE....');
  await prisma.candidate.createMany({
    data: users.map((user) => ({
      account_id: user.id,
      type: Math.floor(Math.random() * 2) ? 'K3M' : 'MWAWM',
    })) as any,
    skipDuplicates: true,
  });
  console.log('SUCCESS!');

  console.log('CREATING ADMIN....');
  // await prisma.admin.create({
  //   data: {
  //     account_id: users[0].id,
  //   },
  // });
  console.log('SUCCESS!');

  console.log('GETTING CANDIDATE....');
  const candidates = await prisma.candidate.findMany();
  console.log('SUCCESS!');

  console.log('CREATING CHALLENGE....');
  await prisma.challenge.createMany({
    data: Array.from(Array(20)).map(() => ({
      judul: faker.lorem.words(),
      sender_name: faker.name.findName(),
      sender_ktm_url: faker.image.imageUrl(),
      candidate_id: getRandom(candidates).id,
      payload: faker.lorem.words(),
    })),
  });
  console.log('SUCCESS!');

  console.log('GETTING CHALLENGE....');
  const challenges = await prisma.challenge.findMany({
    take: 10,
  });
  console.log('SUCCESS!');

  console.log('CREATING CHALLENGE ANSWER....');
  await prisma.challengeAnswer.createMany({
    data: challenges.map((challenge) => ({
      challenge_id: challenge.id,
      answer: faker.image.imageUrl(),
    })),
  });
  console.log('SUCCESS!');

  console.log('CREATING PELANGGARAN....');
  await prisma.pelanggaran.createMany({
    data: Array.from(Array(3)).map(() => ({
      judul: faker.lorem.word(),
      sender_name: faker.name.findName(),
      sender_ktm_url: faker.image.imageUrl(),
      candidate_id: getRandom(candidates).id,
      keterangan: faker.lorem.words(),
      bukti_url: faker.image.imageUrl(),
    })),
  });
  console.log('SUCCESS!');

  console.log('CREATING TOPIK DEBAT....');
  await prisma.topikDebat.createMany({
    data: Array.from(Array(20)).map(() => ({
      nama: faker.lorem.words(),
      sender_name: faker.name.findName(),
      sender_ktm_url: faker.image.imageUrl(),
      lembaga: Math.floor(Math.random() * 2) ? '' : faker.lorem.words(),
    })),
  });
  console.log('SUCCESS!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
