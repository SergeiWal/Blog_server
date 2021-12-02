import { Body, Controller, Get, Header, Post } from '@nestjs/common';
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

  @Post()
  @Header('Access-Control-Allow-Origin', '*')
  async create(@Body() createTagDto: CreateTagDto) {
    return await this.tagService.create(createTagDto);
  }
}
