import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Comment, CommentDocument } from './comments.schema';
import { CreateCommentDto } from './dto/create_comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async findOne(id: string) {
    return await this.commentModel.findById(id);
  }

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const createComment = new this.commentModel(createCommentDto);
    return await createComment.save();
  }
}
