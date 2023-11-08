import { Injectable, ExecutionContext } from '@nestjs/common';
import { JwtGuard } from './jwt.guard';
import { USERROLE } from 'src/common/interface';

@Injectable()
export class AdminGuard extends JwtGuard {
  async canActivate(context: ExecutionContext) {
    const canActivate = await super.canActivate(context);
    if (!canActivate) {
      return false;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user as any;
    const isAdmin = user.roles.some((role: USERROLE) => role === 'ADMIN');
    return isAdmin;
  }
}
