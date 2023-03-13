import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandService } from 'src/modules/brand/services/brand.service';
import { ProductBoardService } from 'src/modules/productBoard/services/productBoard.service';
import { PurchaseHistoryService } from 'src/modules/purchaseHistory/services/purchaseHistory.service';
import { InsertTransactRequest } from 'src/modules/transact/dto/insertTransactRequest.dto';
import { TransactService } from 'src/modules/transact/services/transact.service';
import { Repository } from 'typeorm';
import { AddUserRequest } from '../dto/addUserRequest.dto';
import { transactProductRequest } from '../dto/transactProductRequest.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private brandService: BrandService,
    private transactService: TransactService,
    private productBoardService: ProductBoardService,
    private purchaseHistoryService: PurchaseHistoryService,
  ) {}

  async fetchAllUser(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async fetchOneUser(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['purchaseHistories', 'brand'],
    });
  }

  async getByName(name: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { name },
      relations: ['purchaseHistories', 'brand'],
    });
    if (user) {
      return user;
    }
    throw new HttpException(
      '해당 이름의 유저가 존재하지 않습니다.',
      HttpStatus.NOT_FOUND,
    );
  }

  async getByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['purchaseHistories'],
    });
    if (user) {
      return user;
    }
    throw new HttpException(
      '해당 이메일의 유저가 존재하지 않습니다.',
      HttpStatus.NOT_FOUND,
    );
  }

  async addUser(request: AddUserRequest): Promise<UserEntity> {
    const brand = await this.brandService.fetchBrandInfo(request.brandId);

    const newUser = this.userRepository.create({
      email: request.email,
      password: request.password,
      name: request.name,
      brand: brand,
    });
    return await this.userRepository.save(newUser);
  }

  async updateUser(id: number, price: number): Promise<UserEntity> {
    await this.userRepository.update(id, {
      point: price,
    });

    return await this.userRepository.findOne({ where: { id } });
  }

  async sellProduct(purchaseUserName: string, request: transactProductRequest) {
    const purchaseUser = await this.getByName(purchaseUserName);
    const sellUser = await this.getByName(request.sellUserName);

    // this.logger.debug(JSON.stringify(sellUser));
    // 1. 다른 User 의 PurchaseHistory 읽기
    const sellUserPurchaseList = sellUser.purchaseHistories;
    this.logger.debug(JSON.stringify(sellUserPurchaseList));

    // 2. 다른 User 의 PurchaseHistory 에서 인자로 받은 productName 을 찾기
    const hasProduct = sellUserPurchaseList.map((v) => {
      if (v.productName === request.productName) {
        return v;
      }
    });
    this.logger.debug(JSON.stringify(hasProduct[0]));

    const product = await this.productBoardService.fetchProductInfo(
      hasProduct[0].id,
    );

    // TODO
    // this.logger.debug(purchaseId.length);
    // if (purchaseId.length < 1) {
    //   throw new NotFoundException('판매자가 해당 물건을 가지고 있지 않습니다.');
    // }

    // 3. Transact 에 구매한 사람의 이름, 판매한 사람의 이름, 거래한 물건 Create
    const req: InsertTransactRequest = {
      purchaseUserName: purchaseUser,
      SellUserName: sellUser,
      product: product,
    };
    await this.transactService.insertTransact(req);

    // 4. 구매한 상품을 구매한 유저의 PurchaseHistory 에 추가

    // 5. 판매한 상품을 판매한 유저의 PurchaseHistory 에서 제거
  }

  // async transactProduct(request: transactProductRequest) {}
}
