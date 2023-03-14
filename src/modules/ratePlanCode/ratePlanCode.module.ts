import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatePlanCodeController } from './controllers/ratePlanCode.controller';
import { RatePlanCodeEntity } from './entities/ratePlanCode.entity';
import { RatePlanCodeService } from './services/ratePlanCode.service';

@Module({
  imports: [TypeOrmModule.forFeature([RatePlanCodeEntity])],
  controllers: [RatePlanCodeController],
  providers: [RatePlanCodeService],
  exports: [RatePlanCodeService],
})
export class RatePlanCodeModule {}
