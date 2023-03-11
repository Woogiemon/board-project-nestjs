import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandEntity } from '../brand/entities/brand.entity';
import { BrandService } from '../brand/services/brand.service';
import { EmployeeEntity } from '../employee/entities/employee.entity';
import { ProductBoardEntity } from '../productBoard/entities/productBoard.entity';
import { ProductBoardService } from '../productBoard/services/productBoard.service';
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
      BrandEntity,
      ProductBoardEntity,
      EmployeeEntity,
    ]),
  ],
  controllers: [PurchaseHistoryController],
  providers: [
    PurchaseHistoryService,
    ProductBoardService,
    UserService,
    BrandService,
  ],
})
export class PurchaseHistoryModule {}
