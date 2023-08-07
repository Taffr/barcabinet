import { Module } from '@nestjs/common';
import { UserStore } from './user.store';
import { UsersController } from './users.controller';

@Module({
  providers: [UserStore],
  exports: [UserStore],
  controllers: [UsersController],
})
export class UsersModule {}
