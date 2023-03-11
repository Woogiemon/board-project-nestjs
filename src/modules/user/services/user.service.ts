import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandService } from 'src/modules/brand/services/brand.service';
import { Repository } from 'typeorm';
import { AddUserRequest } from '../dto/addUserRequest.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private brandService: BrandService,
  ) {}

  async fetchAllUser(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async fetchOneUser(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { id },
    });
  }

  async getByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (user) {
      return user;
    }
    throw new HttpException(
      '해당 이메일의 유저가 존재하지 않습니다.',
      HttpStatus.NOT_FOUND,
    );
  }

  async addUser(request: AddUserRequest): Promise<UserEntity> {
    const brand = await this.brandService.fetchBrandInfo(request.brandId);

    const newUser = this.userRepository.create({
      email: request.email,
      password: request.password,
      name: request.name,
      brand: brand,
    });
    return await this.userRepository.save(newUser);
  }
}
