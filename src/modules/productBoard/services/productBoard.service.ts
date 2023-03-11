import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeEntity } from 'src/modules/employee/entities/employee.entity';
import { Repository } from 'typeorm';
import { InsertProductBoardRequest } from '../dto/insertProductBoardRequest.dto';
import { InsertProductBoardResponse } from '../dto/InsertProductBoardResponse.dto';
import { UpdateProductBoardRequest } from '../dto/updateProductBoardRequest.dto';
import { ProductBoardEntity } from '../entities/productBoard.entity';

@Injectable()
export class ProductBoardService {
  private readonly logger = new Logger(ProductBoardService.name);
  constructor(
    @InjectRepository(ProductBoardEntity)
    private productBoardRepository: Repository<ProductBoardEntity>,
    @InjectRepository(EmployeeEntity)
    private employeeRepository: Repository<EmployeeEntity>,
  ) {}

  async insertProductBoard(
    employee: EmployeeEntity,
    request: InsertProductBoardRequest,
  ): Promise<InsertProductBoardResponse> {
    const employeeWriter = await this.employeeRepository.findOne({
      where: { id: employee.id },
      relations: ['brand'],
    });

    const newProductBoard = this.productBoardRepository.create({
      productName: request.productName,
      price: request.price,
      employee: employeeWriter,
      brand: employeeWriter.brand,
    });
    const savedProductBoard = await this.productBoardRepository.save(
      newProductBoard,
    );

    return {
      id: savedProductBoard.id,
      productName: savedProductBoard.productName,
      price: savedProductBoard.price,
      created_at: savedProductBoard.created_at,
      updated_at: savedProductBoard.updated_at,
      employeeCode: savedProductBoard.employee.employeeCode,
      brandId: savedProductBoard.employee.brand.id,
    };
  }

  async fetchProductBoard(id: number): Promise<InsertProductBoardResponse> {
    const result = await this.productBoardRepository.findOne({
      where: { id },
      relations: ['employee', 'brand'],
    });

    return {
      id: result.id,
      productName: result.productName,
      price: result.price,
      created_at: result.created_at,
      updated_at: result.updated_at,
      employeeCode: result.employee.employeeCode,
      brandId: result.brand.id,
    };
  }

  async fetchAllProductBoard(): Promise<ProductBoardEntity[]> {
    return await this.productBoardRepository.find();
  }

  async updateProductBoard(
    request: UpdateProductBoardRequest,
    id: number,
  ): Promise<any> {
    await this.productBoardRepository.update(id, request);
    return await this.productBoardRepository.findOne({
      where: { id },
    });
  }

  async deleteProductBoard(id: number) {
    const result = await this.productBoardRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('해당 게시물이 존재하지 않습니다.');
    }
  }
}
