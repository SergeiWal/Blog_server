import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/users.schema';

export class CreateCommentDto {
  @ApiProperty()
  author: User;

  @ApiProperty()
  text: string;
}
