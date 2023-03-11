import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandEntity } from 'src/modules/brand/entities/brand.entity';
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
    @InjectRepository(BrandEntity)
    private brandRepository: Repository<BrandEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(EmployeeEntity)
    private employeeRepository: Repository<EmployeeEntity>,
  ) {}

  async insertFreeBoard(
    user: UserEntity,
    request: InsertFreeBoardRequest,
  ): Promise<InsertFreeBoardResponse> {
    const writer = await this.userRepository.findOne({
      where: { id: user.id },
      relations: ['brand'],
    });

    const newBoard = this.freeBoardRepository.create({
      title: request.title,
      content: request.content,
      writer: writer,
      brand: writer.brand,
    });
    const savedBoard = await this.freeBoardRepository.save(newBoard);
    this.logger.debug(writer.brand.name);
    return {
      id: savedBoard.id,
      title: savedBoard.title,
      content: savedBoard.content,
      created_at: savedBoard.created_at,
      updated_at: savedBoard.updated_at,
      writerId: savedBoard.writer.id,
      brandId: savedBoard.brand.id,
    };
  }

  async insertFreeBoardByEmployee(
    employee: EmployeeEntity,
    request: InsertFreeBoardRequest,
  ): Promise<InsertProductBoardByEmployeeResponse> {
    const employeeWriter = await this.employeeRepository.findOne({
      where: { id: employee.id },
      relations: ['brand'],
    });

    const newBoard = this.freeBoardRepository.create({
      title: request.title,
      content: request.content,
      employeeWriter: employeeWriter,
      brand: employeeWriter.brand,
    });
    const savedBoard = await this.freeBoardRepository.save(newBoard);

    return {
      id: savedBoard.id,
      title: savedBoard.title,
      content: savedBoard.content,
      created_at: savedBoard.created_at,
      updated_at: savedBoard.updated_at,
      employeeWriterCode: savedBoard.employeeWriter.employeeCode,
      brandId: savedBoard.brand.id,
    };
  }

  async fetchFreeBoardInfo(
    brandId: number,
    id: number,
  ): Promise<FetchBoardInfoResponse> {
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
      brandId: brandId,
    };
  }

  async fetchAllFreeBoardInfo(
    brandId: number,
  ): Promise<FetchBoardInfoResponse[]> {
    // 해당 브랜드의 freeboard 찾기
    const freeboard = await this.freeBoardRepository.find({
      where: {
        brand: {
          id: brandId,
        },
      },
      relations: ['brand'],
    });

    return freeboard.map((v) => ({
      id: v.id,
      title: v.title,
      content: v.content,
      created_at: v.created_at,
      updated_at: v.updated_at,
      writerName: v.writer?.name,
      employeeWriterCode: v.employeeWriter?.employeeCode,
      brandId: v.brand.id,
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
