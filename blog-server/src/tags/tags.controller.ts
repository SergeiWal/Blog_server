import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Post,
} from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private tagService: TagsService) {}

  @Get()
  @Header('Access-Control-Allow-Origin', '*')
  async findAll() {
    return await this.tagService.findAll();
  }

  @Post(':tag')
  @Header('Access-Control-Allow-Origin', '*')
  async create(@Param('tag') tag: string) {
    return await this.tagService.create(tag);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.tagService.delete(id);
  }
}
