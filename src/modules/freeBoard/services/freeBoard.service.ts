import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Repository } from 'typeorm';
import { FetchBoardInfoResponse } from '../dto/fetchFreeBoardInfo.dto';
import { InsertFreeBoardRequest } from '../dto/insertFreeBoardRequest.dto';
import { UpdateFreeBoardRequest } from '../dto/updateFreeBoardRequest.dto';
import { FreeBoardEntity } from '../entities/freeBoard.entity';

@Injectable()
export class FreeBoardService {
  constructor(
    @InjectRepository(FreeBoardEntity)
    private freeBoardRepository: Repository<FreeBoardEntity>,
  ) {}

  async insertFreeBoard(
    user: UserEntity,
    request: InsertFreeBoardRequest,
  ): Promise<FetchBoardInfoResponse> {
    const newBoard = this.freeBoardRepository.create({
      title: request.title,
      content: request.content,
      writer: user,
    });
    const savedBoard = await this.freeBoardRepository.save(newBoard);
    return {
      id: savedBoard.id,
      title: savedBoard.title,
      content: savedBoard.content,
      created_at: savedBoard.created_at,
      updated_at: savedBoard.updated_at,
      writerId: savedBoard.writer.id,
    };
  }

  async fetchFreeBoardInfo(id: number): Promise<FetchBoardInfoResponse> {
    const result = await this.freeBoardRepository.findOne({
      where: { id },
      relations: ['writer'],
    });

    return {
      id: result.id,
      title: result.title,
      content: result.content,
      created_at: result.created_at,
      updated_at: result.updated_at,
      writerId: result.writer.id,
    };
  }

  async updateFreeBoard(
    request: UpdateFreeBoardRequest,
  ): Promise<FreeBoardEntity> {
    await this.freeBoardRepository.update(request.id, request);
    return await this.freeBoardRepository.findOne({
      where: { id: request.id },
    });
  }

  async deleteFreeBoard(id: number) {
    await this.freeBoardRepository.delete(id);
  }
}
