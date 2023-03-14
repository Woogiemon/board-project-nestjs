import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductBoardEntity } from 'src/modules/productBoard/entities/productBoard.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductRequestListService {
  constructor(
    @InjectRepository(ProductBoardEntity)
    private roductRequestListRepository: Repository<ProductBoardEntity>,
  ) {}
}
