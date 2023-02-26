import { Put, Query } from '@nestjs/common';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Public } from 'auth/jwt-auth';
import { RestrictedOnlyForRoles } from 'auth/role-auth';
import { CandidateService } from './candidate.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { FindManyCandidateDto } from './dto/find-many-candidate.dto';
import { FindOneCandidateDto } from './dto/find-one-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { UpdateNilaiCandidateDto } from './dto/update-nilai-candidate.dto';

@Controller('candidate')
@ApiBearerAuth('JWT')
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  @Post()
  create(@Body() createCandidateDto: CreateCandidateDto) {
    return this.candidateService.create(createCandidateDto);
  }

  @Get()
  @Public()
  findAll(@Query() query: FindManyCandidateDto) {
    return this.candidateService.findAll(query);
  }

  @Get(':id')
  findOne(@Query() query: FindOneCandidateDto) {
    return this.candidateService.findOne(query);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCandidateDto: UpdateCandidateDto,
  ) {
    return this.candidateService.update(id, updateCandidateDto);
  }

  @Put('update-nilai')
  updateNilai(@Body() updateNilaiCandidateDto: UpdateNilaiCandidateDto) {
    return this.candidateService.updateNilai(updateNilaiCandidateDto);
  }

  @Delete(':id')
  @RestrictedOnlyForRoles(['admin'])
  remove(@Param('id') id: string) {
    return this.candidateService.remove(id);
  }
}
