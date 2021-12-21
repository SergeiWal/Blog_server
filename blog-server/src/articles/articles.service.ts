import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from './articles.schema';
import { CrerateArticleDto } from './dto/create-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
  ) {}

  findAll() {
    return this.articleModel
      .find()
      .populate('author', 'name')
      .populate('tags', 'name');
  }

  async findOne(id: string): Promise<Article> {
    const article = await this.articleModel.findById(id);
    if (!article) {
      throw new NotFoundException();
    }
    return article;
  }

  async create(articleDto: CrerateArticleDto): Promise<Article> {
    const newArticle = new this.articleModel(articleDto);
    return newArticle.save();
  }

  async delete(id: string): Promise<Article> {
    const article = await this.articleModel.findByIdAndDelete(id);
    if (!article) {
      throw new NotFoundException();
    }
    return article;
  }
}
