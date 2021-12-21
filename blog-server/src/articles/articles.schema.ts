import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/user/users.schema';
import { Tag } from 'src/tags/tags.schema';

export type ArticleDocument = Article & Document;

@Schema()
export class Article {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  subtitle: string;

  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  img: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  updateDate: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }] })
  tags: Tag;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
