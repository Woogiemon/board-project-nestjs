import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseHistoryController } from './controllers/purchaseHistory.controller';
import { PurchaseHistoryEntity } from './entities/purchaseHistory.entity';
import { PurchaseHistoryService } from './services/purchaseHistory.service';

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseHistoryEntity])],
  controllers: [PurchaseHistoryController],
  providers: [PurchaseHistoryService],
})
export class PurchaseHistoryModule {}
