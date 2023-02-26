import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Response,
  StreamableFile,
} from '@nestjs/common';
import { VoteService } from './vote.service';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';
import { Query } from '@nestjs/common';
import { FindManyVoteDto } from './dto/find-many-vote.dto';
import { FindOneVoteDto } from './dto/find-one-vote.dto';
import { RestrictedOnlyForRoles } from 'auth/role-auth';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Public } from 'auth/jwt-auth';

@Controller('vote')
@ApiBearerAuth('JWT')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Post()
  @ApiBearerAuth('JWT')
  create(@Body() createVoteDto: CreateVoteDto, @Request() req) {
    return this.voteService.create(createVoteDto, req.user.id);
  }

  @Get()
  findAll(@Query() query: FindManyVoteDto) {
    return this.voteService.findAll(query);
  }

  @Get('download')
  @Public()
  downloadVoteFile(@Response({ passthrough: true }) res): StreamableFile {
    return this.voteService.downloadVoteFile(res);
  }

  @Get(':id')
  findOne(@Query() query: FindOneVoteDto) {
    return this.voteService.findOne(query);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVoteDto: UpdateVoteDto) {
    return this.voteService.update(id, updateVoteDto);
  }

  @Delete(':id')
  @RestrictedOnlyForRoles(['admin'])
  remove(@Param('id') id: string) {
    return this.voteService.remove(id);
  }
}
