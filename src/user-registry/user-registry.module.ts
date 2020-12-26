import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { AutheticationController } from './auth/authentication.controller';
import { LocalStrategy } from './auth/strategies/local.strategy';
import { AuthenticationService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AUTH_SECRET } from './auth/constants/auth';
import { MongooseModule } from '@nestjs/mongoose';
import { UserFeature } from './schemas/user.schema';
import { AppLevelRolesGuard } from './auth/guards/roles.guard';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { AppLevelJwtGuard } from './auth/guards/jwt-auth.guard';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: AUTH_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
    MongooseModule.forFeatureAsync([ 
      UserFeature
    ])],
  controllers: [UserController, AutheticationController],
  providers: [
    UserService, AuthenticationService, 
    LocalStrategy, JwtStrategy, 
    AppLevelRolesGuard, AppLevelJwtGuard
  ],
  exports: [AuthenticationService]
})
export class UserModule {}
