import { BrandEntity } from 'src/modules/brand/entities/brand.entity';
import { EmployeeEntity } from 'src/modules/employee/entities/employee.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('PRODUCT_REQ_LIST')
export class ProductReqListEntity {
  @PrimaryGeneratedColumn({ name: 'PRODUCT_REQ_LIST_ID' })
  @Generated('increment')
  id: number;

  @Column({ name: 'PRODUCT_NAME' })
  productName: string;

  @Column({ name: 'PRICE' })
  price: number;

  @Column({ name: 'STATUS', default: '' })
  status: string;

  @Column({ name: 'REASON', default: '' })
  reason: string;

  @ManyToOne(() => UserEntity, (user) => user.productReqList)
  @JoinColumn({ name: 'USER_ID' })
  user: UserEntity;

  @ManyToOne(() => EmployeeEntity, (employee) => employee.productReqList)
  @JoinColumn({ name: 'EMPLOYEE_ID' })
  employee: EmployeeEntity;

  @ManyToOne(() => BrandEntity, (brand) => brand.productReqList)
  @JoinColumn({ name: 'BRAND_ID' })
  brand: BrandEntity;
}
