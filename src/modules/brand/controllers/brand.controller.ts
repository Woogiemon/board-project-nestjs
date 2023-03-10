import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateBrandRequest } from '../dto/createBrandRequest.dto';
import { BrandService } from '../services/brand.service';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post('/createBrand')
  async createBrand(@Body() request: CreateBrandRequest) {
    return await this.brandService.createBrand(request);
  }

  @Get('/fetchBrandInfo/:id')
  async fetchBrandInfo(@Param('id') id: number): Promise<any> {
    return await this.brandService.fetchBrandInfo(id);
  }

  @Get('/fetchAllBrandInfo')
  async fetchAllBrandInfo(): Promise<any> {
    return await this.brandService.fetchAllBrandInfo();
  }
}
