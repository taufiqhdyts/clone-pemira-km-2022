import { Prisma } from '@prisma/client';

export class FindManyTopikDebatDto {
  skip?: number;
  take?: number;
  cursor?: Prisma.TopikDebatWhereUniqueInput;
  where?: Prisma.TopikDebatWhereInput;
  orderBy?: Prisma.TopikDebatOrderByWithRelationInput;
}
