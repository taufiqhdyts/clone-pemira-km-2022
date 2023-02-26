import { Prisma } from '@prisma/client';

export class FindOneChallengeAnswerDto
  implements Prisma.ChallengeAnswerWhereUniqueInput
{
  id?: string;
  challenge_id?: string;
}
