import { EmployeeEntity } from 'src/modules/employee/entities/employee.entity';
import { FreeBoardEntity } from 'src/modules/freeBoard/entities/freeBoard.entity';
import { ProductBoardEntity } from 'src/modules/productBoard/entities/productBoard.entity';
import { PurchaseHistoryEntity } from 'src/modules/purchaseHistory/entities/purchaseHistory.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('BRAND')
export class BrandEntity {
  @PrimaryGeneratedColumn({ name: 'BRAND_ID' })
  @Generated('increment')
  id: number;

  @Column({ name: 'NAME', unique: true })
  name: string;

  @OneToMany(() => UserEntity, (user) => user.brand)
  users: UserEntity[];

  @OneToMany(() => EmployeeEntity, (employee) => employee.brand)
  employees: EmployeeEntity[];

  @OneToMany(() => FreeBoardEntity, (freeBoard) => freeBoard.brand)
  freeBoards: FreeBoardEntity[];

  @OneToMany(() => ProductBoardEntity, (productBoard) => productBoard.brand)
  productBoards: ProductBoardEntity[];

  @OneToMany(
    () => PurchaseHistoryEntity,
    (purchaseHistory) => purchaseHistory.brand,
  )
  purchaseHistorys: PurchaseHistoryEntity[];

  @CreateDateColumn({ name: 'CREATE_AT' })
  created_at: Date;

  @UpdateDateColumn({ name: 'UPDATED_AT' })
  updated_at: Date;
}
