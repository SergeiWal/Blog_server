import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Article } from 'src/articles/articles.schema';

export type Role = 'User' | 'Admin';
export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  password: string;

  @Prop()
  photo: string;

  @Prop()
  role: Role[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Posts' })
  posts: Article[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Bookmarks' })
  bookmarks: Article[];
}

export const UserSchema = SchemaFactory.createForClass(User);
