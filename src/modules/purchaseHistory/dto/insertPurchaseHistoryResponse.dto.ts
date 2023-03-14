import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber } from 'class-validator';

export class InsertPurchaseHistoryResponse {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNumber()
  productName: string;

  @ApiProperty()
  @IsNumber()
  brandId: number;

  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsNumber()
  beforPurchasePoint: number;

  @ApiProperty()
  @IsNumber()
  purchasePoint: number;

  @ApiProperty()
  @IsNumber()
  afterPurchasePoint: number;

  @ApiProperty()
  @IsDate()
  created_at: Date;
}
