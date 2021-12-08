import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from 'src/articles/articles.schema';
import { ArticlesService } from 'src/articles/articles.service';
import { User, UserSchema } from 'src/user/users.schema';
import { UsersService } from 'src/user/users.service';
import { LikesController } from './likes.controller';
import { Like, LikeSchema } from './likes.schema';
import { LikesService } from './likes.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Like.name, schema: LikeSchema }]),
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [LikesController],
  providers: [LikesService, ArticlesService, UsersService],
  exports: [ArticlesService],
})
export class LikesModule {}
