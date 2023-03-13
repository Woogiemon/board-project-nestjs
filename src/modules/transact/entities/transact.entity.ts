import { ProductBoardEntity } from 'src/modules/productBoard/entities/productBoard.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import {
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('TRANSACT')
export class TransactEntity {
  @PrimaryGeneratedColumn({ name: 'TRNASACT_ID' })
  @Generated('increment')
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.purchaseTransacts)
  @JoinColumn({ name: 'PURCHASE_USER_NAME' })
  purchaseUserName: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.sellTransacts)
  @JoinColumn({ name: 'SELL_USER_NAME' })
  sellUserName: UserEntity;

  @ManyToOne(() => ProductBoardEntity, (product) => product.transacts)
  product: ProductBoardEntity;

  @CreateDateColumn({ name: 'CREATE_AT' })
  created_at: Date;
}
