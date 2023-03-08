import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Repository } from 'typeorm';
import { InsertBoardRequest } from '../dto/insertBoardRequest.dto';
import { BoardEntity } from '../entities/board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardEntity)
    private boardRepository: Repository<BoardEntity>,
  ) {}

  /**
   * 로그인을 하면 쿠키가 생성이 된다.
   * @UseGuards 에서 jwt 라는 이름의 쿠키가 있는지 확인하고 컨트롤러를 동작시킨다.
   *
   * 로그인 한 사용자의 토큰의 뒷부분 떼어내야 한다.
   * 중간에 뭔가 빠진 느낌
   *
   * 로그인한 유저가 글을 등록한다. (Create)
   */
  async insertBoard(user: UserEntity, request: InsertBoardRequest) {
    const newBoard = this.boardRepository.create({
      title: request.title,
      content: request.content,
      writer: user,
    });
    await this.boardRepository.save(newBoard);
  }
}
