import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { CryptoModule } from '../crypto/crypto.module';
import { JWT_CONSTANTS } from './auth.constants';

@Module({
  imports: [
    CryptoModule,
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: JWT_CONSTANTS.SECRET,
      signOptions: { expiresIn: JWT_CONSTANTS.EXPIRATION },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
