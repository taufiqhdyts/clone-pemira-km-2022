import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';
const prisma = new PrismaClient();

async function main() {
  try {
    const users = [
      {
        nim: '15518050',
        long_name: 'Maulvi Azmiwinata',
        email_non_itb: '-',
        email_itb: '-',
        fakultas: 'FTSL',
        short_name: 'Azmiwinata',
        role: 'CANDIDATE' as any,
      },
      {
        nim: '-',
        long_name: 'Kotak Kosong',
        email_itb: 'undefined',
        email_non_itb: '-',
        fakultas: 'FTTM',
        short_name: '-',
        role: 'CANDIDATE' as any,
      },
    ];

    await prisma.user.createMany({
      data: users,
    });

    const user_database = await prisma.user.findMany();

    const final_user = [];
    // create user with password hashed by argon
    for (const user of user_database) {
      const password = Math.random().toString(36).substr(2, 9);
      const hashedPassword = await argon2.hash(password);
      final_user.push({
        account_id: user.id,
        password: hashedPassword,
        type: 'MWAWM',
        nomor_urut: user.nim === '15518050' ? 1 : 2,
      });

      console.log({
        user,
        password,
        nomor_urut: user.nim === '15518050' ? 1 : 2,
      });
    }

    console.log(final_user);

    await prisma.candidate.createMany({
      data: final_user,
    });
  } catch (err) {
    console.log(err);
  }
}

main();
