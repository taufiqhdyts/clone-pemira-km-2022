import { Prisma } from '@prisma/client';

export class FindManyPelanggaranDto {
  skip?: number;
  take?: number;
  cursor?: Prisma.PelanggaranWhereUniqueInput;
  where?: Prisma.PelanggaranWhereInput;
  orderBy?: Prisma.PelanggaranOrderByWithRelationInput;
}
