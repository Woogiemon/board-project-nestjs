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
import { InjectRepository } from '@nestjs/typeorm';
import { UserPayload } from 'src/decorators/userPayload.decorator';
import { JwtAuthGuard } from 'src/modules/auth/auth.guard';
import { Payload } from 'src/modules/auth/dto/payload.dto';
import { EmployeeEntity } from 'src/modules/employee/entities/employee.entity';
import { EmployeeService } from 'src/modules/employee/services/employee.service';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { UserService } from 'src/modules/user/services/user.service';
import { Repository } from 'typeorm';
import { FetchBoardInfoResponse } from '../dto/fetchFreeBoardInfo.dto';
import { InsertFreeBoardRequest } from '../dto/insertFreeBoardRequest.dto';
import { InsertFreeBoardResponse } from '../dto/InsertFreeBoardResponse.dto';
import { UpdateFreeBoardRequest } from '../dto/updateFreeBoardRequest.dto';
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

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(EmployeeEntity)
    private employeeRepository: Repository<EmployeeEntity>,
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

  @UseGuards(JwtAuthGuard)
  @Get('/fetchFreeBoardInfo/:id')
  async fetchFreeBoardInfo(
    @UserPayload() payload: Payload,
    @Param('id') id: number,
  ): Promise<FetchBoardInfoResponse> {
    if (payload.employeeCode) {
      const employee = await this.employeeRepository.findOne({
        where: { id: payload.id },
        relations: ['brand'],
      });
      this.logger.debug(JSON.stringify(employee.brand));
      return await this.freeBoardService.fetchFreeBoardInfo(
        employee.brand.id,
        id,
      );
    }

    if (payload.email) {
      const user = await this.userRepository.findOne({
        where: { id: payload.id },
        relations: ['brand'],
      });
      return await this.freeBoardService.fetchFreeBoardInfo(user.brand.id, id);
    }
  }

  // 로그인한 사용자의 brand 의 모든 게시글 읽기
  @Get('/fetchAllFreeBoardInfo')
  async fetchAllFreeBoardInfo(@UserPayload() payload: Payload) {
    if (payload.employeeCode) {
      const employee = await this.employeeRepository.findOne({
        where: { id: payload.id },
        relations: ['brand'],
      });
      this.freeBoardService.fetchAllFreeBoardInfo(employee.brand.id);
    }

    if (payload.email) {
      const user = await this.userRepository.findOne({
        where: { id: payload.id },
        relations: ['brand'],
      });
      return await this.freeBoardService.fetchAllFreeBoardInfo(user.brand.id);
    }
  }

  // 로그인한 일반 사용자의 게시글을 불러와서 업데이트 (조건 : 일반 사용자는 본인 게시글만 수정할 수 있다.)
  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(JwtAuthGuard)
  @Put('/updateFreeBoard')
  async updateFreeBoard(
    @UserPayload() payload: Payload,
    @Body() request: UpdateFreeBoardRequest,
  ): Promise<FreeBoardEntity> {
    if (payload.name) {
      const user = await this.userRepository.findOne({
        where: { id: payload.id },
        relations: ['brand'],
      });

      const wantUpdateBoardWriterName = (
        await this.freeBoardService.fetchFreeBoardInfo(
          user.brand.id,
          request.id,
        )
      ).writerName;

      if (wantUpdateBoardWriterName === payload.name) {
        return await this.freeBoardService.updateFreeBoard(request);
      }
      throw new UnauthorizedException('본인만 수정할 수 있습니다.');
    }

    return await this.freeBoardService.updateFreeBoard(request);
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(JwtAuthGuard)
  @Delete('/deleteFreeBoard/:id')
  async deleteFreeBoard(
    @UserPayload() payload: Payload,
    @Param('id') id: number,
  ) {
    if (payload.name) {
      const user = await this.userRepository.findOne({
        where: { id: payload.id },
        relations: ['brand'],
      });
      const wantDeleteBoardWriterName = (
        await this.freeBoardService.fetchFreeBoardInfo(user.brand.id, id)
      )?.writerName;

      if (wantDeleteBoardWriterName === payload.name) {
        return this.freeBoardService.deleteFreeBoard(id);
      }
      throw new UnauthorizedException('본인만 삭제할 수 있습니다.');
    }
    return this.freeBoardService.deleteFreeBoard(id);
  }
}
