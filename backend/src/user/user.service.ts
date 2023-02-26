import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'prisma.service';
import { FindManyUserDto } from './dto/find-many-user.dto';
import { FindOneUserDto } from './dto/find-one-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  findAll(query: FindManyUserDto) {
    const { skip, take, cursor, where, orderBy } = query;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        Vote: true,
      },
    });
  }

  findOne(where: FindOneUserDto) {
    return this.prisma.user.findUnique({
      where,
      include: {
        Vote: true,
      },
    });
  }

  update(id: string, data: UpdateUserDto) {
    return this.prisma.user.update({
      data,
      where: { id },
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
