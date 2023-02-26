import { Prisma } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class CreateChallengeAnswerDto
  implements Prisma.ChallengeAnswerCreateInput
{
  @IsNotEmpty()
  answer: string;
  @IsNotEmpty()
  challenge: {
    connect: {
      id: string;
    };
  };
}
