import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeEntity } from 'src/modules/employee/entities/employee.entity';
import { Repository } from 'typeorm';
import { InsertProductBoardRequest } from '../dto/insertProductBoardRequest.dto';
import { UpdateProductBoardRequest } from '../dto/updateProductBoardRequest.dto';
import { ProductBoardEntity } from '../entities/productBoard.entity';

@Injectable()
export class ProductBoardService {
  constructor(
    @InjectRepository(ProductBoardEntity)
    private productBoardRepository: Repository<ProductBoardEntity>,
  ) {}

  // InsertProductBoardResponse
  async insertProductBoard(
    employee: EmployeeEntity,
    request: InsertProductBoardRequest,
  ): Promise<any> {
    const newProductBoard = this.productBoardRepository.create({
      productName: request.productName,
      price: request.price,
      employee: employee,
    });
    const savedProductBoard = await this.productBoardRepository.save(
      newProductBoard,
    );

    console.log(savedProductBoard.employee.brand);
    console.log(savedProductBoard.employee.brand.id);

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

  async fetchProductBoard(id: number): Promise<any> {
    const result = await this.productBoardRepository.findOne({
      where: { id },
      relations: ['employee'],
    });

    return {
      id: result.id,
      productName: result.productName,
      price: result.price,
      created_at: result.created_at,
      updated_at: result.updated_at,
      employeeCode: result.employee.employeeCode,
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
