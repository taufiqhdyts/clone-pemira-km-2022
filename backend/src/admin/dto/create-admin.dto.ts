import { Prisma } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class CreateAdminDto implements Prisma.AdminCreateInput {
  password: string;
  username: string;
  @IsNotEmpty()
  account: {
    connect: {
      id?: string;
      nim?: string;
      email_itb?: string;
    };
  };
}
