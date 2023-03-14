import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ProductBoardEntity } from 'src/modules/productBoard/entities/productBoard.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';

// 구매한 사람의 아이디, 판매한 사람의 아이디, 거래한 물건
export class InsertTransactRequest {
  @ApiProperty()
  @IsString()
  purchaseUserName: UserEntity;

  @ApiProperty()
  @IsString()
  SellUserName: UserEntity;

  @ApiProperty()
  @IsString()
  product: ProductBoardEntity;
}
