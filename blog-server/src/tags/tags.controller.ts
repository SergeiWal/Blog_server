import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/roles/role.decotator';
import { Role } from 'src/roles/role.enum';
import { RolesGuard } from 'src/roles/roles.guard';
import { TagsService } from './tags.service';

@ApiTags('tags')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('tags')
export class TagsController {
  constructor(private tagService: TagsService) {}

  @Get()
  @Roles(Role.USER, Role.ADMIN)
  async findAll() {
    return await this.tagService.findAll();
  }

  @Post(':tag')
  @Roles(Role.ADMIN)
  async create(@Param('tag') tag: string) {
    return await this.tagService.create(tag);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  async delete(@Param('id') id: string) {
    return await this.tagService.delete(id);
  }
}
