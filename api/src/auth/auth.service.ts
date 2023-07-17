import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService, User } from '../users/users.service';
import { Maybe } from '../util/Maybe';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(name: string, incomingPassword: string) {
    return Maybe.map((user: User) => {
      const { password, ...rest } = user;
      return password === incomingPassword ? rest : null;
    }, await this.usersService.findByName(name));
  }

  async login(user: User) {
    const payload = { user: user.name, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
