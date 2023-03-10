import { EmployeeEntity } from 'src/modules/employee/entities/employee.entity';
import { FreeBoardEntity } from 'src/modules/freeBoard/entities/freeBoard.entity';
import { ProductBoardEntity } from 'src/modules/productBoard/entities/productBoard.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('BRAND')
export class BrandEntity {
  @PrimaryGeneratedColumn({ name: 'BRAND_UID' })
  @Generated('increment')
  id: number;

  @Column({ name: 'NAME', unique: true })
  name: string;

  @OneToMany(() => UserEntity, (user) => user.brand)
  users: UserEntity[];

  @OneToMany(() => EmployeeEntity, (employee) => employee.brand)
  employees: EmployeeEntity[];

  @OneToOne(() => FreeBoardEntity)
  @JoinColumn()
  freeBoard: FreeBoardEntity;

  @OneToOne(() => ProductBoardEntity)
  @JoinColumn()
  productBoard: ProductBoardEntity;

  @CreateDateColumn({ name: 'CREATE_AT' })
  created_at: Date;

  @UpdateDateColumn({ name: 'UPDATED_AT' })
  updated_at: Date;
}
