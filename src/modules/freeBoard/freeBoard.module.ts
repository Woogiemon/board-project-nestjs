import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/services/user.service';
import { FreeBoardController } from './controllers/freeBoard.controller';
import { FreeBoardEntity } from './entities/freeBoard.entity';
import { FreeBoardService } from './services/freeBoard.service';

@Module({
  imports: [TypeOrmModule.forFeature([FreeBoardEntity, UserEntity])],
  controllers: [FreeBoardController],
  providers: [FreeBoardService, JwtAuthGuard, UserService, JwtService],
})
export class FreeBoardModule {}
