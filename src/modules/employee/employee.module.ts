import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandEntity } from '../brand/entities/brand.entity';
import { BrandService } from '../brand/services/brand.service';
import { ProductBoardEntity } from '../productBoard/entities/productBoard.entity';
import { ProductReqListEntity } from '../productReqList/entities/productReqList.entity';
import { ProductReqListService } from '../productReqList/services/productReqList.service';
import { UserEntity } from '../user/entities/user.entity';
import { EmployeeController } from './controllers/employee.controller';
import { EmployeeEntity } from './entities/employee.entity';
import { EmployeeService } from './services/employee.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EmployeeEntity,
      BrandEntity,
      ProductReqListEntity,
      ProductBoardEntity,
      UserEntity,
    ]),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService, BrandService, ProductReqListService],
  exports: [EmployeeService],
})
export class EmployeeModule {}
