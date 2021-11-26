import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/user/users.schema';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop()
  text: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Author' })
  author: User;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
