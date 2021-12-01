import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Comment, CommentDocument } from 'src/comments/comments.schema';
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
    return await this.articleModel.find().exec();
  }

  async findOne(id: ObjectId): Promise<Article> {
    return await this.articleModel.findById(id);
  }

  async create(articleDto: CrerateArticleDto): Promise<Article> {
    const newArticle = new this.articleModel(articleDto);
    return await newArticle.save();
  }

  async addLike(addLikeDto: AddLikeDto) {
    const { id, user } = addLikeDto;
    const articlePromise = await this.articleModel.findById(id);
    const { likes } = await articlePromise;
    likes.push(user);
    return await this.articleModel.updateOne({ _id: id }, { likes });
  }

  async addComment(addCommentDto: AddCommentDto) {
    const { articleId, commentId } = addCommentDto;
    const comment = await this.commentService.findOne(commentId);
    const articlePromise = await this.articleModel.findById(articleId);
    const { comments } = await articlePromise;
    comments.push(comment);
    return await this.articleModel.updateOne({ _id: articleId }, { comments });
  }

  async delete(id: ObjectId): Promise<Article> {
    return await this.articleModel.findByIdAndDelete(id);
  }
}
