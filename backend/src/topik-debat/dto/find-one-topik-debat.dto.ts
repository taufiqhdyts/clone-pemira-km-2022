import { Prisma } from '@prisma/client';

export class FindOneTopikDebatDto implements Prisma.TopikDebatWhereUniqueInput {
  id?: string;
}
