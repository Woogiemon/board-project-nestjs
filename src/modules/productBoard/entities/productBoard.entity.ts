import { BrandEntity } from 'src/modules/brand/entities/brand.entity';
import { EmployeeEntity } from 'src/modules/employee/entities/employee.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('PRODUCT_BOARD')
export class ProductBoardEntity {
  @PrimaryGeneratedColumn({ name: 'PRODUCT_BOARD_UID' })
  @Generated('increment')
  id: number;

  @Column({ name: 'PRODUCT_NAME' })
  productName: string;

  @Column({ name: 'PRICE' })
  price: number;

  @ManyToOne(() => EmployeeEntity, (employee) => employee.productBoards)
  employee: EmployeeEntity;

  @ManyToOne(() => BrandEntity, (brand) => brand.productBoards)
  @JoinColumn({ name: 'BRAND_ID' })
  brand: BrandEntity;

  @CreateDateColumn({ name: 'CREATE_AT' })
  created_at: Date;

  @UpdateDateColumn({ name: 'UPDATED_AT' })
  updated_at: Date;
}
