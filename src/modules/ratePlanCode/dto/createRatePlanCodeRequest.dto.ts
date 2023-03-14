import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateRatePlanCodeRequest {
  @ApiProperty()
  @IsString()
  groupCode: string;

  @ApiProperty()
  @IsNumber()
  point: number;
}
