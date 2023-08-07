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
import { CabinetStore } from '../cabinet/cabinet.store';
import { ICabinetStore } from '../cabinet/interfaces/cabinet.store.interface';
import { CryptoService } from '../crypto/crypto.service';

@Controller('register')
export class RegisterController {
  constructor(
    @Inject(UserStore)
    private readonly userStore: IUserStore,
    @Inject(CabinetStore)
    private readonly cabinetStore: ICabinetStore,
    private readonly cryptoService: CryptoService,
  ) {}

  @Post()
  registerUser(@Body() userDto: RegisterUserDTO) {
    const { name, password } = userDto;
    return this.userStore.findByName(name).then((maybeUser) =>
      maybeUser.matchAsync(
        () => {
          throw new ConflictException('Name already exists');
        },
        async () => {
          const hash = await this.cryptoService.hash(password);
          const id = this.cryptoService.uuid();
          return this.userStore.add({ id, hash, name }).then((id) => {
            return this.cabinetStore.addForUser(id);
          });
        },
      ),
    );
  }
}
