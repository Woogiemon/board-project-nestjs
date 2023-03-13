import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
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
import { JwtAuthGuard } from './auth.guard';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      EmployeeEntity,
      BrandEntity,
      PurchaseHistoryEntity,
      TransactEntity,
      ProductBoardEntity,
    ]),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [
    JwtService,
    AuthService,
    BrandService,
    UserService,
    EmployeeService,
    JwtAuthGuard,
    TransactService,
    ProductBoardService,
  ],
})
export class AuthModule {}
