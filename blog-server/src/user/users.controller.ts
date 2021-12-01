import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { AddBookmarkDto } from './dto/add-bookmark.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @Get('/login/:name')
  async findOneByName(@Param('name') name: string): Promise<User> {
    return await this.userService.findOneByUsername(name);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  @Patch(':id')
  async addBookmark(
    @Param('id') id: string,
    @Body() addBookmarkDto: AddBookmarkDto,
  ) {
    return await this.userService.addBookMark(id, addBookmarkDto);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
