import { Injectable, StreamableFile } from '@nestjs/common';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';
import { PrismaService } from 'prisma.service';
import { FindManyVoteDto } from './dto/find-many-vote.dto';
import { FindOneVoteDto } from './dto/find-one-vote.dto';
import { createReadStream } from 'fs';
import { join } from 'path';

@Injectable()
export class VoteService {
  constructor(private prisma: PrismaService) {}

  async create(createVoteDto: CreateVoteDto, voter_id: string) {
    const { data: voteData, type } = createVoteDto;
    if (createVoteDto.isForUpdate) {
      await this.prisma.vote.deleteMany({
        where: {
          voter_id,
        },
      });
    }

    const votes = voteData.map((vote) => ({ ...vote, voter_id, type }));

    return this.prisma.vote.createMany({
      data: votes,
      skipDuplicates: true,
    });
  }

  downloadVoteFile(res) {
    const file = createReadStream(join(process.cwd(), 'data/vote.csv'));

    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="data.xlsx',
    });

    return new StreamableFile(file);
  }

  findAll(query: FindManyVoteDto) {
    const { skip, take, cursor, where, orderBy } = query;
    return this.prisma.vote.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  findOne(where: FindOneVoteDto) {
    return this.prisma.vote.findUnique({
      where,
    });
  }

  update(id: string, data: UpdateVoteDto) {
    return this.prisma.vote.update({
      data,
      where: { id },
    });
  }

  remove(id: string) {
    return this.prisma.vote.delete({
      where: { id },
    });
  }
}
