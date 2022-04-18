import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  mixin,
  Type,
} from '@nestjs/common';
import Roles from 'src/user/Roles';
import RequestWithUser from '../requestWithUser.interface';

const RoleGuard = (
  role: Roles,
): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest<RequestWithUser>();
      const user = request.user;

      if (user?.roles.includes(role)) {
        return true;
      } else {
        throw new BadRequestException(
          'Нет достаточных прав для этого действия',
        );
      }
    }
  }

  return mixin(RoleGuardMixin);
};

export default RoleGuard;
