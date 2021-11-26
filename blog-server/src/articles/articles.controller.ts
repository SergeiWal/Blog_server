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
import { CrerateArticleDto } from './dto/create-article.dto';

@Controller('articles')
export class ArticlesController {
  @Get()
  findAll(): string {
    return 'Articles';
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return `Article ${id}`;
  }

  @Post()
  create(@Body() crerateArticleDto: CrerateArticleDto) {
    return 'Create articles';
  }

  @Patch(':id')
  addLike(@Param('id', ParseIntPipe) id: number) {
    return `Likes updated for article ${id}`;
  }

  @Patch(':id')
  addComment(@Param('id', ParseIntPipe) id: number) {
    return `Added comment to article ${id}`;
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return `Delete article ${id}`;
  }
}
