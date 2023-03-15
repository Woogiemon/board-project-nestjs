import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, IsString } from 'class-validator';

export class DecideProductReqListRequest {
  @ApiProperty()
  @IsNumber()
  productReqListId: number;

  @ApiProperty()
  @IsIn(['Approved', 'Rejected', 'Delayed'])
  status: string;

  @ApiProperty()
  @IsString()
  reason?: string;
}
