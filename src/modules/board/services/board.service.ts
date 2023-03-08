import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Repository } from 'typeorm';
import { InsertBoardRequest } from '../dto/insertBoardRequest.dto';
import { UpdateBoardRequest } from '../dto/updateBoardRequest.dto';
import { BoardEntity } from '../entities/board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardEntity)
    private boardRepository: Repository<BoardEntity>,
  ) {}

  async insertBoard(user: UserEntity, request: InsertBoardRequest) {
    const newBoard = this.boardRepository.create({
      title: request.title,
      content: request.content,
      writer: user,
    });
    await this.boardRepository.save(newBoard);
  }

  //TODO 나는 작성자의 id만 알고싶음
  async fetchBoardInfo(id: number) {
    return await this.boardRepository.findOne({
      where: { id },
      relations: ['writer'],
    });
  }

  async updateBoard(request: UpdateBoardRequest): Promise<BoardEntity> {
    await this.boardRepository.update(request.id, request);
    return await this.boardRepository.findOne({
      where: { id: request.id },
    });
  }

  async deleteBoard(id: number) {
    await this.boardRepository.delete(id);
  }
}
