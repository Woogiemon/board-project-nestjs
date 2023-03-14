import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandEntity } from '../brand/entities/brand.entity';
import { BrandService } from '../brand/services/brand.service';
import { EmployeeEntity } from '../employee/entities/employee.entity';
import { ProductBoardEntity } from '../productBoard/entities/productBoard.entity';
import { ProductBoardService } from '../productBoard/services/productBoard.service';
import { RatePlanCodeEntity } from '../ratePlanCode/entities/ratePlanCode.entity';
import { TransactEntity } from '../transact/entities/transact.entity';
import { TransactService } from '../transact/services/transact.service';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/services/user.service';
import { PurchaseHistoryController } from './controllers/purchaseHistory.controller';
import { PurchaseHistoryEntity } from './entities/purchaseHistory.entity';
import { PurchaseHistoryService } from './services/purchaseHistory.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PurchaseHistoryEntity,
      UserEntity,
      ProductBoardEntity,
      EmployeeEntity,
      BrandEntity,
      TransactEntity,
      RatePlanCodeEntity,
    ]),
  ],
  controllers: [PurchaseHistoryController],
  providers: [
    PurchaseHistoryService,
    ProductBoardService,
    UserService,
    BrandService,
    TransactService,
  ],
  exports: [PurchaseHistoryService],
})
export class PurchaseHistoryModule {}
