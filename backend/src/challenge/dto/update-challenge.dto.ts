import { Prisma, Progress } from '@prisma/client';

export class UpdateChallengeDto implements Prisma.ChallengeUpdateInput {
  sender_name?: string;
  sender_ktm_url?: string;
  payload?: string;
  progress?: Progress;
}
