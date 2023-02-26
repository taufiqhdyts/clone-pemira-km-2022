import { Prisma } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export enum Progress {
  BELUM_DISETUJUI_ADMIN_DAN_KANDIDAT = 'BELUM_DISETUJUI_ADMIN_DAN_KANDIDAT',
  BELUM_DISETUJUI_ADMIN = 'BELUM_DISETUJUI_ADMIN',
  BELUM_DISETUJUI_KANDIDAT = 'BELUM_DISETUJUI_KANDIDAT',
  DISETUJUI = 'DISETUJUI',
  REJECTED = 'REJECTED',
}

export class AcceptChallengeDto implements Prisma.ChallengeUpdateInput {
  @IsNotEmpty()
  challenge_id: string;
  @IsNotEmpty()
  progress: Progress;
}
