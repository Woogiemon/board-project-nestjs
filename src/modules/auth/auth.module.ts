import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandEntity } from '../brand/entities/brand.entity';
import { BrandService } from '../brand/services/brand.service';
import { EmployeeEntity } from '../employee/entities/employee.entity';
import { EmployeeService } from '../employee/services/employee.service';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/services/user.service';
import { JwtAuthGuard } from './auth.guard';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, EmployeeEntity, BrandEntity]),
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
  ],
})
export class AuthModule {}
