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
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create_comment.dto';

@ApiTags('comments')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('comments')
export class CommentsController {
  constructor(private commentService: CommentsService) {}

  @Get()
  @Roles(Role.ADMIN, Role.USER)
  findAll() {
    return this.commentService.findAll();
  }

  @Get(':article_id')
  @Roles(Role.ADMIN, Role.USER)
  findByAuthor(@Param('article_id') articleId: string) {
    return this.commentService.findByArticle(articleId);
  }

  @Delete()
  @Roles(Role.ADMIN)
  delete() {
    return this.commentService.delete();
  }

  @Post()
  @ApiBody({ type: CreateCommentDto })
  @Roles(Role.ADMIN, Role.USER)
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }
}
