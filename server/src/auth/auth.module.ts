import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Token } from 'src/token/entities/token.entity';
import { TokenService } from 'src/token/token.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtAccessTokenStrategy } from './strategies/jwt.access.strategy';
import { JwtRefreshTokenStrategy } from './strategies/jwt.refresh.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwtAccessToken' }),
    TypeOrmModule.forFeature([User, Token]),
    ConfigModule.forRoot({ envFilePath: `.env` }),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    TokenService,
    LocalStrategy,
    JwtAccessTokenStrategy,
    JwtRefreshTokenStrategy,
  ],
})
export class AuthModule {}
