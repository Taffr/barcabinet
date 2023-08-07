import { Body, Controller, Post, ConflictException } from '@nestjs/common';
import { RegisterUserDTO } from './dtos/register-user.dto';
import { UserStore } from '../users/user.store';
import { CabinetStore } from '../cabinet/cabinet.store';
import { CryptoService } from '../crypto/crypto.service';

@Controller('register')
export class RegisterController {
  constructor(
    private readonly userStore: UserStore,
    private readonly cabinetStore: CabinetStore,
    private readonly cryptoService: CryptoService,
  ) {}

  @Post()
  async registerUser(@Body() userDto: RegisterUserDTO) {
    const { name, password } = userDto;
    const maybeUser = await this.userStore.findByName(name);
    await maybeUser.matchAsync(
      () => {
        throw new ConflictException('Name already exists');
      },
      async () => {
        const hash = await this.cryptoService.hash(password);
        const id = this.cryptoService.uuid();
        return this.userStore.addUser({ id, hash, name }).then((id) => {
          return this.cabinetStore.addForUser(id);
        });
      },
    );
  }
}
