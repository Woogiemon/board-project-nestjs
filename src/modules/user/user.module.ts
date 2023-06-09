import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandEntity } from '../brand/entities/brand.entity';
import { BrandService } from '../brand/services/brand.service';
import { EmployeeEntity } from '../employee/entities/employee.entity';
import { ProductBoardEntity } from '../productBoard/entities/productBoard.entity';
import { ProductBoardService } from '../productBoard/services/productBoard.service';
import { ProductReqListEntity } from '../productReqList/entities/productReqList.entity';
import { ProductReqListService } from '../productReqList/services/productReqList.service';
import { PurchaseHistoryEntity } from '../purchaseHistory/entities/purchaseHistory.entity';
import { RatePlanCodeEntity } from '../ratePlanCode/entities/ratePlanCode.entity';
import { TransactEntity } from '../transact/entities/transact.entity';
import { TransactService } from '../transact/services/transact.service';
import { UserController } from './controllers/user.controller';
import { UserEntity } from './entities/user.entity';
import { UserService } from './services/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      BrandEntity,
      ProductBoardEntity,
      EmployeeEntity,
      TransactEntity,
      PurchaseHistoryEntity,
      RatePlanCodeEntity,
      ProductReqListEntity,
    ]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    BrandService,
    ProductBoardService,
    TransactService,
    ProductReqListService,
  ],
  exports: [UserService],
})
export class UserModule {}
