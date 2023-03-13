import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactController } from './controllers/transact.controller';
import { TransactEntity } from './entities/transact.entity';
import { TransactService } from './services/transact.service';

@Module({
  imports: [TypeOrmModule.forFeature([TransactEntity])],
  controllers: [TransactController],
  providers: [TransactService],
  exports: [TransactService],
})
export class TransactModule {}
