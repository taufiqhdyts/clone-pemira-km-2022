import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ChallengeAnswerService } from './challenge-answer.service';
import { CreateChallengeAnswerDto } from './dto/create-challenge-answer.dto';
import { UpdateChallengeAnswerDto } from './dto/update-challenge-answer.dto';
import { Query } from '@nestjs/common';
import { FindManyChallengeAnswerDto } from './dto/find-many-challenge-answer.dto';
import { FindOneChallengeAnswerDto } from './dto/find-one-challenge-answer.dto';
import { RestrictedOnlyForRoles } from 'auth/role-auth';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('challenge-answer')
@ApiBearerAuth('JWT')
export class ChallengeAnswerController {
  constructor(
    private readonly challengeAnswerService: ChallengeAnswerService,
  ) {}

  @Post()
  @RestrictedOnlyForRoles(['candidate'])
  create(@Body() createChallengeAnswerDto: CreateChallengeAnswerDto) {
    return this.challengeAnswerService.create(createChallengeAnswerDto);
  }

  @Get()
  findAll(@Query() query: FindManyChallengeAnswerDto) {
    return this.challengeAnswerService.findAll(query);
  }

  @Get(':id')
  findOne(@Query() query: FindOneChallengeAnswerDto) {
    return this.challengeAnswerService.findOne(query);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateChallengeAnswerDto: UpdateChallengeAnswerDto,
  ) {
    return this.challengeAnswerService.update(id, updateChallengeAnswerDto);
  }

  @Delete(':id')
  @RestrictedOnlyForRoles(['admin'])
  remove(@Param('id') id: string) {
    return this.challengeAnswerService.remove(id);
  }
}
