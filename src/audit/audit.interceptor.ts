import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuditService } from './audit.service';
@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(private readonly auditService: AuditService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { ip, date, user } = request;
    console.log(ip, date, user);
    return next.handle().pipe(
      tap(async () => {
        const body = { idUser: user.id, ip: ip, date: new Date() };
        await this.auditService.create(body);
      }),
    );
  }
}
