import { Controller, Get } from '@nestjs/common';
import { RestrictedOnlyForRoles } from 'auth/role-auth';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @RestrictedOnlyForRoles(['candidate'])
  getHello(): string {
    return this.appService.getHello();
  }
}
