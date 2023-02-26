import { Injectable } from '@nestjs/common';
import { CreateChallengeAnswerDto } from './dto/create-challenge-answer.dto';
import { UpdateChallengeAnswerDto } from './dto/update-challenge-answer.dto';
import { PrismaService } from 'prisma.service';
import { FindManyChallengeAnswerDto } from './dto/find-many-challenge-answer.dto';
import { FindOneChallengeAnswerDto } from './dto/find-one-challenge-answer.dto';

const getTodaysDate = () => {
  return new Date(
    new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }),
  );
};

const addDays = (day: Date, days: number) => {
  const date = new Date();
  const addedDays = date.setDate(day.getDate() + days);
  return new Date(addedDays);
};

@Injectable()
export class ChallengeAnswerService {
  constructor(private prisma: PrismaService) {}

  async create(createChallengeAnswerDto: CreateChallengeAnswerDto) {
    const challenge = await this.prisma.challenge.findUnique({
      where: {
        id: createChallengeAnswerDto.challenge.connect.id,
      },
    });

    const today = getTodaysDate();
    console.log(getTodaysDate());
    console.log(addDays(challenge.updated_at, 3));
    console.log(addDays(challenge.updated_at, 3) > today);

    if (addDays(challenge.updated_at, 3) < today) {
      throw new Error('Challenge is not available anymore');
    }

    return this.prisma.challengeAnswer.create({
      data: createChallengeAnswerDto,
    });
  }

  findAll(query: FindManyChallengeAnswerDto) {
    const { skip, take, cursor, where, orderBy } = query;
    return this.prisma.challengeAnswer.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        challenge: true,
      },
    });
  }

  findOne(where: FindOneChallengeAnswerDto) {
    return this.prisma.challengeAnswer.findUnique({
      where,
    });
  }

  update(id: string, data: UpdateChallengeAnswerDto) {
    return this.prisma.challengeAnswer.update({
      data,
      where: { id },
    });
  }

  remove(id: string) {
    return this.prisma.challengeAnswer.delete({
      where: { id },
    });
  }
}
