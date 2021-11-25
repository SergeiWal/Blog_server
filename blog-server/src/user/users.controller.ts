import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { AddBookmarkDto } from './dto/add-bookmark.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  @Get()
  findAll(): string {
    return 'users';
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): string {
    return `User ${id}`;
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): string {
    return 'New user has been authorized';
  }

  @Patch(':id')
  addBookmark(
    @Param('id', ParseIntPipe) id: number,
    @Body() addBookmarkDto: AddBookmarkDto,
  ): string {
    return `Bookmark has been added to user ${id}`;
  }

  @Delete(':id')
  deleteOne(@Param('id', ParseIntPipe) id: number): string {
    return `User ${id} has been deleted`;
  }
}
