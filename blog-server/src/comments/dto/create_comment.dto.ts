import { User } from 'src/user/users.schema';

export class CreateCommentDto {
  author: User;
  text: string;
}
