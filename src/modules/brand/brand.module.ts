import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandController } from './controllers/brand.controller';
import { BrandEntity } from './entities/brand.entity';
import { BrandService } from './services/brand.service';

@Module({
  imports: [TypeOrmModule.forFeature([BrandEntity])],
  controllers: [BrandController],
  providers: [BrandService, JwtService],
})
export class BrandModule {}
