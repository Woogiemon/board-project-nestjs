import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandEntity } from '../brand/entities/brand.entity';
import { BrandService } from '../brand/services/brand.service';
import { EmployeeEntity } from '../employee/entities/employee.entity';
import { EmployeeService } from '../employee/services/employee.service';
import { ProductBoardEntity } from '../productBoard/entities/productBoard.entity';
import { ProductBoardService } from '../productBoard/services/productBoard.service';
import { ProductReqListEntity } from '../productReqList/entities/productReqList.entity';
import { ProductReqListService } from '../productReqList/services/productReqList.service';
import { PurchaseHistoryEntity } from '../purchaseHistory/entities/purchaseHistory.entity';
import { RatePlanCodeEntity } from '../ratePlanCode/entities/ratePlanCode.entity';
import { TransactEntity } from '../transact/entities/transact.entity';
import { TransactService } from '../transact/services/transact.service';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/services/user.service';
import { FreeBoardController } from './controllers/freeBoard.controller';
import { FreeBoardEntity } from './entities/freeBoard.entity';
import { FreeBoardService } from './services/freeBoard.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FreeBoardEntity,
      UserEntity,
      EmployeeEntity,
      FreeBoardEntity,
      BrandEntity,
      TransactEntity,
      ProductBoardEntity,
      PurchaseHistoryEntity,
      RatePlanCodeEntity,
      ProductReqListEntity,
    ]),
  ],
  controllers: [FreeBoardController],
  providers: [
    FreeBoardService,
    UserService,
    EmployeeService,
    BrandService,
    TransactService,
    ProductBoardService,
    ProductReqListService,
  ],
})
export class FreeBoardModule {}
