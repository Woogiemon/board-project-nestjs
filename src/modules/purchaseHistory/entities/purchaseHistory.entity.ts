import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity('PURCHASE_HISTORY')
export class PurchaseHistoryEntity {
  @PrimaryGeneratedColumn({ name: 'PURCHASE_HISTORY_ID' })
  @Generated('increment')
  id: number;

  @Column({ name: 'PRODUCT_NAME' })
  productName: string;

  /**
   * 차감 전 해당 사용자가 가진 포인트 양
   * 차감한 포인트 양
   * 차감 후 해당 사용자가 가진 포인트 양
   */
}
