import { ApiProperty } from '@nestjs/swagger';
import { Tag } from 'src/tags/tags.schema';

export class CrerateArticleDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  subtitle: string;

  @ApiProperty()
  text: string;

  @ApiProperty()
  img: string;

  @ApiProperty()
  author: string;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  updateDate: Date;

  @ApiProperty()
  tags: Tag[];
}
