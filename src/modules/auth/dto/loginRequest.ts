import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginRequest {
  @ApiProperty()
  @IsEmail()
  readonly email?: string;

  @ApiProperty()
  @IsString()
  readonly employeeCode?: string;

  @ApiProperty()
  @IsString()
  readonly password: string;
}
