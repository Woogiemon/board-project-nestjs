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
import { UserService } from 'src/modules/user/services/user.service';
import { FetchBoardInfoResponse as FetchFreeBoardInfoResponse } from '../dto/fetchFreeBoardInfo.dto';
import { InsertFreeBoardRequest } from '../dto/insertFreeBoardRequest.dto';
import { UpdateFreeBoardRequest as UpdateFreeBoardRequest } from '../dto/updateFreeBoardRequest.dto';
import { FreeBoardEntity } from '../entities/freeBoard.entity';
import { FreeBoardService } from '../services/freeBoard.service';

@Controller('freeBoard')
export class FreeBoardController {
  constructor(
    private readonly freeBoardService: FreeBoardService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  @Post('/insertFreeBoard')
  async insertFreeBoard(
    @UserPayload() payload: Payload,
    @Body() request: InsertFreeBoardRequest,
  ): Promise<FetchFreeBoardInfoResponse> {
    const user = await this.userService.fetchOneUser(payload.id);
    return await this.freeBoardService.insertFreeBoard(user, request);
  }

  @Get('/fetchFreeBoardInfo/:id')
  async fetchFreeBoardInfo(
    @Param('id') id: number,
  ): Promise<FetchFreeBoardInfoResponse> {
    return await this.freeBoardService.fetchFreeBoardInfo(id);
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(JwtAuthGuard)
  @Put('/updateFreeBoard')
  async updateFreeBoard(
    @UserPayload() payload: Payload,
    @Body() request: UpdateFreeBoardRequest,
  ): Promise<FreeBoardEntity> {
    const wantUpdateBoardWriterId = (
      await this.freeBoardService.fetchFreeBoardInfo(request.id)
    ).writerId;

    if (wantUpdateBoardWriterId === payload.id) {
      this.freeBoardService.updateFreeBoard(request);
      return;
    }
    throw new UnauthorizedException('본인만 수정할 수 있습니다.');
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(JwtAuthGuard)
  @Delete('/deleteFreeBoard/:id')
  async deleteFreeBoard(
    @UserPayload() payload: Payload,
    @Param('id') id: number,
  ) {
    const wantDeleteBoardWriterId = (
      await this.freeBoardService.fetchFreeBoardInfo(id)
    )?.writerId;

    if (wantDeleteBoardWriterId === payload.id) {
      this.freeBoardService.deleteFreeBoard(id);
      return;
    }
    throw new UnauthorizedException('본인만 삭제할 수 있습니다.');
  }
}
