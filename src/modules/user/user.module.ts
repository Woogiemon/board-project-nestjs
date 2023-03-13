import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandEntity } from '../brand/entities/brand.entity';
import { ProductBoardEntity } from '../productBoard/entities/productBoard.entity';
import { PurchaseHistoryEntity } from '../purchaseHistory/entities/purchaseHistory.entity';
import { TransactEntity } from '../transact/entities/transact.entity';
import { UserController } from './controllers/user.controller';
import { UserEntity } from './entities/user.entity';
import { UserService } from './services/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      BrandEntity,
      ProductBoardEntity,
      PurchaseHistoryEntity,
      TransactEntity,
    ]),
  ],
  controllers: [UserController],
  providers: [
    JwtService,
    UserService,
    // BrandService,
    // ProductBoardService,
    // PurchaseHistoryService,
    // TransactService,
  ],
  exports: [UserService],
})
export class UserModule {}
