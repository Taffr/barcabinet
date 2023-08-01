import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException } from '@nestjs/common';
import { RegisterController } from './register.controller';
import { UserStore } from '../users/userstore.service';
import { CryptoService } from '../crypto/crypto.service';
import { Maybe } from '../util/Maybe';
import { User } from '../users/documents/user.document';

describe('RegisterController', () => {
  let controller: RegisterController;

  let userAddedSpy: User | undefined;

  const mockUserStore = {
    findByName: (name) => {
      return Promise.resolve(Maybe.of(name == 'exists' ? { name } : undefined));
    },
    addUser: (u) => {
      userAddedSpy = u;
      return Promise.resolve({ test: 'test' });
    },
  };

  beforeEach(async () => {
    userAddedSpy = undefined;
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserStore,
          useValue: mockUserStore,
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
