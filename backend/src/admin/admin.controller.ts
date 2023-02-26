import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Query } from '@nestjs/common';
import { FindManyAdminDto } from './dto/find-many-admin.dto';
import { FindOneAdminDto } from './dto/find-one-admin.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('admin')
@ApiBearerAuth('JWT')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get()
  findAll(@Query() query: FindManyAdminDto) {
    return this.adminService.findAll(query);
  }

  @Get(':id')
  findOne(@Query() query: FindOneAdminDto) {
    return this.adminService.findOne(query);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(id);
  }
}
