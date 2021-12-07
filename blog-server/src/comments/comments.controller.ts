import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Post,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create_comment.dto';

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
  async create(@Body() createCommentDto: CreateCommentDto) {
    return await this.commentService.create(createCommentDto);
  }
}
