import { BoardEntity } from 'src/modules/board/entities/board.entity';
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

  @OneToMany(() => BoardEntity, (board) => board.writer)
  boards: BoardEntity[];

  @CreateDateColumn({ name: 'CREATE_AT' })
  created_at: Date;

  @UpdateDateColumn({ name: 'UPDATED_AT' })
  updated_at: Date;
}
