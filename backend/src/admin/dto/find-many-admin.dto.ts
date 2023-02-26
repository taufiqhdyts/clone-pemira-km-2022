import { Prisma } from '@prisma/client';

export class FindManyAdminDto {
  skip?: number;
  take?: number;
  cursor?: Prisma.AdminWhereUniqueInput;
  where?: Prisma.AdminWhereInput;
  orderBy?: Prisma.AdminOrderByWithRelationInput;
}
