import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Article } from 'src/articles/articles.schema';
import { ArticlesService } from 'src/articles/articles.service';
import { Comment, CommentDocument } from './comments.schema';
import { CreateCommentDto } from './dto/create_comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private articleService: ArticlesService,
  ) {}

  findAll() {
    return this.commentModel.find();
  }

  delete() {
    return this.commentModel.deleteMany({});
  }

  async findByArticle(article_id: string) {
    const article: Article = await this.articleService.findOne(article_id);
    return await this.commentModel.find({ article }).populate('author');
  }

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const createComment = new this.commentModel(createCommentDto);
    return await (await createComment.save()).populate('author');
  }
}
