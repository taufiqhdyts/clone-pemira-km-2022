import { Injectable } from '@nestjs/common';
import { CreatePelanggaranDto } from './dto/create-pelanggaran.dto';
import { UpdatePelanggaranDto } from './dto/update-pelanggaran.dto';
import { PrismaService } from 'prisma.service';
import { FindManyPelanggaranDto } from './dto/find-many-pelanggaran.dto';
import { FindOnePelanggaranDto } from './dto/find-one-pelanggaran.dto';

@Injectable()
export class PelanggaranService {
  constructor(private prisma: PrismaService) {}

  create(createPelanggaranDto: CreatePelanggaranDto) {
    return this.prisma.pelanggaran.create({
      data: createPelanggaranDto,
    });
  }

  findAll(query: FindManyPelanggaranDto) {
    const { skip, take, cursor, where, orderBy } = query;
    return this.prisma.pelanggaran.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        candidate: {
          include: {
            account: true,
          },
        },
      },
    });
  }

  findOne(where: FindOnePelanggaranDto) {
    return this.prisma.pelanggaran.findUnique({
      where,
    });
  }

  update(id: string, data: UpdatePelanggaranDto) {
    return this.prisma.pelanggaran.update({
      data,
      where: { id },
    });
  }

  remove(id: string) {
    return this.prisma.pelanggaran.delete({
      where: { id },
    });
  }
}
