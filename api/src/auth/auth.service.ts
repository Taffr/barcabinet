import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserStore } from '../users/user.store';
import { User } from '@prisma/client';
import { CryptoService } from '../crypto/crypto.service';
import { Maybe } from '../util/Maybe';

@Injectable()
export class AuthService {
  constructor(
    private readonly userStore: UserStore,
    private readonly jwtService: JwtService,
    private readonly cryptoService: CryptoService,
  ) {}

  async validateUser(
    name: string,
    incomingPassword: string,
  ): Promise<Maybe<User>> {
    const maybeUser = await this.userStore.findByName(name);
    return maybeUser.chainAsync(async (user: User) => {
      const res = await this.cryptoService.compare(incomingPassword, user.hash);
      return res ? Maybe.just(user) : Maybe.nothing();
    });
  }

  async login(user: User) {
    const payload = { user: user.name, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
