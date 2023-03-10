import { Controller } from '@nestjs/common';
import { PurchaseHistoryService } from '../services/purchaseHistory.service';

/**
 * Controller 는 굳이 없어도 될 것 같다. 나중에 진짜 필요 없으면 지우자.
 */
@Controller('purchaseHistory')
export class PurchaseHistoryController {
  constructor(
    private readonly purchaseHistoryService: PurchaseHistoryService,
  ) {}
}
