import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductBoardService } from 'src/modules/productBoard/services/productBoard.service';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { UserService } from 'src/modules/user/services/user.service';
import { Repository } from 'typeorm';
import { InsertPurchaseHistoryResponse } from '../dto/insertPurchaseHistoryResponse.dto';
import { PurchaseHistoryEntity } from '../entities/purchaseHistory.entity';

@Injectable()
export class PurchaseHistoryService {
  private logger = new Logger(PurchaseHistoryService.name);
  constructor(
    @InjectRepository(PurchaseHistoryEntity)
    private purchaseHistoryRepository: Repository<PurchaseHistoryEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly userService: UserService,
    private readonly productBoardService: ProductBoardService,
  ) {}

  async insertPurchaseHistory(
    userId: number,
    productId: number,
  ): Promise<InsertPurchaseHistoryResponse> {
    // 1. 로그인한 유저의 정보 읽기
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['brand', 'purchaseHistories'],
    });
    this.logger.debug(JSON.stringify(user));

    // 2. 상품의 정보 읽기
    const product = await this.productBoardService.fetchProductBoard(productId);

    // 3. 해당 유저의 포인트 차감하기 (유저의 정보를 업데이트, 구매이력에 추가)
    // 차감 전 해당 사용자가 가진 포인트 양
    const UserPoint = user.point;

    // 3-1. 유저 정보 업데이트
    // 차감한 포인트 양
    const Price = product.price;
    if (UserPoint - Price <= 0) {
      throw new BadRequestException('돈이 부족합니다.');
    }
    await this.userService.updateUser(user.id, UserPoint - Price);

    // 업데이트 된 유저 정보 찾기
    const updatedUser = await this.userRepository.findOne({
      where: { id: userId },
    });

    // 차감 후 해당 사용자가 가진 포인트 양
    const AfterUserPoint = updatedUser.point;

    // 3-2. 구매이력에 추가 (UserPoint, Price, AfetUserPoint)
    const purchaseHistory = this.purchaseHistoryRepository.create({
      productName: product.productName,
      user: user,
      beforPurhcasePoint: UserPoint,
      PurhcasePoint: Price,
      AfterPurhcasePoint: AfterUserPoint,
      brand: user.brand,
    });

    const savedHistory = await this.purchaseHistoryRepository.save(
      purchaseHistory,
    );

    return {
      id: savedHistory.id,
      productName: savedHistory.productName,
      brandId: savedHistory.brand.id,
      userId: user.id,
      beforPurhcasePoint: savedHistory.beforPurhcasePoint,
      PurhcasePoint: savedHistory.PurhcasePoint,
      AfterPurhcasePoint: savedHistory.AfterPurhcasePoint,
      created_at: savedHistory.created_at,
    };
  }
}
