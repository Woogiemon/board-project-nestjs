import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from 'src/decorators/userPayload.decorator';
import { JwtAuthGuard } from 'src/modules/auth/auth.guard';
import { Payload } from 'src/modules/auth/dto/payload.dto';
import { UserService } from 'src/modules/user/services/user.service';
import { InsertBoardRequest } from '../dto/insertBoardRequest.dto';
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
}
