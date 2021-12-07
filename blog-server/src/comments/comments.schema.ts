import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/user/users.schema';
import { Article } from 'src/articles/articles.schema';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop({ required: true, unique: false })
  text: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Article' })
  article: Article;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
