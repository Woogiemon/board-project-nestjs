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

@Entity('RATE_PLAN_CODE')
export class RatePlanCodeEntity {
  @PrimaryGeneratedColumn({ name: 'RATE_PLAN_CODE_ID' })
  @Generated('increment')
  id: number;

  @Column({ name: 'GROUP_CODE' })
  groupCode: string;

  @Column({ name: 'POINT' })
  point: number;

  @CreateDateColumn({ name: 'CREATED_AT' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UPDATED_AT' })
  updatedAt: Date;

  @OneToMany(() => UserEntity, (user) => user.ratePlanCode)
  users: UserEntity[];
}
