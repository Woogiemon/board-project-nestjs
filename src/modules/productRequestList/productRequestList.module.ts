import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRequestListController } from './controllers/productRequestList.controller';
import { ProductRequestListEntity } from './entities/productRequestList.entity';
import { ProductRequestListService } from './services/productRequestList.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductRequestListEntity])],
  controllers: [ProductRequestListController],
  providers: [ProductRequestListService],
  exports: [ProductRequestListService],
})
export class ProductRequestListModule {}
