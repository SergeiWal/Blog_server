import { Body, Controller, Post } from '@nestjs/common';
import { CreateCommentDto } from './dto/create_comment.dto';

@Controller('comments')
export class CommentsController {
  @Post()
  create(@Body() createCommentDto: CreateCommentDto): string {
    return 'Create comment';
  }
}
