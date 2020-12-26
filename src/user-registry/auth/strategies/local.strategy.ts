import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { UserInfo } from '../constants/user-info';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super();
  }

  async validate(username: string, password: string): Promise<UserInfo> {
    const user = await this.userService.findByUsernameAndPassword(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return { userId : user._id, roles: user.roles } as UserInfo;
  }
}