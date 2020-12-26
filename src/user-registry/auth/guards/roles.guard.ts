import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { AuthenticationService } from '../auth.service';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role, UserInfo } from '../constants/user-info';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthenticationService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    try {
      const token = this.getToken(context);

      if (!token) {
        return false;
      }

      if (!await this.isTokenValid(token)) {
        return false;
      }

      const userInfo = await this.getTokenInfo(token);

      if (!userInfo || !userInfo.roles) {
        return false;
      }

      return requiredRoles.some((role) => userInfo.roles?.includes(role));
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async getTokenInfo(token: string): Promise<UserInfo> {
    return await this.authService.userInfoFromToken(token);
  }

  async isTokenValid(token: string): Promise<boolean> {
    try {
      return await this.authService.verifyToken(token);
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  getToken(context: ExecutionContext): string {
    const authorizationHeader = context.switchToHttp().getRequest().headers.authorization;
    return authorizationHeader ? authorizationHeader.substring(7) : undefined;
  }
}

export const AppLevelRolesGuard = {
  provide: APP_GUARD,
  useClass: RolesGuard
}