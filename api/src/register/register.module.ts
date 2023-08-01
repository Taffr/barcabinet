import { Module } from '@nestjs/common';
import { RegisterController } from './register.controller';
import { CryptoModule } from '../crypto/crypto.module';
import { UsersModule } from '../users/users.module';
import { CabinetModule } from '../cabinet/cabinet.module';

@Module({
  imports: [CryptoModule, UsersModule, CabinetModule],
  controllers: [RegisterController],
})
export class RegisterModule {}
