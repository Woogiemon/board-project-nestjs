import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Repository } from 'typeorm';
import { InsertProductReqListRequest } from '../dto/InsertProductReqListRequest.dto';
import { InsertProductReqListResponse } from '../dto/insertProductReqListResponse.dto';
import { ProductReqListEntity as ProductReqListEntity } from '../entities/productReqList.entity';

@Injectable()
export class ProductReqListService {
  constructor(
    @InjectRepository(ProductReqListEntity)
    private readonly productReqListRepository: Repository<ProductReqListEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async fetchOneProductReqList(id: number) {
    return await this.productReqListRepository.findOne({
      where: { id },
      relations: ['user', 'employee', 'brand'],
    });
  }

  async insertProductReqList(
    request: InsertProductReqListRequest,
  ): Promise<InsertProductReqListResponse> {
    const user = await this.userRepository.findOne({
      where: { id: request.userId },
      relations: ['purchaseHistories', 'brand', 'productReqList'],
    });

    const newProductReqList = this.productReqListRepository.create({
      productName: request.productName,
      price: request.price,
      user: user,
      brand: user.brand,
    });

    await this.productReqListRepository.save(newProductReqList);

    const userProductRequstList = await this.productReqListRepository.find({
      where: { user: user },
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        productReqList: userProductRequstList,
      },
    };
  }
}
