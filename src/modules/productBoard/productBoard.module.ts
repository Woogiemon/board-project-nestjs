import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductBoardController } from './controllers/productBoard.controller';
import { ProductBoardEntity } from './entities/productBoard.entity';
import { ProductBoardService } from './services/productBoard.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductBoardEntity])],
  controllers: [ProductBoardController],
  providers: [ProductBoardService],
})
export class ProductBoardModule {}
