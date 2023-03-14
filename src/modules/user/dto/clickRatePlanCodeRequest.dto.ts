import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ClickRatePlanCodeRequest {
  @ApiProperty()
  @IsNumber()
  ratePlanCodeId: number;
}
