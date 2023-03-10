import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddEmployeeRequest {
  @ApiProperty()
  @IsString()
  readonly employeeCode: string;

  @ApiProperty()
  @IsString()
  readonly password: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly brandId: number;
}
