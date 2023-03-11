import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
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
import { InsertFreeBoardRequest } from '../dto/insertFreeBoardRequest.dto';
import { InsertFreeBoardResponse } from '../dto/InsertFreeBoardResponse.dto';
import { UpdateFreeBoardRequest as UpdateFreeBoardRequest } from '../dto/updateFreeBoardRequest.dto';
import { FreeBoardEntity } from '../entities/freeBoard.entity';
import { FreeBoardService } from '../services/freeBoard.service';

/**
 * TODO
 * - 글은 일반 사용자와 직원 사용자 모두 작성할 수 있다.
 * - 일반 사용자는 본인의 글만 수정하거나 삭제할 수 있다.
 * - 글을 수정하면 수정 시간이 자동으로 입력된다.
 * - 직원 사용자는 모든 글을 수정하거나 삭제할 수 있다.
 */
@Controller('freeBoard')
export class FreeBoardController {
  private logger = new Logger(FreeBoardController.name);
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
  ): Promise<InsertFreeBoardResponse> {
    if (payload.name) {
      const user = await this.userService.fetchOneUser(payload.id);
      return await this.freeBoardService.insertFreeBoard(user, request);
    }

    const employee = await this.employeeService.fetchOneEmployee(
      payload.employeeCode,
    );
    return await this.freeBoardService.insertFreeBoardByEmployee(
      employee,
      request,
    );
  }

  // 이따위로 짜면 안됨;;;;; 등록, 수정, 삭제 버튼을 따로 만들생각임?
  // @HttpCode(HttpStatus.CREATED)
  // @UseGuards(JwtAuthGuard)
  // @Post('/insertFreeBoardByEmployee')
  // async insertFreeBoardByEmployee(
  //   @UserPayload() payload: Payload,
  //   @Body() request: InsertFreeBoardRequest,
  // ): Promise<InsertProductBoardByEmployeeResponse> {
  //   const employee = await this.employeeService.fetchOneEmployee(
  //     payload.employeeCode,
  //   );
  //   return await this.freeBoardService.insertFreeBoardByEmployee(
  //     employee,
  //     request,
  //   );
  // }

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
    if (payload.name) {
      const wantUpdateBoardWriterName = (
        await this.freeBoardService.fetchFreeBoardInfo(request.id)
      ).writerName;

      if (wantUpdateBoardWriterName === payload.name) {
        return await this.freeBoardService.updateFreeBoard(request);
      }
      throw new UnauthorizedException('본인만 수정할 수 있습니다.');
    }

    return await this.freeBoardService.updateFreeBoard(request);
  }

  // @HttpCode(HttpStatus.ACCEPTED)
  // @Put('/updateFreeBoardByEmployee')
  // async updateFreeBoardByEmployee(
  //   @Body() request: UpdateFreeBoardRequest,
  // ): Promise<FreeBoardEntity> {
  //   return await this.freeBoardService.updateFreeBoard(request);
  // }

  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(JwtAuthGuard)
  @Delete('/deleteFreeBoard/:id')
  async deleteFreeBoard(
    @UserPayload() payload: Payload,
    @Param('id') id: number,
  ) {
    if (payload.name) {
      const wantDeleteBoardWriterName = (
        await this.freeBoardService.fetchFreeBoardInfo(id)
      )?.writerName;

      if (wantDeleteBoardWriterName === payload.name) {
        return this.freeBoardService.deleteFreeBoard(id);
      }
      throw new UnauthorizedException('본인만 삭제할 수 있습니다.');
    }
    return this.freeBoardService.deleteFreeBoard(id);
  }

  // @Delete('/deleteFreeBoardByEmployee/:id')
  // async deleteFreeBoardByEmployee(@Param('id') id: number) {
  //   return this.freeBoardService.deleteFreeBoard(id);
  // }
}
