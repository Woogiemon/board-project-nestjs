import { ApiProperty } from '@nestjs/swagger';

export class Payload {
  @ApiProperty()
  readonly id: number;
  @ApiProperty()
  readonly email: string;
  @ApiProperty()
  readonly name: string;
}
