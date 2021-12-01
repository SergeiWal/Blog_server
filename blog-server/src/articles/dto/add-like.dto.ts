import { ObjectId } from 'mongoose';
import { User } from 'src/user/users.schema';

export class AddLikeDto {
  id: string;
  user: User;
}
