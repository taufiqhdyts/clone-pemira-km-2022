import {
  applyDecorators,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ApiTags } from '@nestjs/swagger';
import { AdminService } from 'admin/admin.service';
import { CandidateService } from 'candidate/candidate.service';

type roles = 'admin' | 'candidate';

export const RestrictedOnlyForRoles = (role: roles[]) =>
  applyDecorators(
    SetMetadata('roles', role),
    ApiTags(`Restricted only for roles: ${role.toString()}`),
  );

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private candidateService: CandidateService,
    private adminService: AdminService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<roles[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    for (const index in roles) {
      const role = roles[index];
      switch (role) {
        case 'candidate':
          const candidate = await this.candidateService.findOne({
            id: user.id,
          });
          if (candidate.account_id) {
            return true;
          }
          break;
        case 'admin':
          const admin = await this.adminService.findOne({
            id: user.id,
          });
          if (admin.id) {
            return true;
          }
          break;
        default:
          break;
      }
    }

    throw new UnauthorizedException();
  }
}
