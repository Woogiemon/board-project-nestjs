import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/services/user.service';
import { BoardController } from './controllers/board.controller';
import { BoardEntity } from './entities/board.entity';
import { BoardService } from './services/board.service';

@Module({
  imports: [TypeOrmModule.forFeature([BoardEntity, UserEntity])],
  controllers: [BoardController],
  providers: [BoardService, JwtAuthGuard, UserService, JwtService],
})
export class BoardModule {}
