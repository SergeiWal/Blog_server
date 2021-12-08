import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from 'src/articles/articles.schema';
import { ArticlesService } from 'src/articles/articles.service';
import { CommentsController } from './comments.controller';
import { Comment, CommentSchema } from './comments.schema';
import { CommentsService } from './comments.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService, ArticlesService],
  exports: [ArticlesService],
})
export class CommentsModule {}
