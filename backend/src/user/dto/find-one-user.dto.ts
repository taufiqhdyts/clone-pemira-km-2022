import { Prisma } from '@prisma/client';

export class FindOneUserDto implements Prisma.UserWhereUniqueInput {
  id?: string;
  nim?: string;
  email_itb?: string;
}
