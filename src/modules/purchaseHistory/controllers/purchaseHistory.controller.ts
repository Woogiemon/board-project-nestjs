import { Controller, Logger, Param, Post, UseGuards } from '@nestjs/common';
import { UserPayload } from 'src/decorators/userPayload.decorator';
import { JwtAuthGuard } from 'src/modules/auth/auth.guard';
import { Payload } from 'src/modules/auth/dto/payload.dto';
import { PurchaseHistoryService } from '../services/purchaseHistory.service';

@Controller('purchaseHistory')
export class PurchaseHistoryController {
  private logger = new Logger(PurchaseHistoryController.name);
  constructor(
    private readonly purchaseHistoryService: PurchaseHistoryService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/insertPurchaseHistory/:productId')
  async insertPurchaseHistory(
    @UserPayload() payload: Payload,
    @Param('productId') productId: number,
  ) {
    return await this.purchaseHistoryService.insertPurchaseHistory(
      payload.id,
      productId,
    );
  }
}
