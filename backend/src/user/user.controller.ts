import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Query } from '@nestjs/common';
import { FindManyUserDto } from './dto/find-many-user.dto';
import { FindOneUserDto } from './dto/find-one-user.dto';
import { RestrictedOnlyForRoles } from 'auth/role-auth';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('user')
@ApiBearerAuth('JWT')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Query() query: FindManyUserDto) {
    return this.userService.findAll(query);
  }

  @Get(':id')
  findOne(@Query() query: FindOneUserDto) {
    return this.userService.findOne(query);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @RestrictedOnlyForRoles(['admin'])
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
