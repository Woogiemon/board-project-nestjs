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
import { Request, Response } from 'express';
import { UserPayload } from 'src/decorators/userPayload.decorator';
import { EmployeeService } from 'src/modules/employee/services/employee.service';
import { UserService } from '../../user/services/user.service';
import { JwtAuthGuard } from '../auth.guard';
import { LoginRequest } from '../dto/loginRequest';
import { Payload } from '../dto/payload.dto';
import { RegisterRequest } from '../dto/registerRequest.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly employeeService: EmployeeService,
  ) {}

  @Post('/register')
  async register(@Body() request: RegisterRequest) {
    if (request.employeeCode === 'string') {
      return await this.authService.register(request);
    } else {
      return await this.authService.registerEmployee(request);
    }
  }

  @Post('/login')
  async login(@Body() request: LoginRequest, @Res() res: Response) {
    if (request.email != 'string') {
      const user = await this.userService.getByEmail(request.email);
      await this.authService.getAuthenticatedUser(
        request.email,
        request.password,
      );
      const accessToken = await this.authService.getAccessToken(user.email);
      res.setHeader('Authorization', 'Bearer ' + accessToken);
      res.cookie('jwt', accessToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res.send({
        user: user,
        message: '로그인 성공',
      });
    } else {
      const employee = await this.employeeService.fetchOneEmployee(
        request.employeeCode,
      );
      this.authService.getAuthenticatedEmployee(
        request.employeeCode,
        request.password,
      );
      const accessToken = await this.authService.getEmployeeAccessToken(
        employee.employeeCode,
      );

      res.setHeader('Authorization', 'Bearer ' + accessToken);
      res.cookie('jwtEmployee', accessToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res.send({
        employee: employee,
        message: '로그인 성공',
      });
    }
  }

  @Post('/logout')
  logout(@Res() res: Response): any {
    res.clearCookie('jwt');
    res.clearCookie('jwtEmployee');
    return res.send({
      message: '로그아웃 성공',
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/getCookie')
  async getCookie(@UserPayload() payload: Payload, @Req() req: Request) {
    this.logger.verbose(payload.id);
    return req.cookies['jwt'];
  }
}
