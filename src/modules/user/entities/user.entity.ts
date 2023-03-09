import { FreeBoardEntity } from 'src/modules/freeBoard/entities/freeBoard.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
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

  @OneToMany(() => FreeBoardEntity, (freeBoard) => freeBoard.writer)
  freeBoards: FreeBoardEntity[];

  // @ManyToOne(() => BrandEntity, (company) => company.users)
  // company: BrandEntity;

  @CreateDateColumn({ name: 'CREATE_AT' })
  created_at: Date;

  @UpdateDateColumn({ name: 'UPDATED_AT' })
  updated_at: Date;
}
