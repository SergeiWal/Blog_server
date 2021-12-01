import { ObjectId } from 'mongoose';
import { User } from 'src/user/users.schema';

export class AddCommentDto {
  articleId: string;
  commentId: string;
}
