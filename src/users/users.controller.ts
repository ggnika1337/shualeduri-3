import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryParamsDto } from './dto/queryParams.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(
    @Query() query,
    @Query('ageFrom') ageFrom?: string,
    @Query('ageTo') ageTo?: string,
  ) {
    return this.usersService.findAll(query, ageFrom, ageTo);
  }

  @Get('/total-users')
  getTotalUsers() {
    return this.usersService.getTotalUsers();
  }

  @Get(':id')
  findOne(@Param('id') id) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id) {
    return this.usersService.remove(id);
  }
}
