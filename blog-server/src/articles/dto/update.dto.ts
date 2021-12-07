import { Tag } from 'src/tags/tags.schema';
import { User } from 'src/user/users.schema';

export class UpdateArticleDto {
  title?: string;

  subtitle?: string;

  text?: string;

  img?: string;

  date?: Date;

  updateDate?: Date;

  author?: User;

  likes?: User[];

  tags?: Tag[];
}
