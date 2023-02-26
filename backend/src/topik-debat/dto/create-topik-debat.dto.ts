import { Prisma } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class CreateTopikDebatDto implements Prisma.TopikDebatCreateInput {
  @IsNotEmpty()
  nama: string;
  @IsNotEmpty()
  sender_name: string;
  lembaga?: string | null;
  @IsNotEmpty()
  sender_ktm_url: string;
}
