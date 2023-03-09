import { Controller } from '@nestjs/common';
import { BrandService } from '../services/brand.service';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}
}
