import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { AcceptChallengeDto } from './dto/accept-challenge.dto';
import { Query } from '@nestjs/common';
import { FindManyChallengeDto } from './dto/find-many-challenge.dto';
import { FindOneChallengeDto } from './dto/find-one-challenge.dto';
import { Public } from 'auth/jwt-auth';
import { RestrictedOnlyForRoles } from 'auth/role-auth';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('challenge')
@ApiBearerAuth('JWT')
export class ChallengeController {
  constructor(private readonly challengeService: ChallengeService) {}

  @Post()
  @Public()
  create(@Body() createChallengeDto: CreateChallengeDto) {
    return this.challengeService.create(createChallengeDto);
  }

  @Get()
  @Public()
  findAll(@Query() query: FindManyChallengeDto) {
    return this.challengeService.findAll(query);
  }

  @Get(':id')
  @Public()
  findOne(@Query() query: FindOneChallengeDto) {
    return this.challengeService.findOne(query);
  }

  @Patch(':id')
  @Public()
  update(
    @Param('id') id: string,
    @Body() updateChallengeDto: UpdateChallengeDto,
  ) {
    return this.challengeService.update(id, updateChallengeDto);
  }

  @Put('accept-challenge')
  @RestrictedOnlyForRoles(['admin'])
  acceptChallenge(@Body() acceptChallengeDto: AcceptChallengeDto) {
    return this.challengeService.updateChallenge(acceptChallengeDto);
  }

  @Delete(':id')
  @RestrictedOnlyForRoles(['admin'])
  remove(@Param('id') id: string) {
    return this.challengeService.remove(id);
  }
}
