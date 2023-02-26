import { Prisma } from '@prisma/client';

export class FindManyChallengeAnswerDto {
  skip?: number;
  take?: number;
  cursor?: Prisma.ChallengeAnswerWhereUniqueInput;
  where?: Prisma.ChallengeAnswerWhereInput;
  orderBy?: Prisma.ChallengeAnswerOrderByWithRelationInput;
}
