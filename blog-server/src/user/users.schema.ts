import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Article } from 'src/articles/articles.schema';

export type Role = 'User' | 'Admin';
export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  photo: string;

  @Prop({ required: true, enum: ['ADMIN', 'USER'] })
  role: string;

  @Prop({ required: true })
  activate: boolean;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }] })
  bookmarks: Article;
}

export const UserSchema = SchemaFactory.createForClass(User);
