import { BrandEntity } from 'src/modules/brand/entities/brand.entity';
import { EmployeeEntity } from 'src/modules/employee/entities/employee.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
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

@Entity('FREE_BOARD')
export class FreeBoardEntity {
  @PrimaryGeneratedColumn({ name: 'FREE_BOARD_ID' })
  @Generated('increment')
  id: number;

  @Column({ name: 'TITLE' })
  title: string;

  @Column({ name: 'CONTENT' })
  content: string;

  @ManyToOne(() => UserEntity, (user) => user.freeBoards)
  writer: UserEntity;

  @ManyToOne(() => EmployeeEntity, (employee) => employee.freeBoards)
  employeeWriter: EmployeeEntity;

  @ManyToOne(() => BrandEntity, (brand) => brand.freeBoards)
  @JoinColumn({ name: 'BRAND_ID' })
  brand: BrandEntity;

  @CreateDateColumn({ name: 'CREATE_AT' })
  created_at: Date;

  @UpdateDateColumn({ name: 'UPDATED_AT' })
  updated_at: Date;
}
