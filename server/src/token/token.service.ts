import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AccessTokenPayload,
  RefreshTokenPayload,
} from 'src/token/tokenPayload.interface';
import { DeleteResult, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Token } from './entities/token.entity';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
    private jwtService: JwtService,
  ) {}

  async generateTokens(user: Omit<User, 'password'>): Promise<{
    accessToken: string;
    refreshToken: string;
    accessCookie: string;
    refreshCookie: string;
  }> {
    try {
      const { accessToken, accessCookie } =
        this.getCookieWithJwtAccessToken(user);
      const { refreshToken, refreshCookie } =
        this.getCookieWithJwtRefreshToken(user);
      return {
        accessToken,
        accessCookie,
        refreshToken,
        refreshCookie,
      };
    } catch (e) {
      console.log(e);
    }
  }

  public getCookieWithJwtAccessToken(user: Omit<User, 'password'>): {
    accessToken: string;
    accessCookie: string;
  } {
    const payload: AccessTokenPayload = {
      id: user.id,
      nickNane: user.nickName,
      createdat: user.createdat,
      updatedat: user.updatedat,
    };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_TOKEN_KEY,
      expiresIn: `${process.env.JWT_ACCESS_TOKEN_KEY_TIME}m`,
    });
    const accessCookie = `Authentication=${accessToken}; HttpOnly; Path=/;  Max-Age=${process.env.JWT_ACCESS_TOKEN_KEY_TIME_SECONDS}`;
    return {
      accessToken,
      accessCookie,
    };
  }

  public getCookieWithJwtRefreshToken(user: Omit<User, 'password'>): {
    refreshToken: string;
    refreshCookie: string;
  } {
    const payload: RefreshTokenPayload = {
      id: user.id,
      nickNane: user.nickName,
      createdat: user.createdat,
      updatedat: user.updatedat,
      email: user.email,
      roles: user.roles,
      permissions: user.permissions,
    };
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_TOKEN_KEY,
      expiresIn: `${process.env.JWT_REFRESH_TOKEN_KEY_TIME}d`,
    });
    const refreshCookie = `Refresh=${refreshToken}; HttpOnly; Path=/; Max-Age=${process.env.JWT_REFRESH_TOKEN_KEY_TIME_SECONDS}`;
    return {
      refreshToken,
      refreshCookie,
    };
  }

  async saveRefreshToken(
    user: Omit<User, 'password'>,
    refreshToken: string,
    userId,
  ): Promise<Token> {
    try {
      const tokenData = await this.tokenRepository.findOne({ user: userId });
      if (tokenData) {
        tokenData.refreshToken = refreshToken;
        return await this.tokenRepository.save({
          id: tokenData.id,
          refreshToken: tokenData.refreshToken,
          user: tokenData.user,
        });
      }
      const token = await this.tokenRepository.create({
        refreshToken,
        user: { id: user.id },
      });
      const tokenForSave = await this.tokenRepository.save(token);
      return tokenForSave;
    } catch (e) {
      console.log(e);
    }
  }

  async removeToken(userId): Promise<DeleteResult> {
    try {
      const token = await this.tokenRepository.findOne({ user: userId });
      if (!token) {
        throw new HttpException(
          'Некорректный логин или пароль',
          HttpStatus.UNAUTHORIZED,
        );
      }
      const deleteResult = await this.tokenRepository.delete(token.id);
      return deleteResult;
    } catch (e) {
      console.log(e);
    }
  }

  validateAccessToken(accessToken: string) {
    const user = this.jwtService.verify(accessToken, {
      secret: process.env.JWT_ACCESS_TOKEN_KEY,
    });
    if (!user) {
      throw new HttpException('Некорректный токен', HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  validateRefreshToken(refreshToken: string) {
    const user = this.jwtService.verify(refreshToken, {
      secret: process.env.JWT_REFRESH_TOKEN_KEY,
    });
    if (!user) {
      throw new HttpException('Некорректный токен', HttpStatus.BAD_REQUEST);
    }
    return user;
  }
}
