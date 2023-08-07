import { Module } from '@nestjs/common';
import { UserStore } from './userstore.service';
import { UsersController } from './users.controller';

@Module({
  providers: [UserStore],
  exports: [UserStore],
  controllers: [UsersController],
})
export class UsersModule {}
