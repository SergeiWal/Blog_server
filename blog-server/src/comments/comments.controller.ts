import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create_comment.dto';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private commentService: CommentsService) {}

  @Get()
  async findAll() {
    return await this.commentService.findAll();
  }

  @Get(':article_id')
  async findByAuthor(@Param('article_id') articleId: string) {
    return await this.commentService.findByArticle(articleId);
  }

  @Delete()
  async delete() {
    return await this.commentService.delete();
  }

  @Post()
  @ApiBody({ type: CreateCommentDto })
  async create(@Body() createCommentDto: CreateCommentDto) {
    return await this.commentService.create(createCommentDto);
  }
}
