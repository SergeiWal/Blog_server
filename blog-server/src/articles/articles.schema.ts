import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/user/users.schema';
import { Comment } from 'src/comments/comments.schema';
import { Tag } from 'src/tags/tags.schema';

export type ArticleDocument = Article & Document;

@Schema()
export class Article {
  @Prop()
  title: string;

  @Prop()
  subtitle: string;

  @Prop()
  text: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: User;

  @Prop()
  img: string;

  @Prop()
  date: Date;

  @Prop()
  updateDate: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  likes: User[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' })
  comments: Comment[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' })
  tags: Tag[];
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
