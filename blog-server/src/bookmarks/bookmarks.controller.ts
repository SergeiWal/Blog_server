import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { BookmarksService } from './bookmarks.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';

@ApiTags('bookmarks')
@Controller('bookmarks')
export class BookmarksController {
  constructor(private bookmarksService: BookmarksService) {}

  @Get(':article_id/user/:user_id')
  async isExist(
    @Param('article_id') articleId: string,
    @Param('user_id') userId: string,
  ) {
    return await this.bookmarksService.isBookmarkExist(articleId, userId);
  }

  @Post()
  @ApiBody({ type: CreateBookmarkDto })
  async save(@Body() createBookmarkDto: CreateBookmarkDto) {
    return await this.bookmarksService.save(createBookmarkDto);
  }

  @Delete(':article_id/user/:user_id')
  async delete(
    @Param('article_id') articleId: string,
    @Param('user_id') userId: string,
  ) {
    return await this.bookmarksService.delete(articleId, userId);
  }
}
