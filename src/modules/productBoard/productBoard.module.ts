import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from '../auth/auth.guard';
import { BrandEntity } from '../brand/entities/brand.entity';
import { BrandService } from '../brand/services/brand.service';
import { EmployeeEntity } from '../employee/entities/employee.entity';
import { EmployeeService } from '../employee/services/employee.service';
import { ProductBoardController } from './controllers/productBoard.controller';
import { ProductBoardEntity } from './entities/productBoard.entity';
import { ProductBoardService } from './services/productBoard.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductBoardEntity, EmployeeEntity, BrandEntity]),
  ],
  controllers: [ProductBoardController],
  providers: [ProductBoardService, EmployeeService, JwtAuthGuard, BrandService],
})
export class ProductBoardModule {}
