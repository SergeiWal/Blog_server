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
import { ObjectId } from 'mongoose';
import { ArticlesService } from './articles.service';
import { CrerateArticleDto } from './dto/create-article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private articleService: ArticlesService) {}

  @Get()
  async findAll() {
    return await this.articleService.findAll();
  }

  @Get(':id')
  async findOne(@Param() id: ObjectId) {
    return await this.articleService.findOne(id);
  }

  @Post()
  async create(@Body() crerateArticleDto: CrerateArticleDto) {
    return await this.articleService.create(crerateArticleDto);
  }

  @Patch(':id')
  addLike(@Param() id: ObjectId) {
    return `Likes updated for article ${id}`;
  }

  @Patch(':id')
  addComment(@Param('id', ParseIntPipe) id: number) {
    return `Added comment to article ${id}`;
  }

  @Delete(':id')
  delete(@Param() id: ObjectId) {
    return this.articleService.delete(id);
  }
}
