import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentsService } from 'src/comments/comments.service';
import { Article, ArticleDocument } from './articles.schema';
import { AddCommentDto } from './dto/add-comment.dto';
import { AddLikeDto } from './dto/add-like.dto';
import { CrerateArticleDto } from './dto/create-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
    private commentService: CommentsService,
  ) {}

  async findAll(): Promise<Article[]> {
    return await this.articleModel.find();
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
    return await newArticle.save();
  }

  async addLike(addLikeDto: AddLikeDto) {
    const { id, user } = addLikeDto;
    const { likes } = await this.articleModel.findById(id);
    if (!likes) {
      throw new NotFoundException();
    }
    likes.push(user);
    return await this.articleModel.updateOne({ _id: id }, { likes });
  }

  async addComment(addCommentDto: AddCommentDto) {
    const { articleId, commentId } = addCommentDto;
    const comment = await this.commentService.findOne(commentId);
    const { comments } = await this.articleModel.findById(articleId);
    if (!comments) {
      throw new NotFoundException();
    }
    comments.push(comment);
    return await this.articleModel.updateOne({ _id: articleId }, { comments });
  }

  async delete(id: string): Promise<Article> {
    const article = await this.articleModel.findByIdAndDelete(id);
    if (!article) {
      throw new NotFoundException();
    }
    return article;
  }
}
