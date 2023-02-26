import { Prisma } from '@prisma/client';

export class FindOneChallengeDto implements Prisma.ChallengeWhereUniqueInput {
  id?: string;
}
