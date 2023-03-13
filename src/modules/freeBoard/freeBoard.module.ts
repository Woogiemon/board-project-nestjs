import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from '../auth/auth.guard';
import { BrandEntity } from '../brand/entities/brand.entity';
import { BrandService } from '../brand/services/brand.service';
import { EmployeeEntity } from '../employee/entities/employee.entity';
import { EmployeeService } from '../employee/services/employee.service';
import { ProductBoardEntity } from '../productBoard/entities/productBoard.entity';
import { ProductBoardService } from '../productBoard/services/productBoard.service';
import { PurchaseHistoryEntity } from '../purchaseHistory/entities/purchaseHistory.entity';
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
      BrandEntity,
      PurchaseHistoryEntity,
      TransactEntity,
      ProductBoardEntity,
    ]),
  ],
  controllers: [FreeBoardController],
  providers: [
    FreeBoardService,
    JwtAuthGuard,
    UserService,
    JwtService,
    EmployeeService,
    BrandService,
    TransactService,
    ProductBoardService,
  ],
})
export class FreeBoardModule {}
