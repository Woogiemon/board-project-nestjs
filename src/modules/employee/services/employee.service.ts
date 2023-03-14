import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterRequest } from 'src/modules/auth/dto/registerRequest.dto';
import { BrandService } from 'src/modules/brand/services/brand.service';
import { ProductBoardEntity } from 'src/modules/productBoard/entities/productBoard.entity';
import { ProductReqListEntity } from 'src/modules/productReqList/entities/productReqList.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Repository } from 'typeorm';
import { DecideProductReqListRequest } from '../dto/decideProductReqListRequest.dto';
import { EmployeeEntity } from '../entities/employee.entity';

@Injectable()
export class EmployeeService {
  private readonly logger = new Logger(EmployeeService.name);
  constructor(
    @InjectRepository(EmployeeEntity)
    private readonly employeeRepository: Repository<EmployeeEntity>,
    @InjectRepository(ProductReqListEntity)
    private readonly productReqListRepository: Repository<ProductReqListEntity>,
    @InjectRepository(ProductBoardEntity)
    private readonly productBoardRepository: Repository<ProductBoardEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly brandService: BrandService,
  ) {}

  async addEmployee(request: RegisterRequest): Promise<EmployeeEntity> {
    const brand = await this.brandService.fetchBrandInfo(request.brandId);

    const newEmployee = this.employeeRepository.create({
      employeeCode: request.employeeCode,
      password: request.password,
      brand: brand,
    });
    await this.employeeRepository.save(newEmployee);
    return newEmployee;
  }

  async fetchOneEmployee(employeeCode: string): Promise<EmployeeEntity> {
    const employee = await this.employeeRepository.findOne({
      where: { employeeCode: employeeCode },
    });
    if (employee) return employee;
    throw new HttpException(
      '해당 직원코드의 직원이 존재하지 않습니다.',
      HttpStatus.NOT_FOUND,
    );
  }

  async decideProductReqList(
    employeeId: number,
    request: DecideProductReqListRequest,
  ) {
    const productReqInfo = await this.productReqListRepository.findOne({
      where: { id: request.productReqListId },
      relations: ['user', 'employee'],
    });

    this.logger.debug(JSON.stringify(productReqInfo));

    const employeeInfo = await this.employeeRepository.findOne({
      where: { id: employeeId },
    });

    const userInfo = await this.userRepository.findOne({
      where: { id: productReqInfo.user.id },
      relations: ['brand'],
    });

    // 1. 승인
    if (request.status === 'Approved') {
      this.logger.verbose('승인');
      await this.productReqListRepository.update(productReqInfo.id, {
        status: request.status,
        reason: request.reason,
        employee: employeeInfo,
      });

      // 승인되었으므로 ProductBoard DB에 추가
      const newProductBoard = await this.productBoardRepository.create({
        productName: productReqInfo.productName,
        price: productReqInfo.price,
        user: userInfo,
        brand: userInfo.brand,
      });
      await this.productBoardRepository.save(newProductBoard);
    }

    // 2. 거절
    if (request.status === 'Rejected') {
      this.logger.verbose('거절');
      await this.productReqListRepository.update(productReqInfo.id, {
        status: request.status,
        reason: request.reason,
        employee: employeeInfo,
      });

      const result = await this.productReqListRepository.findOne({
        where: { id: request.productReqListId },
        relations: ['user', 'employee', 'brand'],
      });

      return result;
    }

    // 3. 연기
    if (request.status === 'Delayed') {
      this.logger.verbose('연기');
      await this.productReqListRepository.update(productReqInfo.id, {
        status: request.status,
        reason: request.reason,
        employee: employeeInfo,
      });
    }

    if (
      request.status != 'Approved' &&
      request.status != 'Rejected' &&
      request.status != 'Delayed'
    ) {
      throw new BadRequestException('status 값이 올바르지 않습니다.');
    }
  }
}
