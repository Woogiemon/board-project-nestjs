import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class DecideProductReqListRequest {
  @ApiProperty()
  @IsNumber()
  productReqListId: number;

  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsString()
  reason?: string;
}
