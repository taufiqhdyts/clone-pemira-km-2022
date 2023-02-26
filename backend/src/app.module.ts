import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ChallengeModule } from './challenge/challenge.module';
import { CandidateModule } from './candidate/candidate.module';
import { ChallengeAnswerModule } from './challenge-answer/challenge-answer.module';
import { PelanggaranModule } from './pelanggaran/pelanggaran.module';
import { VoteModule } from './vote/vote.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'auth/jwt-auth';
import { RolesGuard } from 'auth/role-auth';
import { UserService } from 'user/user.service';
import { PrismaService } from 'prisma.service';
import { CandidateService } from 'candidate/candidate.service';
import { AdminModule } from './admin/admin.module';
import { AdminService } from 'admin/admin.service';
import { TopikDebatModule } from './topik-debat/topik-debat.module';

@Module({
  imports: [
    UserModule,
    ChallengeModule,
    CandidateModule,
    ChallengeAnswerModule,
    PelanggaranModule,
    VoteModule,
    AuthModule,
    AdminModule,
    TopikDebatModule,
  ],
  controllers: [AppController],
  providers: [
    PrismaService,
    CandidateService,
    AppService,
    UserService,
    AdminService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
