import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { TokenService } from 'src/token/token.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { DeleteResult } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
  ) {}

  async registration(createUserDto: CreateUserDto): Promise<string> {
    const candidate = await this.userService.findCandidate(createUserDto.email);
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким email существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.validateDTO(createUserDto);

    try {
      const hashPassword = await bcrypt.hash(
        createUserDto.password,
        Number(process.env.SALT),
      );
      const user: User = await this.userService.create({
        email: createUserDto.email.trim(),
        password: hashPassword,
        nickName: createUserDto.nickName.trim(),
      });
      const { password, ...result } = user;
      const { refreshToken } = await this.tokenService.generateTokens(result);
      await this.tokenService.saveRefreshToken(result, refreshToken, result.id);
      return 'Регистрация прошла успешно';
    } catch (e) {
      console.log(e);
    }
  }

  async login(user: User): Promise<{
    accessToken: string;
    refreshToken: string;
    user: Omit<User, 'password'>;
    accessCookie: string;
    refreshCookie: string;
  }> {
    try {
      const tokens = await this.tokenService.generateTokens(user);
      await this.tokenService.saveRefreshToken(
        user,
        tokens.refreshToken,
        user.id,
      );
      return { ...tokens, user };
    } catch (e) {
      console.log(e);
    }
  }

  async logout(user: Omit<User, 'password' | 'email'>): Promise<DeleteResult> {
    try {
      const token = await this.tokenService.removeToken(user.id);
      return token;
    } catch (e) {
      console.log(e);
    }
  }

  public getCookiesForLogOut() {
    return [
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0',
    ];
  }

  async refresh(
    user: Omit<User, 'password'>,
  ): Promise<{ accessCookie: string; refreshCookie: string }> {
    try {
      const { accessCookie, refreshCookie } =
        await this.tokenService.generateTokens(user);
      return { accessCookie, refreshCookie };
    } catch (e) {
      console.log(e);
    }
  }

  async validateDTO(createUserDto: CreateUserDto): Promise<void> {
    if (
      !('nickName' in createUserDto) ||
      !('email' in createUserDto) ||
      !('password' in createUserDto)
    ) {
      throw new ForbiddenException('Не может быть пустым');
    }
    if (
      createUserDto.nickName.trim().length < 3 ||
      createUserDto.nickName.trim().length > 32
    ) {
      throw new ForbiddenException('От 3 до 30 символов может быть');
    }
    if (
      createUserDto.email.trim().length === 0 ||
      createUserDto.email.trim().indexOf(' ') > 0
    ) {
      throw new ForbiddenException('Не может быть пустым');
    }
    if (
      createUserDto.password.trim().length < 6 ||
      createUserDto.password.trim().length > 32 ||
      createUserDto.password.indexOf(' ') > 0
    ) {
      throw new ForbiddenException('От 6 до 32 символов может быть');
    }
  }

  async validateUserCredentials(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.userService.findForValidation(email);
    if (!user) {
      return null;
    }
    const passwordEquals = await bcrypt.compare(password, user.password);
    if (user && passwordEquals) {
      const { password: pwd, ...result } = user;
      return result;
    }
    return null;
  }
}
