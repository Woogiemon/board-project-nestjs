import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PurchaseHistoryEntity } from '../entities/purchaseHistory.entity';

@Injectable()
export class PurchaseHistoryService {
  constructor(
    @InjectRepository(PurchaseHistoryEntity)
    private purchaseHistoryRepository: Repository<PurchaseHistoryEntity>,
  ) {}

  // async insertPurchaseHistory(
  //   request: InsertPurchaseHistoryRequest,
  // ): Promise<PurchaseHistoryEntity> {

  // }
}
