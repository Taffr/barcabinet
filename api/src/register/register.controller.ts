import { Body, Controller, Post, ConflictException } from '@nestjs/common';
import { RegisterUserDTO } from './dtos/register-user.dto';
import { UserStore } from '../users/userstore.service';
import { CryptoService } from '../crypto/crypto.service';
import { Maybe } from '../util/Maybe';

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
    await Maybe.matchAsync(
      () => {
        throw new ConflictException('Name already exists');
      },
      async () => {
        const hash = await this.cryptoService.hash(password);
        const id = this.cryptoService.uuid();
        await this.userStore.addUser({ id, hash, name });
      },
      maybeUser,
    );
  }
}