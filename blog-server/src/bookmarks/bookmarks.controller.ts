import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/roles/role.decotator';
import { Role } from 'src/roles/role.enum';
import { RolesGuard } from 'src/roles/roles.guard';
import { BookmarksService } from './bookmarks.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';

@ApiTags('bookmarks')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('bookmarks')
export class BookmarksController {
  constructor(private bookmarksService: BookmarksService) {}

  @Get(':article_id/user/:user_id')
  @Roles(Role.ADMIN, Role.USER)
  async isExist(
    @Param('article_id') articleId: string,
    @Param('user_id') userId: string,
  ) {
    return await this.bookmarksService.isBookmarkExist(articleId, userId);
  }

  @Post()
  @ApiBody({ type: CreateBookmarkDto })
  @Roles(Role.USER)
  async save(@Body() createBookmarkDto: CreateBookmarkDto) {
    return await this.bookmarksService.save(createBookmarkDto);
  }

  @Delete(':article_id/user/:user_id')
  @Roles(Role.USER)
  async delete(
    @Param('article_id') articleId: string,
    @Param('user_id') userId: string,
  ) {
    return await this.bookmarksService.delete(articleId, userId);
  }
}
