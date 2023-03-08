import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/modules/auth/auth.guard';
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
  async insertBoard(@Req() req: Request, @Body() request: InsertBoardRequest) {
    const decodedUser = this.jwtService.decode(req.cookies['jwt']);
    const user = await this.userService.fetchOneUser(decodedUser['id']);
    await this.boardService.insertBoard(user, request);
  }
}
