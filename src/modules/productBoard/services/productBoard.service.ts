import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductBoardEntity } from '../entities/productBoard.entity';

@Injectable()
export class ProductBoardService {
  constructor(
    @InjectRepository(ProductBoardEntity)
    private productBoardRepository: Repository<ProductBoardEntity>,
  ) {}
}
