import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ArticlesService } from './articles.service';
import { CrerateArticleDto } from './dto/create-article.dto';

@ApiTags('articles')
@Controller('articles')
export class ArticlesController {
  constructor(private articleService: ArticlesService) {}

  @Get()
  async findAll() {
    return await this.articleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.articleService.findOne(id);
  }

  @Post()
  @ApiBody({ type: CrerateArticleDto })
  async create(@Body() crerateArticleDto: CrerateArticleDto) {
    return await this.articleService.create(crerateArticleDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.articleService.delete(id);
  }
}
