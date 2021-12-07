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
import { ArticlesService } from './articles.service';
import { AddCommentDto } from './dto/add-comment.dto';
import { AddLikeDto } from './dto/add-like.dto';
import { CrerateArticleDto } from './dto/create-article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private articleService: ArticlesService) {}

  @Get()
  @Header('Access-Control-Allow-Origin', '*')
  async findAll() {
    return await this.articleService.findAll();
  }

  @Get(':id')
  @Header('Access-Control-Allow-Origin', '*')
  async findOne(@Param('id') id: string) {
    return await this.articleService.findOne(id);
  }

  @Post()
  @Header('Access-Control-Allow-Origin', '*')
  @Header('Access-Control-Allow-Methods', 'POST')
  async create(@Body() crerateArticleDto: CrerateArticleDto) {
    return await this.articleService.create(crerateArticleDto);
  }

  // @Patch()
  // @Header('Access-Control-Allow-Origin', '*')
  // async addLike(@Body() addLikeDto: AddLikeDto) {
  //   return await this.articleService.addLike(addLikeDto);
  // }

  // @Patch()
  // @Header('Access-Control-Allow-Origin', '*')
  // async addComment(@Body() addCommentDto: AddCommentDto) {
  //   return await this.articleService.addComment(addCommentDto);
  // }

  @Delete(':id')
  @Header('Access-Control-Allow-Origin', '*')
  async delete(@Param('id') id: string) {
    return await this.articleService.delete(id);
  }
}
