import { ApiProperty } from '@nestjs/swagger';
import { Tag } from 'src/tags/tags.schema';
import { User } from 'src/user/users.schema';

export class UpdateArticleDto {
  @ApiProperty()
  title?: string;

  @ApiProperty()
  subtitle?: string;

  @ApiProperty()
  text?: string;

  @ApiProperty()
  img?: string;

  @ApiProperty()
  date?: Date;

  @ApiProperty()
  updateDate?: Date;

  @ApiProperty()
  author?: User;

  @ApiProperty()
  likes?: User[];

  @ApiProperty()
  tags?: Tag[];
}
