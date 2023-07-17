import { Module } from '@nestjs/common';
import { UserStore } from './userstore.service';

@Module({
  providers: [UserStore],
  exports: [UserStore],
})
export class UsersModule {}
