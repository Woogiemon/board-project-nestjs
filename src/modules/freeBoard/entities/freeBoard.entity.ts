import { UserEntity } from 'src/modules/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('FREE_BOARD')
export class FreeBoardEntity {
  @PrimaryGeneratedColumn({ name: 'FREE_BOARD_UID' })
  @Generated('increment')
  id: number;

  @Column({ name: 'TITLE' })
  title: string;

  @Column({ name: 'CONTENT' })
  content: string;

  @ManyToOne(() => UserEntity, (user) => user.freeBoards)
  writer: UserEntity;

  @CreateDateColumn({ name: 'CREATE_AT' })
  created_at: Date;

  @UpdateDateColumn({ name: 'UPDATED_AT' })
  updated_at: Date;
}
