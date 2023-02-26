import { CandidateType, Prisma } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class CreateCandidateDto implements Prisma.CandidateCreateInput {
  password: string;
  nomor_urut: number;
  type: CandidateType;
  @IsNotEmpty()
  account: {
    connect: {
      id?: string;
      nim?: string;
      email_itb?: string;
    };
  };
}
