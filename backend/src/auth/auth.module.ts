import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HttpModule } from '@nestjs/axios';
import { UserService } from 'user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { jwtConstants } from './constants';
import { PrismaService } from 'prisma.service';
import { JwtStrategy } from './jwt-auth';
import { AdminService } from 'admin/admin.service';
import { CandidateService } from 'candidate/candidate.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule,
    JwtModule.register({ secret: jwtConstants.secret }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    UserService,
    CandidateService,
    AdminService,
    JwtStrategy,
  ],
})
export class AuthModule {}
