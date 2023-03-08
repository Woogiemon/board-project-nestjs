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
import { InsertBoardRequest } from '../dto/insertBoardRequest.dto';
import { UpdateBoardRequest } from '../dto/updateBoardRequest.dto';
import { BoardEntity } from '../entities/board.entity';
import { BoardService } from '../services/board.service';

@Controller('board')
export class BoardController {
  constructor(
    private readonly boardService: BoardService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  @Post('/insertBoard')
  async insertBoard(
    @UserPayload() payload: Payload,
    @Body() request: InsertBoardRequest,
  ) {
    const user = await this.userService.fetchOneUser(payload.id);
    await this.boardService.insertBoard(user, request);
  }

  @Get('/fetchBoardInfo/:id')
  async fetchBoardInfo(@Param('id') id: number): Promise<BoardEntity> {
    return await this.boardService.fetchBoardInfo(id);
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(JwtAuthGuard)
  @Put('/updateBoard')
  async updateBoard(
    @UserPayload() payload: Payload,
    @Body() request: UpdateBoardRequest,
  ): Promise<BoardEntity> {
    const wantUpdateBoardWriterId = (
      await this.boardService.fetchBoardInfo(request.id)
    ).writer?.id;

    if (wantUpdateBoardWriterId === payload.id) {
      this.boardService.updateBoard(request);
      return;
    }
    throw new UnauthorizedException('본인만 수정할 수 있습니다.');
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(JwtAuthGuard)
  @Delete('/deleteBoard/:id')
  async deleteBoard(@UserPayload() payload: Payload, @Param('id') id: number) {
    const wantDeleteBoardWriterId = (await this.boardService.fetchBoardInfo(id))
      .writer?.id;

    if (wantDeleteBoardWriterId === payload.id) {
      this.boardService.deleteBoard(id);
      return;
    }
    throw new UnauthorizedException('본인만 삭제할 수 있습니다.');
  }
}
