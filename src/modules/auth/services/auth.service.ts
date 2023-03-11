import {
  Body,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { instanceToPlain } from 'class-transformer';
import { BrandEntity } from 'src/modules/brand/entities/brand.entity';
import { EmployeeService } from 'src/modules/employee/services/employee.service';
import { Repository } from 'typeorm';
import { UserService } from '../../user/services/user.service';
import RegisterRequest from '../dto/registerRequest.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UserService,
    private readonly employeeService: EmployeeService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    @InjectRepository(BrandEntity)
    private readonly brandRepository: Repository<BrandEntity>,
  ) {}

  public async register(request: RegisterRequest) {
    const brand = await this.brandRepository.findOne({
      where: { id: request.brandId },
    });

    const hashedPassword = await bcrypt.hash(request.password, 12);
    const createdUser = await this.userService.addUser({
      email: request.email,
      name: request.name,
      password: hashedPassword,
      brandId: brand.id,
    });

    const accessToken = await this.jwtService.signAsync(
      instanceToPlain(createdUser),
      {
        secret: this.config.get<string>('JWT_SECRET'),
      },
    );
    return accessToken;
  }

  public async registerEmployee(request: RegisterRequest) {
    const brand = await this.brandRepository.findOne({
      where: { id: request.brandId },
    });

    const hashedPassword = await bcrypt.hash(request.password, 12);
    const createdEmployee = await this.employeeService.addEmployee({
      employeeCode: request.employeeCode,
      password: hashedPassword,
      brandId: brand.id,
    });

    const accessToken = await this.jwtService.signAsync(
      instanceToPlain(createdEmployee),
      {
        secret: this.config.get<string>('JWT_SECRET'),
      },
    );
    return accessToken;
  }

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    const user = await this.userService.getByEmail(email);
    await this.verifyPassword(plainTextPassword, user.password);
    return user;
  }

  public async getAuthenticatedEmployee(
    employeeCode: string,
    plainTextPassword: string,
  ) {
    const employee = await this.employeeService.fetchOneEmployee(employeeCode);
    await this.verifyPassword(plainTextPassword, employee.password);
    return employee;
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );

    // TODO 지금 비밀번호 틀리면 걍 서버 터짐
    if (!isPasswordMatching) {
      throw new HttpException('패스워드가 틀렸습니다.', HttpStatus.BAD_REQUEST);
    }
  }

  public async getAccessToken(@Body() email: string) {
    const user = await this.userService.getByEmail(email);
    const accessToken = await this.jwtService.signAsync(instanceToPlain(user), {
      secret: this.config.get<string>('JWT_SECRET'),
    });
    return accessToken;
  }

  public async getEmployeeAccessToken(@Body() employeeCode: string) {
    const employee = await this.employeeService.fetchOneEmployee(employeeCode);
    const accessToken = await this.jwtService.signAsync(
      instanceToPlain(employee),
      {
        secret: this.config.get<string>('JWT_SECRET'),
      },
    );
    return accessToken;
  }
}
