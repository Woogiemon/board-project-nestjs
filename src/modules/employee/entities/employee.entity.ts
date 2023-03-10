import { BrandEntity } from 'src/modules/brand/entities/brand.entity';
import { FreeBoardEntity } from 'src/modules/freeBoard/entities/freeBoard.entity';
import { ProductBoardEntity } from 'src/modules/productBoard/entities/productBoard.entity';
import {
  Column,
  Entity,
  Generated,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('EMPLOYEE')
export class EmployeeEntity {
  @PrimaryGeneratedColumn({ name: 'EMPLOYEE_ID' })
  @Generated('increment')
  id: number;

  @Column({ name: 'EMPLOYEE_CODE' })
  employeeCode: string;

  @Column({ name: 'PASSWORD' })
  password: string;

  @ManyToOne(() => BrandEntity, (brand) => brand.employees)
  brand: BrandEntity;

  @OneToMany(() => FreeBoardEntity, (freeBoard) => freeBoard.employeeWriter)
  freeBoards: FreeBoardEntity[];

  @OneToMany(() => ProductBoardEntity, (productBoard) => productBoard.employee)
  productBoards: ProductBoardEntity[];
}
