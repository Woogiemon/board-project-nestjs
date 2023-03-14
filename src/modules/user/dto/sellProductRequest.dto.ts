import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SellProductRequest {
  @ApiProperty()
  @IsString()
  readonly sellUserName: string;

  @ApiProperty()
  @IsString()
  readonly productName: string;
}
