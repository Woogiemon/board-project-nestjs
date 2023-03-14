import { BrandEntity } from 'src/modules/brand/entities/brand.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('PURCHASE_HISTORY')
export class PurchaseHistoryEntity {
  @PrimaryGeneratedColumn({ name: 'PURCHASE_HISTORY_ID' })
  @Generated('increment')
  id: number;

  @Column({ name: 'PRODUCT_NAME' })
  productName: string;

  @ManyToOne(() => BrandEntity, (brand) => brand.purchaseHistories)
  @JoinColumn({ name: 'BRAND_ID' })
  brand: BrandEntity;

  @ManyToOne(() => UserEntity, (user) => user.purchaseHistories)
  user: UserEntity;

  /**
   * 차감 전 해당 사용자가 가진 포인트 양
   * 차감한 포인트 양
   * 차감 후 해당 사용자가 가진 포인트 양
   */
  @Column({ name: 'BEFOR_PURCHASE_POINT' })
  beforePurchasePoint: number;

  @Column({ name: 'PURCHASE_POINT' })
  purchasePoint: number;

  @Column({ name: 'AFTER_PURCHASE_POINT' })
  afterPurchasePoint: number;

  @CreateDateColumn({ name: 'CREATE_AT' })
  created_at: Date;
}
