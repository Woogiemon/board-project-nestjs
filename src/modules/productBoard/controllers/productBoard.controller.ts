import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EmployeeService } from 'src/modules/employee/services/employee.service';
import { InsertProductBoardRequest } from '../dto/insertProductBoardRequest.dto';
import { InsertProductBoardResponse } from '../dto/InsertProductBoardResponse.dto';
import { UpdateProductBoardRequest } from '../dto/updateProductBoardRequest.dto';
import { ProductBoardEntity } from '../entities/productBoard.entity';
import { ProductBoardService } from '../services/productBoard.service';

// TODO : brandId 가 들어가야할듯
@Controller('productBoard')
export class ProductBoardController {
  constructor(
    private readonly productBoardService: ProductBoardService,
    private readonly employeeService: EmployeeService,
  ) {}

  @Post('/insertProductBoard')
  async insertProductBoard(
    @Body() request: InsertProductBoardRequest,
  ): Promise<InsertProductBoardResponse> {
    const employee = await this.employeeService.fetchOneEmployee(
      request.employeeCode,
    );
    return await this.productBoardService.insertProductBoard(employee, request);
  }

  @Get('/fetchProductBoard/:id')
  async fetchProductBoard(
    @Param('id') id: number,
  ): Promise<InsertProductBoardResponse> {
    return await this.productBoardService.fetchProductBoard(id);
  }

  @Get('/fetchAllProductBoard')
  async fetchAllProductBoard(): Promise<ProductBoardEntity[]> {
    return await this.productBoardService.fetchAllProductBoard();
  }

  @Put('/updateProductBoard/:id')
  async updateProductBoard(
    @Body() request: UpdateProductBoardRequest,
    @Param('id') id: number,
  ) {
    await this.productBoardService.updateProductBoard(request, id);
  }

  @Delete('/deleteProductBoard/:id')
  async deleteProductBoard(@Param('id') id: number) {
    await this.productBoardService.deleteProductBoard(id);
  }
}
