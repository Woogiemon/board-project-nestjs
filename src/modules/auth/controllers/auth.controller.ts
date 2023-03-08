import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { UserPayload } from 'src/decorators/userPayload.decorator';
import { UserService } from '../../user/services/user.service';
import { JwtAuthGuard } from '../auth.guard';
import { AuthenticateRequest } from '../dto/authenticateRequest';
import { Payload } from '../dto/payload.dto';
import RegisterRequest from '../dto/registerRequest.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('/register')
  async register(@Body() request: RegisterRequest) {
    return await this.authService.register(request);
  }

  @Post('/login')
  async login(@Body() request: AuthenticateRequest, @Res() res: Response) {
    const user = await this.userService.getByEmail(request.email);
    this.authService.getAuthenticatedUser(request.email, request.password);
    const accessToken = await this.authService.getAccessToken(user.email);
    this.logger.debug(accessToken);
    res.setHeader('Authorization', 'Bearer ' + accessToken);
    res.cookie('jwt', accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.send({
      message: 'success',
    });
  }

  @Post('/logout')
  logout(@Res() res: Response): any {
    res.clearCookie('jwt');
    return res.send({
      message: 'success',
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/getCookie')
  async getCookie(@UserPayload() payload: Payload, @Req() req: Request) {
    this.logger.verbose(payload.id);
    console.log(req.cookies['jwt']);
    return req.cookies['jwt'];
  }
}
