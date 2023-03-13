import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InsertTransactRequest } from '../dto/insertTransactRequest.dto';
import { TransactEntity } from '../entities/transact.entity';

@Injectable()
export class TransactService {
  private logger = new Logger(TransactService.name);
  constructor(
    @InjectRepository(TransactEntity)
    private transactRepository: Repository<TransactEntity>,
  ) {}

  async insertTransact(
    request: InsertTransactRequest,
  ): Promise<TransactEntity> {
    const sellUserName = request.SellUserName;
    const purchaseUserName = request.purchaseUserName;
    const product = request.product;

    const newTransact = this.transactRepository.create({
      purchaseUserName: purchaseUserName,
      sellUserName: sellUserName,
      product: product,
    });
    return await this.transactRepository.save(newTransact);
  }
}
