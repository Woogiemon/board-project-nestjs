import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from '../auth/auth.guard';
import { BrandEntity } from '../brand/entities/brand.entity';
import { BrandService } from '../brand/services/brand.service';
import { EmployeeEntity } from '../employee/entities/employee.entity';
import { EmployeeService } from '../employee/services/employee.service';
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
  ],
})
export class FreeBoardModule {}
