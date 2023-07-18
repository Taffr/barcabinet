import { Module } from '@nestjs/common';
import { RegisterController } from './register.controller';
import { CryptoModule } from '../crypto/crypto.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [CryptoModule, UsersModule],
  controllers: [RegisterController],
})
export class RegisterModule {}
