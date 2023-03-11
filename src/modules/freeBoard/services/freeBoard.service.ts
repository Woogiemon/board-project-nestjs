import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeEntity } from 'src/modules/employee/entities/employee.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Repository } from 'typeorm';
import { FetchBoardInfoResponse } from '../dto/fetchFreeBoardInfo.dto';
import { InsertProductBoardByEmployeeResponse } from '../dto/insertFreeBoardByEmployeeResponse.dto';
import { InsertFreeBoardRequest } from '../dto/insertFreeBoardRequest.dto';
import { InsertFreeBoardResponse } from '../dto/InsertFreeBoardResponse.dto';
import { UpdateFreeBoardRequest } from '../dto/updateFreeBoardRequest.dto';
import { FreeBoardEntity } from '../entities/freeBoard.entity';

@Injectable()
export class FreeBoardService {
  private readonly logger = new Logger(FreeBoardService.name);

  constructor(
    @InjectRepository(FreeBoardEntity)
    private freeBoardRepository: Repository<FreeBoardEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async insertFreeBoard(
    user: UserEntity,
    request: InsertFreeBoardRequest,
  ): Promise<InsertFreeBoardResponse> {
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
      brandId: savedBoard.writer.brand.id,
    };
  }

  async insertFreeBoardByEmployee(
    employee: EmployeeEntity,
    request: InsertFreeBoardRequest,
  ): Promise<InsertProductBoardByEmployeeResponse> {
    const newBoard = this.freeBoardRepository.create({
      title: request.title,
      content: request.content,
      employeeWriter: employee,
    });
    const savedBoard = await this.freeBoardRepository.save(newBoard);
    return {
      id: savedBoard.id,
      title: savedBoard.title,
      content: savedBoard.content,
      created_at: savedBoard.created_at,
      updated_at: savedBoard.updated_at,
      employeeWriterCode: savedBoard.employeeWriter.employeeCode,
    };
  }

  async fetchFreeBoardInfo(id: number): Promise<FetchBoardInfoResponse> {
    const result = await this.freeBoardRepository.findOne({
      where: { id },
      relations: ['writer', 'employeeWriter'],
    });

    return {
      id: result.id,
      title: result.title,
      content: result.content,
      created_at: result.created_at,
      updated_at: result.updated_at,
      writerName: result.writer?.name,
      employeeWriterCode: result.employeeWriter?.employeeCode,
    };
  }

  async fetchAllFreeBoardInfo(): Promise<FetchBoardInfoResponse[]> {
    const result = await this.freeBoardRepository.find({
      relations: ['writer', 'employeeWriter'],
    });

    return result.map((v) => ({
      id: v.id,
      title: v.title,
      content: v.content,
      created_at: v.created_at,
      updated_at: v.updated_at,
      writerName: v.writer?.name,
      employeeWriterCode: v.employeeWriter?.employeeCode,
    }));
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
