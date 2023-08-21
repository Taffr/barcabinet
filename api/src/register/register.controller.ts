import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { RegisterUserDTO } from './dtos/register-user.dto';
import { UserStore } from '../users/user.store';
import { CryptoService } from '../crypto/crypto.service';

@Controller('register')
export class RegisterController {
  constructor(
    private readonly userStore: UserStore,
    private readonly cryptoService: CryptoService,
  ) {}

  @Post()
  async registerUser(@Body() userDto: RegisterUserDTO) {
    const { name, password } = userDto;
    const maybeUser = await this.userStore.findByName(name);
    return maybeUser.matchAsync(
      () => {
        throw new ConflictException('Name already exists');
      },
      async () =>
        this.userStore.add({
          name,
          hash: await this.cryptoService.hash(password),
        }),
    );
  }
}
