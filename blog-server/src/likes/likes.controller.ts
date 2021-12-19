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
import { CreateLikeDto } from './dto/create-like.dto';
import { LikesService } from './likes.service';

@ApiTags('likes')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('likes')
export class LikesController {
  constructor(private likeService: LikesService) {}

  @Get(':article_id/user/:user_id')
  @Roles(Role.ADMIN, Role.USER)
  async isExist(
    @Param('article_id') articleId: string,
    @Param('user_id') userId: string,
  ) {
    return await this.likeService.isLikeExist(articleId, userId);
  }

  @Get(':article_id')
  @Roles(Role.ADMIN)
  async getCount(@Param('article_id') articleId: string) {
    return await this.likeService.getLikeCountForArticle(articleId);
  }

  @Post()
  @ApiBody({ type: CreateLikeDto })
  @Roles(Role.USER)
  async save(@Body() createLikeDto: CreateLikeDto) {
    return await this.likeService.save(createLikeDto);
  }

  @Delete(':article_id/user/:user_id')
  @Roles(Role.USER)
  async delete(
    @Param('article_id') articleId: string,
    @Param('user_id') userId: string,
  ) {
    return await this.likeService.delete(articleId, userId);
  }
}
