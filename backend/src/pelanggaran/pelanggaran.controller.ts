import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PelanggaranService } from './pelanggaran.service';
import { CreatePelanggaranDto } from './dto/create-pelanggaran.dto';
import { UpdatePelanggaranDto } from './dto/update-pelanggaran.dto';
import { Query } from '@nestjs/common';
import { FindManyPelanggaranDto } from './dto/find-many-pelanggaran.dto';
import { FindOnePelanggaranDto } from './dto/find-one-pelanggaran.dto';
import { Public } from 'auth/jwt-auth';
import { RestrictedOnlyForRoles } from 'auth/role-auth';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('pelanggaran')
@ApiBearerAuth('JWT')
export class PelanggaranController {
  constructor(private readonly pelanggaranService: PelanggaranService) {}

  @Post()
  @Public()
  create(@Body() createPelanggaranDto: CreatePelanggaranDto) {
    return this.pelanggaranService.create(createPelanggaranDto);
  }

  @Get()
  @Public()
  findAll(@Query() query: FindManyPelanggaranDto) {
    return this.pelanggaranService.findAll(query);
  }

  @Get(':id')
  @Public()
  findOne(@Query() query: FindOnePelanggaranDto) {
    return this.pelanggaranService.findOne(query);
  }

  @Patch(':id')
  @Public()
  update(
    @Param('id') id: string,
    @Body() updatePelanggaranDto: UpdatePelanggaranDto,
  ) {
    return this.pelanggaranService.update(id, updatePelanggaranDto);
  }

  @Delete(':id')
  @RestrictedOnlyForRoles(['admin'])
  remove(@Param('id') id: string) {
    return this.pelanggaranService.remove(id);
  }
}
