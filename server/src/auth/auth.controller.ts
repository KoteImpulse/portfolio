import {
  Controller,
  Post,
  Body,
  HttpCode,
  Request,
  UseGuards,
  Get,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { JwtAccessTokenGuard } from './guards/jwtAccess.guard';
import { JwtRefreshTokenGuard } from './guards/jwtRefresh.guard';
import { LocalAuthGuard } from './guards/localAuth.guard';
import RequestWithUser from './requestWithUser.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration')
  registration(@Body() createUserDto: CreateUserDto) {
    return this.authService.registration({
      email: createUserDto.email,
      nickName: createUserDto.nickName,
      password: createUserDto.password,
    });
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() request: RequestWithUser) {
    //user без пароля здесь уже (я убираю его в локальном гварде в функции валидации)
    const { user } = request;
    const result = await this.authService.login(user);
    request.res.setHeader('Set-Cookie', [
      result.accessCookie,
      result.refreshCookie,
    ]);
    return user;
  }

  @HttpCode(200)
  @UseGuards(JwtAccessTokenGuard)
  @Post('logout')
  async logout(@Request() request: RequestWithUser) {
    //user без пароля и почты здесь уже (я убираю его в аксесс гварде в функции валидации)
    await this.authService.logout(request.user);
    request.res.setHeader('Set-Cookie', this.authService.getCookiesForLogOut());
  }

  @HttpCode(200)
  @UseGuards(JwtRefreshTokenGuard)
  @Get('refresh')
  async refresh(@Request() request: RequestWithUser) {
    //user без пароля здесь уже (я убираю его в рефреш гварде в функции валидации)
    const user = request.user;
    const result = await this.authService.refresh(request.user);
    request.res.setHeader('Set-Cookie', result.accessCookie);
    return { user: user, access: result.accessCookie };
  }
}
