import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from 'src/articles/articles.schema';
import { ArticlesService } from 'src/articles/articles.service';
import { User } from 'src/user/users.schema';
import { UsersService } from 'src/user/users.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { Like, LikeDocument } from './likes.schema';

@Injectable()
export class LikesService {
  constructor(
    @InjectModel(Like.name) private likeModele: Model<LikeDocument>,
    private articleService: ArticlesService,
    private usersService: UsersService,
  ) {}

  async getLikeByArticleAndUser(article_id: string, user_id: string) {
    const article: Article = await this.articleService.findOne(article_id);
    const user: User = await this.usersService.findOne(user_id);
    return await this.likeModele.findOne({ article, user });
  }

  async isLikeExist(article_id: string, user_id: string) {
    const article: Article = await this.articleService.findOne(article_id);
    const user: User = await this.usersService.findOne(user_id);

    if (!user || !article) {
      throw new NotFoundException();
    }
    const like: Like = await this.likeModele.findOne({ article, user });
    return like ? true : false;
  }

  async getLikeCountForArticle(article_id: string) {
    const article: Article = await this.articleService.findOne(article_id);
    return await this.likeModele.countDocuments({ article });
  }

  async save(createLikeDto: CreateLikeDto) {
    const createLike = new this.likeModele(createLikeDto);
    return await createLike.save();
  }

  async delete(article_id: string, user_id: string) {
    const article: Article = await this.articleService.findOne(article_id);
    const user: User = await this.usersService.findOne(user_id);

    if (!user || !article) {
      throw new NotFoundException();
    }
    return await this.likeModele.deleteOne({ article, user });
  }
}
