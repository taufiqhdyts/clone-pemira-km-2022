import { Prisma } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class CreatePelanggaranDto implements Prisma.PelanggaranCreateInput {
  @IsNotEmpty()
  judul: string;
  @IsNotEmpty()
  sender_name: string;
  @IsNotEmpty()
  sender_ktm_url: string;
  @IsNotEmpty()
  keterangan: string;
  @IsNotEmpty()
  bukti_url: string;
  @IsNotEmpty()
  candidate: {
    connect: {
      id: string;
    };
  };
}
