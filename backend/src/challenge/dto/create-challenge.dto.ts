import { Prisma } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class CreateChallengeDto implements Prisma.ChallengeCreateInput {
  @IsNotEmpty()
  judul: string;
  @IsNotEmpty()
  sender_name: string;
  @IsNotEmpty()
  sender_ktm_url: string;
  @IsNotEmpty()
  payload: string;
  candidate: {
    connect: {
      id?: string;
    };
  };
}
