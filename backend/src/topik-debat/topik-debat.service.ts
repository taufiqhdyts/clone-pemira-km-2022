import { Injectable } from '@nestjs/common';
import { CreateTopikDebatDto } from './dto/create-topik-debat.dto';
import { UpdateTopikDebatDto } from './dto/update-topik-debat.dto';
import { PrismaService } from 'prisma.service';
import { FindManyTopikDebatDto } from './dto/find-many-topik-debat.dto';
import { FindOneTopikDebatDto } from './dto/find-one-topik-debat.dto';

@Injectable()
export class TopikDebatService {
  constructor(private prisma: PrismaService) {}

  create(createTopikDebatDto: CreateTopikDebatDto) {
    return this.prisma.topikDebat.create({
      data: createTopikDebatDto,
    });
  }

  findAll(query: FindManyTopikDebatDto) {
    const { skip, take, cursor, where, orderBy } = query;
    return this.prisma.topikDebat.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  findOne(where: FindOneTopikDebatDto) {
    return this.prisma.topikDebat.findUnique({
      where,
    });
  }

  update(id: string, data: UpdateTopikDebatDto) {
    return this.prisma.topikDebat.update({
      data,
      where: { id },
    });
  }

  remove(id: string) {
    return this.prisma.topikDebat.delete({
      where: { id },
    });
  }
}
