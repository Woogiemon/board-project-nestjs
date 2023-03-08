import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddUserRequest } from '../dto/addUserRequest.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
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
    const newUser = this.userRepository.create({
      email: request.email,
      password: request.password,
      name: request.name,
    });
    await this.userRepository.save(newUser);
    return newUser;
  }

  //   async login(request: JoinUserRequest) {
  //     const bcryptPassword = await bcrypt.hash(request.password, 12);

  //     // 이런 흐름을 생각해내야한다.
  //     // 해당 이메일을 가진 User가 있는지 확인
  //     const currentUser = await this.userRepository.findOne({
  //       where: {
  //         email: request.email,
  //       },
  //     });

  //     // 없으면
  // if (!currentUser) {
  //   throw new Error('해당 이메일을 가진 유저가 없습니다.');
  // }

  //     // 여기까지 내려오면 이미 해당 이메일을 가진 User가 있다. 이제 비밀번호만 체크하면 된다.
  //     if (currentUser.password != bcryptPassword) {
  //       throw new Error('패스워드가 틀렸습니다.');
  //     }

  //     const payload = { email: request.email, password: bcryptPassword };
  //     return {
  //       access_token: this.jwtService.sign(payload),
  //     };
  //   }
}
