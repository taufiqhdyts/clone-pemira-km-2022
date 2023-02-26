import { Module } from '@nestjs/common';
import { PelanggaranService } from './pelanggaran.service';
import { PelanggaranController } from './pelanggaran.controller';
import { PrismaService } from 'prisma.service';

@Module({
  controllers: [PelanggaranController],
  providers: [PelanggaranService, PrismaService],
})
export class PelanggaranModule {}
