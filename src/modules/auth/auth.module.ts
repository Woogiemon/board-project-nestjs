import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/services/user.service';
import { JwtAuthGuard } from './auth.guard';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), PassportModule],
  controllers: [AuthController],
  providers: [JwtService, AuthService, UserService, JwtAuthGuard],
})
export class AuthModule {}
