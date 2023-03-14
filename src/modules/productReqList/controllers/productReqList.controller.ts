import { Controller } from '@nestjs/common';
import { ProductReqListService } from '../services/productReqList.service';

@Controller('productReqList')
export class ProductReqListController {
  constructor(private readonly productReqListService: ProductReqListService) {}
}
