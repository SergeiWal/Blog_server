import { ApiProperty } from '@nestjs/swagger';
import { Article } from 'src/articles/articles.schema';

export class AddBookmarkDto {
  @ApiProperty()
  article: Article;
}
