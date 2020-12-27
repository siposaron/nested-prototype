import { Body, Controller, Post, UseInterceptors, ClassSerializerInterceptor, UseGuards, Request } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthenticationService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { AuthenticateUserDto } from './dto/authenticate-user.dto';

@Controller('api/login')
@UseInterceptors(ClassSerializerInterceptor)
export class AutheticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Public() // skipping JWT auth
  @UseGuards(LocalAuthGuard)
  @Post()
  async authenticate(@Body() authenticateUserDto: AuthenticateUserDto, @Request() req) {
    return this.authService.login(req.user);
  }

}
