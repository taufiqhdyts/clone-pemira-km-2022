import { Module } from '@nestjs/common';
import { ChallengeAnswerService } from './challenge-answer.service';
import { ChallengeAnswerController } from './challenge-answer.controller';
import { PrismaService } from 'prisma.service';

@Module({
  controllers: [ChallengeAnswerController],
  providers: [ChallengeAnswerService, PrismaService],
})
export class ChallengeAnswerModule {}
