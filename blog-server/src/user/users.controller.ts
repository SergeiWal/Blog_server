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
  async findOne(@Param() id: ObjectId): Promise<User> {
    return await this.userService.findOne(id);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  @Patch(':id')
  async addBookmark(
    @Param() id: ObjectId,
    @Body() addBookmarkDto: AddBookmarkDto,
  ) {
    return await this.userService.addBookMark(id, addBookmarkDto);
  }

  @Delete(':id')
  async deleteOne(@Param() id: ObjectId) {
    return this.userService.delete(id);
  }
}
