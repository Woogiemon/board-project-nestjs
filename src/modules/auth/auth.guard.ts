import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    if (!req.cookies?.['jwt'] && !req.cookies?.['jwtEmployee']) {
      throw new Error('토큰이 존재하지 않습니다.');
    }
    return true;
  }
}
