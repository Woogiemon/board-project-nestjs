import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString } from 'class-validator';

export class RegisterRequest {
  @ApiProperty()
  @IsEmail()
  readonly email?: string;

  @ApiProperty()
  @IsString()
  readonly employeeCode?: string;

  @ApiProperty()
  @IsString()
  readonly name?: string;

  @ApiProperty()
  @IsString()
  readonly password: string;

  @ApiProperty()
  @IsNumber()
  readonly brandId: number;
}
export default RegisterRequest;
