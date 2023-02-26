import { Injectable } from '@nestjs/common';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { PrismaService } from 'prisma.service';
import { FindManyChallengeDto } from './dto/find-many-challenge.dto';
import { FindOneChallengeDto } from './dto/find-one-challenge.dto';
import { AcceptChallengeDto } from './dto/accept-challenge.dto';

@Injectable()
export class ChallengeService {
  constructor(private prisma: PrismaService) {}

  create(createChallengeDto: CreateChallengeDto) {
    return this.prisma.challenge.create({
      data: createChallengeDto,
    });
  }

  findAll(query: FindManyChallengeDto) {
    const { skip, take, cursor, where, orderBy } = query;
    return this.prisma.challenge.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        challenge_answer: true,
        candidate: {
          include: {
            account: true,
          },
        },
      },
    });
  }

  findOne(where: FindOneChallengeDto) {
    return this.prisma.challenge.findUnique({
      where,
    });
  }

  update(id: string, data: UpdateChallengeDto) {
    return this.prisma.challenge.update({
      data,
      where: { id },
    });
  }

  updateChallenge(acceptChallengeDto: AcceptChallengeDto) {
    return this.prisma.challenge.update({
      where: { id: acceptChallengeDto.challenge_id },
      data: {
        progress: acceptChallengeDto.progress,
      },
    });
  }

  remove(id: string) {
    return this.prisma.challenge.delete({
      where: { id },
    });
  }
}
