import { FreeBoardEntity } from 'src/modules/freeBoard/entities/freeBoard.entity';
import { ProductBoardEntity } from 'src/modules/productBoard/entities/productBoard.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * 쇼핑몰 관리 프로그램 (emart)
 * 1. Brand Entity 추가 (o)
 * 2. 만든 게시판을 자유게시판으로 변경, 상품게시판 추가 (o)
 * 3. 자유게시판, 상품게시판을 Brand와 1대1 매핑 (o)
 *
 * 4. 직원과 일반인의 구분을 어떻게 할지 고민하기
 */
@Entity('BRAND')
export class BrandEntity {
  @PrimaryGeneratedColumn({ name: 'BRAND_UID' })
  @Generated('increment')
  uid: number;

  @Column({ name: 'BRAND_ID' })
  id: string;

  @Column({ name: 'NAME' })
  name: string;

  @OneToOne(() => FreeBoardEntity)
  @JoinColumn()
  freeBoard: FreeBoardEntity;

  @OneToOne(() => ProductBoardEntity)
  @JoinColumn()
  productBoard: ProductBoardEntity;

  // @OneToMany(() => UserEntity, (user) => user.company)
  // users: UserEntity[];

  @CreateDateColumn({ name: 'CREATE_AT' })
  created_at: Date;

  @UpdateDateColumn({ name: 'UPDATED_AT' })
  updated_at: Date;
}
