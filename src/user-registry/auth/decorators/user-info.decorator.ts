import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserInfo } from "../constants/user-info";

/**
 * Note: this only works if JWT passport strategy is activated on app level
 */
export const AuthUserInfo = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserInfo => {
    const request = ctx.switchToHttp().getRequest();
    return new UserInfo(request.user);
  }
);
