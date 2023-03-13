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
import { transactProductRequest } from '../dto/transactProductRequest.dto';
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
    @Body() request: transactProductRequest,
  ) {
    this.logger.debug('구매자 이름' + payload.name);
    return await this.userService.sellProduct(payload.name, request);
  }

  // @Post('/transactProduct')
  // async transactProduct(@Body() request: transactProductRequest) {
  //   return await this.userService.transactProduct(request);
  // }
}
