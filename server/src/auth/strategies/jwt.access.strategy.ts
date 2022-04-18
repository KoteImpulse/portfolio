import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { Request } from 'express';
import { User } from 'src/user/entities/user.entity';
import { AccessTokenPayload } from 'src/token/tokenPayload.interface';

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(
  Strategy,
  'jwtAccessToken',
) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Authentication;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_TOKEN_KEY,
    });
  }

  async validate(
    payload: AccessTokenPayload,
  ): Promise<Omit<User, 'password' | 'email'>> {
    const { password, email, ...result } =
      await this.userService.findForValidationAccessToken(payload.id);
    return result;
  }
}
