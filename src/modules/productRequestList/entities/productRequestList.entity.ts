import { UserEntity } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('PRODUCT_REQUEST_LIST')
export class ProductRequestListEntity {
  @PrimaryGeneratedColumn({ name: 'PRODUCT_REQUEST_LIST_ID' })
  @Generated('increment')
  id: number;

  @Column({ name: 'PRODUCT_NAME' })
  productName: string;

  @Column({ name: 'PRICE' })
  price: number;

  @Column({ name: 'STATUS' })
  status: string;

  @Column({ name: 'REASON' })
  reason: string;

  @ManyToOne(() => UserEntity, (user) => user.productRequestList)
  @JoinColumn({ name: 'USER_ID' })
  user: UserEntity;
}
