import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies.access_token;
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }
    try {
      const payload = this.jwtService.verify(token);
      request.user = payload;
    } catch (err) {
      throw new UnauthorizedException('No token provided');
    }
    return true;
  }
}
