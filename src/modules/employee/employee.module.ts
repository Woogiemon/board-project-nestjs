import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandEntity } from '../brand/entities/brand.entity';
import { BrandService } from '../brand/services/brand.service';
import { EmployeeController } from './controllers/employee.controller';
import { EmployeeEntity } from './entities/employee.entity';
import { EmployeeService } from './services/employee.service';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeEntity, BrandEntity])],
  controllers: [EmployeeController],
  providers: [EmployeeService, BrandService],
  exports: [EmployeeService],
})
export class EmployeeModule {}
