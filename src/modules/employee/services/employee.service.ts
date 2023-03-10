import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandService } from 'src/modules/brand/services/brand.service';
import { Repository } from 'typeorm';
import { AddEmployeeRequest } from '../dto/addEmployeeRequest.dto';
import { EmployeeEntity } from '../entities/employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private employeeRepository: Repository<EmployeeEntity>,
    private brandService: BrandService,
  ) {}

  async addEmployee(request: AddEmployeeRequest): Promise<EmployeeEntity> {
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
}
