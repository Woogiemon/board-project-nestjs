import { BrandEntity } from 'src/modules/brand/entities/brand.entity';
import { FreeBoardEntity } from 'src/modules/freeBoard/entities/freeBoard.entity';
import { ProductRequestListEntity } from 'src/modules/productRequestList/entities/productRequestList.entity';
import { PurchaseHistoryEntity } from 'src/modules/purchaseHistory/entities/purchaseHistory.entity';
import { RatePlanCodeEntity } from 'src/modules/ratePlanCode/entities/ratePlanCode.entity';
import { TransactEntity } from 'src/modules/transact/entities/transact.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('USER')
export class UserEntity {
  @PrimaryGeneratedColumn({ name: 'USER_ID' })
  @Generated('increment')
  id: number;

  @Column({ name: 'EMAIL', unique: true })
  email: string;

  @Column({ name: 'PASSWORD' })
  password: string;

  @Column({ name: 'NAME' })
  name: string;

  @Column({ name: 'POINT', default: 10000 })
  point: number;

  @OneToMany(
    () => PurchaseHistoryEntity,
    (purchaseHistory) => purchaseHistory.user,
  )
  purchaseHistories: PurchaseHistoryEntity[];

  @OneToMany(() => TransactEntity, (transact) => transact.purchaseUserName)
  purchaseTransacts: TransactEntity[];

  @OneToMany(() => TransactEntity, (transact) => transact.sellUserName)
  sellTransacts: TransactEntity[];

  @OneToMany(() => FreeBoardEntity, (freeBoard) => freeBoard.writer)
  freeBoards: FreeBoardEntity[];

  @ManyToOne(() => BrandEntity, (company) => company.users)
  brand: BrandEntity;

  @ManyToOne(() => RatePlanCodeEntity, (ratePlanCode) => ratePlanCode.users)
  @JoinColumn({ name: 'RATE_PLAN_CODE_ID' })
  ratePlanCode: RatePlanCodeEntity;

  @OneToMany(
    () => ProductRequestListEntity,
    (productRequestList) => productRequestList.user,
  )
  productRequestList: UserEntity[];
  @CreateDateColumn({ name: 'CREATE_AT' })
  created_at: Date;

  @UpdateDateColumn({ name: 'UPDATED_AT' })
  updated_at: Date;
}
