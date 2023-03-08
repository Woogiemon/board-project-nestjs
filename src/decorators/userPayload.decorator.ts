import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Payload } from 'src/modules/auth/dto/payload.dto';

export const UserPayload = createParamDecorator(
  async (data: string, ctx: ExecutionContext) => {
    try {
      const jwtService = new JwtService({});
      const request = ctx.switchToHttp().getRequest();

      const cookie = data
        ? await request.cookies?.['jwt']
        : await request.cookies;

      const jwt: Payload = await jwtService.verifyAsync(cookie.jwt, {
        secret: process.env.JWT_SECRET,
      });
      return jwt;
    } catch (error) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  },
);
