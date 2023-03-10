import { Controller, Get, Param } from '@nestjs/common';
import { EmployeeEntity } from '../entities/employee.entity';
import { EmployeeService } from '../services/employee.service';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get('/fetchOneEmployee/:employeeCode')
  async fetchOneEmployee(
    @Param('employeeCode') employeeCode: string,
  ): Promise<EmployeeEntity> {
    return await this.employeeService.fetchOneEmployee(employeeCode);
  }
}
