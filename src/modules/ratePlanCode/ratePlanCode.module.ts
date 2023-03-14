import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatePlanCodeEntity } from './entities/ratePlanCode.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RatePlanCodeEntity])],
  controllers: [],
  providers: [],
  exports: [],
})
export class RatePlanCodeModule {}
