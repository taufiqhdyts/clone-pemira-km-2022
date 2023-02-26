import { Prisma } from '@prisma/client';

export class FindManyCandidateDto {
  skip?: number;
  take?: number;
  cursor?: Prisma.CandidateWhereUniqueInput;
  where?: Prisma.CandidateWhereInput;
  orderBy?: Prisma.CandidateOrderByWithRelationInput;
}
