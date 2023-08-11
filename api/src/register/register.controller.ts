import {
  Body,
  ConflictException,
  Controller,
  Inject,
  Post,
} from '@nestjs/common';
import { RegisterUserDTO } from './dtos/register-user.dto';
import { IUserStore } from '../users/interfaces/user.store.interface';
import { UserStore } from '../users/user.store';
import { CryptoService } from '../crypto/crypto.service';

@Controller('register')
export class RegisterController {
  constructor(
    @Inject(UserStore)
    private readonly userStore: IUserStore,
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
          id: this.cryptoService.uuid(),
          hash: await this.cryptoService.hash(password),
          name,
          favourites: [],
          cabinet: [],
        }),
    );
  }
}
