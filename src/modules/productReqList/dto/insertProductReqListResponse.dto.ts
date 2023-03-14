import { ApiProperty } from '@nestjs/swagger';
import { ProductReqListEntity } from '../entities/productReqList.entity';

export class InsertProductReqListResponse {
  @ApiProperty()
  user: UserInfo;
}

interface UserInfo {
  id: number;
  email: string;
  name: string;
  productReqList: ProductReqListEntity[];
}
