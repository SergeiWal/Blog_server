import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AddBookmarkDto } from './dto/add-bookmark.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @Header('Access-Control-Allow-Origin', '*')
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  @Header('Access-Control-Allow-Origin', '*')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @Get('/username/:name')
  @Header('Access-Control-Allow-Origin', '*')
  async findOneByName(@Param('name') name: string): Promise<User> {
    return await this.userService.findOneByUsername(name);
  }

  @Post()
  @Header('Access-Control-Allow-Origin', '*')
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  // @Patch(':id')
  // @Header('Access-Control-Allow-Origin', '*')
  // async addBookmark(
  //   @Param('id') id: string,
  //   @Body() addBookmarkDto: AddBookmarkDto,
  // ) {
  //   return await this.userService.addBookMark(id, addBookmarkDto);
  // }

  @Patch('/role/:id')
  @Header('Access-Control-Allow-Origin', '*')
  async setAdminRole(@Param('id') id: string) {
    return this.userService.setAdminRole(id);
  }

  @Patch('/activate/:id')
  @Header('Access-Control-Allow-Origin', '*')
  async setUnsetActivate(@Param('id') id: string) {
    return this.userService.setUnsetActivate(id);
  }

  @Delete(':id')
  @Header('Access-Control-Allow-Origin', '*')
  async deleteOne(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
