import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserPayload } from 'src/decorators/userPayload.decorator';
import { JwtAuthGuard } from 'src/modules/auth/auth.guard';
import { Payload } from 'src/modules/auth/dto/payload.dto';
import { EmployeeService } from 'src/modules/employee/services/employee.service';
import { InsertProductBoardRequest } from '../dto/insertProductBoardRequest.dto';
import { InsertProductBoardResponse } from '../dto/InsertProductBoardResponse.dto';
import { UpdateProductBoardRequest } from '../dto/updateProductBoardRequest.dto';
import { ProductBoardEntity } from '../entities/productBoard.entity';
import { ProductBoardService } from '../services/productBoard.service';

/**
 * TODO : brandId 가 들어가야할듯
 * Create (일반 유저 : 불가능, 직원 유저 : 가능)
 * Update (일반 유저 : 불가능, 직원 유저 : 가능)
 * Read (일반 유저 : 가능, 직원 유저 : 가능)
 * Delete (일반 유저 : 불가능, 직원 유저 : 가능)
 */
@Controller('productBoard')
export class ProductBoardController {
  constructor(
    private readonly productBoardService: ProductBoardService,
    private readonly employeeService: EmployeeService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/insertProductBoard')
  async insertProductBoard(
    @UserPayload() payload: Payload,
    @Body() request: InsertProductBoardRequest,
  ): Promise<InsertProductBoardResponse> {
    if (payload.email) {
      throw new UnauthorizedException('상품은 직원만 등록할 수 있습니다.');
    }
    const employee = await this.employeeService.fetchOneEmployee(
      payload.employeeCode,
    );
    return await this.productBoardService.insertProductBoard(employee, request);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/fetchProductBoard/:id')
  async fetchProductBoard(
    @Param('id') id: number,
  ): Promise<InsertProductBoardResponse> {
    return await this.productBoardService.fetchProductBoard(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/fetchAllProductBoard')
  async fetchAllProductBoard(): Promise<ProductBoardEntity[]> {
    return await this.productBoardService.fetchAllProductBoard();
  }

  @UseGuards(JwtAuthGuard)
  @Put('/updateProductBoard/:id')
  async updateProductBoard(
    @UserPayload() payload: Payload,
    @Body() request: UpdateProductBoardRequest,
    @Param('id') id: number,
  ) {
    if (payload.email) {
      throw new UnauthorizedException('상품은 직원만 수정할 수 있습니다.');
    }
    await this.productBoardService.updateProductBoard(request, id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/deleteProductBoard/:id')
  async deleteProductBoard(
    @UserPayload() payload: Payload,
    @Param('id') id: number,
  ) {
    if (payload.email) {
      throw new UnauthorizedException('상품은 직원만 삭제할 수 있습니다.');
    }
    await this.productBoardService.deleteProductBoard(id);
  }
}
