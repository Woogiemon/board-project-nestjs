import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginEmployeeRequest {
  @ApiProperty()
  @IsString()
  readonly employeeCode: string;

  @ApiProperty()
  @IsString()
  readonly password: string;
}
