import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { LikesService } from './likes.service';

@Controller('likes')
export class LikesController {
  constructor(private likeService: LikesService) {}

  @Get(':article_id/user/:user_id')
  async isExist(
    @Param('article_id') articleId: string,
    @Param('user_id') userId: string,
  ) {
    return await this.likeService.isLikeExist(articleId, userId);
  }

  @Get(':article_id')
  async getCount(@Param('article_id') articleId: string) {
    return await this.likeService.getLikeCountForArticle(articleId);
  }

  @Post()
  async save(@Body() createLikeDto: CreateLikeDto) {
    return await this.likeService.save(createLikeDto);
  }

  @Delete(':article_id/user/:user_id')
  async delete(
    @Param('article_id') articleId: string,
    @Param('user_id') userId: string,
  ) {
    return await this.likeService.delete(articleId, userId);
  }
}
