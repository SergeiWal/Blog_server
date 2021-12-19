import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from 'src/articles/articles.schema';
import { ArticlesService } from 'src/articles/articles.service';
import { RolesGuard } from 'src/roles/roles.guard';
import { User, UserSchema } from 'src/user/users.schema';
import { UsersService } from 'src/user/users.service';
import { BookmarksController } from './bookmarks.controller';
import { Bookmark, BookmarksSchema } from './bookmarks.schema';
import { BookmarksService } from './bookmarks.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Bookmark.name, schema: BookmarksSchema },
    ]),
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [BookmarksController],
  providers: [BookmarksService, UsersService, ArticlesService],
  exports: [ArticlesService, UsersService],
})
export class BookmarksModule {}
