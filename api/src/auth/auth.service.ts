import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserStore } from '../users/userstore.service';
import { CryptoService } from '../crypto/crypto.service';
import { User } from '../users/documents/user.document';
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
    return Maybe.mapAsync(async (user: User) => {
      const { hash, ...rest } = user;
      if (await this.cryptoService.compare(incomingPassword, hash)) {
        return { user: rest };
      }
      return undefined;
    }, await this.userStore.findByName(name));
  }

  async login(user: User) {
    const payload = { user: user.name, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
