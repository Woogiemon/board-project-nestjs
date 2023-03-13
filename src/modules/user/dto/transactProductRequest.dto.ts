import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class transactProductRequest {
  @ApiProperty()
  @IsString()
  readonly sellUserName: string;

  @ApiProperty()
  @IsString()
  readonly productName: string;
}
