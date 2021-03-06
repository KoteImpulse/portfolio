import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';
import { TokenService } from 'src/token/token.service';
import { RefreshTokenPayload } from 'src/token/tokenPayload.interface';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwtRefreshToken',
) {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Refresh;
        },
      ]),
      secretOrKey: process.env.JWT_REFRESH_TOKEN_KEY,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(
    request: Request,
    payload: RefreshTokenPayload,
  ): Promise<Omit<User, 'password'>> {
    const refreshToken = request.cookies?.Refresh;
    const tokenFromDb = await this.tokenService.validateRefreshToken(
      refreshToken,
    );
    const { password, ...result } =
      await this.userService.findForValidationRefreshToken(payload.id);
    if (tokenFromDb.id === result.id) {
      return result;
    }
    throw new HttpException('Некорректный токен', HttpStatus.BAD_REQUEST);
  }
}
