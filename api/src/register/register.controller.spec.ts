import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException } from '@nestjs/common';
import { RegisterController } from './register.controller';
import { UserStore } from '../users/user.store';
import { IUserStore } from '../users/interfaces/user.store.interface';
import { CabinetStore } from '../cabinet/cabinet.store';
import { CryptoService } from '../crypto/crypto.service';
import { Maybe } from '../util/Maybe';
import { User } from '../users/documents/user.document';

describe('RegisterController', () => {
  let controller: RegisterController;

  let userAddedSpy: User | undefined;

  const mockUserStore: IUserStore = {
    findByName: (name) => {
      return Promise.resolve(Maybe.of(name == 'exists' ? { name } : undefined));
    },
    add: (u) => {
      userAddedSpy = u;
      return Promise.resolve(u.id);
    },
  };

  const mockCabinetStore = {
    addForUser: (id: string) => Promise.resolve(id),
  };

  beforeEach(async () => {
    userAddedSpy = undefined;
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserStore,
          useValue: mockUserStore,
        },
        {
          provide: CabinetStore,
          useValue: mockCabinetStore,
        },
        CryptoService,
      ],
      controllers: [RegisterController],
    }).compile();
    controller = module.get<RegisterController>(RegisterController);
  });

  it('can register an user', async () => {
    const user = { name: 'some name', password: 'password' };
    await controller.registerUser(user);
    expect(userAddedSpy?.name).toBe('some name');
  });

  it('handles duplicate names', async () => {
    const user = { name: 'exists', password: 'no matter' };
    await expect(controller.registerUser(user)).rejects.toThrow(
      new ConflictException('Name already exists'),
    );
  });
});
