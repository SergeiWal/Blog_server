import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.schema';
import { UsersService } from './users.service';

@ApiTags('users')
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

  @Get('/username/:name')
  async findOneByName(@Param('name') name: string): Promise<User> {
    return await this.userService.findOneByUsername(name);
  }

  @Post()
  @ApiBody({ type: CreateUserDto })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  @Patch('/role/:id')
  async setAdminRole(@Param('id') id: string) {
    return this.userService.setAdminRole(id);
  }

  @Patch('/activate/:id')
  async setUnsetActivate(@Param('id') id: string) {
    return this.userService.setUnsetActivate(id);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
