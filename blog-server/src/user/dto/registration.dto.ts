import { ApiProperty } from '@nestjs/swagger';

export class ReqistrationDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  photo: string;
}
