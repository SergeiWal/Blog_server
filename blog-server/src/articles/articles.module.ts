import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema, Comment } from 'src/comments/comments.schema';
import { CommentsService } from 'src/comments/comments.service';
import { ArticlesController } from './articles.controller';
import { Article, ArticleSchema } from './articles.schema';
import { ArticlesService } from './articles.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService, CommentsService],
})
export class ArticlesModule {}
