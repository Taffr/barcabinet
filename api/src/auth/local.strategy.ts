import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { identity } from 'ramda';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }
  async validate(userName: string, password: string) {
    const maybeValidUser = await this.authService.validateUser(
      userName,
      password,
    );
    return maybeValidUser.match(identity, () => {
      throw new UnauthorizedException();
    });
  }
}
