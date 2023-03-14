import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { ProductReqListController } from './controllers/productReqList.controller';
import { ProductReqListEntity } from './entities/productReqList.entity';
import { ProductReqListService } from './services/productReqList.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductReqListEntity, UserEntity])],
  controllers: [ProductReqListController],
  providers: [ProductReqListService],
  exports: [ProductReqListService],
})
export class ProductReqListModule {}
