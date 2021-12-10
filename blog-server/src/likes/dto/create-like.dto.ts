import { ApiProperty } from '@nestjs/swagger';
import { Article } from 'src/articles/articles.schema';
import { User } from 'src/user/users.schema';

export class CreateLikeDto {
  @ApiProperty()
  user: User;

  @ApiProperty()
  article: Article;
}
