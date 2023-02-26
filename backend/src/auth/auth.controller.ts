import {
  Body,
  Get,
  Param,
  Query,
  Request,
  Res,
  Response,
} from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { adminLoginDto, candidateLoginDto } from './dto/login.dto';
import { Public } from './jwt-auth';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login-ina')
  @Public()
  ina(@Query('ticket') ticket: string, @Res() res) {
    return this.authService.loginIna(ticket, res);
  }

  @Post('login-admin')
  @Public()
  admin(@Body() loginAdmin: adminLoginDto) {
    return this.authService.loginAdmin(loginAdmin);
  }

  @Post('login-candidate')
  @Public()
  candidate(@Body() loginCandidate: candidateLoginDto) {
    return this.authService.loginCandidate(loginCandidate);
  }

  @Get('me')
  @ApiBearerAuth('JWT')
  me(@Request() req) {
    return this.authService.me(req);
  }
}
