import { Controller, Get, Param } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/fetchAllUser')
  async fetchAllUser(): Promise<UserEntity[]> {
    return await this.userService.fetchAllUser();
  }

  @Get('/fetchOneUser/:id')
  async fetchOneUser(@Param('id') id: number): Promise<UserEntity> {
    return await this.userService.fetchOneUser(id);
  }
}
