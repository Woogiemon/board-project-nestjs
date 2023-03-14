import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserPayload } from 'src/decorators/userPayload.decorator';
import { JwtAuthGuard } from 'src/modules/auth/auth.guard';
import { Payload } from 'src/modules/auth/dto/payload.dto';
import { DecideProductReqListRequest } from '../dto/decideProductReqListRequest.dto';
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

  @UseGuards(JwtAuthGuard)
  @Put('/decideProductReqList')
  async decideProductReqList(
    @UserPayload() payload: Payload,
    @Body() request: DecideProductReqListRequest,
  ) {
    if (payload.email) {
      throw new UnauthorizedException(
        '상품 등록의 승인은 직원만 등록할 수 있습니다.',
      );
    }
    return await this.employeeService.decideProductReqList(payload.id, request);
  }
}
