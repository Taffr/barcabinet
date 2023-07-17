import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { identity } from 'ramda';
import { Maybe } from '../util/Maybe';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(userName: string, password: string) {
    return Maybe.match(
      identity,
      () => new UnauthorizedException(),
      await this.authService.validateUser(userName, password),
    );
  }
}
