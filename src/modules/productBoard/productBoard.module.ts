import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandEntity } from '../brand/entities/brand.entity';
import { BrandService } from '../brand/services/brand.service';
import { EmployeeEntity } from '../employee/entities/employee.entity';
import { EmployeeService } from '../employee/services/employee.service';
import { ProductReqListEntity } from '../productReqList/entities/productReqList.entity';
import { ProductReqListService } from '../productReqList/services/productReqList.service';
import { UserEntity } from '../user/entities/user.entity';
import { ProductBoardController } from './controllers/productBoard.controller';
import { ProductBoardEntity } from './entities/productBoard.entity';
import { ProductBoardService } from './services/productBoard.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductBoardEntity,
      EmployeeEntity,
      UserEntity,
      BrandEntity,
      ProductReqListEntity,
    ]),
  ],
  controllers: [ProductBoardController],
  providers: [
    ProductBoardService,
    EmployeeService,
    BrandService,
    ProductReqListService,
  ],
})
export class ProductBoardModule {}
