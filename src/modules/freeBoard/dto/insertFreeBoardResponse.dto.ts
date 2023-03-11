import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class InsertFreeBoardResponse {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsDate()
  created_at: Date;

  @ApiProperty()
  @IsDate()
  updated_at: Date;

  @ApiProperty()
  @IsString()
  writerId?: number;

  @ApiProperty()
  @IsString()
  employeeWriterCode?: string;

  @ApiProperty()
  @IsNumber()
  brandId?: number;
}
