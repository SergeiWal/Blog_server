import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateCommentDto } from 'src/comments/dto/create_comment.dto';
import { Article, ArticleDocument } from './articles.schema';
import { CrerateArticleDto } from './dto/create-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
  ) {}

  async findAll(): Promise<Article[]> {
    return await this.articleModel.find().exec();
  }

  async findOne(id: ObjectId): Promise<Article> {
    return await this.articleModel.findById(id);
  }

  async create(articleDto: CrerateArticleDto) {
    const newArticle = new this.articleModel(articleDto);
    return await newArticle.save();
  }

  async delete(id: ObjectId) {
    return await this.articleModel.deleteOne({ _id: id });
  }
}
