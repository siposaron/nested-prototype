import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserInfo } from "./constants/user-info";

@Injectable()
export class AuthenticationService {
  constructor(private jwtService: JwtService) {}

  async login(user: UserInfo) {
    const payload = { sub: user.userId, scope: user.roles };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }

  async verifyToken(token: string): Promise<boolean> {
    try {
      await this.jwtService.verifyAsync(token);
      return true;
    } catch (e) {
      return false;
    }
  }

  async userInfoFromToken(token: string): Promise<UserInfo> {
    try {
      const decodedToken = await this.jwtService.decode(token);
      return {
        userId: decodedToken["sub"],
        roles: decodedToken["scope"]
      } as UserInfo;
    } catch (e) {
      throw new Error("User could not be identified from token.");
    }
  }
}
