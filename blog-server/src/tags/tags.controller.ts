import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private tagService: TagsService) {}

  @Get()
  async findAll() {
    return await this.tagService.findAll();
  }

  @Post(':tag')
  async create(@Param('tag') tag: string) {
    return await this.tagService.create(tag);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.tagService.delete(id);
  }
}
