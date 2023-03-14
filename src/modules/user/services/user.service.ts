import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandService } from 'src/modules/brand/services/brand.service';
import { ProductBoardEntity } from 'src/modules/productBoard/entities/productBoard.entity';
import { PurchaseHistoryEntity } from 'src/modules/purchaseHistory/entities/purchaseHistory.entity';
import { RatePlanCodeEntity } from 'src/modules/ratePlanCode/entities/ratePlanCode.entity';
import { InsertTransactRequest } from 'src/modules/transact/dto/insertTransactRequest.dto';
import { TransactService } from 'src/modules/transact/services/transact.service';
import { Repository } from 'typeorm';
import { AddUserRequest } from '../dto/addUserRequest.dto';
import { SellProductRequest } from '../dto/sellProductRequest.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(PurchaseHistoryEntity)
    private readonly purchaseHistoryRepository: Repository<PurchaseHistoryEntity>,
    @InjectRepository(ProductBoardEntity)
    private readonly productBoardRepository: Repository<ProductBoardEntity>,
    @InjectRepository(RatePlanCodeEntity)
    private readonly ratePlanCodeRepository: Repository<RatePlanCodeEntity>,
    private readonly brandService: BrandService,
    private readonly transactService: TransactService,
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

  async sellProduct(purchaseUserName: string, request: SellProductRequest) {
    const purchaseUser = await this.getByName(purchaseUserName);
    const sellUser = await this.getByName(request.sellUserName);

    // 1. 다른 User 의 PurchaseHistory 을 읽어서 인자로 받은 productName 과 매칭되는 상품 찾기
    const sellersPurchaseList = sellUser.purchaseHistories.filter(
      (v) => v.productName === request.productName,
    );

    // 2. 예외처리
    if (sellersPurchaseList.length === 0) {
      throw new NotFoundException('판매자에게 해당 물건이 없습니다.');
    }

    // 3. Transact 에 구매한 사람의 id, 판매한 사람의 id, 거래한 물건 Create
    const oneProductInfo = await this.productBoardRepository.findOne({
      where: { productName: request.productName },
    });

    this.logger.debug(JSON.stringify(oneProductInfo));

    const req: InsertTransactRequest = {
      purchaseUserName: purchaseUser,
      SellUserName: sellUser,
      product: oneProductInfo,
    };
    await this.transactService.insertTransact(req);

    // 4. PurchaseHistory 에 구매한 사람의 정보 Create

    // 4-1. 해당 유저의 포인트 차감하기 (유저의 정보를 업데이트, 구매이력에 추가)
    // 차감 전 해당 사용자가 가진 포인트 양
    const userPoint = purchaseUser.point;

    // 4-2. 유저 정보 업데이트
    // 차감한 포인트 양
    const price = oneProductInfo.price;
    if (userPoint - price < 0) {
      throw new BadRequestException('돈이 부족합니다.');
    }
    await this.updateUser(purchaseUser.id, userPoint - price);

    // 업데이트된 유저 정보 찾기
    const updatedUser = await this.userRepository.findOne({
      where: { id: purchaseUser.id },
    });

    // 차감 후 해당 사용자가 가진 포인트 양
    const afterUserPoint = updatedUser.point;

    const purchaseHistory = this.purchaseHistoryRepository.create({
      productName: request.productName,
      user: purchaseUser,
      beforePurchasePoint: userPoint,
      purchasePoint: price,
      afterPurchasePoint: afterUserPoint,
      brand: purchaseUser.brand,
    });

    await this.purchaseHistoryRepository.save(purchaseHistory);
  }

  async transactProduct(purchaseUserName: string, request: SellProductRequest) {
    const purchaseUser = await this.getByName(purchaseUserName);
    const sellUser = await this.getByName(request.sellUserName);

    // 1. 다른 User 의 PurchaseHistory 을 읽어서 인자로 받은 productName 과 매칭되는 상품 찾기
    const sellersPurchaseList = sellUser.purchaseHistories.filter(
      (v) => v.productName === request.productName,
    );

    if (sellersPurchaseList.length === 0) {
      throw new NotFoundException('판매자에게 해당 물건이 없습니다.');
    }

    // 2. 해당 product의 가격을 본인의 PurchaseHistory 와 비교해서 같은 가격인 물건 찾기
    // 해당 product 의 정보 확인
    const purchaseProductInfo = await this.productBoardRepository.findOne({
      where: { productName: request.productName },
    });

    // 해당 product 의 가격과 본인의 PurchaseHistory 비교하기
    const matchingProduct = await purchaseUser.purchaseHistories.find((v) => {
      return v.purchasePoint === purchaseProductInfo.price;
    });

    if (!matchingProduct) {
      throw new NotFoundException('가격이 동일한 제품이 없습니다.');
    }

    // this.logger.debug(JSON.stringify(matchingProduct));
    // 3. Transact 에 구매한 사람의 id, 판매한 사람의 id, 거래한 물건 Create 로직 생성 x2

    const req: InsertTransactRequest = {
      purchaseUserName: purchaseUser,
      SellUserName: sellUser,
      product: purchaseProductInfo,
    };
    await this.transactService.insertTransact(req);

    // 본인의 PurchaseHistory 에서 구매 물건과 가격이 같은 물건의 정보 조회
    const sellProductInfo = await this.productBoardRepository.findOne({
      where: { productName: matchingProduct.productName },
    });

    const secondReq: InsertTransactRequest = {
      purchaseUserName: sellUser,
      SellUserName: purchaseUser,
      product: sellProductInfo,
    };
    await this.transactService.insertTransact(secondReq);
  }

  async clickRatePlanCode(ratePlanCodeId: number): Promise<any> {}
}
