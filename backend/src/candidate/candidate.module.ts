import { Module } from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { CandidateController } from './candidate.controller';
import { PrismaService } from 'prisma.service';

@Module({
  controllers: [CandidateController],
  providers: [CandidateService, PrismaService],
})
export class CandidateModule {}
