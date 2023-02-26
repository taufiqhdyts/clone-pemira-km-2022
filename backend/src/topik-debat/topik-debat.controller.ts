import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TopikDebatService } from './topik-debat.service';
import { CreateTopikDebatDto } from './dto/create-topik-debat.dto';
import { UpdateTopikDebatDto } from './dto/update-topik-debat.dto';
import { Query } from '@nestjs/common';
import { FindManyTopikDebatDto } from './dto/find-many-topik-debat.dto';
import { FindOneTopikDebatDto } from './dto/find-one-topik-debat.dto';
import { RestrictedOnlyForRoles } from 'auth/role-auth';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Public } from 'auth/jwt-auth';

@Controller('topik-debat')
@ApiBearerAuth('JWT')
export class TopikDebatController {
  constructor(private readonly topikDebatService: TopikDebatService) {}

  @Post()
  @Public()
  create(@Body() createTopikDebatDto: CreateTopikDebatDto) {
    return this.topikDebatService.create(createTopikDebatDto);
  }

  @Get()
  @Public()
  findAll(@Query() query: FindManyTopikDebatDto) {
    return this.topikDebatService.findAll(query);
  }

  @Get(':id')
  @Public()
  findOne(@Query() query: FindOneTopikDebatDto) {
    return this.topikDebatService.findOne(query);
  }

  @Patch(':id')
  @Public()
  update(
    @Param('id') id: string,
    @Body() updateTopikDebatDto: UpdateTopikDebatDto,
  ) {
    return this.topikDebatService.update(id, updateTopikDebatDto);
  }

  @Delete(':id')
  @RestrictedOnlyForRoles(['admin'])
  remove(@Param('id') id: string) {
    return this.topikDebatService.remove(id);
  }
}
