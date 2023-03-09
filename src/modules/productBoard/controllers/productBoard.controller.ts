import { Controller } from '@nestjs/common';
import { ProductBoardService } from '../services/productBoard.service';

@Controller('productBoard')
export class ProductBoardController {
  constructor(private readonly productBoardService: ProductBoardService) {}
}
