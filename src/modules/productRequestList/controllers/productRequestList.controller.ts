import { Controller } from '@nestjs/common';
import { ProductRequestListService } from '../services/productRequestList.service';

@Controller('productRequestList')
export class ProductRequestListController {
  constructor(
    private readonly productRequestListService: ProductRequestListService,
  ) {}
}
