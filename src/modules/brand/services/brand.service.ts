import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBrandRequest } from '../dto/createBrandRequest.dto';
import { BrandEntity } from '../entities/brand.entity';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(BrandEntity)
    private brandRepository: Repository<BrandEntity>,
  ) {}

  async createBrand(request: CreateBrandRequest) {
    const newBrand = this.brandRepository.create({
      name: request.name,
    });
    return await this.brandRepository.save(newBrand);
  }
  async fetchBrandInfo(id: number) {
    return await this.brandRepository.findOne({
      where: { id },
    });
  }
  async fetchAllBrandInfo() {
    return await this.brandRepository.find();
  }
}
