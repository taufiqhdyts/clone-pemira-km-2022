import { Prisma } from '@prisma/client';

export class FindOnePelanggaranDto
  implements Prisma.PelanggaranWhereUniqueInput
{
  id?: string;
}
