import { BrandEntity } from 'src/modules/brand/entities/brand.entity';
import { FreeBoardEntity } from 'src/modules/freeBoard/entities/freeBoard.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('USER')
export class UserEntity {
  @PrimaryGeneratedColumn({ name: 'USER_UID' })
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

  @OneToMany(() => FreeBoardEntity, (freeBoard) => freeBoard.writer)
  freeBoards: FreeBoardEntity[];

  @ManyToOne(() => BrandEntity, (company) => company.users)
  brand: BrandEntity;

  @CreateDateColumn({ name: 'CREATE_AT' })
  created_at: Date;

  @UpdateDateColumn({ name: 'UPDATED_AT' })
  updated_at: Date;
}
