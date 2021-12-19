import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from 'src/articles/articles.schema';
import { ArticlesService } from 'src/articles/articles.service';
import { User } from 'src/user/users.schema';
import { UsersService } from 'src/user/users.service';
import { Bookmark, BookmarkDocument } from './bookmarks.schema';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';

@Injectable()
export class BookmarksService {
  constructor(
    @InjectModel(Bookmark.name) private bookmarksModel: Model<BookmarkDocument>,
    private articleService: ArticlesService,
    private usersService: UsersService,
  ) {}

  async isBookmarkExist(article_id: string, user_id: string) {
    const article: Article = await this.articleService.findOne(article_id);
    const user: User = await this.usersService.findOne(user_id);

    if (!user || !article) {
      throw new NotFoundException();
    }

    const bookmark: Bookmark = await this.bookmarksModel.findOne({
      article,
      user,
    });
    return bookmark ? true : false;
  }

  save(createBookmarkDto: CreateBookmarkDto) {
    const createBookmark = new this.bookmarksModel(createBookmarkDto);
    return createBookmark.save();
  }

  async delete(article_id: string, user_id: string) {
    const article: Article = await this.articleService.findOne(article_id);
    const user: User = await this.usersService.findOne(user_id);

    if (!user || !article) {
      throw new NotFoundException();
    }
    return await this.bookmarksModel.deleteOne({ user, article });
  }
}
