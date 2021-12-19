import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from 'src/articles/articles.schema';
import { ArticlesService } from 'src/articles/articles.service';
import { RolesGuard } from 'src/roles/roles.guard';
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
