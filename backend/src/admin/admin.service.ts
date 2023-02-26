import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { PrismaService } from 'prisma.service';
import { FindManyAdminDto } from './dto/find-many-admin.dto';
import { FindOneAdminDto } from './dto/find-one-admin.dto';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  create(createAdminDto: CreateAdminDto) {
    return this.prisma.admin.create({
      data: createAdminDto,
    });
  }

  findAll(query: FindManyAdminDto) {
    const { skip, take, cursor, where, orderBy } = query;
    return this.prisma.admin.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  findOne(where: FindOneAdminDto) {
    return this.prisma.admin.findUnique({
      where,
    });
  }

  update(id: string, data: UpdateAdminDto) {
    return this.prisma.admin.update({
      data,
      where: { id },
    });
  }

  remove(id: string) {
    return this.prisma.admin.delete({
      where: { id },
    });
  }
}
