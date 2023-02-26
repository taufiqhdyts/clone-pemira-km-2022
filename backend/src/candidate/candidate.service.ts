import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { FindManyCandidateDto } from './dto/find-many-candidate.dto';
import { FindOneCandidateDto } from './dto/find-one-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { UpdateNilaiCandidateDto } from './dto/update-nilai-candidate.dto';

const getAllowedNilai = (currentNilai, inputNilai, operasi) => {
  let nilai: number;

  if (operasi === 'tambah') {
    nilai = currentNilai + inputNilai;
  } else if (operasi === 'kurang') {
    nilai = currentNilai - inputNilai;
  }

  if (nilai > 100) {
    return 100;
  } else if (nilai < 0) {
    return 0;
  } else {
    return nilai;
  }
};

@Injectable()
export class CandidateService {
  constructor(private prisma: PrismaService) {}

  create(createCandidateDto: CreateCandidateDto) {
    return this.prisma.candidate.create({
      data: createCandidateDto,
    });
  }

  async findAll(query: FindManyCandidateDto) {
    const { skip, take, cursor, where } = query;
    const candidate = await this.prisma.candidate.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy: {
        nomor_urut: 'asc',
      },
      include: {
        account: true,
      },
    });
    return candidate.map((x) => ({ ...x, password: undefined }));
  }

  findOne(where: FindOneCandidateDto) {
    return this.prisma.candidate.findUnique({
      where,
    });
  }

  update(id: string, data: UpdateCandidateDto) {
    return this.prisma.candidate.update({
      data,
      where: { id },
    });
  }

  async updateNilai(updateNilaiCandidateDto: UpdateNilaiCandidateDto) {
    const candidate = await this.prisma.candidate.findUnique({
      where: { id: updateNilaiCandidateDto.candidate_id },
    });

    const point = getAllowedNilai(
      candidate.point,
      updateNilaiCandidateDto.sebanyak,
      updateNilaiCandidateDto.type,
    );

    return this.prisma.candidate.update({
      data: {
        point,
      },
      where: {
        id: candidate.id,
      },
    });
  }

  remove(id: string) {
    return this.prisma.candidate.delete({
      where: { id },
    });
  }
}
