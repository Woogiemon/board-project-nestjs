import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from 'src/decorators/userPayload.decorator';
import { JwtAuthGuard } from 'src/modules/auth/auth.guard';
import { Payload } from 'src/modules/auth/dto/payload.dto';
import { EmployeeService } from 'src/modules/employee/services/employee.service';
import { UserService } from 'src/modules/user/services/user.service';
import { FetchBoardInfoResponse } from '../dto/fetchFreeBoardInfo.dto';
import { InsertProductBoardByEmployeeResponse } from '../dto/insertFreeBoardByEmployeeResponse.dto';
import { InsertFreeBoardRequest } from '../dto/insertFreeBoardRequest.dto';
import { InsertProductBoardResponse } from '../dto/InsertFreeBoardResponse.dto';
import { UpdateFreeBoardRequest as UpdateFreeBoardRequest } from '../dto/updateFreeBoardRequest.dto';
import { FreeBoardEntity } from '../entities/freeBoard.entity';
import { FreeBoardService } from '../services/freeBoard.service';

// TODO : brandId 가 들어가야할듯
@Controller('freeBoard')
export class FreeBoardController {
  constructor(
    private readonly freeBoardService: FreeBoardService,
    private readonly userService: UserService,
    private readonly employeeService: EmployeeService,
    private readonly jwtService: JwtService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  @Post('/insertFreeBoard')
  async insertFreeBoard(
    @UserPayload() payload: Payload,
    @Body() request: InsertFreeBoardRequest,
  ): Promise<InsertProductBoardResponse> {
    const user = await this.userService.fetchOneUser(payload.id);
    return await this.freeBoardService.insertFreeBoard(user, request);
  }

  // 이따위로 짜면 안됨;;;;; 등록, 수정, 삭제 버튼을 따로 만들생각임?
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  @Post('/insertFreeBoardByEmployee')
  async insertFreeBoardByEmployee(
    @UserPayload() payload: Payload,
    @Body() request: InsertFreeBoardRequest,
  ): Promise<InsertProductBoardByEmployeeResponse> {
    const employee = await this.employeeService.fetchOneEmployee(
      payload.employeeCode,
    );
    return await this.freeBoardService.insertFreeBoardByEmployee(
      employee,
      request,
    );
  }

  @Get('/fetchFreeBoardInfo/:id')
  async fetchFreeBoardInfo(
    @Param('id') id: number,
  ): Promise<FetchBoardInfoResponse> {
    return await this.freeBoardService.fetchFreeBoardInfo(id);
  }

  @Get('/fetchAllFreeBoardInfo')
  async fetchAllFreeBoardInfo() {
    return await this.freeBoardService.fetchAllFreeBoardInfo();
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(JwtAuthGuard)
  @Put('/updateFreeBoard')
  async updateFreeBoard(
    @UserPayload() payload: Payload,
    @Body() request: UpdateFreeBoardRequest,
  ): Promise<FreeBoardEntity> {
    const wantUpdateBoardWriterName = (
      await this.freeBoardService.fetchFreeBoardInfo(request.id)
    ).writerName;

    if (wantUpdateBoardWriterName === payload.name) {
      return await this.freeBoardService.updateFreeBoard(request);
    }
    throw new UnauthorizedException('본인만 수정할 수 있습니다.');
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Put('/updateFreeBoardByEmployee')
  async updateFreeBoardByEmployee(
    @Body() request: UpdateFreeBoardRequest,
  ): Promise<FreeBoardEntity> {
    return await this.freeBoardService.updateFreeBoard(request);
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(JwtAuthGuard)
  @Delete('/deleteFreeBoard/:id')
  async deleteFreeBoard(
    @UserPayload() payload: Payload,
    @Param('id') id: number,
  ) {
    const wantDeleteBoardWriterName = (
      await this.freeBoardService.fetchFreeBoardInfo(id)
    )?.writerName;

    if (wantDeleteBoardWriterName === payload.name) {
      return this.freeBoardService.deleteFreeBoard(id);
    }
    throw new UnauthorizedException('본인만 삭제할 수 있습니다.');
  }

  @Delete('/deleteFreeBoardByEmployee/:id')
  async deleteFreeBoardByEmployee(@Param('id') id: number) {
    return this.freeBoardService.deleteFreeBoard(id);
  }
}
