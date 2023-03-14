import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserPayload } from 'src/decorators/userPayload.decorator';
import { JwtAuthGuard } from 'src/modules/auth/auth.guard';
import { Payload } from 'src/modules/auth/dto/payload.dto';
import { ClickRatePlanCodeRequest } from '../dto/clickRatePlanCodeRequest.dto';
import { ClickRatePlanCodeResponse } from '../dto/clickRatePlanCodeResponse.dto';
import { RequestProductRequest } from '../dto/requestProductRequest.dto';
import { SellProductRequest } from '../dto/sellProductRequest.dto';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private readonly userService: UserService) {}

  @Get('/fetchAllUser')
  async fetchAllUser(): Promise<UserEntity[]> {
    return await this.userService.fetchAllUser();
  }

  @Get('/fetchOneUser/:id')
  async fetchOneUser(@Param('id') id: number): Promise<UserEntity> {
    return await this.userService.fetchOneUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/sellProduct')
  async sellProduct(
    @UserPayload() payload: Payload,
    @Body() request: SellProductRequest,
  ) {
    this.logger.debug('구매자 이름' + payload.name);
    return await this.userService.sellProduct(payload.name, request);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/transactProduct')
  async transactProduct(
    @UserPayload() payload: Payload,
    @Body() request: SellProductRequest,
  ) {
    return await this.userService.transactProduct(payload.name, request);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/clickRatePlanCode')
  async clickRatePlanCode(
    @UserPayload() payload: Payload,
    @Body() request: ClickRatePlanCodeRequest,
  ): Promise<ClickRatePlanCodeResponse> {
    return this.userService.clickRatePlanCode(payload.id, request);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/requestProduct')
  async requestProduct(
    @UserPayload() payload: Payload,
    @Body() request: RequestProductRequest,
  ) {
    return this.userService.requestProduct(payload.id, request);
  }
}
