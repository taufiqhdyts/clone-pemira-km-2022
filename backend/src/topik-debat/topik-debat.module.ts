import { Module } from '@nestjs/common';
import { TopikDebatService } from './topik-debat.service';
import { TopikDebatController } from './topik-debat.controller';
import { PrismaService } from 'prisma.service';

@Module({
  controllers: [TopikDebatController],
  providers: [TopikDebatService, PrismaService],
})
export class TopikDebatModule {}
